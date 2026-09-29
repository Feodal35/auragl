import React from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ContentSection } from "@/lib/types";

interface AboutMurvetProps {
  content?: ContentSection;
}

export default function AboutMurvetSection({ content }: AboutMurvetProps) {
  const eyebrow = content?.eyebrow || "ÜBER MÜRVET";
  const headline =
    content?.headline || "Leidenschaft für feine Ästhetik und perfekte Linien.";
  const bodyText =
    content?.body_text ||
    "Mit geschultem Blick für Symmetrie und natürlicher Harmonie widmet sich Mürvet der individuellen Schönheit jeder Kundin. Jede Behandlung wird mit Geduld, meisterhafter Präzision und höchsten Hygienestandards ausgeführt.";
  const ctaLabel = content?.primary_cta_label || "Persönlichen Termin anfragen";
  const ctaUrl = content?.primary_cta_url || "/termin";

  return (
    <section className="py-24 sm:py-32 bg-[#EFE6DD]/50 border-t border-[#E8D6C5]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1px] shadow-luxury-md bg-[#E8D6C5]">
              <Image
                src="/images/treatments/murvet-at-work.webp"
                alt="Mürvet — Gründerin & Master Stylistin bei der Behandlung im Studio Aura Glow Peine"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
            {/* Decorative Offset Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#B88770]/40 -z-10 hidden sm:block" />
          </div>

          {/* Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
                {eyebrow}
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29] leading-[1.14]">
              {headline}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#4F443E] font-light leading-relaxed">
              <p>{bodyText}</p>
              <p>
                In unserem Studio geht es nicht um künstliche Masken, sondern um die subtile
                Hervorhebung deiner eigenen Züge. Ein perfekter Wimpernaufschlag oder sanft
                schattierte Puderbrauen schenken dir jeden Morgen ein müheloses, strahlendes
                Gefühl.
              </p>
            </div>

            {/* Signature & CTA */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#E8D6C5]/50">
              <div>
                <span className="font-script text-3xl sm:text-4xl text-[#A26D57] block">
                  Mürvet
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#4F443E] mt-1 block font-medium">
                  Gründerin &amp; Master Artist
                </span>
              </div>

              <a
                href={ctaUrl}
                className="btn-primary inline-flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
              >
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                <span>{ctaLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
