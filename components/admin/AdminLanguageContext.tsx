"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AdminLocale = "de" | "tr";

interface AdminLanguageContextType {
  adminLang: AdminLocale;
  setAdminLang: (lang: AdminLocale) => void;
  isTr: boolean;
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  adminLang: "de",
  setAdminLang: () => {},
  isTr: false,
});

export function AdminLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adminLang, setAdminLangState] = useState<AdminLocale>("de");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aura_admin_lang") as AdminLocale | null;
      if (saved === "de" || saved === "tr") {
        setAdminLangState(saved);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const setAdminLang = (lang: AdminLocale) => {
    setAdminLangState(lang);
    try {
      localStorage.setItem("aura_admin_lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <AdminLanguageContext.Provider
      value={{
        adminLang,
        setAdminLang,
        isTr: adminLang === "tr",
      }}
    >
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}
