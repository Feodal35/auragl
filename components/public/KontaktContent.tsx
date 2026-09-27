"use client";

import React from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/public/ContactForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BusinessSettings, OpeningHour } from "@/lib/types";
import { MapPin, Phone, Mail, Clock3, MessageCircle, ArrowUpRight, Instagram } from "lucide-react";

interface KontaktContentProps {
  business: BusinessSettings;
  openingHours: OpeningHour[];
}

export default function KontaktContent({ business, openingHours }: KontaktContentProps) {
  const { t, locale } = useLanguage();

  const getDayName = (dayName: string) => {
    const key = dayName.toLowerCase();
    if (key.includes("montag") || key.includes("monday")) return t.days.monday;
    if (key.includes("dienstag") || key.includes("tuesday")) return t.days.tuesday;
    if (key.includes("mittwoch") || key.includes("wednesday")) return t.days.wednesday;
    if (key.includes("donnerstag") || key.includes("thursday")) return t.days.thursday;
    if (key.includes("freitag") || key.includes("friday")) return t.days.friday;
    if (key.includes("samstag") || key.includes("saturday")) return t.days.saturday;
    if (key.includes("sonntag") || key.includes("sunday")) return t.days.sunday;
    return dayName;
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumbs items={[{ label: t.contactPage.title }]} />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#B88770]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
            {t.contactPage.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#B88770]" />
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
          {t.contactPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
          {t.contactPage.subtitle}
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Cards & Opening Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Studio Info Card */}
            <div className="bg-white p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-6">
              <h2 className="font-editorial text-2xl text-[#392D29] pb-4 border-b border-[#E8D6C5]/60">
                {t.contactPage.studioTitle}
              </h2>

              <div className="space-y-5 text-sm text-[#756A63]">
                {business.street && (
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#392D29] block">{t.contactPage.addressLabel}</strong>
                      <span>
                        {business.street}
                        <br />
                        {business.postal_code} {business.city}
                      </span>
                      {business.google_maps_url && (
                        <a
                          href={business.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#B88770] hover:text-[#936650] mt-1.5 font-medium"
                        >
                          <span>{t.contactPage.openInMaps}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {business.phone && (
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#392D29] block">{t.contactPage.phoneLabel}</strong>
                      <a
                        href={`tel:${business.phone.replace(/\s+/g, "")}`}
                        className="hover:text-[#B88770] transition-colors"
                      >
                        {business.phone_display || business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {business.whatsapp && (
                  <div className="flex items-start gap-3.5">
                    <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#392D29] block">{t.contactPage.whatsappLabel}</strong>
                      <a
                        href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        {t.contactPage.whatsappChat}
                      </a>
                    </div>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#392D29] block">{t.contactPage.emailLabel}</strong>
                      <a
                        href={`mailto:${business.email}`}
                        className="hover:text-[#B88770] transition-colors"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {business.instagram_url && (
                  <div className="flex items-start gap-3.5">
                    <Instagram className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#392D29] block">{t.contactPage.instagramLabel}</strong>
                      <a
                        href={business.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#B88770] transition-colors"
                      >
                        @auraglow_bymurvet
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white p-8 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8D6C5]/60">
                <Clock3 className="w-4 h-4 text-[#B88770]" />
                <h3 className="font-editorial text-xl text-[#392D29]">
                  {t.contactPage.openingHoursTitle}
                </h3>
              </div>

              <div className="divide-y divide-[#E8D6C5]/40 text-xs">
                {openingHours.map((h) => (
                  <div key={h.id} className="py-2 flex justify-between">
                    <span className="text-[#392D29]">{getDayName(h.day_name)}</span>
                    <span className="font-medium text-[#756A63]">
                      {h.is_closed ? (
                        <span className="text-[#B88770]">
                          {h.custom_label || t.contactPage.closed}
                        </span>
                      ) : (
                        `${h.open_time} – ${h.close_time} ${t.contactPage.oclock}`
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-2">
                {t.contactPage.formEyebrow}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
                {t.contactPage.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#756A63] font-light mt-2 leading-relaxed">
                {t.contactPage.formSubtitle}
              </p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Google Maps Embed & Address Card */}
        <div className="mt-14 bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 shadow-luxury-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-1">
                {t.contactPage.mapEyebrow}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#392D29]">
                {t.contactPage.mapTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
                {business.street} &bull; {business.postal_code} {business.city}
              </p>
            </div>
            <a
              href={business.google_maps_url || "https://maps.google.com/?q=K%C3%B6nigsallee+42+40212+D%C3%BCsseldorf"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>{t.contactPage.planRoute}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[320px] sm:h-[420px] rounded-[1px] overflow-hidden border border-[#E8D6C5]">
            <iframe
              title="Aura Glow by Mürvet Google Maps Standort"
              src="https://maps.google.com/maps?q=K%C3%B6nigsallee%2042,%2040212%20D%C3%BCsseldorf,%20Germany&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
