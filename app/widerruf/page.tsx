import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import { Undo2, AlertCircle, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung & Muster-Widerrufsformular | Aura Glow by Mürvet",
  description:
    "Informationen zum gesetzlichen Widerrufsrecht für Verbraucher und Muster-Widerrufsformular bei Aura Glow by Mürvet in Peine.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WiderrufPage() {
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
            <Breadcrumbs items={[{ label: "Widerrufsbelehrung" }]} />
          </div>

          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-2">
              Verbraucherinformationen
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Widerrufsbelehrung
            </h1>
            <p className="text-xs text-[#756A63] font-light mt-2">
              Gesetzliche Informationen für Verbraucher bei Fernabsatzverträgen gemäß § 355 BGB und Art. 246a EGBGB
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-8 text-sm text-[#756A63] font-light leading-relaxed">
            {/* Widerrufsrecht */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Widerrufsrecht
              </h2>
              <p>
                Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              </p>
              <p className="mt-2">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p className="mt-3">
                Um dein Widerrufsrecht auszuüben, musst du uns:
              </p>
              <div className="my-3 p-4 bg-[#FAF6F1] border-l-2 border-[#A26D57] rounded-r-sm">
                <strong className="text-[#392D29] block font-medium">
                  {business.business_name}
                </strong>
                Inhaberin: {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
                <br />
                Telefon: {business.phone_display || business.phone}
                <br />
                E-Mail: {business.email}
              </div>
              <p>
                mittels einer eindeutigen Erklärung (z.&nbsp;B. ein mit der Post versandter Brief oder eine E-Mail) über deinen Entschluss, diesen Vertrag zu widerrufen, informieren. Du kannst dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
              </p>
              <p className="mt-2">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.
              </p>
            </div>

            {/* Folgen des Widerrufs */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                Folgen des Widerrufs
              </h2>
              <p>
                Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über deinen Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden dir wegen dieser Rückzahlung Entgelte berechnet.
              </p>
              <p className="mt-2">
                Hast du verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so hast du uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem du uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichtest, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
              </p>
            </div>

            {/* Besonderer Hinweis: Vorzeitiges Erlöschen */}
            <div className="bg-[#FAF6F1] border border-[#E8D6C5] p-6 rounded-[1px] space-y-2">
              <div className="flex items-center gap-2 text-[#392D29] font-medium text-sm">
                <AlertCircle className="w-4 h-4 text-[#A26D57]" />
                <h3 className="font-editorial text-lg text-[#392D29]">
                  Besonderer Hinweis zum vorzeitigen Erlöschen des Widerrufsrechts
                </h3>
              </div>
              <p className="text-xs text-[#756A63] leading-relaxed">
                Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen vorzeitig, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben, nachdem du dazu deine ausdrückliche Zustimmung gegeben hast und gleichzeitig deine Kenntnis davon bestätigt hast, dass du dein Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlierst (§ 356 Abs. 4 BGB).
              </p>
            </div>

            {/* Muster-Widerrufsformular */}
            <div className="pt-4 border-t border-[#E8D6C5]">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck2 className="w-5 h-5 text-[#A26D57]" />
                <h2 className="font-editorial text-2xl text-[#392D29]">
                  Muster-Widerrufsformular
                </h2>
              </div>
              <p className="text-xs text-[#756A63] mb-4">
                (Wenn du den Vertrag widerrufen willst, dann fülle bitte dieses Formular aus und sende es an uns zurück.)
              </p>

              <div className="bg-[#FAF6F1] border border-[#E8D6C5] p-6 rounded-[1px] font-mono text-xs text-[#392D29] space-y-3 leading-relaxed">
                <p>
                  An:
                  <br />
                  {business.business_name}
                  <br />
                  Inhaberin: {business.owner_name}
                  <br />
                  {business.street}
                  <br />
                  {business.postal_code} {business.city}
                  <br />
                  E-Mail: {business.email}
                </p>
                <hr className="border-[#E8D6C5]" />
                <p>
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*):
                </p>
                <p className="text-[#756A63] italic">
                  [Bezeichnung der gebuchten Behandlung / Dienstleistung]
                </p>
                <p>
                  Bestellt am (*) / erhalten am (*): ________________________
                </p>
                <p>
                  Name des/der Verbraucher(s): ____________________________
                </p>
                <p>
                  Anschrift des/der Verbraucher(s): _________________________
                </p>
                <p>
                  Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
                  <br />
                  <br />
                  __________________________________________________
                </p>
                <p>
                  Datum: ________________________
                </p>
                <p className="text-[10px] text-[#756A63]">
                  (*) Unzutreffendes streichen.
                </p>
              </div>
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
