import { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!baseUrl) {
    try {
      const headersList = await headers();
      const host = headersList.get("x-forwarded-host") || headersList.get("host");
      const proto = headersList.get("x-forwarded-proto") || "https";
      if (host) {
        baseUrl = `${proto}://${host}`;
      }
    } catch {
      // Fallback
    }
  }

  if (!baseUrl) {
    baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://auragl.vercel.app";
  }

  baseUrl = baseUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
          "CCBot",
          "FacebookBot",
          "Bytespider",
          "Amazonbot",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
