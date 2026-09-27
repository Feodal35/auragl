"use client";

import React from "react";
import Link from "next/link";
import { Phone, CalendarDays, MessageCircle } from "lucide-react";
import { trackContactChannelClick, trackCtaClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface StickyMobileCtaProps {
  phone?: string;
  whatsapp?: string;
}

export default function StickyMobileCta({
  phone = "+49 176 1234 5678",
  whatsapp = "+49 176 1234 5678",
}: StickyMobileCtaProps) {
  const { t } = useLanguage();
  const cleanPhone = phone.replace(/\s+/g, "");
  const cleanWhatsapp = whatsapp.replace(/\D/g, "");

  return (
    <aside
      aria-label="Schnellkontakt Aktionen"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#F7F3EE]/95 backdrop-blur-md border-t border-[#E8D6C5] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call button */}
        <a
          href={`tel:${cleanPhone}`}
          onClick={() => trackContactChannelClick("phone", cleanPhone)}
          className="min-h-[44px] flex flex-col items-center justify-center py-1.5 px-2 rounded-sm bg-white border border-[#E8D6C5] text-[#392D29] hover:bg-[#FAF6F1] active:scale-[0.98] transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
          aria-label="Studio telefonisch anrufen"
        >
          <Phone className="w-4 h-4 text-[#A26D57] mb-0.5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider font-medium">{t.stickyMobile.call}</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${cleanWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactChannelClick("whatsapp", cleanWhatsapp)}
          className="min-h-[44px] flex flex-col items-center justify-center py-1.5 px-2 rounded-sm bg-white border border-[#E8D6C5] text-[#392D29] hover:bg-[#FAF6F1] active:scale-[0.98] transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
          aria-label="Nachricht über WhatsApp schreiben"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] mb-0.5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider font-medium">{t.stickyMobile.whatsapp}</span>
        </a>

        {/* Book appointment button */}
        <Link
          href="/termin"
          onClick={() => trackCtaClick("Sticky Mobile Termin", "/termin")}
          className="min-h-[44px] flex flex-col items-center justify-center py-1.5 px-2 rounded-sm bg-[#A26D57] text-white hover:bg-[#8B5742] active:scale-[0.98] transition-all text-center shadow-luxury-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
          aria-label="Termin online anfragen"
        >
          <CalendarDays className="w-4 h-4 mb-0.5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">{t.stickyMobile.book}</span>
        </Link>
      </div>
    </aside>
  );
}
