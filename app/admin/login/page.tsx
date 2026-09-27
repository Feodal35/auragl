"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuraGlowLogo from "@/components/ui/AuraGlowLogo";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Anmeldung fehlgeschlagen.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Verbindungsfehler beim Anmelden.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-md p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-3">
          <AuraGlowLogo size="md" className="mx-auto" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#B88770] font-medium block pt-2">
            Administration
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-[#392D29]">
            Studio Login
          </h1>
          <p className="text-xs text-[#756A63] font-light">
            Bitte melde dich mit deinen Zugangsdaten an.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[1px] flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-1.5">
              E-Mail-Adresse
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#756A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@auraglow.de"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-sm text-[#392D29] focus:outline-none focus:border-[#B88770] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-1.5">
              Passwort
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#756A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF6F1] border border-[#E8D6C5] rounded-[1px] text-sm text-[#392D29] focus:outline-none focus:border-[#B88770] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 text-xs py-3.5 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Anmelden...</span>
              </>
            ) : (
              <span>Anmelden</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#E8D6C5]/50">
          <Link
            href="/"
            className="text-xs text-[#756A63] hover:text-[#B88770] transition-colors"
          >
            &larr; Zurück zur Website
          </Link>
        </div>
      </div>
    </div>
  );
}
