import { MessageCreativeButton } from "@/components/MessageCreativeButton";

interface ContactCreativeButtonProps {
  profileId: string;
  name: string;
  isOwn?: boolean;
  isLoggedIn: boolean;
}

/** Reach out to create together — opens a real message thread */
export function ContactCreativeButton({
  profileId,
  name,
  isOwn,
  isLoggedIn,
}: ContactCreativeButtonProps) {
  if (isOwn) {
    return (
      <p className="rounded-2xl border border-mist bg-white px-5 py-4 text-sm text-muted">
        This is your invite. Creatives will message you when they want to create
        together.
      </p>
    );
  }

  return (
    <MessageCreativeButton
      profileId={profileId}
      name={name}
      isOwn={false}
      isLoggedIn={isLoggedIn}
      hint="Opens a private message — collaboration, not a job application."
    />
  );
}
