"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContactMessage } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Mail, Phone, MessageSquare, CheckCircle2, Archive, Save, RefreshCw } from "lucide-react";

interface Props {
  initialMessages: ContactMessage[];
}

export default function MessageManagerClient({ initialMessages }: Props) {
  const router = useRouter();
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [messages, setMessages] = useState<ContactMessage[]>(Array.isArray(initialMessages) ? initialMessages : []);
  const [filter, setFilter] = useState<string>("alle");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMessages(Array.isArray(initialMessages) ? initialMessages : []);
  }, [initialMessages]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const safeMessages = Array.isArray(messages) ? messages : [];
  const filtered =
    filter === "alle"
      ? safeMessages
      : safeMessages.filter((m) => m.status === filter);

  const handleStatusChange = async (id: string, newStatus: ContactMessage["status"]) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filterTabs = [
    { key: "alle", label: d.messages.filterAll },
    { key: "neu", label: d.messages.filterNew },
    { key: "gelesen", label: d.messages.filterRead },
    { key: "beantwortet", label: d.messages.filterAnswered },
    { key: "archiviert", label: d.messages.filterArchived },
  ];

  return (
    <div className="space-y-6">
      {/* Filters & Refresh */}
      <div className="flex flex-wrap items-center justify-between gap-2">
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
              {tab.label} ({tab.key === "alle" ? messages.length : messages.filter((m) => m.status === tab.key).length})
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#756A63] hover:text-[#392D29] bg-white border border-[#E8D6C5] px-3.5 py-1.5 rounded-full hover:bg-[#FAF6F1] transition-colors"
          title="Yenile"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#A26D57]" : ""}`} />
          <span>Yenile</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center text-sm text-[#756A63] font-light bg-white border border-[#E8D6C5] rounded-[1px]">
          {d.messages.emptyState}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8D6C5]/50 gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-editorial text-2xl text-[#392D29]">{msg.name}</h3>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                        msg.status === "neu"
                          ? "bg-amber-100 text-amber-800"
                          : msg.status === "beantwortet"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.status === "neu"
                        ? adminLang === "tr"
                          ? "Yeni"
                          : "Neu"
                        : msg.status === "gelesen"
                        ? adminLang === "tr"
                          ? "Okundu"
                          : "Gelesen"
                        : msg.status === "beantwortet"
                        ? adminLang === "tr"
                          ? "Yanıtlandı"
                          : "Beantwortet"
                        : adminLang === "tr"
                        ? "Arşivlendi"
                        : "Archiviert"}
                    </span>
                  </div>
                  <span className="text-xs text-[#756A63] font-light">
                    {adminLang === "tr" ? "Gönderilme Tarihi:" : "Gesendet am:"} {formatDate(msg.created_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={loadingId === msg.id || msg.status === "gelesen"}
                    onClick={() => handleStatusChange(msg.id, "gelesen")}
                    className="px-2.5 py-1 text-xs border border-[#E8D6C5] rounded-[1px] hover:bg-[#FAF6F1] font-medium"
                  >
                    {adminLang === "tr" ? "Okundu" : "Gelesen"}
                  </button>
                  <button
                    disabled={loadingId === msg.id || msg.status === "beantwortet"}
                    onClick={() => handleStatusChange(msg.id, "beantwortet")}
                    className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[1px] hover:bg-emerald-100 font-medium"
                  >
                    {adminLang === "tr" ? "Yanıtlandı" : "Beantwortet"}
                  </button>
                  <button
                    disabled={loadingId === msg.id || msg.status === "archiviert"}
                    onClick={() => handleStatusChange(msg.id, "archiviert")}
                    className="px-2.5 py-1 text-xs bg-gray-50 text-gray-700 border border-gray-200 rounded-[1px] hover:bg-gray-100 font-medium"
                  >
                    {adminLang === "tr" ? "Arşivle" : "Archivieren"}
                  </button>
                </div>
              </div>

              {/* Message Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-[#756A63]">
                <div>
                  <span className="font-medium text-[#392D29]">
                    {adminLang === "tr" ? "Konu: " : "Betreff: "}
                  </span>
                  <span className="font-semibold text-[#844C36]">{msg.subject}</span>
                </div>
                <div>
                  <span className="font-medium text-[#392D29]">E-Mail: </span>
                  <a href={`mailto:${msg.email}`} className="hover:underline text-[#392D29]">
                    {msg.email}
                  </a>
                </div>
                {msg.phone && (
                  <div>
                    <span className="font-medium text-[#392D29]">
                      {adminLang === "tr" ? "Telefon: " : "Telefon: "}
                    </span>
                    <a href={`tel:${msg.phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {msg.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="bg-[#FAF6F1] p-4 border border-[#E8D6C5]/60 rounded-[1px] text-sm text-[#392D29] leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
