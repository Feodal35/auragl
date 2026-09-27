import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import { getBusinessSettings, getOpeningHours, getContentSections } from "@/lib/db";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { ShieldCheck, Sparkles, HeartHandshake, CalendarDays, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Über Mürvet | Studio-Philosophie & Expertise Düsseldorf",
  description:
    "Erfahre mehr über Mürvet und die Philosophie von Aura Glow in Düsseldorf: Meisterhafte Präzision, natürliche Ästhetik und kompromisslose Hygiene.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [business, openingHours, contentSections] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
    getContentSections(),
  ]);

  const aboutContent = contentSections.about_murvet;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={[{ label: "Über uns" }]} />
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
              Aura Glow Philosophie
            </span>
            <span className="w-8 h-[1px] bg-[#B88770]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-6">
            Schönheit als Ausdruck deiner Persönlichkeit.
          </h1>
          <p className="text-base sm:text-lg text-[#756A63] font-light max-w-2xl mx-auto leading-relaxed">
            In einer schnelllebigen Welt schaffen wir einen Ort der Ruhe, an dem deine natürliche
            Ausstrahlung im Mittelpunkt steht.
          </p>
        </div>

        {/* Story & Portrait Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Portrait Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1px] shadow-luxury-md bg-[#E8D6C5]">
                <img
                  src="/images/treatments/murvet-at-work.jpg"
                  alt="Mürvet — Gründerin von Aura Glow bei der Behandlung im Düsseldorfer Studio"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#B88770]/40 -z-10 hidden sm:block" />
            </div>

            {/* Story Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium">
                Die Gründerin
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29] font-normal leading-tight">
                {aboutContent?.headline || "Leidenschaft für feine Ästhetik und perfekte Linien."}
              </h2>

              <div className="space-y-4 text-base text-[#756A63] font-light leading-relaxed">
                <p>
                  {aboutContent?.body_text ||
                    "Mit geschultem Blick für Symmetrie und natürlicher Harmonie widmet sich Mürvet der individuellen Schönheit jeder Kundin. Jede Behandlung wird mit Geduld, meisterhafter Präzision und höchsten Hygienestandards ausgeführt."}
                </p>
                <p>
                  Bei Aura Glow by Mürvet steht nicht der künstliche Trend im Vordergrund,
                  sondern das feinfühlige Hervorheben deiner Vorzüge. Ob ein zarter
                  Mascara-Look durch die 1:1 Wimpernmethode oder ein sanfter Puderverlauf
                  bei den Augenbrauen: Das Ziel ist immer ein frisches, harmonisches Gesamtbild,
                  mit dem du dich jeden Tag selbstsicher fühlst.
                </p>
              </div>

              {/* Founder Signature */}
              <div className="pt-6 border-t border-[#E8D6C5]">
                <span className="font-script text-3xl sm:text-4xl text-[#A26D57] block">
                  Mürvet
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-[#756A63] mt-1 block">
                  Gründerin &amp; Master Stylistin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Values (3 Columns) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
              Unsere Leitwerte
            </h2>
            <p className="text-sm text-[#756A63] font-light mt-2">
              Drei unverrückbare Prinzipien leiten jede einzelne Behandlung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl text-[#392D29]">
                Kompromisslose Hygiene
              </h3>
              <p className="text-sm text-[#756A63] font-light leading-relaxed">
                Sterile Einwegmaterialien, kontinuierliche Desinfektion und höchste
                Sicherheitsstandards nach deutschen Hygienerichtlinien.
              </p>
            </div>

            <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl text-[#392D29]">
                Natürliche Harmonie
              </h3>
              <p className="text-sm text-[#756A63] font-light leading-relaxed">
                Keine standardisierten Schablonen. Jedes Wimpern- und Brauen-Styling
                wird individuell auf deine Gesichtsarchitektur abgestimmt.
              </p>
            </div>

            <div className="bg-white border border-[#E8D6C5] p-8 rounded-[1px] space-y-4 shadow-luxury-sm">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl text-[#392D29]">
                Ungestörte Auszeit
              </h3>
              <p className="text-sm text-[#756A63] font-light leading-relaxed">
                Keine Parallelbehandlungen oder Hektik. Deine Behandlungszeit gehört ganz
                dir und deiner Regeneration.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#211A18] text-white p-10 sm:p-14 rounded-[1px] space-y-5">
            <AuraGlowLogo size="sm" variant="monogram" color="#D9A891" />
            <h3 className="font-editorial text-3xl sm:text-4xl font-light">
              Möchtest du uns kennenlernen?
            </h3>
            <p className="text-sm text-[#EFE6DD]/80 font-light max-w-md mx-auto">
              Vereinbare deinen ersten Termin oder schreibe uns eine Nachricht.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/kontakt" className="btn-secondary-light text-xs w-full sm:w-auto inline-flex items-center justify-center">
                Kontakt aufnehmen
              </Link>
              <Link href="/termin" className="btn-primary text-xs w-full sm:w-auto inline-flex items-center justify-center">
                Termin online anfragen
              </Link>
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
