import React from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SignatureTreatmentsSection from "@/components/sections/SignatureTreatmentsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import SelectedPricingSection from "@/components/sections/SelectedPricingSection";
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
  getFeaturedServices,
  getPricing,
  getGalleryItems,
  getOpeningHours,
  getBusinessSettings,
  getDesignSettings,
  getContentSections,
} from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const [
    categories,
    featuredServices,
    pricing,
    gallery,
    openingHours,
    business,
    designSettings,
    contentSections,
  ] = await Promise.all([
    getCategories(),
    getFeaturedServices(),
    getPricing(),
    getGalleryItems(),
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

        {/* 02 — Signature Treatments (concrete, with real images) */}
        <SignatureTreatmentsSection services={featuredServices} />

        {/* 03 — Categories */}
        <CategoriesSection categories={categories} />

        {/* 04 — Case Studies (real results) */}
        <CaseStudySpotlight />

        {/* 05 — Gallery Preview */}
        <GalleryPreviewSection items={gallery} />

        {/* 06 — Selected Pricing */}
        <SelectedPricingSection pricing={pricing} />

        {/* 07 — Testimonials */}
        <TestimonialsSection />

        {/* 08 — About Mürvet */}
        <AboutMurvetSection content={contentSections.about_murvet} />

        {/* 09 — FAQ */}
        <FaqSection whatsapp={business.whatsapp || business.phone} />

        {/* 10 — Contact & Visit */}
        <ContactVisitSection business={business} openingHours={openingHours} />

        {/* 11 — Final CTA */}
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
