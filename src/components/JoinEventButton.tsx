"use client";

import { useTransition } from "react";
import { joinEvent, leaveEvent } from "@/app/actions/events";

interface JoinEventButtonProps {
  eventId: string;
  isAttending: boolean;
  isLoggedIn: boolean;
}

export function JoinEventButton({ eventId, isAttending, isLoggedIn }: JoinEventButtonProps) {
  const [pending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div>
        <a
          href={`/auth/login?next=/events/${eventId}`}
          className="inline-block w-full rounded-full bg-clay py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-clay-light sm:w-auto sm:px-10"
        >
          Sign in to join
        </a>
        <p className="mt-2 text-xs text-muted">Create a free account to RSVP to this event.</p>
      </div>
    );
  }

  function handleClick() {
    startTransition(async () => {
      if (isAttending) {
        await leaveEvent(eventId);
      } else {
        await joinEvent(eventId);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`w-full rounded-full py-3.5 text-sm font-medium transition-colors sm:w-auto sm:px-10 ${
        isAttending
          ? "border border-clay bg-white text-clay hover:bg-clay/5"
          : "bg-clay text-white hover:bg-clay-light"
      } disabled:opacity-60`}
    >
      {pending ? "Updating…" : isAttending ? "Leave event" : "Join event"}
    </button>
  );
}
