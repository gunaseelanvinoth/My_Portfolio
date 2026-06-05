# Deploy Gunaseelan V Portfolio to Vercel

This folder is ready to deploy as a static Vercel website.

## Option 1: Vercel Dashboard

1. Create a new GitHub repository.
2. Upload everything inside this `outputs` folder to that repository.
3. Go to https://vercel.com/new.
4. Import the repository.
5. Use these settings:
   - Framework Preset: Other
   - Build Command: leave empty or use `npm run build`
   - Output Directory: `.`
6. Click Deploy.

## Option 2: Vercel CLI

If Vercel CLI is installed and you are logged in:

```bash
vercel --prod
```

## Connect Contact Form and Visitor Tracking to Google Sheets

The contact form posts to `/api/contact`, and visitor tracking posts to `/api/visit`. Both API routes forward data to a Google Apps Script URL stored in Vercel as `GOOGLE_SCRIPT_URL`.

1. Create a Google Sheet.
2. In Google Sheets, open Extensions > Apps Script.
3. Paste this script:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  if (data.type === "visit") {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits") ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet("Visits");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Page", "Referrer", "Language", "Screen", "Timezone", "User Agent"]);
    }
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.page || "",
      data.referrer || "",
      data.language || "",
      data.screen || "",
      data.timezone || "",
      data.userAgent || ""
    ]);
  } else {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Messages") ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet("Messages");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Message"]);
    }
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.message || ""
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy the Apps Script as a Web App:
   - Execute as: Me
   - Who has access: Anyone
5. Copy the Web App URL.
6. In Vercel Project Settings > Environment Variables, add:
   - Name: `GOOGLE_SCRIPT_URL`
   - Value: your Apps Script Web App URL
7. Redeploy the project.

The site uses:

- `index.html`
- `styles.css`
- `script.js`
- `api/contact.js`
- `api/visit.js`
- `assets/`
- `vercel.json`
- `recruiter-message-log-template.xlsx`
