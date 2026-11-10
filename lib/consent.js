export const CONSENT_KEY = 'raia-consent-v1';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export function readConsent(storage, now = Date.now()) {
  try {
    const choice = JSON.parse(storage.getItem(CONSENT_KEY));
    return choice?.version === 1 && typeof choice.analytics === 'boolean' && Number.isFinite(choice.timestamp) && now >= choice.timestamp && now - choice.timestamp < CONSENT_MAX_AGE ? choice : null;
  } catch { return null; }
}
export function writeConsent(storage, analytics, now = Date.now()) {
  try { storage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, analytics: analytics === true, timestamp: now })); } catch { /* Browsing still works with blocked storage. */ }
}
