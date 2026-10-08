import { Pool } from "pg";
import type { QueryResultRow } from "pg";

const globalForPg = globalThis as unknown as { __pgPool?: Pool };

export function hasPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getPgPool(): Pool | null {
  if (!hasPostgresConfigured()) {
    return null;
  }

  if (!globalForPg.__pgPool) {
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

    globalForPg.__pgPool = new Pool({
      connectionString: cleanConnectionString,
      ssl: { rejectUnauthorized: false },
      max: 3, // Optimal for serverless: prevents saturating DB connection limits
      idleTimeoutMillis: 1500, // Release idle sockets fast in serverless
      connectionTimeoutMillis: 8000,
      allowExitOnIdle: true,
    });

    globalForPg.__pgPool.on("error", (err) => {
      console.error("[PostgreSQL Pool Error]:", err.message);
    });
  }

  return globalForPg.__pgPool;
}

export async function queryPg<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const p = getPgPool();
  if (!p) {
    throw new Error("DATABASE_URL is not configured.");
  }

  // Node-postgres can fail if bind params contain undefined; convert to null
  const safeParams = params ? params.map((v) => (v === undefined ? null : v)) : undefined;

  // Execute with automatic 1-time retry for stale/closed serverless sockets
  for (let attempt = 1; attempt <= 2; attempt++) {
    let client;
    let hasError = false;
    try {
      client = await p.connect();
      const res = await client.query<T>(text, safeParams);
      return res.rows;
    } catch (err: any) {
      hasError = true;
      const msg = err?.message || "";
      const isTransient =
        msg.includes("Connection terminated") ||
        msg.includes("connection timeout") ||
        msg.includes("ECONNRESET") ||
        msg.includes("socket closed") ||
        msg.includes("remaining connection slots") ||
        err?.code === "57P01" ||
        err?.code === "53300";

      if (attempt === 1 && isTransient) {
        console.warn(`[queryPg] Transient connection drop on attempt 1, retrying with fresh socket...`);
        await new Promise((r) => setTimeout(r, 250));
        continue;
      }
      throw err;
    } finally {
      if (client) {
        // Destroy socket if an error occurred to prevent contaminated pool
        client.release(hasError);
      }
    }
  }

  throw new Error("Query execution failed after retry.");
}
