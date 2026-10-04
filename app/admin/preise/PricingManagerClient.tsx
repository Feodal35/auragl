"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PriceRow, ServiceCategory } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Plus, Pencil, Trash2, CheckCircle2, X, Save } from "lucide-react";

interface Props {
  initialPricing: PriceRow[];
  categories: ServiceCategory[];
}

export default function PricingManagerClient({ initialPricing, categories }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [pricing, setPricing] = useState<PriceRow[]>(initialPricing);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [editingRow, setEditingRow] = useState<Partial<PriceRow> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggleActive = async (row: PriceRow) => {
    const nextStatus = !row.is_active;
    setTogglingId(row.id);

    // Optimistic UI update
    setPricing((prev) =>
      prev.map((p) => (p.id === row.id ? { ...p, is_active: nextStatus } : p))
    );

    try {
      const res = await fetch(`/api/admin/pricing/${row.id}`, {
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
          ? (adminLang === "tr" ? "Fiyat kalemi aktif edildi." : "Preiseintrag aktiviert.")
          : (adminLang === "tr" ? "Fiyat kalemi pasif edildi." : "Preiseintrag deaktiviert.")
      );
      router.refresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      // Revert on error
      setPricing((prev) =>
        prev.map((p) => (p.id === row.id ? { ...p, is_active: row.is_active } : p))
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

  const filteredPricing =
    selectedCategory === 0
      ? pricing
      : pricing.filter((p) => p.category_id === selectedCategory);

  const handleEdit = (row: PriceRow) => {
    setEditingRow({ ...row });
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingRow({
      category_id: categories[0]?.id || 1,
      subcategory_name: "",
      treatment_name: "",
      variant_name: "Standard",
      duration: "60 Min.",
      price: 50,
      price_display: "50 €",
      display_order: pricing.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(d.common.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPricing((prev) => prev.filter((p) => p.id !== id));
        setFeedback(d.pricing.deletedSuccess);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorDeleting);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRow) return;
    setLoading(true);

    try {
      const url = editingRow.id ? `/api/admin/pricing/${editingRow.id}` : "/api/admin/pricing";
      const method = editingRow.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRow),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (editingRow.id) {
          setPricing((prev) => prev.map((p) => (p.id === editingRow.id ? data.data : p)));
          setFeedback(d.pricing.savedSuccess);
        } else {
          setPricing((prev) => [...prev, data.data]);
          setFeedback(d.pricing.savedSuccess);
        }
        setIsModalOpen(false);
        setEditingRow(null);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert(d.common.errorSaving);
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

      {/* Filter & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E8D6C5] rounded-[1px]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(0)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedCategory === 0
                ? "bg-[#844C36] text-white shadow-xs"
                : "bg-[#FAF6F1] text-[#756A63] hover:text-[#392D29]"
            }`}
          >
            {d.common.all} ({pricing.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === c.id
                  ? "bg-[#844C36] text-white shadow-xs"
                  : "bg-[#FAF6F1] text-[#756A63] hover:text-[#392D29]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleNew}
          className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 shrink-0 shadow-luxury-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{d.pricing.addBtn}</span>
        </button>
      </div>

      {/* PAngV Legal Notice Banner */}
      <div className="bg-[#FAF6F1] border border-[#E8D6C5]/70 p-3 rounded-[1px] text-xs text-[#5C524C]">
        {d.pricing.pangvNote}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E8D6C5] text-[#756A63] uppercase tracking-wider bg-[#FAF6F1]">
            <tr>
              <th className="py-3 px-4">{adminLang === "tr" ? "Kategori" : "Kategorie"}</th>
              <th className="py-3 px-4">{adminLang === "tr" ? "Alt Grup" : "Untergruppe"}</th>
              <th className="py-3 px-4">{d.pricing.colTreatment}</th>
              <th className="py-3 px-4">{d.pricing.colVariant}</th>
              <th className="py-3 px-4">{d.pricing.colDuration}</th>
              <th className="py-3 px-4">{d.pricing.colPrice}</th>
              <th className="py-3 px-4">{d.pricing.colStatus}</th>
              <th className="py-3 px-4 text-right">{d.common.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8D6C5]/50">
            {filteredPricing.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAF6F1] transition-colors">
                <td className="py-3 px-4 text-[#756A63]">
                  {categories.find((c) => c.id === item.category_id)?.name || "-"}
                </td>
                <td className="py-3 px-4 font-semibold text-[#844C36]">
                  {item.subcategory_name || "-"}
                </td>
                <td className="py-3 px-4 font-medium text-[#392D29]">
                  {item.treatment_name}
                </td>
                <td className="py-3 px-4 text-[#756A63]">
                  {item.variant_name || "-"}
                </td>
                <td className="py-3 px-4 text-[#756A63]">
                  {item.duration || "-"}
                </td>
                <td className="py-3 px-4 font-editorial text-lg text-[#392D29]">
                  {item.price_display}
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
                    className="p-1.5 text-[#392D29] hover:text-[#844C36] rounded-[1px]"
                    title={d.common.edit}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-[1px]"
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

      {/* Modal */}
      {isModalOpen && editingRow && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white border border-[#E8D6C5] rounded-[1px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D6C5]">
              <h2 className="font-editorial text-2xl text-[#392D29]">
                {editingRow.id ? d.pricing.modalEditTitle : d.pricing.modalNewTitle}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#756A63] hover:text-[#392D29]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  {adminLang === "tr" ? "Kategori" : "Kategorie"}
                </label>
                <select
                  value={editingRow.category_id}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, category_id: parseInt(e.target.value, 10) })
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
                  {adminLang === "tr"
                    ? "Alt Grup (İsteğe bağlı, örn: 'Klasik' veya 'Powder Brows')"
                    : "Untergruppe (optional, z. B. 'Klassisch' oder 'Powder Brows')"}
                </label>
                <input
                  type="text"
                  value={editingRow.subcategory_name || ""}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, subcategory_name: e.target.value || null })
                  }
                  placeholder={adminLang === "tr" ? "Örn: Klasik" : "z. B. Klassisch"}
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                  {d.pricing.fieldTreatment}
                </label>
                <input
                  type="text"
                  required
                  value={editingRow.treatment_name || ""}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, treatment_name: e.target.value })
                  }
                  placeholder={adminLang === "tr" ? "Örn: Klasik İpek Kirpik" : "z. B. Klassische Wimpernverlängerung"}
                  className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    {d.pricing.fieldVariant}
                  </label>
                  <input
                    type="text"
                    value={editingRow.variant_name || ""}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, variant_name: e.target.value || null })
                    }
                    placeholder={adminLang === "tr" ? "Örn: Yeni Set veya Bakım" : "z. B. Neuset oder Auffüllen"}
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    {d.pricing.fieldDuration}
                  </label>
                  <input
                    type="text"
                    value={editingRow.duration || ""}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, duration: e.target.value || null })
                    }
                    placeholder={adminLang === "tr" ? "Örn: 60 Dk." : "z. B. 60 Min."}
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    {d.pricing.fieldPrice}
                  </label>
                  <input
                    type="number"
                    value={editingRow.price || 0}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setEditingRow({
                        ...editingRow,
                        price: val,
                        price_display: `${val} €`,
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#392D29] font-medium mb-1">
                    {d.pricing.fieldPriceDisplay}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRow.price_display || ""}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, price_display: e.target.value })
                    }
                    placeholder={adminLang === "tr" ? "Örn: 60 € veya 80 €'dan başlayan" : "z. B. 60 € oder ab 80 €"}
                    className="w-full px-3 py-2 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingRow.is_active !== undefined ? editingRow.is_active : true}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, is_active: e.target.checked })
                    }
                    className="h-4 w-4 text-[#844C36] rounded border-[#E8D6C5]"
                  />
                  <span className="text-xs text-[#392D29]">
                    {adminLang === "tr" ? "Fiyat listesinde aktif olarak göster" : "In Preisliste anzeigen (Aktiv)"}
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
                  <span>{d.common.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
