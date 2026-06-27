-- Mentora bookings schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  mentor_id text not null,
  mentor_name text not null,
  slot_date date not null,
  slot_time text not null,
  parent_name text not null,
  parent_email text not null,
  parent_phone text not null,
  student_name text not null,
  student_grade integer not null check (student_grade between 2 and 10),
  subject text not null,
  booking_type text not null default 'regular',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_link text not null default '',
  notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists bookings_slot_unique
  on public.bookings (slot_date, slot_time)
  where status != 'cancelled';

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;

-- Service role bypasses RLS; anon has no direct access (API uses service role)
