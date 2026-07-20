import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapCommunity } from "@/lib/db/communities";
import { mockCommunities } from "@/lib/data/communities";
import { getCreatives } from "@/lib/queries/creatives";
import { getEvents } from "@/lib/queries/events";
import type { Community, CreativeProfile } from "@/types";
import type { EventWithHost } from "@/lib/db/types";

const COMMUNITY_SELECT = `
  *,
  community_members ( user_id )
`;

export async function getCommunities(): Promise<Community[]> {
  if (!isSupabaseConfigured()) return mockCommunities;

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCommunities;

  const { data, error } = await supabase
    .from("communities")
    .select(COMMUNITY_SELECT)
    .order("name");

  if (error || !data?.length) return mockCommunities;

  return data.map(mapCommunity);
}

export async function getCommunityBySlug(slug: string): Promise<Community | undefined> {
  const all = await getCommunities();
  return all.find((c) => c.slug === slug);
}

export async function isUserInCommunity(
  communityId: string,
  userId: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    const community = mockCommunities.find((c) => c.id === communityId);
    return Boolean(community?.memberIds.includes(userId));
  }

  const supabase = await createClientIfConfigured();
  if (!supabase) return false;

  const { data } = await supabase
    .from("community_members")
    .select("user_id")
    .eq("community_id", communityId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}

/** Featured creatives for a community — by city and/or focus discipline */
export async function getCommunityCreatives(
  community: Community,
  limit = 6
): Promise<CreativeProfile[]> {
  const creatives = await getCreatives();
  const focus = community.focus.toLowerCase();
  const city = community.city.toLowerCase();

  const scored = creatives
    .map((c) => {
      let score = 0;
      if (city && c.city.toLowerCase() === city) score += 3;
      if (
        focus &&
        c.disciplines.some(
          (d) =>
            d.toLowerCase() === focus ||
            d.toLowerCase().includes(focus) ||
            focus.includes(d.toLowerCase())
        )
      ) {
        score += 2;
      }
      if (community.memberIds.includes(c.id)) score += 4;
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.c);

  if (scored.length > 0) return scored;
  return creatives.slice(0, Math.min(limit, 3));
}

/** Upcoming events related to the community */
export async function getCommunityEvents(
  community: Community,
  limit = 6
): Promise<EventWithHost[]> {
  const events = await getEvents();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const focus = community.focus.toLowerCase();
  const city = community.city.toLowerCase();

  const related = events
    .filter((e) => {
      const eventDate = new Date(e.date);
      if (eventDate < now) return false;

      if (city && e.city.toLowerCase() === city) return true;

      const cat = e.category.toLowerCase();
      if (focus === "design" && cat.includes("design")) return true;
      if (focus === "photography" && cat.includes("photo")) return true;
      if (focus === "art" && (cat.includes("artist") || cat.includes("exhibition"))) return true;
      if (focus === "film" && (cat.includes("film") || cat.includes("creator"))) return true;
      if (focus === "architecture" && cat.includes("studio")) return true;
      if (!city) return cat.includes(focus) || e.description.toLowerCase().includes(focus);
      return false;
    })
    .slice(0, limit);

  if (related.length > 0) return related;
  return events.filter((e) => new Date(e.date) >= now).slice(0, Math.min(limit, 3));
}
