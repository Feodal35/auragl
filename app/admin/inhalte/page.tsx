import React from "react";
import { getContentSections } from "@/lib/db";
import ContentManagerClient from "./ContentManagerClient";

export const revalidate = 0;

export default async function AdminContentPage() {
  const sections = await getContentSections();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          CMS &amp; Redaktion
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Texte &amp; Inhalte verwalten
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Passe alle Überschriften, Teaser, Buttons und Beschreibungen der Website ohne Code an.
        </p>
      </div>

      <ContentManagerClient initialSections={sections} />
    </div>
  );
}
