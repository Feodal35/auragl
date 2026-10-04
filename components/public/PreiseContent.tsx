"use client";

import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ServiceCategory, PriceRow } from "@/lib/types";
import { CalendarDays } from "lucide-react";

interface PreiseContentProps {
  categories: ServiceCategory[];
  pricing: PriceRow[];
}

export default function PreiseContent({ categories, pricing }: PreiseContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumbs items={[{ label: t.pricingPage.title }]} />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#B88770]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
            {t.pricingPage.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#B88770]" />
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
          {t.pricingPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
          {t.pricingPage.subtitle}
        </p>

        {/* PAngV badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-full text-xs text-[#756A63]">
          <span>{t.pricingPage.pangvBadge}</span>
        </div>

        {/* Quick Category Anchors */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#preis-${c.slug}`}
              className="text-xs uppercase tracking-[0.14em] font-medium px-4 py-2 min-h-[44px] inline-flex items-center justify-center bg-white border border-[#E8D6C5] rounded-full text-[#392D29] hover:text-[#A26D57] hover:border-[#A26D57]/40 hover:bg-[#FAF6F1] active:scale-[0.98] transition-all shadow-luxury-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>

      {/* Pricing Groups */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {categories.map((cat) => {
          const catPricing = pricing.filter((p) => p.category_id === cat.id && p.is_active !== false);
          if (catPricing.length === 0) return null;

          // Group by subcategory if exists
          const subcategories = Array.from(
            new Set(catPricing.map((item) => item.subcategory_name || "Standard"))
          );

          return (
            <section
              key={cat.id}
              id={`preis-${cat.slug}`}
              className="scroll-mt-32 pt-8 border-t border-[#E8D6C5]"
            >
              {/* Category Heading */}
              <div className="mb-8">
                <span className="text-xs font-mono tracking-widest text-[#B88770] uppercase block mb-1">
                  {t.pricingPage.categoryLabel}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
                  {cat.name}
                </h2>
                <p className="text-sm text-[#756A63] font-light mt-1">
                  {cat.description}
                </p>
              </div>

              {/* Subcategories or items list */}
              <div className="space-y-10">
                {subcategories.map((subcat) => {
                  const items = catPricing.filter(
                    (p) => (p.subcategory_name || "Standard") === subcat
                  );

                  return (
                    <div key={subcat} className="space-y-3">
                      {subcat !== "Standard" && (
                        <h3 className="text-xs uppercase tracking-[0.18em] text-[#B88770] font-medium pt-2 border-b border-[#E8D6C5]/50 pb-2">
                          {subcat}
                        </h3>
                      )}

                      <div className="divide-y divide-[#E8D6C5]/60">
                        {items.map((row) => (
                          <div
                            key={row.id}
                            className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:bg-[#FAF6F1] px-2 transition-colors duration-150"
                          >
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="font-editorial text-xl sm:text-2xl text-[#392D29] group-hover:text-[#B88770] transition-colors">
                                  {row.treatment_name}
                                </span>
                                {row.variant_name && (
                                  <span className="text-xs text-[#756A63] font-light">
                                    — {row.variant_name}
                                  </span>
                                )}
                              </div>
                              {row.duration && (
                                <p className="text-xs text-[#756A63] font-light mt-0.5">
                                  {t.pricingPage.durationLabel}: {row.duration}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:shrink-0">
                              <span className="font-editorial text-2xl text-[#392D29] font-normal">
                                {row.price_display}
                              </span>
                              <a
                                href={`/termin?behandlung=${encodeURIComponent(
                                  `${row.treatment_name}${row.variant_name ? ` (${row.variant_name})` : ""}`
                                )}`}
                                aria-label={`${t.pricingPage.bookBtn} für ${row.treatment_name}${row.variant_name ? ` (${row.variant_name})` : ""}`}
                                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-full bg-[#844C36]/10 text-xs uppercase tracking-[0.14em] text-[#844C36] hover:bg-[#844C36] hover:text-white active:scale-[0.98] transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#844C36]"
                              >
                                <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{t.pricingPage.bookBtn}</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* PAngV Legal Note & Cancellation reminder */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-[#5C524C] font-normal leading-relaxed">
        <p>
          {t.pricingPage.pangvLegal}{" "}
          <Link href="/agb" className="underline hover:text-[#844C36]">
            {t.pricingPage.agbLink}
          </Link>
          ).
        </p>
      </div>

      {/* Bottom Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#211A18] text-white p-8 sm:p-12 text-center rounded-[1px] space-y-4">
          <h3 className="font-editorial text-2xl sm:text-3xl font-light">
            {t.pricingPage.questionsTitle}
          </h3>
          <p className="text-sm text-[#EFE6DD]/80 font-light max-w-lg mx-auto">
            {t.pricingPage.questionsSubtitle}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kontakt" className="btn-secondary-light text-xs w-full sm:w-auto inline-flex items-center justify-center">
              {t.pricingPage.contactBtn}
            </Link>
            <Link href="/termin" className="btn-primary text-xs w-full sm:w-auto inline-flex items-center justify-center">
              {t.pricingPage.bookAppointmentBtn}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
