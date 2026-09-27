import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import PreiseContent from "@/components/public/PreiseContent";
import { getCategories, getPricing, getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Preise & Behandlungsübersicht | Transparente Konditionen Düsseldorf",
  description:
    "Transparente Preisliste für alle Behandlungen von Aura Glow by Mürvet in Düsseldorf: Wimpernverlängerung, Hollywood Glow, Microneedling & Powder Brows.",
};

export const revalidate = 60;

export default async function PricingPage() {
  const [categories, pricing, business, openingHours] = await Promise.all([
    getCategories(),
    getPricing(),
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <PreiseContent categories={categories} pricing={pricing} />
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
