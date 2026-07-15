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

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const discipline = formData.get("discipline") as string;
  const city = (formData.get("city") as string) || "";
  const country = (formData.get("country") as string) || "";

  const { error } = await supabase.from("collaborations").insert({
    author_id: user.id,
    title,
    description,
    discipline,
    city,
    country,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/collaborate");
  redirect("/collaborate");
}
