"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BusinessSettings, OpeningHour } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Save, CheckCircle2 } from "lucide-react";

interface Props {
  initialBusiness: BusinessSettings;
  initialHours: OpeningHour[];
}

export default function SettingsManagerClient({ initialBusiness, initialHours }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [business, setBusiness] = useState<BusinessSettings>(initialBusiness);
  const [hours, setHours] = useState<OpeningHour[]>(initialHours);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const dayTranslations: Record<string, string> = {
    Montag: "Pazartesi",
    Dienstag: "Salı",
    Mittwoch: "Çarşamba",
    Donnerstag: "Perşembe",
    Freitag: "Cuma",
    Samstag: "Cumartesi",
    Sonntag: "Pazar",
  };

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
        setFeedback(d.settings.savedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorSaving);
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
          {adminLang === "tr" ? "Stüdyo Bilgileri & İletişim" : "Unternehmensdaten & Kontakt"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              {adminLang === "tr" ? "Stüdyo Adı" : "Name des Studios"}
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
              {adminLang === "tr" ? "İşletme Sahibi" : "Inhaberin"}
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
              {adminLang === "tr" ? "Cadde ve Sokak No" : "Straße und Hausnummer"}
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
              {adminLang === "tr" ? "Posta Kodu & Şehir" : "PLZ & Stadt"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={business.postal_code}
                onChange={(e) => setBusiness({ ...business, postal_code: e.target.value })}
                placeholder="31224"
                className="w-24 px-3 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
              <input
                type="text"
                value={business.city}
                onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                placeholder="Peine"
                className="flex-1 px-3 py-2.5 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#E8D6C5]/50">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1.5">
              {d.settings.fieldPhone}
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
              {adminLang === "tr" ? "WhatsApp Numarası (Ülke koduyla)" : "WhatsApp-Nummer (mit Ländervorwahl)"}
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
              {d.settings.fieldEmail}
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
              {adminLang === "tr" ? "Instagram Profil Bağlantısı" : "Instagram Profil URL"}
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
              {adminLang === "tr" ? "Google Haritalar Konum Bağlantısı" : "Google Maps Standort URL"}
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
          {d.settings.hoursTitle}
        </h2>

        <div className="space-y-3">
          {hours.map((h) => {
            const dayLabel = adminLang === "tr" && dayTranslations[h.day_name]
              ? dayTranslations[h.day_name]
              : h.day_name;

            return (
              <div
                key={h.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#FAF6F1] border border-[#E8D6C5]/60 rounded-[1px]"
              >
                <span className="text-xs font-semibold text-[#392D29] w-32">{dayLabel}</span>

                <div className="flex items-center gap-4 flex-1">
                  <label className="flex items-center gap-1.5 text-xs text-[#756A63] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={h.is_closed}
                      onChange={(e) => handleHourChange(h.id, "is_closed", e.target.checked)}
                      className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                    />
                    <span>{d.settings.closed}</span>
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
                      <span>-</span>
                      <input
                        type="text"
                        value={h.close_time || ""}
                        onChange={(e) => handleHourChange(h.id, "close_time", e.target.value)}
                        placeholder="19:00"
                        className="w-20 px-2 py-1 bg-white border border-[#E8D6C5] rounded-[1px] text-center"
                      />
                      <span>{adminLang === "tr" ? "" : "Uhr"}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={h.custom_label || ""}
                      onChange={(e) => handleHourChange(h.id, "custom_label", e.target.value)}
                      placeholder={adminLang === "tr" ? "Örn: Sadece randevu ile" : "z. B. Nur nach Vereinbarung"}
                      className="flex-1 px-3 py-1 bg-white border border-[#E8D6C5] rounded-[1px] text-xs text-[#756A63]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary text-xs py-3 px-8 inline-flex items-center gap-2 shadow-luxury-xs"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? d.common.saving : d.settings.saveBtn}</span>
        </button>
      </div>
    </form>
  );
}
