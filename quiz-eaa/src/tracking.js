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

// `extra` traegt Adresse, Einwilligung und die Klaviyo-Eigenschaften. Die
// Anmeldung passiert bewusst dort und nicht hier im Browser: a.klaviyo.com wird
// von Trackerblockern und In-App-Browsern geschluckt, und ein fehlgeschlagenes
// fetch faellt hier niemandem auf. Siehe sop/e-mail-einsammeln.md §4.
export function saveSubmission(quiz, resultType, resultTitle, answers, extra = {}) {
  try {
    const p = new URLSearchParams(window.location.search);
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        quiz,
        resultType,
        resultTitle,
        answers,
        ...extra,
        sessionId: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()),
        meta: {
          utm_source: p.get('utm_source') || '',
          utm_medium: p.get('utm_medium') || '',
          utm_campaign: p.get('utm_campaign') || '',
          utm_content: p.get('utm_content') || '',
          fbclid: p.get('fbclid') || '',
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
        },
      }),
    });
  } catch {
    /* sheets down — ignore */
  }
}
