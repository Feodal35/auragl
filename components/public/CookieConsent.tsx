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
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CookieConsent() {
  const { t, locale } = useLanguage();
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
      className="fixed inset-x-0 bottom-0 z-50 sm:inset-0 sm:flex sm:items-end sm:justify-start sm:p-6 bg-transparent sm:bg-black/30 sm:backdrop-blur-[2px] transition-all animate-in fade-in duration-300"
    >
      <div
        className="w-full sm:max-w-xl max-h-[70vh] sm:max-h-[90vh] overflow-y-auto bg-[#F7F3EE] border border-[#E8D6C5] sm:rounded-[2px] shadow-[0_-4px_24px_rgba(33,26,24,0.14)] sm:shadow-[0_12px_45px_rgba(33,26,24,0.18)] p-4 sm:p-7 text-[#392D29] space-y-4 sm:space-y-5 animate-in slide-in-from-bottom-5 duration-300"
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
                {t.cookie.title}
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-[#A26D57] font-medium">
                Google Consent Mode v2 &bull; DSGVO / GDPR &bull; § 25 TDDDG
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="text-[#756A63] hover:text-[#392D29] p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
            aria-label={t.cookie.btnEssentialOnly}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!isDetailedView ? (
          /* Simple View */
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
              {t.cookie.desc}
            </p>
            <p className="text-xs text-[#756A63]/80 font-light leading-relaxed">
              {locale === "en"
                ? "You can choose which categories you allow. Technically necessary cookies remain active for essential website functions (§ 25 para. 2 TDDDG)."
                : "Du kannst selbst entscheiden, welche Kategorien du erlauben möchtest. Technisch notwendige Cookies sind für die Kernfunktionen stets aktiv (§ 25 Abs. 2 TDDDG)."}
            </p>

            {/* Quick feature pill tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE6DD] text-[11px] text-[#392D29] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#844C36]" />
                {locale === "en" ? "No data transfer without consent" : "Keine Datenübertragung ohne Einwilligung"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE6DD] text-[11px] text-[#392D29] font-medium">
                <Lock className="w-3.5 h-3.5 text-[#844C36]" />
                {locale === "en" ? "Revocable anytime in footer" : "Jederzeit im Footer widerrufbar"}
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
                  <Lock className="w-3.5 h-3.5 text-[#844C36]" />
                  <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                    {t.cookie.categoryNecessary}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#FAF6F1] text-[#844C36] font-semibold border border-[#E8D6C5] rounded">
                  {t.cookie.alwaysActive}
                </span>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                {t.cookie.categoryNecessaryDesc}
              </p>
            </div>

            {/* 2. Analytics (Google Analytics / analytics_storage) */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                  {t.cookie.categoryAnalytics}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label={t.cookie.categoryAnalytics}
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                {t.cookie.categoryAnalyticsDesc} (<code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">analytics_storage</code>).
              </p>
            </div>

            {/* 3. Marketing & Google Tag Consent Mode v2 */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium text-[#392D29] block">
                    {t.cookie.categoryMarketing}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label={t.cookie.categoryMarketing}
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                {t.cookie.categoryMarketingDesc} (<code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_storage</code>, <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_user_data</code>, <code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">ad_personalization</code>).
              </p>
            </div>

            {/* 4. Personalization */}
            <div className="p-3.5 bg-white border border-[#E8D6C5] rounded-[1px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-medium text-[#392D29]">
                  {t.cookie.categoryPreferences}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalizationEnabled}
                    onChange={(e) => setPersonalizationEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label={t.cookie.categoryPreferences}
                  />
                  <div className="w-9 h-5 bg-[#E8D6C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A26D57]"></div>
                </label>
              </div>
              <p className="text-[11px] text-[#756A63] font-light leading-relaxed">
                {t.cookie.categoryPreferencesDesc} (<code className="text-[#392D29] bg-[#FAF6F1] px-1 py-0.5 rounded">personalization_storage</code>).
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
              {t.footer.privacy}
            </Link>
            <span>&bull;</span>
            <Link
              href="/impressum"
              target="_blank"
              className="underline hover:text-[#A26D57] transition-colors"
            >
              {t.footer.impressum}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsDetailedView((prev) => !prev)}
            className="text-[#A26D57] hover:underline inline-flex items-center gap-1 font-medium min-h-[36px]"
          >
            <Sliders className="w-3 h-3" />
            <span>{isDetailedView ? (locale === "en" ? "Simple View" : "Einfache Ansicht") : t.cookie.btnCustomize}</span>
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
                <span>{t.cookie.btnSave}</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-secondary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center font-medium"
              >
                <span>{t.cookie.btnAcceptAll}</span>
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
                <span>{t.cookie.btnAcceptAll}</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="btn-secondary text-xs py-2.5 px-4 min-h-[44px] flex-1 inline-flex items-center justify-center font-medium"
              >
                <span>{t.cookie.btnEssentialOnly}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
