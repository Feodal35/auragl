import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Impressum & Rechtliche Angaben | Aura Glow by Mürvet Düsseldorf",
  description:
    "Rechtliche Angaben und Impressum gemäß § 5 TMG für das Kosmetik- und Aesthetics-Studio Aura Glow by Mürvet in Düsseldorf.",
};

export const revalidate = 60;

export default async function ImpressumPage() {
  const [business, openingHours] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Impressum" }]} />
          </div>

          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-2">
              Rechtliche Angaben
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Impressum
            </h1>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-8 text-sm text-[#756A63] font-light leading-relaxed">
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                <strong className="text-[#392D29] font-medium">{business.business_name}</strong>
                <br />
                Inhaberin: {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
                <br />
                {business.country}
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Kontakt
              </h2>
              <p>
                Telefon: {business.phone_display || business.phone}
                <br />
                E-Mail: {business.email}
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Berufsbezeichnung &amp; berufsrechtliche Regelungen
              </h2>
              <p>
                Berufsbezeichnung: Kosmetikerin / Zertifizierte Master Stylistin für Permanent Make-up &amp; Wimpernästhetik
                <br />
                Zuständige Kammer: Handwerkskammer Düsseldorf
                <br />
                Verliehen in: Deutschland
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A26D57] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .<br />
                Unsere E-Mail-Adresse findest du oben im Impressum.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
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
