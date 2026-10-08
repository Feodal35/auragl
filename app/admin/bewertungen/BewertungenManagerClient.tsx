"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Quote,
  Eye,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

interface Props {
  initialTestimonials: Testimonial[];
}

export default function BewertungenManagerClient({ initialTestimonials }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);
  const t = d.testimonials;

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggleActive = async (item: Testimonial) => {
    const nextStatus = !item.is_active;
    setTogglingId(item.id);

    // Optimistic UI update
    setTestimonials((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, is_active: nextStatus } : x))
    );

    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
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
          ? adminLang === "tr"
            ? "Yorum aktif edildi (ana sayfada görünüyor)."
            : "Bewertung aktiviert (auf Startseite sichtbar)."
          : adminLang === "tr"
          ? "Yorum pasif edildi."
          : "Bewertung deaktiviert."
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      // Revert optimistic update
      setTestimonials((prev) =>
        prev.map((x) => (x.id === item.id ? { ...x, is_active: item.is_active } : x))
      );
      alert(
        adminLang === "tr"
          ? "Durum güncellenirken hata: " + err.message
          : "Fehler beim Umschalten: " + err.message
      );
    } finally {
      setTogglingId(null);
    }
  };

  const handleNew = () => {
    setEditingItem({
      name: "",
      location: "Peine",
      treatment: "Wimpern-Neumodellage (1:1 Methode)",
      text: "",
      rating: 5,
      date: "Vor Kurzem",
      is_verified: true,
      display_order: testimonials.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(d.common.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((x) => x.id !== id));
        setFeedback(t.deletedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorDeleting);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    try {
      const isEdit = Boolean(editingItem.id);
      const url = isEdit
        ? `/api/admin/testimonials/${editingItem.id}`
        : `/api/admin/testimonials`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Fehler beim Speichern");
      }

      if (isEdit) {
        setTestimonials((prev) =>
          prev.map((x) => (x.id === data.data.id ? data.data : x))
        );
      } else {
        setTestimonials((prev) => [...prev, data.data]);
      }

      setFeedback(t.savedSuccess);
      setIsModalOpen(false);
      setEditingItem(null);
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || d.common.errorSaving);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 border border-[#E8D6C5] rounded-[2px] shadow-luxury-sm">
        <div>
          <h2 className="font-editorial text-2xl text-[#392D29]">{t.title}</h2>
          <p className="text-xs sm:text-sm text-[#756A63] font-light mt-0.5">
            {t.subtitle} &bull;{" "}
            <span className="font-medium text-[#844C36]">
              {testimonials.filter((x) => x.is_active).length} aktiv auf Startseite
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#844C36] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#6e3f2d] transition-colors rounded-[1px] shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNew}</span>
        </button>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-[2px] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-2 text-center py-16 bg-white border border-[#E8D6C5] rounded-[2px]">
            <Quote className="w-10 h-10 text-[#E8D6C5] mx-auto mb-3" />
            <p className="text-sm text-[#756A63]">{t.noTestimonials}</p>
          </div>
        ) : (
          testimonials.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-[2px] p-6 shadow-luxury-sm transition-all duration-200 flex flex-col justify-between ${
                item.is_active
                  ? "border-[#E8D6C5] hover:border-[#844C36]/60"
                  : "border-gray-200 opacity-60 bg-gray-50/50"
              }`}
            >
              <div>
                {/* Header row: Status toggle, rating stars, actions */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8D6C5]/40">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={togglingId === item.id}
                      onClick={() => handleToggleActive(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
                        item.is_active
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      title={item.is_active ? "Klicken zum Deaktivieren" : "Klicken zum Aktivieren"}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.is_active ? "bg-emerald-600" : "bg-gray-400"
                        }`}
                      />
                      <span>{item.is_active ? d.common.active : d.common.inactive}</span>
                    </button>

                    <span className="text-[11px] text-[#756A63] font-light">
                      #{item.display_order}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#844C36]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating
                            ? "fill-[#844C36] text-[#844C36]"
                            : "text-gray-300 fill-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-editorial text-base text-[#392D29] italic leading-relaxed mb-4">
                  &bdquo;{item.text}&ldquo;
                </p>
              </div>

              {/* Author & Footer */}
              <div className="pt-4 border-t border-[#E8D6C5]/40 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#392D29]">{item.name}</span>
                    {item.is_verified && (
                      <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                        Verifiziert
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#756A63] font-light block mt-0.5">
                    {item.location} &bull; {item.date}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#844C36] font-medium block mt-1">
                    {item.treatment}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="p-2 text-[#756A63] hover:text-[#844C36] hover:bg-[#FAF6F1] rounded-[2px] transition-colors cursor-pointer"
                    title={d.common.edit}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-[#756A63] hover:text-red-700 hover:bg-red-50 rounded-[2px] transition-colors cursor-pointer"
                    title={d.common.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / New Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E8D6C5] rounded-[2px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E8D6C5] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#844C36]" />
                <h3 className="font-editorial text-xl text-[#392D29]">
                  {editingItem.id ? t.editModalTitle : t.newModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#756A63] hover:text-[#392D29] hover:bg-[#FAF6F1] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-5">
              {/* Author name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="z. B. Laura S."
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldLocation}
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="z. B. Peine"
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
              </div>

              {/* Treatment & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldTreatment} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.treatment || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, treatment: e.target.value })}
                    placeholder="z. B. Wimpern-Neumodellage (1:1)"
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldDate}
                  </label>
                  <input
                    type="text"
                    value={editingItem.date || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="z. B. Vor 2 Wochen"
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
              </div>

              {/* Rating stars & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldRating}
                  </label>
                  <div className="flex items-center gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                        title={`${star} Sterne`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (editingItem.rating || 5) >= star
                              ? "fill-[#844C36] text-[#844C36]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-[#844C36] ml-2">
                      {editingItem.rating || 5} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                    {t.fieldOrder}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingItem.display_order ?? 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        display_order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-[#392D29] uppercase tracking-wider mb-1.5">
                  {t.fieldText} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingItem.text || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                  placeholder="Erfahrungsbericht der Kundin eingeben..."
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-sm text-[#392D29] rounded-[1px] focus:outline-hidden focus:border-[#844C36] leading-relaxed"
                />
              </div>

              {/* Toggles: Verified & Active */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingItem.is_verified ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_verified: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#844C36] cursor-pointer"
                  />
                  <span className="text-xs text-[#392D29] font-medium">{t.fieldVerified}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingItem.is_active ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_active: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#844C36] cursor-pointer"
                  />
                  <span className="text-xs text-[#392D29] font-medium">{t.fieldStatus}</span>
                </label>
              </div>

              {/* Live Preview Box */}
              <div className="mt-4 p-4 bg-[#F7F3EE] border border-[#E8D6C5] rounded-[2px]">
                <span className="text-[10px] uppercase tracking-widest text-[#844C36] font-semibold block mb-2 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {t.previewTitle}
                </span>
                <p className="font-editorial text-base text-[#392D29] italic leading-relaxed mb-3">
                  &bdquo;{editingItem.text || "Vorschau des Bewertungstextes..."}&ldquo;
                </p>
                <div className="flex items-center justify-between text-xs text-[#756A63]">
                  <span className="font-semibold text-[#392D29]">
                    {editingItem.name || "Kundin"} ({editingItem.location || "Peine"})
                  </span>
                  <span className="text-[#844C36] uppercase font-medium text-[10px]">
                    {editingItem.treatment || "Behandlung"}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8D6C5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E8D6C5] text-xs uppercase tracking-wider text-[#756A63] hover:text-[#392D29] hover:bg-[#FAF6F1] transition-colors rounded-[1px] cursor-pointer"
                >
                  {d.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#844C36] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#6e3f2d] transition-colors rounded-[1px] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? d.common.saving : d.common.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
