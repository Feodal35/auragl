-- ==============================================================================
-- AURA GLOW BY MÜRVET — CANONICAL DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Fully Normalized, RLS-Hardened, Production-Ready Architecture
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('neu', 'bestaetigt', 'abgelehnt', 'erledigt');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE message_status AS ENUM ('neu', 'gelesen', 'beantwortet', 'archiviert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES / ADMIN USERS
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS service_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERVICES
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES service_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    featured_image TEXT,
    duration_minutes INT,
    price_display TEXT,
    price NUMERIC(10, 2),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRICING (Source of Truth for All Treatments & Variants)
CREATE TABLE IF NOT EXISTS pricing (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES service_categories(id) ON DELETE CASCADE,
    subcategory_name TEXT,
    treatment_name TEXT NOT NULL,
    variant_name TEXT,
    duration TEXT,
    price NUMERIC(10, 2) NOT NULL,
    price_display TEXT NOT NULL,
    show_on_request BOOLEAN DEFAULT FALSE,
    note TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MEDIA LIBRARY
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    category TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GALLERY ITEMS (Portfolio / Before & After)
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    before_image_url TEXT,
    after_image_url TEXT,
    caption TEXT NOT NULL,
    category TEXT NOT NULL,
    is_before_after BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. APPOINTMENT REQUESTS (Private)
CREATE TABLE IF NOT EXISTS appointment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    treatment_title TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT,
    alternative_date DATE,
    notes TEXT,
    privacy_accepted BOOLEAN NOT NULL DEFAULT TRUE,
    status appointment_status DEFAULT 'neu',
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACT MESSAGES (Private)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    privacy_accepted BOOLEAN NOT NULL DEFAULT TRUE,
    status message_status DEFAULT 'neu',
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. OPENING HOURS
CREATE TABLE IF NOT EXISTS opening_hours (
    id SERIAL PRIMARY KEY,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1 = Montag, 7 = Sonntag
    day_name TEXT NOT NULL,
    open_time TEXT,
    close_time TEXT,
    is_closed BOOLEAN DEFAULT FALSE,
    custom_label TEXT,
    display_order INT DEFAULT 0
);

-- 12. SITE & BUSINESS SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. DESIGN & BACKGROUND SETTINGS
CREATE TABLE IF NOT EXISTS design_settings (
    section_id TEXT PRIMARY KEY,
    background_color TEXT,
    background_image_desktop TEXT,
    background_image_mobile TEXT,
    image_position TEXT DEFAULT 'center center',
    image_size TEXT DEFAULT 'cover',
    overlay_color TEXT DEFAULT '#211A18',
    overlay_opacity NUMERIC(3, 2) DEFAULT 0.40,
    text_color TEXT DEFAULT '#392D29',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. CONTENT SECTIONS (Headlines, Subtitles, Storytelling blocks)
CREATE TABLE IF NOT EXISTS content_sections (
    section_id TEXT PRIMARY KEY,
    title TEXT,
    eyebrow TEXT,
    headline TEXT,
    body_text TEXT,
    primary_cta_label TEXT,
    primary_cta_url TEXT,
    secondary_cta_label TEXT,
    secondary_cta_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SEO SETTINGS
CREATE TABLE IF NOT EXISTS seo_settings (
    route TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    no_index BOOLEAN DEFAULT FALSE,
    canonical_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. ADMIN ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_pricing_category ON pricing(category_id);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_items(is_active);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointment_requests(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointment_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Only active / published records)
CREATE POLICY "Public Read Active Categories" ON service_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Pricing" ON pricing FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Gallery" ON gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Opening Hours" ON opening_hours FOR SELECT USING (true);
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Design Settings" ON design_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Content Sections" ON content_sections FOR SELECT USING (true);
CREATE POLICY "Public Read SEO Settings" ON seo_settings FOR SELECT USING (true);

-- Public Form Submissions (Insert Only, Never Read)
CREATE POLICY "Public Insert Appointments" ON appointment_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Helper function to verify admin role from profiles table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Full Access Policies (strictly users with role='admin' in profiles)
CREATE POLICY "Admin All Service Categories" ON service_categories FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Services" ON services FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Pricing" ON pricing FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Media" ON media FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Gallery" ON gallery_items FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Appointments" ON appointment_requests FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Messages" ON contact_messages FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Hours" ON opening_hours FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Site Settings" ON site_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Design Settings" ON design_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Content Sections" ON content_sections FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All SEO Settings" ON seo_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin All Activity Logs" ON admin_activity_logs FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

