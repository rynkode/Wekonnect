"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function requireSupabase() {
  if (!isSupabaseConfigured()) redirect("/setup");
}

export async function joinCommunity(communityId: string, slug: string) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=/communities/${slug}`);
  }

  const { error } = await supabase.from("community_members").insert({
    community_id: communityId,
    user_id: user.id,
  });

  if (error && !error.message.includes("duplicate") && error.code !== "23505") {
    return { error: error.message };
  }

  revalidatePath("/communities");
  revalidatePath(`/communities/${slug}`);
  return { success: true };
}

export async function leaveCommunity(communityId: string, slug: string) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not signed in" };

  await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);

  revalidatePath("/communities");
  revalidatePath(`/communities/${slug}`);
  return { success: true };
}
