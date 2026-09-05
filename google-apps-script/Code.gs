/**
 * ============================================================
 *  RJ FITNESS — Lead Tracker (Google Apps Script)
 * ============================================================
 *  Website form  →  /api/enquiry  →  this script  →  "Leads" sheet
 *
 *  SETUP (one time):
 *   1. Google Sheet → Extensions → Apps Script → paste this whole file → Save.
 *      (No permission to deploy from that sheet? Use script.google.com → New project,
 *       paste this file, and set SHEET_ID below to the shared sheet's ID.)
 *   2. Run the function  setupSheet  once (Run ▶ button, choose setupSheet).
 *      → Authorize when asked. This builds the branded "Leads" + "Summary" sheets.
 *   3. Deploy → New deployment → Web app → Execute as: Me, Access: Anyone → Deploy.
 *   4. Copy the /exec URL into the website .env as GOOGLE_SHEET_WEBHOOK_URL.
 *
 *  Any time you edit this file: Deploy → Manage deployments → Edit → New version.
 * ============================================================
 */

// ---------- Settings you may change ----------
var BRAND_NAME = "RJ FITNESS";
var BRAND_SUB = "Coach Ridhi Jain · Website lead tracker";
var LOGO_URL = "https://ridhi.vishaltechnopower.in/images/rj-logo.jpg";
// If this script is NOT inside the sheet (standalone project), paste the sheet ID here.
// Sheet ID = the long part of the sheet URL: docs.google.com/spreadsheets/d/<THIS PART>/edit
// Leave "" when the script is opened from Extensions → Apps Script inside the sheet itself.
var SHEET_ID = ""; // paste the real sheet ID in the Apps Script editor only — never commit it to the public repo
var SHEET_NAME = "Leads";
var SUMMARY_NAME = "Summary";
var TIMEZONE = "Asia/Kolkata";

// Optional: get an email for every new lead. Leave "" to switch off.
var NOTIFY_EMAIL = "";

// Shared secret. Put the SAME string in the website .env as GOOGLE_SHEET_SECRET.
// With this set, nobody who guesses the /exec URL can push fake leads. "" = no check.
var SECRET = "";

// Status options for the dropdown (first one is the default for new leads)
var STATUS_OPTIONS = ["New", "Contacted", "Call booked", "Joined", "Follow up", "Not interested"];

// Brand colours
var C_DARK = "#1D1814";
var C_CLAY = "#C8592F";
var C_GOLD = "#D9A441";
var C_CREAM = "#FBF8F3";
var C_CREAM2 = "#F1EBE0";
var C_SAGE = "#5E7B5A";

// ---------- Column definition ----------
// key  = field name sent by the website (do not change)
// label = column heading shown in the sheet (change freely)
var COLUMNS = [
  { key: "timestamp",        label: "Date & Time",        width: 150 },
  { key: "status",           label: "Status",             width: 130 },
  { key: "name",             label: "Name",               width: 170 },
  { key: "phone",            label: "Contact Number",     width: 150 },
  { key: "country",          label: "Country",            width: 110 },
  { key: "age",              label: "Age",                width: 60 },
  { key: "height",           label: "Height",             width: 90 },
  { key: "weight",           label: "Weight",             width: 90 },
  { key: "profession",       label: "Profession",         width: 150 },
  { key: "medical_history",  label: "Medical History",    width: 160 },
  { key: "major_concern",    label: "Major Concern",      width: 190 },
  { key: "expected_outcome", label: "Expected Outcome",   width: 260 },
  { key: "ready_to_invest",  label: "Ready to Invest?",   width: 200 },
  { key: "preferred_time",   label: "Preferred Time",     width: 160 },
  { key: "notes",            label: "Team Notes",         width: 240 },
  { key: "source",           label: "Form",               width: 110 },
  { key: "utm_source",       label: "UTM Source",         width: 110 },
  { key: "utm_medium",       label: "UTM Medium",         width: 110 },
  { key: "utm_campaign",     label: "UTM Campaign",       width: 150 },
  { key: "utm_content",      label: "UTM Content",        width: 130 },
  { key: "utm_term",         label: "UTM Term",           width: 110 },
  { key: "fbclid",           label: "FB Click ID",        width: 120 },
  { key: "page",             label: "Page URL",           width: 220 },
  { key: "ip",               label: "IP",                 width: 110 },
];

var HEADER_ROW = 4;            // rows 1–3 = brand banner
var FIRST_DATA_ROW = HEADER_ROW + 1;

// ============================================================
//  WEB APP ENDPOINTS
// ============================================================

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (SECRET && data.secret !== SECRET) return reply({ ok: false, error: "unauthorized" });
    if (!data.name || !data.phone) return reply({ ok: false, error: "name and phone are required" });

    var sheet = getLeadsSheet();

    if (isRecentDuplicate(sheet, String(data.phone))) {
      return reply({ ok: true, duplicate: true });
    }

    var row = COLUMNS.map(function (c) {
      if (c.key === "status") return STATUS_OPTIONS[0];
      if (c.key === "notes") return "";
      if (c.key === "timestamp") return data.timestamp || nowIst();
      if (c.key === "phone") return normalisePhone(data.phone);
      return data[c.key] == null ? "" : String(data[c.key]);
    });

    var target = sheet.getLastRow() < HEADER_ROW ? FIRST_DATA_ROW : sheet.getLastRow() + 1;
    sheet.getRange(target, 1, 1, row.length).setValues([row]);
    styleDataRow(sheet, target);

    if (NOTIFY_EMAIL) notifyByEmail(data);

    return reply({ ok: true, row: target });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the /exec URL in a browser shows this — quick check that the deploy works.
// It never returns any lead data.
function doGet() {
  return reply({ ok: true, brand: BRAND_NAME, sheet: SHEET_NAME });
}

// ============================================================
//  ONE-TIME SETUP  (Run ▶ setupSheet)
// ============================================================

function setupSheet() {
  var ss = getSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  ss.setSpreadsheetLocale("en_IN"); // dd/mm/yyyy dates in the Summary formulas
  var sheet = getLeadsSheet();
  buildBanner(sheet);
  buildHeader(sheet);
  applyDataFormatting(sheet);
  buildSummary(ss, sheet);
  ss.setActiveSheet(sheet);
  SpreadsheetApp.flush();
  say(BRAND_NAME + " lead tracker is ready.\n\nNext: Deploy → New deployment → Web app (Execute as Me, Anyone) and paste the /exec URL into the website .env as GOOGLE_SHEET_WEBHOOK_URL.");
}

// Adds an "RJ Fitness" menu when the sheet opens (only when the script lives inside the sheet).
function onOpen() {
  if (SHEET_ID) return;
  SpreadsheetApp.getUi()
    .createMenu("RJ Fitness")
    .addItem("Set up / re-format sheet", "setupSheet")
    .addItem("Add a test lead", "addTestLead")
    .addItem("Refresh summary", "refreshSummary")
    .addToUi();
}

function addTestLead() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        name: "Test Lead",
        phone: "9876543210",
        country: "India",
        age: 32,
        height: "5 ft 4 in",
        weight: "72 kg",
        profession: "IT professional",
        medical_history: "PCOS / PCOD",
        major_concern: "Belly fat",
        expected_outcome: "Lose 8 kg before December",
        ready_to_invest: "Yes — ready to start now",
        preferred_time: "Evening (4 – 8 pm)",
        source: "hero_form",
        utm_source: "test",
        page: "https://ridhi.vishaltechnopower.in/program",
      }),
    },
  };
  var out = JSON.parse(doPost(fake).getContent());
  say(out.ok ? "Test lead added (row " + out.row + ")." : "Failed: " + out.error);
}

function refreshSummary() {
  var ss = getSpreadsheet();
  buildSummary(ss, getLeadsSheet());
}

// ============================================================
//  SHEET BUILDERS
// ============================================================

function getLeadsSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Brand-new spreadsheet with an empty "Sheet1"? Reuse it. Otherwise add a new tab.
    var first = ss.getSheets()[0];
    if (ss.getSheets().length === 1 && first.getLastRow() === 0 && first.getLastColumn() === 0) {
      sheet = first.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME, 0);
    }
  }
  // First use → build the branded layout automatically.
  if (sheet.getLastRow() < HEADER_ROW) {
    buildBanner(sheet);
    buildHeader(sheet);
    applyDataFormatting(sheet);
  }
  return sheet;
}

function buildBanner(sheet) {
  var n = COLUMNS.length;
  // Undo any merges left by an earlier run before rebuilding.
  sheet.getRange(1, 1, 3, Math.max(n, sheet.getMaxColumns())).breakApart();
  sheet.setRowHeights(1, 3, 34);
  sheet.setRowHeight(1, 44);
  sheet.setRowHeight(2, 30);
  sheet.setRowHeight(3, 12);

  // Dark brand band across rows 1–2
  sheet.getRange(1, 1, 2, n).setBackground(C_DARK).setFontColor(C_CREAM);

  // Logo (column A, rows 1–2)
  var logoCell = sheet.getRange(1, 1, 2, 1);
  logoCell.merge();
  logoCell.setFormula('=IMAGE("' + LOGO_URL + '", 4, 62, 62)');
  logoCell.setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setColumnWidth(1, 150);

  // Title + subtitle in column B. No merging (merged cells can't cross the frozen-column line);
  // the text simply overflows to the right across the empty banner cells.
  var title = sheet.getRange(1, 2);
  title.setValue(BRAND_NAME + "  ·  LEAD TRACKER");
  title.setFontSize(18).setFontWeight("bold").setFontColor(C_GOLD).setFontFamily("Georgia")
    .setHorizontalAlignment("left").setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

  var sub = sheet.getRange(2, 2);
  sub.setValue(BRAND_SUB + "  ·  every website form submission lands here automatically  ·  update the Status column as you work the lead");
  sub.setFontSize(10).setFontColor("#CFC6B8").setHorizontalAlignment("left").setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

  // Thin clay accent line (row 3)
  sheet.getRange(3, 1, 1, n).setBackground(C_CLAY);
}

function buildHeader(sheet) {
  var n = COLUMNS.length;
  var labels = COLUMNS.map(function (c) { return c.label; });
  var header = sheet.getRange(HEADER_ROW, 1, 1, n);
  header.setValues([labels]);
  header.setBackground(C_CREAM2).setFontColor(C_DARK).setFontWeight("bold").setFontSize(10)
    .setHorizontalAlignment("left").setVerticalAlignment("middle").setWrap(false);
  header.setBorder(false, false, true, false, false, false, C_CLAY, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  sheet.setRowHeight(HEADER_ROW, 32);

  COLUMNS.forEach(function (c, i) {
    sheet.setColumnWidth(i + 1, c.width);
  });
  sheet.setFrozenRows(HEADER_ROW);
  sheet.setFrozenColumns(3); // Date, Status, Name stay visible while scrolling
}

function applyDataFormatting(sheet) {
  var n = COLUMNS.length;
  var maxRows = Math.max(sheet.getMaxRows(), FIRST_DATA_ROW + 500);
  if (sheet.getMaxRows() < maxRows) sheet.insertRowsAfter(sheet.getMaxRows(), maxRows - sheet.getMaxRows());
  var body = sheet.getRange(FIRST_DATA_ROW, 1, maxRows - HEADER_ROW, n);

  body.setFontSize(10).setFontColor(C_DARK).setVerticalAlignment("middle").setWrap(false);
  sheet.getRange(FIRST_DATA_ROW, 1, maxRows - HEADER_ROW, 1).setNumberFormat("@"); // timestamp as text
  sheet.getRange(FIRST_DATA_ROW, col("phone"), maxRows - HEADER_ROW, 1).setNumberFormat("@"); // keep leading + / 0
  sheet.getRange(FIRST_DATA_ROW, col("expected_outcome"), maxRows - HEADER_ROW, 1).setWrap(true);
  sheet.getRange(FIRST_DATA_ROW, col("notes"), maxRows - HEADER_ROW, 1).setWrap(true);

  // Zebra banding for readability
  var bandings = body.getBandings();
  bandings.forEach(function (b) { b.remove(); });
  var banding = body.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  banding.setFirstRowColor("#FFFFFF").setSecondRowColor(C_CREAM);

  // Status dropdown
  var statusRange = sheet.getRange(FIRST_DATA_ROW, col("status"), maxRows - HEADER_ROW, 1);
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUS_OPTIONS, true).setAllowInvalid(false).build();
  statusRange.setDataValidation(rule);

  // Status colours
  var rules = [];
  var palette = {
    "New":            { bg: "#FDECE4", fg: C_CLAY },
    "Contacted":      { bg: "#FFF4D6", fg: "#8A5A00" },
    "Call booked":    { bg: "#E4EEFF", fg: "#1D4ED8" },
    "Joined":         { bg: "#E3F1E1", fg: C_SAGE },
    "Follow up":      { bg: "#F3E8FF", fg: "#6B21A8" },
    "Not interested": { bg: "#EEEEEE", fg: "#6B6B6B" },
  };
  STATUS_OPTIONS.forEach(function (s) {
    var p = palette[s] || { bg: "#FFFFFF", fg: C_DARK };
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(s)
        .setBackground(p.bg)
        .setFontColor(p.fg)
        .setBold(true)
        .setRanges([statusRange])
        .build()
    );
  });
  sheet.setConditionalFormatRules(rules);

  // Hide the tracking columns by default (unhide via View → Hidden columns if needed)
  ["utm_medium", "utm_content", "utm_term", "fbclid", "ip"].forEach(function (k) {
    sheet.hideColumns(col(k));
  });
}

function styleDataRow(sheet, rowIndex) {
  var n = COLUMNS.length;
  var r = sheet.getRange(rowIndex, 1, 1, n);
  r.setFontSize(10).setVerticalAlignment("middle");
  sheet.getRange(rowIndex, col("name")).setFontWeight("bold");
  sheet.setRowHeight(rowIndex, 28);
}

function buildSummary(ss, leads) {
  var s = ss.getSheetByName(SUMMARY_NAME) || ss.insertSheet(SUMMARY_NAME, 1);
  s.clear();
  s.clearFormats();
  s.setColumnWidth(1, 260);
  s.setColumnWidth(2, 120);
  s.setColumnWidth(3, 40);
  s.setColumnWidth(4, 220);
  s.setColumnWidth(5, 120);

  s.setRowHeight(1, 44);
  s.getRange(1, 1, 1, 5).merge().setValue(BRAND_NAME + "  ·  SUMMARY")
    .setBackground(C_DARK).setFontColor(C_GOLD).setFontSize(16).setFontWeight("bold").setFontFamily("Georgia")
    .setVerticalAlignment("middle").setHorizontalAlignment("left");
  s.getRange(2, 1, 1, 5).setBackground(C_CLAY);
  s.setRowHeight(2, 6);

  var L = "'" + SHEET_NAME + "'!";
  var ts = L + colLetter("timestamp") + FIRST_DATA_ROW + ":" + colLetter("timestamp");
  var st = L + colLetter("status") + FIRST_DATA_ROW + ":" + colLetter("status");
  var nm = L + colLetter("name") + FIRST_DATA_ROW + ":" + colLetter("name");
  var co = L + colLetter("country") + FIRST_DATA_ROW + ":" + colLetter("country");
  var src = L + colLetter("utm_source") + FIRST_DATA_ROW + ":" + colLetter("utm_source");

  // Timestamp is text "dd/mm/yyyy, hh:mm:ss" → parse the date part for today/this-week counts
  var dateExpr = 'IFERROR(DATEVALUE(LEFT(' + ts + ',10)),"")';

  var rows = [
    ["Total leads", "=COUNTA(" + nm + ")"],
    ["Leads today", '=SUMPRODUCT((' + dateExpr + '=TODAY())*(' + nm + '<>""))'],
    ["Leads this week", '=SUMPRODUCT((' + dateExpr + '>=TODAY()-WEEKDAY(TODAY(),2)+1)*(' + nm + '<>""))'],
    ["Leads this month", '=SUMPRODUCT((' + dateExpr + '>=DATE(YEAR(TODAY()),MONTH(TODAY()),1))*(' + nm + '<>""))'],
    ["", ""],
    ["By status", ""],
  ];
  STATUS_OPTIONS.forEach(function (o) {
    rows.push(["   " + o, '=COUNTIF(' + st + ',"' + o + '")']);
  });
  rows.push(["", ""]);
  rows.push(["Conversion (Joined ÷ Total)", '=IFERROR(TEXT(COUNTIF(' + st + ',"Joined")/COUNTA(' + nm + '),"0.0%"),"0%")']);

  s.getRange(4, 1, rows.length, 2).setValues(rows);
  s.getRange(4, 1, rows.length, 2).setFontSize(11).setFontColor(C_DARK);
  s.getRange(4, 2, rows.length, 1).setHorizontalAlignment("right").setFontWeight("bold");
  [4, 9].forEach(function (r) {
    s.getRange(r, 1, 1, 2).setFontWeight("bold").setBackground(C_CREAM2);
  });

  // Right block: top countries + top sources (QUERY)
  s.getRange(4, 4).setValue("Top countries").setFontWeight("bold").setBackground(C_CREAM2);
  s.getRange(4, 5).setBackground(C_CREAM2);
  s.getRange(5, 4).setFormula(
    '=IFERROR(QUERY({' + co + ',' + nm + '},"select Col1, count(Col2) where Col1 <> \'\' group by Col1 order by count(Col2) desc limit 8 label Col1 \'\', count(Col2) \'\'",0),"—")'
  );
  s.getRange(15, 4).setValue("Top traffic sources").setFontWeight("bold").setBackground(C_CREAM2);
  s.getRange(15, 5).setBackground(C_CREAM2);
  s.getRange(16, 4).setFormula(
    '=IFERROR(QUERY({' + src + ',' + nm + '},"select Col1, count(Col2) where Col2 <> \'\' group by Col1 order by count(Col2) desc limit 8 label Col1 \'\', count(Col2) \'\'",0),"—")'
  );
  s.getRange(5, 5, 20, 1).setHorizontalAlignment("right");
  s.setHiddenGridlines(true);
}

// ============================================================
//  HELPERS
// ============================================================

function getSpreadsheet() {
  if (SHEET_ID) return SpreadsheetApp.openById(SHEET_ID);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("No sheet found. Set SHEET_ID at the top of the script.");
  return ss;
}

// UI popups only work when the script lives inside the sheet; otherwise just log.
function say(msg) {
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); }
}

function col(key) {
  for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i].key === key) return i + 1;
  throw new Error("Unknown column key: " + key);
}

function colLetter(key) {
  var n = col(key), s = "";
  while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function nowIst() {
  return Utilities.formatDate(new Date(), TIMEZONE, "dd/MM/yyyy, HH:mm:ss");
}

function normalisePhone(p) {
  var s = String(p).trim().replace(/[^\d+]/g, "");
  if (/^\d{10}$/.test(s)) s = "+91 " + s;         // plain Indian 10-digit → +91
  else if (/^91\d{10}$/.test(s)) s = "+" + s.slice(0, 2) + " " + s.slice(2);
  else if (/^\+91\d{10}$/.test(s)) s = s.slice(0, 3) + " " + s.slice(3);
  return s;
}

function isRecentDuplicate(sheet, phone) {
  var last = sheet.getLastRow();
  if (last < FIRST_DATA_ROW) return false;
  var from = Math.max(FIRST_DATA_ROW, last - 300);
  var tsCol = col("timestamp"), phCol = col("phone");
  var width = Math.max(tsCol, phCol);
  var rows = sheet.getRange(from, 1, last - from + 1, width).getValues();
  var dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  var digits = String(phone).replace(/\D/g, "").slice(-10);
  for (var i = rows.length - 1; i >= 0; i--) {
    var rowPhone = String(rows[i][phCol - 1]).replace(/\D/g, "").slice(-10);
    if (rowPhone !== digits) continue;
    var t = parseTimestamp(rows[i][tsCol - 1]);
    if (t && t.getTime() > dayAgo) return true;
  }
  return false;
}

function parseTimestamp(value) {
  if (value instanceof Date) return value;
  var m = String(value).match(/(\d{2})\/(\d{2})\/(\d{4}),?\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return null;
  return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4] - 5, +m[5] - 30, +m[6]));
}

function notifyByEmail(d) {
  try {
    var lines = [
      "Name: " + d.name,
      "Contact: " + d.phone + (d.country ? " (" + d.country + ")" : ""),
      "Age / Height / Weight: " + [d.age, d.height, d.weight].filter(Boolean).join(" / "),
      "Profession: " + (d.profession || "-"),
      "Medical history: " + (d.medical_history || "-"),
      "Major concern: " + (d.major_concern || "-"),
      "Expected outcome: " + (d.expected_outcome || "-"),
      "Ready to invest: " + (d.ready_to_invest || "-"),
      "Preferred time: " + (d.preferred_time || "-"),
      "",
      "Open the sheet: " + getSpreadsheet().getUrl(),
    ];
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New lead: " + d.name + " — " + (d.major_concern || "Free strategy call"),
      body: lines.join("\n"),
    });
  } catch (err) {
    // never let an email problem block the lead
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
