import React from "react";
import { getAllGalleryItems } from "@/lib/db";
import GalleryManagerClient from "./GalleryManagerClient";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Portfolio
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Galerie &amp; Impressionen ({items.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Verwalte Bilder und Behandlungsresultate, die öffentlich im Portfolio präsentiert werden.
        </p>
      </div>

      <GalleryManagerClient initialItems={items} />
    </div>
  );
}
