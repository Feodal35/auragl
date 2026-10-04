import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import AboutContent from "@/components/public/AboutContent";
import { getBusinessSettings, getOpeningHours, getContentSections } from "@/lib/db";

export const metadata: Metadata = {
  title: "Über Mürvet | Studio-Philosophie & Expertise Peine",
  description:
    "Erfahre mehr über Mürvet und die Philosophie von Aura Glow in Peine: Meisterhafte Präzision, natürliche Ästhetik und kompromisslose Hygiene.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const [business, openingHours, contentSections] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
    getContentSections(),
  ]);

  const aboutContent = contentSections.about_murvet;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <AboutContent aboutContent={aboutContent} />
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
