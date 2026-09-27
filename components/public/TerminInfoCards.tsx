"use client";

import React from "react";
import { CalendarCheck, Clock3, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TerminInfoCards() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <h3 className="font-editorial text-xl text-[#392D29]">
          {t.appointment.infoConfirmTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
          {t.appointment.infoConfirmDesc}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
          <Clock3 className="w-5 h-5" />
        </div>
        <h3 className="font-editorial text-xl text-[#392D29]">
          {t.appointment.infoArrivalTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
          {t.appointment.infoArrivalDesc}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#A26D57]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="font-editorial text-xl text-[#392D29]">
          {t.appointment.infoPrivacyTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#756A63] font-light leading-relaxed">
          {t.appointment.infoPrivacyDesc}
        </p>
      </div>
    </div>
  );
}
