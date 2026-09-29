"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Clock3, CalendarDays } from "lucide-react";
import { ServiceItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SignatureTreatmentsProps {
  services: ServiceItem[];
}

export default function SignatureTreatmentsSection({ services }: SignatureTreatmentsProps) {
  const { t } = useLanguage();

  // Prioritize featured services showcasing real studio treatments
  const featuredList = services.filter((s) => s.is_featured);
  const featured = featuredList.length >= 4 ? featuredList.slice(0, 4) : services.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#EFE6DD]/40 border-y border-[#E8D6C5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
                {t.signature.title}
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29] leading-[1.15]">
              {t.signature.subtitle}
            </h2>
          </div>
          <a
            href="/leistungen"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#392D29] hover:text-[#A26D57] transition-colors pb-1 border-b border-[#392D29] hover:border-[#A26D57] min-h-[44px]"
          >
            <span>{t.signature.viewAll}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Staggered Editorial Grid (2 columns on desktop with alternating heights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {featured.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={item.id}
                className={`group flex flex-col justify-between ${
                  isEven ? "md:translate-y-12" : ""
                }`}
              >
                {/* Image Container with Editorial Aspect Ratio */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#E8D6C5]/30 mb-6 rounded-[1px]">
                  <Image
                    src={item.featured_image}
                    alt={`${item.title} - Behandlung bei Aura Glow by Mürvet Düsseldorf`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#F7F3EE]/95 backdrop-blur-sm px-3.5 py-1 text-[11px] uppercase tracking-[0.18em] text-[#392D29] font-medium">
                    {item.category_name || "Exklusiv"}
                  </div>
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 bg-[#211A18]/85 text-white backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-wide">
                    {item.price_display}
                  </div>
                </div>

                {/* Content Block */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#392D29] group-hover:text-[#B88770] transition-colors">
                      {item.title}
                    </h3>
                    {item.duration_minutes > 0 && (
                      <span className="flex items-center gap-1.5 text-xs text-[#756A63] font-light">
                        <Clock3 className="w-3.5 h-3.5 text-[#B88770]" />
                        <span>ca. {item.duration_minutes} Min.</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#756A63] font-light leading-relaxed">
                    {item.short_description}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-[#E8D6C5]/60">
                    <a
                      href={`/termin?behandlung=${encodeURIComponent(item.title)}`}
                      aria-label={`Termin für ${item.title} anfragen`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-[#A26D57] hover:text-[#8E5A45] min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57] rounded-sm"
                    >
                      <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.signature.bookNow}</span>
                    </a>
                    <a
                      href="/leistungen"
                      aria-label={`Details zu allen Behandlungen anzeigen`}
                      className="text-xs text-[#756A63] hover:text-[#392D29] transition-colors inline-flex items-center gap-1 min-h-[44px] px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57] rounded-sm"
                    >
                      <span>{t.gallery.viewDetails || "Details"}</span>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </a>
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
