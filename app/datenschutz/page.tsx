import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Datenschutzerklärung (DSGVO) | Aura Glow by Mürvet Düsseldorf",
  description:
    "Informationen zur transparenten Verarbeitung personenbezogener Daten gemäß DSGVO im Studio Aura Glow by Mürvet in Düsseldorf.",
};

export const revalidate = 60;

export default async function PrivacyPage() {
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
            <Breadcrumbs items={[{ label: "Datenschutzerklärung" }]} />
          </div>

          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-2">
              Transparenz &amp; Sicherheit
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Datenschutzerklärung
            </h1>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-8 text-sm text-[#756A63] font-light leading-relaxed">
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <p>
                Der Schutz deiner persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend
                informieren wir dich darüber, welche Daten bei der Nutzung unserer Website erhoben
                und wie sie verarbeitet werden.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                2. Verantwortliche Stelle
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                <strong className="text-[#392D29] font-medium">{business.business_name}</strong>
                <br />
                Inhaberin: {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
                <br />
                Telefon: {business.phone_display || business.phone}
                <br />
                E-Mail: {business.email}
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 className="font-medium text-[#392D29] mt-3 mb-1">
                Terminanfragen &amp; Kontaktformular
              </h3>
              <p>
                Wenn du uns per Kontaktformular oder Terminanfrage-Formular Anfragen zukommen lässt,
                werden deine Angaben aus dem Formular inklusive der von dir dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei
                uns gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Diese Daten geben wir nicht ohne
                deine Einwilligung weiter.
              </p>
              <h3 className="font-medium text-[#392D29] mt-3 mb-1">
                Server-Log-Dateien
              </h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt:
                Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname
                des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                4. Speicherdauer
              </h2>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
                wurde, verbleiben deine personenbezogenen Daten bei uns, bis der Zweck für die
                Datenverarbeitung entfällt oder du uns zur Löschung aufforderst bzw. deine
                Einwilligung widerrufst.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                5. Deine Rechte als betroffene Person
              </h2>
              <p>
                Du hast jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und
                Zweck deiner gespeicherten personenbezogenen Daten (Art. 15 DSGVO). Du hast außerdem
                das Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) oder
                Einschränkung der Verarbeitung (Art. 18 DSGVO) dieser Daten sowie ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                6. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du
                daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an
                dem Schloss-Symbol in deiner Browserzeile.
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
