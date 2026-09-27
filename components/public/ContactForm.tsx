"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactMessageSchema, ContactMessageFormValues } from "@/lib/validations";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageFormValues>({
    resolver: zodResolver(ContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy_accepted: false as unknown as true,
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactMessageFormValues) => {
    setErrorMessage(null);

    // Spam honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      setIsSuccess(true);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok || !res.success) {
        setErrorMessage(
          res.error || "Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
        );
        return;
      }

      setIsSuccess(true);
      reset();
      router.push("/danke?type=kontakt");
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte überprüfe deine Internetverbindung.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF6F1] border border-[#E8D6C5] p-8 text-center rounded-[1px] space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#EFE6DD] text-[#A26D57] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-[#392D29]">
          Vielen Dank für deine Nachricht.
        </h3>
        <p className="text-sm text-[#756A63] font-light max-w-md mx-auto leading-relaxed">
          Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich persönlich
          bei dir zurück.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="btn-secondary text-xs uppercase tracking-wider min-h-[44px]"
        >
          Weitere Nachricht senden
        </button>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="contact_name" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Dein Name <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="contact_name"
            type="text"
            placeholder="z. B. Sophie Müller"
            {...register("name")}
            className={inputClasses}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.name.message}</p>
          )}
        </div>

        {/* E-Mail */}
        <div>
          <label htmlFor="contact_email" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            E-Mail-Adresse <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="contact_email"
            type="email"
            placeholder="sophie@beispiel.de"
            {...register("email")}
            className={inputClasses}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="contact_phone" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Telefonnummer (optional)
          </label>
          <input
            id="contact_phone"
            type="tel"
            placeholder="+49 176 ..."
            {...register("phone")}
            className={inputClasses}
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact_subject" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
            Betreff <span className="text-[#A26D57]">*</span>
          </label>
          <input
            id="contact_subject"
            type="text"
            placeholder="z. B. Beratung Wimpernverlängerung"
            {...register("subject")}
            className={inputClasses}
          />
          {errors.subject && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact_message" className="block text-xs uppercase tracking-[0.14em] text-[#392D29] font-medium mb-2">
          Deine Nachricht <span className="text-[#A26D57]">*</span>
        </label>
        <textarea
          id="contact_message"
          rows={4}
          placeholder="Wie können wir dir weiterhelfen? Beschreibe gerne deine Wünsche oder Fragen..."
          {...register("message")}
          className="w-full px-4 py-3 bg-white border border-[#E8D6C5] rounded-[1px] text-base sm:text-sm text-[#392D29] focus:outline-none focus:border-[#A26D57] focus:ring-1 focus:ring-[#A26D57] transition-all"
        />
        {errors.message && (
          <p className="text-xs text-red-600 mt-1.5 font-light">{errors.message.message}</p>
        )}
      </div>

      {/* Privacy acceptance */}
      <div className="flex items-start gap-3 pt-2">
        <div className="min-w-[24px] min-h-[24px] flex items-center justify-center pt-0.5">
          <input
            type="checkbox"
            id="kontakt-privacy"
            {...register("privacy_accepted")}
            className="h-4 w-4 text-[#A26D57] border-[#E8D6C5] rounded focus:ring-[#A26D57] cursor-pointer"
          />
        </div>
        <label htmlFor="kontakt-privacy" className="text-xs text-[#756A63] font-light leading-relaxed cursor-pointer select-none">
          Ich habe die{" "}
          <a href="/datenschutz" target="_blank" className="underline hover:text-[#A26D57]">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zur Beantwortung meiner Anfrage zu.{" "}
          <span className="text-[#A26D57]">*</span>
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
            <span>Nachricht wird gesendet...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Nachricht absenden</span>
          </>
        )}
      </button>
    </form>
  );
}
