import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/public/CookieConsent";
import GoogleConsentMode, { GoogleTagManagerNoScript } from "@/components/analytics/GoogleConsentMode";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://auragl.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aura Glow by Mürvet | Exklusive Beauty & Aesthetics",
    template: "%s | Aura Glow by Mürvet",
  },
  description:
    "Exklusives Beauty & Aesthetics Studio für Wimpernverlängerung, Hollywood Glow Facials, Permanent Make-up und zertifizierte Masterclasses in Düsseldorf.",
  keywords: [
    "Aura Glow",
    "Mürvet",
    "Beauty Düsseldorf",
    "Wimpernverlängerung Düsseldorf",
    "Powder Brows",
    "Permanent Make-up",
    "Hollywood Glow",
    "Microneedling",
    "Lash Lifting",
    "Beauty Schulungen",
  ],
  authors: [{ name: "Aura Glow by Mürvet" }],
  creator: "Mürvet",
  publisher: "Aura Glow by Mürvet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Aura Glow by Mürvet",
    title: "Aura Glow by Mürvet | Exklusive Beauty & Aesthetics",
    description:
      "Entdecke individuelle Beauty-Behandlungen für deine natürliche Schönheit und ein strahlendes Selbstbewusstsein.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Aura Glow by Mürvet Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Glow by Mürvet | Exklusive Beauty & Aesthetics",
    description:
      "Entdecke individuelle Beauty-Behandlungen für deine natürliche Schönheit und ein strahlendes Selbstbewusstsein.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "./",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "lT-RA6-fE5zhMRWP56etSyMrv-lXDVN2pLJkh3ffC2Q",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dancing.variable} ${inter.variable}`}>
      <head>
        <GoogleConsentMode />
      </head>
      <body className="antialiased bg-[#F7F3EE] text-[#392D29] min-h-screen selection:bg-[#E8D6C5] selection:text-[#211A18]">
        <GoogleTagManagerNoScript />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
