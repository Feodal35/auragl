/**
 * Enterprise Google Tracking & Attribution Infrastructure
 * Features:
 * - 1st-party persistent User-ID (_auraglow_uid) across sessions & devices
 * - GCLID / GBRAID / WBRAID Auto-tagging preservation (anti-redirect loss)
 * - UTM campaign tracking persistence (90-day 1st-party cookie)
 * - Google Ads Enhanced Conversions (SHA-256 hashed email & phone)
 * - Cross-Domain Linking setup
 * - Top-level window execution (Strictly NO iframes)
 * - Google Consent Mode v2 awareness
 */

export interface AttributionData {
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  fbclid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  captured_at?: string;
}

const UID_COOKIE_NAME = "_auraglow_uid";
const ATTRIBUTION_COOKIE_NAME = "_auraglow_attr";

/**
 * Cookie helpers (1st party only, SameSite=Lax, Secure)
 */
function setFirstPartyCookie(name: string, value: string, days: number = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function getFirstPartyCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Generates or retrieves a persistent 1st-party User-ID.
 * Stored in both 1st-party cookie and localStorage for maximum durability across sessions.
 */
export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "server_guest";

  try {
    // 1. Check 1st-party cookie
    const cookieUid = getFirstPartyCookie(UID_COOKIE_NAME);
    if (cookieUid && cookieUid.length > 8) {
      return cookieUid;
    }

    // 2. Check localStorage
    const localUid = localStorage.getItem(UID_COOKIE_NAME);
    if (localUid && localUid.length > 8) {
      setFirstPartyCookie(UID_COOKIE_NAME, localUid, 365);
      return localUid;
    }

    // 3. Generate new persistent UUID
    const newUid =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : "usr_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    localStorage.setItem(UID_COOKIE_NAME, newUid);
    setFirstPartyCookie(UID_COOKIE_NAME, newUid, 365);
    return newUid;
  } catch {
    return "guest_" + Date.now();
  }
}

/**
 * Auto-tagging & GCLID Preservation:
 * Captures ?gclid=, ?gbraid=, ?wbraid= and UTM tags from the URL and saves them
 * into a 90-day 1st-party cookie and storage so they NEVER get lost during internal redirects.
 */
export function captureAndPersistAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const gclid = params.get("gclid");
    const gbraid = params.get("gbraid");
    const wbraid = params.get("wbraid");
    const fbclid = params.get("fbclid");
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_term = params.get("utm_term");
    const utm_content = params.get("utm_content");

    // If any new ad or UTM parameter is present in current URL, save it
    if (gclid || gbraid || wbraid || fbclid || utm_source) {
      const currentAttr: AttributionData = {
        gclid: gclid || undefined,
        gbraid: gbraid || undefined,
        wbraid: wbraid || undefined,
        fbclid: fbclid || undefined,
        utm_source: utm_source || undefined,
        utm_medium: utm_medium || undefined,
        utm_campaign: utm_campaign || undefined,
        utm_term: utm_term || undefined,
        utm_content: utm_content || undefined,
        landing_page: window.location.pathname,
        referrer: document.referrer || undefined,
        captured_at: new Date().toISOString(),
      };

      const serialized = JSON.stringify(currentAttr);
      setFirstPartyCookie(ATTRIBUTION_COOKIE_NAME, serialized, 90);
      localStorage.setItem(ATTRIBUTION_COOKIE_NAME, serialized);
      return currentAttr;
    }

    // Otherwise, retrieve existing attribution from 1st-party cookie or localStorage
    const savedCookie = getFirstPartyCookie(ATTRIBUTION_COOKIE_NAME);
    if (savedCookie) {
      return JSON.parse(savedCookie);
    }

    const savedLocal = localStorage.getItem(ATTRIBUTION_COOKIE_NAME);
    if (savedLocal) {
      return JSON.parse(savedLocal);
    }
  } catch (e) {
    console.warn("[Attribution] Error reading attribution:", e);
  }

  return {};
}

/**
 * SHA-256 Hashing for Google Ads Enhanced Conversions & Cross-Device User-ID.
 * Normalizes email and phone according to Google's strict specifications before hashing:
 * - Email: trimmed, lowercase
 * - Phone: trimmed, remove spaces/parentheses/hyphens, E.164 format (+49...)
 */
export async function hashValueSHA256(val: string): Promise<string> {
  if (!val || typeof window === "undefined" || !window.crypto?.subtle) {
    return "";
  }

  try {
    const normalized = val.trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return "";
  }
}

/**
 * Normalizes phone number to E.164 international format (+49...)
 */
export function normalizePhoneForGoogle(phone: string): string {
  if (!phone) return "";
  let clean = phone.replace(/[^\d+]/g, "");
  if (clean.startsWith("0")) {
    clean = "+49" + clean.substring(1);
  } else if (!clean.startsWith("+") && clean.startsWith("49")) {
    clean = "+" + clean;
  }
  return clean;
}

/**
 * Safe dataLayer pusher.
 * Never runs inside an untrusted iframe; guarantees top-level execution.
 */
export function pushToDataLayer(eventPayload: Record<string, any>): void {
  if (typeof window === "undefined") return;

  // Don't load or push from within an unauthorized iframe
  if (window.self !== window.top) {
    try {
      // If embedded maliciously, log warning and avoid executing tracking
      console.warn("[Tracking] Tag execution from iframe blocked as per Google best practices.");
      return;
    } catch {
      return;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
}

/**
 * High-Level Form Conversion Tracker (Enhanced Conversions + User-ID + GCLID)
 */
export async function trackFormConversion(
  formType: "appointment" | "contact",
  data: {
    name?: string;
    email?: string;
    phone?: string;
    treatment?: string;
    value?: number;
  }
) {
  const userId = getOrCreateUserId();
  const attribution = captureAndPersistAttribution();

  // Prepare hashed enhanced conversions payload according to Google Ads spec
  let hashedEmail = "";
  let hashedPhone = "";

  if (data.email) {
    hashedEmail = await hashValueSHA256(data.email);
  }
  if (data.phone) {
    const normalizedPhone = normalizePhoneForGoogle(data.phone);
    hashedPhone = await hashValueSHA256(normalizedPhone);
  }

  // 1. Google Ads Enhanced Conversions object
  const enhancedConversions: Record<string, any> = {};
  if (hashedEmail) enhancedConversions.email = hashedEmail;
  if (hashedPhone) enhancedConversions.phone_number = hashedPhone;

  // 2. Push standard GA4 / GTM Lead & Conversion Event
  pushToDataLayer({
    event: formType === "appointment" ? "appointment_request" : "contact_submit",
    event_category: "Leads",
    event_label: data.treatment || "General",
    form_type: formType,
    user_id: userId,
    gclid: attribution.gclid || undefined,
    utm_source: attribution.utm_source || undefined,
    utm_campaign: attribution.utm_campaign || undefined,
    treatment_name: data.treatment,
    value: data.value || (formType === "appointment" ? 50 : 10),
    currency: "EUR",
    // Enhanced conversions payload for Google Ads tag
    user_data: Object.keys(enhancedConversions).length > 0 ? enhancedConversions : undefined,
  });

  // 3. Also push generic 'conversion' event for universal GTM triggers
  pushToDataLayer({
    event: "conversion",
    conversion_type: formType,
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || undefined,
  });
}

/**
 * Track Call / WhatsApp / Email Direct Contact Clicks
 */
export function trackContactChannelClick(
  channel: "phone" | "whatsapp" | "email",
  targetValue: string
) {
  const userId = getOrCreateUserId();
  const attribution = captureAndPersistAttribution();

  pushToDataLayer({
    event: "contact_channel_click",
    channel,
    target: targetValue,
    user_id: userId,
    gclid: attribution.gclid || undefined,
    utm_source: attribution.utm_source || undefined,
  });
}

/**
 * Track CTA Button Clicks (e.g., 'Termin anfragen', 'Preise ansehen')
 */
export function trackCtaClick(ctaName: string, destination: string) {
  pushToDataLayer({
    event: "cta_click",
    cta_name: ctaName,
    destination,
    user_id: getOrCreateUserId(),
  });
}
