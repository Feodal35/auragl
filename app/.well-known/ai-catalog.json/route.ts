import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const catalog = {
    specVersion: "1.0",
    host: {
      displayName: "Aura Glow by Mürvet",
      identifier: "did:web:xn--aura6lowbymrvet-9vb.de",
      documentationUrl: "https://xn--aura6lowbymrvet-9vb.de/llms.txt"
    },
    entries: [
      {
        identifier: "urn:air:xn--aura6lowbymrvet-9vb.de:booking:appointment",
        displayName: "Aura Glow Terminanfrage (Appointment Booking)",
        type: "application/mcp-server-card+json",
        description: "Bucht eine Beauty-Behandlung (Wimpernverlängerung, Hollywood Glow Facials, Powder Brows) im Aura Glow Studio in 31224 Peine.",
        tags: ["beauty", "lashes", "facials", "brows", "booking", "peine"],
        representativeQueries: [
          "Termin für Wimpernverlängerung in Peine anfragen",
          "Hollywood Glow Facial Termin buchen",
          "Powder Brows Beratungstermin vereinbaren",
          "book a facial treatment at Aura Glow Peine"
        ],
        url: "https://xn--aura6lowbymrvet-9vb.de/termin",
        updatedAt: "2026-10-29T10:00:00Z"
      },
      {
        identifier: "urn:air:xn--aura6lowbymrvet-9vb.de:contact:inquiry",
        displayName: "Aura Glow Kontakt & Beratung (Contact)",
        type: "application/mcp-server-card+json",
        description: "Sendet eine allgemeine Anfrage, Preisauskunft oder Beratungsnachricht an Aura Glow by Mürvet.",
        tags: ["contact", "inquiry", "support", "peine"],
        representativeQueries: [
          "Kontakt zu Aura Glow Studio Peine aufnehmen",
          "Preise für Wimpernlifting oder Facials erfragen",
          "Frage an Kosmetikstudio Aura Glow Peine senden"
        ],
        url: "https://xn--aura6lowbymrvet-9vb.de/kontakt",
        updatedAt: "2026-10-29T10:00:00Z"
      },
      {
        identifier: "urn:air:xn--aura6lowbymrvet-9vb.de:catalog:treatments",
        displayName: "Aura Glow Behandlungskatalog (Treatments & Prices)",
        type: "application/mcp-server-card+json",
        description: "Ruft alle verfügbaren Behandlungen, Beschreibungen, Dauer und Preise (PAngV-konform) von Aura Glow by Mürvet ab.",
        tags: ["catalog", "services", "pricing", "peine"],
        representativeQueries: [
          "Welche Behandlungen bietet Aura Glow in Peine an?",
          "Wie viel kostet Wimpernverlängerung bei Aura Glow?",
          "Preisliste Aura Glow Studio Peine"
        ],
        url: "https://xn--aura6lowbymrvet-9vb.de/leistungen",
        updatedAt: "2026-10-29T10:00:00Z"
      }
    ]
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
