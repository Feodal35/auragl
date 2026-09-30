const { Pool } = require('pg');

async function updateLocation() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    const res = await pool.query("SELECT value FROM site_settings WHERE key = 'business'");
    console.log("Current DB business settings:", res.rows[0]?.value);

    const currentVal = res.rows[0]?.value || {};
    const updatedVal = {
      ...currentVal,
      business_name: currentVal.business_name || "Aura Glow by Mürvet",
      owner_name: currentVal.owner_name || "Mürvet Dincer",
      street: "Ernst-Moritz-Arndt-Straße 13",
      postal_code: "31224",
      city: "Peine",
      country: "Deutschland",
      phone: currentVal.phone || "+49 176 12345678",
      phone_display: currentVal.phone_display || "+49 176 1234 5678",
      email: currentVal.email || "kontakt@auraglow.de",
      whatsapp: currentVal.whatsapp || "+4917612345678",
      instagram_url: currentVal.instagram_url || "https://instagram.com/aura6low",
      google_maps_url: "https://maps.google.com/?q=Ernst-Moritz-Arndt-Stra%C3%9Fe+13+31224+Peine",
      booking_info: "Termine nur nach vorheriger Vereinbarung.",
    };

    await pool.query(
      `INSERT INTO site_settings (key, value, updated_at) 
       VALUES ('business', $1, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify(updatedVal)]
    );
    console.log("Successfully updated site_settings 'business' in database!");

    // Also update any services seo_title that mention Düsseldorf
    const servicesRes = await pool.query("SELECT id, title, seo_title FROM services");
    for (const service of servicesRes.rows) {
      if (service.seo_title && service.seo_title.includes("Düsseldorf")) {
        const newSeoTitle = service.seo_title.replace(/Düsseldorf/g, "Peine");
        await pool.query("UPDATE services SET seo_title = $1 WHERE id = $2", [newSeoTitle, service.id]);
        console.log(`Updated service ${service.id} seo_title to: ${newSeoTitle}`);
      }
    }
  } catch (err) {
    console.error("Database update error:", err.message);
  } finally {
    await pool.end();
  }
}

updateLocation();
