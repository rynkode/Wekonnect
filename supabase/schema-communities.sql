-- WeKonnect Communities — run in Supabase SQL Editor
-- Groups where creatives belong (find your tribe)

create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  city text not null default '',
  country text not null default '',
  focus text not null default '',
  cover_image_url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.communities enable row level security;

create policy "Communities are viewable by everyone"
  on public.communities for select using (true);

create table if not exists public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

alter table public.community_members enable row level security;

create policy "Community members are viewable by everyone"
  on public.community_members for select using (true);

create policy "Users can join communities themselves"
  on public.community_members for insert with check (auth.uid() = user_id);

create policy "Users can leave communities themselves"
  on public.community_members for delete using (auth.uid() = user_id);

-- Seed tribes (safe to re-run)
insert into public.communities (name, slug, description, city, country, focus, cover_image_url)
values
  (
    'Bergen Designers',
    'bergen-designers',
    'A home for product, graphic, and spatial designers in Bergen — coffee, critique, and collaboration on the west coast.',
    'Bergen',
    'Norway',
    'Design',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop'
  ),
  (
    'London Photographers',
    'london-photographers',
    'Street, portrait, and documentary photographers across London. Walks, shares, and creative friendships.',
    'London',
    'United Kingdom',
    'Photography',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop'
  ),
  (
    'Tokyo Artists',
    'tokyo-artists',
    'Painters, installation artists, and makers in Tokyo — tradition meeting the contemporary scene.',
    'Tokyo',
    'Japan',
    'Art',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop'
  ),
  (
    'Creative Entrepreneurs',
    'creative-entrepreneurs',
    'Creatives building studios, products, and brands. Global tribe for makers who also ship.',
    '',
    '',
    'Technology',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop'
  ),
  (
    'Film Makers',
    'film-makers',
    'Directors, editors, and storytellers worldwide. Feedback nights, co-productions, and crew connections.',
    '',
    '',
    'Film',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop'
  ),
  (
    'Illustrators',
    'illustrators',
    'Illustration, comics, and visual storytelling. Share process, find clients, and make friends who draw.',
    '',
    '',
    'Art',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop'
  ),
  (
    'Architecture Community',
    'architecture-community',
    'Architects, spatial designers, and urban thinkers — studio talks, site visits, and shared ambition.',
    '',
    '',
    'Architecture',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop'
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  city = excluded.city,
  country = excluded.country,
  focus = excluded.focus,
  cover_image_url = excluded.cover_image_url;
