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

import DankeContent from "@/components/public/DankeContent";

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

          {/* Main Confirmation Card (Bilingual) */}
          <DankeContent
            isAppointment={isAppointment}
            businessPhone={business.phone_display || business.phone}
            businessWhatsapp={business.whatsapp || business.phone}
          />

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
