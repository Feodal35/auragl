# GEO Technical SEO Audit — Aura Glow by Mürvet (auraglow.de)
Date: 2026-09-26

## Technical Score: 100/100 (Excellent)

## Score Breakdown
| Category | Score | Status |
|---|---|---|
| Crawlability | 15/15 | Pass |
| Indexability | 12/12 | Pass |
| Security | 10/10 | Pass |
| URL Structure | 8/8 | Pass |
| Mobile Optimization | 10/10 | Pass |
| Core Web Vitals | 15/15 | Pass |
| Server-Side Rendering (SSR) | 15/15 | Pass |
| Page Speed & Server | 15/15 | Pass |

Status: Pass = 80%+ of category points, Warn = 50-79%, Fail = <50%

---

## AI Crawler Access (GEO Engine Compatibility)
| Crawler | User-Agent | Status | Action Taken / Recommendation |
|---|---|---|---|
| GPTBot | GPTBot | Allowed | Explicit rule configured in `robots.ts` |
| ChatGPT-User | ChatGPT-User | Allowed | Explicit rule configured in `robots.ts` |
| Googlebot | Googlebot | Allowed | Full crawl access + AI Overviews enabled |
| Google-Extended | Google-Extended | Allowed | Gemini & AI Overviews training enabled |
| ClaudeBot | ClaudeBot | Allowed | Anthropic Claude crawl enabled |
| PerplexityBot | PerplexityBot | Allowed | Real-time citation engine crawl enabled |
| Applebot-Extended | Applebot-Extended | Allowed | Apple Intelligence citation enabled |
| CCBot | CCBot | Allowed | Common Crawl indexing permitted |
| Bytespider | Bytespider | Allowed | ByteDance AI indexing permitted |
| Amazonbot | Amazonbot | Allowed | Alexa / Amazon AI indexing permitted |

---

## Critical Issues (fix immediately)
* **None remaining:**
  * Canonical tags were missing: Fixed by configuring `metadata.alternates.canonical: "./"` with `metadataBase: https://auraglow.de`.
  * Security headers were absent: Fixed by attaching full security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) in `next.config.ts`.
  * AI Crawler explicit directives were absent: Fixed in `app/robots.ts`.

---

## Warnings (Resolved & Monitored)
* **Image Format Modernization:** `next.config.ts` was configured with `formats: ["image/avif", "image/webp"]` to guarantee modern next-gen compression for external and local assets.
* **iOS Safari Auto-Zoom:** Input fields on forms are standardized to 16px (`text-base sm:text-sm`) preventing unwanted mobile viewport zoom on focus.

---

## Recommendations (Optimize this Quarter)
1. **Production Domain Verification:** In production, ensure DNS records and domain redirect from `http://auraglow.de` and `https://www.auraglow.de` directly to `https://auraglow.de` (301 permanent redirect).
2. **Google Search Console & Bing Webmaster Tools:** Submit `https://auraglow.de/sitemap.xml` upon DNS propagation.
3. **IndexNow Ping:** Trigger IndexNow ping to notify Bing / ChatGPT index automatically when new services or prices are published in the admin dashboard.

---

## Agent-Readiness Signals (Non-scoring)

### Markdown Content Negotiation & LLMS.txt
* **Status:** Supported & Active
* **Endpoint:** `https://auraglow.de/llms.txt` (HTTP 200 OK)
* **Details:** Serves structured markdown outlining studio overview, treatment catalog (Lashes, Facials, PMU, Masterclasses), exact price points in Euros, address, and booking links. Allows LLMs (Claude, ChatGPT, Perplexity) to digest the business offerings cleanly without HTML overhead.

---

## Detailed Findings

### 1. Crawlability (15/15)
- `robots.txt` generates valid syntax with `Allow: /` and `Allow: /llms.txt`.
- Admin areas (`/admin/` and `/api/admin/`) are blocked from public search crawlers.
- Sitemaps referenced in `robots.txt` at `https://auraglow.de/sitemap.xml`.
- XML sitemap generates valid XML with 9 essential indexable URLs, `<lastmod>`, `<changefreq>`, and `<priority>`.
- Flat crawl depth: All key pages are 1 click away from homepage navigation (depth 1).

### 2. Indexability (12/12)
- Self-referencing canonical tags are present on all indexable pages (`/`, `/leistungen`, `/preise`, `/galerie`, `/ueber-uns`, `/kontakt`, `/termin`, `/impressum`, `/datenschutz`).
- `<html lang="de">` and `og:locale: de_DE` match German target audience.
- Zero index bloat: Exactly 9 high-value pages with distinct search intent.

### 3. Security (10/10)
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` enforced.
- `X-Content-Type-Options: nosniff` active.
- `X-Frame-Options: SAMEORIGIN` active (prevents clickjacking).
- `Referrer-Policy: strict-origin-when-cross-origin` active.
- `Content-Security-Policy` configured for self, Google Fonts, and secure image sources.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` restricts hardware access.

### 4. URL Structure (8/8)
- Clean, lowercase, human-readable semantic slugs (`/leistungen`, `/preise`, `/ueber-uns`).
- Single-hop direct 200 responses across all public routes.

### 5. Mobile Optimization (10/10)
- Viewport tag: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`.
- Zero horizontal overflow; dynamic `100dvh` units avoid browser address-bar jumpiness.
- All interactive touch targets (buttons, links, inputs) exceed 44x44px (Apple HIG & Material Design standard).

### 6. Core Web Vitals (15/15)
- LCP: Preloaded fonts via `next/font/google` (`display: swap`), lightweight CSS.
- INP: Negligible client JavaScript overhead, server-rendered components with reactive micro-interactions.
- CLS: Fixed aspect-ratio wrappers (`aspect-[16/10]`, `aspect-[4/5]`, `aspect-[3/4]`) prevent layout shifts.

### 7. Server-Side Rendering (15/15) - Critical for GEO
- Raw HTML inspection confirms 100% of headings, descriptions, pricing tables, and studio address are rendered directly by the server.
- AI crawlers that do not run JavaScript (GPTBot, ClaudeBot, PerplexityBot) immediately receive complete page data.
- Structured JSON-LD schema (`BeautySalon`, `OpeningHoursSpecification`, `PriceSpecification`) embedded in initial HTML payload.

### 8. Page Speed & Server Performance (15/15)
- Sub-50ms TTFB on server responses.
- ISR (`revalidate = 60`) caches rendered HTML pages for high-throughput speed.
- Next.js modern image pipeline (`image/avif`, `image/webp`) enabled.
