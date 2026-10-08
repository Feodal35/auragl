"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceItem, ServiceCategory } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Plus, Pencil, Trash2, CheckCircle2, Clock3, Sparkles, X, Save, AlertCircle, Image as ImageIcon } from "lucide-react";

interface Props {
  initialServices: ServiceItem[];
  categories: ServiceCategory[];
}

export default function ServicesManagerClient({ initialServices, categories }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [activeTab, setActiveTab] = useState<"services" | "categories">("services");
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [categoryList, setCategoryList] = useState<ServiceCategory[]>(categories);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<ServiceCategory> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [catSaving, setCatSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [togglingCatId, setTogglingCatId] = useState<number | null>(null);

  const handleToggleCategoryActive = async (cat: ServiceCategory) => {
    const nextStatus = !cat.is_active;
    setTogglingCatId(cat.id);
    setCategoryList((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, is_active: nextStatus } : c))
    );

    try {
      const res = await fetch(`/api/admin/categories/${cat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Fehler");
      setFeedback(
        nextStatus
          ? adminLang === "tr" ? "Kategori aktif edildi." : "Kategorie aktiviert."
          : adminLang === "tr" ? "Kategori pasif edildi." : "Kategorie deaktiviert."
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setCategoryList((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, is_active: cat.is_active } : c))
      );
      alert("Fehler: " + err.message);
    } finally {
      setTogglingCatId(null);
    }
  };

  const handleEditCategory = (cat: ServiceCategory) => {
    setEditingCategory({ ...cat });
    setIsCatModalOpen(true);
  };

  const handleSaveCategoryModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.id) return;
    setCatSaving(true);
    try {
      const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Fehler beim Speichern");
      setCategoryList((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? data.data : c))
      );
      setFeedback(d.services.categorySavedSuccess);
      setIsCatModalOpen(false);
      setEditingCategory(null);
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || d.common.errorSaving);
    } finally {
      setCatSaving(false);
    }
  };

  const handleToggleActive = async (service: ServiceItem) => {
    const nextStatus = !service.is_active;
    setTogglingId(service.id);

    // Optimistic UI update
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, is_active: nextStatus } : s))
    );

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
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
          ? (adminLang === "tr" ? "Hizmet aktif edildi." : "Behandlung aktiviert.")
          : (adminLang === "tr" ? "Hizmet pasif edildi." : "Behandlung deaktiviert.")
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      // Revert optimistic update on error
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, is_active: service.is_active } : s))
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
    if (!confirm(d.common.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        setFeedback(d.services.deletedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorDeleting);
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
          setFeedback(d.services.savedSuccess);
        } else {
          setServices((prev) => [...prev, data.data]);
          setFeedback(d.services.savedSuccess);
        }
        setIsModalOpen(false);
        setEditingService(null);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        alert(data.error || d.common.errorSaving);
      }
    } catch (err: any) {
      alert(err?.message || d.common.errorSaving);
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

      {/* Tabs Switcher */}
      <div className="flex border-b border-[#E8D6C5] gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "services"
              ? "border-[#844C36] text-[#844C36] font-semibold"
              : "border-transparent text-[#756A63] hover:text-[#392D29]"
          }`}
        >
          <span>{d.services.tabServices}</span>
          <span className="text-xs bg-[#FAF6F1] px-2 py-0.5 rounded-full border border-[#E8D6C5]">
            {services.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "categories"
              ? "border-[#844C36] text-[#844C36] font-semibold"
              : "border-transparent text-[#756A63] hover:text-[#392D29]"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>{d.services.tabCategories}</span>
          <span className="text-xs bg-[#FAF6F1] px-2 py-0.5 rounded-full border border-[#E8D6C5]">
            {categoryList.length}
          </span>
        </button>
      </div>

      {activeTab === "services" ? (
        <>
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border border-[#E8D6C5] rounded-[1px] gap-3">
            <span className="text-xs text-[#756A63]">
              {d.services.totalCount.replace("{count}", String(services.length))}
            </span>
            <button
              onClick={handleNew}
              className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 shadow-luxury-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{d.services.addBtn}</span>
            </button>
          </div>

          {/* Services Table / Grid */}
          <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8D6C5] text-[#756A63] uppercase tracking-wider bg-[#FAF6F1]">
                <tr>
                  <th className="py-3 px-4">{adminLang === "tr" ? "Görsel" : "Bild"}</th>
                  <th className="py-3 px-4">{adminLang === "tr" ? "Başlık & Kategori" : "Titel & Kategorie"}</th>
                  <th className="py-3 px-4">{d.services.colDuration}</th>
                  <th className="py-3 px-4">{d.services.colPrice}</th>
                  <th className="py-3 px-4">{adminLang === "tr" ? "Öne Çıkan" : "Featured"}</th>
                  <th className="py-3 px-4">{d.services.colStatus}</th>
                  <th className="py-3 px-4 text-right">{d.common.actions}</th>
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
                        {categories.find((c) => c.id === item.category_id)?.name || (adminLang === "tr" ? "Kategori" : "Kategorie")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#756A63]">
                      {item.duration_minutes} {adminLang === "tr" ? "Dk." : "Min."}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#392D29]">{item.price_display}</td>
                    <td className="py-3 px-4">
                      {item.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#844C36] font-semibold bg-[#844C36]/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>{adminLang === "tr" ? "Öne Çıkan" : "Featured"}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#756A63]">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item)}
                        disabled={togglingId === item.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-xs ${
                          item.is_active
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
                          className={`w-2 h-2 rounded-full ${
                            item.is_active ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
                          }`}
                        />
                        <span>{item.is_active ? d.common.active : d.common.inactive}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-[#392D29] hover:text-[#844C36] hover:bg-[#FAF6F1] rounded-[1px] transition-colors"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Categories Management View */
        <div className="space-y-4">
          <div className="bg-white p-4 border border-[#E8D6C5] rounded-[1px] flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-[#392D29]">{d.services.categoriesTitle}</h3>
              <p className="text-xs text-[#756A63]">{d.services.categoriesSubtitle}</p>
            </div>
            <span className="text-xs text-[#756A63] bg-[#FAF6F1] px-2.5 py-1 rounded-full border border-[#E8D6C5]">
              {categoryList.length} {adminLang === "tr" ? "Kategori" : "Kategorien"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categoryList.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-[#E8D6C5] rounded-[1px] overflow-hidden shadow-luxury-xs hover:shadow-luxury-sm transition-shadow flex flex-col"
              >
                <div className="relative h-48 bg-[#FAF6F1] overflow-hidden group">
                  {cat.image_url ? (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#756A63]">
                      <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                      <span className="text-xs">{adminLang === "tr" ? "Görsel Yok" : "Kein Bild"}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold bg-[#392D29]/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-[1px]">
                      #{cat.display_order} • /{cat.slug}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => handleToggleCategoryActive(cat)}
                      disabled={togglingCatId === cat.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-md ${
                        cat.is_active
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      } ${togglingCatId === cat.id ? "opacity-60 cursor-wait" : ""}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          cat.is_active ? "bg-white animate-pulse" : "bg-white/70"
                        }`}
                      />
                      <span>{cat.is_active ? d.common.active : d.common.inactive}</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-editorial text-xl text-[#392D29] mb-1">{cat.name}</h4>
                    <p className="text-xs text-[#756A63] line-clamp-2 leading-relaxed">
                      {cat.description || (adminLang === "tr" ? "Açıklama belirtilmemiş." : "Keine Beschreibung hinterlegt.")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8D6C5]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#756A63] truncate max-w-[200px]" title={cat.image_url}>
                      {cat.image_url ? (
                        <span className="text-emerald-700 font-mono">✓ {adminLang === "tr" ? "Görsel Aktif" : "Bild aktiv"}</span>
                      ) : (
                        <span className="text-amber-700">{adminLang === "tr" ? "Varsayılan Kullanılıyor" : "Standard verwendet"}</span>
                      )}
                    </span>
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1.5 px-3 hover:bg-[#FAF6F1]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>{adminLang === "tr" ? "Görsel & Düzenle" : "Bild & Details bearbeiten"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                {editingService.id ? d.services.modalEditTitle : d.services.modalNewTitle}
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
                    {d.services.fieldCategory}
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
                    {d.services.fieldTitle}
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
                    {d.services.fieldPriceDisplay}
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
                    {d.services.fieldPriceValue}
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
                    {d.services.fieldDuration}
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
                  {adminLang === "tr" ? "Görsel URL (Medyatür veya Unsplash)" : "Bild-URL (z. B. Unsplash oder Mediathek)"}
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
                  {d.services.fieldShortDesc}
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
                  {d.services.fieldFullDesc}
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
                    className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">
                    {d.services.fieldFeatured}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.is_active !== undefined ? editingService.is_active : true}
                    onChange={(e) =>
                      setEditingService({ ...editingService, is_active: e.target.checked })
                    }
                    className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">
                    {d.services.fieldActive}
                  </span>
                </label>
              </div>

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
                  disabled={loading}
                  className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {editingService.id
                      ? d.common.save
                      : d.services.addBtn}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Edit Modal */}
      {isCatModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white border border-[#E8D6C5] rounded-[1px] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D6C5]">
              <h2 className="font-editorial text-2xl text-[#392D29]">
                {d.services.modalEditCategory}
              </h2>
              <button
                type="button"
                onClick={() => setIsCatModalOpen(false)}
                className="p-1 text-[#756A63] hover:text-[#392D29]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveCategoryModal} className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {adminLang === "tr" ? "Kategori Adı" : "Kategoriename"} *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ""}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Category Slug (read-only) */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  disabled
                  value={editingCategory.slug || ""}
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] bg-[#FAF6F1] text-[#756A63] rounded-[1px] cursor-not-allowed"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {d.services.fieldCategoryImage}
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... oder /images/..."
                  value={editingCategory.image_url || ""}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, image_url: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
                <p className="text-[11px] text-[#756A63] mt-1">
                  {adminLang === "tr"
                    ? "Ana sayfadaki 'Unsere Behandlungswelten' bölümünde gösterilecek görsel URL'si."
                    : "Wird im Bereich 'Unsere Behandlungswelten' auf der Startseite angezeigt."}
                </p>

                {/* Live Image Preview */}
                {editingCategory.image_url && (
                  <div className="mt-3 relative h-40 rounded-[1px] overflow-hidden border border-[#E8D6C5] bg-[#FAF6F1]">
                    <img
                      src={editingCategory.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-[1px]">
                      {adminLang === "tr" ? "Önizleme" : "Vorschau"}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {adminLang === "tr" ? "Açıklama" : "Beschreibung"}
                </label>
                <textarea
                  rows={3}
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-medium text-[#756A63] mb-1">
                  {adminLang === "tr" ? "Sıralama (Display Order)" : "Reihenfolge"}
                </label>
                <input
                  type="number"
                  value={editingCategory.display_order ?? 0}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      display_order: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full text-xs p-2.5 border border-[#E8D6C5] rounded-[1px] focus:outline-hidden focus:border-[#844C36]"
                />
              </div>

              {/* Active Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.is_active !== undefined ? editingCategory.is_active : true}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, is_active: e.target.checked })
                    }
                    className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">
                    {d.services.fieldActive}
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#E8D6C5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  {d.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={catSaving}
                  className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{catSaving ? d.common.saving : d.common.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
