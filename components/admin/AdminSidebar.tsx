"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
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
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", labelDe: "Dashboard", labelTr: "Genel Bakış", icon: LayoutDashboard },
  { href: "/admin/inhalte", labelDe: "Inhalte", labelTr: "İçerikler & Metinler", icon: FileText },
  { href: "/admin/leistungen", labelDe: "Behandlungen", labelTr: "Hizmetler & Tedaviler", icon: Sparkles },
  { href: "/admin/preise", labelDe: "Preise", labelTr: "Fiyat Listesi", icon: DollarSign },
  { href: "/admin/galerie", labelDe: "Galerie", labelTr: "Galeri", icon: Image },
  { href: "/admin/medien", labelDe: "Mediathek", labelTr: "Medya & Görseller", icon: FolderOpen },
  { href: "/admin/design", labelDe: "Design & Hintergründe", labelTr: "Tasarım & Arka Plan", icon: Palette },
  { href: "/admin/anfragen", labelDe: "Terminanfragen", labelTr: "Randevu Talepleri", icon: CalendarDays },
  { href: "/admin/nachrichten", labelDe: "Nachrichten", labelTr: "İletişim Mesajları", icon: MessageSquare },
  { href: "/admin/einstellungen", labelDe: "Einstellungen", labelTr: "Ayarlar & Saatler", icon: Settings },
  { href: "/admin/seo", labelDe: "SEO & Meta", labelTr: "SEO & Google", icon: Globe },
  { href: "/admin/anleitung", labelDe: "Admin-Anleitung", labelTr: "Admin Rehberi", icon: BookOpen, isGuide: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { adminLang, setAdminLang, isTr } = useAdminLanguage();

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
    <div className="flex flex-col h-full justify-between bg-white border-r border-[#E8D6C5] p-5 w-64 overflow-y-auto">
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="pb-3 border-b border-[#E8D6C5]">
          <AuraGlowLogo size="sm" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#844C36] font-semibold block mt-2">
            {isTr ? "Yönetim Paneli & CMS" : "Verwaltung & CMS"}
          </span>

          {/* Admin Language Switcher */}
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[2px] mt-3">
            <span className="text-[11px] font-medium text-[#756A63] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#844C36]" />
              {isTr ? "Panel Dili:" : "Sprache:"}
            </span>
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-[2px] border border-[#E8D6C5]">
              <button
                type="button"
                onClick={() => setAdminLang("de")}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded-[1px] transition-all",
                  !isTr
                    ? "bg-[#844C36] text-white shadow-xs"
                    : "text-[#756A63] hover:text-[#392D29]"
                )}
                title="Deutsch"
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setAdminLang("tr")}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded-[1px] transition-all",
                  isTr
                    ? "bg-[#844C36] text-white shadow-xs"
                    : "text-[#756A63] hover:text-[#392D29]"
                )}
                title="Türkçe"
              >
                TR
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const label = isTr ? item.labelTr : item.labelDe;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-[1px] text-xs font-medium uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-[#FAF6F1] text-[#844C36] border-l-2 border-[#844C36] font-semibold"
                    : item.isGuide
                    ? "text-[#844C36] bg-[#844C36]/5 hover:bg-[#844C36]/10 font-semibold"
                    : "text-[#756A63] hover:text-[#392D29] hover:bg-[#FAF6F1]"
                )}
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Icon className={cn("w-4 h-4 shrink-0", item.isGuide ? "text-[#844C36]" : "")} />
                  <span className="truncate">{label}</span>
                </span>
                {item.isGuide && (
                  <span className="text-[9px] bg-[#844C36] text-white px-1.5 py-0.2 rounded-full font-bold uppercase tracking-normal">
                    {isTr ? "Yardım" : "Hilfe"}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[#E8D6C5] space-y-2 mt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#756A63] hover:text-[#392D29] rounded-[1px] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isTr ? "Siteyi Görüntüle" : "Website ansehen"}</span>
          </span>
        </a>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-[1px] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isTr ? "Çıkış Yap" : "Abmelden"}</span>
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
        <div className="flex items-center gap-3">
          <AuraGlowLogo size="sm" variant="monogram" />
          <div className="flex items-center gap-1 bg-[#FAF6F1] px-1.5 py-0.5 rounded-[2px] border border-[#E8D6C5]">
            <button
              type="button"
              onClick={() => setAdminLang("de")}
              className={cn(
                "px-1.5 py-0.5 text-[10px] font-bold rounded-[1px]",
                !isTr ? "bg-[#844C36] text-white" : "text-[#756A63]"
              )}
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => setAdminLang("tr")}
              className={cn(
                "px-1.5 py-0.5 text-[10px] font-bold rounded-[1px]",
                isTr ? "bg-[#844C36] text-white" : "text-[#756A63]"
              )}
            >
              TR
            </button>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#392D29] rounded-[1px]"
          aria-label={isTr ? "Menüyü Aç/Kapat" : "Menü öffnen/schließen"}
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
