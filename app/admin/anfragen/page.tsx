import React from "react";
import { getAppointmentRequests } from "@/lib/db";
import AppointmentManagerClient from "./AppointmentManagerClient";

export const revalidate = 0;

export default async function AdminAppointmentsPage() {
  const requests = await getAppointmentRequests();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block mb-1">
          Kundenanfragen
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Terminanfragen ({requests.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
          Hier findest du alle eingehenden Terminanfragen der Website zur Prüfung und Bestätigung.
        </p>
      </div>

      <AppointmentManagerClient initialRequests={requests} />
    </div>
  );
}
