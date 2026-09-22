# Dynasty of Hope Foundation — Official Website

A professional, fully static NGO website for **Dynasty of Hope Foundation** (Gonigora, Ungwan Bijeh, Kaduna State, Nigeria), designed for **free hosting on GitHub Pages**.

📞 0903 698 9696, 0703 382 8292 · ✉️ Dynastyofhope2023@gmail.com

---

##  Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, programmes, upcoming events, gallery strip, donate CTA |
| About Us | `about.html` | Story, mission, vision, values, programmes |
| Volunteer | `volunteer.html` | Volunteer benefits + sign-up form |
| Events | `events.html` | Football championship + carnival, prizes, sponsorship tiers, flier/poster downloads |
| Gallery | `gallery.html` | Photo grid with lightbox viewer |
| Donation | `donate.html` | UBA bank details with copy buttons + pledge form |
| Register | `register.html` | Event registration (teams, raffle tickets, vendors, sponsors, volunteers) |
| Sponsorship Proposal | `proposal.html` | Printable proposal (₦1M / ₦500K / ₦100K / ₦50K tiers) — Print/Save as PDF button |
| Admin | `admin.html` | Password-protected dashboard: view/export/delete submissions, change password |

Event artwork: `assets/img/flier-football.jpg` (flier) and `assets/img/poster-carnival.jpg` (poster) — WhatsApp-ready 1080×1620. Regenerate anytime with `assets/img/build-flier.sh` and `assets/img/build-poster.sh` (requires ImageMagick).

---

## 🌍 Live Site

https://dynastyofhope.github.io/dynastyofhope/ — team & match-official registration for the Football Championship: https://dynastyofhope.github.io/dynastyofhope/register.html?event=football

## 🔄 Updating the Site (online upload, no Git needed)

Your site is already live at https://dynastyofhope.github.io/dynastyofhope/ — to push updates (like the new logo, colours, carnival proposal and registration link):

1. Download & extract the single package file `dynasty-of-hope-website.zip` (contains the full updated code).
2. On GitHub, open your **dynasty-of-hope** repository → **Add file → Upload files**.
3. Drag the extracted **files and folders** (index.html, about.html, …, css/, js/, assets/, _fragments/, build_site.py, README.md) into the upload box — folder structure is kept automatically. Files with the same name (e.g. `assets/img/logo.png`) are replaced.
4. Commit changes (green button "Commit changes").
5. Wait ~1 minute: GitHub Pages rebuilds and https://dynastyofhope.github.io/dynastyofhope/ shows the update.

> Tip: upload in one drag-and-drop so css/js/assets land together. The `_fragments/` + `build_site.py` are source helpers — safe to upload or skip; the site works from the `.html` files alone.

## 🚀 Deploy to GitHub Pages (5 minutes)

1. **Create a GitHub account** at github.com (skip if you have one) and click **New repository**. Name it e.g. `dynasty-of-hope` (Public).
2. **Upload this folder's contents** to the repository:
   - Easy way: on the repository page click **uploading an existing file**, drag all files & folders in, commit.
   - Or with Git on your computer:
     ```bash
     git init
     git add .
     git commit -m "Dynasty of Hope Foundation website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/dynasty-of-hope.git
     git push -u origin main
     ```
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Source: Deploy from a branch**, then **Branch: `main`**, folder **`/ (root)`**, click **Save**.
4. In ~1 minute your site is live at:
   `https://YOUR-USERNAME.github.io/dynasty-of-hope/`

That's it — hosting is free forever on GitHub Pages.

---

## 🗄 Central Database Model (how submissions flow)

ONE central database — the foundation's **Google Sheet** (`DOHF Submissions DB` → Submissions tab), written via the Google Apps Script bridge in `google-apps-script/Code.gs`.

- **Volunteers / teams / donors** submit forms → the record is appended to the central Sheet **and** emailed to Dynastyofhope2023@gmail.com (FormSubmit receipt).
- **Nothing is stored on visitors' devices** — no per-browser databases anywhere.
- **Admin only + approval:** the password-protected Admin page shows every submission as **Pending** with one-click **✓ Approve / Reject** buttons; decisions sync back to the Sheet and appear in CSV exports. The Sheet itself is private to the foundation's Google account.
- Setup guide: `GOOGLE-SHEETS-SETUP.md`. The web-app URL is pre-wired in `js/main.js` (`DOH_CONFIG.dbUrl`).

## ✏️ Editing Contact / Social / Bank Details

All key details live in **one place**: `js/main.js` → `DOH_CONFIG` (phones, WhatsApp number, email, social links, bank account). Displayed text on pages also appears in the header/footer of `build_site.py` + `index.html` if you rebuild; for quick edits just search-and-replace the old value across the `.html` files.

- **WhatsApp float button** uses `DOH_CONFIG.whatsapp` (international format, digits only).
- **Social media links**: replace the placeholder URLs (facebook.com/dynastyofhopefoundation etc.) with your real page handles.
- **Bank**: UBA · 1027342537 · Dynasty of Hope Foundation.

## 🖼 Replacing Photos

Drop your real event photos into `assets/img/` keeping the same file names (`gallery-1.jpg` … `gallery-6.jpg`, `hero.jpg`) or update the `src` in `gallery.html`.

---

© 2026 Dynasty of Hope Foundation. Built with ❤ for the Gonigora community.
