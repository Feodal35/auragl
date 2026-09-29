"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Eye } from "lucide-react";
import { GalleryItem } from "@/lib/types";

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export default function GalleryPreviewSection({ items }: GalleryPreviewProps) {
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

  // Take first 5 items for homepage editorial showcase
  const previewItems = items.slice(0, 5);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F1] border-b border-[#E8D6C5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
                Portfolio &amp; Impressionen
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29]">
              Ausgewählte Arbeiten
            </h2>
          </div>
          <a
            href="/galerie"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#392D29] hover:text-[#A26D57] transition-colors pb-1 border-b border-[#392D29] hover:border-[#A26D57] min-h-[44px]"
          >
            <span>Gesamte Galerie öffnen</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Item (7 cols) */}
          {previewItems[0] && (
            <div
              role="button"
              tabIndex={0}
              aria-label={`Detailansicht öffnen: ${previewItems[0].caption}`}
              className="md:col-span-7 group relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#E8D6C5]/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
              onClick={() => setActiveItem(previewItems[0])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveItem(previewItems[0]);
                }
              }}
            >
              <Image
                src={previewItems[0].image_url}
                alt={`${previewItems[0].caption} - Behandlungsergebnis Aura Glow Peine`}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#D9A891]">
                    {previewItems[0].category}
                  </span>
                  <p className="text-white font-editorial text-xl">{previewItems[0].caption}</p>
                </div>
              </div>
            </div>
          )}

          {/* Right Column Stack (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {previewItems.slice(1, 3).map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Detailansicht öffnen: ${item.caption}`}
                className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#E8D6C5]/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
              >
                <Image
                  src={item.image_url}
                  alt={`${item.caption} - Vorher Nachher Ergebnis Peine`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 42vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9A891]">
                      {item.category}
                    </span>
                    <p className="text-white text-sm font-editorial">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.caption}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute -top-12 right-0 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#D9A891] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A891] rounded-sm"
              aria-label="Schließen (Escape)"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
            <div className="relative w-[90vw] max-w-3xl h-[65vh]">
              <Image
                src={activeItem.image_url}
                alt={`${activeItem.caption} - Großansicht Behandlungsergebnis Aura Glow`}
                fill
                sizes="(max-width: 1024px) 90vw, 1024px"
                className="object-contain rounded-[1px] shadow-2xl"
                priority
              />
            </div>
            <div className="text-center mt-4 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9A891]">
                {activeItem.category}
              </span>
              <h3 className="font-editorial text-2xl mt-1">{activeItem.caption}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
