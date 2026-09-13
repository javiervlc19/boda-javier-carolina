import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { updateGuest, deleteGuest } from "@/lib/supabase-admin";
import type { WeddingGuestUpdate } from "@/lib/supabase-admin";

const EDITABLE_FIELDS: (keyof WeddingGuestUpdate)[] = [
  "name",
  "attendance",
  "guest_count",
  "companions",
  "children",
  "children_count",
  "bus_route",
  "return_bus",
  "dietary_requirements",
  "song",
  "notes",
  "message",
];

function pickEditableFields(body: unknown): WeddingGuestUpdate {
  const patch: WeddingGuestUpdate = {};
  if (!body || typeof body !== "object") return patch;

  for (const field of EDITABLE_FIELDS) {
    if (field in (body as Record<string, unknown>)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (patch as any)[field] = (body as Record<string, unknown>)[field];
    }
  }

  return patch;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const patch = pickEditableFields(body);

  if (typeof patch.name === "string" && patch.name.trim().length < 2) {
    return NextResponse.json(
      { error: "El nombre debe tener al menos 2 caracteres" },
      { status: 400 }
    );
  }

  try {
    const guest = await updateGuest(id, patch);
    return NextResponse.json({ guest });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteGuest(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
