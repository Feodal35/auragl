"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, Clock3, CalendarDays, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
  problem: string;
  solution: string;
  result: string;
  duration: string;
  longevity: string;
  treatmentSlug: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "case-glow",
    tag: "Fallstudie 01 • Gesichtsästhetik",
    title: "Hollywood Glow & Tiefenausreinigung",
    image: "/images/treatments/microneedling-facial.jpg",
    imageAlt: "Hollywood Glow Gesichtsbehandlung Vorher-Nachher Ergebnis im Aura Glow Studio Düsseldorf",
    problem: "Feuchtigkeitsarme, gestresste Haut mit vergrößerten Poren und müdem Teint.",
    solution: "Sanfte Hydro-Tiefenausreinigung kombiniert mit gezielter Hyaluron- und Peptid-Einschleusung.",
    result: "Sofort prallere Haut, verfeinerte Porenstruktur und strahlender, natürlicher Teint ohne Rötungen oder Ausfallzeit.",
    duration: "ca. 75 Min.",
    longevity: "Soforteffekt, ideal vor Events oder im 4-Wochen-Zyklus",
    treatmentSlug: "Hollywood Glow Deluxe",
  },
  {
    id: "case-brows",
    tag: "Fallstudie 02 • Permanent Make-up",
    title: "Powder Brows Form- & Farbkorrektur",
    image: "/images/treatments/murvet-treatment-full.jpg",
    imageAlt: "Powder Brows Permanent Make-up Vorher-Nachher Korrektur im Studio Düsseldorf",
    problem: "Asymmetrische Brauenform mit lückenhaftem Wuchs durch langjähriges Auszupfen.",
    solution: "Vermessung nach dem Goldenen Schnitt und sanfte Ombré-Puderschattierung mit typgerechtem Farbton.",
    result: "Symmetrische, sanft pudrige Brauen mit weichem Verlauf. Absolut alltagstauglich ohne Schminkaufwand.",
    duration: "ca. 120 Min.",
    longevity: "1,5 bis 2,5 Jahre Haltbarkeit",
    treatmentSlug: "Powder Brows Neuanlage",
  },
  {
    id: "case-lashes",
    tag: "Fallstudie 03 • Wimpernästhetik",
    title: "Russian Volume Wimpernverlängerung",
    image: "/images/treatments/lash-lift-result.jpg",
    imageAlt: "Russian Volume Wimpernverlängerung Vorher-Nachher Ergebnis Düsseldorf",
    problem: "Sehr feine, helle Naturwimpern mit wenig Dichte und abwärts gerichtetem Wuchs.",
    solution: "Handgefertigte 3D–5D Fächer aus ultraleichten synthetischen Seidenwimpern, perfekt isoliert appliziert.",
    result: "Sinnlicher, gleichmäßiger Wimpernfächer mit samtweichem Tragegefühl ohne Beschwerung der Eigenwimpern.",
    duration: "ca. 120 Min.",
    longevity: "4 bis 6 Wochen (Refill alle 3-4 Wochen)",
    treatmentSlug: "Russian Volume Neuanlage",
  },
];

export default function CaseStudySpotlight() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="fallstudien"
      aria-labelledby="case-studies-heading"
      className="py-20 sm:py-28 bg-[#FAF6F1] border-t border-[#E8D6C5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#A26D57]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
              {t.caseStudies.eyebrow}
            </span>
            <Sparkles className="w-4 h-4 text-[#A26D57]" />
          </div>
          <h2
            id="case-studies-heading"
            className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#392D29] font-light mb-5"
          >
            {t.caseStudies.title}
          </h2>
          <p className="text-base sm:text-lg text-[#756A63] font-light leading-relaxed">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={study.id}
                className={`bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Visual / Image Side (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] overflow-hidden bg-[#E8D6C5]/20 ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}>
                  <picture>
                    <source srcSet={study.image.replace(/\.(jpg|png|jpeg)$/, ".webp")} type="image/webp" />
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-4 left-4 bg-[#211A18]/85 text-white backdrop-blur-sm px-3 py-1 text-xs font-mono tracking-widest uppercase">
                    {locale === "en" ? "Before • After Spotlight" : "Vorher • Nachher Fokus"}
                  </div>
                </div>

                {/* Narrative & Details Side (7 cols) */}
                <div className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}>
                  <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#A26D57] font-medium block mb-2">
                      {study.tag}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-4xl text-[#392D29] font-normal mb-6">
                      {study.title}
                    </h3>

                    {/* Problem -> Solution -> Result blocks */}
                    <div className="space-y-4 mb-8">
                      <div className="bg-[#FAF6F1] border-l-2 border-[#B88770] p-3.5 sm:p-4 rounded-r-sm">
                        <strong className="text-xs uppercase tracking-wider text-[#392D29] block mb-1">
                          {locale === "en" ? "Initial Situation" : "Ausgangslage"}
                        </strong>
                        <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
                          {study.problem}
                        </p>
                      </div>

                      <div className="bg-[#FAF6F1] border-l-2 border-[#A26D57] p-3.5 sm:p-4 rounded-r-sm">
                        <strong className="text-xs uppercase tracking-wider text-[#392D29] block mb-1">
                          {locale === "en" ? "Applied Treatment & Technique" : "Angewandte Behandlung & Technik"}
                        </strong>
                        <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      <div className="bg-[#FAF6F1] border-l-2 border-emerald-600 p-3.5 sm:p-4 rounded-r-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <strong className="text-xs uppercase tracking-wider text-[#392D29]">
                            {locale === "en" ? "Result & Effect" : "Ergebnis & Effekt"}
                          </strong>
                        </div>
                        <p className="text-xs sm:text-sm text-[#392D29] font-medium leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-4 text-xs text-[#756A63] font-light pt-2 pb-6 border-b border-[#E8D6C5]/50">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5 text-[#A26D57]" />
                        <span>{locale === "en" ? "Duration" : "Behandlungsdauer"}: {study.duration}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#A26D57]" />
                        <span>{locale === "en" ? "Longevity" : "Haltbarkeit"}: {study.longevity}</span>
                      </span>
                    </div>
                  </div>

                  {/* CTA link */}
                  <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href={`/termin?behandlung=${encodeURIComponent(study.treatmentSlug)}`}
                      className="btn-primary text-xs inline-flex items-center justify-center gap-2"
                      aria-label={`Termin für ${study.treatmentSlug} anfragen`}
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{t.caseStudies.bookSimilar}</span>
                    </Link>
                    <Link
                      href="/galerie"
                      className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <span>{locale === "en" ? "View more results" : "Mehr Ergebnisse ansehen"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
