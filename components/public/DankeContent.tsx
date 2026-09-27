"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, CalendarDays, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DankeContentProps {
  isAppointment: boolean;
  businessPhone?: string;
  businessWhatsapp?: string;
}

export default function DankeContent({
  isAppointment,
  businessPhone,
  businessWhatsapp,
}: DankeContentProps) {
  const { t } = useLanguage();

  const cleanPhone = businessPhone?.replace(/\s+/g, "");
  const cleanWhatsapp = (businessWhatsapp || businessPhone)?.replace(/\D/g, "");

  return (
    <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-md p-8 sm:p-14 text-center">
      {/* Animated Check Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF6F1] border-2 border-[#B88770]/40 text-[#A26D57] flex items-center justify-center mx-auto mb-6 shadow-luxury-sm">
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
      </div>

      <div className="inline-flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#B88770]" />
        <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
          {t.thankYou.eyebrow}
        </span>
        <Sparkles className="w-4 h-4 text-[#B88770]" />
      </div>

      <h1 className="font-editorial text-3xl sm:text-5xl text-[#392D29] font-light mb-4">
        {isAppointment ? t.thankYou.titleTermin : t.thankYou.titleContact}
      </h1>

      <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed mb-10">
        {isAppointment ? t.thankYou.descTermin : t.thankYou.descContact}
      </p>

      {/* Next Steps Roadmap */}
      <div className="text-left bg-[#FAF6F1] border border-[#E8D6C5]/70 rounded-[1px] p-6 sm:p-8 mb-10">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium mb-6 text-center sm:text-left">
          {t.thankYou.nextStepsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
              <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                1
              </span>
              <span>{t.thankYou.step1Title}</span>
            </div>
            <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
              {t.thankYou.step1Desc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
              <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                2
              </span>
              <span>{t.thankYou.step2Title}</span>
            </div>
            <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
              {t.thankYou.step2Desc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#392D29]">
              <span className="w-6 h-6 rounded-full bg-[#A26D57] text-white flex items-center justify-center text-[11px] shrink-0">
                3
              </span>
              <span>{t.thankYou.step3Title}</span>
            </div>
            <p className="text-xs text-[#756A63] font-light leading-relaxed pl-8">
              {t.thankYou.step3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 text-xs min-h-[46px]"
        >
          <span>{t.thankYou.backHome}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/leistungen"
          className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 text-xs min-h-[46px]"
        >
          <CalendarDays className="w-4 h-4 text-[#A26D57]" />
          <span>{t.hero.ctaSecondary}</span>
        </Link>
      </div>

      {/* Immediate Direct Contact Channels */}
      {(cleanPhone || cleanWhatsapp) && (
        <div className="mt-8 pt-8 border-t border-[#E8D6C5]/50 flex flex-wrap items-center justify-center gap-4 text-xs text-[#756A63]">
          <span className="font-light">{t.thankYou.urgencyNotice}</span>
          {cleanWhatsapp && (
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.thankYou.whatsappDirect}</span>
            </a>
          )}
          {cleanPhone && (
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 text-[#A26D57] hover:underline font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{t.thankYou.callDirect}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
