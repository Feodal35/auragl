import React from "react";
import { getDesignSettings } from "@/lib/db";
import DesignManagerClient from "./DesignManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDesignPage() {
  const design = await getDesignSettings();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Erscheinungsbild
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Design &amp; Hintergründe
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Passe Hintergrundbilder, Abdunkelungs-Overlays und Farben für jeden Hauptabschnitt an.
        </p>
      </div>

      <DesignManagerClient initialDesign={design} />
    </div>
  );
}
