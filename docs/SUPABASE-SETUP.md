# Supabase Setup for WeKonnect

Follow these steps to connect your Next.js app to Supabase. **No UI changes required** — the app keeps using your existing design and falls back to demo data until Supabase is connected.

---

## Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New project**
3. Choose a name (e.g. `wekonnect`), password, and region
4. Wait for the project to finish provisioning (~2 min)

---

## Step 2 — Run the database schema

1. In Supabase Dashboard, open **SQL Editor**
2. Click **New query**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Click **Run**

This creates:
- `profiles` — creative user profiles (linked to auth)
- `events` — meetups and creative events
- `event_attendees` — RSVP / join tracking
- `cities` — Bergen, London, New York, Tokyo (seed data)

---

## Step 3 — Configure environment variables

In your project folder:

```bash
copy .env.local.example .env.local
```

Open `.env.local` and paste your values from **Project Settings → API**:

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key |

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 4 — Disable email confirmation (optional, for local dev)

For easier testing during development:

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Turn off **Confirm email**
3. Save

You can re-enable this before going to production.

---

## Step 5 — Restart the dev server

Environment variables only load on startup:

```bash
npm run dev
```

Visit [http://localhost:3000/setup](http://localhost:3000/setup) to confirm connection.

---

## How authentication works

| Route | Purpose |
|-------|---------|
| `/auth/signup` | Create account + auto-create profile |
| `/auth/login` | Sign in |
| `/auth/callback` | Handles email confirmation redirects |
| `/profile/edit` | Edit your creative profile (requires login) |

**Footer → Join** links to sign-up. Protected actions (create event, RSVP) redirect to login when needed.

---

## Architecture

```
.env.local                    ← Your Supabase credentials
middleware.ts                 ← Refreshes auth session on every request
src/lib/env.ts                ← Validates environment variables
src/lib/supabase/
  ├── client.ts               ← Browser client (client components)
  ├── server.ts               ← Server client (Server Components & actions)
  └── middleware.ts           ← Session refresh logic
src/lib/queries/              ← Reads from Supabase (mock fallback if unset)
src/app/actions/              ← Auth, events, profile writes
supabase/schema.sql           ← Database tables + security policies
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Still seeing demo data | Check `.env.local` values, restart `npm run dev` |
| "Invalid API key" | Copy the **anon public** key, not the service role key |
| Sign up fails | Run `supabase/schema.sql`; disable email confirm for dev |
| Events not saving | Must be signed in; check SQL schema was applied |

---

## Security notes

- Never commit `.env.local` (it's in `.gitignore`)
- The `anon` key is safe in the browser — Row Level Security (RLS) in `schema.sql` controls access
- Never expose the **service_role** key in frontend code
