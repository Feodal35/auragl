"use client";

import React from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PriceRow } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SelectedPricingProps {
  pricing: PriceRow[];
}

export default function SelectedPricingSection({ pricing }: SelectedPricingProps) {
  const { t } = useLanguage();

  // Select popular representative items across categories
  const selectedIds = [1, 4, 13, 17, 16, 21, 27, 30];
  const items = pricing
    .filter((p) => p.is_active !== false && selectedIds.includes(p.id))
    .slice(0, 8);

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
              {t.pricing.eyebrow}
            </span>
            <span className="w-6 h-[1px] bg-[#B88770]" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29] mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-sm sm:text-base text-[#756A63] font-light leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Editorial Price Rows (Not a generic table, no ugly cards!) */}
        <div className="divide-y divide-[#E8D6C5]">
          {items.map((row) => (
            <div
              key={row.id}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:bg-[#FAF6F1] px-3 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#392D29] group-hover:text-[#B88770] transition-colors">
                    {row.treatment_name}
                  </h3>
                  {row.variant_name && (
                    <span className="text-xs font-light text-[#756A63] uppercase tracking-wider">
                      ({row.variant_name})
                    </span>
                  )}
                </div>
                {row.duration && (
                  <p className="text-xs text-[#756A63] font-light mt-0.5">
                    {t.pricing.duration}: {row.duration}
                  </p>
                )}
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:shrink-0">
                <span className="font-editorial text-2xl sm:text-3xl text-[#392D29] font-normal tracking-tight">
                  {row.price_display}
                </span>
                <a
                  href={`/termin?behandlung=${encodeURIComponent(row.treatment_name)}`}
                  aria-label={`Termin für ${row.treatment_name} anfragen`}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-full bg-[#844C36]/10 text-xs uppercase tracking-[0.14em] text-[#844C36] hover:bg-[#844C36] hover:text-white active:scale-[0.98] transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#844C36]"
                >
                  <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.pricing.book}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* PAngV legal note */}
        <p className="mt-8 text-center text-xs text-[#5C524C] font-normal">
          {t.pricing.pangv}
        </p>

        {/* Bottom CTA to Full Price List */}
        <div className="mt-8 text-center pt-8 border-t border-[#E8D6C5]">
          <a
            href="/preise"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#392D29] hover:text-[#A26D57] transition-colors pb-1 border-b border-[#392D29] hover:border-[#A26D57] min-h-[44px]"
          >
            <span>{t.pricing.viewFullPricing}</span>
            <ArrowUpRight className="w-4 h-4 text-[#A26D57]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
