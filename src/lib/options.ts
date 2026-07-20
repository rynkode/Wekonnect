import type { ConnectFor, Discipline, EventCategory } from "@/types";

/** Creative interests shown on profiles */
export const creativeInterests = [
  "Art",
  "Design",
  "Photography",
  "Film",
  "Music",
  "Fashion",
  "Architecture",
  "Technology",
] as const satisfies readonly Discipline[];

/** Full discipline list (forms + filters) */
export const disciplines = [
  ...creativeInterests,
  "Writing",
  "Other",
] as const satisfies readonly Discipline[];

/** "I want to connect for" — why this person is here */
export const connectForOptions = [
  "Collaboration",
  "Creative friendships",
  "Learning",
  "Networking",
  "Projects",
  "Opportunities",
] as const satisfies readonly ConnectFor[];

/** Event categories for belonging-focused meetups */
export const eventCategories = [
  "Design Coffee",
  "Artist Talks",
  "Photo Walks",
  "Creative Workshops",
  "Studio Visits",
  "Exhibition Openings",
  "Creator Meetups",
  "Other",
] as const satisfies readonly EventCategory[];

const CONNECT_FOR_ALIASES: Record<string, ConnectFor> = {
  "Finding opportunities": "Opportunities",
  "Building creative projects": "Projects",
  Collaboration: "Collaboration",
  "Creative friendships": "Creative friendships",
  Learning: "Learning",
  Networking: "Networking",
  Projects: "Projects",
  Opportunities: "Opportunities",
};

const EVENT_CATEGORY_ALIASES: Record<string, EventCategory> = {
  "Design Kaffe": "Design Coffee",
  "Artist Talk": "Artist Talks",
  "Photo Walk": "Photo Walks",
  "Creator Night": "Creator Meetups",
  "Gallery Meetup": "Exhibition Openings",
  Workshop: "Creative Workshops",
  "Design Coffee": "Design Coffee",
  "Artist Talks": "Artist Talks",
  "Photo Walks": "Photo Walks",
  "Creative Workshops": "Creative Workshops",
  "Studio Visits": "Studio Visits",
  "Exhibition Openings": "Exhibition Openings",
  "Creator Meetups": "Creator Meetups",
  Other: "Other",
};

const DISCIPLINE_ALIASES: Record<string, Discipline> = {
  "Creative technology": "Technology",
  Technology: "Technology",
};

export function normalizeConnectFor(value: string): ConnectFor {
  return CONNECT_FOR_ALIASES[value] ?? (value as ConnectFor);
}

export function normalizeConnectForList(values: string[] | null | undefined): ConnectFor[] {
  if (!values?.length) return [];
  const seen = new Set<string>();
  const result: ConnectFor[] = [];
  for (const v of values) {
    const n = normalizeConnectFor(v);
    if (!seen.has(n)) {
      seen.add(n);
      result.push(n);
    }
  }
  return result;
}

export function normalizeEventCategory(value: string): EventCategory {
  return EVENT_CATEGORY_ALIASES[value] ?? (value as EventCategory);
}

export function normalizeDiscipline(value: string): Discipline {
  return DISCIPLINE_ALIASES[value] ?? (value as Discipline);
}

export function normalizeDisciplineList(values: string[] | null | undefined): Discipline[] {
  if (!values?.length) return [];
  const seen = new Set<string>();
  const result: Discipline[] = [];
  for (const v of values) {
    const n = normalizeDiscipline(v);
    if (!seen.has(n)) {
      seen.add(n);
      result.push(n);
    }
  }
  return result;
}

/** Warm welcome line for new people arriving at an event */
export function getEventWelcomeLine(category: string, city: string): string {
  const place = city?.trim() || "this city";
  const cat = normalizeEventCategory(category);

  const byCategory: Partial<Record<EventCategory, string>> = {
    "Design Coffee": `New in ${place}? Join this creative coffee meetup and meet local designers.`,
    "Artist Talks": `Curious about the scene in ${place}? Come listen, ask questions, and meet fellow artists.`,
    "Photo Walks": `Love the light in ${place}? Walk, shoot, and connect with photographers who get it.`,
    "Creative Workshops": `Ready to learn side by side? Join this workshop and leave with new skills — and new people.`,
    "Studio Visits": `Step inside a working studio in ${place}. Come curious. Leave inspired and connected.`,
    "Exhibition Openings": `See the work. Meet the makers. Exhibition nights in ${place} are for belonging, not just looking.`,
    "Creator Meetups": `Come alone. Leave connected — a creator meetup for people building in ${place}.`,
    Other: `Come alone. Leave connected — meet creatives in ${place}.`,
  };

  return byCategory[cat] ?? `Come alone. Leave connected — meet creatives in ${place}.`;
}
