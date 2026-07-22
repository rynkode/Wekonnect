import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthUser } from "@/lib/queries/creatives";
import {
  getConversationMessages,
  getConversationOtherUser,
  isUserInConversation,
} from "@/lib/queries/messages";
import { sendMessage } from "@/app/actions/messages";
import { SubmitButton } from "@/components/SubmitButton";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface MessageThreadPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MessageThreadPageProps) {
  const { id } = await params;
  return { title: `Conversation — Wapate` };
}

export default async function MessageThreadPage({ params }: MessageThreadPageProps) {
  if (!isSupabaseConfigured()) redirect("/setup");

  const { id } = await params;
  const user = await getAuthUser();
  if (!user) redirect(`/auth/login?next=/messages/${id}`);

  const member = await isUserInConversation(id, user.id);
  if (!member) notFound();

  const [messages, other] = await Promise.all([
    getConversationMessages(id),
    getConversationOtherUser(id, user.id),
  ]);

  if (!other) notFound();

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-6 py-8 md:py-12">
        <Link
          href="/messages"
          className="text-sm font-medium text-clay transition-colors hover:text-ink"
        >
          ← All messages
        </Link>

        <Link
          href={`/profile/${other.id}`}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-mist bg-white p-3 transition-colors hover:border-clay"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-mist">
            {other.photo ? (
              <Image
                src={other.photo}
                alt={other.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold">
                {other.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-ink">{other.name}</p>
            <p className="text-xs text-muted">View profile →</p>
          </div>
        </Link>

        <div className="mt-6 flex flex-1 flex-col gap-3 rounded-2xl border border-mist bg-white/70 p-4 md:p-5">
          {messages.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              No messages yet. Say hello — ask about a project, an event, or just
              introduce yourself.
            </p>
          ) : (
            messages.map((msg) => {
              const mine = msg.senderId === user.id;
              const time = new Date(msg.createdAt).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={msg.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      mine
                        ? "bg-clay text-white"
                        : "border border-mist bg-white text-ink"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.body}</p>
                    <p
                      className={`mt-1 text-[10px] ${
                        mine ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {time}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form action={sendMessage} className="mt-4 space-y-3">
          <input type="hidden" name="conversationId" value={id} />
          <label htmlFor="body" className="sr-only">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={3}
            maxLength={4000}
            placeholder={`Message ${other.name.split(" ")[0]}…`}
            className="w-full rounded-2xl border border-mist bg-white px-4 py-3 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
          <SubmitButton label="Send" pendingLabel="Sending…" />
        </form>
      </div>
    </div>
  );
}
