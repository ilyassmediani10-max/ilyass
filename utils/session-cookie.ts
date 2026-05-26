import type { UserRole } from "@/types/auth-t";

export const AUTH_COOKIE = "renovation_session";

export type AuthSession = {
  email: string;
  exp: number;
  name: string;
  role: UserRole;
  sub: string;
};

const SESSION_DAYS = 7;

function getSecret() {
  return process.env.AUTH_SECRET ?? "renovation-manager-dev-secret";
}

function toBase64Url(value: Uint8Array | string) {
  const text =
    typeof value === "string"
      ? value
      : String.fromCharCode(...Array.from(value));

  return btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  return atob(padded);
}

async function sign(value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

export async function createSessionCookie(session: Omit<AuthSession, "exp">) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
  const payload = toBase64Url(JSON.stringify({ ...session, exp }));

  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionCookie(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature || signature !== (await sign(payload))) {
    return null;
  }

  const session = JSON.parse(fromBase64Url(payload)) as AuthSession;

  if (session.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return session;
}
