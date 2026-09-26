"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  DollarSign,
  Image,
  FolderOpen,
  Palette,
  CalendarDays,
  MessageSquare,
  Settings,
  Globe,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inhalte", label: "Inhalte", icon: FileText },
  { href: "/admin/leistungen", label: "Behandlungen", icon: Sparkles },
  { href: "/admin/preise", label: "Preise", icon: DollarSign },
  { href: "/admin/galerie", label: "Galerie", icon: Image },
  { href: "/admin/medien", label: "Mediathek", icon: FolderOpen },
  { href: "/admin/design", label: "Design & Hintergründe", icon: Palette },
  { href: "/admin/anfragen", label: "Terminanfragen", icon: CalendarDays },
  { href: "/admin/nachrichten", label: "Nachrichten", icon: MessageSquare },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: Settings },
  { href: "/admin/seo", label: "SEO & Meta", icon: Globe },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between bg-white border-r border-[#E8D6C5] p-5 w-64">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="pb-4 border-b border-[#E8D6C5]">
          <AuraGlowLogo size="sm" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B88770] font-medium block mt-2">
            Verwaltung &amp; CMS
          </span>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-[1px] text-xs font-medium uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-[#FAF6F1] text-[#B88770] border-l-2 border-[#B88770]"
                    : "text-[#756A63] hover:text-[#392D29] hover:bg-[#FAF6F1]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[#E8D6C5] space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 text-xs text-[#756A63] hover:text-[#392D29] rounded-[1px] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Website ansehen</span>
          </span>
        </a>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 rounded-[1px] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white border-b border-[#E8D6C5] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <AuraGlowLogo size="sm" variant="monogram" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#392D29] rounded-[1px]"
          aria-label="Menü"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 w-64 z-50 bg-white">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
