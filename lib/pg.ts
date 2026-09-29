import { Pool } from "pg";
import type { QueryResultRow } from "pg";

let pool: Pool | null = null;

export function hasPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getPgPool(): Pool | null {
  if (!hasPostgresConfigured()) {
    return null;
  }

  if (!pool) {
    const rawConnectionString = process.env.DATABASE_URL || "";

    // Aiven SSL fix: strip sslmode so pg-connection-string does not force strict CA verification
    let cleanConnectionString = rawConnectionString;
    try {
      const url = new URL(rawConnectionString);
      url.searchParams.delete("sslmode");
      cleanConnectionString = url.toString();
    } catch {
      cleanConnectionString = rawConnectionString.replace(/[?&]sslmode=[^&]+/, "");
    }

    pool = new Pool({
      connectionString: cleanConnectionString,
      ssl: { rejectUnauthorized: false },
      max: 3, // Safe for multiple Next.js worker threads within Aiven's 20-connection limit
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
      allowExitOnIdle: true,
    });

    pool.on("error", (err) => {
      console.error("[PostgreSQL Pool Error]:", err.message);
    });
  }

  return pool;
}

export async function queryPg<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const p = getPgPool();
  if (!p) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = await p.connect();
  try {
    const res = await client.query<T>(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
