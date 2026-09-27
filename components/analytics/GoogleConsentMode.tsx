import React from "react";
import Script from "next/script";

interface GoogleConsentModeProps {
  gaId?: string;
  gtmId?: string;
}

/**
 * Google Consent Mode v2 & Google Tag Integration
 *
 * Implements Google's official Consent Mode v2 standard:
 * - ad_storage
 * - analytics_storage
 * - ad_user_data (v2)
 * - ad_personalization (v2)
 * - functionality_storage
 * - personalization_storage
 * - security_storage
 *
 * Synchronously sets default consent before any tags run, reading any previously saved
 * preferences immediately from localStorage to prevent flash of unconsented/denied state.
 */
export default function GoogleConsentMode({
  gaId = process.env.NEXT_PUBLIC_GA_ID,
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
}: GoogleConsentModeProps) {
  // Inline script that executes synchronously in the HTML head
  const consentScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    (function() {
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
      } catch (e) {
        // Fallback to strict denied
      }

      gtag('consent', 'default', defaultConsent);
      gtag('set', 'ads_data_redaction', true);
      gtag('set', 'url_passthrough', true);
    })();
  `;

  return (
    <>
      {/* 1. Synchronous Consent Mode v2 Default Setup */}
      <script
        id="google-consent-mode-v2"
        dangerouslySetInnerHTML={{ __html: consentScript }}
      />

      {/* 2. Google Tag Manager (if GTM ID is provided) */}
      {gtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
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

      {/* 3. Google Analytics 4 / Google Tag (if GA ID is provided) */}
      {gaId && !gtmId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  anonymize_ip: true,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
