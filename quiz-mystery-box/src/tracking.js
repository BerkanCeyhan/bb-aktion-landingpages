// Meta Pixel event helper. No-ops safely if fbq is blocked/absent.
export function track(event, params = {}, standard = false) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(standard ? 'track' : 'trackCustom', event, params);
    }
  } catch {
    /* pixel blocked — ignore */
  }
}

// Quiz-Submission an Google Sheets (Apps Script Web-App). No-op bei Fehlern.
const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbySBF477nLecmsQ0SU35HrvVPXyGRgI1qUmjftCQYOrUJbno0e7wk5OyyK5Dy8oYXsu/exec';

// Eine ID je Durchlauf, stabil ueber alle Schritte hinweg. Frueher wurde sie
// erst beim Absenden erzeugt; dann liessen sich Schritte und Abschluss nicht
// zusammenfuehren und der Abbruch je Frage blieb unsichtbar.
export const sessionId = (() => {
  try {
    return (crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
  } catch {
    return String(Date.now());
  }
})();

function meta_() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_content: p.get('utm_content') || '',
    fbclid: p.get('fbclid') || '',
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    pageUrl: window.location.href,
  };
}

function post_(body) {
  try {
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });
  } catch {
    /* sheets down — ignore */
  }
}

// Ein Ping je erreichtem Screen, Zieltab "<quiz>-steps". Ohne das ist der
// Abbruch je Frage nicht messbar und das SOP-Tor fuer Quiz-Aenderungen
// (Abbruch >60 % an einem Schritt) gar nicht erreichbar.
export function sendStep(quiz, stepIndex, stepId, stepType) {
  post_({
    kind: 'step',
    quiz,
    sessionId,
    stepIndex,
    stepId: stepId || '',
    stepType: stepType || '',
    meta: meta_(),
  });
}

// `extra` traegt Adresse, Einwilligung und die Klaviyo-Eigenschaften. Die
// Anmeldung passiert bewusst dort und nicht hier im Browser: a.klaviyo.com wird
// von Trackerblockern und In-App-Browsern geschluckt, und ein fehlgeschlagenes
// fetch faellt hier niemandem auf. Siehe sop/e-mail-einsammeln.md §4.
export function saveSubmission(quiz, resultType, resultTitle, answers, extra = {}) {
  post_({
    quiz,
    resultType,
    resultTitle,
    answers,
    ...extra,
    sessionId,
    meta: meta_(),
  });
}
