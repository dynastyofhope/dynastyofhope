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

    /* Admin approval / rejection  (+ automatic confirmation email to volunteer) */
    if (body.action === "setStatus") {
      var values = sh.getDataRange().getValues();
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][1]) === String(body.id)) {
          sh.getRange(i + 1, 11).setValue(body.status || "Pending");
          try {
            var to = String(body.email || "").trim();
            if (to && to.indexOf("@") > 0 && body.status && body.status !== "Pending") {
              var vName = String(body.name || "").trim() || "Friend";
              var approved = (body.status === "Approved");
              var subject = approved
                ? "APPROVED - Your registration with Dynasty of Hope Foundation"
                : "Your registration status - Dynasty of Hope Foundation";
              var msg = "Dear " + vName + ",\n\n" +
                (approved
                  ? "GREAT NEWS! Your registration with Dynasty of Hope Foundation has been APPROVED by the admin.\n\nReference ID: " + body.id + "\n\nWe are excited to have you on board. Our team will contact you soon with the next steps. Please keep this email for your records."
                  : "Thank you for your interest in Dynasty of Hope Foundation.\n\nAfter careful review, your registration (Reference ID: " + body.id + ") was NOT APPROVED at this time.\n\nThis does not close any doors - you are warmly welcome to apply again for our future programmes and events.") +
                "\n\n---\nYou can always reach us:\nEmail: Dynastyofhope2023@gmail.com\nPhone: 09036989696, 07033828292\nWhatsApp: https://wa.me/2349036989696\n\nWith hope,\nAdidi Sylvanus Osigbemeh\nProject Coordinator, Dynasty of Hope Foundation";
              MailApp.sendEmail(to, subject, msg);
            }
          } catch (mailErr) {
            /* never block the status update if email fails */
          }
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

    /* Instant receipt email to the volunteer: registration received, awaiting approval */
    try {
      var toV = String(d.email || "").trim();
      if (toV && toV.indexOf("@") > 0) {
        var vNm = String(name).trim() || "Friend";
        MailApp.sendEmail(toV,
          "Registration RECEIVED - Dynasty of Hope Foundation",
          "Dear " + vNm + ",\n\n" +
          "Thank you! Your registration with Dynasty of Hope Foundation has been RECEIVED.\n\n" +
          "Reference ID: " + (body.id || "-") + "\n" +
          "Current status: PENDING - awaiting admin approval.\n\n" +
          "You will receive a second email as soon as the admin reviews your registration. Please keep this reference ID safe.\n\n" +
          "---\nYou can always reach us:\nEmail: Dynastyofhope2023@gmail.com\nPhone: 09036989696, 07033828292\nWhatsApp: https://wa.me/2349036989696\n\nWith hope,\nAdidi Sylvanus Osigbemeh\nProject Coordinator, Dynasty of Hope Foundation");
      }
    } catch (receiptErr) { /* never block the submission */ }

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


/* Run this ONCE in the editor (function dropdown -> selfTest -> Run) to
   authorize the new email permission. You'll receive a test email. */
function selfTest() {
  getSheet_();
  var me = "Dynastyofhope2023@gmail.com";
  try { me = Session.getActiveUser().getEmail() || me; } catch (x) {}
  MailApp.sendEmail(me, "DOHF Tracker self-test OK",
    "Your tracker can now send approval/rejection confirmation emails to volunteers.\n\n- Dynasty of Hope Foundation Tracker");
}
