"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function requireSupabase() {
  if (!isSupabaseConfigured()) redirect("/setup");
}

export async function createCollaboration(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/collaborate/create");

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const discipline = formData.get("discipline") as string;
  const city = ((formData.get("city") as string) || "").trim();
  const country = ((formData.get("country") as string) || "").trim();
  const timeline = ((formData.get("timeline") as string) || "").trim();

  if (!title || !description || !discipline) {
    throw new Error("Title, description, and creative category are required.");
  }

  const { data, error } = await supabase
    .from("collaborations")
    .insert({
      author_id: user.id,
      title,
      description,
      discipline,
      city,
      country,
      timeline,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/collaborate");
  if (data?.id) {
    revalidatePath(`/collaborate/${data.id}`);
    redirect(`/collaborate/${data.id}`);
  }
  redirect("/collaborate");
}
