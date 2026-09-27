import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import {
  CheckCircle2,
  CalendarDays,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vielen Dank für deine Anfrage",
  description:
    "Deine Anfrage ist erfolgreich bei Aura Glow by Mürvet eingegangen. Wir prüfen deinen Wunschtermin und melden uns schnellstmöglich persönlich bei dir.",
  robots: {
    index: false,
    follow: false,
  },
};

interface DankePageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function DankePage({ searchParams }: DankePageProps) {
  const [business, openingHours, params] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
    searchParams,
  ]);

  const isAppointment = params?.type === "termin" || !params?.type;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Vielen Dank" }]} />
          </div>

          {/* Main Confirmation Card */}
          <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-md p-8 sm:p-14 text-center">
            {/* Animated Check Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF6F1] border-2 border-[#B88770]/40 text-[#A26D57] flex items-center justify-center mx-auto mb-6 shadow-luxury-sm">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
            </div>

            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#B88770]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
                Erfolgreich übermittelt
              </span>
              <Sparkles className="w-4 h-4 text-[#B88770]" />
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl text-[#392D29] font-light mb-4">
              {isAppointment
                ? "Vielen Dank für deine Terminanfrage!"
                : "Vielen Dank für deine Nachricht!"}
            </h1>

            <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed mb-10">
              {isAppointment
                ? "Wir haben deine Terminanfrage erhalten. Mürvet prüft den Studio-Kalender und meldet sich schnellstmöglich persönlich zur verbindlichen Abstimmung bei dir."
                : "Deine Nachricht ist sicher bei uns eingegangen. Wir werden uns innerhalb kurzer Zeit persönlich mit dir in Verbindung setzen."}
            </p>

            {/* Next Steps Roadmap */}
            <div className="text-left bg-[#FAF6F1] border border-[#E8D6C5]/70 rounded-[1px] p-6 sm:p-8 mb-10">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium mb-6 text-center sm:text-left">
                So geht es jetzt weiter:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
                    <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                      1
                    </span>
                    <span>Anfrage geprüft</span>
                  </div>
                  <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
                    Deine Daten und Terminwünsche liegen direkt in unserem Studio-System vor.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
                    <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                      2
                    </span>
                    <span>Rückmeldung</span>
                  </div>
                  <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
                    Wir kontaktieren dich per WhatsApp oder Telefon zur genauen Zeitabstimmung.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
                    <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                      3
                    </span>
                    <span>Dein Studio-Besuch</span>
                  </div>
                  <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
                    Entspanne bei deinem Termin in unserem Studio in Düsseldorf.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/"
                className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 text-xs min-h-[46px]"
              >
                <span>Zurück zur Startseite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/leistungen"
                className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 text-xs min-h-[46px]"
              >
                <CalendarDays className="w-4 h-4 text-[#A26D57]" />
                <span>Behandlungen ansehen</span>
              </Link>
            </div>
          </div>

          {/* Quick Studio Contact & Location Card */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E8D6C5] p-6 rounded-[1px] shadow-luxury-sm space-y-3">
              <div className="flex items-center gap-2 text-[#392D29] font-medium text-sm">
                <MapPin className="w-4 h-4 text-[#A26D57]" />
                <span>Studio Standort</span>
              </div>
              <p className="text-xs text-[#756A63] font-light leading-relaxed">
                {business.business_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
              </p>
              {business.google_maps_url && (
                <a
                  href={business.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#A26D57] hover:underline font-medium pt-1"
                >
                  <span>Anfahrt in Google Maps planen &rarr;</span>
                </a>
              )}
            </div>

            <div className="bg-white border border-[#E8D6C5] p-6 rounded-[1px] shadow-luxury-sm space-y-3">
              <div className="flex items-center gap-2 text-[#392D29] font-medium text-sm">
                <Phone className="w-4 h-4 text-[#A26D57]" />
                <span>Direkter Draht</span>
              </div>
              <p className="text-xs text-[#756A63] font-light leading-relaxed">
                Eilige Terminanfrage oder dringende Rückfrage? Du erreichst uns auch direkt telefonisch oder via WhatsApp:
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={`tel:${business.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#392D29] hover:text-[#A26D57] font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A26D57]" />
                  <span>{business.phone_display || business.phone}</span>
                </a>
                {business.whatsapp && (
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
