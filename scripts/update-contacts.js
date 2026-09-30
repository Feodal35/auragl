const { Pool } = require('pg');

async function run() {
  const raw = process.env.DATABASE_URL || '';
  const url = new URL(raw);
  url.searchParams.delete('sslmode');

  const pool = new Pool({
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });

  // Update phone, whatsapp, and instagram_url in one go
  const res = await pool.query(`
    UPDATE site_settings
    SET value = value
      || '{"phone": "+491739026031"}'::jsonb
      || '{"phone_display": "+49 173 9026031"}'::jsonb
      || '{"whatsapp": "+491739026031"}'::jsonb
      || '{"instagram_url": "https://instagram.com/aura6low"}'::jsonb,
      updated_at = NOW()
    WHERE key = 'business'
  `);
  console.log('✅ Updated business settings, rows affected:', res.rowCount);

  // Verify
  const check = await pool.query(`
    SELECT
      value->>'phone' as phone,
      value->>'phone_display' as phone_display,
      value->>'whatsapp' as whatsapp,
      value->>'instagram_url' as instagram
    FROM site_settings WHERE key = 'business'
  `);
  console.log('Current DB values:', check.rows[0]);

  await pool.end();
}

run().catch(e => { console.error('Error:', e.message); process.exit(1); });
