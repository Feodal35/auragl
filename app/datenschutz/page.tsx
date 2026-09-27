import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import { ShieldCheck, Lock, Eye, Server, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung (DSGVO & TDDDG) | Aura Glow by Mürvet",
  description:
    "Umfassende Datenschutzerklärung gemäß DSGVO und § 25 TDDDG für das Beauty- & Aesthetics-Studio Aura Glow by Mürvet in Düsseldorf.",
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-2">
              Datenschutz &amp; Transparenz
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29]">
              Datenschutzerklärung
            </h1>
            <p className="text-xs text-[#756A63] font-light mt-2">
              Gemäß Datenschutz-Grundverordnung (DSGVO) und Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG)
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-8 text-sm text-[#756A63] font-light leading-relaxed">
            {/* 1. Datenschutz auf einen Blick */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="font-medium text-[#392D29] mt-2 mb-1">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du unsere Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst. Ausführliche Informationen zum Thema Datenschutz entnimmst du unserer nachfolgend aufgeführten Datenschutzerklärung.
              </p>
            </div>

            {/* 2. Verantwortliche Stelle */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                2. Verantwortliche Stelle
              </h2>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="my-3 p-4 bg-[#FAF6F1] border-l-2 border-[#A26D57] rounded-r-sm">
                <strong className="text-[#392D29] font-medium block text-base">
                  {business.business_name}
                </strong>
                Inhaberin: {business.owner_name}
                <br />
                {business.street}
                <br />
                {business.postal_code} {business.city}
                <br />
                Deutschland
                <br />
                Telefon: {business.phone_display || business.phone}
                <br />
                E-Mail: {business.email}
              </div>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o.&nbsp;Ä.) entscheidet.
              </p>
            </div>

            {/* 3. Rechtsgrundlagen der Datenverarbeitung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                3. Rechtsgrundlagen der Datenverarbeitung
              </h2>
              <p>
                Die Verarbeitung deiner Daten erfolgt auf Basis folgender Rechtsgrundlagen der DSGVO:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>
                  <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Soweit du uns eine ausdrückliche Einwilligung für bestimmte Verarbeitungsvorgänge (z.&nbsp;B. optionale Cookies) erteilt hast.
                </li>
                <li>
                  <strong>Vertragserfüllung &amp; vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO):</strong> Für die Bearbeitung von Terminanfragen, Terminvereinbarungen und Behandlungsverträgen sowie Kontaktaufnahmen.
                </li>
                <li>
                  <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong> Für den sicheren, technisch einwandfreien Betrieb unserer Website, Server-Logfiles und Missbrauchsprävention.
                </li>
              </ul>
            </div>

            {/* 4. Datenerfassung auf dieser Website */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                4. Datenerfassung auf dieser Website
              </h2>

              <h3 className="font-medium text-[#392D29] mt-3 mb-1">
                Terminanfragen &amp; Online-Buchungsformular
              </h3>
              <p>
                Wenn du unser Terminanfrage-Formular nutzt, verarbeiten wir deine eingegebenen Kontaktdaten (Vor- und Nachname, E-Mail-Adresse, Telefonnummer, Wunschbehandlung, Terminpräferenz sowie deine freiwilligen Notizen). Diese Daten sind zur Prüfung der Studio-Verfügbarkeit und zur verbindlichen Vereinbarung deines Behandlungstermins zwingend erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Deine Daten werden nicht ohne deine Einwilligung an unbefugte Dritte weitergegeben.
              </p>

              <h3 className="font-medium text-[#392D29] mt-4 mb-1">
                Kontaktformular &amp; E-Mail-Kontakt
              </h3>
              <p>
                Wenn du uns per Kontaktformular oder E-Mail Anfragen zukommen lässt, werden deine Angaben aus dem Formular inklusive der angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns verarbeitet und gespeichert (Art. 6 Abs. 1 lit. b DSGVO).
              </p>

              <h3 className="font-medium text-[#392D29] mt-4 mb-1">
                Server-Log-Dateien
              </h3>
              <p>
                Der Provider dieser Website erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-1 text-xs">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse (in der Regel anonymisiert)</li>
              </ul>
              <p className="mt-2 text-xs">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (technische Stabilität und Sicherheit).
              </p>
            </div>

            {/* 5. Cookies & Lokale Speicherung nach § 25 TDDDG sowie Google Consent Mode v2 */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                5. Cookies, Endgeräte-Speicherung (§ 25 TDDDG) und Google Consent Mode v2
              </h2>
              <p>
                Unsere Website verwendet Cookies und lokale Speichertechnologien (LocalStorage). Cookies sind kleine Textdateien, die auf deinem Endgerät abgelegt werden und die dein Browser speichert.
              </p>
              <p className="mt-2">
                <strong>Technisch notwendige Cookies / Speicherungen:</strong> Wir setzen Speicherfunktionen ein, die für den Betrieb der Website technisch unbedingt erforderlich sind (z.&nbsp;B. Speicherung deiner Cookie-Präferenz oder CSRF-Sicherheitsmerkmale). Rechtsgrundlage hierfür ist § 25 Abs. 2 Nr. 2 TDDDG i.&nbsp;V.&nbsp;m. Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <div className="mt-3 p-4 bg-[#FAF6F1] border-l-2 border-[#A26D57] rounded-r-sm space-y-2">
                <strong className="text-[#392D29] font-medium block">
                  Integration von Google Consent Mode v2 (Google Tag &amp; Google Analytics)
                </strong>
                <p className="text-xs leading-relaxed">
                  Wir setzen den aktuellen <strong>Google Consent Mode v2</strong> ein. Dieser Standard garantiert, dass Google Tags (wie Google Analytics oder Google Ads) deine Privatsphäre-Entscheidung strikt und in Echtzeit respektieren. Standardmäßig werden beim Seitenaufruf sämtliche einwilligungspflichtigen Signale auf <code>denied</code> (abgelehnt) gesetzt:
                </p>
                <ul className="list-disc pl-5 text-xs space-y-1">
                  <li><code>analytics_storage</code>: Speicherung zu Analysezwecken (nur nach Einwilligung)</li>
                  <li><code>ad_storage</code>: Speicherung zu Werbezwecken (nur nach Einwilligung)</li>
                  <li><code>ad_user_data</code>: Übermittlung von Nutzerdaten an Google zu Werbezwecken (nur nach Einwilligung)</li>
                  <li><code>ad_personalization</code>: Personalisierte Werbung und Remarketing (nur nach Einwilligung)</li>
                </ul>
                <p className="text-xs leading-relaxed">
                  Erst wenn du im Cookie-Banner ausdrücklich auf &bdquo;Alle akzeptieren&ldquo; klickst oder in den Einstellungen die entsprechende Kategorie aktivierst, werden die Signale auf <code>granted</code> gesetzt. Du kannst deine Entscheidung jederzeit im Seitenfuß über den Button <strong>&bdquo;Cookie-Einstellungen&ldquo;</strong> einsehen und mit Wirkung für die Zukunft ändern oder widerrufen.
                </p>
              </div>
            </div>

            {/* 6. Schriftarten (Google Fonts lokal) */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                6. Web-Schriftarten (100% lokal gehostet)
              </h2>
              <p>
                Diese Seite nutzt zur einheitlichen und ansprechenden typografischen Darstellung Web-Schriftarten der Schriftfamilien <em>Cormorant Garamond</em>, <em>Dancing Script</em> und <em>Inter</em>. Diese Schriften werden über das moderne Next.js Font-System beim Build-Prozess <strong>vollständig lokal auf unserem Server eingebunden</strong>.
              </p>
              <p className="mt-2">
                Beim Aufruf unserer Seiten wird <strong>keine Verbindung zu den Servern von Google</strong> hergestellt. Es findet somit keine Übertragung deiner IP-Adresse an Google oder in die USA statt.
              </p>
            </div>

            {/* 7. Hosting & Datenbank */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                7. Hosting und Datenbank-Infrastruktur
              </h2>
              <p>
                Diese Website wird über Vercel Inc. (Cloud-Hosting) betrieben. Unsere PostgreSQL-Datenbank zur Verwaltung von Terminanfragen und Inhalten wird bei <strong>Aiven Ltd.</strong> in einem Hochsicherheits-Rechenzentrum innerhalb der Europäischen Union (Region Frankfurt am Main, Deutschland) gehostet.
              </p>
              <p className="mt-2">
                Mit den Anbietern bestehen entsprechende Vereinbarungen zur Auftragsverarbeitung (AV-Verträge nach Art. 28 DSGVO), die den Schutz deiner Daten und die Einhaltung europäischer Sicherheitsstandards garantieren.
              </p>
            </div>

            {/* 8. Google Maps Einbindung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                8. Google Maps Standort-Einbindung
              </h2>
              <p>
                Zur visuellen Darstellung unserer Studio-Lage binden wir auf den Seiten &bdquo;Kontakt&ldquo; und &bdquo;Besuch&ldquo; Karteninhalte des Dienstes Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) ein. Die Einbindung erfolgt über eine responsive Iframe-Lösung mit verzögertem Nachladen (lazy loading).
              </p>
              <p className="mt-2">
                Beim Laden der Karte verarbeitet Google deine IP-Adresse, um die Kartendaten an deinen Browser auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an einer leichten Auffindbarkeit unseres Studios in Düsseldorf). Sofern du dies nicht wünschst, kannst du stattdessen den direkten externen Google Maps Routenlink nutzen.
              </p>
            </div>

            {/* 9. SSL/TLS Verschlüsselung */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                9. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Terminanfragen oder Anfragen, die du an uns als Seitenbetreiber sendest, eine moderne SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in deiner Browserzeile.
              </p>
            </div>

            {/* 10. Betroffenenrechte */}
            <div>
              <h2 className="font-editorial text-2xl text-[#392D29] mb-3">
                10. Deine Rechte als betroffene Person
              </h2>
              <p>
                Als von der Datenverarbeitung betroffene Person stehen dir nach der DSGVO folgende Rechte zu:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Du kannst jederzeit Auskunft über deine von uns verarbeiteten personenbezogenen Daten verlangen.
                </li>
                <li>
                  <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Du hast das Recht auf unverzügliche Berichtigung unrichtiger Daten.
                </li>
                <li>
                  <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Du kannst die Löschung deiner bei uns gespeicherten Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </li>
                <li>
                  <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Unter bestimmten Voraussetzungen kannst du die Einschränkung der Verarbeitung verlangen.
                </li>
                <li>
                  <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Du hast das Recht, Daten, die wir auf Grundlage deiner Einwilligung oder in Erfüllung eines Vertrags verarbeiten, in einem strukturierten, gängigen Format zu erhalten.
                </li>
                <li>
                  <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sofern deine Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeitet werden, hast du das Recht, aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch einzulegen.
                </li>
                <li>
                  <strong>Widerruf deiner Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Eine einmal erteilte Einwilligung kannst du jederzeit formlos mit Wirkung für die Zukunft widerrufen.
                </li>
              </ul>
            </div>

            {/* 11. Beschwerderecht bei der Aufsichtsbehörde */}
            <div className="bg-[#FAF6F1] border border-[#E8D6C5] p-6 rounded-[1px] space-y-2">
              <h2 className="font-editorial text-xl text-[#392D29]">
                11. Beschwerderecht bei der zuständigen Aufsichtsbehörde
              </h2>
              <p className="text-xs text-[#756A63] leading-relaxed">
                Im Falle datenschutzrechtlicher Verstöße steht der betroffenen Person ein Beschwerderecht bei einer zuständigen Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO). Die für unser Studio in Nordrhein-Westfalen örtlich zuständige Aufsichtsbehörde ist:
              </p>
              <div className="text-xs text-[#392D29] font-medium pt-1">
                Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)
                <br />
                Kavalleriestraße 2–4, 40213 Düsseldorf
                <br />
                Telefon: 0211 / 38424-0 &bull; E-Mail: poststelle@ldi.nrw.de
                <br />
                Website:{" "}
                <a
                  href="https://www.ldi.nrw.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A26D57] hover:underline"
                >
                  https://www.ldi.nrw.de
                </a>
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
