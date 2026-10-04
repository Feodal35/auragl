"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignSectionSetting } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Save, CheckCircle2, RotateCcw, Eye } from "lucide-react";

interface Props {
  initialDesign: Record<string, DesignSectionSetting>;
}

export default function DesignManagerClient({ initialDesign }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [design, setDesign] = useState<Record<string, DesignSectionSetting>>(initialDesign);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const current = design[activeSection] || {
    section_id: activeSection,
    background_color: "#211A18",
    background_image_desktop: "",
    background_image_mobile: "",
    image_position: "center center",
    image_size: "cover",
    overlay_color: "#211A18",
    overlay_opacity: 0.5,
    text_color: "#FFFFFF",
  };

  const handleChange = (field: keyof DesignSectionSetting, val: string | number | null) => {
    setDesign((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [field]: val,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
      if (res.ok) {
        setFeedback(d.design.savedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorSaving);
    } finally {
      setSaving(false);
    }
  };

  const sectionsList = [
    { id: "hero", labelDe: "Startseite Hero", labelTr: "Ana Sayfa Manşet (Hero)" },
    { id: "intro", labelDe: "Startseite Einleitung", labelTr: "Ana Sayfa Giriş (Intro)" },
    { id: "philosophy", labelDe: "Startseite Philosophie", labelTr: "Felsefe & Vizyon" },
    { id: "appointment_cta", labelDe: "Terminabschluss CTA", labelTr: "Randevu Çağrısı (CTA)" },
  ];

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Section Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8D6C5] pb-3">
        {sectionsList.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`text-xs uppercase tracking-wider px-4 py-2 font-medium transition-colors rounded-[1px] ${
              activeSection === sec.id
                ? "bg-[#844C36] text-white shadow-xs"
                : "bg-white text-[#756A63] hover:text-[#392D29] border border-[#E8D6C5]"
            }`}
          >
            {adminLang === "tr" ? sec.labelTr : sec.labelDe}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (7 cols) */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-7 bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 space-y-6 shadow-luxury-sm"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              {adminLang === "tr" ? "Masaüstü Arka Plan Görseli URL" : "Desktop Hintergrundbild URL"}
            </label>
            <input
              type="url"
              value={current.background_image_desktop || ""}
              onChange={(e) => handleChange("background_image_desktop", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              {adminLang === "tr" ? "Mobil Arka Plan Görseli URL (İsteğe bağlı)" : "Mobiles Hintergrundbild URL (optional)"}
            </label>
            <input
              type="url"
              value={current.background_image_mobile || ""}
              onChange={(e) => handleChange("background_image_mobile", e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                {adminLang === "tr" ? "Arka Plan Rengi" : "Hintergrundfarbe (Fallback)"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={current.background_color || "#211A18"}
                  onChange={(e) => handleChange("background_color", e.target.value)}
                  className="w-8 h-8 rounded border border-[#E8D6C5] cursor-pointer"
                />
                <input
                  type="text"
                  value={current.background_color || "#211A18"}
                  onChange={(e) => handleChange("background_color", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                {adminLang === "tr" ? "Metin Rengi" : "Textfarbe"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={current.text_color || "#FFFFFF"}
                  onChange={(e) => handleChange("text_color", e.target.value)}
                  className="w-8 h-8 rounded border border-[#E8D6C5] cursor-pointer"
                />
                <input
                  type="text"
                  value={current.text_color || "#FFFFFF"}
                  onChange={(e) => handleChange("text_color", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E8D6C5]/50">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                {adminLang === "tr" ? "Karartma (Overlay) Rengi" : "Overlay-Farbe"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={current.overlay_color || "#211A18"}
                  onChange={(e) => handleChange("overlay_color", e.target.value)}
                  className="w-8 h-8 rounded border border-[#E8D6C5] cursor-pointer"
                />
                <input
                  type="text"
                  value={current.overlay_color || "#211A18"}
                  onChange={(e) => handleChange("overlay_color", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                {adminLang === "tr" ? "Karartma Opaklığı:" : "Overlay-Deckkraft:"} {Math.round((current.overlay_opacity || 0) * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={current.overlay_opacity !== undefined ? current.overlay_opacity : 0.5}
                onChange={(e) => handleChange("overlay_opacity", parseFloat(e.target.value))}
                className="w-full h-2 bg-[#FAF6F1] rounded-lg cursor-pointer accent-[#844C36] mt-3"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8D6C5] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2 shadow-luxury-xs"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? d.common.saving : d.design.saveBtn}</span>
            </button>
          </div>
        </form>

        {/* Live Preview Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#392D29] font-semibold">
            <Eye className="w-4 h-4 text-[#844C36]" />
            <span>{adminLang === "tr" ? "Canlı Önizleme" : "Echtzeit-Vorschau"}</span>
          </div>

          <div
            className="relative h-64 sm:h-80 rounded-[1px] overflow-hidden flex items-center justify-center p-6 text-center border border-[#E8D6C5]"
            style={{
              backgroundColor: current.background_color || "#211A18",
            }}
          >
            {current.background_image_desktop && (
              <img
                src={current.background_image_desktop}
                alt="Vorschau"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: current.overlay_color || "#211A18",
                opacity: current.overlay_opacity !== undefined ? current.overlay_opacity : 0.5,
              }}
            />

            <div
              className="relative z-10 space-y-2 max-w-xs"
              style={{ color: current.text_color || "#FFFFFF" }}
            >
              <span className="text-[10px] uppercase tracking-widest block opacity-80 font-bold">
                AURA GLOW
              </span>
              <h3 className="font-editorial text-2xl font-light leading-tight">
                {adminLang === "tr" ? "Güzelliğiniz. Bizim Tutkumuz." : "Deine Schönheit. Unser Anspruch."}
              </h3>
              <p className="text-xs opacity-80 font-light">
                {adminLang === "tr"
                  ? "Kontrast ve okunabilirliği test etmek için örnek metin."
                  : "Beispielhafter Text zur Prüfung von Kontrast und Lesbarkeit."}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#756A63] font-light italic text-center">
            {adminLang === "tr"
              ? "Yazıların arka plan fotoğrafı üzerinde rahat okunup okunmadığını buradan kontrol edebilirsiniz."
              : "Prüfe hier direkt, ob der Kontrast zwischen Text und Hintergrundbild optimal lesbar bleibt."}
          </p>
        </div>
      </div>
    </div>
  );
}
