// Klaviyo client-side subscribe (static-site safe).
// Uses the PUBLIC api key (company_id) only — never a private key in the browser.
// The /client/subscriptions endpoint always triggers double opt-in, so the lead
// gets a confirmation mail and is only marketing-subscribed after they confirm.
//
// Fill these two after the Klaviyo list is created (both are safe to ship):
export const KLAVIYO_PUBLIC_KEY = ''; // e.g. 'ABC123'  (Settings → API keys → Public)
export const KLAVIYO_LIST_ID = '';    // e.g. 'XyZ123'  (the "Quiz Funnel Leads" list)

export const PRIVACY_URL = 'https://brustbizeps.de/policies/privacy-policy';

const REVISION = '2026-07-15';

export function klaviyoConfigured() {
  return Boolean(KLAVIYO_PUBLIC_KEY && KLAVIYO_LIST_ID);
}

// Subscribe an email with marketing consent + quiz properties. No-ops (resolves)
// if not configured or on error, so the funnel never blocks on Klaviyo.
export async function subscribe(email, properties = {}) {
  if (!klaviyoConfigured() || !email) return false;
  try {
    await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${KLAVIYO_PUBLIC_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', revision: REVISION },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            custom_source: 'Quiz Funnel',
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email,
                  properties,
                  subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
                },
              },
            },
          },
          relationships: { list: { data: { type: 'list', id: KLAVIYO_LIST_ID } } },
        },
      }),
    });
    return true;
  } catch {
    return false;
  }
}
