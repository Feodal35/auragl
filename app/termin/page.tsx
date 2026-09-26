import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import AppointmentForm from "@/components/public/AppointmentForm";
import { getAllServices, getBusinessSettings, getOpeningHours } from "@/lib/db";
import { Clock3, CalendarCheck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Termin online anfragen",
  description:
    "Vereinbare deine persönliche Auszeit bei Aura Glow by Mürvet. Wähle deine Wunschbehandlung und deinen Wunschtermin.",
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
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
              Auszeit buchen
            </span>
            <span className="w-8 h-[1px] bg-[#B88770]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
            Terminanfrage
          </h1>
          <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
            Wähle deine bevorzugte Behandlung und deinen Wunschtermin. Wir prüfen die
            Verfügbarkeit und melden uns umgehend bei dir.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Information & Trust Indicators (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
                <div className="flex items-center gap-2.5 text-[#B88770]">
                  <CalendarCheck className="w-5 h-5" />
                  <h2 className="font-editorial text-xl text-[#392D29]">
                    Wichtige Hinweise
                  </h2>
                </div>
                <div className="space-y-3 text-xs text-[#756A63] font-light leading-relaxed">
                  <p>
                    <strong className="text-[#392D29] block">Unverbindliche Anfrage:</strong>
                    Deine Terminanfrage wird erst nach unserer persönlichen Rückmeldung per E-Mail,
                    Telefon oder WhatsApp verbindlich bestätigt.
                  </p>
                  <p>
                    <strong className="text-[#392D29] block">Pünktlichkeit &amp; Ruhe:</strong>
                    Bitte erscheine pünktlich zu deinem Termin, damit wir deine Behandlungszeit in
                    voller Ruhe ausschöpfen können.
                  </p>
                  <p>
                    <strong className="text-[#392D29] block">Terminabsage:</strong>
                    Solltest du deinen Termin nicht wahrnehmen können, bitten wir um eine Absage
                    mindestens 24 Stunden im Voraus.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              {business.whatsapp && (
                <div className="bg-[#FAF6F1] p-6 border border-[#E8D6C5] rounded-[1px] text-xs space-y-2">
                  <span className="font-medium text-[#392D29] block">
                    Schnelle Rückfrage?
                  </span>
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

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
