"use client";

import React, { useState } from "react";
import { GalleryItem } from "@/lib/types";
import { Plus, Trash2, CheckCircle2, X, Save } from "lucide-react";

interface Props {
  initialItems: GalleryItem[];
}

export default function GalleryManagerClient({ initialItems }: Props) {
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

  const categories = ["Wimpern", "Gesichtsreinigung & Pflege", "Permanent Make-up", "Studio"];

  const handleDelete = async (id: number) => {
    if (!confirm("Möchtest du dieses Bild wirklich aus der Galerie entfernen?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setFeedback("Bild aus Galerie gelöscht.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Löschen.");
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
        setFeedback("Neues Galeriebild hinzugefügt.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern.");
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
      <div className="flex justify-between items-center bg-white p-4 border border-[#E8D6C5] rounded-[1px]">
        <span className="text-xs text-[#756A63]">{items.length} Bilder veröffentlicht</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4"
        >
          <Plus className="w-4 h-4" />
          <span>Neues Bild hinzufügen</span>
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
              <span className="text-[10px] uppercase tracking-wider text-[#B88770] font-medium block">
                {item.category}
              </span>
              <p className="text-xs text-[#392D29] font-medium line-clamp-2">{item.caption}</p>
              <div className="pt-2 border-t border-[#E8D6C5]/50 flex justify-between items-center">
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Aktiv
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-[1px]"
                  title="Löschen"
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
              <h2 className="font-editorial text-2xl text-[#392D29]">Neues Galeriebild</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#756A63]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  Kategorie
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  Bild-URL
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
                  Bildunterschrift / Caption
                </label>
                <input
                  type="text"
                  required
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  placeholder="z. B. Klassische Wimpern 1:1"
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8D6C5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Hinzufügen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
