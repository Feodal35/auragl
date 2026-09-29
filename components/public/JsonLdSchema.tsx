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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auraglow.de";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": business.business_name || "Aura Glow by Mürvet",
        "description": "Exklusives Beauty & Aesthetics Studio in Düsseldorf für Wimpernverlängerung, Hollywood Glow Facials und Permanent Make-up.",
        "inLanguage": ["de-DE", "en-US"],
        "creator": {
          "@type": "Organization",
          "@id": "https://acumendijital.com/#organization",
          "name": "Acumen Dijital",
          "url": "https://acumendijital.com/",
          "description": "Digitale Agentur für Webdesign, Next.js Entwicklung und Performance-Marketing",
          "sameAs": ["https://acumendijital.com/"]
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://acumendijital.com/#organization",
          "name": "Acumen Dijital",
          "url": "https://acumendijital.com/"
        }
      },
      {
        "@type": "BeautySalon",
        "@id": `${baseUrl}/#beautysalon`,
        name: business.business_name,
        alternateName: "Aura Glow Düsseldorf",
    description:
      "Exklusives Beauty & Aesthetics Studio für Wimpernverlängerung, Hollywood Glow Facials, Powder Brows Permanent Make-up und Schulungen auf der Königsallee in Düsseldorf.",
    url: baseUrl,
    telephone: business.phone,
    email: business.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Barzahlung, EC-Karte, Kreditkarte",
    image: [
      `${baseUrl}/images/treatments/microneedling-facial.jpg`,
      `${baseUrl}/images/treatments/murvet-treatment-full.jpg`,
      `${baseUrl}/images/treatments/lash-lift-result.jpg`,
    ],
    hasMap:
      business.google_maps_url ||
      "https://maps.google.com/?q=K%C3%B6nigsallee+42+40212+D%C3%BCsseldorf",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      postalCode: business.postal_code,
      addressCountry: "DE",
      addressRegion: "Nordrhein-Westfalen",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.2217,
      longitude: 6.7788,
    },
    areaServed: [
      { "@type": "City", name: "Düsseldorf" },
      { "@type": "City", name: "Meerbusch" },
      { "@type": "City", name: "Neuss" },
      { "@type": "City", name: "Ratingen" },
    ],
    openingHoursSpecification: openingHours
      .filter((h) => !h.is_closed && h.open_time && h.close_time)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[h.day_of_week] || "Monday",
        opens: h.open_time,
        closes: h.close_time,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Laura S.",
        },
        datePublished: "2026-02-14",
        reviewBody:
          "Mürvet ist eine absolute Koryphäe auf ihrem Gebiet. Meine Wimpernverlängerung hält bombenfest und sieht selbst nach 4 Wochen noch unfassbar edel und natürlich aus.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Elena M.",
        },
        datePublished: "2026-02-05",
        reviewBody:
          "Das Hollywood Glow Facial hat mein Hautbild nachhaltig verwandelt. Feine Linien wirken wie aufgepolstert und der Glow hält tagelang an.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sabrina K.",
        },
        datePublished: "2026-01-20",
        reviewBody:
          "Perfekt symmetrische Powder Brows mit feinem Ombré-Puderverlauf. Mürvet nimmt sich viel Zeit für die typgerechte Beratung.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    sameAs: [
      business.instagram_url || "https://instagram.com/auraglow_bymurvet",
    ],
  },
],
};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
