import { NextRequest, NextResponse } from "next/server";
import { setAdminSessionCookie } from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ ok: false, error: "Falta la contraseña" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
  }

  await setAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
