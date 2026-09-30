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

  const res = await pool.query(`
    UPDATE site_settings
    SET value = value || '{"owner_name": "Mürvet Dincer"}'::jsonb,
        updated_at = NOW()
    WHERE key = 'business'
  `);
  console.log('Updated rows:', res.rowCount);

  const check = await pool.query(`SELECT value->>'owner_name' as owner FROM site_settings WHERE key='business'`);
  console.log('DB owner_name:', check.rows[0].owner);

  await pool.end();
}

run().catch(e => { console.error(e.message); process.exit(1); });
