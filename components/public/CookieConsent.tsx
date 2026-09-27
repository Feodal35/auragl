"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Sliders,
  Check,
  X,
  ChevronRight,
  Info,
  Lock,
} from "lucide-react";
import {
  CONSENT_EVENT_NAME,
  getStoredConsent,
  acceptAllConsent,
  acceptEssentialOnly,
  saveConsent,
  ConsentPreferences,
} from "@/lib/consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isDetailedView, setIsDetailedView] = useState(false);

  // Granular toggle state
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(false);

  // Load existing state or show banner after initial mount
  useEffect(() => {
    setHasLoaded(true);
    const stored = getStoredConsent();

    if (stored) {
      setAnalyticsEnabled(stored.analytics);
      setMarketingEnabled(stored.marketing);
      setPersonalizationEnabled(stored.personalization);
    } else {
      // First-time visitor: delay slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for reopen event from footer
  useEffect(() => {
    const handleReopen = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalyticsEnabled(current.analytics);
        setMarketingEnabled(current.marketing);
        setPersonalizationEnabled(current.personalization);
      }
      setIsDetailedView(true);
      setIsVisible(true);
    };

    window.addEventListener(CONSENT_EVENT_NAME, handleReopen);
    return () => window.removeEventListener(CONSENT_EVENT_NAME, handleReopen);
  }, []);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        setIsVisible(false);
      }
    },
    [isVisible]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleAcceptAll = () => {
    acceptAllConsent();
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setPersonalizationEnabled(true);
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    acceptEssentialOnly();
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setPersonalizationEnabled(false);
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    saveConsent({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      ad_user_data: marketingEnabled,
      ad_personalization: marketingEnabled,
      personalization: personalizationEnabled,
    });
    setIsVisible(false);
  };

  if (!hasLoaded || !isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-0 z-50 flex items-end sm:items-end justify-center sm:justify-start p-4 sm:p-6 bg-black/30 backdrop-blur-[2px] transition-all animate-in fade-in duration-300"
    >
      <div
        className="w-full sm:max-w-xl max-h-[90vh] overflow-y-auto bg-[#F7F3EE] border border-[#E8D6C5] rounded-[2px] shadow-[0_12px_45px_rgba(33,26,24,0.18)] p-6 sm:p-7 text-[#392D29] space-y-5 animate-in slide-in-from-bottom-5 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#E8D6C5]/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EFE6DD] flex items-center justify-center text-[#A26D57]">
              <Cookie className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="cookie-banner-title" className="font-editorial text-xl sm:text-2xl text-[#392D29]">
                Privatsphäre &amp; Cookie-Präferenzen
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-[#A26D57] font-medium">
                Google Consent Mode v2 &bull; DSGVO &bull; § 25 TDDDG
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="text-[#756A63] hover:text-[#392D29] p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
            aria-label="Nur essenzielle Cookies akzeptieren und schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!isDetailedView ? (
          /* Simple View */
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
              Wir verwenden Cookies und moderne Web-Technologien, um dir den bestmöglichen Service zu bieten und unsere Website kontinuierlich zu verbessern. Über den <strong>Google Consent Mode v2</strong> stellen wir sicher, dass Werbe- und Analysedaten (Google Tag) nur dann an Google übermittelt werden, wenn du dem ausdrücklich zustimmst.
            </p>
            <p className="text-xs text-[#756A63]/80 font-light leading-relaxed">
              Du kannst selbst entscheiden, welche Kategorien du erlauben möchtest. Technisch notwendige Cookies sind für die Kernfunktionen stets aktiv (§ 25 Abs. 2 TDDDG).
            </p>

            {/* Quick feature pill tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE6DD]/70 text-[11px] text-[#756A63]">
                <ShieldCheck className="w-3 h-3 text-[#A26D57]" />
                Keine Datenübertragung ohne Einwilligung
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE6DD]/70 text-[11px] text-[#756A63]">
                <Lock className="w-3 h-3 text-[#A26D57]" />
                Jederzeit im Footer widerrufbar
              </span>
            </div>
          </div>
        ) : (
          /* Granular Settings View (Consent Mode v2 categories) */
          <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
            {/* 1. Essential / Strictly Necessary */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#A26D57]" />
                  <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                    1. Essenziell (Technisch notwendig)
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#FAF6F1] text-[#A26D57] border border-[#E8D6C5] rounded">
                  Immer aktiv
                </span>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                Erforderlich für den sicheren Betrieb der Website, Formularvalidierung, CSRF-Schutz und Speicherung deiner Cookie-Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG).
              </p>
            </div>

            {/* 2. Analytics (Google Analytics / analytics_storage) */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                  2. Analyse &amp; Statistik (Google Analytics)
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Analyse & Statistik aktivieren"
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                Signalisiert <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">analytics_storage</code> an Google Tag. Ermöglicht anonymisierte Reichweitenmessung, um Besuchszahlen und Behandlungsinteressen zu verstehen.
              </p>
            </div>

            {/* 3. Marketing & Google Tag Consent Mode v2 */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium text-[#392D29] block">
                    3. Marketing &amp; Google Ads (Consent Mode v2)
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Marketing & Google Ads aktivieren"
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                Übermittelt die Consent Mode v2 Signale <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_storage</code>, <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_user_data</code> und <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_personalization</code> an Google zur Konversionsmessung und zielgerichteten Kampagnenausspielung.
              </p>
            </div>

            {/* 4. Personalization */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                  4. Personalisierung
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalizationEnabled}
                    onChange={(e) => setPersonalizationEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Personalisierung aktivieren"
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                Speichert individuelle Stile und Präferenzen (<code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">personalization_storage</code>) für ein maßgeschneidertes Studioerlebnis.
              </p>
            </div>
          </div>
        )}

        {/* Legal Links */}
        <div className="text-[11px] text-[#756A63] font-light flex items-center justify-between pt-1 border-t border-[#E8D6C5]/50">
          <div className="flex items-center gap-3">
            <Link
              href="/datenschutz"
              target="_blank"
              className="underline hover:text-[#A26D57] transition-colors"
            >
              Datenschutzerklärung
            </Link>
            <span>&bull;</span>
            <Link
              href="/impressum"
              target="_blank"
              className="underline hover:text-[#A26D57] transition-colors"
            >
              Impressum
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsDetailedView((prev) => !prev)}
            className="text-[#A26D57] hover:underline inline-flex items-center gap-1 font-medium min-h-[36px]"
          >
            <Sliders className="w-3 h-3" />
            <span>{isDetailedView ? "Einfache Ansicht" : "Einstellungen anpassen"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          {isDetailedView ? (
            <>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="btn-primary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 font-medium shadow-luxury-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Auswahl speichern</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-secondary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center font-medium"
              >
                <span>Alle akzeptieren</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-primary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 font-medium shadow-luxury-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Alle akzeptieren</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="btn-secondary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center font-medium"
              >
                <span>Nur essenzielle</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
