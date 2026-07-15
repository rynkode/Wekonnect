import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapCity } from "@/lib/db/types";
import {
  cities as mockCities,
  getCreativeCountForCity as mockCreativeCount,
} from "@/lib/data";
import { getEventCountForCity } from "@/lib/queries/events";
import type { CityCommunity } from "@/types";

export interface CityWithCounts extends CityCommunity {
  eventCount: number;
  creativeCount: number;
}

export async function getCities(): Promise<CityCommunity[]> {
  if (!isSupabaseConfigured()) return mockCities;

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCities;

  const { data, error } = await supabase.from("cities").select("*").order("name");

  if (error || !data?.length) {
    return mockCities;
  }

  return data.map(mapCity);
}

export async function getCreativeCountForCity(cityName: string): Promise<number> {
  if (!isSupabaseConfigured()) return mockCreativeCount(cityName);

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCreativeCount(cityName);

  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("city", cityName);

  return count ?? 0;
}

export async function getCitiesWithCounts(): Promise<CityWithCounts[]> {
  const cities = await getCities();
  return Promise.all(
    cities.map(async (city) => ({
      ...city,
      eventCount: await getEventCountForCity(city.name),
      creativeCount: await getCreativeCountForCity(city.name),
    }))
  );
}

export async function getCityBySlug(slug: string): Promise<CityCommunity | undefined> {
  const cities = await getCities();
  return cities.find((c) => c.slug === slug);
}
