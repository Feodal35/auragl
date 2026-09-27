-- ==============================================================================
-- AURA GLOW BY MÜRVET — AIVEN.IO POSTGRESQL CANONICAL SCHEMA & SEED
-- 100% Pure Open-Source PostgreSQL Compatible (No Vendor Lock-In)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 9. APPOINTMENT REQUESTS
CREATE TABLE IF NOT EXISTS appointment_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 10. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
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

-- 14. CONTENT SECTIONS
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. CATEGORIES
INSERT INTO service_categories (id, name, slug, description, display_order, is_active) VALUES
(1, 'Wimpern', 'wimpern', 'Präzise Wimpernverlängerung von natürlicher 1:1 Technik bis Mega Volumen sowie pflegendes Lash Lifting.', 1, true),
(2, 'Gesichtsreinigung & Pflege', 'gesichtsreinigung-pflege', 'Hautverfeinernde apparative Behandlungen für Tiefenregeneration, Anti-Aging und den unverwechselbaren Hollywood Glow.', 2, true),
(3, 'Permanent Make-up', 'permanent-make-up', 'Meisterhafte Pigmentierung für perfekt definierte Powder Brows, Ombré Brows und sinnliche Lippen im Aquarell-Look.', 3, true),
(4, 'Schulungen', 'schulungen', 'Zertifizierte Einzelschulungen für angehende Lash- und PMU-Artists nach modernsten europäischen Techniken.', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 2. SERVICES
INSERT INTO services (id, category_id, title, slug, short_description, full_description, featured_image, duration_minutes, price_display, price, is_featured, display_order, is_active) VALUES
(1, 1, 'Klassische Wimpernverlängerung', 'wimpern-klassisch', 'Elegante 1:1 Einzeltechnik für einen dezenten, natürlich dichten und typgerechten Augenaufschlag.', 'Bei der klassischen 1:1 Methode wird auf jede gesunde Naturwimper eine einzelne synthetische Seidenwimper appliziert. Ideal für alle, die einen gepflegten Mascara-Effekt ohne Verklumpen wünschen.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85', 90, 'ab 60 €', 60, true, 1, true),
(2, 1, 'Volumen Soft / Medium', 'wimpern-volumen-soft-medium', 'Feinste handgefertigte Fächer (2D–3D) für samtige Fülle und ausdrucksstarke Blicke.', 'Leichte, mikrofeine Wimpernfächer sorgen für einen samtigen, volleren Look, der die Augen öffnet und dennoch federleicht zu tragen ist.', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=85', 105, 'ab 80 €', 80, true, 2, true),
(3, 1, 'Mega & Russian Volumen', 'wimpern-mega-russian-volumen', 'Dichte, tiefschwarze Fülle für glamouröse Augenblicke mit maximaler Haltbarkeit.', 'Hochpräzise Fächertechnik mit ultrafeinen Fasern (4D–6D). Schafft einen dichten Wimpernkranz mit atemberaubender Tiefenwirkung.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=85', 120, 'ab 95 €', 95, false, 3, true),
(4, 1, 'Wimpernlifting & Keratinpflege', 'wimpernlifting', 'Sanfter Schwung für die eigenen Naturwimpern inklusive nährender Keratinlaminierung.', 'Lash Lifting glättet, hebt und streckt die eigenen Naturwimpern schonend vom Ansatz an nach oben. Hält 6 bis 8 Wochen.', '/images/treatments/lash-lift-result.jpg', 60, 'ab 50 €', 50, true, 4, true),
(5, 2, 'Hollywood Glow Treatment', 'hollywood-glow', 'Das Signature Facial für sofortigen Feuchtigkeitskick, verfeinerte Poren und strahlenden Teint.', 'Tiefenreinigende Wirkstoffinfusion kombiniert mit hochkonzentrierten Seren. Hinterlässt die Haut seidig glatt, prall und makellos strahlend.', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85', 60, '95 €', 95, true, 5, true),
(6, 2, 'Microneedling Kollagen-Therapie', 'microneedling', 'Gezielte Zellerneuerung zur Narbenverfeinerung, Festigung und Faltenminderung.', 'Mikrofeine Nadelimpulse stimulieren die körpereigene Kollagen- und Elastinbildung. Wirkstoffe penetrieren tief in die Dermis für langanhaltende Glättung.', '/images/treatments/microneedling-facial.jpg', 75, '90 €', 90, true, 6, true),
(7, 2, 'Gesichtsreinigung inkl. Anti-Aging', 'gesichtsreinigung-anti-aging', 'Klassische Tiefenreinigung mit Dampf, Peeling, Ausreinigung und regenerierender Anti-Aging Maske.', 'Entfernt Talgüberschüsse und Verhornungen, klärt das Hautbild und versorgt anspruchsvolle Haut mit Antioxidantien und Feuchtigkeit.', 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1000&q=85', 60, '80 €', 80, false, 7, true),
(8, 2, 'Hollywood Peel (Carbon Laser)', 'hollywood-peel', 'Modernste Schälung für verfeinerte Poren, ebenmäßigen Ton und seidig glattes Hautgefühl.', '90-minütige Premium-Behandlung für alle, die eine sofortige Verbesserung der Hautstruktur ohne lange Ausfallzeit suchen.', 'https://images.unsplash.com/photo-1512290900672-1f55b9a5c88b?auto=format&fit=crop&w=1000&q=85', 90, '120 €', 120, false, 8, true),
(9, 2, 'Microdermabrasion', 'microdermabrasion', 'Sanfte apparative Abtragung der oberen Verhornung für seidige Zartheit.', 'Verfeinert das Hautrelief, mindert oberflächliche Pigmentstörungen und optimiert die Wirkstoffaufnahme nachfolgender Pflege.', 'https://images.unsplash.com/photo-1512290903671-17adc2a0d183?auto=format&fit=crop&w=1000&q=85', 60, '80 €', 80, false, 9, true),
(10, 2, 'LED Lichttherapie', 'led-lichttherapie', 'Fokussierte Lichtwellen zur Beruhigung, Kollagenstimulation und Aknebekämpfung.', 'Nicht-invasive Phototherapie. Regt zelluläre Reparaturprozesse an und beruhigt gestresste Haut in 40 Minuten.', 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85', 40, '80 €', 80, false, 10, true),
(11, 3, 'Powder Brows (Puder-Augenbrauen)', 'powder-brows', 'Sanfte Schattierungstechnik für natürliche Dichte und perfekt definierte Augenbrauen.', 'Durch feine Mikropunktierung entsteht ein natürlicher, pudriger Farbverlauf, der die Brauen optisch auffüllt und definiert.', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1000&q=85', 150, '350 €', 350, true, 11, true),
(12, 3, 'Ombré Brows', 'ombre-brows', 'Fließender Farbverlauf von transparent-hell am Brauenkopf zu intensiv-definiert am Schwanz.', 'Die Königsklasse des Permanent Make-ups: sorgt für einen eleganten 3D-Look mit meisterhafter Schattierung.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=85', 150, '350 €', 350, false, 12, true),
(13, 3, 'Lippenpigmentierung (Aquarell / Soft Lips)', 'lippen-pigmentierung', 'Sanfte Lippenkonturierung und Vollschattierung für frische Farbe und optisches Volumen.', 'Verleiht blassen oder unregelmäßigen Lippenkonturen eine frische, lebendige Farbe und optische Symmetrie.', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85', 180, 'ab 300 €', 300, true, 13, true),
(14, 4, 'Masterclass Wimpernverlängerung', 'schulung-wimpern', 'Umfassende Intensivausbildung in 1:1- und Volumentechnik mit Theorie, Praxis und Zertifikat.', 'Lerne die Kunst der professionellen Wimpernapplikation von Grund auf inklusive Hygiene, Anatomie, Fächertechnik und Kundenberatung.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85', 480, '900 €', 900, true, 14, true),
(15, 4, 'Masterclass Permanent Make-up', 'schulung-pmu', 'Praxisorientierte PMU-Ausbildung für Powder Brows und Lippenpigmentierung.', 'Erlange meisterhafte Präzision an Pigmentiergeräten, Farblehre, Nadelmodulen und Hauttypen.', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1000&q=85', 960, '1.500 €', 1500, true, 15, true)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for tables with explicit IDs
SELECT setval('service_categories_id_seq', (SELECT MAX(id) FROM service_categories));
SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));

-- 3. PRICING
INSERT INTO pricing (id, category_id, subcategory_name, treatment_name, variant_name, duration, price, price_display, display_order) VALUES
(1, 1, 'Klassisch', 'Klassische Wimpernverlängerung', 'Neuset', '90 Min.', 60, '60 €', 1),
(2, 1, 'Klassisch', 'Klassische Wimpernverlängerung', 'Auffüllen 3 Wochen', '60 Min.', 40, '40 €', 2),
(3, 1, 'Klassisch', 'Klassische Wimpernverlängerung', 'Auffüllen 4 Wochen', '75 Min.', 50, '50 €', 3),
(4, 1, 'Volumen Soft/Medium', 'Volumen Soft / Medium', 'Neuset', '105 Min.', 80, '80 €', 4),
(5, 1, 'Volumen Soft/Medium', 'Volumen Soft / Medium', 'Auffüllen 3 Wochen', '60 Min.', 40, '40 €', 5),
(6, 1, 'Volumen Soft/Medium', 'Volumen Soft / Medium', 'Auffüllen 4 Wochen', '75 Min.', 50, '50 €', 6),
(7, 1, 'Mega Volumen', 'Mega Volumen', 'Neuset', '120 Min.', 95, '95 €', 7),
(8, 1, 'Mega Volumen', 'Mega Volumen', 'Auffüllen 3 Wochen', '60 Min.', 50, '50 €', 8),
(9, 1, 'Mega Volumen', 'Mega Volumen', 'Auffüllen 4 Wochen', '75 Min.', 65, '65 €', 9),
(10, 1, 'Russian Volumen', 'Russian Volumen', 'Neuset', '120 Min.', 100, '100 €', 10),
(11, 1, 'Russian Volumen', 'Russian Volumen', 'Auffüllen 3 Wochen', '75 Min.', 80, '80 €', 11),
(12, 1, 'Russian Volumen', 'Russian Volumen', 'Auffüllen 4 Wochen', '90 Min.', 90, '90 €', 12),
(13, 1, 'Lifting', 'Wimpernlifting', 'Standard', '45 Min.', 50, '50 €', 13),
(14, 1, 'Lifting', 'Wimpernlifting inkl. Färben', 'Inklusive Färben & Keratin', '60 Min.', 70, '70 €', 14),
(15, 2, NULL, 'Gesichtsreinigung inkl. Anti-Aging', 'Klassisch', '60 Min.', 80, '80 €', 15),
(16, 2, NULL, 'Microneedling', 'Kollagen-Therapie', '75 Min.', 90, '90 €', 16),
(17, 2, NULL, 'Hollywood Glow', 'Signature Facial', '60 Min.', 95, '95 €', 17),
(18, 2, NULL, 'Hollywood Peel', 'Carbon Laser Peeling', '90 Min.', 120, '120 €', 18),
(19, 2, NULL, 'Microdermabrasion', 'Hautverfeinerung', '60 Min.', 80, '80 €', 19),
(20, 2, NULL, 'LED Lichttherapie', 'Phototherapie', '40 Min.', 80, '80 €', 20),
(21, 3, 'Powder Brows', 'Powder Brows', 'Erstbehandlung', '150 Min.', 350, '350 €', 21),
(22, 3, 'Powder Brows', 'Powder Brows', 'Auffrischung nach 12 Monaten', '90 Min.', 200, '200 €', 22),
(23, 3, 'Powder Brows', 'Powder Brows', 'Auffrischung nach 24 Monaten', '120 Min.', 150, '150 €', 23),
(24, 3, 'Ombre Brows', 'Ombre Brows', 'Erstbehandlung', '150 Min.', 350, '350 €', 24),
(25, 3, 'Ombre Brows', 'Ombre Brows', 'Auffrischung nach 12 Monaten', '90 Min.', 200, '200 €', 25),
(26, 3, 'Ombre Brows', 'Ombre Brows', 'Auffrischung nach 24 Monaten', '120 Min.', 150, '150 €', 26),
(27, 3, 'Lippen', 'Lippenpigmentierung', 'Soft Lips', '120 Min.', 300, '300 €', 27),
(28, 3, 'Lippen', 'Lippenpigmentierung', 'Aquarell Lips', '150 Min.', 350, '350 €', 28),
(29, 3, 'Lippen', 'Lippenpigmentierung', 'Mit Lifteffekt', '180 Min.', 360, '360 €', 29),
(30, 4, NULL, 'Lash Lift Schulung', 'Theorie & Praxis am Modell', '1 Tag', 400, '400 €', 30),
(31, 4, NULL, 'Wimpern Schulung (1:1 & Volumen)', 'Intensivkurs inkl. Starterset', '2 Tage', 900, '900 €', 31),
(32, 4, NULL, 'PMU Schulung (Powder Brows)', 'Masterclass inkl. Maschine', '3 Tage', 1500, '1.500 €', 32),
(33, 4, NULL, 'Microneedling Schulung', 'Hautanalyse & Needling-Technik', '1 Tag', 500, '500 €', 33),
(34, 4, NULL, 'Alle Schulungen insgesamt', 'Komplettausbildung Beauty Artist', 'Intensiv', 3000, '3.000 €', 34)
ON CONFLICT (id) DO NOTHING;

SELECT setval('pricing_id_seq', (SELECT MAX(id) FROM pricing));

-- 4. OPENING HOURS
INSERT INTO opening_hours (id, day_of_week, day_name, open_time, close_time, is_closed, custom_label, display_order) VALUES
(1, 1, 'Montag', '09:00', '19:00', false, NULL, 1),
(2, 2, 'Dienstag', '09:00', '19:00', false, NULL, 2),
(3, 3, 'Mittwoch', '09:00', '19:00', false, NULL, 3),
(4, 4, 'Donnerstag', '09:00', '19:00', false, NULL, 4),
(5, 5, 'Freitag', '09:00', '19:00', false, NULL, 5),
(6, 6, 'Samstag', '10:00', '16:00', false, NULL, 6),
(7, 7, 'Sonntag', NULL, NULL, true, 'Geschlossen (Nur nach Vereinbarung)', 7)
ON CONFLICT (id) DO NOTHING;

SELECT setval('opening_hours_id_seq', (SELECT MAX(id) FROM opening_hours));

-- 5. SITE SETTINGS
INSERT INTO site_settings (key, value) VALUES
('business', '{
    "business_name": "Aura Glow by Mürvet",
    "owner_name": "Mürvet",
    "street": "Königsallee 42",
    "postal_code": "40212",
    "city": "Düsseldorf",
    "country": "Deutschland",
    "phone": "+49 176 12345678",
    "phone_display": "+49 176 1234 5678",
    "email": "kontakt@auraglow.de",
    "whatsapp": "+4917612345678",
    "instagram_url": "https://instagram.com/auraglow_bymurvet",
    "tiktok_url": "",
    "facebook_url": "",
    "google_maps_url": "https://maps.google.com/?q=Dusseldorf"
}'::jsonb),
('brand', '{
    "brand_name": "Aura Glow by Mürvet",
    "tagline": "Beauty & Aesthetics",
    "primary_color": "#B88770",
    "secondary_color": "#EFE6DD",
    "accent_color": "#936650",
    "background_color": "#F7F3EE",
    "text_primary": "#392D29",
    "text_secondary": "#756A63"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 6. DESIGN SETTINGS
INSERT INTO design_settings (section_id, background_color, background_image_desktop, background_image_mobile, image_position, image_size, overlay_color, overlay_opacity, text_color) VALUES
('hero', '#211A18', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85', 'center center', 'cover', '#211A18', 0.45, '#FFFFFF'),
('intro', '#F7F3EE', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#392D29'),
('treatments', '#FAF6F1', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#392D29'),
('philosophy', '#211A18', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=2000&q=80', NULL, 'center center', 'cover', '#211A18', 0.65, '#FFFFFF'),
('gallery', '#F7F3EE', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#392D29'),
('pricing_cta', '#EFE6DD', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#392D29'),
('about_murvet', '#FAF6F1', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#392D29'),
('appointment_cta', '#211A18', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=85', NULL, 'center center', 'cover', '#211A18', 0.70, '#FFFFFF'),
('footer', '#211A18', NULL, NULL, 'center center', 'cover', '#211A18', 0.0, '#FFFFFF')
ON CONFLICT (section_id) DO NOTHING;

-- 7. CONTENT SECTIONS
INSERT INTO content_sections (section_id, title, eyebrow, headline, body_text, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url) VALUES
('hero', 'Aura Glow by Mürvet', 'Beauty & Aesthetics by Mürvet', 'Deine Schönheit. Unser Anspruch.', 'Entdecke individuelle Beauty-Behandlungen für deine natürliche Schönheit und ein strahlendes Selbstbewusstsein.', 'Termin anfragen', '/termin', 'Behandlungen entdecken', '/leistungen'),
('intro', 'Philosophie & Handwerk', 'AURA GLOW BY MÜRVET', 'Schönheit beginnt dort, wo du dich selbst wohlfühlst.', 'In unserem Studio vereinen wir präzises Handwerk, meisterhafte Ästhetik und erstklassige Behandlungen zu einem ganzheitlichen Wohlfühlerlebnis. Jeder Blick, jede Kontur und jedes Hautbedürfnis ist einzigartig – genau so behandeln wir dich.', 'Mehr über uns', '/ueber-uns', NULL, NULL),
('philosophy', 'Unser Leitgedanke', 'EXKLUSIVITÄT & PRÄZISION', 'Individuelle Ästhetik statt Einheitslook.', 'Wir glauben an sanfte Betonung, harmonische Proportionen und höchste Produktqualität. Ob langanhaltendes Wimperndesign, makellose Puderbrauen oder regenerierende Facials: Deine Ausstrahlung steht im Mittelpunkt.', 'Alle Behandlungen ansehen', '/leistungen', NULL, NULL),
('about_murvet', 'Die Gründerin', 'ÜBER MÜRVET', 'Leidenschaft für feine Ästhetik und perfekte Linien.', 'Mit geschultem Blick für Symmetrie und natürlicher Harmonie widmet sich Mürvet der individuellen Schönheit jeder Kundin. Jede Behandlung wird mit Geduld, meisterhafter Präzision und höchsten Hygienestandards ausgeführt.', 'Persönlichen Termin anfragen', '/termin', NULL, NULL),
('appointment_cta', 'Bereit für deinen Glow?', 'ZEIT FÜR DICH', 'Gönne dir deine persönliche Auszeit.', 'Vereinbare jetzt ganz unkompliziert deine individuelle Terminanfrage. Wir beraten dich typgerecht und finden die perfekte Behandlung für dich.', 'Jetzt Termin anfragen', '/termin', 'Preise ansehen', '/preise')
ON CONFLICT (section_id) DO NOTHING;
