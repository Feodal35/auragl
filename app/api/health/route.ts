import { NextResponse } from "next/server";
import { hasPostgresConfigured, queryPg } from "@/lib/pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasDb = hasPostgresConfigured();
  let dbConnected = false;
  let dbData: any = null;
  let error: string | null = null;

  if (hasDb) {
    try {
      const rows = await queryPg<{ value: any }>(
        "SELECT value FROM site_settings WHERE key = 'business' LIMIT 1"
      );
      if (rows && rows.length > 0) {
        dbConnected = true;
        dbData = {
          owner_name: rows[0].value?.owner_name,
          phone: rows[0].value?.phone,
          instagram: rows[0].value?.instagram_url,
        };
      }
    } catch (err: any) {
      error = err.message;
    }
  }

  return NextResponse.json({
    hasDbEnv: hasDb,
    dbConnected,
    dbData,
    error,
    timestamp: new Date().toISOString(),
  });
}
