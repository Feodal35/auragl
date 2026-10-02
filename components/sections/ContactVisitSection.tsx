import React from "react";
import { MapPin, Phone, Mail, Clock3, MessageCircle, ArrowUpRight } from "lucide-react";
import { BusinessSettings, OpeningHour } from "@/lib/types";

interface ContactVisitProps {
  business: BusinessSettings;
  openingHours: OpeningHour[];
}

export default function ContactVisitSection({ business, openingHours }: ContactVisitProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#EFE6DD]/40 border-t border-[#E8D6C5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Information (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1px] bg-[#B88770]" />
                <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
                  Besuch &amp; Anfahrt
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29] leading-[1.15]">
                Wir freuen uns auf deinen Besuch im Studio.
              </h2>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#E8D6C5]">
              {(business.street || business.postal_code || business.city) && (
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#B88770] shrink-0 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-[#392D29]">
                      Adresse
                    </h3>
                    <p className="text-base text-[#4F443E] font-normal mt-1">
                      {business.street && (
                        <>
                          {business.street}
                          <br />
                        </>
                      )}
                      {business.postal_code} {business.city}
                    </p>
                    {business.google_maps_url && (
                      <a
                        href={business.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#844C36] hover:text-[#6C3D2B] mt-2 font-semibold tracking-wide"
                      >
                        <span>Route auf Google Maps öffnen</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {business.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#844C36] shrink-0 mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-[#392D29]">
                      Telefon &amp; WhatsApp
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1">
                      <a
                        href={`tel:${business.phone.replace(/\s+/g, "")}`}
                        className="text-base text-[#392D29] hover:text-[#844C36] font-medium transition-colors"
                      >
                        {business.phone_display || business.phone}
                      </a>
                      {business.whatsapp && (
                        <a
                          href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#08675b] hover:text-[#05443d] font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Chat</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {business.email && (
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#844C36] shrink-0 mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-[#392D29]">
                      E-Mail-Adresse
                    </h3>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-base text-[#392D29] hover:text-[#844C36] font-medium mt-1 block transition-colors"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Opening Hours Table & Note (6 cols) */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E8D6C5]">
              <Clock3 className="w-5 h-5 text-[#844C36]" />
              <h3 className="font-editorial text-2xl text-[#392D29]">
                Öffnungszeiten
              </h3>
            </div>

            <div className="divide-y divide-[#E8D6C5]/50 text-sm">
              {openingHours.map((h) => (
                <div key={h.id} className="py-2.5 flex justify-between items-center">
                  <span className="font-light text-[#392D29]">{h.day_name}</span>
                  <span className="font-medium text-[#392D29]">
                    {h.is_closed ? (
                      <span className="text-[#844C36] font-medium">
                        {h.custom_label || "Geschlossen"}
                      </span>
                    ) : (
                      `${h.open_time} – ${h.close_time} Uhr`
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 bg-[#FAF6F1] p-4 border border-[#E8D6C5]/60 text-xs text-[#4F443E] font-normal rounded-[1px]">
              <strong className="text-[#392D29] block mb-1">
                Wichtiger Hinweis zur Terminvereinbarung:
              </strong>
              Um jeder Kundin eine exklusive, ungestörte Atmosphäre zu garantieren,
              finden Behandlungen ausschließlich nach vorheriger Terminabsprache statt.
            </div>
          </div>
        </div>

        {/* Interactive Google Map Embed & Direction CTA (Item 14) */}
        <div className="mt-12 bg-white border border-[#E8D6C5] rounded-[1px] p-4 sm:p-6 shadow-luxury-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#A26D57] font-medium block">
                Zentrale Lage in {business.city || "Peine"}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#392D29]">
                {business.street ? `${business.street} • ` : ""}{business.postal_code || "31224"} {business.city || "Peine"}
              </h3>
            </div>
            <a
              href={business.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(`${business.street ? `${business.street} ` : ""}${business.postal_code || "31224"} ${business.city || "Peine"}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs inline-flex items-center justify-center gap-1.5 shrink-0"
              aria-label="Route in Google Maps App öffnen"
            >
              <span>Route in Google Maps öffnen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[280px] sm:h-[360px] rounded-[1px] overflow-hidden border border-[#E8D6C5]/70">
            <iframe
              title={`Aura Glow by Mürvet Google Maps Standort ${business.city || "Peine"}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${business.street ? `${business.street}, ` : ""}${business.postal_code || "31224"} ${business.city || "Peine"}, Germany`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
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
    </section>
  );
}
