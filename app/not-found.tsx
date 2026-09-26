import React from "react";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { ArrowLeft, CalendarDays } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <AuraGlowLogo size="lg" />

        <div className="pt-6">
          <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium block mb-2">
            Fehler 404
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#392D29] font-light">
            Seite nicht gefunden
          </h1>
          <p className="text-sm text-[#756A63] font-light mt-3 leading-relaxed">
            Die von dir aufgerufene Seite existiert leider nicht oder wurde verschoben.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zur Startseite</span>
          </a>
          <a
            href="/termin"
            className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 text-xs"
          >
            <CalendarDays className="w-4 h-4 text-[#B88770]" />
            <span>Termin anfragen</span>
          </a>
        </div>
      </div>
    </div>
  );
}
