"use client";

import { useTransition } from "react";
import { joinCommunity, leaveCommunity } from "@/app/actions/communities";

interface JoinCommunityButtonProps {
  communityId: string;
  slug: string;
  isMember: boolean;
  isLoggedIn: boolean;
}

export function JoinCommunityButton({
  communityId,
  slug,
  isMember,
  isLoggedIn,
}: JoinCommunityButtonProps) {
  const [pending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div>
        <a
          href={`/auth/login?next=/communities/${slug}`}
          className="inline-block w-full rounded-full bg-clay py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-clay-light sm:w-auto sm:px-10"
        >
          Sign in to join
        </a>
        <p className="mt-2 text-xs text-muted">Find your tribe — free to join.</p>
      </div>
    );
  }

  function handleClick() {
    startTransition(async () => {
      if (isMember) {
        await leaveCommunity(communityId, slug);
      } else {
        await joinCommunity(communityId, slug);
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className={`w-full rounded-full py-3.5 text-sm font-medium transition-colors sm:w-auto sm:px-10 ${
          isMember
            ? "border border-clay bg-white text-clay hover:bg-clay/5"
            : "bg-clay text-white hover:bg-clay-light"
        } disabled:opacity-60`}
      >
        {pending
          ? "Updating…"
          : isMember
            ? "You're in — leave community"
            : "Join this community"}
      </button>
      {!isMember && (
        <p className="mt-2 text-xs text-muted">Belong with people who create like you.</p>
      )}
    </div>
  );
}
