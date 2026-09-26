"use client";

import React, { useState } from "react";
import { BusinessSettings, OpeningHour } from "@/lib/types";
import { Save, CheckCircle2 } from "lucide-react";

interface Props {
  initialBusiness: BusinessSettings;
  initialHours: OpeningHour[];
}

export default function SettingsManagerClient({ initialBusiness, initialHours }: Props) {
  const [business, setBusiness] = useState<BusinessSettings>(initialBusiness);
  const [hours, setHours] = useState<OpeningHour[]>(initialHours);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleHourChange = (id: number, field: keyof OpeningHour, val: any) => {
    setHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: val } : h))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, hours }),
      });
      if (res.ok) {
        setFeedback("Einstellungen erfolgreich gespeichert.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern der Einstellungen.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Business Details Card */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 space-y-6 shadow-luxury-sm">
        <h2 className="font-editorial text-2xl text-[#392D29] pb-3 border-b border-[#E8D6C5]">
          Unternehmensdaten &amp; Kontakt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Name des Studios
            </label>
            <input
              type="text"
              required
              value={business.business_name}
              onChange={(e) => setBusiness({ ...business, business_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Inhaberin
            </label>
            <input
              type="text"
              required
              value={business.owner_name}
              onChange={(e) => setBusiness({ ...business, owner_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Straße und Hausnummer
            </label>
            <input
              type="text"
              value={business.street}
              onChange={(e) => setBusiness({ ...business, street: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              PLZ &amp; Stadt
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={business.postal_code}
                onChange={(e) => setBusiness({ ...business, postal_code: e.target.value })}
                placeholder="40212"
                className="w-24 px-3 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
              <input
                type="text"
                value={business.city}
                onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                placeholder="Düsseldorf"
                className="flex-1 px-3 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#E8D6C5]/50">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Telefonnummer (Anzeige)
            </label>
            <input
              type="text"
              value={business.phone_display || business.phone}
              onChange={(e) =>
                setBusiness({
                  ...business,
                  phone_display: e.target.value,
                  phone: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              WhatsApp-Nummer (mit Ländervorwahl)
            </label>
            <input
              type="text"
              value={business.whatsapp}
              onChange={(e) => setBusiness({ ...business, whatsapp: e.target.value })}
              placeholder="+49176..."
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={business.email}
              onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E8D6C5]/50">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Instagram Profil URL
            </label>
            <input
              type="url"
              value={business.instagram_url}
              onChange={(e) => setBusiness({ ...business, instagram_url: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              Google Maps Standort URL
            </label>
            <input
              type="url"
              value={business.google_maps_url || ""}
              onChange={(e) => setBusiness({ ...business, google_maps_url: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
            />
          </div>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 space-y-6 shadow-luxury-sm">
        <h2 className="font-editorial text-2xl text-[#392D29] pb-3 border-b border-[#E8D6C5]">
          Reguläre Öffnungszeiten
        </h2>

        <div className="space-y-3">
          {hours.map((h) => (
            <div
              key={h.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#FAF6F1] border border-[#E8D6C5]/60 rounded-[1px]"
            >
              <span className="text-xs font-medium text-[#392D29] w-32">{h.day_name}</span>

              <div className="flex items-center gap-4 flex-1">
                <label className="flex items-center gap-1.5 text-xs text-[#756A63] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={h.is_closed}
                    onChange={(e) => handleHourChange(h.id, "is_closed", e.target.checked)}
                    className="h-4 w-4 text-[#B88770] rounded border-[#E8D6C5]"
                  />
                  <span>Geschlossen</span>
                </label>

                {!h.is_closed ? (
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="text"
                      value={h.open_time || ""}
                      onChange={(e) => handleHourChange(h.id, "open_time", e.target.value)}
                      placeholder="09:00"
                      className="w-20 px-2 py-1 bg-white border border-[#E8D6C5] rounded-[1px] text-center"
                    />
                    <span>bis</span>
                    <input
                      type="text"
                      value={h.close_time || ""}
                      onChange={(e) => handleHourChange(h.id, "close_time", e.target.value)}
                      placeholder="19:00"
                      className="w-20 px-2 py-1 bg-white border border-[#E8D6C5] rounded-[1px] text-center"
                    />
                    <span>Uhr</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={h.custom_label || ""}
                    onChange={(e) => handleHourChange(h.id, "custom_label", e.target.value)}
                    placeholder="z. B. Nur nach Vereinbarung"
                    className="flex-1 px-3 py-1 bg-white border border-[#E8D6C5] rounded-[1px] text-xs text-[#756A63]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary text-xs py-3 px-8 inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Wird gespeichert..." : "Alle Einstellungen speichern"}</span>
        </button>
      </div>
    </form>
  );
}
