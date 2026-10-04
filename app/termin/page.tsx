import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import AppointmentForm from "@/components/public/AppointmentForm";
import { getServices, getBusinessSettings, getOpeningHours } from "@/lib/db";
import { Clock3, CalendarCheck, ShieldCheck } from "lucide-react";

import TerminHeader from "@/components/public/TerminHeader";
import TerminInfoCards from "@/components/public/TerminInfoCards";

export const metadata: Metadata = {
  title: "Termin online anfragen | Wunschtermin in Peine sichern",
  description:
    "Vereinbare deinen Wunschtermin bei Aura Glow by Mürvet in 31224 Peine. Wimpern, Facials & Permanent Make-up.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ behandlung?: string }>;
}

export default async function AppointmentPage({ searchParams }: PageProps) {
  const { behandlung } = await searchParams;

  const [services, business, openingHours] = await Promise.all([
    getServices(),
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={[{ label: "Terminanfrage" }]} />
        </div>

        {/* Header (Bilingual) */}
        <TerminHeader />

        {/* Form Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Guidelines & Reassurance (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <TerminInfoCards />

              {business.whatsapp && (
                <div className="bg-[#FAF6F1] p-6 border border-[#E8D6C5] rounded-[1px] space-y-2 text-xs">
                  <strong className="text-[#392D29] block">
                    Lieber direkt per WhatsApp?
                  </strong>
                  <p className="text-[#756A63] font-light">
                    Du kannst uns deine Terminanfrage auch direkt über WhatsApp senden.
                  </p>
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#25D366] font-medium hover:underline pt-1"
                  >
                    WhatsApp Chat starten &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Form (8 cols) */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm">
              <AppointmentForm
                services={services}
                initialTreatment={behandlung}
              />
            </div>
          </div>
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
