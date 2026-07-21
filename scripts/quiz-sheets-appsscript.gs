/**
 * BrustBizeps Quiz → Google Sheets
 * -------------------------------------------------------------------------
 * Speichert jede Quiz-Submission in EINER Google-Tabelle, mit einem eigenen
 * Tab pro Quiz: "creatin-hcl", "eaa", "mystery-box".
 *
 * SETUP (einmalig):
 *   1. sheets.google.com → neue leere Tabelle anlegen (Name z.B. "Quiz Leads").
 *   2. Erweiterungen → Apps Script. Kompletten Inhalt dieser Datei einfügen.
 *   3. Oben rechts "Bereitstellen" → "Neue Bereitstellung" → Typ: "Web-App".
 *        - Ausführen als: Ich
 *        - Zugriff: "Jeder" (damit der Browser der Besucher posten darf)
 *   4. Web-App-URL kopieren (endet auf /exec) und ins Frontend eintragen
 *      (siehe docs/quiz-ad-campaigns.md → "Frontend-Anbindung").
 *   5. Nach Code-Änderungen: "Bereitstellen" → "Bereitstellungen verwalten"
 *      → Stift → Version "Neu" → Speichern (sonst läuft die alte Version).
 *
 * Die Tabs und Kopfzeilen werden beim ersten Eintrag automatisch erstellt.
 * -------------------------------------------------------------------------
 */

// Feste Spaltenreihenfolge. Neue Antwort-Keys landen zusätzlich als JSON in "answers_json".
var COLUMNS = [
  'timestamp',      // ISO-Zeit des Eingangs
  'quiz',           // creatin-hcl | eaa | mystery-box
  'session_id',     // zufällige ID pro Durchlauf (Frontend)
  'result_type',    // z.B. "wasser", "KRITISCH", "XL"
  'result_title',   // z.B. "Wasser-Speicherer"
  'answers_json',   // alle Antworten als JSON
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'fbclid',
  'referrer',
  'user_agent',
  'page_url',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // gleichzeitige Schreibvorgänge serialisieren

    var payload = parseBody_(e);
    var quiz = String(payload.quiz || 'unknown').trim().toLowerCase();
    var sheet = getOrCreateSheet_(quiz);

    var answers = payload.answers || {};
    var meta = payload.meta || {};

    var row = [
      new Date().toISOString(),
      quiz,
      payload.sessionId || '',
      payload.resultType || '',
      payload.resultTitle || '',
      JSON.stringify(answers),
      meta.utm_source || '',
      meta.utm_medium || '',
      meta.utm_campaign || '',
      meta.utm_content || '',
      meta.fbclid || '',
      meta.referrer || '',
      meta.userAgent || '',
      meta.pageUrl || '',
    ];
    sheet.appendRow(row);

    return json_({ ok: true, quiz: quiz, row: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Health-Check im Browser: .../exec öffnen → sollte {"ok":true,...} zeigen.
function doGet() {
  return json_({ ok: true, service: 'brustbizeps-quiz-sheets', tabs: COLUMNS.length });
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    // Fallback: form-encoded (payload=...)
    if (e.parameter && e.parameter.payload) {
      try { return JSON.parse(e.parameter.payload); } catch (e2) { return {}; }
    }
    return {};
  }
}

function getOrCreateSheet_(quiz) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = quiz || 'unknown';
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
