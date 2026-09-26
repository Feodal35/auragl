import React from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import SignatureTreatmentsSection from "@/components/sections/SignatureTreatmentsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import SelectedPricingSection from "@/components/sections/SelectedPricingSection";
import AboutMurvetSection from "@/components/sections/AboutMurvetSection";
import AppointmentExperienceSection from "@/components/sections/AppointmentExperienceSection";
import ContactVisitSection from "@/components/sections/ContactVisitSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
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

export const revalidate = 60; // ISR cache revalidation

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
        {/* 01 — Hero */}
        <HeroSection
          content={contentSections.hero}
          design={designSettings.hero}
        />

        {/* 02 — Introduction */}
        <IntroSection content={contentSections.intro} />

        {/* 03 — Signature Treatments */}
        <SignatureTreatmentsSection services={featuredServices} />

        {/* 04 — Philosophy */}
        <PhilosophySection
          content={contentSections.philosophy}
          design={designSettings.philosophy}
        />

        {/* 05 — Categories */}
        <CategoriesSection categories={categories} />

        {/* 06 — Gallery Preview */}
        <GalleryPreviewSection items={gallery} />

        {/* 07 — Selected Pricing */}
        <SelectedPricingSection pricing={pricing} />

        {/* 08 — About Mürvet */}
        <AboutMurvetSection content={contentSections.about_murvet} />

        {/* 09 — Appointment Experience */}
        <AppointmentExperienceSection />

        {/* 10 — Contact & Visit */}
        <ContactVisitSection business={business} openingHours={openingHours} />

        {/* 11 — Final CTA */}
        <FinalCtaSection
          content={contentSections.appointment_cta}
          design={designSettings.appointment_cta}
        />
      </main>

      <Footer business={business} openingHours={openingHours} />
    </div>
  );
}
