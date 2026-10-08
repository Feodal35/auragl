"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ServiceCategory } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CategoriesSectionProps {
  categories: ServiceCategory[];
}

const categoryImages: Record<string, string> = {
  wimpern: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
  "gesichtsreinigung-pflege": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
  "permanent-make-up": "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1000&q=85",
  schulungen: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85",
};

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
                {t.categories.eyebrow}
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29]">
              {t.categories.title}
            </h2>
          </div>
          <p className="text-sm text-[#756A63] font-light max-w-md">
            {t.categories.subtitle}
          </p>
        </div>

        {/* 4 Interactive Category Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const img = cat.image_url || categoryImages[cat.slug] || categoryImages.wimpern;
            return (
              <a
                key={cat.id}
                href={`/leistungen#${cat.slug}`}
                aria-label={`Kategorie ${cat.name} entdecken`}
                className="group relative h-[420px] overflow-hidden flex flex-col justify-end p-6 bg-[#211A18] text-white transition-all duration-500 rounded-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A891]"
              >
                {/* Image Background with Dark Vignette */}
                <Image
                  src={img}
                  alt={`${cat.name} Behandlungen - Aura Glow Studio Peine`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-75"
                  loading="lazy"
                  unoptimized={img.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211A18] via-[#211A18]/40 to-transparent" />

                {/* Number & Corner Indicator */}
                <div className="relative z-10 flex items-center justify-between mb-auto">
                  <span className="text-xs font-mono tracking-widest text-[#D9A891]">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#B88770] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-editorial text-2xl font-normal group-hover:text-[#D9A891] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#EFE6DD]/95 font-light line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#D9A891] font-medium pt-2 group-hover:translate-x-1 transition-transform">
                    {t.categories.viewCategory} &rarr;
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
