import React from "react";
import { getAllTestimonials } from "@/lib/db";
import BewertungenManagerClient from "./BewertungenManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminBewertungenPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#844C36] font-medium block mb-1">
          Social Proof &amp; Vertrauen
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Kundenstimmen &amp; Bewertungen ({testimonials.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Verwalte alle echten Erfahrungen und Kundenbewertungen auf der Startseite mit 100% Echtzeit-Synchronisation.
        </p>
      </div>

      <BewertungenManagerClient initialTestimonials={testimonials} />
    </div>
  );
}
