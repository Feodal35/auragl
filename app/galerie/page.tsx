import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getGalleryItems, getBusinessSettings, getOpeningHours } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Vorher & Nachher Galerie | Studio-Einblicke Düsseldorf",
  description:
    "Authentische Vorher-Nachher Behandlungsresultate von Aura Glow by Mürvet in Düsseldorf: Wimpernverlängerung, Hollywood Glow Facials & Permanent Make-up.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const [items, business, openingHours] = await Promise.all([
    getGalleryItems(),
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={[{ label: "Galerie & Ergebnisse" }]} />
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
              Impressionen
            </span>
            <span className="w-8 h-[1px] bg-[#B88770]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
            Galerie &amp; Studioeinblicke
          </h1>
          <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
            Echte Resultate, feinste Linien und die beruhigende Ästhetik unseres Studios auf der Königsallee.
          </p>
        </div>

        {/* Client Gallery Grid with Category Filters and Lightbox */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient items={items} />
        </div>
      </main>

      {/* Sticky Mobile Call & Booking CTA (Item 9) */}
      <StickyMobileCta
        phone={business.phone_display || business.phone}
        whatsapp={business.whatsapp || business.phone}
      />

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
