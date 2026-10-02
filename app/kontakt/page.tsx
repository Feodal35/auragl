import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import KontaktContent from "@/components/public/KontaktContent";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Kontakt, Anfahrt & Öffnungszeiten | 31224 Peine",
  description:
    "Kontaktiere Aura Glow by Mürvet in 31224 Peine. Telefon, WhatsApp, Öffnungszeiten, Google Maps Routenplaner und Online-Anfrage.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [business, openingHours] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <KontaktContent business={business} openingHours={openingHours} />
      </main>

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
