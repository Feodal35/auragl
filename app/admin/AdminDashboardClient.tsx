"use client";

import React from "react";
import Link from "next/link";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { AppointmentRequest, ContactMessage, ServiceItem, GalleryItem } from "@/lib/types";
import {
  CalendarDays,
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { formatShortDate } from "@/lib/utils";

interface Props {
  appointments: AppointmentRequest[];
  messages: ContactMessage[];
  services: ServiceItem[];
  gallery: GalleryItem[];
}

export default function AdminDashboardClient({
  appointments,
  messages,
  services,
  gallery,
}: Props) {
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const newAppointments = appointments.filter((a) => a.status === "neu").length;
  const newMessages = messages.filter((m) => m.status === "neu").length;
  const activeServices = services.filter((s) => s.is_active).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#844C36] font-semibold block mb-1">
          {d.dashboard.subtitle}
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          {d.dashboard.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          {d.dashboard.welcome}
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
                {d.dashboard.guideBannerTitle}
              </span>
              <span className="text-[10px] bg-[#844C36] text-white px-2 py-0.2 rounded-full font-bold">
                {d.dashboard.guideBannerBadge}
              </span>
            </div>
            <p className="text-xs text-[#756A63] font-light mt-0.5">
              {d.dashboard.guideBannerDesc}
            </p>
          </div>
        </div>
        <Link
          href="/admin/anleitung"
          className="shrink-0 inline-flex items-center gap-2 bg-[#844C36] hover:bg-[#6C3D2B] text-white px-4 py-2 rounded-[1px] text-xs font-semibold uppercase tracking-wider transition-colors shadow-luxury-xs"
        >
          <span>{d.dashboard.guideBannerBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Appointments */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">
              {d.dashboard.appointments}
            </span>
            <CalendarDays className="w-4 h-4 text-[#844C36]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {appointments.length}
            </span>
            {newAppointments > 0 && (
              <span className="text-xs bg-[#844C36]/10 text-[#844C36] px-2 py-0.5 rounded-full font-medium">
                {newAppointments} {d.common.new.toLowerCase()}
              </span>
            )}
          </div>
        </div>

        {/* Metric 2: Messages */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">
              {d.dashboard.messages}
            </span>
            <MessageSquare className="w-4 h-4 text-[#844C36]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {messages.length}
            </span>
            {newMessages > 0 && (
              <span className="text-xs bg-[#844C36]/10 text-[#844C36] px-2 py-0.5 rounded-full font-medium">
                {newMessages} {d.common.new.toLowerCase()}
              </span>
            )}
          </div>
        </div>

        {/* Metric 3: Active Services */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">
              {d.dashboard.activeServices}
            </span>
            <Sparkles className="w-4 h-4 text-[#844C36]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {activeServices}
            </span>
            <span className="text-xs text-[#756A63] font-light">
              {d.dashboard.ofTotal.replace("{total}", String(services.length))}
            </span>
          </div>
        </div>

        {/* Metric 4: Gallery Items */}
        <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm space-y-2">
          <div className="flex items-center justify-between text-[#756A63]">
            <span className="text-xs uppercase tracking-wider font-medium">
              {d.dashboard.galleryImages}
            </span>
            <ImageIcon className="w-4 h-4 text-[#844C36]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-3xl text-[#392D29]">
              {gallery.length}
            </span>
            <span className="text-xs text-[#756A63] font-light">
              {d.dashboard.published}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white p-6 border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm">
        <h2 className="text-xs uppercase tracking-[0.16em] text-[#392D29] font-medium mb-4">
          {d.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/leistungen"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <Sparkles className="w-5 h-5 mx-auto text-[#844C36] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">
              {d.dashboard.addTreatment}
            </span>
          </Link>

          <Link
            href="/admin/preise"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <CalendarDays className="w-5 h-5 mx-auto text-[#844C36] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">
              {d.dashboard.managePrices}
            </span>
          </Link>

          <Link
            href="/admin/design"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <ImageIcon className="w-5 h-5 mx-auto text-[#844C36] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">
              {d.dashboard.changeBackgrounds}
            </span>
          </Link>

          <Link
            href="/admin/inhalte"
            className="p-4 bg-[#FAF6F1] hover:bg-[#EFE6DD] border border-[#E8D6C5]/60 rounded-[1px] text-center transition-colors group"
          >
            <MessageSquare className="w-5 h-5 mx-auto text-[#844C36] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#392D29] block">
              {d.dashboard.editTexts}
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Appointment Requests Table */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl text-[#392D29]">
              {d.dashboard.recentAppointments}
            </h2>
            <p className="text-xs text-[#756A63] font-light mt-0.5">
              {d.dashboard.recentAppointmentsSub}
            </p>
          </div>
          <Link
            href="/admin/anfragen"
            className="text-xs uppercase tracking-wider text-[#844C36] hover:text-[#6C3D2B] font-semibold inline-flex items-center gap-1"
          >
            <span>{d.dashboard.viewAll.replace("{count}", String(appointments.length))}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#756A63] font-light bg-[#FAF6F1] rounded-[1px]">
            {d.dashboard.noAppointmentsYet}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8D6C5] text-[#756A63] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">{d.dashboard.colCustomer}</th>
                  <th className="py-3 px-3">{d.dashboard.colTreatment}</th>
                  <th className="py-3 px-3">{d.dashboard.colPreferredDate}</th>
                  <th className="py-3 px-3">{d.dashboard.colReceived}</th>
                  <th className="py-3 px-3">{d.dashboard.colStatus}</th>
                  <th className="py-3 px-3 text-right">{d.dashboard.colAction}</th>
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
                          : req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href="/admin/anfragen"
                        className="text-[#844C36] hover:text-[#6C3D2B] font-semibold uppercase text-[11px] tracking-wider"
                      >
                        {d.common.edit}
                      </Link>
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
