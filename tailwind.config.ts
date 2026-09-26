import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F3EE",
        foreground: "#392D29",
        champagne: {
          DEFAULT: "#E8D6C5",
          light: "#F3ECE4",
          soft: "#FAF6F1",
        },
        rose: {
          gold: "#B88770",
          "gold-light": "#D9A891",
          "gold-dark": "#936650",
          "gold-subtle": "rgba(184, 135, 112, 0.12)",
        },
        primary: {
          DEFAULT: "#B88770",
          foreground: "#FFFFFF",
          dark: "#936650",
          light: "#D9A891",
        },
        secondary: {
          DEFAULT: "#EFE6DD",
          foreground: "#392D29",
        },
        muted: {
          DEFAULT: "#EFE6DD",
          foreground: "#756A63",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#392D29",
        },
        editorial: {
          dark: "#211A18",
          charcoal: "#2D2421",
        },
        border: "#E8D6C5",
        ring: "#B88770",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "'Cormorant Garamond'", "Georgia", "serif"],
        body: ["var(--font-body)", "'Inter'", "'Manrope'", "sans-serif"],
        script: ["var(--font-script)", "'Dancing Script'", "cursive"],
      },
      maxWidth: {
        container: "1320px",
        editorial: "1160px",
        narrow: "840px",
      },
      boxShadow: {
        "luxury-sm": "0 2px 8px -2px rgba(57, 45, 41, 0.05)",
        "luxury-md": "0 8px 24px -4px rgba(57, 45, 41, 0.08)",
        "luxury-lg": "0 16px 40px -8px rgba(57, 45, 41, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
