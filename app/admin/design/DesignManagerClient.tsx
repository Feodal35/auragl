"use client";

import React, { useState } from "react";
import { DesignSectionSetting } from "@/lib/types";
import { Save, CheckCircle2, RotateCcw, Eye } from "lucide-react";

interface Props {
  initialDesign: Record<string, DesignSectionSetting>;
}

export default function DesignManagerClient({ initialDesign }: Props) {
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
        setFeedback(`Design für '${activeSection}' gespeichert.`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  const sectionsList = [
    { id: "hero", label: "Startseite Hero" },
    { id: "intro", label: "Startseite Einleitung" },
    { id: "philosophy", label: "Startseite Philosophie" },
    { id: "appointment_cta", label: "Terminabschluss CTA" },
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
                ? "bg-[#B88770] text-white shadow-luxury-sm"
                : "bg-white text-[#756A63] hover:text-[#392D29] border border-[#E8D6C5]"
            }`}
          >
            {sec.label}
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
              Desktop Hintergrundbild URL
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
              Mobiles Hintergrundbild URL (optional)
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
                Hintergrundfarbe (Fallback)
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
                Textfarbe
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
                Overlay-Farbe
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
                Overlay-Deckkraft: {Math.round((current.overlay_opacity || 0) * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={current.overlay_opacity !== undefined ? current.overlay_opacity : 0.5}
                onChange={(e) => handleChange("overlay_opacity", parseFloat(e.target.value))}
                className="w-full h-2 bg-[#FAF6F1] rounded-lg cursor-pointer accent-[#B88770] mt-3"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8D6C5] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Wird gespeichert..." : "Design speichern"}</span>
            </button>
          </div>
        </form>

        {/* Live Preview Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#392D29] font-medium">
            <Eye className="w-4 h-4 text-[#B88770]" />
            <span>Echtzeit-Vorschau</span>
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
              <span className="text-[10px] uppercase tracking-widest block opacity-80">
                AURA GLOW
              </span>
              <h3 className="font-editorial text-2xl font-light leading-tight">
                Deine Schönheit. Unser Anspruch.
              </h3>
              <p className="text-xs opacity-80 font-light">
                Beispielhafter Text zur Prüfung von Kontrast und Lesbarkeit.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#756A63] font-light italic text-center">
            Prüfe hier direkt, ob der Kontrast zwischen Text und Hintergrundbild optimal lesbar bleibt.
          </p>
        </div>
      </div>
    </div>
  );
}
