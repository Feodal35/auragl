import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auraglow.de";

  const allItems: BreadcrumbItem[] = [
    { label: "Startseite", href: "/" },
    ...items,
  ];

  // Schema.org BreadcrumbList
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };

  return (
    <nav
      aria-label="Brotkrumennavigation"
      className={`text-xs text-[#756A63] font-light py-2 ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-[#B88770]/60 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="text-[#392D29] font-medium truncate max-w-[200px] sm:max-w-none"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#A26D57] transition-colors inline-flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-3 h-3 text-[#B88770]" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
