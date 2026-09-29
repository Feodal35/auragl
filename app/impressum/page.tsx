import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";

export const metadata: Metadata = {
  title: "Impressum & Rechtliche Angaben (§ 5 DDG) | Aura Glow by Mürvet",
  description:
    "Rechtliche Angaben und Impressum gemäß § 5 DDG und § 18 Abs. 2 MStV für das Kosmetik- und Aesthetics-Studio Aura Glow by Mürvet in Peine.",
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
              Rechtliche Anbieterkennzeichnung
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Impressum
            </h1>
            <p className="text-xs text-[#756A63] font-light mt-2">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-8 text-sm text-[#756A63] font-light leading-relaxed">
            {/* 1. Anbieter & Anschrift */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                1. Angaben gemäß § 5 DDG
              </h2>
              <p>
                <strong className="text-[#392D29] font-medium block text-base">
                  {business.business_name}
                </strong>
                Inhaberin: {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
                <br />
                {business.country || "Deutschland"}
              </p>
            </div>

            {/* 2. Kontakt */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                2. Kontaktmöglichkeiten
              </h2>
              <p>
                Telefon:{" "}
                <a
                  href={`tel:${business.phone.replace(/\s+/g, "")}`}
                  className="text-[#392D29] font-medium hover:text-[#A26D57] transition-colors"
                >
                  {business.phone_display || business.phone}
                </a>
                <br />
                E-Mail:{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="text-[#392D29] font-medium hover:text-[#A26D57] transition-colors"
                >
                  {business.email}
                </a>
                {business.whatsapp && (
                  <>
                    <br />
                    WhatsApp: {business.whatsapp}
                  </>
                )}
              </p>
            </div>

            {/* 3. Berufsbezeichnung & Kammer */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                3. Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <p>
                <strong>Berufsbezeichnung:</strong> Fachkosmetikerin &amp; Zertifizierte Master Stylistin für Permanent Make-up und Wimpernästhetik
                <br />
                <strong>Verliehen in:</strong> Bundesrepublik Deutschland
                <br />
                <strong>Zuständige Handwerkskammer:</strong>
                <br />
                Handwerkskammer Braunschweig-Lüneburg-Stade
                <br />
                Burgplatz 1, 38100 Braunschweig
                <br />
                Website:{" "}
                <a
                  href="https://www.hwk-bls.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A26D57] hover:underline"
                >
                  www.hwk-bls.de
                </a>
              </p>
              <p className="mt-2">
                <strong>Berufsrechtliche Regelungen:</strong>
                <br />
                Handwerksordnung (HwO) in der jeweils gültigen Fassung, abrufbar unter:{" "}
                <a
                  href="https://www.gesetze-im-internet.de/hwo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A26D57] hover:underline"
                >
                  https://www.gesetze-im-internet.de/hwo/
                </a>
              </p>
            </div>

            {/* 4. Umsatzsteuer & Steuerrecht */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                4. Umsatzsteuer-Hinweis
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz (UStG):
                <br />
                Wird auf Anfrage mitgeteilt bzw. ausgewiesen auf Rechnungen.
                <br />
                <span className="text-xs text-[#756A63]/80">
                  (Alle im Studio und online angegebenen Behandlungspreise verstehen sich als Endpreise in Euro inklusive der gesetzlichen Mehrwertsteuer gemäß Preisangabenverordnung).
                </span>
              </p>
            </div>

            {/* 5. Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                5. Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>
                {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
              </p>
            </div>

            {/* 6. EU-Streitschlichtung & Verbraucherstreitbeilegung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                6. Verbraucherstreitbeilegung (§ 36 VSBG)
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die du unter{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A26D57] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>{" "}
                findest.
              </p>
              <p className="mt-2">
                Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes (VSBG) teilzunehmen.
              </p>
            </div>

            {/* 7. Haftung für Inhalte & Links */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                7. Haftung für Inhalte und Links
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>
              <p className="mt-2">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            {/* 8. Urheberrecht */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                8. Urheberrecht
              </h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte, Fotos, Texte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht (UrhG). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung der jeweiligen Urheberin.
              </p>
            </div>

            {/* 9. Konzeption, Webdesign & Technische Realisierung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                9. Konzeption, Webdesign &amp; Technische Realisierung
              </h2>
              <p>
                Verantwortlich für Konzeption, UI/UX-Design, barrierefreie Next.js Webentwicklung und Performance-Optimierung:
                <br />
                <strong className="text-[#392D29] font-medium block mt-1">
                  Acumen Dijital
                </strong>
                Website:{" "}
                <a
                  href="https://acumendijital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#392D29] font-medium hover:text-[#A26D57] underline transition-colors"
                >
                  https://acumendijital.com/
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Call & Booking CTA */}
      <StickyMobileCta
        phone={business.phone_display || business.phone}
        whatsapp={business.whatsapp || business.phone}
      />

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
