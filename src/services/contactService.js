// Sends contact form data to the Google Apps Script Web App.
//
// Why text/plain? Apps Script does not answer CORS preflight (OPTIONS) requests.
// A "simple" request (POST + text/plain) skips the preflight, so the browser can
// send the body and read the JSON reply. The body is still JSON; the server parses it.
//
// The frontend only reports success when the server replies with { success: true }.
// If the reply cannot be read, we say the save is UNVERIFIED instead of claiming success.

const ENDPOINT = import.meta.env.DEV
  ? import.meta.env.VITE_GOOGLE_SCRIPT_URL
  : '/api/contact';
export class ContactError extends Error {
  constructor(code, message, fieldErrors = {}) {
    super(message);
    this.name = 'ContactError';
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export function isContactConfigured() {
  return Boolean(ENDPOINT) && !ENDPOINT.includes('YOUR_GOOGLE_APPS_SCRIPT');
}

export async function submitContact(payload) {
  if (!isContactConfigured()) {
    throw new ContactError('not_configured', 'The contact form is not connected yet. Please email me directly.');
  }

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
  } catch {
    throw new ContactError('network', 'Could not reach the contact service. Please check your connection and try again.');
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new ContactError(
      'unverified',
      'We could not confirm that your message was saved. Please try again, or email me directly.',
    );
  }

  if (!result || result.success !== true) {
    throw new ContactError('rejected', result?.message || 'Your message could not be sent.', result?.errors || {});
  }

  return result;
}
