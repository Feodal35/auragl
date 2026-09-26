"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { Menu, X, CalendarDays, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  businessPhone?: string;
}

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Behandlungen" },
  { href: "/preise", label: "Preise" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header({ businessPhone = "+49 176 1234 5678" }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: Escape key closes mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const headerBackground = isScrolled
    ? "bg-[#F7F3EE]/95 backdrop-blur-md shadow-luxury-sm border-b border-[#E8D6C5]/50 py-3.5"
    : isHome
    ? "bg-transparent py-5"
    : "bg-[#F7F3EE]/90 backdrop-blur-md border-b border-[#E8D6C5]/40 py-4";

  return (
    <>
      {/* WCAG 2.1 A: Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#392D29] focus:text-white focus:text-xs focus:uppercase focus:tracking-widest focus:rounded-[1px] focus:shadow-luxury-lg focus:outline-none focus:ring-2 focus:ring-[#B88770]"
      >
        Zum Hauptinhalt springen
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          headerBackground
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770] rounded-sm p-0.5"
            aria-label="Aura Glow by Mürvet Startseite"
          >
            <AuraGlowLogo
              size="md"
              variant="full"
              textColor={!isScrolled && isHome ? "#FFFFFF" : "#392D29"}
              color={!isScrolled && isHome ? "#E2B19D" : "#B88770"}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Hauptnavigation">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const textColorClass = !isScrolled && isHome
                ? isActive
                  ? "text-white font-medium"
                  : "text-white/85 hover:text-white"
                : isActive
                ? "text-[#A26D57] font-semibold"
                : "text-[#392D29] hover:text-[#A26D57]";

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] tracking-[0.14em] uppercase transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770] rounded-sm",
                    textColorClass
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A26D57] transition-all"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <a
              href="/termin"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770]",
                !isScrolled && isHome
                  ? "bg-white text-[#211A18] hover:bg-[#FAF6F1] shadow-luxury-md"
                  : "bg-[#A26D57] text-white hover:bg-[#8B5742] shadow-luxury-sm"
              )}
            >
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Termin anfragen</span>
            </a>

            {/* Mobile Menu Toggle Button (minimum 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770]",
                !isScrolled && isHome ? "text-white hover:bg-white/10" : "text-[#392D29] hover:bg-[#EFE6DD]"
              )}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#F7F3EE] z-50 lg:hidden shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out border-l border-[#E8D6C5]",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobiles Navigationsmenü"
      >
        <div>
          {/* Header row with logo and close */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E8D6C5]/60">
            <AuraGlowLogo size="sm" variant="monogram" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#756A63] hover:text-[#392D29] hover:bg-[#EFE6DD] rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770]"
              aria-label="Menü schließen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links with >= 48px touch targets */}
          <nav className="mt-8 flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-xl font-editorial min-h-[48px] px-3 py-3 flex items-center justify-between border-b border-[#E8D6C5]/30 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770]",
                    isActive ? "text-[#A26D57] font-semibold bg-[#FAF6F1]" : "text-[#392D29] hover:text-[#A26D57] hover:bg-[#FAF6F1]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#A26D57]/70" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-6 border-t border-[#E8D6C5]/60 space-y-4">
          <a
            href="/termin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#A26D57] text-white min-h-[48px] py-3.5 text-xs uppercase tracking-[0.14em] font-medium rounded-sm shadow-luxury-md hover:bg-[#8B5742] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88770]"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Termin anfragen</span>
          </a>

          {businessPhone && (
            <a
              href={`tel:${businessPhone.replace(/\s+/g, "")}`}
              className="min-h-[44px] flex items-center justify-center gap-2 text-xs text-[#756A63] hover:text-[#392D29] transition-colors py-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#A26D57]" />
              <span>{businessPhone}</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
