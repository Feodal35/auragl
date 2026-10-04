import React from "react";
import {
  getAppointmentRequests,
  getContactMessages,
  getAllServices,
  getGalleryItems,
} from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Dynamic admin data

export default async function AdminDashboardPage() {
  const [appointments, messages, services, gallery] = await Promise.all([
    getAppointmentRequests().catch((err) => {
      console.error("[AdminDashboardPage] getAppointmentRequests failed:", err);
      return [];
    }),
    getContactMessages().catch((err) => {
      console.error("[AdminDashboardPage] getContactMessages failed:", err);
      return [];
    }),
    getAllServices().catch((err) => {
      console.error("[AdminDashboardPage] getAllServices failed:", err);
      return [];
    }),
    getGalleryItems().catch((err) => {
      console.error("[AdminDashboardPage] getGalleryItems failed:", err);
      return [];
    }),
  ]);

  return (
    <AdminDashboardClient
      appointments={appointments || []}
      messages={messages || []}
      services={services || []}
      gallery={gallery || []}
    />
  );
}
