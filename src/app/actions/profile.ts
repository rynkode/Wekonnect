"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { resolveImageUrl } from "@/lib/upload";
import type { ConnectFor, Discipline } from "@/types";

function requireSupabase() {
  if (!isSupabaseConfigured()) redirect("/setup");
}

export async function updateProfile(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/profile/edit");
  }

  const name = formData.get("name") as string;

  const { data: existing } = await supabase
    .from("profiles")
    .select("photo")
    .eq("id", user.id)
    .single();

  let photo = existing?.photo || "";

  try {
    photo = await resolveImageUrl(formData, "profile", photo);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image upload failed";
    redirect(`/profile/edit?error=${encodeURIComponent(message)}`);
  }
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const bio = formData.get("bio") as string;
  const skillsRaw = formData.get("skills") as string;
  const disciplinesRaw = formData.get("disciplines") as string;
  const connectForRaw = formData.get("connectFor") as string;

  const skills = skillsRaw
    ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const disciplines = disciplinesRaw
    ? (disciplinesRaw.split(",").map((s) => s.trim()).filter(Boolean) as Discipline[])
    : [];
  const connect_for = connectForRaw
    ? (connectForRaw.split(",").map((s) => s.trim()).filter(Boolean) as ConnectFor[])
    : [];

  const { error } = await supabase
    .from("profiles")
    .update({
      name,
      photo,
      city,
      country,
      bio,
      skills,
      disciplines,
      connect_for,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/creatives");
  redirect(`/profile/${user.id}`);
}
