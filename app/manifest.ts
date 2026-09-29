import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aura Glow by Mürvet | Beauty & Aesthetics",
    short_name: "Aura Glow",
    description: "Exklusives Beauty & Aesthetics Studio für Wimpernverlängerung, Hollywood Facials und Permanent Make-up in Peine.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EE",
    theme_color: "#B88770",
    icons: [
      {
        src: "/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
