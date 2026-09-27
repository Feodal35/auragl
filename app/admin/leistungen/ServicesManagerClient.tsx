"use client";

import React, { useState } from "react";
import { ServiceItem, ServiceCategory } from "@/lib/types";
import { Plus, Pencil, Trash2, CheckCircle2, Clock3, Sparkles, X, Save, AlertCircle } from "lucide-react";

interface Props {
  initialServices: ServiceItem[];
  categories: ServiceCategory[];
}

export default function ServicesManagerClient({ initialServices, categories }: Props) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (service: ServiceItem) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingService({
      category_id: categories[0]?.id || 1,
      title: "",
      slug: "",
      short_description: "",
      full_description: "",
      featured_image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
      duration_minutes: 60,
      price_display: "ab 50 €",
      price: 50,
      is_featured: false,
      is_active: true,
      display_order: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Möchtest du diese Behandlung wirklich unwiderruflich löschen?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        setFeedback("Behandlung gelöscht.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Löschen.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setLoading(true);

    try {
      const url = editingService.id
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services";
      const method = editingService.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (editingService.id) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? data.data : s))
          );
          setFeedback("Behandlung aktualisiert.");
        } else {
          setServices((prev) => [...prev, data.data]);
          setFeedback("Neue Behandlung angelegt.");
        }
        setIsModalOpen(false);
        setEditingService(null);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert("Fehler beim Speichern der Behandlung.");
    } finally {
      setLoading(false);
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
        <span className="text-xs text-[#756A63]">
          {services.length} Behandlungen im System
        </span>
        <button
          onClick={handleNew}
          className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4"
        >
          <Plus className="w-4 h-4" />
          <span>Neue Behandlung hinzufügen</span>
        </button>
      </div>

      {/* Services Table / Grid */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E8D6C5] text-[#756A63] uppercase tracking-wider bg-[#FAF6F1]">
            <tr>
              <th className="py-3 px-4">Bild</th>
              <th className="py-3 px-4">Titel &amp; Kategorie</th>
              <th className="py-3 px-4">Dauer</th>
              <th className="py-3 px-4">Preis</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8D6C5]/50">
            {services.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAF6F1] transition-colors">
                <td className="py-3 px-4">
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-[1px] border border-[#E8D6C5]"
                  />
                </td>
                <td className="py-3 px-4">
                  <strong className="text-sm text-[#392D29] block">{item.title}</strong>
                  <span className="text-[11px] text-[#756A63]">
                    {categories.find((c) => c.id === item.category_id)?.name || "Kategorie"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#756A63]">{item.duration_minutes} Min.</td>
                <td className="py-3 px-4 font-medium text-[#392D29]">{item.price_display}</td>
                <td className="py-3 px-4">
                  {item.is_featured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#B88770] font-medium bg-[#FAF6F1] px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#756A63]">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                      item.is_active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.is_active ? "Aktiv" : "Inaktiv"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 text-[#392D29] hover:text-[#B88770] hover:bg-[#FAF6F1] rounded-[1px] transition-colors"
                    title="Bearbeiten"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-[1px] transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white border border-[#E8D6C5] rounded-[1px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D6C5]">
              <h2 className="font-editorial text-2xl text-[#392D29]">
                {editingService.id ? "Behandlung bearbeiten" : "Neue Behandlung anlegen"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#756A63] hover:text-[#392D29]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    Kategorie
                  </label>
                  <select
                    value={editingService.category_id}
                    onChange={(e) =>
                      setEditingService({ ...editingService, category_id: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    Behandlungstitel
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ""}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        title: e.target.value,
                        slug: editingService.id
                          ? editingService.slug
                          : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    Preisanzeige (z.B. &quot;ab 60 €&quot;)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.price_display || ""}
                    onChange={(e) =>
                      setEditingService({ ...editingService, price_display: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    Numerischer Preis (€)
                  </label>
                  <input
                    type="number"
                    value={editingService.price || 0}
                    onChange={(e) =>
                      setEditingService({ ...editingService, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    Dauer (Minuten)
                  </label>
                  <input
                    type="number"
                    value={editingService.duration_minutes || 60}
                    onChange={(e) =>
                      setEditingService({ ...editingService, duration_minutes: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  Bild-URL (z. B. Unsplash oder Mediathek)
                </label>
                <input
                  type="url"
                  required
                  value={editingService.featured_image || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, featured_image: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  Kurzbeschreibung (Übersicht)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.short_description || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, short_description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  Ausführliche Beschreibung (Detail)
                </label>
                <textarea
                  rows={3}
                  value={editingService.full_description || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, full_description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.is_featured || false}
                    onChange={(e) =>
                      setEditingService({ ...editingService, is_featured: e.target.checked })
                    }
                    className="h-4 w-4 text-[#B88770] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">Auf Startseite hervorheben (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.is_active !== undefined ? editingService.is_active : true}
                    onChange={(e) =>
                      setEditingService({ ...editingService, is_active: e.target.checked })
                    }
                    className="h-4 w-4 text-[#B88770] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">Öffentlich sichtbar (Aktiv)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8D6C5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingService.id ? "Änderungen speichern" : "Behandlung anlegen"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
