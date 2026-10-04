import React from "react";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import { AdminLanguageProvider } from "@/components/admin/AdminLanguageContext";

export const metadata = {
  title: "Aura Glow Administration",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLanguageProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AdminLanguageProvider>
  );
}
