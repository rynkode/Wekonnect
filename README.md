# WeKonnect (Weko / WK)



> A global creative network — discover people, events, and communities.



## Quick start



```bash

npm install

npm run dev

```



Open [http://localhost:3000](http://localhost:3000)



---



## Project phases



| Phase | Status | What it includes |

|-------|--------|------------------|

| **1** | Done | Landing, explore, events, creatives, profiles (UI) |

| **2** | Done | Supabase auth, database, real events & profiles |

| **3** | Done | City pages, collaborate board, image uploads |

| **4** | Next | Deploy to Vercel + connect wekonnect.com |



Visit **[/setup](http://localhost:3000/setup)** in the app for your checklist.



---



## Supabase setup



1. Create a project at [supabase.com](https://supabase.com)

2. Run `supabase/schema.sql` in the SQL Editor

3. Run `supabase/schema-phase3.sql` for Collaborate + image uploads

4. Copy env file and add your keys:



```bash

copy .env.local.example .env.local

```



5. Fill in from **Project Settings → API**:

   - `NEXT_PUBLIC_SUPABASE_URL`

   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Restart: `npm run dev`



**Full guide:** [`docs/SUPABASE-SETUP.md`](docs/SUPABASE-SETUP.md)



---



## Launch (when ready)



See [`docs/LAUNCH.md`](docs/LAUNCH.md) for deploying to Vercel and connecting your domains.



---



## Commands



| Command | Purpose |

|---------|---------|

| `npm run dev` | Development server |

| `npm run build` | Production build |

| `npm run start` | Run production build |



---



Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

