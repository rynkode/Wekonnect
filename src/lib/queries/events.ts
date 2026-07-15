import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapEvent } from "@/lib/db/types";
import {
  events as mockEvents,
  getEventById as mockGetById,
  getEventCountForCity as mockEventCount,
} from "@/lib/data";

const EVENT_SELECT = `
  *,
  host:profiles!host_id ( name, photo ),
  event_attendees ( user_id )
`;

export async function getEvents() {
  if (!isSupabaseConfigured()) return mockEvents;

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockEvents;

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .order("date", { ascending: true });

  if (error || !data?.length) {
    return mockEvents;
  }

  return data.map(mapEvent);
}

export async function getEventById(id: string) {
  if (!isSupabaseConfigured()) return mockGetById(id);

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockGetById(id);

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .eq("id", id)
    .single();

  if (error || !data) {
    return mockGetById(id);
  }

  return mapEvent(data);
}

export async function getEventCountForCity(cityName: string): Promise<number> {
  if (!isSupabaseConfigured()) return mockEventCount(cityName);

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockEventCount(cityName);

  const { count } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("city", cityName);

  return count ?? 0;
}

export async function getEventsByCity(cityName: string) {
  const all = await getEvents();
  return all.filter((e) => e.city.toLowerCase() === cityName.toLowerCase());
}

export async function isUserAttending(eventId: string, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = await createClientIfConfigured();
  if (!supabase) return false;

  const { data } = await supabase
    .from("event_attendees")
    .select("user_id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}
