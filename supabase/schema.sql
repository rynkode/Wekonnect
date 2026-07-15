-- WeKonnect Phase 2 — run this in Supabase SQL Editor
-- Dashboard → SQL → New query → paste → Run

-- ─── Profiles (extends auth.users) ───────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default '',
  photo text not null default '',
  city text not null default '',
  country text not null default '',
  bio text not null default '',
  disciplines text[] not null default '{}',
  skills text[] not null default '{}',
  connect_for text[] not null default '{}',
  portfolio jsonb not null default '[]',
  links jsonb not null default '[]',
  projects jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile when someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, photo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'photo', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Events ──────────────────────────────────────────────────────────────────
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  host_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  time text not null,
  city text not null,
  country text not null,
  location text not null,
  description text not null,
  image_url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Events are viewable by everyone"
  on public.events for select using (true);

create policy "Authenticated users can create events"
  on public.events for insert with check (auth.uid() = host_id);

create policy "Hosts can update own events"
  on public.events for update using (auth.uid() = host_id);

create policy "Hosts can delete own events"
  on public.events for delete using (auth.uid() = host_id);

-- ─── Event attendees (RSVP) ──────────────────────────────────────────────────
create table public.event_attendees (
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

alter table public.event_attendees enable row level security;

create policy "Attendees are viewable by everyone"
  on public.event_attendees for select using (true);

create policy "Users can RSVP themselves"
  on public.event_attendees for insert with check (auth.uid() = user_id);

create policy "Users can cancel own RSVP"
  on public.event_attendees for delete using (auth.uid() = user_id);

-- ─── City communities ────────────────────────────────────────────────────────
create table public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  slug text not null unique,
  description text not null default '',
  cover_image_url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.cities enable row level security;

create policy "Cities are viewable by everyone"
  on public.cities for select using (true);

-- ─── Seed cities ─────────────────────────────────────────────────────────────
insert into public.cities (name, country, slug, description, cover_image_url) values
  ('Bergen', 'Norway', 'bergen',
   'A UNESCO Creative City with a thriving design, music, and film scene on Norway''s west coast.',
   'https://images.unsplash.com/photo-1513622470522-26c3c8a084bc?w=800&h=500&fit=crop'),
  ('London', 'United Kingdom', 'london',
   'One of the world''s great creative capitals — fashion, film, design, and art collide in every borough.',
   'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop'),
  ('New York', 'United States', 'new-york',
   'Home to filmmakers, musicians, architects, and artists from every corner of the globe.',
   'https://images.unsplash.com/photo-1496442226666-8d0d0e62e951?w=800&h=500&fit=crop'),
  ('Tokyo', 'Japan', 'tokyo',
   'Where tradition meets future — a global hub for art, fashion, architecture, and creative technology.',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop');
