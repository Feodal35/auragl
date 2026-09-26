import React from "react";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import SettingsManagerClient from "./SettingsManagerClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const [business, hours] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Konfiguration
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Unternehmens- &amp; Studioeinstellungen
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Passe Kontaktdaten, Adresse, Social Media Links und die regulären Öffnungszeiten an.
        </p>
      </div>

      <SettingsManagerClient initialBusiness={business} initialHours={hours} />
    </div>
  );
}
