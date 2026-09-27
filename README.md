# AURA GLOW BY MÜRVET — Luxury Beauty & Aesthetics Platform

A bespoke, production-ready website and administration platform for **Aura Glow by Mürvet** (Düsseldorf, Germany).

Designed to European quiet luxury standards: intentional composition, editorial typography (*Cormorant Garamond* & *Inter*), sophisticated whitespace, and high-performance engineering.

---

## 💎 Features

- **Public Experience:**
  - 12-stage luxury storytelling homepage (Hero, Introduction, Signature Treatments, Studio Philosophy, Categories, Gallery, Selected Pricing, About Mürvet, Appointment Flow, Studio Visit, Final CTA, Footer).
  - High-precision pricing page (`/preise`) directly matching the studio's canonical price list.
  - Interactive treatments catalog (`/leistungen`) with duration, price, and category jumps.
  - Photography portfolio (`/galerie`) with category filters and high-res lightbox.
  - Authentic About Us narrative (`/ueber-uns`) highlighting founder Mürvet and studio standards.
  - Robust Contact page (`/kontakt`) and Appointment Request engine (`/termin`).
  - German legal compliance: Impressum (`/impressum`) according to § 5 TMG and Datenschutz (`/datenschutz`) according to DSGVO.
  - LocalBusiness / BeautySalon JSON-LD structured data, XML sitemap (`/sitemap.xml`), `robots.txt`, and AI crawler specification (`/llms.txt`).

- **Studio Administration & CMS (`/admin`):**
  - Protected by authentication and server-side middleware.
  - Real studio metrics (no fake statistics).
  - Full Content Management System (`/admin/inhalte`) to edit text without code.
  - Services Management (`/admin/leistungen`) with full CRUD.
  - Centralized Pricing Management (`/admin/preise`) for treatments and variants.
  - Design & Background Customization (`/admin/design`) with live preview and contrast checks.
  - Media Library (`/admin/medien`) with upload and one-click URL copying.
  - Appointment Management (`/admin/anfragen`) with status workflows (Neu, Bestätigt, Erledigt, Abgelehnt) and internal notes.
  - Contact Inbox (`/admin/nachrichten`).
  - Business & Opening Hours Settings (`/admin/einstellungen`).
  - Search Engine Optimization (`/admin/seo`) with Google snippet previews.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 2. Admin Login
- URL: `http://localhost:3000/admin/login`
- Configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` (refer to `.env.example`).

### 3. Production Build
```bash
npm run build
npm run start
```

### 4. Database Setup (Supabase / PostgreSQL)
Execute `database/schema.sql` followed by `database/seed.sql` in the Supabase SQL editor. Add your project credentials to `.env.local`.

---

## 🏛 Brand Identity
- **Primary Background:** `#F7F3EE`
- **Secondary Warm Background:** `#EFE6DD`
- **Rose Gold Accent:** `#B88770`
- **Dark Rose Gold:** `#936650`
- **Primary Text:** `#392D29`
- **Deep Editorial Dark:** `#211A18`
- **Typography:** *Cormorant Garamond* (Serif), *Inter* (Sans), *Dancing Script* (Cursive Signature).
- **Icons:** Exclusively *lucide-react* (Zero emojis).
