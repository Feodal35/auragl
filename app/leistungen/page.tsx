import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import LeistungenContent from "@/components/public/LeistungenContent";
import { getCategories, getServices, getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Behandlungen & Facials | Wimpern, Brows & Glow Facials Peine",
  description:
    "Exklusives Leistungsangebot von Aura Glow by Mürvet in Peine: Wimpernverlängerung, Hollywood Glow, Microneedling, Powder Brows und zertifizierte Schulungen.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage() {
  const [categories, services, business, openingHours] = await Promise.all([
    getCategories(),
    getServices(),
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <LeistungenContent categories={categories} services={services} />
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
