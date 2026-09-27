"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { Locale, Translations, translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "de",
  setLocale: () => {},
  t: translations.de,
  isReady: false,
});

const COOKIE_NAME = "auraglow_lang";
const STORAGE_KEY = "auraglow_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");
  const [isReady, setIsReady] = useState(false);
  const [, startTransition] = useTransition();

  // Detect and synchronize initial language on mount
  useEffect(() => {
    let detectedLocale: Locale = "de";

    // 1. Check URL query param ?lang=en / ?lang=de
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang");
      if (urlLang === "en" || urlLang === "de") {
        detectedLocale = urlLang;
      } else {
        // 2. Check localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "de") {
          detectedLocale = stored;
        } else {
          // 3. Check Cookie
          const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
          if (match && (match[2] === "en" || match[2] === "de")) {
            detectedLocale = match[2] as Locale;
          }
        }
      }
    } catch {
      // Fallback silently in restricted environments
    }

    setLocaleState(detectedLocale);
    document.documentElement.lang = detectedLocale;
    setIsReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      setLocaleState(newLocale);
    });

    try {
      // Update DOM
      document.documentElement.lang = newLocale;

      // Update LocalStorage
      localStorage.setItem(STORAGE_KEY, newLocale);

      // Update 1st-party Cookie (1 year duration)
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Update URL query parameter cleanly without reloading
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newLocale === "en") {
          url.searchParams.set("lang", "en");
        } else {
          url.searchParams.delete("lang");
        }
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      // Ignore if storage is inaccessible
    }
  };

  const currentTranslations = translations[locale] || translations.de;

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: currentTranslations,
        isReady,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
