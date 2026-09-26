import React from "react";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { ArrowRight } from "lucide-react";
import { ContentSection } from "@/lib/types";

interface IntroSectionProps {
  content?: ContentSection;
}

export default function IntroSection({ content }: IntroSectionProps) {
  const eyebrow = content?.eyebrow || "AURA GLOW BY MÜRVET";
  const headline =
    content?.headline || "Schönheit beginnt dort,\nwo du dich selbst wohlfühlst.";
  const bodyText =
    content?.body_text ||
    "In unserem Studio vereinen wir präzises Handwerk, meisterhafte Ästhetik und erstklassige Behandlungen zu einem ganzheitlichen Wohlfühlerlebnis. Jeder Blick, jede Kontur und jedes Hautbedürfnis ist einzigartig – genau so behandeln wir dich.";
  const ctaLabel = content?.primary_cta_label || "Mehr über uns erfahren";
  const ctaUrl = content?.primary_cta_url || "/ueber-uns";

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#F7F3EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monogram & Large Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
                {eyebrow}
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#392D29] leading-[1.12] text-balance">
              {headline.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < headline.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <div className="pt-2">
              <AuraGlowLogo size="sm" variant="monogram" color="#A26D57" />
            </div>
          </div>

          {/* Right Column: Narrative & Context (5 cols) */}
          <div className="lg:col-span-5 lg:pt-8 space-y-8">
            <p className="text-base sm:text-lg text-[#756A63] font-light leading-relaxed">
              {bodyText}
            </p>

            <div className="pt-4 border-t border-[#E8D6C5]">
              <a
                href={ctaUrl}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] font-medium text-[#392D29] hover:text-[#A26D57] group transition-colors min-h-[44px]"
              >
                <span>{ctaLabel}</span>
                <span className="w-8 h-[1px] bg-[#A26D57] group-hover:w-12 transition-all duration-300" />
                <ArrowRight className="w-3.5 h-3.5 text-[#A26D57] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
