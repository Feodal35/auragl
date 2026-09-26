import React from "react";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { CalendarDays, ArrowRight, ChevronDown } from "lucide-react";
import { ContentSection, DesignSectionSetting } from "@/lib/types";

interface HeroSectionProps {
  content?: ContentSection;
  design?: DesignSectionSetting;
}

export default function HeroSection({ content, design }: HeroSectionProps) {
  const headline = content?.headline || "Deine Schönheit.\nUnser Anspruch.";
  const eyebrow = content?.eyebrow || "Beauty & Aesthetics by Mürvet";
  const bodyText =
    content?.body_text ||
    "Entdecke individuelle Beauty-Behandlungen für deine natürliche Schönheit und ein strahlendes Selbstbewusstsein.";
  const primaryCtaLabel = content?.primary_cta_label || "Termin anfragen";
  const primaryCtaUrl = content?.primary_cta_url || "/termin";
  const secondaryCtaLabel = content?.secondary_cta_label || "Behandlungen entdecken";
  const secondaryCtaUrl = content?.secondary_cta_url || "/leistungen";

  const desktopBg =
    design?.background_image_desktop ||
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2400&q=85";
  const mobileBg = design?.background_image_mobile || desktopBg;
  const overlayOpacity = design?.overlay_opacity !== undefined ? design.overlay_opacity : 0.45;
  const overlayColor = design?.overlay_color || "#211A18";

  return (
    <section className="relative min-h-[92dvh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#211A18]">
      {/* Background Imagery with Art-Directed Responsive Crop */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileBg} />
          <img
            src={desktopBg}
            alt="Aura Glow by Mürvet Hero Visual"
            className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
          />
        </picture>
        {/* Editorial Vignette & Tint Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211A18] via-transparent to-[#211A18]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white flex flex-col items-center">
        {/* Top Floating Eyebrow */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A891]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#EFE6DD] font-medium">
            {eyebrow}
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] max-w-4xl text-balance mb-8">
          {headline.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < headline.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        {/* Supporting Description */}
        <p className="text-base sm:text-lg md:text-xl font-light text-[#EFE6DD]/90 max-w-2xl leading-relaxed mb-10 text-balance">
          {bodyText}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={primaryCtaUrl}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group"
          >
            <CalendarDays className="w-4 h-4 text-white" />
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

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors">
        <span className="text-[10px] uppercase tracking-[0.2em] font-light">Entdecken</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
