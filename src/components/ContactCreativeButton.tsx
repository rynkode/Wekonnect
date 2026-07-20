import Link from "next/link";

interface ContactCreativeButtonProps {
  profileId: string;
  name: string;
  /** When viewing your own post */
  isOwn?: boolean;
}

/** Reach out to create together — not an Apply / job CTA */
export function ContactCreativeButton({
  profileId,
  name,
  isOwn,
}: ContactCreativeButtonProps) {
  if (isOwn) {
    return (
      <p className="rounded-2xl border border-mist bg-white px-5 py-4 text-sm text-muted">
        This is your invite. Creatives will reach out through your profile.
      </p>
    );
  }

  return (
    <div>
      <Link
        href={`/profile/${profileId}`}
        className="inline-flex w-full items-center justify-center rounded-full bg-clay py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-light sm:w-auto sm:px-10"
      >
        Contact {name.split(" ")[0]}
      </Link>
      <p className="mt-2 text-xs text-muted">
        Open their profile to connect — this is collaboration, not a job application.
      </p>
    </div>
  );
}
