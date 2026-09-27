/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

// Load .env.local if DATABASE_URL is not in process.env
function loadEnvLocal() {
  if (process.env.DATABASE_URL) return;

  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function main() {
  loadEnvLocal();

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("\n❌ HATA: DATABASE_URL bulunamadı!");
    console.error("Lütfen .env.local dosyanıza Aiven PostgreSQL bağlantı adresinizi ekleyin:");
    console.error('DATABASE_URL="postgres://avnadmin:SIFRE@pg-3c074592-...aivencloud.com:20201/defaultdb?sslmode=require"\n');
    process.exit(1);
  }

  console.log("⏳ Aiven.io PostgreSQL veritabanına bağlanılıyor...");

  const isSsl = connectionString.includes("sslmode=require") || true;
  const client = new Client({
    connectionString,
    ssl: isSsl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log("✅ Aiven PostgreSQL bağlantısı başarılı!\n");

    const schemaPath = path.join(__dirname, "..", "database", "aiven_schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("⏳ Şema ve başlangıç verileri yükleniyor...");
    await client.query(sql);

    // Verify created tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log(`\n🎉 BAŞARILI! Toplam ${res.rows.length} tablo oluşturuldu ve veriler eklendi:`);
    for (const row of res.rows) {
      console.log(`  ✓ ${row.table_name}`);
    }
    console.log("\nArtık siteniz canlı olarak Aiven veritabanını kullanmaya hazırdır!");
  } catch (err) {
    console.error("\n❌ Veritabanı kurulumu sırasında hata oluştu:", err.message);
  } finally {
    await client.end();
  }
}

main();
