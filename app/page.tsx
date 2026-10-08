import React from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import AboutMurvetSection from "@/components/sections/AboutMurvetSection";
import ContactVisitSection from "@/components/sections/ContactVisitSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import CaseStudySpotlight from "@/components/sections/CaseStudySpotlight";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import StickyMobileCta from "@/components/public/StickyMobileCta";
import JsonLdSchema from "@/components/public/JsonLdSchema";

import {
  getCategories,
  getOpeningHours,
  getBusinessSettings,
  getDesignSettings,
  getContentSections,
} from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [
    categories,
    openingHours,
    business,
    designSettings,
    contentSections,
  ] = await Promise.all([
    getCategories(),
    getOpeningHours(),
    getBusinessSettings(),
    getDesignSettings(),
    getContentSections(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLdSchema business={business} openingHours={openingHours} />
      <Header businessPhone={business.phone_display || business.phone} />

      <main id="main-content" className="flex-grow">
        {/* 01 — Hero: service chips + concrete headline + real studio photo */}
        <HeroSection
          content={contentSections.hero}
          design={designSettings.hero}
        />

        {/* 02 — Categories (Vielfalt & Expertise / Unsere Behandlungswelten) */}
        <CategoriesSection categories={categories} />

        {/* 03 — Case Studies (real results) */}
        <CaseStudySpotlight />

        {/* 04 — Testimonials */}
        <TestimonialsSection />

        {/* 07 — About Mürvet */}
        <AboutMurvetSection content={contentSections.about_murvet} />

        {/* 08 — FAQ */}
        <FaqSection whatsapp={business.whatsapp || business.phone} />

        {/* 09 — Contact & Visit */}
        <ContactVisitSection business={business} openingHours={openingHours} />

        {/* 10 — Final CTA */}
        <FinalCtaSection
          content={contentSections.appointment_cta}
          design={designSettings.appointment_cta}
        />
      </main>

      <StickyMobileCta
        phone={business.phone_display || business.phone}
        whatsapp={business.whatsapp || business.phone}
      />

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
