# Wapate — Launch guide (Phase 4)

When you're ready to put Wapate on the internet (wapate.no / wekonnect.no), follow these steps.

---

## Before you deploy

- [ ] Phase 2 schema (`supabase/schema.sql`) is running in Supabase
- [ ] Phase 3 schema (`supabase/schema-phase3.sql`) is running
- [ ] You've tested sign-up, profile edit, create event, RSVP, collaborate, and image upload locally
- [ ] Email confirmation settings match your preference (on for production, off for quick local testing)

---

## 1. Push code to GitHub

```bash
cd C:\Users\Bruker\Projects\wekonnect
git init
git add .
git commit -m "Wapate MVP — Phases 1–3"
```

Create a repo on GitHub and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/wekonnect.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Import** your `wekonnect` repository
3. Framework preset: **Next.js** (auto-detected)
4. Add **Environment Variables** (same as `.env.local`):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://wapate.no` (or your Vercel URL first) |

5. Click **Deploy**

---

## 3. Configure Supabase for production

In Supabase Dashboard:

1. **Authentication → URL Configuration**
   - Site URL: `https://wapate.no`
   - Redirect URLs: add `https://wapate.no/auth/callback` and your Vercel preview URL

2. **Authentication → Providers → Email**
   - Turn **Confirm email** ON for production (recommended)

3. Re-run `supabase/fix-city-images.sql` if city images still look broken

---

## 4. Connect your domain

In Vercel → Project → **Settings → Domains**:

- Add `wapate.no` and `www.wapate.no` (if you own that domain)
- Or use `wekonnect.no` / `www.wekonnect.no` and brand the site as Wapate

Vercel shows DNS records to add at your domain registrar. After DNS propagates (often 5–60 minutes), your site goes live.

Update `NEXT_PUBLIC_SITE_URL` in Vercel to your final domain and redeploy if needed.

---

## 5. After launch — what to build next

| Priority | Feature |
|----------|---------|
| High | Messaging between creatives |
| High | Email notifications for events |
| Medium | More cities / user-suggested communities |
| Medium | Event discussion threads |
| Later | Mobile app |
| Later | Payments / ticketed events |

---

## Quick health check

After deploy, verify:

1. Home page loads with city images
2. Sign up → confirm email (if enabled) → log in
3. Create an event in Bergen
4. Post a collaboration request
5. Upload a profile photo

If something fails, check Vercel **Functions** logs and Supabase **Logs** in the dashboard.
