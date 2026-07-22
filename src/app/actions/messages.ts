"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function requireSupabase() {
  if (!isSupabaseConfigured()) redirect("/setup");
}

/** Open (or create) a DM with another creative, then go to the thread */
export async function startConversation(otherUserId: string) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=/profile/${otherUserId}`);
  }

  if (otherUserId === user.id) {
    redirect(`/profile/${user.id}`);
  }

  const { data: conversationId, error } = await supabase.rpc("get_or_create_dm", {
    other_user_id: otherUserId,
  });

  if (error || !conversationId) {
    throw new Error(error?.message ?? "Could not start conversation");
  }

  revalidatePath("/messages");
  redirect(`/messages/${conversationId}`);
}

export async function sendMessage(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const conversationId = formData.get("conversationId") as string;
  const body = ((formData.get("body") as string) || "").trim();

  if (!user) {
    redirect(`/auth/login?next=/messages/${conversationId}`);
  }

  if (!conversationId || !body) {
    redirect(`/messages/${conversationId || ""}`);
  }

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body: body.slice(0, 4000),
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/messages/${conversationId}`);
  revalidatePath("/messages");
  redirect(`/messages/${conversationId}`);
}
