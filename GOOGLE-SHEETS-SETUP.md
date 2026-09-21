# 🗄 True Online Database + Shared Dashboard (Google Sheets — free)

Your website forms already (1) email you via FormSubmit and (2) keep a local copy.
This guide adds layer (3): a **real online database** — every submission from every
device lands in **your Google Sheet**, and the website **Admin → Online Database**
tab reads it live, so you have a shared dashboard from any phone or computer.

## Setup — 5 minutes, one time

1. **Create the Sheet:** open https://sheets.new (signed in with Dynastyofhope2023@gmail.com).
   Name it `DOHF Submissions DB`.
2. **Open the script editor:** menu **Extensions → Apps Script**.
3. **Paste the bridge script:** delete any code in the editor, then copy-paste the entire
   contents of `google-apps-script/Code.gs` (included in this package). Click **Save (💾)**.
4. **Deploy as a web app:**
   - Click **Deploy → New deployment**
   - Click the ⚙ gear beside "Select type" → choose **Web app**
   - *Execute as:* **Me**  ·  *Who has access:* **Anyone**
   - Click **Deploy** → authorise with your Google account when asked
   - **Copy the Web app URL** (it ends with `/exec`)
5. **Connect the website:** open your live site → **Admin** (password `hope2023`) →
   **Settings** tab → *Connect Online Database* → paste the URL, key stays `DOHF-2026`
   → **Save Connection**. (Saved in that browser; repeat once on each device you admin from,
   or hard-code it in `js/main.js` → `DOH_CONFIG.dbUrl` and re-upload for everyone.)
6. **Test:** submit the Volunteer form once. Within seconds:
   - a new row appears in your Google Sheet ✔
   - Admin → **Online Database** tab shows the record (press Refresh) ✔
   - the FormSubmit email arrives ✔

## What you get

| Where | What it shows |
|---|---|
| **Google Sheet** (`Submissions` tab) | Every volunteer application, event registration & donation pledge, newest-first-ready columns: Timestamp, ID, Type, Name, Email, Phone, Event/Interest, Amount, Message, FullJSON |
| **Website Admin → Online Database** | Same records as a dashboard table on any device (key-protected) |
| **Gmail** | FormSubmit table email per submission (already active) |
| **Admin local tabs** | On-device backup copy + CSV export |

## Security notes

- The Sheet is private to your Google account; the web app URL + key `DOHF-2026` only
  allow appending/reading submissions — change the key in `Code.gs` (redeploy) and in
  Admin Settings if you ever share the URL widely.
- To update the script later: Apps Script → edit → **Deploy → Manage deployments → ✎ Edit → New version**.
