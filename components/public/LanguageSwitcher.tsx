"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "mobile";
  className?: string;
  isTransparentHeader?: boolean;
}

export default function LanguageSwitcher({
  variant = "header",
  className = "",
  isTransparentHeader = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const handleSelect = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  if (variant === "footer") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs text-[#EFE6DD]/70",
          className
        )}
        role="group"
        aria-label="Sprachauswahl / Language selection"
      >
        <Globe className="w-3.5 h-3.5 text-[#D9A891]" aria-hidden="true" />
        <span className="font-light">Sprache:</span>
        <div className="inline-flex items-center rounded-sm bg-white/5 border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => handleSelect("de")}
            className={cn(
              "px-2 py-0.5 text-[11px] font-medium tracking-wider uppercase rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A891]",
              locale === "de"
                ? "bg-[#844C36] text-white shadow-xs"
                : "text-[#EFE6DD]/60 hover:text-white"
            )}
            aria-pressed={locale === "de"}
            aria-label="Deutsch wählen"
          >
            DE
          </button>
          <span className="text-white/20 text-[10px] mx-0.5" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className={cn(
              "px-2 py-0.5 text-[11px] font-medium tracking-wider uppercase rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A891]",
              locale === "en"
                ? "bg-[#844C36] text-white shadow-xs"
                : "text-[#EFE6DD]/60 hover:text-white"
            )}
            aria-pressed={locale === "en"}
            aria-label="Select English"
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "w-full flex items-center justify-between py-2 px-3 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px]",
          className
        )}
        role="group"
        aria-label="Sprachauswahl / Language selection"
      >
        <div className="flex items-center gap-2 text-xs text-[#756A63]">
          <Globe className="w-4 h-4 text-[#A26D57]" aria-hidden="true" />
          <span className="font-medium">Sprache / Language</span>
        </div>
        <div className="flex items-center rounded-sm bg-white border border-[#E8D6C5] p-0.5 shadow-luxury-xs">
          <button
            type="button"
            onClick={() => handleSelect("de")}
            className={cn(
              "min-w-[40px] min-h-[32px] px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A26D57]",
              locale === "de"
                ? "bg-[#844C36] text-white shadow-xs"
                : "text-[#756A63] hover:text-[#392D29]"
            )}
            aria-pressed={locale === "de"}
            aria-label="Deutsch"
          >
            DE
          </button>
          <span className="text-[#E8D6C5] text-xs mx-0.5" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className={cn(
              "min-w-[40px] min-h-[32px] px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A26D57]",
              locale === "en"
                ? "bg-[#844C36] text-white shadow-xs"
                : "text-[#756A63] hover:text-[#392D29]"
            )}
            aria-pressed={locale === "en"}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // Header desktop pill
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm p-0.5 transition-all text-xs tracking-wider",
        isTransparentHeader
          ? "bg-black/30 border border-white/20 text-white/90 backdrop-blur-sm"
          : "bg-white/80 border border-[#E8D6C5] text-[#392D29] shadow-luxury-xs",
        className
      )}
      role="group"
      aria-label="Sprachauswahl / Language selection"
    >
      <button
        type="button"
        onClick={() => handleSelect("de")}
        className={cn(
          "px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A26D57]",
          locale === "de"
            ? isTransparentHeader
              ? "bg-white text-[#211A18] font-bold shadow-xs"
              : "bg-[#844C36] text-white font-bold shadow-xs"
            : isTransparentHeader
            ? "text-white/70 hover:text-white"
            : "text-[#756A63] hover:text-[#392D29]"
        )}
        aria-pressed={locale === "de"}
        aria-label="Zu Deutsch wechseln"
      >
        DE
      </button>
      <span
        className={cn(
          "text-[10px] mx-0.5",
          isTransparentHeader ? "text-white/30" : "text-[#E8D6C5]"
        )}
        aria-hidden="true"
      >
        |
      </span>
      <button
        type="button"
        onClick={() => handleSelect("en")}
        className={cn(
          "px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A26D57]",
          locale === "en"
            ? isTransparentHeader
              ? "bg-white text-[#211A18] font-bold shadow-xs"
              : "bg-[#844C36] text-white font-bold shadow-xs"
            : isTransparentHeader
            ? "text-white/70 hover:text-white"
            : "text-[#756A63] hover:text-[#392D29]"
        )}
        aria-pressed={locale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
