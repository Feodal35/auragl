import React from "react";
import { getMediaItems } from "@/lib/db";
import MediaManagerClient from "./MediaManagerClient";

export const revalidate = 0;

export default async function AdminMediaPage() {
  const media = await getMediaItems();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Dateien
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Mediathek
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Lade Bilder für Behandlungen, Hintergründe und das Portfolio hoch und kopiere deren Links.
        </p>
      </div>

      <MediaManagerClient initialMedia={media} />
    </div>
  );
}
