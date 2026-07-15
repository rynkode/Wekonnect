import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapProfile } from "@/lib/db/types";
import { creatives as mockCreatives, getCreativeById as mockGetById } from "@/lib/data";
import type { CreativeProfile } from "@/types";

export async function getCreatives(): Promise<CreativeProfile[]> {
  if (!isSupabaseConfigured()) return mockCreatives;

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCreatives;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return mockCreatives;
  }

  return data.map(mapProfile);
}

export async function getCreativeById(id: string): Promise<CreativeProfile | undefined> {
  if (!isSupabaseConfigured()) return mockGetById(id);

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockGetById(id);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return mockGetById(id);
  }

  return mapProfile(data);
}

export async function getCurrentUserProfile(): Promise<CreativeProfile | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClientIfConfigured();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data ? mapProfile(data) : null;
}

export async function getCreativesByCity(cityName: string): Promise<CreativeProfile[]> {
  const all = await getCreatives();
  return all.filter((c) => c.city.toLowerCase() === cityName.toLowerCase());
}

export async function getAuthUser() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClientIfConfigured();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
