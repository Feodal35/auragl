"use client";

import React from "react";
import Link from "next/link";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock3,
  ArrowUpRight,
  ShieldCheck,
  Cookie,
} from "lucide-react";
import { BusinessSettings, OpeningHour } from "@/lib/types";
import { openConsentSettings } from "@/lib/consent";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/public/LanguageSwitcher";

interface FooterProps {
  business: BusinessSettings;
  openingHours: OpeningHour[];
}

export default function Footer({ business, openingHours }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleOpenCookieSettings = () => {
    openConsentSettings();
  };

  const getDayName = (dayName: string) => {
    const lower = dayName.toLowerCase();
    if (lower.includes("montag") || lower.includes("mon")) return t.days.monday;
    if (lower.includes("dienstag") || lower.includes("tue")) return t.days.tuesday;
    if (lower.includes("mittwoch") || lower.includes("wed")) return t.days.wednesday;
    if (lower.includes("donnerstag") || lower.includes("thu")) return t.days.thursday;
    if (lower.includes("freitag") || lower.includes("fri")) return t.days.friday;
    if (lower.includes("samstag") || lower.includes("sat")) return t.days.saturday;
    if (lower.includes("sonntag") || lower.includes("sun")) return t.days.sunday;
    return dayName;
  };

  return (
    <footer className="bg-[#211A18] text-[#EFE6DD] pt-20 pb-20 lg:pb-12 border-t border-[#392D29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <AuraGlowLogo size="md" color="#FFFFFF" textColor="#FAF6F1" />
            <p className="text-sm text-[#EFE6DD]/75 leading-relaxed font-light">
              {t.footer.brandDescription}
            </p>
            {business.instagram_url && (
              <a
                href={business.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#D9A891] hover:text-white transition-colors"
                aria-label={t.footer.followInstagram}
              >
                <Instagram className="w-4 h-4" />
                <span>{t.footer.followInstagram}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Column 2: Navigation & Behandlungen */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#D9A891] font-medium">
              {t.footer.colTreatments}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/leistungen" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.treatmentsFacials}
                </Link>
              </li>
              <li>
                <Link href="/preise" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.pricingConditions}
                </Link>
              </li>
              <li>
                <Link href="/#fallstudien" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.caseStudiesResults}
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.galleryBeforeAfter}
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.aboutPhilosophy}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link href="/termin" className="text-[#EFE6DD]/80 hover:text-white transition-colors">
                  {t.footer.bookOnline}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Öffnungszeiten & Preisangabenverordnung */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#D9A891] font-medium flex items-center gap-2">
              <Clock3 className="w-3.5 h-3.5" />
              <span>{t.footer.colHours}</span>
            </h3>
            <div className="space-y-2 text-xs text-[#EFE6DD]/80">
              {openingHours.map((h) => (
                <div key={h.id} className="flex justify-between py-1 border-b border-white/5">
                  <span className="font-light">{getDayName(h.day_name)}</span>
                  <span className="font-medium text-[#EFE6DD]">
                    {h.is_closed ? (
                      h.custom_label || t.days.closed
                    ) : (
                      `${h.open_time} – ${h.close_time} ${t.days.oclock}`
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#EFE6DD]/90 italic pt-1">
              {t.footer.byAppointmentOnly}
            </p>
            <p className="text-xs text-[#EFE6DD]/85 pt-2 border-t border-white/10">
              {t.footer.vatNotice}
            </p>
          </div>

          {/* Column 4: Kontakt & Studio Standort */}
          <div className="space-y-4" itemScope itemType="https://schema.org/BeautySalon">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#D9A891] font-medium">
              {t.footer.colContact}
            </h3>
            <ul className="space-y-3 text-sm text-[#EFE6DD]/80">
              {business.street && (
                <li
                  className="flex items-start gap-3"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-4 h-4 text-[#D9A891] shrink-0 mt-0.5" />
                  <span>
                    <span itemProp="streetAddress">{business.street}</span>
                    <br />
                    <span itemProp="postalCode">{business.postal_code}</span>{" "}
                    <span itemProp="addressLocality">{business.city}</span>
                  </span>
                </li>
              )}
              {business.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D9A891] shrink-0" />
                  <a
                    href={`tel:${business.phone.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors"
                    itemProp="telephone"
                  >
                    {business.phone_display || business.phone}
                  </a>
                </li>
              )}
              {business.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D9A891] shrink-0" />
                  <a
                    href={`mailto:${business.email}`}
                    className="hover:text-white transition-colors"
                    itemProp="email"
                  >
                    {business.email}
                  </a>
                </li>
              )}
            </ul>

            <div className="pt-2">
              <Link
                href="/termin"
                className="inline-flex items-center justify-center min-h-[44px] text-xs uppercase tracking-[0.14em] font-medium px-5 py-2.5 bg-[#A26D57] text-white hover:bg-[#8E5A45] active:scale-[0.98] transition-all rounded-sm shadow-luxury-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A891]"
              >
                {t.footer.bookAppointmentBtn}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Language Switcher, Acumen Dijital & Complete German Legal Links */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-[#EFE6DD]/90 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              &copy; {currentYear} {business.business_name}. {t.footer.copyright}
            </span>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">&bull;</span>
            <span className="text-[#EFE6DD]/90">
              Webdesign &amp; Entwicklung:{" "}
              <a
                href="https://acumendijital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D9A891] hover:text-white underline font-medium transition-colors"
                title="Acumen Dijital - Digitalagentur für Webdesign & Performance"
              >
                Acumen Dijital
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/impressum"
              className="hover:text-[#D9A891] transition-colors min-h-[40px] inline-flex items-center text-[#EFE6DD]/90"
            >
              {t.footer.impressum}
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link
              href="/datenschutz"
              className="hover:text-[#D9A891] transition-colors min-h-[40px] inline-flex items-center text-[#EFE6DD]/90"
            >
              {t.footer.privacy}
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link
              href="/agb"
              className="hover:text-[#D9A891] transition-colors min-h-[40px] inline-flex items-center text-[#EFE6DD]/90"
            >
              {t.footer.agb}
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link
              href="/widerruf"
              className="hover:text-[#D9A891] transition-colors min-h-[40px] inline-flex items-center text-[#EFE6DD]/90"
            >
              {t.footer.revocation}
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="hover:text-[#D9A891] transition-colors min-h-[40px] inline-flex items-center gap-1 text-[#EFE6DD]/90 hover:underline cursor-pointer"
            >
              <Cookie className="w-3 h-3 text-[#D9A891]" />
              <span>{t.footer.cookieSettings}</span>
            </button>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
