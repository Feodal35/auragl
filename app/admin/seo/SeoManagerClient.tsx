"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SeoSetting } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Save, CheckCircle2, Globe, Eye } from "lucide-react";

interface Props {
  initialSeo: Record<string, SeoSetting>;
}

export default function SeoManagerClient({ initialSeo }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [seoMap, setSeoMap] = useState<Record<string, SeoSetting>>(initialSeo);
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const current = seoMap[activeRoute] || {
    route: activeRoute === "home" ? "/" : `/${activeRoute}`,
    title: "Aura Glow by Mürvet",
    description: "Beauty & Aesthetics Studio",
  };

  const handleChange = (field: keyof SeoSetting, val: any) => {
    setSeoMap((prev) => ({
      ...prev,
      [activeRoute]: {
        ...prev[activeRoute],
        [field]: val,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: activeRoute, setting: current }),
      });
      if (res.ok) {
        setFeedback(d.seo.savedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorSaving);
    } finally {
      setSaving(false);
    }
  };

  const routes = [
    { key: "home", labelDe: "Startseite (/)", labelTr: "Ana Sayfa (/)" },
    { key: "services", labelDe: "Behandlungen (/leistungen)", labelTr: "Hizmetler (/leistungen)" },
    { key: "pricing", labelDe: "Preise (/preise)", labelTr: "Fiyat Listesi (/preise)" },
    { key: "gallery", labelDe: "Galerie (/galerie)", labelTr: "Galeri (/galerie)" },
    { key: "about", labelDe: "Über uns (/ueber-uns)", labelTr: "Hakkımızda (/ueber-uns)" },
    { key: "contact", labelDe: "Kontakt (/kontakt)", labelTr: "İletişim (/kontakt)" },
    { key: "appointment", labelDe: "Terminanfrage (/termin)", labelTr: "Randevu Formu (/termin)" },
  ];

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Route Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8D6C5] pb-3">
        {routes.map((r) => (
          <button
            key={r.key}
            onClick={() => setActiveRoute(r.key)}
            className={`text-xs uppercase tracking-wider px-4 py-2 font-medium transition-colors rounded-[1px] ${
              activeRoute === r.key
                ? "bg-[#844C36] text-white shadow-xs"
                : "bg-white text-[#756A63] hover:text-[#392D29] border border-[#E8D6C5]"
            }`}
          >
            {adminLang === "tr" ? r.labelTr : r.labelDe}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form (7 cols) */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-7 bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 space-y-6 shadow-luxury-sm"
        >
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs uppercase tracking-wider text-[#392D29] font-medium">
                {d.seo.fieldTitle}
              </label>
              <span
                className={`text-[11px] ${
                  (current.title?.length || 0) > 60 ? "text-amber-600 font-semibold" : "text-[#756A63]"
                }`}
              >
                {current.title?.length || 0} / 60 {adminLang === "tr" ? "Karakter" : "Zeichen"}
              </span>
            </div>
            <input
              type="text"
              required
              value={current.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs uppercase tracking-wider text-[#392D29] font-medium">
                {d.seo.fieldDesc}
              </label>
              <span
                className={`text-[11px] ${
                  (current.description?.length || 0) > 160
                    ? "text-amber-600 font-semibold"
                    : "text-[#756A63]"
                }`}
              >
                {current.description?.length || 0} / 160 {adminLang === "tr" ? "Karakter" : "Zeichen"}
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={current.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] leading-relaxed resize-none"
            />
          </div>

          <div className="pt-2 border-t border-[#E8D6C5]/50">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={current.no_index || false}
                onChange={(e) => handleChange("no_index", e.target.checked)}
                className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
              />
              <span className="text-xs text-[#392D29]">
                {adminLang === "tr"
                  ? "Arama motorları bu sayfayı dizine eklemesin (noindex)"
                  : "Suchmaschinen von der Indexierung ausschließen (noindex)"}
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#E8D6C5] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2 shadow-luxury-xs"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? d.common.saving : d.seo.saveBtn}</span>
            </button>
          </div>
        </form>

        {/* Live Search Snippet Preview (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#392D29] font-semibold">
            <Eye className="w-4 h-4 text-[#844C36]" />
            <span>{adminLang === "tr" ? "Google Arama Sonucu Önizlemesi" : "Google Suchergebnis Vorschau"}</span>
          </div>

          <div className="p-4 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] space-y-1.5 font-sans">
            <div className="flex items-center gap-2 text-[11px] text-[#756A63]">
              <span className="w-4 h-4 rounded-full bg-[#E8D6C5] inline-flex items-center justify-center text-[9px] font-bold text-[#392D29]">
                AG
              </span>
              <span>https://auraglow.de{current.route !== "/" ? current.route : ""}</span>
            </div>
            <h3 className="text-blue-800 text-sm font-medium hover:underline cursor-pointer leading-tight">
              {current.title || "Aura Glow by Mürvet"}
            </h3>
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
              {current.description || "Exklusives Beauty & Aesthetics Studio."}
            </p>
          </div>

          <p className="text-[11px] text-[#756A63] font-light italic text-center">
            {adminLang === "tr"
              ? "Bu sayfa Google arama sonuçlarında yaklaşık bu şekilde görüntülenecektir."
              : "So wird diese Seite voraussichtlich in den Suchergebnissen von Google dargestellt."}
          </p>
        </div>
      </div>
    </div>
  );
}
