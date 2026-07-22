import Image from "next/image";
import Link from "next/link";
import type { ConversationPreview } from "@/types";

interface ConversationListItemProps {
  conversation: ConversationPreview;
}

export function ConversationListItem({ conversation }: ConversationListItemProps) {
  const { otherUser, lastMessage } = conversation;
  const preview = lastMessage?.body ?? "Say hello — start the conversation.";
  const when = lastMessage
    ? new Date(lastMessage.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : "";

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className="flex items-center gap-4 rounded-2xl border border-mist bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist">
        {otherUser.photo ? (
          <Image
            src={otherUser.photo}
            alt={otherUser.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-semibold">
            {otherUser.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-medium text-ink">{otherUser.name}</h3>
          {when && <span className="shrink-0 text-xs text-muted">{when}</span>}
        </div>
        <p className="mt-0.5 truncate text-sm text-muted">{preview}</p>
      </div>
    </Link>
  );
}
