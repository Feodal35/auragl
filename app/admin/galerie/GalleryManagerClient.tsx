"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GalleryItem } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Plus, Trash2, CheckCircle2, X, Save } from "lucide-react";

interface Props {
  initialItems: GalleryItem[];
}

export default function GalleryManagerClient({ initialItems }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    image_url: "",
    caption: "",
    category: "Wimpern",
    is_active: true,
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggleActive = async (item: GalleryItem) => {
    const nextStatus = item.is_active === false ? true : false;
    setTogglingId(item.id);

    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_active: nextStatus } : i))
    );

    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Fehler");
      }
      setFeedback(
        nextStatus
          ? (adminLang === "tr" ? "Görsel aktif edildi." : "Bild aktiviert.")
          : (adminLang === "tr" ? "Görsel pasif edildi." : "Bild deaktiviert.")
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      // Revert on error
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_active: item.is_active } : i))
      );
      alert(
        adminLang === "tr"
          ? "Durum güncellenirken hata oluştu: " + err.message
          : "Fehler beim Umschalten: " + err.message
      );
    } finally {
      setTogglingId(null);
    }
  };

  const categoryOptions = [
    { de: "Wimpern", tr: "Kirpik / İpek Kirpik" },
    { de: "Gesichtsreinigung & Pflege", tr: "Cilt Bakımı & Temizlik" },
    { de: "Permanent Make-up", tr: "Kalıcı Makyaj" },
    { de: "Studio", tr: "Stüdyo & Ambiyans" },
  ];

  const handleDelete = async (id: number) => {
    if (!confirm(d.common.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setFeedback(d.gallery.deletedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorDeleting);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image_url) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setItems((prev) => [...prev, data.data]);
        setIsModalOpen(false);
        setNewItem({ image_url: "", caption: "", category: "Wimpern", is_active: true });
        setFeedback(d.gallery.savedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        alert(data.error || d.common.errorSaving);
      }
    } catch (err: any) {
      alert(err?.message || d.common.errorSaving);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border border-[#E8D6C5] rounded-[1px] gap-3">
        <span className="text-xs text-[#756A63]">
          {d.gallery.totalCount.replace("{count}", String(items.length))}
        </span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 shadow-luxury-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{d.gallery.uploadBtn}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white border border-[#E8D6C5] rounded-[1px] overflow-hidden shadow-luxury-sm flex flex-col justify-between"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#FAF6F1]">
              <img
                src={item.image_url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#844C36] font-semibold block">
                {categoryOptions.find((c) => c.de === item.category)?.[adminLang] || item.category}
              </span>
              <p className="text-xs text-[#392D29] font-medium line-clamp-2">{item.caption}</p>
              <div className="pt-2 border-t border-[#E8D6C5]/50 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleToggleActive(item)}
                  disabled={togglingId === item.id}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                    item.is_active !== false
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                      : "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                  } ${togglingId === item.id ? "opacity-60 cursor-wait" : ""}`}
                  title={
                    adminLang === "tr"
                      ? "Durumu değiştirmek için tıklayın (Aktif/Pasif)"
                      : "Klicken zum Umschalten (Aktiv/Inaktiv)"
                  }
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.is_active !== false ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
                    }`}
                  />
                  <span>{item.is_active !== false ? d.common.active : d.common.inactive}</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-[1px]"
                  title={d.common.delete}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8D6C5] rounded-[1px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D6C5]">
              <h2 className="font-editorial text-2xl text-[#392D29]">
                {d.gallery.uploadBtn}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#756A63]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  {d.gallery.fieldCategory}
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.de} value={c.de}>
                      {c[adminLang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  {d.gallery.fieldImageUrl}
                </label>
                <input
                  type="url"
                  required
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  {d.gallery.fieldCaption}
                </label>
                <input
                  type="text"
                  required
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  placeholder={adminLang === "tr" ? "Örn: Klasik İpek Kirpik 1:1" : "z. B. Klassische Wimpern 1:1"}
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8D6C5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  {d.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{d.common.add}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
