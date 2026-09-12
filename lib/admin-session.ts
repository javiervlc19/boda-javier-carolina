import "server-only";
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "wedding_admin_session";

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "dev-secret";
}

function signValue(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const value = `admin:${Date.now()}`;
  const signature = signValue(value);
  return `${Buffer.from(value).toString("base64url")}.${signature}`;
}

function verifySessionToken(token: string): boolean {
  const [encodedValue, signature] = token.split(".");
  if (!encodedValue || !signature) return false;
  const value = Buffer.from(encodedValue, "base64url").toString("utf8");
  const expected = signValue(value);
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
