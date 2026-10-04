"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen w-full bg-[#F7F3EE]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
