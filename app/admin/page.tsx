import React from "react";
import {
  getAppointmentRequests,
  getContactMessages,
  getAllServices,
  getGalleryItems,
} from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0; // Dynamic admin data

export default async function AdminDashboardPage() {
  const [appointments, messages, services, gallery] = await Promise.all([
    getAppointmentRequests(),
    getContactMessages(),
    getAllServices(),
    getGalleryItems(),
  ]);

  return (
    <AdminDashboardClient
      appointments={appointments}
      messages={messages}
      services={services}
      gallery={gallery}
    />
  );
}
