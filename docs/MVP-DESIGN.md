# Wapate MVP — Structure & User Experience

> **Mission:** Help creatives discover each other, collaborate, and meet through events — starting in places like Bergen, built for the world.

---

## 1. What is an MVP?

**MVP = Minimum Viable Product.** The smallest version of Wapate that still delivers real value.

For v1 we build **five things only:**

| # | Feature | Why it matters |
|---|---------|----------------|
| 1 | Landing page | First impression — explains what Wapate is |
| 2 | Creative profiles | Identity — who you are as a creative |
| 3 | Event creation | Hosts can start meetups |
| 4 | Event discovery | People find events near them |
| 5 | Search creatives | Find collaborators by skill & location |

Everything else (chat, payments, notifications, mobile apps) comes **after** we validate these five.

---

## 2. Information Architecture

How the app is organized — like a map of every screen.

```
Wapate
├── Home (Landing)           →  Welcome, mission, call-to-action
├── Explore                  →  Discover creatives, events, cities
│   ├── Events               →  Browse & filter events
│   ├── Creatives            →  Search people by discipline & city
│   └── Cities               →  City communities (Bergen, London…)
├── Events
│   ├── [Event detail]       →  One event: info, host, join
│   └── Create               →  Form to publish a new event
├── Profile
│   ├── [User profile]       →  Public creative identity
│   └── Edit (future)        →  Update your profile
└── About / Join (future)    →  Sign up flow
```

---

## 3. User Personas (who we design for)

### Maya — Designer in Bergen
- Wants to meet other designers for coffee
- Creates a "Design Kaffe" event
- Browses profiles to find a photographer for a side project

### James — Filmmaker visiting Tokyo
- Opens Explore → filters by Film + Tokyo
- Finds a Creator Night event and joins

### Aisha — Musician, global
- Sets profile: Music, "Looking for collaboration"
- Gets discovered when someone searches "musicians worldwide"

---

## 4. Core User Flows

### Flow A: First visit → Join an event

```
Landing page
    → Click "Explore events"
    → Filter: Bergen + Design
    → Open "Design Kaffe"
    → Click "Join event"
    → (Future: sign up / confirm)
```

### Flow B: Host a meetup

```
Landing page
    → Click "Create event"
    → Fill: title, category, date, city, location, description
    → Publish
    → Event appears in Explore
```

### Flow C: Find a collaborator

```
Explore → Creatives
    → Filter: Photography + Bergen
    → Open profile
    → See portfolio, skills, "connect for" goals
    → (Future: send message)
```

---

## 5. Page-by-Page UX

### 5.1 Landing Page (`/`)

**Goal:** Inspire. Explain. Convert.

**Sections:**
1. **Hero** — "Connect through creativity." Short mission + two buttons: Explore / Create event
2. **How it works** — 3 steps: Create profile → Discover → Meet & collaborate
3. **Featured events** — 3 real-looking cards (Bergen + global)
4. **Creative disciplines** — Visual grid of fields (Art, Design, Film…)
5. **Cities** — Wapate Bergen, London, New York, Tokyo
6. **Footer** — Brand, links, "Built for creatives everywhere"

**Feel:** Premium magazine — lots of whitespace, strong typography, subtle motion.

---

### 5.2 Explore (`/explore`)

**Goal:** One hub for discovery.

**Tabs or sections:**
- **Events** — Cards with image, title, date, city, category badge, attendee count
- **Creatives** — Avatar, name, disciplines, city, short bio
- **Cities** — City name, event count, creative count

**Filters (sidebar or top bar):**
- Location: Current / City / Country / Worldwide
- Creative field: multi-select chips

---

### 5.3 Event Detail (`/events/[id]`)

**Shows:**
- Cover image
- Title, category, date & time
- Host (link to profile)
- City + venue
- Full description
- Attendee avatars + count
- **Join event** button
- Discussion placeholder (future)

---

### 5.4 Create Event (`/events/create`)

**Form fields:**
| Field | Type | Required |
|-------|------|----------|
| Title | text | yes |
| Category | select | yes |
| Date | date | yes |
| Time | time | yes |
| City | text | yes |
| Country | text | yes |
| Location | text | yes |
| Description | textarea | yes |
| Image URL | text | optional |

**Submit** → saves to local mock store (MVP) → redirects to new event page.

---

### 5.5 Creative Profile (`/profile/[id]`)

**Shows:**
- Photo, name, city, country
- Discipline tags
- Biography
- Skills (tags)
- Portfolio (image grid)
- Links (website, Instagram, etc.)
- "I want to connect for:" badges
- Past / current projects (list)

---

### 5.6 Search Creatives (`/creatives`)

**Search bar** + filters (discipline, city, connect-for goal)

**Results:** Grid of profile cards → click opens full profile.

---

## 6. Data Models (TypeScript types)

These shapes define what we store — same structure whether we use mock JSON today or a database tomorrow.

### User (Creative Profile)
```typescript
{
  id, name, photo, city, country,
  disciplines: ['Design', 'Photography'],
  bio, skills: string[],
  portfolio: { title, imageUrl, link? }[],
  links: { label, url }[],
  connectFor: ['Collaboration', 'Networking'],
  projects: { title, description, year }[]
}
```

### Event
```typescript
{
  id, title, category, hostId,
  date, time, city, country, location,
  description, imageUrl,
  attendeeIds: string[]
}
```

### City Community
```typescript
{
  id, name, country, slug,
  description, coverImageUrl
}
```

---

## 7. Tech Stack (and why)

| Layer | Choice | Why (for learning) |
|-------|--------|---------------------|
| Framework | **Next.js 15** | Industry standard; pages + API in one project; scales globally |
| Language | **TypeScript** | Catches mistakes early; documents data shapes |
| Styling | **Tailwind CSS** | Fast, consistent, premium UI without writing huge CSS files |
| Data (MVP) | **Mock JSON in `/src/lib/data`** | No database setup yet; swap for Postgres/Supabase later |
| Icons | **Lucide React** | Clean, minimal icons |

**Folder structure:**
```
wapate/
├── docs/                 ← Design & planning (you are here)
├── public/               ← Images, favicon
├── src/
│   ├── app/              ← Pages (each folder = a URL)
│   ├── components/       ← Reusable UI (buttons, cards, nav)
│   ├── lib/              ← Data, helpers
│   └── types/            ← TypeScript definitions
├── package.json          ← Dependencies list
└── README.md             ← How to run the project
```

---

## 8. Design System (Wapate brand)

### Colors
- **Ink** `#0f0f0f` — primary text
- **Stone** `#faf9f7` — warm background
- **Clay** `#c4704a` — accent (creative warmth)
- **Sage** `#5c6b5a` — secondary accent
- **Mist** `#e8e4df` — borders, subtle surfaces

### Typography
- **Display:** Geist or similar — modern, international
- **Body:** Clean sans-serif, generous line-height

### Components
- Rounded cards with soft shadows
- Discipline pills (small colored tags)
- Large photography on event cards
- Minimal navigation — logo left, Explore / Events / Creatives / Create

---

## 9. MVP vs Future

| MVP (now) | Phase 2 | Phase 3 |
|-----------|---------|---------|
| Mock data | Database + auth | Mobile apps |
| Static profiles | Edit your profile | Real-time chat |
| Join button (UI) | Real RSVP | Payments / tickets |
| Bergen + sample cities | User-created cities | AI matching |
| Search & filter | Geo location | Global recommendations |

---

## 10. Success Metrics (how we know MVP works)

1. Someone can understand Wapate in **10 seconds** on the landing page
2. Someone can **find an event** in their city in **3 clicks**
3. Someone can **view a creative profile** and understand their work
4. Someone can **fill out create-event form** without confusion

---

## Next step

Run the app locally (`npm install` → `npm run dev`) and walk through each flow above. Replace mock data with real user input as we add authentication and a database.
