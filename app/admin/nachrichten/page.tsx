import React from "react";
import { getContactMessages } from "@/lib/db";
import MessageManagerClient from "./MessageManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await getContactMessages().catch((err) => {
    console.error("[AdminMessagesPage] getContactMessages failed:", err);
    return [];
  });
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Posteingang
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Kontaktnachrichten ({safeMessages.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Alle Mitteilungen und Anfragen, die über das Kontaktformular gesendet wurden.
        </p>
      </div>

      <MessageManagerClient initialMessages={safeMessages} />
    </div>
  );
}
