"use client";

import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { ContentSection, DesignSectionSetting } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FinalCtaProps {
  content?: ContentSection;
  design?: DesignSectionSetting;
}

export default function FinalCtaSection({ content, design }: FinalCtaProps) {
  const { locale, t } = useLanguage();

  const eyebrow =
    locale === "en" ? "TIME FOR YOU" : content?.eyebrow || "ZEIT FÜR DICH";
  const headline =
    locale === "en"
      ? "Treat yourself to a personal getaway."
      : content?.headline || "Gönne dir deine persönliche Auszeit.";
  const bodyText =
    locale === "en"
      ? "Easily request your individual appointment today. We offer personalized consultations to discover the perfect treatment tailored to your skin and beauty goals."
      : content?.body_text ||
        "Vereinbare jetzt ganz unkompliziert deine individuelle Terminanfrage. Wir beraten dich typgerecht und finden die perfekte Behandlung für dich.";
  const primaryCtaLabel =
    locale === "en"
      ? t.hero.ctaPrimary
      : content?.primary_cta_label || "Jetzt Termin anfragen";
  const primaryCtaUrl = content?.primary_cta_url || "/termin";
  const secondaryCtaLabel =
    locale === "en"
      ? t.nav.pricing
      : content?.secondary_cta_label || "Preise ansehen";
  const secondaryCtaUrl = content?.secondary_cta_url || "/preise";

  const bgImg =
    design?.background_image_desktop ||
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=85";
  const overlayOpacity = design?.overlay_opacity !== undefined ? design.overlay_opacity : 0.7;

  return (
    <section className="relative py-28 sm:py-36 bg-[#211A18] text-white overflow-hidden text-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Aura Glow by Mürvet - Ästhetische Behandlungsatmosphäre im Kosmetikstudio Düsseldorf"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-[#211A18]"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A891]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#EFE6DD] font-medium">
            {eyebrow}
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.12] mb-6 max-w-2xl text-balance">
          {headline}
        </h2>

        <p className="text-base sm:text-lg text-[#EFE6DD]/85 font-light leading-relaxed max-w-xl mb-10 text-balance">
          {bodyText}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={primaryCtaUrl}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group"
          >
            <CalendarDays className="w-4 h-4" />
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={secondaryCtaUrl}
            className="w-full sm:w-auto btn-secondary-light flex items-center justify-center"
          >
            {secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
