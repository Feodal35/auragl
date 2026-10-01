"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, ArrowRight, ChevronDown } from "lucide-react";
import { ContentSection, DesignSectionSetting } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroSectionProps {
  content?: ContentSection;
  design?: DesignSectionSetting;
}

const SERVICE_CHIPS_DE = [
  "Wimpernverlängerung",
  "Facials & Glow",
  "Permanent Make-up",
];
const SERVICE_CHIPS_EN = ["Lash Extensions", "Skin Care & Glow", "Permanent Makeup"];

export default function HeroSection({ content, design }: HeroSectionProps) {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";

  const headline = isEn
    ? t.hero.headline
    : content?.headline ||
      "Wimpern · Facials & Glow\nPermanent Make-up\nIhr Beauty-Studio in Peine.";

  const eyebrow = isEn
    ? t.hero.eyebrow
    : content?.eyebrow || "Aura Glow by Mürvet · Peine, Niedersachsen";

  const bodyText = isEn
    ? t.hero.bodyText
    : content?.body_text ||
      "Professionelle Wimpernverlängerung, regenerierende Facials und zertifiziertes Permanent Make-up – direkt in Peine.";

  const primaryCtaLabel = isEn
    ? t.hero.ctaPrimary
    : content?.primary_cta_label || "Termin anfragen";
  const primaryCtaUrl = content?.primary_cta_url || "/termin";

  const secondaryCtaLabel = isEn
    ? t.hero.ctaSecondary
    : content?.secondary_cta_label || "Alle Behandlungen";
  const secondaryCtaUrl = content?.secondary_cta_url || "/leistungen";

  // Official Aura Glow brand artwork as default hero
  const isCustomDesktop = Boolean(design?.background_image_desktop);
  const desktopBg =
    design?.background_image_desktop || "/images/hero-brand-desktop.webp";
  const mobileBg = design?.background_image_mobile || "/images/hero-brand-mobile.webp";
  const overlayOpacity =
    design?.overlay_opacity !== undefined
      ? design.overlay_opacity
      : isCustomDesktop
      ? 0.52
      : 0;
  const overlayColor = design?.overlay_color || "#12171B";

  const chips = isEn ? SERVICE_CHIPS_EN : SERVICE_CHIPS_DE;

  return (
    <section
      className="relative min-h-[92dvh] sm:min-h-screen flex items-center overflow-hidden bg-[#12171B]"
      aria-label="Aura Glow by Mürvet – Hero"
    >
      {/* Background — Next.js Image with priority for LCP */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <Image
          src={mobileBg}
          alt="Aura Glow by Mürvet – Beauty & Aesthetics Studio Peine"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 767px) 100vw, 0vw"
          className="object-cover object-top sm:hidden"
          quality={88}
        />
        {/* Desktop */}
        <Image
          src={desktopBg}
          alt="Aura Glow by Mürvet – Beauty & Aesthetics Studio Peine"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 768px) 100vw"
          className="object-cover object-center hidden sm:block"
          quality={90}
        />
        {/* Dark tint overlay for custom background images */}
        {overlayOpacity > 0 && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
          />
        )}
        {/* Soft readability gradients: protect white text contrast while leaving brand artwork untouched on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12171B]/90 via-[#12171B]/50 via-45% to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-[#12171B]/40 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12171B] via-transparent to-[#12171B]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-white flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="max-w-2xl lg:max-w-3xl xl:max-w-3xl flex flex-col items-center lg:items-start">
          {/* Eyebrow — location + brand */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A891]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#EFE6DD] font-medium">
              {eyebrow}
            </span>
          </div>

          {/* Service chips — instant visual summary of specialties */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-7">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-[11px] px-3.5 py-1 rounded-full bg-[#B88770]/30 border border-[#D9A891]/40 text-[#EFE6DD] font-medium tracking-wide backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Headline — suppressHydrationWarning prevents React #418 mismatch */}
          <h1
            className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.12] mb-6 drop-shadow-sm"
            suppressHydrationWarning
          >
            {headline.split("\n").map((line, idx, arr) => (
              <React.Fragment key={idx}>
                {line}
                {idx < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Supporting copy */}
          <p
            className="text-base sm:text-lg md:text-xl font-light text-[#EFE6DD] max-w-xl leading-relaxed mb-10 text-balance drop-shadow-sm"
            suppressHydrationWarning
          >
            {bodyText}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 w-full sm:w-auto">
            <a
              href={primaryCtaUrl}
              className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group"
            >
              <CalendarDays className="w-4 h-4 text-white" />
              <span suppressHydrationWarning>{primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={secondaryCtaUrl}
              className="w-full sm:w-auto btn-secondary-light flex items-center justify-center"
              suppressHydrationWarning
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors">
        <span className="text-[10px] uppercase tracking-[0.2em] font-light">Entdecken</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
