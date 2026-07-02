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
