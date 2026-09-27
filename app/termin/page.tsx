import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import AppointmentForm from "@/components/public/AppointmentForm";
import { getAllServices, getBusinessSettings, getOpeningHours } from "@/lib/db";
import { Clock3, CalendarCheck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Termin online anfragen | Wunschtermin in Düsseldorf sichern",
  description:
    "Vereinbare deinen Wunschtermin bei Aura Glow by Mürvet auf der Königsallee in Düsseldorf. Wimpern, Facials & Permanent Make-up.",
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ behandlung?: string }>;
}

export default async function AppointmentPage({ searchParams }: PageProps) {
  const { behandlung } = await searchParams;

  const [services, business, openingHours] = await Promise.all([
    getAllServices(),
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

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
              Auszeit buchen
            </span>
            <span className="w-8 h-[1px] bg-[#B88770]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
            Terminanfrage
          </h1>
          <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
            Wähle deine bevorzugte Behandlung und teile uns deine Terminwünsche mit.
            Wir melden uns umgehend persönlich bei dir.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Guidelines & Reassurance (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#392D29]">
                  Verbindliche Bestätigung
                </h3>
                <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
                  Deine Online-Anfrage ist zunächst unverbindlich. Nach Eingang prüfen wir den
                  Studio-Kalender und bestätigen dir den Termin persönlich per WhatsApp, SMS
                  oder Telefon.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                  <Clock3 className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#392D29]">
                  Rechtzeitiges Erscheinen
                </h3>
                <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
                  Um deine Behandlung voll auszukosten und eine entspannte Vorbereitung zu gewährleisten,
                  bitten wir dich, etwa 5 Minuten vor deinem vereinbarten Termin da zu sein.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#392D29]">
                  Datenschutz &amp; Diskretion
                </h3>
                <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
                  Deine Kontaktdaten werden vertraulich behandelt und ausschließlich zur
                  Terminabstimmung genutzt.
                </p>
              </div>

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
