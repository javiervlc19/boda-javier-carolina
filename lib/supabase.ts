import { createClient } from "@supabase/supabase-js";

// Fallback values let `next build` prerender pages even when env vars are
// not yet configured (e.g. first local build before creating .env.local).
// In production, set the real values in Vercel / .env.local.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Client-side Supabase client. Uses the public anon key which, per
 * /supabase/schema.sql, is only allowed to INSERT into wedding_guests
 * (no SELECT), so it is safe to expose in the browser bundle.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WeddingGuestInsert = {
  name: string;
  attendance: "si" | "no";
  guest_count: number | null;
  companions: string[] | null;
  children: boolean | null;
  children_count: number | null;
  bus_route: string | null;
  return_bus: string | null;
  dietary_requirements: string | null;
  song: string | null;
  notes: string | null;
  message: string | null;
};

export type WeddingGuestRow = WeddingGuestInsert & {
  id: string;
  created_at: string;
};
