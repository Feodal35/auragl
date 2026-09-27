import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "monogram" | "stacked";
  color?: string;
  textColor?: string;
  useGradient?: boolean;
  customLogoUrl?: string | null;
  forceVector?: boolean;
}

export default function AuraGlowLogo({
  className,
  size = "md",
  variant = "full",
  color = "#B88770",
  textColor,
  useGradient = true,
  customLogoUrl,
  forceVector = false,
}: LogoProps) {
  const gradientId = React.useId();

  // Primary brand presentation: Genuine 3D Rose-Gold Metallic Artwork
  if (!forceVector) {
    if (variant === "monogram") {
      const monoSizes = {
        sm: "w-8 h-8",
        md: "w-11 h-11",
        lg: "w-16 h-16",
        xl: "w-20 h-20",
      };
      return (
        <img
          src={customLogoUrl || "/icon-192x192.png"}
          alt="Aura Glow by Mürvet Monogramm"
          width={192}
          height={192}
          className={cn(
            "object-contain select-none transition-transform duration-300 drop-shadow-sm",
            monoSizes[size],
            className
          )}
        />
      );
    }

    const imgHeights = {
      sm: "h-9 sm:h-10",
      md: "h-12 sm:h-14",
      lg: "h-16 sm:h-20",
      xl: "h-22 sm:h-28",
    };
    return (
      <img
        src={customLogoUrl || "/images/aura-glow-logo.png"}
        alt="Aura Glow by Mürvet - Beauty & Aesthetics Studio Düsseldorf Logo"
        width={1003}
        height={735}
        className={cn(
          "w-auto object-contain select-none transition-transform duration-300 drop-shadow-sm",
          imgHeights[size],
          className
        )}
      />
    );
  }

  // Vector SVG Fallback (only if forceVector is enabled)
  const sizes = {
    sm: { w: 168, h: 48 },
    md: { w: 220, h: 62 },
    lg: { w: 280, h: 78 },
    xl: { w: 340, h: 96 },
  };
  const { w, h } = sizes[size];

  const fillSource = useGradient ? `url(#${gradientId})` : color;
  const strokeSource = useGradient ? `url(#${gradientId})` : color;
  const resolvedTextColor = textColor || (color === "#FFFFFF" ? "#FFFFFF" : "#392D29");

  if (variant === "monogram") {
    return (
      <svg
        width={h}
        height={h}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("select-none flex-shrink-0", className)}
        aria-label="Aura Glow by Mürvet Monogramm"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B19D" />
            <stop offset="45%" stopColor="#B88770" />
            <stop offset="100%" stopColor="#936650" />
          </linearGradient>
        </defs>
        <g transform="translate(6, 6)">
          <path
            d="M 42 12 C 32 3, 18 8, 17 25 C 16 42, 33 50, 44 40 L 44 26 L 31 26"
            stroke={strokeSource}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 4 48 L 18 6 L 32 48"
            stroke={strokeSource}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 8 33 L 28 33" stroke={strokeSource} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  return (
    <div
      className={cn("inline-flex items-center select-none tracking-normal", className)}
      aria-label="Aura Glow by Mürvet Logo"
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 240 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto max-h-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B19D" />
            <stop offset="45%" stopColor="#B88770" />
            <stop offset="100%" stopColor="#936650" />
          </linearGradient>
        </defs>
        <g transform="translate(6, 4)">
          <path
            d="M 44 14 C 34 5, 20 10, 19 28 C 18 46, 36 53, 46 43 L 46 28 L 33 28"
            stroke={strokeSource}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 5 50 L 19 8 L 33 50"
            stroke={strokeSource}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 9 35 L 29 35" stroke={strokeSource} strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <text
          x="68"
          y="28"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="22"
          fontWeight="400"
          letterSpacing="4"
          fill={fillSource}
        >
          AURA GLOW
        </text>
        <text
          x="69"
          y="41"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="7.5"
          fontWeight="500"
          letterSpacing="2.8"
          fill={resolvedTextColor}
          opacity="0.8"
        >
          BEAUTY &amp; AESTHETICS
        </text>
        <text
          x="70"
          y="57"
          fontFamily="'Dancing Script', cursive"
          fontSize="15"
          fontWeight="500"
          fill={fillSource}
        >
          by Mürvet
        </text>
        <line
          x1="68"
          y1="63"
          x2="175"
          y2="63"
          stroke={strokeSource}
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
