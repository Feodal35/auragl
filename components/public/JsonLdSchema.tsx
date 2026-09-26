import React from "react";
import { BusinessSettings, OpeningHour } from "@/lib/types";

interface Props {
  business: BusinessSettings;
  openingHours: OpeningHour[];
}

export default function JsonLdSchema({ business, openingHours }: Props) {
  const dayMap: Record<number, string> = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: business.business_name,
    description:
      "Exklusives Beauty & Aesthetics Studio für Wimpernverlängerung, Permanent Make-up, Hollywood Glow Facials und Schulungen.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://auraglow.de",
    telephone: business.phone,
    email: business.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      postalCode: business.postal_code,
      addressCountry: "DE",
    },
    openingHoursSpecification: openingHours
      .filter((h) => !h.is_closed && h.open_time && h.close_time)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[h.day_of_week] || "Monday",
        opens: h.open_time,
        closes: h.close_time,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
