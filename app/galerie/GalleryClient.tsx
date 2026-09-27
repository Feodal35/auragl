"use client";

import React, { useState, useEffect } from "react";
import { GalleryItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { X, Eye, CalendarDays } from "lucide-react";

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  const categories = [
    { key: "Alle", label: t.galleryPage.categoryAll },
    { key: "Wimpern", label: t.galleryPage.categoryWimpern },
    { key: "Gesichtsreinigung & Pflege", label: t.galleryPage.categoryFacials },
    { key: "Permanent Make-up", label: t.galleryPage.categoryPmu },
  ];

  const getCategoryLabel = (category: string) => {
    const found = categories.find((c) => c.key === category);
    return found ? found.label : category;
  };

  const filteredItems =
    selectedCategory === "Alle"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumbs items={[{ label: t.galleryPage.title }]} />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#B88770]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
            {t.galleryPage.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#B88770]" />
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
          {t.galleryPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
          {t.galleryPage.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-xs uppercase tracking-[0.14em] font-medium px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57] ${
                  isActive
                    ? "bg-[#A26D57] text-white shadow-luxury-sm"
                    : "bg-white text-[#392D29] hover:bg-[#FAF6F1] hover:text-[#A26D57] border border-[#E8D6C5]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`${t.galleryPage.openDetail}: ${item.caption}`}
              className="group relative aspect-[4/5] overflow-hidden bg-[#E8D6C5]/30 rounded-[1px] cursor-pointer shadow-luxury-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
              onClick={() => setActiveItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
            >
              <img
                src={item.image_url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Category tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#392D29] font-medium">
                {getCategoryLabel(item.category)}
              </div>

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <p className="font-editorial text-xl mb-3">{item.caption}</p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D9A891]">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>{t.galleryPage.openLarge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption}
          >
            <div
              className="relative max-w-4xl max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute -top-12 right-0 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#D9A891] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A891] rounded-sm"
                aria-label={t.galleryPage.closeEscape}
              >
                <X className="w-8 h-8" aria-hidden="true" />
              </button>

              <img
                src={activeItem.image_url}
                alt={activeItem.caption}
                className="max-h-[75vh] w-auto object-contain rounded-[1px] shadow-2xl"
              />

              <div className="text-center mt-6 text-white max-w-lg space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D9A891]">
                  {getCategoryLabel(activeItem.category)}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl">{activeItem.caption}</h3>
                <div>
                  <a
                    href={`/termin?behandlung=${encodeURIComponent(activeItem.caption)}`}
                    className="btn-primary inline-flex items-center gap-2 text-xs mt-2"
                  >
                    <CalendarDays className="w-4 h-4" aria-hidden="true" />
                    <span>{t.galleryPage.bookTreatment}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
