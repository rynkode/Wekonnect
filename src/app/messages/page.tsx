import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/queries/creatives";
import { getInbox } from "@/lib/queries/messages";
import { ConversationListItem } from "@/components/ConversationListItem";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = {
  title: "Messages — Wapate",
  description: "Talk with creatives and start making together.",
};

export default async function MessagesPage() {
  if (!isSupabaseConfigured()) redirect("/setup");

  const user = await getAuthUser();
  if (!user) redirect("/auth/login?next=/messages");

  const inbox = await getInbox();

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Create together
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Messages
        </h1>
        <p className="mt-3 text-muted">
          Conversations with creatives — collaboration starts with a hello.
        </p>

        {inbox.length > 0 ? (
          <div className="mt-10 space-y-3">
            {inbox.map((c) => (
              <ConversationListItem key={c.id} conversation={c} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-mist bg-white/60 px-6 py-14 text-center">
            <p className="font-display text-lg font-medium text-ink">No messages yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Find someone on Collaborate or Creatives, then tap Message to start a
              conversation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/collaborate"
                className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-light"
              >
                Browse collaborations
              </Link>
              <Link
                href="/creatives"
                className="rounded-full border border-mist bg-white px-5 py-2.5 text-sm font-medium text-ink hover:border-clay"
              >
                Find creatives
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
