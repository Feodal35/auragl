import React from "react";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";
import { ContentSection, DesignSectionSetting } from "@/lib/types";

interface PhilosophySectionProps {
  content?: ContentSection;
  design?: DesignSectionSetting;
}

export default function PhilosophySection({ content, design }: PhilosophySectionProps) {
  const eyebrow = content?.eyebrow || "EXKLUSIVITÄT & PRÄZISION";
  const headline = content?.headline || "Individuelle Ästhetik statt Einheitslook.";
  const bodyText =
    content?.body_text ||
    "Wir glauben an sanfte Betonung, harmonische Proportionen und höchste Produktqualität. Ob langanhaltendes Wimperndesign, makellose Puderbrauen oder regenerierende Facials: Deine Ausstrahlung steht im Mittelpunkt.";

  const pillars = [
    {
      title: "Präzises Handwerk",
      desc: "Feinste Techniken, typgerechte Formen und millimetergenaue Ausführung für Ergebnisse, die deine natürliche Schönheit unterstreichen.",
    },
    {
      title: "Zertifizierte Qualität",
      desc: "Ausschließliche Verwendung dermatologisch geprüfter, hochwertigster Pigmente, Seidenwimpern und Wirkstoffseren.",
    },
    {
      title: "Exklusive Ruhezeit",
      desc: "Keine Massenabfertigung. Jede Behandlung findet in ruhiger, diskreter Studioatmosphäre mit ungeteilter Aufmerksamkeit statt.",
    },
  ];

  const bgColor = design?.background_color || "#211A18";
  const textColor = design?.text_color || "#ffffff";
  const bgImage = design?.background_image_desktop;
  const overlayOpacity = design?.overlay_opacity ?? 0.7;
  const overlayColor = design?.overlay_color || "#211A18";

  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      {bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        />
      )}
      {/* Subtle background glow / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B88770]/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#D9A891]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#D9A891] font-medium">
              {eyebrow}
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.12] mb-6 text-balance">
            {headline}
          </h2>

          <p className="text-base sm:text-lg text-[#EFE6DD]/80 font-light leading-relaxed">
            {bodyText}
          </p>
        </div>

        {/* 3 Pillars in Elegant Border-Separated List (Not generic cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/15">
          {pillars.map((pillar, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#D9A891] tracking-widest">
                  0{i + 1}
                </span>
                <span className="w-4 h-[1px] bg-white/20" />
              </div>

              <h3 className="font-editorial text-2xl text-white font-normal">
                {pillar.title}
              </h3>

              <p className="text-sm text-[#EFE6DD]/70 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
