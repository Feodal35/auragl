const { Client } = require('pg');

async function test() {
  const raw = process.env.DATABASE_URL || '';
  const url = new URL(raw);
  url.searchParams.delete('sslmode');
  const client = new Client({ connectionString: url.toString(), ssl: { rejectUnauthorized: false } });

  await client.connect();
  console.log('Connected to DB');

  const res = await client.query(
    `INSERT INTO appointment_requests 
      (first_name, last_name, email, phone, treatment_title, preferred_date, preferred_time, alternative_date, notes, privacy_accepted, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'neu')
     RETURNING *`,
    ['Test', 'User', 'test@example.com', '+491739026031', 'Wimpernverlängerung', '2026-10-15', 'Vormittags (09:00 - 13:00)', null, 'Test not', true]
  );
  console.log('Inserted appointment ID:', res.rows[0].id);

  const all = await client.query('SELECT id, first_name, last_name, created_at FROM appointment_requests ORDER BY created_at DESC');
  console.log('Total appointments in DB now:', all.rowCount);
  console.log('Latest row:', all.rows[0]);

  // Clean up the test row
  await client.query('DELETE FROM appointment_requests WHERE id = $1', [res.rows[0].id]);
  console.log('Cleaned up test row');

  await client.end();
}

test().catch(e => { console.error('Error:', e.message); process.exit(1); });
