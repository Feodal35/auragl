export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
}

export interface ServiceItem {
  id: number;
  category_id: number;
  category_name?: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  featured_image: string;
  duration_minutes: number;
  price_display: string;
  price: number;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
}

export interface PriceRow {
  id: number;
  category_id: number;
  subcategory_name?: string | null;
  treatment_name: string;
  variant_name?: string | null;
  duration?: string | null;
  price: number;
  price_display: string;
  show_on_request?: boolean;
  note?: string | null;
  display_order: number;
  is_active: boolean;
}

export interface GalleryItem {
  id: number;
  image_url: string;
  before_image_url?: string | null;
  after_image_url?: string | null;
  caption: string;
  category: string;
  is_before_after: boolean;
  display_order: number;
  is_active: boolean;
}

export interface OpeningHour {
  id: number;
  day_of_week: number;
  day_name: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  custom_label: string | null;
  display_order: number;
}

export interface BusinessSettings {
  business_name: string;
  owner_name: string;
  street: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string;
  phone_display: string;
  email: string;
  whatsapp: string;
  instagram_url: string;
  tiktok_url?: string;
  facebook_url?: string;
  google_maps_url?: string;
  booking_info?: string;
}

export interface BrandSettings {
  brand_name: string;
  tagline: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_primary: string;
  text_secondary: string;
}

export interface DesignSectionSetting {
  section_id: string;
  background_color?: string;
  background_image_desktop?: string | null;
  background_image_mobile?: string | null;
  image_position?: string;
  image_size?: string;
  overlay_color?: string;
  overlay_opacity?: number;
  text_color?: string;
}

export interface ContentSection {
  section_id: string;
  title?: string;
  eyebrow?: string;
  headline?: string;
  body_text?: string;
  primary_cta_label?: string;
  primary_cta_url?: string;
  secondary_cta_label?: string;
  secondary_cta_url?: string;
}

export interface AppointmentRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  treatment_title: string;
  preferred_date: string;
  preferred_time?: string;
  alternative_date?: string;
  notes?: string;
  privacy_accepted: boolean;
  status: 'neu' | 'bestaetigt' | 'abgelehnt' | 'erledigt';
  internal_notes?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacy_accepted: boolean;
  status: 'neu' | 'gelesen' | 'beantwortet' | 'archiviert';
  internal_notes?: string;
  created_at: string;
}

export interface SeoSetting {
  route: string;
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  no_index?: boolean;
  canonical_url?: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  alt_text?: string;
  caption?: string;
  category?: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  treatment: string;
  text: string;
  rating: number;
  date: string;
  is_verified: boolean;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: number;
  tag: string;
  title: string;
  image: string;
  image_alt?: string;
  problem: string;
  solution: string;
  result: string;
  duration: string;
  longevity: string;
  treatment_slug: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}


