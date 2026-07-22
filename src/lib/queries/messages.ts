import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ChatMessage, ConversationPreview } from "@/types";

export async function getInbox(): Promise<ConversationPreview[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClientIfConfigured();
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: memberships, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", user.id);

  if (error || !memberships?.length) return [];

  const conversationIds = memberships.map((m) => m.conversation_id);

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, updated_at")
    .in("id", conversationIds)
    .order("updated_at", { ascending: false });

  if (!conversations?.length) return [];

  const previews: ConversationPreview[] = [];

  for (const conv of conversations) {
    const { data: members } = await supabase
      .from("conversation_members")
      .select("user_id, profiles!user_id ( id, name, photo )")
      .eq("conversation_id", conv.id);

    const other = members?.find((m) => m.user_id !== user.id);
    const profileRaw = other?.profiles as
      | { id: string; name: string; photo: string }
      | { id: string; name: string; photo: string }[]
      | null
      | undefined;
    const profile = Array.isArray(profileRaw) ? profileRaw[0] : profileRaw;

    if (!profile) continue;

    const { data: lastRows } = await supabase
      .from("messages")
      .select("body, created_at, sender_id")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: false })
      .limit(1);

    const last = lastRows?.[0];

    previews.push({
      id: conv.id,
      updatedAt: conv.updated_at,
      otherUser: {
        id: profile.id,
        name: profile.name,
        photo: profile.photo || "",
      },
      lastMessage: last
        ? {
            body: last.body,
            createdAt: last.created_at,
            senderId: last.sender_id,
          }
        : undefined,
    });
  }

  return previews;
}

export async function getConversationMessages(
  conversationId: string
): Promise<ChatMessage[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClientIfConfigured();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    conversationId: row.conversation_id,
    senderId: row.sender_id,
    body: row.body,
    createdAt: row.created_at,
  }));
}

export async function getConversationOtherUser(
  conversationId: string,
  currentUserId: string
): Promise<{ id: string; name: string; photo: string } | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClientIfConfigured();
  if (!supabase) return null;

  const { data: members } = await supabase
    .from("conversation_members")
    .select("user_id, profiles!user_id ( id, name, photo )")
    .eq("conversation_id", conversationId);

  const other = members?.find((m) => m.user_id !== currentUserId);
  const profileRaw = other?.profiles as
    | { id: string; name: string; photo: string }
    | { id: string; name: string; photo: string }[]
    | null
    | undefined;
  const profile = Array.isArray(profileRaw) ? profileRaw[0] : profileRaw;
  if (!profile) return null;

  return {
    id: profile.id,
    name: profile.name,
    photo: profile.photo || "",
  };
}

export async function isUserInConversation(
  conversationId: string,
  userId: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = await createClientIfConfigured();
  if (!supabase) return false;

  const { data } = await supabase
    .from("conversation_members")
    .select("user_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}
