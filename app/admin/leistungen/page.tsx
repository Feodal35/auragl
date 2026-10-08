import React from "react";
import { getAllServices, getAllCategories } from "@/lib/db";
import ServicesManagerClient from "./ServicesManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminServicesPage() {
  const [services, categories] = await Promise.all([
    getAllServices(),
    getAllCategories(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Katalog
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Behandlungen ({services.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Verwalte alle Behandlungen, Beschreibungen, Preise, Dauer und Bilder.
        </p>
      </div>

      <ServicesManagerClient initialServices={services} categories={categories} />
    </div>
  );
}
