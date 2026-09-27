# AURA GLOW BY MÜRVET — PRODUKTIONS- & DEPLOYMENT-DOKUMENTATION

Dieses Handbuch dokumentiert die Architektur, die Veritabanı-Einrichtung (Supabase / PostgreSQL) und die Bereitstellung des Premium-Portals **Aura Glow by Mürvet**.

---

## 1. Markenidentität & Referenzen (Source of Truth)

- **Name:** Aura Glow by Mürvet
- **Schwerpunkt:** Beauty & Aesthetics
- **Markt:** Deutschland / DACH-Region (Sprache: Deutsch)
- **Farbpalette:**
  - Haupt-Hintergrund: `#F7F3EE` (Warmes Alabaster-Creme)
  - Sekundärer Hintergrund: `#EFE6DD` (Sanftes Champagner)
  - Roségold (Brand Accent): `#B88770`
  - Dunkles Roségold: `#936650`
  - Primärtext: `#392D29` (Tiefes Espresso)
  - Sekundärtext: `#756A63`
  - Editorial Dark: `#211A18`
- **Typografie:**
  - Überschriften: *Cormorant Garamond* (Editorial Serif)
  - Fließtext & Zahlen: *Inter* / *Manrope* (Clean Modern Sans)
  - Signature Script: *Dancing Script* (Original Mürvet Signatur)

---

## 2. Technologie-Stack

- **Framework:** Next.js 15+ (App Router)
- **Sprache:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Ausschließlich Lucide React (Keine Emojis!)
- **Datenbank & Backend:** PostgreSQL / Supabase mit RLS (Row Level Security)
- **Ausfallsicheres Fallback-System:** Das System funktioniert dank lokalem In-Memory State sofort "Out of the Box" und synchronisiert nahtlos mit Supabase, sobald Zugangsdaten hinterlegt sind.
- **Formulare & Validierung:** React Hook Form + Zod
- **Sicherheit:** Server-seitige Validierung, Honeypot Spam-Filter, Sliding-Window Rate-Limiting

---

## 3. Datenbank-Installation (Supabase / PostgreSQL)

Die Datenbankstruktur ist in zwei SQL-Dateien unter `database/` hinterlegt:

1. **`database/schema.sql`**:
   - Tabellen: `service_categories`, `services`, `pricing`, `gallery_items`, `appointment_requests`, `contact_messages`, `opening_hours`, `site_settings`, `design_settings`, `content_sections`, `seo_settings`, `admin_activity_logs`.
   - Performance-Indizes für schnelle Abfragen.
   - **Row Level Security (RLS)**: Besucher können nur aktive öffentliche Inhalte lesen und Anfragen einreichen. Private Kundenanfragen und administrative Mutationen sind geschützt.

2. **`database/seed.sql`**:
   - Befüllt die Datenbank mit den **exakten Referenzpreisen** (Referenz 2):
     - Wimpern (Klassisch 60 €, Auffüllen 40/50 €; Volumen Soft 80 €, Mega Volumen 95 €, Russian 100 €, Lifting 50/70 €)
     - Gesichtsreinigung (Anti-Aging 80 €, Microneedling 90 €, Hollywood Glow 95 €, Hollywood Peel 120 €, Microdermabrasion 80 €, LED 80 €)
     - Permanent Make-up (Powder Brows 350 €, Ombré Brows 350 €, Lippen Soft Lips 300 €, Aquarell 350 €, Lifteffekt 360 €)
     - Schulungen (Lash Lift 400 €, Wimpern 900 €, PMU 1.500 €, Needling 500 €, Komplett 3.000 €)

### Anleitung zur Aktivierung in Supabase:
1. Erstelle ein Projekt auf [supabase.com](https://supabase.com).
2. Öffne den **SQL Editor** im Supabase Dashboard.
3. Führe zuerst `database/schema.sql` aus.
4. Führe danach `database/seed.sql` aus.
5. Kopiere die Projekt-URL und den `anon`-Schlüssel in deine `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://dein-projekt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-schluessel
   SUPABASE_SERVICE_ROLE_KEY=dein-service-role-schluessel
   ```

---

## 4. Administration (Studio-CMS)

Der Verwaltungsbereich ist unter folgendem Pfad erreichbar:

- **Login-URL:** `https://auraglow.de/admin/login` (lokal: `http://localhost:3000/admin/login`)
- **Zugangsdaten:** Werden über `ADMIN_EMAIL` und `ADMIN_PASSWORD` in den Umgebungsvariablen (`.env.local` bzw. Vercel Environment Variables) konfiguriert.

### Administrations-Module:
- **`/admin` (Dashboard):** Echte Kennzahlen (Terminanfragen gesamt, Neue Anfragen, Kontaktnachrichten, Aktive Behandlungen, Galeriebilder), Übersicht der neuesten Anfragen und Schnellaktionen.
- **`/admin/inhalte`:** Bearbeitung aller Überschriften, Eyebrows, Beschreibungen und Button-Texte ohne Code-Änderungen.
- **`/admin/leistungen`:** Behandlungen anlegen, bearbeiten, aktivieren/deaktivieren, Preise, Dauer und Bilder anpassen.
- **`/admin/preise`:** Zentrale Preispflege mit Untergruppen, Varianten (Neuset / Auffüllen) und Preisanzeige.
- **`/admin/design`:** Anpassung von Hintergrundbildern (Desktop & Mobile), Hintergrundfarben, Textfarben und Overlay-Deckkraft mit **Echtzeit-Vorschau** und Kontrastprüfung.
- **`/admin/galerie`:** Neue Vorher/Nachher- und Portfoliobilder hochladen, kategorisieren und verwalten.
- **`/admin/medien`:** Mediathek zum Hochladen und Kopieren von Bild-URLs.
- **`/admin/anfragen`:** Alle Terminanfragen einsehen, Status ändern (Neu, Bestätigt, Erledigt, Abgelehnt) und interne Studio-Notizen hinterlegen.
- **`/admin/nachrichten`:** Eingang für alle Nachrichten aus dem Kontaktformular.
- **`/admin/einstellungen`:** Unternehmensdaten, Inhaberin, Adresse, Telefon, WhatsApp, Instagram und Öffnungszeiten.
- **`/admin/seo`:** Google Meta-Titel, Beschreibungen und Live-Suchergebnis-Vorschau für alle Seiten.

---

## 5. Bereitstellung (Deployment auf Vercel)

1. Repository auf GitHub pushen.
2. Projekt in Vercel importieren.
3. Umgebungsvariablen in Vercel unter **Settings > Environment Variables** eintragen:
   - `NEXT_PUBLIC_SITE_URL` = `https://auraglow.de`
   - `NEXT_PUBLIC_SUPABASE_URL` = (Deine Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Dein Supabase Anon Key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (Dein Supabase Service Role Key)
   - `ADMIN_JWT_SECRET` = (Zufälliger sicherer String)
4. Auf **Deploy** klicken. Der Build läuft fehlerfrei durch.

---

## 6. Rechtliches & DSGVO

- **Impressum:** Erreichbar unter `/impressum` (konform nach § 5 TMG).
- **Datenschutzerklärung:** Erreichbar unter `/datenschutz` (konform nach DSGVO).
- **Formulare:** Verlangen vor Absenden die ausdrückliche Einwilligung mit Verlinkung zur Datenschutzerklärung.
- **Google Maps:** Datenschutzfreundlich über externen Link gelöst, sodass keine Tracking-Cookies ohne Zustimmung gesetzt werden.
