import React from "react";
import { getAllSeoSettings } from "@/lib/db";
import SeoManagerClient from "./SeoManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSeoPage() {
  const seo = await getAllSeoSettings();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Auffindbarkeit
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Suchmaschinenoptimierung (SEO)
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Optimiere Titel, Meta-Beschreibungen und Suchanzeigen für Google und Social Media.
        </p>
      </div>

      <SeoManagerClient initialSeo={seo} />
    </div>
  );
}
