import React from "react";
import {
  getAppointmentRequests,
  getContactMessages,
  getAllServices,
  getGalleryItems,
} from "@/lib/db";
import {
  CalendarDays,
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { formatShortDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic admin data

export default async function AdminDashboardPage() {
  const [appointments, messages, services, gallery] = await Promise.all([
    getAppointmentRequests(),
    getContactMessages(),
    getAllServices(),
    getGalleryItems(),
  ]);

  const newAppointments = appointments.filter((a) => a.status === "neu").length;
  const newMessages = messages.filter((m) => m.status === "neu").length;
  const activeServices = services.filter((s) => s.is_active).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#844C36] font-semibold block mb-1">
          Übersicht &amp; Kennzahlen / Genel Bakış
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Studio Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Willkommen im Verwaltungsbereich von Aura Glow by Mürvet.
        </p>
      </div>

      {/* Guide Banner */}
      <div className="bg-gradient-to-r from-white via-[#FAF6F1] to-white border border-[#E8D6C5] rounded-[1px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-luxury-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#844C36]/10 text-[#844C36] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#392D29]">
                Admin Menüsü Nasıl Kullanılır? / Wie benutzt man das Admin-Menü?
              </span>
              <span className="text-[10px] bg-[#844C36] text-white px-2 py-0.2 rounded-full font-bold">
                Rehber / Anleitung
              </span>
            </div>
            <p className="text-xs text-[#756A63] font-light mt-0.5">
              Tüm menülerin, randevu yönetiminin ve ayarların Türkçe &amp; Almanca detaylı kullanım kılavuzu.
            </p>
          </div>
        </div>
        <a
          href="/admin/anleitung"
          className="shrink-0 inline-flex items-center gap-2 bg-[#844C36] hover:bg-[#6C3D2B] text-white px-4 py-2 rounded-[1px] text-xs font-semibold uppercase tracking-wider transition-colors shadow-luxury-xs"
        >
          <span>Rehberi Aç / Anleitung</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Metrics Row (Strictly Real Data, No Fake Metrics!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">Terminanfragen</span>
            <CalendarDays className="w-4 h-4 text-[#B88770]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {appointments.length}
            </span>
            {newAppointments > 0 && (
              <span className="text-xs bg-[#FAF6F1] text-[#B88770] px-2 py-0.5 rounded-full font-medium">
                {newAppointments} neu
              </span>
            )}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">Nachrichten</span>
            <MessageSquare className="w-4 h-4 text-[#B88770]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {messages.length}
            </span>
            {newMessages > 0 && (
              <span className="text-xs bg-[#FAF6F1] text-[#B88770] px-2 py-0.5 rounded-full font-medium">
                {newMessages} neu
              </span>
            )}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">Aktive Behandlungen</span>
            <Sparkles className="w-4 h-4 text-[#B88770]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {activeServices}
            </span>
            <span className="text-xs text-[#756A63] font-light">
              von {services.length} gesamt
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">Galeriebilder</span>
            <ImageIcon className="w-4 h-4 text-[#B88770]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {gallery.length}
            </span>
            <span className="text-xs text-[#756A63] font-light">veröffentlicht</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm">
        <h2 className="text-xs uppercase tracking-[0.16em] text-[#392D29] font-medium mb-4">
          Schnellzugriff &amp; Aktionen
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a
            href="/admin/leistungen"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <Sparkles className="w-5 h-5 mx-auto text-[#B88770] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">Behandlung anlegen</span>
          </a>

          <a
            href="/admin/preise"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <CalendarDays className="w-5 h-5 mx-auto text-[#B88770] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">Preise pflegen</span>
          </a>

          <a
            href="/admin/design"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <ImageIcon className="w-5 h-5 mx-auto text-[#B88770] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">Hintergründe ändern</span>
          </a>

          <a
            href="/admin/inhalte"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <MessageSquare className="w-5 h-5 mx-auto text-[#B88770] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">Texte anpassen</span>
          </a>
        </div>
      </div>

      {/* Recent Appointment Requests Table */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl text-[#392D29]">
              Aktuelle Terminanfragen
            </h2>
            <p className="text-xs text-[#756A63] font-light mt-0.5">
              Die neuesten Kundenanfragen über die Website.
            </p>
          </div>
          <a
            href="/admin/anfragen"
            className="text-xs uppercase tracking-wider text-[#B88770] hover:text-[#936650] font-medium inline-flex items-center gap-1"
          >
            <span>Alle {appointments.length} ansehen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {appointments.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#756A63] font-light bg-[#FAF6F1] rounded-[1px]">
            Noch keine Terminanfragen eingegangen. Teste das Formular unter /termin.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8D6C5] text-[#756A63] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Kunde</th>
                  <th className="py-3 px-3">Behandlung</th>
                  <th className="py-3 px-3">Wunschdatum</th>
                  <th className="py-3 px-3">Eingegangen</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D6C5]/50">
                {appointments.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-[#FAF6F1] transition-colors">
                    <td className="py-3.5 px-3 font-medium text-[#392D29]">
                      {req.first_name} {req.last_name}
                      <span className="block text-[11px] font-light text-[#756A63]">
                        {req.phone}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#392D29] font-medium">
                      {req.treatment_title}
                    </td>
                    <td className="py-3.5 px-3 text-[#756A63]">
                      {req.preferred_date}
                      {req.preferred_time && (
                        <span className="block text-[10px] text-[#756A63]/80">
                          {req.preferred_time}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-[#756A63]">
                      {formatShortDate(req.created_at)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                          req.status === "neu"
                            ? "bg-amber-100 text-amber-800"
                            : req.status === "bestaetigt"
                            ? "bg-emerald-100 text-emerald-800"
                            : req.status === "erledigt"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <a
                        href="/admin/anfragen"
                        className="text-[#B88770] hover:text-[#936650] font-medium uppercase text-[11px] tracking-wider"
                      >
                        Bearbeiten
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
