-- Wedding guests table for Javier & Carolina's wedding website.
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists public.wedding_guests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  attendance text not null check (attendance in ('si', 'no')),
  guest_count int,
  companions jsonb,
  children boolean,
  children_count int,
  bus_route text,
  return_bus text,
  dietary_requirements text,
  song text,
  notes text,
  message text
);

alter table public.wedding_guests enable row level security;

-- Anonymous visitors (the public site, using the anon key) may only INSERT
-- their own RSVP. They can never SELECT/UPDATE/DELETE existing rows, so one
-- guest cannot read another guest's data through the public API.
create policy "Anon can insert wedding guests"
  on public.wedding_guests
  for insert
  to anon
  with check (true);

-- No SELECT policy is defined for the `anon` role on purpose. The admin
-- panel (/admin) reads all rows server-side using the SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS entirely and is never exposed to the browser. If you
-- prefer to avoid the service role key, you can instead create a Supabase
-- Auth user for yourself and add a SELECT policy scoped to `authenticated`,
-- then sign in server-side with that user's session instead.
