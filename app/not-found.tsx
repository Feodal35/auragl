import React from "react";
import Link from "next/link";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { ArrowLeft, CalendarDays, Sparkles, ChevronRight } from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { href: "/leistungen", label: "Behandlungen & Facials" },
    { href: "/preise", label: "Preise & Konditionen" },
    { href: "/galerie", label: "Vorher & Nachher Galerie" },
    { href: "/ueber-uns", label: "Über Mürvet & Studio" },
    { href: "/kontakt", label: "Kontakt & Anfahrt" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <Link href="/" aria-label="Zur Startseite" className="inline-block">
          <AuraGlowLogo size="lg" />
        </Link>

        <div className="pt-4">
          <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium block mb-2">
            Fehler 404 &bull; Seite nicht gefunden
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29] font-light">
            Hier scheint etwas nicht zu stimmen.
          </h1>
          <p className="text-sm text-[#756A63] font-light mt-3 leading-relaxed">
            Die von dir aufgerufene Seite existiert leider nicht oder wurde an eine andere Stelle verschoben.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 text-xs min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zur Startseite</span>
          </Link>
          <Link
            href="/termin"
            className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 text-xs min-h-[44px]"
          >
            <CalendarDays className="w-4 h-4 text-[#A26D57]" />
            <span>Termin anfragen</span>
          </Link>
        </div>

        {/* Helpful Internal Links (Item 3) */}
        <div className="pt-8 border-t border-[#E8D6C5]/70 text-left">
          <span className="text-[11px] uppercase tracking-widest text-[#A26D57] font-medium block mb-3 text-center sm:text-left">
            Beliebte Bereiche unserer Website:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#392D29] hover:text-[#A26D57] bg-white border border-[#E8D6C5] px-3.5 py-2.5 rounded-sm flex items-center justify-between transition-colors shadow-luxury-xs"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#B88770]/60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
