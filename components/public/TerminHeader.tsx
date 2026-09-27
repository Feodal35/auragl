"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TerminHeader() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="w-8 h-[1px] bg-[#B88770]" />
        <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
          {t.appointment.eyebrow}
        </span>
        <span className="w-8 h-[1px] bg-[#B88770]" />
      </div>
      <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
        {t.appointment.title}
      </h1>
      <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
        {t.appointment.subtitle}
      </p>
    </div>
  );
}
