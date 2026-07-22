-- Wapate Phase 3 — run in Supabase SQL Editor AFTER schema.sql
-- Adds: collaborations table + image storage bucket

-- ─── Collaboration posts ─────────────────────────────────────────────────────
create table public.collaborations (
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

alter table public.collaborations enable row level security;

create policy "Collaborations are viewable by everyone"
  on public.collaborations for select using (true);

create policy "Authenticated users can post collaborations"
  on public.collaborations for insert with check (auth.uid() = author_id);

create policy "Authors can update own collaborations"
  on public.collaborations for update using (auth.uid() = author_id);

create policy "Authors can delete own collaborations"
  on public.collaborations for delete using (auth.uid() = author_id);

-- ─── Image storage bucket ────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Public image access"
  on storage.objects for select
  using (bucket_id = 'images');

create policy "Users can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'images'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update own images"
  on storage.objects for update
  using (
    bucket_id = 'images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete own images"
  on storage.objects for delete
  using (
    bucket_id = 'images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
