import { getSupabaseEnv } from "@/lib/env";

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}
