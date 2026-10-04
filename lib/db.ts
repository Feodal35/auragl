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
import { hasPostgresConfigured, queryPg } from "./pg";

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
 * Returns a Supabase database client when configured.
 */
async function getDbClient(requireAdmin: boolean = false) {
  if (!hasSupabaseConfigured()) {
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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ServiceCategory>(
        "SELECT * FROM service_categories WHERE is_active = true ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getCategories Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ServiceCategory>(
        "SELECT * FROM service_categories ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getAllCategories Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      let sql = "SELECT * FROM services WHERE is_active = true";
      const params: unknown[] = [];
      if (categoryId) {
        sql += " AND category_id = $1";
        params.push(categoryId);
      }
      sql += " ORDER BY display_order ASC";
      const rows = await queryPg<ServiceItem>(sql, params);
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getServices Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ServiceItem>(
        "SELECT * FROM services ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getAllServices Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ServiceItem>(
        "SELECT * FROM services WHERE slug = $1 LIMIT 1",
        [slug]
      );
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.error("[PostgreSQL getServiceBySlug Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      if (service.id) {
        const rows = await queryPg<ServiceItem>(
          `UPDATE services SET 
            category_id = COALESCE($1, category_id),
            title = COALESCE($2, title),
            slug = COALESCE($3, slug),
            short_description = COALESCE($4, short_description),
            full_description = COALESCE($5, full_description),
            featured_image = COALESCE($6, featured_image),
            duration_minutes = COALESCE($7, duration_minutes),
            price_display = COALESCE($8, price_display),
            price = COALESCE($9, price),
            is_featured = COALESCE($10, is_featured),
            display_order = COALESCE($11, display_order),
            is_active = COALESCE($12, is_active),
            updated_at = NOW()
          WHERE id = $13 RETURNING *`,
          [
            service.category_id ?? null,
            service.title ?? null,
            service.slug ?? null,
            service.short_description ?? null,
            service.full_description ?? null,
            service.featured_image ?? null,
            service.duration_minutes ?? null,
            service.price_display ?? null,
            service.price ?? null,
            service.is_featured ?? null,
            service.display_order ?? null,
            service.is_active ?? null,
            service.id,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
        throw new Error(`Behandlung mit ID ${service.id} nicht gefunden.`);
      } else {
        const rows = await queryPg<ServiceItem>(
          `INSERT INTO services 
            (category_id, title, slug, short_description, full_description, featured_image, duration_minutes, price_display, price, is_featured, display_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *`,
          [
            service.category_id || 1,
            service.title || "Neue Behandlung",
            service.slug || `behandlung-${Date.now()}`,
            service.short_description || "",
            service.full_description || "",
            service.featured_image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
            service.duration_minutes || 60,
            service.price_display || "ab 50 €",
            service.price || 50,
            service.is_featured ?? false,
            service.display_order || 1,
            service.is_active ?? true,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
      }
    } catch (err) {
      console.error("[PostgreSQL saveService Error]:", err);
      throw err;
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM services WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deleteService Error]:", err);
      throw err;
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<PriceRow>(
        "SELECT * FROM pricing WHERE is_active = true ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getPricing Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<PriceRow>(
        "SELECT * FROM pricing ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getAllPricing Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      if (priceRow.id) {
        const rows = await queryPg<PriceRow>(
          `UPDATE pricing SET 
            category_id = COALESCE($1, category_id),
            subcategory_name = COALESCE($2, subcategory_name),
            treatment_name = COALESCE($3, treatment_name),
            variant_name = COALESCE($4, variant_name),
            duration = COALESCE($5, duration),
            price = COALESCE($6, price),
            price_display = COALESCE($7, price_display),
            display_order = COALESCE($8, display_order),
            is_active = COALESCE($9, is_active),
            updated_at = NOW()
          WHERE id = $10 RETURNING *`,
          [
            priceRow.category_id ?? null,
            priceRow.subcategory_name !== undefined ? priceRow.subcategory_name : null,
            priceRow.treatment_name ?? null,
            priceRow.variant_name !== undefined ? priceRow.variant_name : null,
            priceRow.duration !== undefined ? priceRow.duration : null,
            priceRow.price ?? null,
            priceRow.price_display ?? null,
            priceRow.display_order ?? null,
            priceRow.is_active ?? null,
            priceRow.id,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
        throw new Error(`Preis mit ID ${priceRow.id} nicht gefunden.`);
      } else {
        const rows = await queryPg<PriceRow>(
          `INSERT INTO pricing 
            (category_id, subcategory_name, treatment_name, variant_name, duration, price, price_display, display_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *`,
          [
            priceRow.category_id || 1,
            priceRow.subcategory_name || null,
            priceRow.treatment_name || "Neuer Preis",
            priceRow.variant_name || null,
            priceRow.duration || null,
            priceRow.price || 0,
            priceRow.price_display || `${priceRow.price || 0} €`,
            priceRow.display_order || 1,
            priceRow.is_active ?? true,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
      }
    } catch (err) {
      console.error("[PostgreSQL savePriceRow Error]:", err);
      throw err;
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM pricing WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deletePriceRow Error]:", err);
      throw err;
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<GalleryItem>(
        "SELECT * FROM gallery_items WHERE is_active = true ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getGalleryItems Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<GalleryItem>(
        "SELECT * FROM gallery_items ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getAllGalleryItems Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      if (item.id) {
        const rows = await queryPg<GalleryItem>(
          `UPDATE gallery_items SET 
            image_url = COALESCE($1, image_url),
            before_image_url = COALESCE($2, before_image_url),
            after_image_url = COALESCE($3, after_image_url),
            caption = COALESCE($4, caption),
            category = COALESCE($5, category),
            is_before_after = COALESCE($6, is_before_after),
            display_order = COALESCE($7, display_order),
            is_active = COALESCE($8, is_active),
            updated_at = NOW()
          WHERE id = $9 RETURNING *`,
          [
            item.image_url ?? null,
            item.before_image_url !== undefined ? item.before_image_url : null,
            item.after_image_url !== undefined ? item.after_image_url : null,
            item.caption ?? null,
            item.category ?? null,
            item.is_before_after ?? null,
            item.display_order ?? null,
            item.is_active ?? null,
            item.id,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
        throw new Error(`Galeriebild mit ID ${item.id} nicht gefunden.`);
      } else {
        const rows = await queryPg<GalleryItem>(
          `INSERT INTO gallery_items 
            (image_url, before_image_url, after_image_url, caption, category, is_before_after, display_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *`,
          [
            item.image_url || "",
            item.before_image_url || null,
            item.after_image_url || null,
            item.caption || "Galeriebild",
            item.category || "Wimpern",
            item.is_before_after ?? false,
            item.display_order || 1,
            item.is_active ?? true,
          ]
        );
        if (rows && rows.length > 0) return rows[0];
      }
    } catch (err) {
      console.error("[PostgreSQL saveGalleryItem Error]:", err);
      throw err;
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM gallery_items WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deleteGalleryItem Error]:", err);
      throw err;
    }
  }

  const idx = state.gallery.findIndex((g) => g.id === id);
  if (idx !== -1) {
    state.gallery.splice(idx, 1);
    return true;
  }
  return false;
}

// ── 5. OPENING HOURS ──
export async function getOpeningHours(): Promise<OpeningHour[]> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<OpeningHour>(
        "SELECT * FROM opening_hours ORDER BY display_order ASC"
      );
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getOpeningHours Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      for (const h of hours) {
        await queryPg(
          `UPDATE opening_hours SET 
            open_time = $1, 
            close_time = $2, 
            is_closed = $3, 
            custom_label = $4 
          WHERE id = $5`,
          [h.open_time || null, h.close_time || null, h.is_closed, h.custom_label || null, h.id]
        );
      }
    } catch (err) {
      console.error("[PostgreSQL saveOpeningHours Error]:", err);
    }
  }

  state.openingHours = [...hours];
  return state.openingHours;
}

// ── 6. SETTINGS (BUSINESS, BRAND, DESIGN, CONTENT, SEO) ──
export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<{ value: BusinessSettings }>(
        "SELECT value FROM site_settings WHERE key = 'business' LIMIT 1"
      );
      if (rows && rows[0]?.value) return rows[0].value;
    } catch (err) {
      console.error("[PostgreSQL getBusinessSettings Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      await queryPg(
        `INSERT INTO site_settings (key, value, updated_at) 
         VALUES ('business', $1, NOW()) 
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [JSON.stringify(state.businessSettings)]
      );
    } catch (err) {
      console.error("[PostgreSQL saveBusinessSettings Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<{ value: BrandSettings }>(
        "SELECT value FROM site_settings WHERE key = 'brand' LIMIT 1"
      );
      if (rows && rows[0]?.value) return rows[0].value;
    } catch (err) {
      console.error("[PostgreSQL getBrandSettings Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      await queryPg(
        `INSERT INTO site_settings (key, value, updated_at) 
         VALUES ('brand', $1, NOW()) 
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [JSON.stringify(state.brandSettings)]
      );
    } catch (err) {
      console.error("[PostgreSQL saveBrandSettings Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<DesignSectionSetting>("SELECT * FROM design_settings");
      if (rows && rows.length > 0) {
        const mapped: Record<string, DesignSectionSetting> = {};
        for (const item of rows) {
          mapped[item.section_id] = item;
        }
        return { ...state.designSettings, ...mapped };
      }
    } catch (err) {
      console.error("[PostgreSQL getDesignSettings Error]:", err);
    }
  }

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

  if (hasPostgresConfigured()) {
    try {
      await queryPg(
        `INSERT INTO design_settings 
          (section_id, background_color, background_image_desktop, background_image_mobile, image_position, image_size, overlay_color, overlay_opacity, text_color, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
         ON CONFLICT (section_id) DO UPDATE SET
          background_color = EXCLUDED.background_color,
          background_image_desktop = EXCLUDED.background_image_desktop,
          background_image_mobile = EXCLUDED.background_image_mobile,
          image_position = EXCLUDED.image_position,
          image_size = EXCLUDED.image_size,
          overlay_color = EXCLUDED.overlay_color,
          overlay_opacity = EXCLUDED.overlay_opacity,
          text_color = EXCLUDED.text_color,
          updated_at = NOW()`,
        [
          setting.section_id,
          setting.background_color || null,
          setting.background_image_desktop || null,
          setting.background_image_mobile || null,
          setting.image_position || "center center",
          setting.image_size || "cover",
          setting.overlay_color || "#211A18",
          setting.overlay_opacity ?? 0.4,
          setting.text_color || "#392D29",
        ]
      );
    } catch (err) {
      console.error("[PostgreSQL saveDesignSetting Error]:", err);
    }
  }

  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("design_settings").upsert(setting);
    }
  }
  return state.designSettings[setting.section_id];
}

export async function getContentSections(): Promise<Record<string, ContentSection>> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ContentSection>("SELECT * FROM content_sections");
      if (rows && rows.length > 0) {
        const mapped: Record<string, ContentSection> = {};
        for (const item of rows) {
          mapped[item.section_id] = item;
        }
        return { ...state.contentSections, ...mapped };
      }
    } catch (err) {
      console.error("[PostgreSQL getContentSections Error]:", err);
    }
  }

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

  if (hasPostgresConfigured()) {
    try {
      await queryPg(
        `INSERT INTO content_sections 
          (section_id, title, eyebrow, headline, body_text, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
         ON CONFLICT (section_id) DO UPDATE SET
          title = EXCLUDED.title,
          eyebrow = EXCLUDED.eyebrow,
          headline = EXCLUDED.headline,
          body_text = EXCLUDED.body_text,
          primary_cta_label = EXCLUDED.primary_cta_label,
          primary_cta_url = EXCLUDED.primary_cta_url,
          secondary_cta_label = EXCLUDED.secondary_cta_label,
          secondary_cta_url = EXCLUDED.secondary_cta_url,
          updated_at = NOW()`,
        [
          section.section_id,
          section.title || null,
          section.eyebrow || null,
          section.headline || null,
          section.body_text || null,
          section.primary_cta_label || null,
          section.primary_cta_url || null,
          section.secondary_cta_label || null,
          section.secondary_cta_url || null,
        ]
      );
    } catch (err) {
      console.error("[PostgreSQL saveContentSection Error]:", err);
    }
  }

  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("content_sections").upsert(section);
    }
  }
  return state.contentSections[section.section_id];
}

export async function getSeoSettings(route: string): Promise<SeoSetting> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<SeoSetting>(
        "SELECT * FROM seo_settings WHERE route = $1 LIMIT 1",
        [route]
      );
      if (rows && rows[0]) return rows[0];
    } catch (err) {
      console.error("[PostgreSQL getSeoSettings Error]:", err);
    }
  }

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

  if (hasPostgresConfigured()) {
    try {
      await queryPg(
        `INSERT INTO seo_settings 
          (route, title, description, og_title, og_description, og_image, no_index, canonical_url, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         ON CONFLICT (route) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          og_title = EXCLUDED.og_title,
          og_description = EXCLUDED.og_description,
          og_image = EXCLUDED.og_image,
          no_index = EXCLUDED.no_index,
          canonical_url = EXCLUDED.canonical_url,
          updated_at = NOW()`,
        [
          setting.route,
          setting.title,
          setting.description,
          setting.og_title || null,
          setting.og_description || null,
          setting.og_image || null,
          setting.no_index ?? false,
          setting.canonical_url || null,
        ]
      );
    } catch (err) {
      console.error("[PostgreSQL saveSeoSetting Error]:", err);
    }
  }

  if (hasSupabaseConfigured()) {
    const supabase = await createServerSideClient();
    if (supabase) {
      await supabase.from("seo_settings").upsert(setting);
    }
  }
  return state.seoSettings[key];
}

// ── 7. APPOINTMENT REQUESTS (Private) ──
function serializeDateOnly(val: unknown): string {
  if (!val) return "";
  if (val instanceof Date) {
    const year = val.getFullYear();
    const month = String(val.getMonth() + 1).padStart(2, "0");
    const day = String(val.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const str = String(val);
  if (str.includes("T")) {
    return str.split("T")[0];
  }
  return str;
}

function serializeTimestamp(val: unknown): string {
  if (!val) return "";
  if (val instanceof Date) {
    return val.toISOString();
  }
  return String(val);
}

function serializeAppointmentRow(row: any): AppointmentRequest {
  if (!row) return row;
  return {
    ...row,
    id: String(row.id),
    preferred_date: serializeDateOnly(row.preferred_date),
    alternative_date: row.alternative_date ? serializeDateOnly(row.alternative_date) : undefined,
    created_at: serializeTimestamp(row.created_at),
  };
}

function serializeMessageRow(row: any): ContactMessage {
  if (!row) return row;
  return {
    ...row,
    id: String(row.id),
    created_at: serializeTimestamp(row.created_at),
  };
}

export async function createAppointmentRequest(data: Omit<AppointmentRequest, "id" | "status" | "created_at">): Promise<AppointmentRequest> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<AppointmentRequest>(
        `INSERT INTO appointment_requests 
          (first_name, last_name, email, phone, treatment_title, preferred_date, preferred_time, alternative_date, notes, privacy_accepted, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'neu')
         RETURNING *`,
        [
          data.first_name,
          data.last_name,
          data.email,
          data.phone,
          data.treatment_title,
          data.preferred_date,
          data.preferred_time || null,
          data.alternative_date || null,
          data.notes || null,
          data.privacy_accepted,
        ]
      );
      if (rows && rows.length > 0) return serializeAppointmentRow(rows[0]);
    } catch (err) {
      console.error("[PostgreSQL createAppointmentRequest Error]:", err);
      throw err;
    }
  }

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
    if (!error && inserted) return serializeAppointmentRow(inserted);
  }

  const newAppointment: AppointmentRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: "neu",
    created_at: new Date().toISOString(),
  };
  state.appointments.unshift(newAppointment);
  return newAppointment;
}

export async function getAppointmentRequests(): Promise<AppointmentRequest[]> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<AppointmentRequest>(
        "SELECT * FROM appointment_requests ORDER BY created_at DESC"
      );
      if (rows && rows.length > 0) return rows.map(serializeAppointmentRow);
      return [];
    } catch (err) {
      console.error("[PostgreSQL getAppointmentRequests Error]:", err);
    }
  }

  const supabase = await getDbClient(true);
  if (supabase) {
    const { data, error } = await supabase
      .from("appointment_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return (data as any[]).map(serializeAppointmentRow);
  }
  return (state.appointments || []).map(serializeAppointmentRow);
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentRequest["status"],
  internalNotes?: string
): Promise<boolean> {
  if (hasPostgresConfigured()) {
    try {
      if (internalNotes !== undefined) {
        await queryPg(
          "UPDATE appointment_requests SET status = $1, internal_notes = $2, updated_at = NOW() WHERE id = $3",
          [status, internalNotes, id]
        );
      } else {
        await queryPg(
          "UPDATE appointment_requests SET status = $1, updated_at = NOW() WHERE id = $2",
          [status, id]
        );
      }
      return true;
    } catch (err) {
      console.error("[PostgreSQL updateAppointmentStatus Error]:", err);
    }
  }

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

export async function deleteAppointmentRequest(id: string): Promise<boolean> {
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM appointment_requests WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deleteAppointmentRequest Error]:", err);
    }
  }

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

// ── 8. CONTACT MESSAGES (Private) ──
export async function createContactMessage(data: Omit<ContactMessage, "id" | "status" | "created_at">): Promise<ContactMessage> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ContactMessage>(
        `INSERT INTO contact_messages 
          (name, email, phone, subject, message, privacy_accepted, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'neu')
         RETURNING *`,
        [
          data.name,
          data.email,
          data.phone || null,
          data.subject,
          data.message,
          data.privacy_accepted,
        ]
      );
      if (rows && rows.length > 0) return serializeMessageRow(rows[0]);
    } catch (err) {
      console.error("[PostgreSQL createContactMessage Error]:", err);
      throw err;
    }
  }

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
    if (!error && inserted) return serializeMessageRow(inserted);
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: "neu",
    created_at: new Date().toISOString(),
  };
  state.messages.unshift(newMessage);
  return newMessage;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<ContactMessage>(
        "SELECT * FROM contact_messages ORDER BY created_at DESC"
      );
      if (rows && rows.length > 0) return rows.map(serializeMessageRow);
      return [];
    } catch (err) {
      console.error("[PostgreSQL getContactMessages Error]:", err);
    }
  }

  const supabase = await getDbClient(true);
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return (data as any[]).map(serializeMessageRow);
  }
  return (state.messages || []).map(serializeMessageRow);
}

export async function updateMessageStatus(
  id: string,
  status: ContactMessage["status"],
  internalNotes?: string
): Promise<boolean> {
  if (hasPostgresConfigured()) {
    try {
      if (internalNotes !== undefined) {
        await queryPg(
          "UPDATE contact_messages SET status = $1, internal_notes = $2, updated_at = NOW() WHERE id = $3",
          [status, internalNotes, id]
        );
      } else {
        await queryPg(
          "UPDATE contact_messages SET status = $1, updated_at = NOW() WHERE id = $2",
          [status, id]
        );
      }
      return true;
    } catch (err) {
      console.error("[PostgreSQL updateMessageStatus Error]:", err);
    }
  }

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

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM contact_messages WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deleteContactMessage Error]:", err);
    }
  }

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
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<MediaItem>("SELECT * FROM media ORDER BY created_at DESC");
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.error("[PostgreSQL getMediaItems Error]:", err);
    }
  }
  return state.media;
}

export async function addMediaItem(item: Omit<MediaItem, "id" | "created_at">): Promise<MediaItem> {
  if (hasPostgresConfigured()) {
    try {
      const rows = await queryPg<MediaItem>(
        `INSERT INTO media 
          (filename, original_name, file_path, public_url, mime_type, size_bytes, alt_text, caption, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          item.filename,
          item.original_name,
          item.file_path,
          item.public_url,
          item.mime_type,
          item.size_bytes,
          item.alt_text || null,
          item.caption || null,
          item.category || "general",
        ]
      );
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.error("[PostgreSQL addMediaItem Error]:", err);
    }
  }

  const newItem: MediaItem = {
    id: `med-${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };
  state.media.unshift(newItem);
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  if (hasPostgresConfigured()) {
    try {
      await queryPg("DELETE FROM media WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("[PostgreSQL deleteMediaItem Error]:", err);
    }
  }

  const idx = state.media.findIndex((m) => m.id === id);
  if (idx !== -1) {
    state.media.splice(idx, 1);
    return true;
  }
  return false;
}
