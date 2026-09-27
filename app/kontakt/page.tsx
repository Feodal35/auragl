import React from "react";
import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import ContactForm from "@/components/public/ContactForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getBusinessSettings, getOpeningHours } from "@/lib/db";
import { MapPin, Phone, Mail, Clock3, MessageCircle, ArrowUpRight, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt, Anfahrt & Öffnungszeiten | Königsallee Düsseldorf",
  description:
    "Kontaktiere Aura Glow by Mürvet auf der Königsallee in Düsseldorf. Telefon, WhatsApp, Öffnungszeiten, Google Maps Routenplaner und Online-Anfrage.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const [business, openingHours] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EE]">
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={[{ label: "Kontakt & Anfahrt" }]} />
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
              Persönlich für dich da
            </span>
            <span className="w-8 h-[1px] bg-[#B88770]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#392D29] mb-4">
            Kontakt &amp; Standort
          </h1>
          <p className="text-base sm:text-lg text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
            Hast du Fragen zu unseren Behandlungen oder möchtest du dich vorab beraten lassen?
            Schreib uns gerne eine Nachricht.
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
                  Aura Glow Studio
                </h2>

                <div className="space-y-5 text-sm text-[#756A63]">
                  {business.street && (
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#392D29] block">Adresse:</strong>
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
                            <span>In Google Maps öffnen</span>
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
                        <strong className="text-[#392D29] block">Telefon:</strong>
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
                        <strong className="text-[#392D29] block">WhatsApp:</strong>
                        <a
                          href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline"
                        >
                          Direkt per WhatsApp schreiben &rarr;
                        </a>
                      </div>
                    </div>
                  )}

                  {business.email && (
                    <div className="flex items-start gap-3.5">
                      <Mail className="w-5 h-5 text-[#B88770] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#392D29] block">E-Mail:</strong>
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
                        <strong className="text-[#392D29] block">Instagram:</strong>
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
                    Öffnungszeiten
                  </h3>
                </div>

                <div className="divide-y divide-[#E8D6C5]/40 text-xs">
                  {openingHours.map((h) => (
                    <div key={h.id} className="py-2 flex justify-between">
                      <span className="text-[#392D29]">{h.day_name}</span>
                      <span className="font-medium text-[#756A63]">
                        {h.is_closed ? (
                          <span className="text-[#B88770]">
                            {h.custom_label || "Geschlossen"}
                          </span>
                        ) : (
                          `${h.open_time} – ${h.close_time} Uhr`
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
                  Nachricht schreiben
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
                  Kontaktiere uns
                </h2>
                <p className="text-xs sm:text-sm text-[#756A63] font-light mt-2 leading-relaxed">
                  Fülle das untenstehende Formular aus. Wir melden uns zeitnah bei dir.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

          {/* Google Maps Embed & Address Card (Item 14) */}
          <div className="mt-14 bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 shadow-luxury-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A26D57] font-medium block mb-1">
                  Standort &amp; Route
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#392D29]">
                  Aura Glow auf der Königsallee Düsseldorf
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
                <span>Route in Google Maps planen</span>
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
      </main>

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
