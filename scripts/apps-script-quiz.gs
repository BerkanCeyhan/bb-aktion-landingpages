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
  'email',           // nur wenn der Besucher eingewilligt hat
  'newsletter_optin',// freiwillige zweite Einwilligung
  'klaviyo_status',  // 202 = angenommen, sonst Fehlertext
];

// Tab "<quiz>-steps": ein Ping je erreichtem Screen, damit der Abbruch je Frage
// sichtbar wird. Das Lead-Blatt kennt nur Abschluesse und kann das nicht zeigen.
var STEP_COLUMNS = [
  'timestamp',
  'quiz',
  'session_id',  // dieselbe ID wie in der spaeteren Abschlusszeile
  'step_index',  // Position im screens-Array
  'step_id',     // z.B. "budget"; leer bei hook/interstitial/email/loading
  'step_type',   // hook | single | multi | interstitial | email | loading | result
  'utm_campaign',
  'utm_content', // Ad-ID, damit sich der Abbruch je Anzeige aufschluesseln laesst
];

/**
 * Klaviyo-Anmeldung serverseitig.
 *
 * Warum nicht im Browser: der Aufruf aus der Seite scheitert bei einem Teil der
 * Besucher lautlos. a.klaviyo.com steht auf Tracker-Blocklisten, dazu kommen
 * In-App-Browser aus Meta-Anzeigen. Der Fehler ist im Frontend nicht sichtbar,
 * weil ein fehlgeschlagenes fetch dort abgefangen wird. Von hier aus ist der
 * Aufruf server-zu-server und damit unblockbar.
 *
 * Es wird bewusst der oeffentliche Client-Endpunkt benutzt: er kommt mit der
 * Site-ID aus, kein privater Schluessel muss im Script liegen, und er erzwingt
 * Double Opt-in.
 */
var KLAVIYO_PUBLIC_KEY = 'XugDYa';
var KLAVIYO_REVISION = '2026-07-15';

// Zielliste je Quiz. Fehlt ein Eintrag, wird nichts an Klaviyo geschickt.
var KLAVIYO_LISTS = {
  'mystery-box': 'TLMGKq',
};

function subscribeToKlaviyo_(quiz, email, payload) {
  var listId = KLAVIYO_LISTS[quiz];
  if (!listId || !email) return '';

  var props = payload.klaviyoProps || {};
  props.quiz_source = 'quiz-' + quiz;

  var body = {
    data: {
      type: 'subscription',
      attributes: {
        custom_source: 'Quiz Funnel',
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email: email,
              properties: props,
              subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
            },
          },
        },
      },
      relationships: { list: { data: { type: 'list', id: listId } } },
    },
  };

  try {
    var res = UrlFetchApp.fetch(
      'https://a.klaviyo.com/client/subscriptions?company_id=' + KLAVIYO_PUBLIC_KEY,
      {
        method: 'post',
        contentType: 'application/json',
        headers: { revision: KLAVIYO_REVISION },
        payload: JSON.stringify(body),
        muteHttpExceptions: true,
      }
    );
    var code = res.getResponseCode();
    return code === 202 ? '202' : code + ' ' + res.getContentText().slice(0, 200);
  } catch (err) {
    return 'ERR ' + String(err).slice(0, 200);
  }
}

/**
 * Im Editor von Hand ausfuehren, um die Berechtigung fuer ausgehende Aufrufe
 * zu erteilen.
 *
 * `doGet` anzustossen genuegt dafuer nicht: die Funktion ruft kein
 * UrlFetchApp auf, also fragt Google auch nichts nach und die bestehende
 * Autorisierung wird stillschweigend weiterverwendet. Diese Funktion macht
 * einen echten ausgehenden Aufruf, deshalb erscheint der Dialog.
 *
 * Nach dem Bestaetigen laeuft sie durch und schreibt das Ergebnis ins
 * Ausfuehrungsprotokoll. Danach die Bereitstellung auf eine neue Version heben.
 */
function pruefeVerbindung() {
  var res = UrlFetchApp.fetch('https://a.klaviyo.com/client/subscriptions?company_id=' + KLAVIYO_PUBLIC_KEY, {
    method: 'post',
    contentType: 'application/json',
    headers: { revision: KLAVIYO_REVISION },
    payload: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          custom_source: 'Verbindungstest',
          profile: { data: { type: 'profile', attributes: {
            email: 'verbindungstest-' + Date.now() + '@mailinator.com',
            subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
          } } },
        },
        relationships: { list: { data: { type: 'list', id: KLAVIYO_LISTS['mystery-box'] } } },
      },
    }),
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  Logger.log('Klaviyo antwortet: ' + code + (code === 202 ? '  (erwartet, alles gut)' : '  ' + res.getContentText().slice(0, 300)));
  return code;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // gleichzeitige Schreibvorgänge serialisieren

    var payload = parseBody_(e);
    var quiz = String(payload.quiz || 'unknown').trim().toLowerCase();

    // Schritt-Ping. Eigener Tab, eigene Spalten, kein Klaviyo. Muss vor dem
    // Submission-Zweig stehen, sonst landet jeder Schritt als leere Lead-Zeile
    // im Hauptblatt und die Lead-Zahl ist Schrott.
    if (payload.kind === 'step') return appendStep_(quiz, payload);

    var sheet = getOrCreateSheet_(quiz);

    var answers = payload.answers || {};
    var meta = payload.meta || {};

    // Adresse steht in den Antworten unter _email, sobald eingewilligt wurde.
    var email = String(payload.email || answers._email || '').trim();
    var klaviyoStatus = email ? subscribeToKlaviyo_(quiz, email, payload) : '';

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
      email,
      payload.newsletterOptin === true ? 'ja' : (email ? 'nein' : ''),
      klaviyoStatus,
    ];
    sheet.appendRow(row);

    return json_({ ok: true, quiz: quiz, row: sheet.getLastRow(), klaviyo: klaviyoStatus });
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

// Ein Ping je erreichtem Screen. Append-only, absichtlich schmal: der Tab
// waechst rund zwoelfmal so schnell wie das Lead-Blatt, also nur das Noetige.
// Auswertung: je session_id den hoechsten step_index nehmen, das ist die
// Abbruchstelle. Bei Bedarf aeltere Zeilen abschneiden, sie sind reine Zaehlung.
function appendStep_(quiz, payload) {
  var meta = payload.meta || {};
  var sheet = getOrCreateStepSheet_(quiz);
  sheet.appendRow([
    new Date().toISOString(),
    quiz,
    payload.sessionId || '',
    Number(payload.stepIndex),
    payload.stepId || '',
    payload.stepType || '',
    meta.utm_campaign || '',
    meta.utm_content || '',
  ]);
  return json_({ ok: true, kind: 'step', row: sheet.getLastRow() });
}

function getOrCreateStepSheet_(quiz) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = (quiz || 'unknown') + '-steps';
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(STEP_COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, STEP_COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
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
    return sheet;
  }
  // Bestehende Tabs auf die aktuelle Spaltenliste heben. Ohne das schreibt
  // appendRow die neuen Werte in Spalten ohne Ueberschrift.
  var have = sheet.getLastColumn();
  if (have < COLUMNS.length) {
    sheet.getRange(1, have + 1, 1, COLUMNS.length - have)
      .setValues([COLUMNS.slice(have)])
      .setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
