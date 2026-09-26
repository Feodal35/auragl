import React from "react";
import { getAllPricing, getCategories } from "@/lib/db";
import PricingManagerClient from "./PricingManagerClient";

export const revalidate = 0;

export default async function AdminPricingPage() {
  const [pricing, categories] = await Promise.all([
    getAllPricing(),
    getCategories(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Konditionen
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Preisliste &amp; Varianten ({pricing.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Zentrale Preisverwaltung für alle Behandlungen, Auffülltermine und Schulungen.
        </p>
      </div>

      <PricingManagerClient initialPricing={pricing} categories={categories} />
    </div>
  );
}
