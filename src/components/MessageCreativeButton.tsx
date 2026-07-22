"use client";

import { useTransition } from "react";
import { startConversation } from "@/app/actions/messages";

interface MessageCreativeButtonProps {
  profileId: string;
  name: string;
  isOwn?: boolean;
  isLoggedIn: boolean;
  /** Optional context line under the button */
  hint?: string;
}

/** Start a DM — creative connection, not a job apply */
export function MessageCreativeButton({
  profileId,
  name,
  isOwn,
  isLoggedIn,
  hint = "Say hello — this is how creatives start making together.",
}: MessageCreativeButtonProps) {
  const [pending, startTransition] = useTransition();
  const firstName = name.trim().split(/\s+/)[0] || name;

  if (isOwn) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div>
        <a
          href={`/auth/login?next=/profile/${profileId}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-clay py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-light sm:w-auto sm:px-10"
        >
          Sign in to message {firstName}
        </a>
        <p className="mt-2 text-xs text-muted">{hint}</p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            await startConversation(profileId);
          });
        }}
        className="inline-flex w-full items-center justify-center rounded-full bg-clay py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-light disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Opening…" : `Message ${firstName}`}
      </button>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}
