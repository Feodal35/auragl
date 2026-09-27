"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentRequestSchema, AppointmentRequestFormValues } from "@/lib/validations";
import { ServiceItem } from "@/lib/types";
import { CheckCircle2, AlertCircle, CalendarDays, Loader2, Clock3 } from "lucide-react";
import { trackFormConversion } from "@/lib/tracking";

interface AppointmentFormProps {
  services: ServiceItem[];
  initialTreatment?: string;
}

export default function AppointmentForm({ services, initialTreatment = "" }: AppointmentFormProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set min date to today
  const todayString = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentRequestFormValues>({
    resolver: zodResolver(AppointmentRequestSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      treatment_title: initialTreatment || (services[0]?.title ?? ""),
      preferred_date: "",
      preferred_time: "Vormittags (09:00 - 13:00)",
      alternative_date: "",
      notes: "",
      privacy_accepted: false as unknown as true,
      honeypot: "",
    },
  });

  const onSubmit = async (data: AppointmentRequestFormValues) => {
    setErrorMessage(null);

    // Spam honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      setIsSuccess(true);
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok || !res.success) {
        setErrorMessage(
          res.error || "Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut."
        );
        return;
      }

      // Google Ads Enhanced Conversions & GTM Lead Tracking
      trackFormConversion("appointment", {
        name: `${data.first_name} ${data.last_name}`.trim(),
        email: data.email,
        phone: data.phone,
        treatment: data.treatment_title,
      });

      setIsSuccess(true);
      reset();
      router.push("/danke?type=termin");
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte überprüfe deine Internetverbindung.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF6F1] border border-[#E8D6C5] p-8 sm:p-12 text-center rounded-[1px] space-y-5 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-[#EFE6DD] text-[#A26D57] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-editorial text-3xl sm:text-4xl text-[#392D29]">
          Vielen Dank für deine Anfrage.
        </h3>
        <p className="text-base text-[#756A63] font-light max-w-md mx-auto leading-relaxed">
          Wir haben deine Terminanfrage erfolgreich erhalten. Wir prüfen die Studioverfügbarkeit
          und melden uns schnellstmöglich persönlich bei dir zur Bestätigung.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="btn-secondary text-xs uppercase tracking-wider"
          >
            Weitere Anfrage stellen
          </button>
        </div>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-[#E8D6C5] rounded-[1px] text-base sm:text-sm text-[#392D29] focus:outline-none focus:border-[#A26D57] focus:ring-1 focus:ring-[#A26D57] transition-all min-h-[46px]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[1px] flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot field (hidden from genuine users) */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first_name" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Vorname <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="first_name"
            type="text"
            placeholder="Dein Vorname"
            {...register("first_name")}
            className={inputClasses}
          />
          {errors.first_name && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.first_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Nachname <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="Dein Nachname"
            {...register("last_name")}
            className={inputClasses}
          />
          {errors.last_name && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Contact details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            E-Mail-Adresse <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="deine@email.de"
            {...register("email")}
            className={inputClasses}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Telefonnummer <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+49 176 ..."
            {...register("phone")}
            className={inputClasses}
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Treatment Selector */}
      <div>
        <label htmlFor="treatment_title" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
          Gewünschte Behandlung <span className="text-[#A26D57]">*</span>
        </label>
        <select
          id="treatment_title"
          {...register("treatment_title")}
          className={inputClasses}
        >
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title} ({s.price_display})
            </option>
          ))}
          <option value="Sonstige individuelle Beratung">
            Sonstige individuelle Beratung / Mehrfachbehandlung
          </option>
        </select>
        {errors.treatment_title && (
          <p className="text-xs text-red-600 mt-1.5 font-light">{errors.treatment_title.message}</p>
        )}
      </div>

      {/* Dates and Time */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="preferred_date" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Wunschtermin <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="preferred_date"
            type="date"
            min={todayString}
            {...register("preferred_date")}
            className={inputClasses}
          />
          {errors.preferred_date && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.preferred_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="preferred_time" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Bevorzugte Tageszeit
          </label>
          <select
            id="preferred_time"
            {...register("preferred_time")}
            className={inputClasses}
          >
            <option value="Vormittags (09:00 - 13:00)">Vormittags (09:00 - 13:00)</option>
            <option value="Nachmittags (13:00 - 17:00)">Nachmittags (13:00 - 17:00)</option>
            <option value="Abends (17:00 - 19:00)">Abends (17:00 - 19:00)</option>
            <option value="Flexibel nach Vereinbarung">Flexibel nach Absprache</option>
          </select>
        </div>

        <div>
          <label htmlFor="alternative_date" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Alternativtermin (optional)
          </label>
          <input
            id="alternative_date"
            type="date"
            min={todayString}
            {...register("alternative_date")}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
          Besondere Hinweise oder Wünsche (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="z. B. Allergien, Vorerfahrungen mit Wimpern oder Wunsch nach Farbberatung..."
          {...register("notes")}
          className="w-full px-4 py-3 bg-white border border-[#E8D6C5] rounded-[1px] text-base sm:text-sm text-[#392D29] focus:outline-none focus:border-[#A26D57] focus:ring-1 focus:ring-[#A26D57] transition-all"
        />
      </div>

      {/* Privacy acceptance */}
      <div className="flex items-start gap-3 pt-2">
        <div className="min-w-[24px] min-h-[24px] flex items-center justify-center pt-0.5">
          <input
            type="checkbox"
            id="termin-privacy"
            {...register("privacy_accepted")}
            className="h-4 w-4 text-[#A26D57] border-[#E8D6C5] rounded focus:ring-[#A26D57] cursor-pointer"
          />
        </div>
        <label htmlFor="termin-privacy" className="text-xs text-[#756A63] font-light leading-relaxed cursor-pointer select-none">
          Ich habe die{" "}
          <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A26D57] font-medium">
            Datenschutzerklärung
          </Link>{" "}
          und die{" "}
          <Link href="/agb" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A26D57] font-medium">
            AGB inklusive der Stornierungsbedingungen
          </Link>{" "}
          (kostenfreie Absage bis 24 Stunden vor dem Termin) zur Kenntnis genommen und erkläre mich mit diesen einverstanden. Die Anfrage ist zunächst unverbindlich; der Termin wird erst nach persönlicher Bestätigung durch das Studio verbindlich. <span className="text-[#A26D57]">*</span>
        </label>
      </div>
      {errors.privacy_accepted && (
        <p className="text-xs text-red-600 font-light">{errors.privacy_accepted.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs min-h-[48px] px-8 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Anfrage wird übermittelt...</span>
          </>
        ) : (
          <>
            <CalendarDays className="w-4 h-4" />
            <span>Terminanfrage senden</span>
          </>
        )}
      </button>
    </form>
  );
}
