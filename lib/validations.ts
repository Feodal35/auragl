import { z } from "zod";

// Appointment Request Validation
export const AppointmentRequestSchema = z.object({
  first_name: z
    .string()
    .min(2, "Bitte gib deinen Vornamen ein (mindestens 2 Zeichen).")
    .max(50, "Vorname darf maximal 50 Zeichen lang sein."),
  last_name: z
    .string()
    .min(2, "Bitte gib deinen Nachnamen ein (mindestens 2 Zeichen).")
    .max(50, "Nachname darf maximal 50 Zeichen lang sein."),
  email: z
    .string()
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
  phone: z
    .string()
    .min(6, "Bitte gib eine gültige Telefonnummer an.")
    .max(30, "Telefonnummer ist zu lang."),
  treatment_title: z
    .string()
    .min(2, "Bitte wähle eine gewünschte Behandlung aus."),
  preferred_date: z
    .string()
    .min(10, "Bitte wähle ein gültiges Datum aus."),
  preferred_time: z.string().optional(),
  alternative_date: z.string().optional(),
  notes: z.string().max(1000, "Nachricht darf maximal 1000 Zeichen lang sein.").optional(),
  privacy_accepted: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätige die Datenschutzerklärung." }),
  }),
  honeypot: z.string().max(0, "Spam erkannt.").optional(),
});

export type AppointmentRequestFormValues = z.infer<typeof AppointmentRequestSchema>;

// Contact Message Validation
export const ContactMessageSchema = z.object({
  name: z
    .string()
    .min(2, "Bitte gib deinen Namen ein (mindestens 2 Zeichen).")
    .max(100, "Name darf maximal 100 Zeichen lang sein."),
  email: z
    .string()
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
  phone: z.string().max(30, "Telefonnummer ist zu lang.").optional(),
  subject: z
    .string()
    .min(3, "Bitte gib einen Betreff an (mindestens 3 Zeichen).")
    .max(150, "Betreff ist zu lang."),
  message: z
    .string()
    .min(10, "Bitte gib eine Nachricht ein (mindestens 10 Zeichen).")
    .max(2000, "Nachricht darf maximal 2000 Zeichen lang sein."),
  privacy_accepted: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätige die Datenschutzerklärung." }),
  }),
  honeypot: z.string().max(0, "Spam erkannt.").optional(),
});

export type ContactMessageFormValues = z.infer<typeof ContactMessageSchema>;

// Admin Login Validation
export const AdminLoginSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein."),
});

export type AdminLoginFormValues = z.infer<typeof AdminLoginSchema>;

// Service Schema
export const ServiceSchema = z.object({
  id: z.number().optional(),
  category_id: z.number().min(1, "Kategorie ist erforderlich."),
  title: z.string().min(2, "Titel muss mindestens 2 Zeichen lang sein."),
  slug: z.string().min(2, "Slug ist erforderlich."),
  short_description: z.string().min(10, "Kurzbeschreibung muss mindestens 10 Zeichen lang sein."),
  full_description: z.string().optional().default(""),
  featured_image: z.string().url("Muss eine gültige Bild-URL sein."),
  duration_minutes: z.number().min(15).max(1440),
  price_display: z.string().min(1, "Preisanzeige ist erforderlich."),
  price: z.number().min(0),
  is_featured: z.boolean().default(false),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

// Pricing Row Schema
export const PriceRowSchema = z.object({
  id: z.number().optional(),
  category_id: z.number().min(1, "Kategorie ist erforderlich."),
  subcategory_name: z.string().nullable().optional(),
  treatment_name: z.string().min(2, "Behandlungsname ist erforderlich."),
  variant_name: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  price: z.number().min(0, "Preis darf nicht negativ sein."),
  price_display: z.string().min(1, "Preisanzeige ist erforderlich."),
  show_on_request: z.boolean().optional().default(false),
  note: z.string().nullable().optional(),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

// Business Settings Schema
export const BusinessSettingsSchema = z.object({
  business_name: z.string().min(2, "Unternehmensname ist erforderlich."),
  owner_name: z.string().min(2, "Inhabername ist erforderlich."),
  street: z.string().min(2, "Straße ist erforderlich."),
  postal_code: z.string().min(4, "Postleitzahl ist erforderlich."),
  city: z.string().min(2, "Stadt ist erforderlich."),
  country: z.string().min(2, "Land ist erforderlich."),
  phone: z.string().min(6, "Telefonnummer ist erforderlich."),
  phone_display: z.string().min(6, "Formatierte Telefonnummer ist erforderlich."),
  email: z.string().email("Gültige E-Mail-Adresse ist erforderlich."),
  whatsapp: z.string().min(6, "WhatsApp-Nummer ist erforderlich."),
  instagram_url: z.string().url("Gültige Instagram-URL erforderlich.").or(z.literal("")),
  tiktok_url: z.string().url().or(z.literal("")).optional(),
  facebook_url: z.string().url().or(z.literal("")).optional(),
  google_maps_url: z.string().url().or(z.literal("")).optional(),
  booking_info: z.string().optional(),
});
