"use client";

import React, { useState } from "react";
import { ContentSection } from "@/lib/types";
import { Save, CheckCircle2 } from "lucide-react";

interface Props {
  initialSections: Record<string, ContentSection>;
}

export default function ContentManagerClient({ initialSections }: Props) {
  const [sections, setSections] = useState<Record<string, ContentSection>>(initialSections);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const current = sections[activeTab] || {
    section_id: activeTab,
    title: "",
    eyebrow: "",
    headline: "",
    body_text: "",
    primary_cta_label: "",
    primary_cta_url: "",
    secondary_cta_label: "",
    secondary_cta_url: "",
  };

  const handleChange = (field: keyof ContentSection, val: string) => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: val,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
      if (res.ok) {
        setFeedback(`Abschnitt '${activeTab}' erfolgreich gespeichert.`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero (Startseite)" },
    { id: "intro", label: "Einleitung & Philosophie" },
    { id: "philosophy", label: "Studio-Leitgedanke" },
    { id: "about_murvet", label: "Über Mürvet" },
    { id: "appointment_cta", label: "Abschluss-CTA" },
  ];

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8D6C5] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs uppercase tracking-wider px-4 py-2 font-medium transition-colors rounded-[1px] ${
              activeTab === tab.id
                ? "bg-[#B88770] text-white shadow-luxury-sm"
                : "bg-white text-[#756A63] hover:text-[#392D29] border border-[#E8D6C5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 space-y-6 shadow-luxury-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Eyebrow / Dachzeile
            </label>
            <input
              type="text"
              value={current.eyebrow || ""}
              onChange={(e) => handleChange("eyebrow", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Interner Titel
            </label>
            <input
              type="text"
              value={current.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
            Hauptüberschrift (Headline, Umbrüche mit Zeilenwechsel möglich)
          </label>
          <textarea
            rows={2}
            value={current.headline || ""}
            onChange={(e) => handleChange("headline", e.target.value)}
            className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
            Fließtext / Beschreibung
          </label>
          <textarea
            rows={4}
            value={current.body_text || ""}
            onChange={(e) => handleChange("body_text", e.target.value)}
            className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] leading-relaxed resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E8D6C5]/50">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Primärer Button-Text
            </label>
            <input
              type="text"
              value={current.primary_cta_label || ""}
              onChange={(e) => handleChange("primary_cta_label", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Primärer Button-Link (z. B. /termin)
            </label>
            <input
              type="text"
              value={current.primary_cta_url || ""}
              onChange={(e) => handleChange("primary_cta_url", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>
        </div>

        {(activeTab === "hero" || activeTab === "appointment_cta") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                Sekundärer Button-Text
              </label>
              <input
                type="text"
                value={current.secondary_cta_label || ""}
                onChange={(e) => handleChange("secondary_cta_label", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
                Sekundärer Button-Link (z. B. /leistungen)
              </label>
              <input
                type="text"
                value={current.secondary_cta_url || ""}
                onChange={(e) => handleChange("secondary_cta_url", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#E8D6C5] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Wird gespeichert..." : "Änderungen veröffentlichen"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
