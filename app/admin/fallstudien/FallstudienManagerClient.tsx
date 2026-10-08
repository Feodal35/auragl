"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Image as ImageIcon,
  Clock3,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Props {
  initialCaseStudies: CaseStudy[];
}

export default function FallstudienManagerClient({ initialCaseStudies }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);
  const cs = d.caseStudies;

  const [items, setItems] = useState<CaseStudy[]>(initialCaseStudies);
  const [editingItem, setEditingItem] = useState<Partial<CaseStudy> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggleActive = async (item: CaseStudy) => {
    const nextStatus = !item.is_active;
    setTogglingId(item.id);

    // Optimistic UI update
    setItems((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, is_active: nextStatus } : x))
    );

    try {
      const res = await fetch(`/api/admin/case-studies/${item.id}`, {
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
            ? "Vaka analizi aktif edildi (ana sayfada görünüyor)."
            : "Fallstudie aktiviert (auf Startseite sichtbar)."
          : adminLang === "tr"
          ? "Vaka analizi pasif edildi."
          : "Fallstudie deaktiviert."
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setItems((prev) =>
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

  const handleEdit = (item: CaseStudy) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleNew = () => {
    const maxOrder = items.reduce((max, i) => Math.max(max, i.display_order || 0), 0);
    setEditingItem({
      tag: `Fallstudie 0${items.length + 1} • Ästhetik`,
      title: "",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      image_alt: "Vorher Nachher Ergebnis Aura Glow",
      problem: "",
      solution: "",
      result: "",
      duration: "ca. 60 Min.",
      longevity: "4-6 Wochen",
      treatment_slug: "gesichtsreinigung-pflege",
      display_order: maxOrder + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmMsg =
      adminLang === "tr"
        ? "Bu vaka analizini silmek istediğinizden emin misiniz?"
        : "Möchtest du diese Fallstudie wirklich löschen?";
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setItems((prev) => prev.filter((x) => x.id !== id));
        setFeedback(cs.deletedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        alert(data.error || d.common.errorSaving);
      }
    } catch (err: any) {
      alert(err?.message || d.common.errorSaving);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    try {
      const isEdit = Boolean(editingItem.id);
      const url = isEdit
        ? `/api/admin/case-studies/${editingItem.id}`
        : `/api/admin/case-studies`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (isEdit) {
          setItems((prev) =>
            prev.map((x) => (x.id === editingItem.id ? data.data : x))
          );
        } else {
          setItems((prev) => [...prev, data.data]);
        }
        setFeedback(cs.savedSuccess);
        setIsModalOpen(false);
        setEditingItem(null);
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
          {adminLang === "tr"
            ? `Toplam ${items.length} vaka analizi kayıtlı`
            : `${items.length} Fallstudien im System`}
        </span>
        <button
          onClick={handleNew}
          className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 shadow-luxury-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{cs.addNew}</span>
        </button>
      </div>

      {/* Case Studies Grid */}
      {items.length === 0 ? (
        <div className="bg-white border border-[#E8D6C5] p-12 text-center text-[#756A63]">
          <p className="text-sm">{cs.noCaseStudies}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8D6C5] rounded-[1px] overflow-hidden shadow-luxury-xs hover:shadow-luxury-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-56 bg-[#FAF6F1] overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.image_alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute("src", "/images/hero-bg.webp");
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold bg-[#392D29]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-[1px]">
                      #{item.display_order}
                    </span>
                    <span className="text-[10px] font-medium bg-white/90 backdrop-blur-xs text-[#392D29] px-2 py-0.5 rounded-[1px] border border-[#E8D6C5]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item)}
                      disabled={togglingId === item.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-md ${
                        item.is_active
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      } ${togglingId === item.id ? "opacity-60 cursor-wait" : ""}`}
                      title={
                        adminLang === "tr"
                          ? "Durumu değiştirmek için tıklayın"
                          : "Klicken zum Umschalten"
                      }
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.is_active ? "bg-white animate-pulse" : "bg-white/70"
                        }`}
                      />
                      <span>{item.is_active ? d.common.active : d.common.inactive}</span>
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white/95 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-[1px]">
                    <span className="flex items-center gap-1">
                      <Clock3 className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.longevity}</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-editorial text-xl text-[#392D29] mb-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Problem / Solution / Result Preview */}
                  <div className="space-y-2.5 text-xs">
                    <div className="bg-[#FAF6F1] p-3 rounded-[1px] border-l-2 border-[#844C36]/60">
                      <span className="block text-[10px] uppercase font-semibold text-[#844C36] mb-0.5">
                        {adminLang === "tr" ? "Başlangıç Durumu" : "Ausgangslage"}
                      </span>
                      <p className="text-[#756A63] line-clamp-2 leading-relaxed">
                        {item.problem}
                      </p>
                    </div>

                    <div className="bg-[#FAF6F1] p-3 rounded-[1px] border-l-2 border-[#844C36]">
                      <span className="block text-[10px] uppercase font-semibold text-[#844C36] mb-0.5">
                        {adminLang === "tr" ? "Uygulanan Tedavi" : "Angewandte Behandlung"}
                      </span>
                      <p className="text-[#756A63] line-clamp-2 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-[1px] border-l-2 border-emerald-600">
                      <span className="block text-[10px] uppercase font-semibold text-emerald-800 mb-0.5">
                        {adminLang === "tr" ? "Elde Edilen Sonuç" : "Ergebnis & Effekt"}
                      </span>
                      <p className="text-emerald-950 line-clamp-2 leading-relaxed">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#FAF6F1]/50 border-t border-[#E8D6C5] flex items-center justify-between">
                <span className="text-[11px] text-[#756A63] font-mono truncate max-w-[150px]">
                  /{item.treatment_slug}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 text-[#392D29] hover:text-[#844C36] hover:bg-white rounded-[1px] transition-colors"
                    title={d.common.edit}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-[1px] transition-colors"
                    title={d.common.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white border border-[#E8D6C5] rounded-[1px] max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D6C5]">
              <h2 className="font-editorial text-2xl text-[#392D29]">
                {editingItem.id ? cs.editModalTitle : cs.newModalTitle}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#756A63] hover:text-[#392D29]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Tag & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {cs.fieldTag} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.tag || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tag: e.target.value })
                    }
                    placeholder="Fallstudie 01 • Gesichtsästhetik"
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {cs.fieldTitle} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    placeholder="Hollywood Glow Behandlung"
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {cs.fieldImage} *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.image || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/... oder /images/..."
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
                <p className="text-[11px] text-[#756A63] mt-1">
                  {adminLang === "tr"
                    ? "Görsel doğrudan ana sayfadaki Vorher & Nachher kartında görünecektir."
                    : "Wird direkt auf der Startseite in der Vorher & Nachher Sektion angezeigt."}
                </p>

                {/* Real-time Preview */}
                {editingItem.image && (
                  <div className="mt-2.5 relative h-48 rounded-[1px] overflow-hidden border border-[#E8D6C5] bg-[#FAF6F1]">
                    <img
                      src={editingItem.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-[1px]">
                      {cs.previewTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Image Alt */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {cs.fieldImageAlt}
                </label>
                <input
                  type="text"
                  value={editingItem.image_alt || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, image_alt: e.target.value })
                  }
                  placeholder="Vorher Nachher Ergebnis Aura Glow Peine"
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Problem / Ausgangslage */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {cs.fieldProblem} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.problem || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, problem: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Solution / Angewandte Behandlung */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {cs.fieldSolution} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.solution || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, solution: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Result / Ergebnis & Effekt */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {cs.fieldResult} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.result || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, result: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Duration & Longevity & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {cs.fieldDuration}
                  </label>
                  <input
                    type="text"
                    value={editingItem.duration || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, duration: e.target.value })
                    }
                    placeholder="ca. 75 Min."
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {cs.fieldLongevity}
                  </label>
                  <input
                    type="text"
                    value={editingItem.longevity || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, longevity: e.target.value })
                    }
                    placeholder="4-6 Wochen"
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {adminLang === "tr" ? "Tedavi Slug'ı" : "Behandlung Slug"}
                  </label>
                  <input
                    type="text"
                    value={editingItem.treatment_slug || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, treatment_slug: e.target.value })
                    }
                    placeholder="gesichtsreinigung-pflege"
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#756A63] mb-1">
                    {cs.fieldOrder}
                  </label>
                  <input
                    type="number"
                    value={editingItem.display_order ?? 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        display_order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                  />
                </div>

                <div className="sm:pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active !== undefined ? editingItem.is_active : true}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, is_active: e.target.checked })
                      }
                      className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                    />
                    <span className="text-xs text-[#392D29]">
                      {cs.fieldStatus}
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8D6C5] flex justify-end gap-3">
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
