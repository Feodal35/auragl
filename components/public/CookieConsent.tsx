"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
    const stored = localStorage.getItem("auraglow_cookie_consent");
    if (!stored) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for open event from footer
  useEffect(() => {
    const handleReopen = () => setIsVisible(true);
    window.addEventListener("openCookieSettings", handleReopen);
    return () => window.removeEventListener("openCookieSettings", handleReopen);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "auraglow_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem(
      "auraglow_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  if (!hasLoaded || !isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie- und Datenschutzeinstellungen"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-[#F7F3EE]/95 backdrop-blur-md border border-[#E8D6C5] rounded-[1px] shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6 sm:p-7 text-[#392D29] animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-[#A26D57]" aria-hidden="true" />
          <h2 className="font-editorial text-xl font-normal text-[#392D29]">
            Privatsphäre &amp; Cookies
          </h2>
        </div>
        <button
          type="button"
          onClick={handleAcceptEssential}
          className="text-[#756A63] hover:text-[#392D29] p-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
          aria-label="Nur essenzielle Cookies akzeptieren und schließen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#756A63] font-light leading-relaxed mb-4">
        Wir nutzen Cookies und ähnliche Technologien zur Gewährleistung der Grundfunktionen unserer Website gemäß § 25 Abs. 2 TDDDG. Wir verzichten auf invasive Tracking-Cookies. Weitere Details findest du in unserer{" "}
        <Link
          href="/datenschutz"
          className="text-[#A26D57] underline hover:text-[#8B5742] transition-colors"
        >
          Datenschutzerklärung
        </Link>{" "}
        und im{" "}
        <Link
          href="/impressum"
          className="text-[#A26D57] underline hover:text-[#8B5742] transition-colors"
        >
          Impressum
        </Link>
        .
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-[#E8D6C5]/50">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="btn-primary text-xs py-2.5 px-4 min-h-[40px] flex-1 inline-flex items-center justify-center gap-1.5 font-medium shadow-luxury-xs"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Alle akzeptieren</span>
        </button>
        <button
          type="button"
          onClick={handleAcceptEssential}
          className="btn-secondary text-xs py-2.5 px-4 min-h-[40px] flex-1 inline-flex items-center justify-center font-medium"
        >
          <span>Nur essenzielle</span>
        </button>
      </div>
    </div>
  );
}
