"use client";

import React, { useState } from "react";
import { SeoSetting } from "@/lib/types";
import { Save, CheckCircle2, Globe, Eye } from "lucide-react";

interface Props {
  initialSeo: Record<string, SeoSetting>;
}

export default function SeoManagerClient({ initialSeo }: Props) {
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
        setFeedback(`SEO für '${activeRoute}' erfolgreich gespeichert.`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  const routes = [
    { key: "home", label: "Startseite (/)" },
    { key: "services", label: "Behandlungen (/leistungen)" },
    { key: "pricing", label: "Preise (/preise)" },
    { key: "gallery", label: "Galerie (/galerie)" },
    { key: "about", label: "Über uns (/ueber-uns)" },
    { key: "contact", label: "Kontakt (/kontakt)" },
    { key: "appointment", label: "Terminanfrage (/termin)" },
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
                ? "bg-[#B88770] text-white shadow-luxury-sm"
                : "bg-white text-[#756A63] hover:text-[#392D29] border border-[#E8D6C5]"
            }`}
          >
            {r.label}
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
                SEO Seitentitel (Title Tag)
              </label>
              <span
                className={`text-[11px] ${
                  (current.title?.length || 0) > 60 ? "text-amber-600 font-medium" : "text-[#756A63]"
                }`}
              >
                {current.title?.length || 0} / 60 Zeichen
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
                Meta-Beschreibung (Description)
              </label>
              <span
                className={`text-[11px] ${
                  (current.description?.length || 0) > 160
                    ? "text-amber-600 font-medium"
                    : "text-[#756A63]"
                }`}
              >
                {current.description?.length || 0} / 160 Zeichen
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
                className="h-4 w-4 text-[#B88770] rounded border-[#E8D6C5]"
              />
              <span className="text-xs text-[#392D29]">
                Suchmaschinen von der Indexierung ausschließen (noindex)
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#E8D6C5] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Wird gespeichert..." : "SEO Einstellungen speichern"}</span>
            </button>
          </div>
        </form>

        {/* Live Search Snippet Preview (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#392D29] font-medium">
            <Eye className="w-4 h-4 text-[#B88770]" />
            <span>Google Suchergebnis Vorschau</span>
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
              {current.description || "Exklusives Beauty & Aesthetics Studio in Düsseldorf."}
            </p>
          </div>

          <p className="text-[11px] text-[#756A63] font-light italic text-center">
            So wird diese Seite voraussichtlich in den Suchergebnissen von Google dargestellt.
          </p>
        </div>
      </div>
    </div>
  );
}
