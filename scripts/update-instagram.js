const { Pool } = require('pg');

async function run() {
  const raw = process.env.DATABASE_URL || '';
  const url = new URL(raw);
  url.searchParams.delete('sslmode');

  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: false } });

  const res = await pool.query(
    `UPDATE site_settings
     SET value = jsonb_set(value, '{instagram_url}', '"https://instagram.com/aura6low"'),
         updated_at = NOW()
     WHERE key = 'business'`
  );
  console.log('Rows updated:', res.rowCount);

  const check = await pool.query(`SELECT value->>'instagram_url' as ig FROM site_settings WHERE key='business'`);
  console.log('New instagram_url in DB:', check.rows[0]?.ig);

  await pool.end();
}

run().catch(e => { console.error(e.message); process.exit(1); });
