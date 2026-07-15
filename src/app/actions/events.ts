"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { resolveImageUrl } from "@/lib/upload";

function requireSupabase() {
  if (!isSupabaseConfigured()) redirect("/setup");
}

export async function createEvent(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/events/create");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;

  let imageUrl = "";
  try {
    imageUrl = await resolveImageUrl(formData, "event", "");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image upload failed";
    redirect(`/events/create?error=${encodeURIComponent(message)}`);
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      title,
      category,
      host_id: user.id,
      date,
      time,
      city,
      country,
      location,
      description,
      image_url: imageUrl,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
  revalidatePath("/explore");
  redirect(`/events/${data.id}`);
}

export async function joinEvent(eventId: string) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=/events/${eventId}`);
  }

  const { error } = await supabase.from("event_attendees").insert({
    event_id: eventId,
    user_id: user.id,
  });

  if (error && !error.message.includes("duplicate")) {
    return { error: error.message };
  }

  revalidatePath(`/events/${eventId}`);
  return { success: true };
}

export async function leaveEvent(eventId: string) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not signed in" };

  revalidatePath(`/events/${eventId}`);
  return { success: true };
}

export async function updateEvent(eventId: string, formData: FormData) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=/events/${eventId}/edit`);
  }

  const { data: existing, error: fetchError } = await supabase
    .from("events")
    .select("host_id, image_url")
    .eq("id", eventId)
    .single();

  if (fetchError || !existing) {
    throw new Error("Event not found");
  }

  if (existing.host_id !== user.id) {
    throw new Error("You can only edit your own events");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;

  let imageUrl = existing.image_url || "";
  try {
    imageUrl = await resolveImageUrl(formData, "event", imageUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image upload failed";
    redirect(`/events/${eventId}/edit?error=${encodeURIComponent(message)}`);
  }

  const { error } = await supabase
    .from("events")
    .update({
      title,
      category,
      date,
      time,
      city,
      country,
      location,
      description,
      image_url: imageUrl,
    })
    .eq("id", eventId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
  revalidatePath("/explore");
  revalidatePath(`/events/${eventId}`);
  redirect(`/events/${eventId}`);
}
