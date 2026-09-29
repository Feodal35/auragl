import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import { ShieldAlert, Clock3, CalendarDays, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) | Aura Glow by Mürvet",
  description:
    "Allgemeine Geschäftsbedingungen und Stornierungsregelungen für kosmetische Behandlungen bei Aura Glow by Mürvet in Peine.",
};

export const revalidate = 60;

export default async function AgbPage() {
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
            <Breadcrumbs items={[{ label: "AGB & Stornierung" }]} />
          </div>

          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-2">
              Vertragsbedingungen &amp; Kundeninformationen
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-xs text-[#756A63] font-light mt-2">
              Stand: 2026 &bull; Gültig für alle Dienstleistungen, Terminvereinbarungen und Behandlungen
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-10 text-sm text-[#756A63] font-light leading-relaxed">
            {/* Wichtiger Hinweis Box: Stornierungsfrist */}
            <div className="bg-[#FAF6F1] border-l-4 border-[#A26D57] p-5 rounded-r-[1px] space-y-2">
              <div className="flex items-center gap-2 text-[#392D29] font-medium text-sm">
                <Clock3 className="w-4 h-4 text-[#A26D57]" />
                <span>Wichtigste Regelung auf einen Blick (Stornierungsfrist 24h)</span>
              </div>
              <p className="text-xs text-[#756A63] leading-relaxed">
                Unsere Behandlungszeiten werden exklusiv für dich reserviert. Solltest du einen Termin nicht wahrnehmen können, sage ihn bitte <strong>mindestens 24 Stunden im Voraus</strong> telefonisch oder per WhatsApp ab. Bei unentschuldigtem Nichterscheinen oder verspäteter Absage behalten wir uns gemäß § 615 BGB vor, ein angemessenes Ausfallhonorar in Rechnung zu stellen.
              </p>
            </div>

            {/* § 1 Geltungsbereich */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 1 Geltungsbereich und Vertragspartner
              </h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend &bdquo;AGB&ldquo;) gelten für alle Dienstleistungsverträge, Behandlungen, Beratungen und Gutscheinverkäufe, die zwischen dem Studio
              </p>
              <p className="mt-2 pl-4 border-l-2 border-[#E8D6C5]">
                <strong className="text-[#392D29] font-medium">{business.business_name}</strong>
                <br />
                Inhaberin: {business.owner_name}
                <br />
                {business.street}, {business.postal_code} {business.city}
                <br />
                Telefon: {business.phone_display || business.phone} &bull; E-Mail: {business.email}
              </p>
              <p className="mt-2">
                (nachfolgend &bdquo;Studio&ldquo; oder &bdquo;wir&ldquo;) und der Kundin bzw. dem Kunden (nachfolgend &bdquo;Kundin&ldquo;) geschlossen werden.
              </p>
              <p className="mt-2">
                (2) Abweichende, entgegenstehende oder ergänzende Bedingungen der Kundin werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
              </p>
            </div>

            {/* § 2 Vertragsschluss */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 2 Vertragsschluss und Terminanfragen
              </h2>
              <p>
                (1) Die Darstellung unseres Leistungsangebots auf der Website stellt kein verbindliches Angebot im juristischen Sinne dar, sondern eine unverbindliche Aufforderung zur Terminanfrage.
              </p>
              <p className="mt-2">
                (2) Eine Terminanfrage kann über das Online-Terminformular, telefonisch, per WhatsApp oder per E-Mail gestellt werden. Der Behandlungsvertrag kommt zustande, sobald wir die Terminanfrage ausdrücklich (per WhatsApp, E-Mail, SMS oder telefonisch) verbindlich bestätigen.
              </p>
              <p className="mt-2">
                (3) Gegenstand des Vertrages ist die Erbringung der vereinbarten kosmetischen Dienstleistung (Dienstvertrag gemäß § 611 ff. BGB). Ein konkreter Heilerfolg oder ein über die fachgerechte kosmetische Ausführung hinausgehender Werkerfolg wird nicht geschuldet.
              </p>
            </div>

            {/* § 3 Stornierungsbedingungen */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 3 Stornierungsbedingungen und Ausfallhonorar (§ 615 BGB)
              </h2>
              <p>
                (1) Unser Studio wird als reines Bestell- und Terminstudio geführt. Die vereinbarten Behandlungszeiten sind ausschließlich für die jeweilige Kundin reserviert.
              </p>
              <p className="mt-2">
                (2) <strong>Kostenfreie Stornierung:</strong> Eine Absage oder Verlegung eines gebuchten Termins ist bis zu <strong>24 Stunden vor dem vereinbarten Behandlungstermin</strong> kostenfrei möglich. Die Absage kann per Telefon, WhatsApp oder E-Mail erfolgen (maßgeblich ist der Eingangszeitpunkt beim Studio).
              </p>
              <p className="mt-2">
                (3) <strong>Verspätete Absage &amp; Nichterscheinen (No-Show):</strong> Wird ein Termin später als 24 Stunden vor Beginn abgesagt oder erscheint die Kundin ohne vorherige Absage nicht zum Termin, gerät die Kundin in Annahmeverzug. Gemäß § 615 Satz 1 BGB sind wir in diesem Fall berechtigt, für die infolge des Verzugs nicht erbrachte Leistung ein Ausfallhonorar in Höhe von <strong>50 % des vereinbarten Behandlungspreises</strong> zu verlangen.
              </p>
              <p className="mt-2">
                (4) Der Anspruch auf das Ausfallhonorar entfällt oder mindert sich insoweit, als es dem Studio gelingt, das freigewordene Zeitfenster anderweitig durch eine andere Kundin zu belegen. Der Kundin bleibt der Nachweis vorbehalten, dass dem Studio kein Schaden oder ein wesentlich geringerer Schaden entstanden ist.
              </p>
            </div>

            {/* § 4 Verspätungen */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 4 Verspätetes Erscheinen der Kundin
              </h2>
              <p>
                (1) Um den reibungslosen Ablauf zu gewährleisten und nachfolgenden Kundinnen die volle Behandlungszeit zu garantieren, bitten wir um pünktliches Erscheinen (ca. 5 Minuten vor Behandlungsbeginn).
              </p>
              <p className="mt-2">
                (2) Bei verspätetem Eintreffen der Kundin verkürzt sich die Behandlungszeit um den Zeitraum der Verspätung, sofern eine Verlängerung mit Blick auf Folgekundinnen nicht möglich ist. Der volle Behandlungspreis bleibt ungekürzt geschuldet.
              </p>
            </div>

            {/* § 5 Preise & Zahlungsbedingungen */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 5 Preise und Zahlungsbedingungen
              </h2>
              <p>
                (1) Alle auf der Website sowie im Studio angegebenen Preise verstehen sich als Endpreise in Euro (€) inklusive der jeweils gültigen gesetzlichen Mehrwertsteuer (Preisangabenverordnung).
              </p>
              <p className="mt-2">
                (2) Die Vergütung ist unmittelbar im Anschluss an die Erbringung der Dienstleistung im Studio zur Zahlung fällig.
              </p>
              <p className="mt-2">
                (3) Als Zahlungsmethoden werden Barzahlung, EC-Karte (Girocard) und gängige Kreditkarten (Visa, Mastercard) akzeptiert.
              </p>
            </div>

            {/* § 6 Gutscheine */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 6 Gutscheine
              </h2>
              <p>
                (1) Geschenkgutscheine können für sämtliche Behandlungen oder Produkte des Studios eingelöst werden. Eine Barauszahlung des Gutscheinwerts oder von Restbeträgen ist ausgeschlossen.
              </p>
              <p className="mt-2">
                (2) Gutscheine haben die gesetzliche Verjährungsfrist von drei Jahren ab dem Ende des Jahres, in dem der Gutschein ausgestellt wurde (§§ 195, 199 BGB).
              </p>
            </div>

            {/* § 7 Mitwirkungspflichten & Gesundheit */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 7 Mitwirkungspflichten der Kundin &amp; gesundheitliche Kontraindikationen
              </h2>
              <p>
                (1) Die Kundin ist verpflichtet, das Studio vor Beginn der Behandlung wahrheitsgemäß und vollständig über bestehende Vorerkrankungen, Allergien (insbesondere gegen Klebstoffe, Wimpernfarben, Kosmetikprodukte), Hauterkrankungen, die Einnahme blutverdünnender oder hautrelevanter Medikamente sowie über eine bestehende Schwangerschaft oder Stillzeit zu informieren.
              </p>
              <p className="mt-2">
                (2) Bei akuten Infektionen, Entzündungen im Behandlungsbereich (z.B. Bindehautentzündung, Herpes) oder unzureichend abgeheilten Wunden behalten wir uns das Recht vor, die Behandlung zum Schutz der Gesundheit der Kundin abzulehnen oder zu vertagen.
              </p>
              <p className="mt-2">
                (3) Für Schäden oder Reizungen, die darauf zurückzuführen sind, dass die Kundin uns über relevante Kontraindikationen oder Allergien nicht, verspätet oder unvollständig in Kenntnis gesetzt hat, übernimmt das Studio keine Haftung.
              </p>
            </div>

            {/* § 8 Nachsorge & Reklamationen */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 8 Nachpflege und Beanstandungen (Reklamation)
              </h2>
              <p>
                (1) Das Ergebnis und die Haltbarkeit kosmetischer Behandlungen (insbesondere Wimpernverlängerung, Lash Lifting, Permanent Make-up, Facials) hängen maßgeblich von der individuellen Nachpflege ab. Die Kundin verpflichtet sich, die ihr im Studio mündlich und/oder schriftlich mitgeteilten Pflegehinweise (z.B. 24–48h kein direkter Wasserkontakt, keine ölhaltigen Reinigungsprodukte an den Wimpern, kein Saunabesuch) strikt zu befolgen.
              </p>
              <p className="mt-2">
                (2) Sollte die Kundin eine Beanstandung hinsichtlich der handwerklichen Durchführung haben (z.B. ungewöhnlicher Wimpernausfall trotz korrekter Nachpflege), ist diese unverzüglich, spätestens jedoch <strong>innerhalb von 3 Tagen</strong> nach dem Behandlungstermin, dem Studio mitzuteilen und bildlich oder persönlich vorzuführen, damit wir Gelegenheit zur kostenfreien Nachbesserung erhalten.
              </p>
            </div>

            {/* § 9 Haftung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 9 Haftungsbeschränkung
              </h2>
              <p>
                (1) Das Studio haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit nach den gesetzlichen Bestimmungen.
              </p>
              <p className="mt-2">
                (2) Bei einfacher Fahrlässigkeit haftet das Studio nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung die Kundin regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
              </p>
              <p className="mt-2">
                (3) Für mitgebrachte persönliche Gegenstände, Wertsachen oder Kleidung der Kundin im Studio wird keine Haftung übernommen, es sei denn, der Verlust oder die Beschädigung beruht auf vorsätzlichem oder grob fahrlässigem Verhalten des Studios.
              </p>
            </div>

            {/* § 10 Datenschutz */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 10 Datenschutz
              </h2>
              <p>
                Die Erhebung und Verarbeitung personenbezogener Daten erfolgt ausschließlich im Einklang mit den geltenden datenschutzrechtlichen Bestimmungen (DSGVO, TDDDG). Nähere Informationen entnimmst du bitte unserer{" "}
                <Link href="/datenschutz" className="text-[#A26D57] hover:underline font-medium">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>

            {/* § 11 Schlussbestimmungen */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                § 11 Schlussbestimmungen und anwendbares Recht
              </h2>
              <p>
                (1) Auf Verträge zwischen dem Studio und der Kundin findet ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts Anwendung. Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.
              </p>
              <p className="mt-2">
                (2) Sofern die Kundin Kauffrau im Sinne des HGB, juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen ist, ist Gerichtsstand für alle Streitigkeiten aus Vertragsverhältnissen zwischen der Kundin und dem Studio der Sitz des Studios (Peine).
              </p>
              <p className="mt-2">
                (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen hierdurch nicht berührt.
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
