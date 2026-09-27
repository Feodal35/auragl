/**
 * Google Consent Mode v2 Helper Module
 * Compliant with Google Tag requirements (ad_storage, analytics_storage, ad_user_data, ad_personalization)
 * and German DSGVO / TDDDG regulations (§ 25 TDDDG).
 */

export const CONSENT_STORAGE_KEY = "auraglow_cookie_consent_v2";
export const LEGACY_STORAGE_KEY = "auraglow_cookie_consent";
export const CONSENT_EVENT_NAME = "openCookieSettings";

export interface ConsentPreferences {
  version: "2.0";
  timestamp: string;
  essential: boolean; // Always true (§ 25 Abs. 2 Nr. 2 TDDDG)
  analytics: boolean; // Maps to analytics_storage
  marketing: boolean; // Maps to ad_storage
  ad_user_data: boolean; // Maps to ad_user_data (Google Consent Mode v2)
  ad_personalization: boolean; // Maps to ad_personalization (Google Consent Mode v2)
  personalization: boolean; // Maps to personalization_storage
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Returns currently stored consent or null if not yet answered.
 */
export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === "2.0") {
        return parsed as ConsentPreferences;
      }
    }

    // Fallback/migration from v1 if present
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      const migrated: ConsentPreferences = {
        version: "2.0",
        timestamp: legacy.timestamp || new Date().toISOString(),
        essential: true,
        analytics: Boolean(legacy.analytics),
        marketing: Boolean(legacy.marketing),
        ad_user_data: Boolean(legacy.marketing),
        ad_personalization: Boolean(legacy.marketing),
        personalization: Boolean(legacy.marketing),
      };
      // Save migrated
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (err) {
    console.error("[Consent] Error reading stored consent:", err);
  }

  return null;
}

/**
 * Updates Google Consent Mode v2 signals via window.gtag and pushes event to dataLayer.
 */
export function pushGoogleConsent(
  prefs: ConsentPreferences,
  action: "default" | "update" = "update"
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  // Ensure window.gtag exists
  if (!window.gtag) {
    window.gtag = gtag;
  }

  const consentConfig = {
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.ad_user_data ? "granted" : "denied",
    ad_personalization: prefs.ad_personalization ? "granted" : "denied",
    analytics_storage: prefs.analytics ? "granted" : "denied",
    functionality_storage: "granted", // strictly necessary / basic UI
    personalization_storage: prefs.personalization ? "granted" : "denied",
    security_storage: "granted", // strictly necessary security
  };

  // 1. Dispatch gtag consent command
  window.gtag("consent", action, consentConfig);

  // 2. Push consent_update event for Google Tag Manager triggers
  window.dataLayer.push({
    event: "consent_update",
    consent_action: action,
    consent_preferences: prefs,
  });
}

/**
 * Persists preferences in localStorage and triggers Google Consent Mode update.
 */
export function saveConsent(prefs: Omit<ConsentPreferences, "version" | "timestamp" | "essential">): ConsentPreferences {
  const fullPrefs: ConsentPreferences = {
    version: "2.0",
    timestamp: new Date().toISOString(),
    essential: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    ad_user_data: prefs.ad_user_data ?? prefs.marketing,
    ad_personalization: prefs.ad_personalization ?? prefs.marketing,
    personalization: prefs.personalization ?? false,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullPrefs));
    } catch (e) {
      console.error("[Consent] Failed to save in localStorage:", e);
    }

    pushGoogleConsent(fullPrefs, "update");
  }

  return fullPrefs;
}

/**
 * Grants all consent signals.
 */
export function acceptAllConsent(): ConsentPreferences {
  return saveConsent({
    analytics: true,
    marketing: true,
    ad_user_data: true,
    ad_personalization: true,
    personalization: true,
  });
}

/**
 * Denies all non-essential consent signals.
 */
export function acceptEssentialOnly(): ConsentPreferences {
  return saveConsent({
    analytics: false,
    marketing: false,
    ad_user_data: false,
    ad_personalization: false,
    personalization: false,
  });
}

/**
 * Dispatches custom window event to reopen consent modal.
 */
export function openConsentSettings(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME));
  }
}
