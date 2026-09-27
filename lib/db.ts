import {
  DEFAULT_CATEGORIES,
  DEFAULT_SERVICES,
  DEFAULT_PRICING,
  DEFAULT_GALLERY,
  DEFAULT_OPENING_HOURS,
  DEFAULT_BUSINESS_SETTINGS,
  DEFAULT_BRAND_SETTINGS,
  DEFAULT_DESIGN_SETTINGS,
  DEFAULT_CONTENT_SECTIONS,
  DEFAULT_SEO_SETTINGS,
} from "./defaultData";
import {
  ServiceCategory,
  ServiceItem,
  PriceRow,
  GalleryItem,
  OpeningHour,
  BusinessSettings,
  BrandSettings,
  DesignSectionSetting,
  ContentSection,
  SeoSetting,
  AppointmentRequest,
  ContactMessage,
  MediaItem,
} from "./types";
import { hasSupabaseConfigured, createServerSideClient, createAdminClient } from "./supabase";

// Stateful runtime storage for local/fallback execution so mutations persist during session
const state = {
  categories: [...DEFAULT_CATEGORIES],
  services: [...DEFAULT_SERVICES],
  pricing: [...DEFAULT_PRICING],
  gallery: [...DEFAULT_GALLERY],
  openingHours: [...DEFAULT_OPENING_HOURS],
  businessSettings: { ...DEFAULT_BUSINESS_SETTINGS },
  brandSettings: { ...DEFAULT_BRAND_SETTINGS },
  designSettings: { ...DEFAULT_DESIGN_SETTINGS },
  contentSections: { ...DEFAULT_CONTENT_SECTIONS },
  seoSettings: { ...DEFAULT_SEO_SETTINGS },
  appointments: [] as AppointmentRequest[],
  messages: [] as ContactMessage[],
  media: [] as MediaItem[],
};

/**
 * Returns a Supabase database client.
 * When requireAdmin is true, prefers createAdminClient() with service_role privileges
 * to reliably execute administrative operations and bypass strict RLS from the server.
 */
async function getDbClient(requireAdmin: boolean = false) {
  if (!hasSupabaseConfigured()) {
    if (process.env.NODE_ENV === "production" && requireAdmin) {
      console.warn("[PRODUCTION WARNING] Supabase is not configured. Operations are stored in temporary server memory.");
    }
    return null;
  }
  if (requireAdmin) {
    const admin = createAdminClient();
    if (admin) return admin;
  }
  return await createServerSideClient();
}

// ── 1. SERVICE CATEGORIES ──
export async function getCategories(): Promise<ServiceCategory[]> {
  const supabase = await getDbClient(false);
  if (supabase) {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("display_order", { ascending: true });
    if (!error && data && data.length > 0) return data as ServiceCategory[];
  }
  return state.categories.filter((c) => c.is_active);
}

export async function getAllCategories(): Promise<ServiceCategory[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data as ServiceCategory[];
    }
  }
  return state.categories;
}

// ── 2. SERVICES ──
export async function getServices(categoryId?: number): Promise<ServiceItem[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      let query = supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (categoryId) query = query.eq("category_id", categoryId);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as ServiceItem[];
    }
  }
  let filtered = state.services.filter((s) => s.is_active);
  if (categoryId) {
    filtered = filtered.filter((s) => s.category_id === categoryId);
  }
  return filtered;
}

export async function getAllServices(): Promise<ServiceItem[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data as ServiceItem[];
    }
  }
  return state.services;
}

export async function getFeaturedServices(): Promise<ServiceItem[]> {
  const all = await getServices();
  return all.filter((s) => s.is_featured);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data as ServiceItem;
    }
  }
  return state.services.find((s) => s.slug === slug) || null;
}

export async function saveService(service: Partial<ServiceItem>): Promise<ServiceItem> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      if (service.id) {
        const { data, error } = await supabase
          .from("services")
          .update(service)
          .eq("id", service.id)
          .select()
          .single();
        if (!error && data) return data as ServiceItem;
      } else {
        const { data, error } = await supabase
          .from("services")
          .insert(service)
          .select()
          .single();
        if (!error && data) return data as ServiceItem;
      }
    }
  }

  // Fallback update
  if (service.id) {
    const index = state.services.findIndex((s) => s.id === service.id);
    if (index !== -1) {
      state.services[index] = { ...state.services[index], ...service } as ServiceItem;
      return state.services[index];
    }
  }
  const newService: ServiceItem = {
    id: Date.now(),
    category_id: service.category_id || 1,
    title: service.title || "Neue Behandlung",
    slug: service.slug || `behandlung-${Date.now()}`,
    short_description: service.short_description || "",
    full_description: service.full_description || "",
    featured_image: service.featured_image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    duration_minutes: service.duration_minutes || 60,
    price_display: service.price_display || "ab 50 €",
    price: service.price || 50,
    is_featured: Boolean(service.is_featured),
    display_order: service.display_order || state.services.length + 1,
    is_active: service.is_active !== undefined ? service.is_active : true,
  };
  state.services.push(newService);
  return newService;
}

export async function deleteService(id: number): Promise<boolean> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) return true;
    }
  }
  const index = state.services.findIndex((s) => s.id === id);
  if (index !== -1) {
    state.services.splice(index, 1);
    return true;
  }
  return false;
}

// ── 3. PRICING ──
export async function getPricing(): Promise<PriceRow[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("pricing")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) return data as PriceRow[];
    }
  }
  return state.pricing.filter((p) => p.is_active);
}

export async function getAllPricing(): Promise<PriceRow[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("pricing")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data as PriceRow[];
    }
  }
  return state.pricing;
}

export async function savePriceRow(priceRow: Partial<PriceRow>): Promise<PriceRow> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      if (priceRow.id) {
        const { data, error } = await supabase
          .from("pricing")
          .update(priceRow)
          .eq("id", priceRow.id)
          .select()
          .single();
        if (!error && data) return data as PriceRow;
      } else {
        const { data, error } = await supabase
          .from("pricing")
          .insert(priceRow)
          .select()
          .single();
        if (!error && data) return data as PriceRow;
      }
    }
  }

  if (priceRow.id) {
    const idx = state.pricing.findIndex((p) => p.id === priceRow.id);
    if (idx !== -1) {
      state.pricing[idx] = { ...state.pricing[idx], ...priceRow } as PriceRow;
      return state.pricing[idx];
    }
  }
  const newRow: PriceRow = {
    id: Date.now(),
    category_id: priceRow.category_id || 1,
    subcategory_name: priceRow.subcategory_name || null,
    treatment_name: priceRow.treatment_name || "Neuer Preis",
    variant_name: priceRow.variant_name || null,
    duration: priceRow.duration || null,
    price: priceRow.price || 0,
    price_display: priceRow.price_display || `${priceRow.price || 0} €`,
    display_order: priceRow.display_order || state.pricing.length + 1,
    is_active: priceRow.is_active !== undefined ? priceRow.is_active : true,
  };
  state.pricing.push(newRow);
  return newRow;
}

export async function deletePriceRow(id: number): Promise<boolean> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { error } = await supabase.from("pricing").delete().eq("id", id);
      if (!error) return true;
    }
  }
  const idx = state.pricing.findIndex((p) => p.id === id);
  if (idx !== -1) {
    state.pricing.splice(idx, 1);
    return true;
  }
  return false;
}

// ── 4. GALLERY ──
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) return data as GalleryItem[];
    }
  }
  return state.gallery.filter((g) => g.is_active);
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data as GalleryItem[];
    }
  }
  return state.gallery;
}

export async function saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
  if (item.id) {
    const idx = state.gallery.findIndex((g) => g.id === item.id);
    if (idx !== -1) {
      state.gallery[idx] = { ...state.gallery[idx], ...item } as GalleryItem;
      return state.gallery[idx];
    }
  }
  const newItem: GalleryItem = {
    id: Date.now(),
    image_url: item.image_url || "",
    before_image_url: item.before_image_url || null,
    after_image_url: item.after_image_url || null,
    caption: item.caption || "Galeriebild",
    category: item.category || "Wimpern",
    is_before_after: Boolean(item.is_before_after),
    display_order: item.display_order || state.gallery.length + 1,
    is_active: item.is_active !== undefined ? item.is_active : true,
  };
  state.gallery.push(newItem);
  return newItem;
}

export async function deleteGalleryItem(id: number): Promise<boolean> {
  const idx = state.gallery.findIndex((g) => g.id === id);
  if (idx !== -1) {
    state.gallery.splice(idx, 1);
    return true;
  }
  return false;
}

// ── 5. OPENING HOURS ──
export async function getOpeningHours(): Promise<OpeningHour[]> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("opening_hours")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) return data as OpeningHour[];
    }
  }
  return state.openingHours;
}

export async function saveOpeningHours(hours: OpeningHour[]): Promise<OpeningHour[]> {
  state.openingHours = [...hours];
  return state.openingHours;
}

// ── 6. SETTINGS (BUSINESS, BRAND, DESIGN, CONTENT, SEO) ──
export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "business")
        .single();
      if (!error && data?.value) return data.value as BusinessSettings;
    }
  }
  return state.businessSettings;
}

export async function saveBusinessSettings(settings: Partial<BusinessSettings>): Promise<BusinessSettings> {
  state.businessSettings = { ...state.businessSettings, ...settings };
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase
        .from("site_settings")
        .upsert({ key: "business", value: state.businessSettings });
    }
  }
  return state.businessSettings;
}

export async function getBrandSettings(): Promise<BrandSettings> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "brand")
        .single();
      if (!error && data?.value) return data.value as BrandSettings;
    }
  }
  return state.brandSettings;
}

export async function saveBrandSettings(settings: Partial<BrandSettings>): Promise<BrandSettings> {
  state.brandSettings = { ...state.brandSettings, ...settings };
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase
        .from("site_settings")
        .upsert({ key: "brand", value: state.brandSettings });
    }
  }
  return state.brandSettings;
}

export async function getDesignSettings(): Promise<Record<string, DesignSectionSetting>> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase.from("design_settings").select("*");
      if (!error && data && data.length > 0) {
        const mapped: Record<string, DesignSectionSetting> = {};
        for (const item of data) {
          mapped[item.section_id] = item;
        }
        return { ...state.designSettings, ...mapped };
      }
    }
  }
  return state.designSettings;
}

export async function saveDesignSetting(setting: DesignSectionSetting): Promise<DesignSectionSetting> {
  state.designSettings[setting.section_id] = {
    ...state.designSettings[setting.section_id],
    ...setting,
  };
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("design_settings").upsert(setting);
    }
  }
  return state.designSettings[setting.section_id];
}

export async function getContentSections(): Promise<Record<string, ContentSection>> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase.from("content_sections").select("*");
      if (!error && data && data.length > 0) {
        const mapped: Record<string, ContentSection> = {};
        for (const item of data) {
          mapped[item.section_id] = item;
        }
        return { ...state.contentSections, ...mapped };
      }
    }
  }
  return state.contentSections;
}

export async function saveContentSection(section: ContentSection): Promise<ContentSection> {
  state.contentSections[section.section_id] = {
    ...state.contentSections[section.section_id],
    ...section,
  };
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("content_sections").upsert(section);
    }
  }
  return state.contentSections[section.section_id];
}

export async function getSeoSettings(route: string): Promise<SeoSetting> {
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .eq("route", route)
        .single();
      if (!error && data) return data as SeoSetting;
    }
  }
  const key = route === "/" ? "home" : route.replace("/", "");
  return (
    state.seoSettings[key] || {
      route,
      title: "Aura Glow by Mürvet",
      description: "Exklusives Beauty & Aesthetics Studio.",
    }
  );
}

export async function getAllSeoSettings(): Promise<Record<string, SeoSetting>> {
  return state.seoSettings;
}

export async function saveSeoSetting(key: string, setting: SeoSetting): Promise<SeoSetting> {
  state.seoSettings[key] = { ...setting };
  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("seo_settings").upsert(setting);
    }
  }
  return state.seoSettings[key];
}

// ── 7. APPOINTMENT REQUESTS (Private) ──
export async function createAppointmentRequest(data: Omit<AppointmentRequest, "id" | "status" | "created_at">): Promise<AppointmentRequest> {
  const newAppointment: AppointmentRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: "neu",
    created_at: new Date().toISOString(),
  };

  const supabase = await getDbClient(true);
  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("appointment_requests")
      .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        treatment_title: data.treatment_title,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time || null,
        alternative_date: data.alternative_date || null,
        notes: data.notes || null,
        privacy_accepted: data.privacy_accepted,
        status: "neu",
      })
      .select()
      .single();
    if (!error && inserted) return inserted as AppointmentRequest;
  }

  state.appointments.unshift(newAppointment);
  return newAppointment;
}

export async function getAppointmentRequests(): Promise<AppointmentRequest[]> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const { data, error } = await supabase
      .from("appointment_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as AppointmentRequest[];
  }
  return state.appointments;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentRequest["status"],
  internalNotes?: string
): Promise<boolean> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const updateData: Record<string, unknown> = { status };
    if (internalNotes !== undefined) updateData.internal_notes = internalNotes;
    const { error } = await supabase
      .from("appointment_requests")
      .update(updateData)
      .eq("id", id);
    if (!error) return true;
  }
  const appt = state.appointments.find((a) => a.id === id);
  if (appt) {
    appt.status = status;
    if (internalNotes !== undefined) appt.internal_notes = internalNotes;
    return true;
  }
  return false;
}

// ── 8. CONTACT MESSAGES (Private) ──
export async function createContactMessage(data: Omit<ContactMessage, "id" | "status" | "created_at">): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: "neu",
    created_at: new Date().toISOString(),
  };

  const supabase = await getDbClient(true);
  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("contact_messages")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        privacy_accepted: data.privacy_accepted,
        status: "neu",
      })
      .select()
      .single();
    if (!error && inserted) return inserted as ContactMessage;
  }

  state.messages.unshift(newMessage);
  return newMessage;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as ContactMessage[];
  }
  return state.messages;
}

export async function updateMessageStatus(
  id: string,
  status: ContactMessage["status"],
  internalNotes?: string
): Promise<boolean> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const updateData: Record<string, unknown> = { status };
    if (internalNotes !== undefined) updateData.internal_notes = internalNotes;
    const { error } = await supabase
      .from("contact_messages")
      .update(updateData)
      .eq("id", id);
    if (!error) return true;
  }
  const msg = state.messages.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    if (internalNotes !== undefined) msg.internal_notes = internalNotes;
    return true;
  }
  return false;
}

export async function deleteAppointmentRequest(id: string): Promise<boolean> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const { error } = await supabase.from("appointment_requests").delete().eq("id", id);
    if (!error) return true;
  }
  const idx = state.appointments.findIndex((a) => a.id === id);
  if (idx !== -1) {
    state.appointments.splice(idx, 1);
    return true;
  }
  return false;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const supabase = await getDbClient(true);
  if (supabase) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (!error) return true;
  }
  const idx = state.messages.findIndex((m) => m.id === id);
  if (idx !== -1) {
    state.messages.splice(idx, 1);
    return true;
  }
  return false;
}

// ── 9. MEDIA LIBRARY ──
export async function getMediaItems(): Promise<MediaItem[]> {
  return state.media;
}

export async function addMediaItem(item: Omit<MediaItem, "id" | "created_at">): Promise<MediaItem> {
  const newItem: MediaItem = {
    id: `med-${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };
  state.media.unshift(newItem);
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const idx = state.media.findIndex((m) => m.id === id);
  if (idx !== -1) {
    state.media.splice(idx, 1);
    return true;
  }
  return false;
}
