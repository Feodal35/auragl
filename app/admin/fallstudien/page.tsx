import React from "react";
import { getAllCaseStudies } from "@/lib/db";
import FallstudienManagerClient from "./FallstudienManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminFallstudienPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#844C36] font-medium block mb-1">
          Vorher &amp; Nachher
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Fallstudien &amp; Vorher/Nachher ({caseStudies.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Verwalte die Vorher &amp; Nachher Fallstudien und deren Bilder auf der Startseite mit 100% Echtzeit-Aktualisierung.
        </p>
      </div>

      <FallstudienManagerClient initialCaseStudies={caseStudies} />
    </div>
  );
}
