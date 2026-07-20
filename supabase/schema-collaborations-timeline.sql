-- WeKonnect — Collaboration posts + timeline
-- Safe to re-run. Paste into Supabase → SQL Editor → Run

-- 1) Create the table if it does not exist yet
create table if not exists public.collaborations (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  discipline text not null,
  city text not null default '',
  country text not null default '',
  timeline text not null default '',
  created_at timestamptz not null default now()
);

-- 2) Add timeline if the table already existed without it
alter table public.collaborations
  add column if not exists timeline text not null default '';

-- 3) Security (RLS) — ignore errors if policies already exist
alter table public.collaborations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'collaborations'
      and policyname = 'Collaborations are viewable by everyone'
  ) then
    create policy "Collaborations are viewable by everyone"
      on public.collaborations for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'collaborations'
      and policyname = 'Authenticated users can post collaborations'
  ) then
    create policy "Authenticated users can post collaborations"
      on public.collaborations for insert with check (auth.uid() = author_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'collaborations'
      and policyname = 'Authors can update own collaborations'
  ) then
    create policy "Authors can update own collaborations"
      on public.collaborations for update using (auth.uid() = author_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'collaborations'
      and policyname = 'Authors can delete own collaborations'
  ) then
    create policy "Authors can delete own collaborations"
      on public.collaborations for delete using (auth.uid() = author_id);
  end if;
end $$;
