import React from "react";
import Script from "next/script";

interface GoogleConsentModeProps {
  gaId?: string;
  gtmId?: string;
}

/**
 * Enterprise Google Tracking & Consent Mode v2 Architecture
 *
 * Implements:
 * 1. Google Consent Mode v2 (ad_storage, analytics_storage, ad_user_data, ad_personalization)
 * 2. 1st-party Persistent User-ID (_auraglow_uid)
 * 3. Auto-tagging & GCLID preservation (anti-redirect loss)
 * 4. Cross-domain linking configuration (linker)
 * 5. Top-level execution verification (Strictly NO iframes)
 * 6. Google Tag Manager & Google Analytics 4 integration
 */
export default function GoogleConsentMode({
  gaId = process.env.NEXT_PUBLIC_GA_ID || "G-LECJM53WBS",
  gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KG93TJHK",
}: GoogleConsentModeProps) {
  const syncInitScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    (function() {
      // 1. Prevent execution inside unauthorized iframes (Google best practice: Don't load tags in iframe)
      if (window.self !== window.top) {
        console.warn("[Tracking] Tag execution from iframe blocked.");
        return;
      }

      // 2. 1st-party persistent User-ID (_auraglow_uid) across sessions & devices
      var uid = null;
      try {
        var cookieMatch = document.cookie.match(/(^|;\\s*)_auraglow_uid=([^;]*)/);
        if (cookieMatch) {
          uid = decodeURIComponent(cookieMatch[2]);
        }
        if (!uid) {
          uid = localStorage.getItem('_auraglow_uid');
        }
        if (!uid || uid.length < 8) {
          uid = 'usr_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
          localStorage.setItem('_auraglow_uid', uid);
          var expires = new Date(Date.now() + 365 * 864e5).toUTCString();
          var secure = window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = '_auraglow_uid=' + encodeURIComponent(uid) + '; expires=' + expires + '; path=/; SameSite=Lax' + secure;
        }
      } catch (e) {
        uid = 'guest_' + Date.now();
      }

      // 3. Auto-tagging & GCLID preservation (Prevent GCLID stripping on redirects)
      try {
        var sp = new URLSearchParams(window.location.search);
        var gclid = sp.get('gclid') || sp.get('gbraid') || sp.get('wbraid');
        if (gclid) {
          var gclidExpires = new Date(Date.now() + 90 * 864e5).toUTCString();
          var secureAttr = window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = '_auraglow_gclid=' + encodeURIComponent(gclid) + '; expires=' + gclidExpires + '; path=/; SameSite=Lax' + secureAttr;
          localStorage.setItem('_auraglow_gclid', gclid);
        }
      } catch (e) {}

      // 4. Default Google Consent Mode v2 State (Strictly denied by default in EEA/Germany)
      var defaultConsent = {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted',
        'wait_for_update': 500
      };

      // Check for previously saved consent
      try {
        var raw = localStorage.getItem('auraglow_cookie_consent_v2') || localStorage.getItem('auraglow_cookie_consent');
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed) {
            defaultConsent.ad_storage = parsed.marketing ? 'granted' : 'denied';
            defaultConsent.ad_user_data = (parsed.ad_user_data !== undefined ? parsed.ad_user_data : parsed.marketing) ? 'granted' : 'denied';
            defaultConsent.ad_personalization = (parsed.ad_personalization !== undefined ? parsed.ad_personalization : parsed.marketing) ? 'granted' : 'denied';
            defaultConsent.analytics_storage = parsed.analytics ? 'granted' : 'denied';
            defaultConsent.personalization_storage = parsed.personalization ? 'granted' : 'denied';
          }
        }
      } catch (e) {}

      gtag('consent', 'default', defaultConsent);
      gtag('set', 'ads_data_redaction', true);
      gtag('set', 'url_passthrough', true);

      // 5. Cross-domain linking configuration
      gtag('set', 'linker', {
        'domains': ['auraglow.de', 'www.auraglow.de', 'auragl.vercel.app', 'xn--aura6lowbymrvet-9vb.de', 'www.xn--aura6lowbymrvet-9vb.de'],
        'accept_incoming': true
      });

      // Push initial page parameters
      window.dataLayer.push({
        'user_id': uid,
        'cross_domain_domains': ['auraglow.de', 'www.auraglow.de', 'auragl.vercel.app', 'xn--aura6lowbymrvet-9vb.de', 'www.xn--aura6lowbymrvet-9vb.de']
      });
    })();
  `;

  return (
    <>
      {/* 1. Synchronous Consent Mode v2 & 1st-Party User ID Init in Head */}
      <script
        id="google-tracking-init"
        dangerouslySetInnerHTML={{ __html: syncInitScript }}
      />

      {/* 2. Google Tag Manager (if GTM ID is provided) - deferred to browser idle */}
      {gtmId && (
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* 3. Google Analytics 4 / Google Tag — loaded directly ONLY when GTM is NOT present */}
      {gaId && !gtmId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-analytics-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  anonymize_ip: true,
                  send_page_view: true,
                  linker: {
                    domains: ['auraglow.de', 'www.auraglow.de', 'auragl.vercel.app', 'xn--aura6lowbymrvet-9vb.de', 'www.xn--aura6lowbymrvet-9vb.de'],
                    accept_incoming: true
                  }
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

/**
 * Google Tag Manager NoScript Fallback Component (Placed immediately after <body> opening)
 */
export function GoogleTagManagerNoScript({ gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KG93TJHK" }: { gtmId?: string }) {
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager NoScript"
      />
    </noscript>
  );
}
