/**
 * Cryptographic Token Utility for Aura Glow Admin Sessions
 * Uses standard Web Crypto API (supported in Node.js & Edge Runtime).
 * Implements HMAC-SHA256 signature verification to prevent cookie forgery.
 */

export interface TokenPayload {
  email: string;
  role: string;
  exp: number;
}

const DEFAULT_SECRET = "aura-glow-production-secret-local-dev-2026";

function getSecretKey(): string {
  return process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
}

/**
 * Creates an HMAC-SHA256 signed session token: <base64url(payload)>.<base64url(signature)>
 */
export async function signSessionToken(payload: Omit<TokenPayload, "exp">, expiresInMs: number = 7 * 24 * 60 * 60 * 1000): Promise<string> {
  const fullPayload: TokenPayload = {
    ...payload,
    exp: Date.now() + expiresInMs,
  };

  const dataStr = JSON.stringify(fullPayload);
  const dataB64 = Buffer.from(dataStr, "utf-8").toString("base64url");
  const secret = getSecretKey();

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(dataB64));
  const sigB64 = Buffer.from(sigBuffer).toString("base64url");

  return `${dataB64}.${sigB64}`;
}

/**
 * Verifies an HMAC-SHA256 signed session token. Returns null if invalid, expired, or tampered.
 */
export async function verifySessionToken(token: string): Promise<TokenPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [dataB64, sigB64] = parts;
  const secret = getSecretKey();

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = Buffer.from(sigB64, "base64url");
    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(dataB64));

    if (!isValid) {
      return null;
    }

    const jsonStr = Buffer.from(dataB64, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr) as TokenPayload;

    if (!payload || !payload.email || typeof payload.exp !== "number") {
      return null;
    }

    // Expiration check
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
