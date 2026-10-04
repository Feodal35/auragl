import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getGalleryItems, getBusinessSettings, getOpeningHours } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Vorher & Nachher Galerie | Studio-Einblicke Peine",
  description:
    "Authentische Vorher-Nachher Behandlungsresultate von Aura Glow by Mürvet in Peine: Wimpernverlängerung, Hollywood Glow Facials & Permanent Make-up.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        <GalleryClient items={items} />
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
