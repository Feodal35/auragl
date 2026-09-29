"use client";

import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import { ContentSection } from "@/lib/types";

interface AboutContentProps {
  aboutContent?: ContentSection;
}

export default function AboutContent({ aboutContent }: AboutContentProps) {
  const { t, locale } = useLanguage();

  const headline =
    locale === "de" && aboutContent?.headline
      ? aboutContent.headline
      : t.aboutPage.defaultHeadline;

  const body1 =
    locale === "de" && aboutContent?.body_text
      ? aboutContent.body_text
      : t.aboutPage.defaultBody1;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumbs items={[{ label: t.nav.about }]} />
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#B88770]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
            {t.aboutPage.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#B88770]" />
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-6">
          {t.aboutPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#756A63] font-light max-w-2xl mx-auto leading-relaxed">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Story & Portrait Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1px] shadow-luxury-md bg-[#E8D6C5]">
              <picture>
                <source srcSet="/images/treatments/murvet-at-work.webp" type="image/webp" />
                <img
                  src="/images/treatments/murvet-at-work.jpg"
                  alt="Mürvet — Gründerin von Aura Glow bei der Behandlung im Studio in Peine"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#B88770]/40 -z-10 hidden sm:block" />
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium">
              {t.aboutPage.founderEyebrow}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29] font-normal leading-tight">
              {headline}
            </h2>

            <div className="space-y-4 text-base text-[#756A63] font-light leading-relaxed">
              <p>{body1}</p>
              <p>{t.aboutPage.defaultBody2}</p>
            </div>

            {/* Founder Signature */}
            <div className="pt-6 border-t border-[#E8D6C5]">
              <span className="font-script text-3xl sm:text-4xl text-[#A26D57] block">
                Mürvet
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-[#756A63] mt-1 block">
                {t.aboutPage.founderRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Values (3 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
            {t.aboutPage.valuesTitle}
          </h2>
          <p className="text-sm text-[#756A63] font-light mt-2">
            {t.aboutPage.valuesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#392D29]">
              {t.aboutPage.val1Title}
            </h3>
            <p className="text-sm text-[#756A63] font-light leading-relaxed">
              {t.aboutPage.val1Desc}
            </p>
          </div>

          <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#392D29]">
              {t.aboutPage.val2Title}
            </h3>
            <p className="text-sm text-[#756A63] font-light leading-relaxed">
              {t.aboutPage.val2Desc}
            </p>
          </div>

          <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#392D29]">
              {t.aboutPage.val3Title}
            </h3>
            <p className="text-sm text-[#756A63] font-light leading-relaxed">
              {t.aboutPage.val3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#211A18] text-white p-10 sm:p-14 rounded-[1px] space-y-5">
          <AuraGlowLogo size="sm" variant="monogram" color="#D9A891" />
          <h3 className="font-editorial text-3xl sm:text-4xl font-light">
            {t.aboutPage.ctaTitle}
          </h3>
          <p className="text-sm text-[#EFE6DD]/80 font-light max-w-md mx-auto">
            {t.aboutPage.ctaSubtitle}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kontakt" className="btn-secondary-light text-xs w-full sm:w-auto inline-flex items-center justify-center">
              {t.aboutPage.ctaContact}
            </Link>
            <Link href="/termin" className="btn-primary text-xs w-full sm:w-auto inline-flex items-center justify-center">
              {t.aboutPage.ctaBook}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
