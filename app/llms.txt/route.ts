import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Aura Glow by Mürvet
> Exklusives Beauty & Aesthetics Studio für Wimpernverlängerung, Permanent Make-up, Hollywood Glow Facials und zertifizierte Schulungen.

## Standort & Inhaberin
- Name: Aura Glow by Mürvet
- Inhaberin: Mürvet
- Standort: Düsseldorf, Deutschland
- Website: https://auraglow.de
- Terminvereinbarung: Online-Terminanfrage unter https://auraglow.de/termin

## Hauptbehandlungen & Leistungen
- **Wimpern (Lashes):**
  - Klassische Wimpernverlängerung (1:1 Technik): Neuset 60 €, Auffüllen 3 Wochen 40 €, Auffüllen 4 Wochen 50 €
  - Volumen Soft / Medium: Neuset 80 €, Auffüllen 3 Wochen 40 €, Auffüllen 4 Wochen 50 €
  - Mega Volumen: Neuset 95 €, Auffüllen 3 Wochen 50 €, Auffüllen 4 Wochen 65 €
  - Russian Volumen: Neuset 100 €, Auffüllen 3 Wochen 80 €, Auffüllen 4 Wochen 90 €
  - Wimpernlifting: Standard 50 €, inkl. Färben & Keratin 70 €

- **Gesichtsreinigung & Pflege:**
  - Hollywood Glow Treatment: 95 € (60 Min.)
  - Microneedling Kollagen-Therapie: 90 € (75 Min.)
  - Gesichtsreinigung inkl. Anti-Aging: 80 € (60 Min.)
  - Hollywood Peel (Carbon Laser): 120 € (90 Min.)
  - Microdermabrasion: 80 € (60 Min.)
  - LED Lichttherapie: 80 € (40 Min.)

- **Permanent Make-up (PMU):**
  - Powder Brows (Puder-Augenbrauen): Erstbehandlung 350 €, Auffrischung 12 Monate 200 €, 24 Monate 150 €
  - Ombré Brows: Erstbehandlung 350 €, Auffrischung 12 Monate 200 €, 24 Monate 150 €
  - Lippenpigmentierung: Soft Lips 300 €, Aquarell Lips 350 €, Mit Lifteffekt 360 €

- **Schulungen:**
  - Lash Lift Schulung: 400 €
  - Wimpern Schulung (1:1 & Volumen): 900 €
  - PMU Schulung (Powder Brows): 1.500 €
  - Microneedling Schulung: 500 €
  - Alle Schulungen insgesamt: 3.000 €
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
