/*************************************************************
 * DYNASTY OF HOPE FOUNDATION — Volunteer Registration Tracker
 * WITH ADMIN APPROVAL
 *
 * Flow:
 *  - Volunteer registers on the website (any device)
 *  - Record is appended here with Status = "Pending"
 *  - ONLY the admin (password-protected dashboard / private Sheet) sees it
 *  - Admin clicks Approve / Reject on the dashboard → Status updates here
 *
 * UPDATE INSTRUCTIONS (if you already deployed an older version):
 *  1. Apps Script → replace ALL code with this file → Save
 *  2. Deploy → Manage deployments → ✎ (edit) → Version: "New version" → Deploy
 *************************************************************/

var KEY = "DOHF-2026";          // keep in sync with the website
var SHEET_NAME = "Submissions";

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Timestamp", "ID", "Type", "Name", "Email", "Phone",
                  "Event / Interest", "Amount", "Message / Notes", "FullJSON", "Status"]);
    sh.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#0b57c4").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---- website forms POST new registrations; dashboard POSTs approvals ---- */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.key !== KEY) return out_({ ok: false, error: "invalid key" });
    var sh = getSheet_();

    /* Admin delete */
    if (body.action === "deleteRecord") {
      var vals = sh.getDataRange().getValues();
      for (var k = 1; k < vals.length; k++) {
        if (String(vals[k][1]) === String(body.id)) {
          sh.deleteRow(k + 1);
          return out_({ ok: true, id: body.id, deleted: true });
        }
      }
      return out_({ ok: false, error: "record not found" });
    }

    /* Admin approval / rejection */
    if (body.action === "setStatus") {
      var values = sh.getDataRange().getValues();
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][1]) === String(body.id)) {
          sh.getRange(i + 1, 11).setValue(body.status || "Pending");
          return out_({ ok: true, id: body.id, status: body.status });
        }
      }
      return out_({ ok: false, error: "record not found" });
    }

    /* New submission → Pending */
    var d = body.data || {};
    var name = d.name || d.fullname || "";
    var eventOrInterest = d.event || d.interest || d.category || "";
    var msg = d.message || d.notes || "";
    sh.appendRow([new Date(), body.id || "", body.type || "", name,
                  d.email || "", d.phone || "", eventOrInterest,
                  d.amount || "", msg, JSON.stringify(d), "Pending"]);
    return out_({ ok: true, id: body.id, status: "Pending" });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

/* ---- admin dashboard GETs all records (key-protected) ---- */
function doGet(e) {
  var p = e.parameter || {};
  if (p.key !== KEY) return out_({ ok: false, error: "invalid key" });
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  if (values.length) values.shift();
  var records = [];
  for (var i = values.length - 1; i >= 0; i--) {
    var r = values[i];
    var data = {};
    try { data = JSON.parse(r[9] || "{}"); } catch (x) { data = {}; }
    records.push({
      id: r[1], type: r[2], date: String(r[0]), data: data,
      status: String(r[10] || "Pending")
    });
  }
  return out_({ ok: true, count: records.length, records: records });
}
