"use client";

import React, { useState } from "react";
import { AppointmentRequest } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { CalendarDays, Clock3, Mail, Phone, CheckCircle2, XCircle, AlertCircle, Save } from "lucide-react";

interface Props {
  initialRequests: AppointmentRequest[];
}

export default function AppointmentManagerClient({ initialRequests }: Props) {
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [requests, setRequests] = useState<AppointmentRequest[]>(initialRequests);
  const [filter, setFilter] = useState<string>("alle");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const filtered =
    filter === "alle"
      ? requests
      : requests.filter((r) => r.status === filter);

  const handleStatusChange = async (id: string, newStatus: AppointmentRequest["status"]) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    const note = noteInputs[id];
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internal_notes: note }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, internal_notes: note } : r))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filterTabs = [
    { key: "alle", label: d.appointments.filterAll },
    { key: "neu", label: d.appointments.filterNew },
    { key: "bestaetigt", label: d.appointments.filterConfirmed },
    { key: "erledigt", label: d.appointments.filterCompleted },
    { key: "abgelehnt", label: d.appointments.filterRejected },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`text-xs uppercase tracking-wider px-4 py-1.5 rounded-full font-medium transition-colors ${
              filter === tab.key
                ? "bg-[#844C36] text-white shadow-xs"
                : "bg-white text-[#756A63] hover:bg-[#FAF6F1] border border-[#E8D6C5]"
            }`}
          >
            {tab.label} ({tab.key === "alle" ? requests.length : requests.filter((r) => r.status === tab.key).length})
          </button>
        ))}
      </div>

      {/* List / Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-sm text-[#756A63] font-light bg-white border border-[#E8D6C5] rounded-[1px]">
          {d.appointments.emptyState}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8D6C5]/50 gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-editorial text-2xl text-[#392D29]">
                      {req.first_name} {req.last_name}
                    </h3>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                        req.status === "neu"
                          ? "bg-amber-100 text-amber-800"
                          : req.status === "bestaetigt"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "erledigt"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status === "neu"
                        ? adminLang === "tr"
                          ? "Yeni"
                          : "Neu"
                        : req.status === "bestaetigt"
                        ? adminLang === "tr"
                          ? "Onaylandı"
                          : "Bestätigt"
                        : req.status === "erledigt"
                        ? adminLang === "tr"
                          ? "Tamamlandı"
                          : "Erledigt"
                        : adminLang === "tr"
                        ? "Reddedildi"
                        : req.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#756A63] font-light">
                    {adminLang === "tr" ? "Geliş Zamanı:" : "Eingegangen am:"} {formatDate(req.created_at)}
                  </span>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={loadingId === req.id || req.status === "bestaetigt"}
                    onClick={() => handleStatusChange(req.id, "bestaetigt")}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-[1px] text-xs font-semibold border border-emerald-200 transition-colors disabled:opacity-40"
                  >
                    {adminLang === "tr" ? "Onayla" : "Bestätigen"}
                  </button>
                  <button
                    disabled={loadingId === req.id || req.status === "erledigt"}
                    onClick={() => handleStatusChange(req.id, "erledigt")}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-[1px] text-xs font-semibold border border-blue-200 transition-colors disabled:opacity-40"
                  >
                    {adminLang === "tr" ? "Tamamlandı" : "Erledigt"}
                  </button>
                  <button
                    disabled={loadingId === req.id || req.status === "abgelehnt"}
                    onClick={() => handleStatusChange(req.id, "abgelehnt")}
                    className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-[1px] text-xs font-semibold border border-red-200 transition-colors disabled:opacity-40"
                  >
                    {adminLang === "tr" ? "Reddet" : "Ablehnen"}
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#756A63]">
                <div>
                  <span className="font-medium text-[#392D29] block mb-1">
                    {adminLang === "tr" ? "Tedavi:" : "Behandlung:"}
                  </span>
                  <span className="text-sm text-[#844C36] font-semibold">{req.treatment_title}</span>
                </div>

                <div>
                  <span className="font-medium text-[#392D29] block mb-1">
                    {adminLang === "tr" ? "İstenen Tarih:" : "Wunschtermin:"}
                  </span>
                  <span className="font-medium text-[#392D29]">{req.preferred_date}</span>
                  {req.preferred_time && (
                    <span className="block text-[#756A63]">{req.preferred_time}</span>
                  )}
                  {req.alternative_date && (
                    <span className="block text-[11px] text-[#756A63] mt-0.5">
                      {adminLang === "tr" ? "Alternatif:" : "Ausweich:"} {req.alternative_date}
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-medium text-[#392D29] block mb-1">
                    {adminLang === "tr" ? "İletişim:" : "Kontaktdaten:"}
                  </span>
                  <a href={`mailto:${req.email}`} className="text-[#392D29] hover:underline block truncate">
                    {req.email}
                  </a>
                  <a href={`tel:${req.phone.replace(/\s+/g, "")}`} className="hover:underline block">
                    {req.phone}
                  </a>
                </div>

                <div>
                  <span className="font-medium text-[#392D29] block mb-1">
                    {adminLang === "tr" ? "Müşteri Notu:" : "Kunden-Notiz:"}
                  </span>
                  <p className="italic text-[#756A63] font-light">
                    {req.notes || (adminLang === "tr" ? "Ek istek belirtilmedi." : "Keine zusätzlichen Wünsche angegeben.")}
                  </p>
                </div>
              </div>

              {/* Internal Notes Editor */}
              <div className="pt-3 border-t border-[#E8D6C5]/50 flex items-center gap-3">
                <input
                  type="text"
                  placeholder={
                    adminLang === "tr"
                      ? "Dahili stüdyo notu ekleyin (örn: 'WhatsApp üzerinden onaylandı')..."
                      : "Interne Studio-Notiz hinzufügen (z. B. 'Per WhatsApp bestätigt')..."
                  }
                  defaultValue={req.internal_notes || ""}
                  onChange={(e) =>
                    setNoteInputs((prev) => ({ ...prev, [req.id]: e.target.value }))
                  }
                  className="flex-1 px-3 py-1.5 text-xs bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-[#392D29] focus:outline-none focus:border-[#844C36]"
                />
                <button
                  type="button"
                  disabled={loadingId === req.id}
                  onClick={() => handleSaveNotes(req.id)}
                  className="px-3 py-1.5 bg-[#844C36] text-white hover:bg-[#6C3D2B] rounded-[1px] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-luxury-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{adminLang === "tr" ? "Notu Kaydet" : "Notiz sichern"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
