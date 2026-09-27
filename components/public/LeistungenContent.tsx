"use client";

import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ServiceCategory, ServiceItem } from "@/lib/types";
import { Clock3, CalendarDays, ArrowRight } from "lucide-react";

interface LeistungenContentProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
}

export default function LeistungenContent({ categories, services }: LeistungenContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumbs items={[{ label: t.servicesPage.title }]} />
      </div>

      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#B88770]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
            {t.servicesPage.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#B88770]" />
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#392D29] mb-6">
          {t.servicesPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#756A63] font-light max-w-2xl mx-auto leading-relaxed">
          {t.servicesPage.subtitle}
        </p>

        {/* Category Jump Anchor Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.slug}`}
              className="text-xs uppercase tracking-[0.14em] font-medium px-4 py-2 min-h-[44px] inline-flex items-center justify-center bg-white hover:bg-[#FAF6F1] border border-[#E8D6C5] rounded-full text-[#392D29] hover:text-[#A26D57] hover:border-[#A26D57]/40 active:scale-[0.98] transition-all shadow-luxury-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Categories & Services Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {categories.map((category) => {
          const categoryServices = services.filter((s) => s.category_id === category.id);
          if (categoryServices.length === 0) return null;

          return (
            <section
              key={category.id}
              id={category.slug}
              className="scroll-mt-32 pt-8 border-t border-[#E8D6C5]"
            >
              {/* Category Header */}
              <div className="mb-12">
                <span className="text-xs font-mono tracking-widest text-[#B88770] block mb-2">
                  {t.servicesPage.categoryLabel}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#392D29] font-normal mb-3">
                  {category.name}
                </h2>
                <p className="text-sm sm:text-base text-[#756A63] font-light max-w-3xl leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Services Grid (Editorial 2-Column Split) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border border-[#E8D6C5]/70 rounded-[1px] shadow-luxury-sm overflow-hidden flex flex-col justify-between group hover:border-[#B88770]/60 transition-all duration-300"
                  >
                    {/* Image Header with Aspect Ratio */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E8D6C5]/20">
                      <img
                        src={service.featured_image}
                        alt={`${service.title} - Exklusive Behandlung bei Aura Glow Düsseldorf`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 right-3 bg-[#211A18]/85 text-white backdrop-blur-sm px-3.5 py-1 text-xs font-medium">
                        {service.price_display}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-editorial text-2xl text-[#392D29] group-hover:text-[#B88770] transition-colors">
                            {service.title}
                          </h3>
                          {service.duration_minutes > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-[#756A63] shrink-0 font-light">
                              <Clock3 className="w-3.5 h-3.5 text-[#B88770]" />
                              <span>{t.servicesPage.durationPrefix} {service.duration_minutes} {t.servicesPage.durationMinutes}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#756A63] font-light leading-relaxed mb-3">
                          {service.short_description}
                        </p>
                        {service.full_description && (
                          <p className="text-xs text-[#756A63]/80 font-light leading-relaxed border-t border-[#E8D6C5]/30 pt-3">
                            {service.full_description}
                          </p>
                        )}
                      </div>

                      {/* Action CTA */}
                      <div className="pt-4 border-t border-[#E8D6C5]/50 flex items-center justify-between">
                        <Link
                          href={`/termin?behandlung=${encodeURIComponent(service.title)}`}
                          aria-label={`${t.servicesPage.bookService}: ${service.title}`}
                          className="btn-primary w-full inline-flex items-center justify-center gap-2 text-xs"
                        >
                          <CalendarDays className="w-4 h-4" aria-hidden="true" />
                          <span>{t.servicesPage.bookService}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Internal Cross-Linking Banner */}
        <div className="bg-white border border-[#E8D6C5] rounded-[1px] p-8 sm:p-12 text-center shadow-luxury-sm mt-16">
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#392D29] mb-3">
            {t.servicesPage.compareTitle}
          </h3>
          <p className="text-sm text-[#756A63] font-light max-w-xl mx-auto mb-6 leading-relaxed">
            {t.servicesPage.compareDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/preise" className="btn-secondary text-xs inline-flex items-center gap-2">
              <span>{t.servicesPage.toPricingBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/termin" className="btn-primary text-xs inline-flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{t.servicesPage.bookAppointmentBtn}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
