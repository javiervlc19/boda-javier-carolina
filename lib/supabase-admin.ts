import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { WeddingGuestRow } from "./supabase";

/**
 * Server-only Supabase client using the service role key. Never import
 * this file from a client component — the `server-only` import will
 * throw a build error if it ends up in a client bundle.
 */
export function getSupabaseAdminClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export async function fetchAllGuests(): Promise<WeddingGuestRow[]> {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from("wedding_guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as WeddingGuestRow[];
}
