/**
 * BalaChandhru Portfolio - Contact Form Backend (Google Apps Script)
 *
 * Receives JSON from the React contact form, validates it, appends a row to a
 * Google Sheet and returns JSON. The spreadsheet ID lives in Script Properties,
 * never in the frontend code.
 *
 * Manual setup (run once from the Apps Script editor):
 *   1. setupSheet()               creates the "Submissions" tab and headers
 *   2. configureScriptProperties() stores the spreadsheet ID (see its notes)
 *
 * Runs automatically:
 *   doPost(e)  every time the React form submits
 *   doGet(e)   when someone opens the Web App URL in a browser (health check)
 */

const CONFIG = {
  SHEET_NAME: 'Submissions',
  HEADERS: ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status'],
  STATUS_NEW: 'NEW',
  SPREADSHEET_ID_PROPERTY: 'SPREADSHEET_ID',
  MAX_BODY_CHARS: 10000,
  MAX_NAME: 100,
  MAX_EMAIL: 254,
  MAX_SUBJECT: 150,
  MIN_MESSAGE: 10,
  MAX_MESSAGE: 2000,
  // Minimum seconds between two accepted messages from the same email address.
  RATE_LIMIT_SECONDS: 30,
  LOCK_WAIT_MS: 10000,
};

/* ------------------------------------------------------------------
 * ENTRY POINTS
 * ------------------------------------------------------------------ */

/** Health check. Reveals nothing about the spreadsheet. */
function doGet() {
  return jsonResponse({ success: true, message: 'Contact form backend is running.' });
}

/** Handles submissions from the React contact form. */
function doPost(e) {
  try {
    const raw = e && e.postData && typeof e.postData.contents === 'string' ? e.postData.contents : '';
    if (!raw) {
      return jsonResponse({ success: false, message: 'Empty submission.' });
    }
    if (raw.length > CONFIG.MAX_BODY_CHARS) {
      return jsonResponse({ success: false, message: 'Submission is too large.' });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      return jsonResponse({ success: false, message: 'Malformed request body.' });
    }

    // Honeypot: the React form leaves this field empty. Bots often fill it.
    if (typeof data.website === 'string' && data.website.trim() !== '') {
      return jsonResponse({ success: false, message: 'Submission could not be processed.' });
    }

    const validation = validateSubmission(data);
    if (!validation.valid) {
      return jsonResponse({
        success: false,
        message: 'Please correct the highlighted fields.',
        errors: validation.errors,
      });
    }

    const values = validation.values;

    if (isRateLimited(values.email)) {
      return jsonResponse({ success: false, message: 'Please wait a moment before sending another message.' });
    }

    const result = saveSubmission(values);
    markRateLimit(values.email);

    return jsonResponse({
      success: true,
      message: 'Thanks! Your message has been received.',
      reference: result.rowNumber,
    });
  } catch (err) {
    // Full detail goes to the Apps Script execution log only, never to the browser.
    console.error('doPost failed: ' + (err && err.stack ? err.stack : err));
    return jsonResponse({ success: false, message: 'Something went wrong. Please try again later.' });
  }
}

/* ------------------------------------------------------------------
 * SETUP (run manually, once)
 * ------------------------------------------------------------------ */

/**
 * Creates the "Submissions" tab if it does not exist and writes the header row
 * only when row 1 is empty, so headers are never duplicated.
 */
function setupSheet() {
  const sheet = getSubmissionsSheet_();
  Logger.log('Sheet ready: ' + sheet.getName() + ' (rows: ' + sheet.getLastRow() + ')');
  return 'Sheet ready.';
}

/**
 * Stores the spreadsheet ID in Script Properties.
 *
 * Easiest method: Project Settings (gear icon) > Script Properties > Add property:
 *   Name:  SPREADSHEET_ID
 *   Value: the long ID from your Sheet's URL
 *
 * Alternative: paste the ID into SPREADSHEET_ID_TO_STORE below, run this function
 * once, then replace the value with the placeholder again. Never commit the ID to
 * the React project.
 */
function configureScriptProperties() {
  const SPREADSHEET_ID_TO_STORE = 'PASTE_SPREADSHEET_ID_HERE';

  if (!SPREADSHEET_ID_TO_STORE || SPREADSHEET_ID_TO_STORE === 'PASTE_SPREADSHEET_ID_HERE') {
    throw new Error('Replace PASTE_SPREADSHEET_ID_HERE with your spreadsheet ID before running this function.');
  }

  PropertiesService.getScriptProperties().setProperty(CONFIG.SPREADSHEET_ID_PROPERTY, SPREADSHEET_ID_TO_STORE);
  Logger.log('SPREADSHEET_ID saved to Script Properties.');
  return 'Saved.';
}

/* ------------------------------------------------------------------
 * VALIDATION AND SANITIZATION
 * ------------------------------------------------------------------ */

/**
 * Validates the incoming submission.
 * Returns { valid, errors, values }. Error messages are safe to show to visitors.
 */
function validateSubmission(data) {
  const errors = {};

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { valid: false, errors: { form: 'Invalid submission.' }, values: null };
  }

  const name = sanitizeInput(data.name);
  const email = sanitizeInput(data.email);
  const subject = sanitizeInput(data.subject);
  const message = sanitizeInput(data.message);

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length > CONFIG.MAX_NAME) {
    errors.name = 'Name must be ' + CONFIG.MAX_NAME + ' characters or fewer.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (email.length > CONFIG.MAX_EMAIL || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Subject is required.';
  } else if (subject.length > CONFIG.MAX_SUBJECT) {
    errors.subject = 'Subject must be ' + CONFIG.MAX_SUBJECT + ' characters or fewer.';
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < CONFIG.MIN_MESSAGE) {
    errors.message = 'Message should be at least ' + CONFIG.MIN_MESSAGE + ' characters.';
  } else if (message.length > CONFIG.MAX_MESSAGE) {
    errors.message = 'Message must be ' + CONFIG.MAX_MESSAGE + ' characters or fewer.';
  }

  const valid = Object.keys(errors).length === 0;
  return {
    valid: valid,
    errors: errors,
    values: valid ? { name: name, email: email, subject: subject, message: message } : null,
  };
}

/**
 * Normalizes text and removes control characters.
 * Pass { forSheet: true } when writing to a spreadsheet: values that start with
 * = + - @ or a tab/CR are prefixed with an apostrophe so Sheets will not run
 * them as formulas (CSV/formula injection).
 */
function sanitizeInput(value, options) {
  const forSheet = Boolean(options && options.forSheet);

  if (value === null || value === undefined) return '';

  let text;
  if (typeof value === 'string') {
    text = value;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    text = String(value);
  } else {
    return ''; // objects, arrays and functions are not accepted as text
  }

  text = text.normalize('NFC');
  // Remove control characters except tab, newline and carriage return.
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  text = text.trim();

  if (forSheet && /^[=+\-@\t\r]/.test(text)) {
    text = "'" + text;
  }

  return text;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/* ------------------------------------------------------------------
 * SAVING
 * ------------------------------------------------------------------ */

/**
 * Appends one row with a server-generated timestamp and status NEW.
 * LockService makes sure two submissions at the same moment do not
 * overwrite each other or interleave their writes.
 * Returns { rowNumber }.
 */
function saveSubmission(values) {
  const lock = LockService.getScriptLock();
  let acquired = false;

  try {
    lock.waitLock(CONFIG.LOCK_WAIT_MS);
    acquired = true;

    const sheet = getSubmissionsSheet_();
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      timestamp,
      sanitizeInput(values.name, { forSheet: true }),
      sanitizeInput(values.email, { forSheet: true }),
      sanitizeInput(values.subject, { forSheet: true }),
      sanitizeInput(values.message, { forSheet: true }),
      CONFIG.STATUS_NEW,
    ]);

    SpreadsheetApp.flush();
    return { rowNumber: sheet.getLastRow() };
  } catch (err) {
    throw new Error('saveSubmission failed: ' + (err && err.message ? err.message : err));
  } finally {
    if (acquired) lock.releaseLock();
  }
}

/* ------------------------------------------------------------------
 * SPAM PROTECTION (basic)
 * ------------------------------------------------------------------
 * - Honeypot field (checked in doPost).
 * - Per-email cooldown using CacheService (RATE_LIMIT_SECONDS).
 * LIMITATIONS: a determined spammer can rotate emails or skip the honeypot.
 * The cooldown is per email address, not per visitor. For stronger protection,
 * add reCAPTCHA or Cloudflare Turnstile to the React form and verify the token here.
 */

function rateLimitKey_(email) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email.toLowerCase());
  return 'rl_' + Utilities.base64EncodeWebSafe(digest);
}

function isRateLimited(email) {
  return CacheService.getScriptCache().get(rateLimitKey_(email)) !== null;
}

function markRateLimit(email) {
  CacheService.getScriptCache().put(rateLimitKey_(email), '1', CONFIG.RATE_LIMIT_SECONDS);
}

/* ------------------------------------------------------------------
 * SHEET AND PROPERTY HELPERS
 * ------------------------------------------------------------------ */

function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty(CONFIG.SPREADSHEET_ID_PROPERTY);
  if (!id) {
    throw new Error('SPREADSHEET_ID is not set in Script Properties.');
  }
  return SpreadsheetApp.openById(id);
}

function getSubmissionsSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
  const existing = headerRange.getValues()[0];
  const isEmpty = existing.every(function (cell) {
    return cell === '' || cell === null;
  });

  if (isEmpty) {
    headerRange.setValues([CONFIG.HEADERS]);
    headerRange
      .setFontWeight('bold')
      .setBackground('#292a2e')
      .setFontColor('#e3e2e8');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, CONFIG.HEADERS.length);
  }
}

/* ------------------------------------------------------------------
 * RESPONSES
 * ------------------------------------------------------------------ */

/** Returns JSON. Apps Script always answers HTTP 200, so check the "success" field. */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
