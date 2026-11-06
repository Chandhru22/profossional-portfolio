# BalaChandhru. P — Portfolio

React + Vite + Tailwind CSS + Framer Motion portfolio. The contact form posts to a
Google Apps Script Web App that stores submissions in Google Sheets.

## 1. Install and run (Windows PowerShell)

```powershell
cd balachandhru-portfolio
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```powershell
npm run build
npm run preview
```

## 2. Placeholders you must replace

| What | Where | Notes |
|---|---|---|
| Profile photo | `public/profile.jpg` | Export the photo from Figma (right-click the image > Export). The site shows "BC" until it exists. |
| Resume | `public/resume.pdf` | The Download Resume button points here. |
| Project mockups | `public/projects/linkedin-growth.png`, `ecommerce.png`, `food-app.png` | Export from the Figma project cards. Gradient panels show until they exist. |
| Social links and email | `src/data/portfolio.js` (`profile`) | Currently example values. |
| Project links | `src/data/portfolio.js` (`projects`) | `liveUrl` and `repoUrl` are `#` until you add real URLs. |
| Company, dates | `src/data/portfolio.js` (`experience`) | Confirm "Besant Technologies" and add real dates. |
| Graduation year and status | `src/data/portfolio.js` (`education`) | Set the year and "Pursuing" or "Degree Conferred". |
| OG share image | `public/og-image.png` | Optional, used for link previews. |
| Favicon | `public/favicon.svg` | Optional. |

Figma asset links expire after 7 days, so export images from Figma directly rather
than relying on the links in the design code.

## 3. Google Sheets + Apps Script contact backend

### Create the sheet
1. Go to https://sheets.new and name the file (for example "Portfolio Contacts").
2. Copy the spreadsheet ID from its URL. It is the long string between `/d/` and `/edit`.
   This is the Sheet URL. Do not use it as the Web App URL.

### Add the script
1. In the sheet, choose **Extensions → Apps Script**.
2. Delete the default code, then paste the full contents of `apps-script/Code.gs`.
3. Save the project (Ctrl+S) and name it "Portfolio Contact Backend".

### Store the spreadsheet ID
1. Click the gear icon (**Project Settings**).
2. Under **Script Properties**, click **Add script property**.
   - Name: `SPREADSHEET_ID`
   - Value: the ID you copied
3. Save.

### Create the header row
1. In the editor, select `setupSheet` from the function dropdown and click **Run**.
2. Approve the permissions prompt. Google shows a warning because the script is
   unverified. Click **Advanced → Go to Portfolio Contact Backend (unsafe)** if you
   wrote the script yourself.

### Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy** and copy the **Web App URL** (it ends in `/exec`).

Security notes:
- "Execute as: Me" means the script writes to your sheet with your permissions.
  Visitors never get access to the sheet itself.
- "Anyone" is required so visitors without Google accounts can submit. Anyone who
  finds the URL can send submissions, so the validation, honeypot and cooldown in
  `Code.gs` matter.
- After any change to `Code.gs`, use **Deploy → Manage deployments → Edit → New
  version**. Otherwise the live URL keeps running the old code.

### Connect the React app
1. Copy `.env.example` to `.env.local`.
2. Set `VITE_GOOGLE_SCRIPT_URL` to the Web App URL (ending in `/exec`).
3. Restart `npm run dev`. Vite only reads env values at startup.

### Test before using the form
- Open the Web App URL in a browser. You should see
  `{"success":true,"message":"Contact form backend is running."}`.
- Submit the React form and check for a new row with status `NEW`.
- Submit an empty form, or an invalid email, to confirm the validation messages.

## 4. How the form reports success

- **Saved and confirmed:** the server replies `success: true`, the form shows success
  and clears.
- **Rejected:** the server gives a reason (for example, an invalid email). The form
  shows it and keeps the typed text.
- **Unverified:** the browser cannot read the reply. The form does **not** claim
  success. It asks the visitor to try again or email directly. Check the sheet to see
  whether the row was saved.

Apps Script always returns HTTP 200, so the frontend checks the `success` field
in the JSON body rather than the HTTP status.

## 5. Project structure

```
src/
├── components/   Navbar, Footer, Button, Reveal, SectionHeading, TypingText, ContactForm
├── sections/     Hero, About, Skills, Projects, Experience, Education, Contact
├── data/         portfolio.js  ← all editable text, links and project data
├── services/     contactService.js  ← posts to the Apps Script Web App
└── hooks/        useActiveSection.js  ← highlights the current nav item
apps-script/
└── Code.gs       ← paste into Apps Script (not part of the React build)
```

## 6. Known limitations

- Figma design links cannot be downloaded automatically here, so images and the
  resume are placeholders (see section 2).
- Technology pills use text labels instead of logos. Logos can be added to
  `src/data/portfolio.js` if you provide the files.
- The contact form has no CAPTCHA. Add Cloudflare Turnstile or reCAPTCHA before
  heavy public use.
