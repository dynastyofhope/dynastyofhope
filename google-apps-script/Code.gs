/*************************************************************
 * DYNASTY OF HOPE FOUNDATION — Online Submissions Database
 * Google Apps Script bridge: website forms  →  Google Sheet
 *
 * SETUP (5 minutes):
 *  1. Create a Google Sheet: https://sheets.new  (name it "DOHF Submissions DB")
 *  2. Menu: Extensions → Apps Script
 *  3. Delete everything in the editor, paste THIS whole file, Save (💾)
 *  4. Deploy → New deployment → ⚙ type: "Web app"
 *     - Execute as: ME
 *     - Who has access: ANYONE
 *  5. Deploy → copy the Web app URL (ends with /exec)
 *  6. On your website: Admin page → Settings → "Connect Online Database"
 *     paste the URL, keep key DOHF-2026 (or change it here AND there)
 *  7. Submit a test form → a row appears in the Sheet, and the Admin
 *     page "Online Database" tab shows it from ANY device.
 *************************************************************/

var KEY = "DOHF-2026";          // shared secret — keep in sync with the website
var SHEET_NAME = "Submissions"; // tab name inside the spreadsheet

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Timestamp", "ID", "Type", "Name", "Email", "Phone",
                  "Event / Interest", "Amount", "Message / Notes", "FullJSON"]);
    sh.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#0b57c4").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Website forms POST here (also used for test writes) */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.key !== KEY) return out_({ ok: false, error: "invalid key" });
    var d = body.data || {};
    var name = d.name || d.fullname || "";
    var eventOrInterest = d.event || d.interest || d.category || "";
    var msg = d.message || d.notes || "";
    var sh = getSheet_();
    sh.appendRow([new Date(), body.id || "", body.type || "", name,
                  d.email || "", d.phone || "", eventOrInterest,
                  d.amount || "", msg, JSON.stringify(d)]);
    return out_({ ok: true, id: body.id });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

/* Admin dashboard GETs here:  ?key=DOHF-2026  → all records as JSON */
function doGet(e) {
  var p = e.parameter || {};
  if (p.key !== KEY) return out_({ ok: false, error: "invalid key" });
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  if (values.length) values.shift(); // drop header
  var records = [];
  for (var i = values.length - 1; i >= 0; i--) { // newest first
    var r = values[i];
    var data = {};
    try { data = JSON.parse(r[9] || "{}"); } catch (x) { data = {}; }
    records.push({ id: r[1], type: r[2], date: String(r[0]), data: data });
  }
  return out_({ ok: true, count: records.length, records: records });
}
