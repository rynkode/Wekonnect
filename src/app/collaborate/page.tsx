import Link from "next/link";
import { CollaborationCard } from "@/components/CollaborationCard";
import { getCollaborations } from "@/lib/queries/collaborations";

export const metadata = {
  title: "Collaborate — WeKonnect",
  description: "Find collaborators for creative projects on WeKonnect.",
};

export default async function CollaboratePage() {
  const collaborations = await getCollaborations();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Collaborate</h1>
          <p className="mt-2 text-muted">
            Find photographers, designers, musicians, and more for your next creative project.
          </p>
        </div>
        <Link
          href="/collaborate/create"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-stone hover:bg-clay"
        >
          + Post a request
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {collaborations.map((collab) => (
          <CollaborationCard key={collab.id} collaboration={collab} />
        ))}
      </div>

      {collaborations.length === 0 && (
        <p className="mt-12 text-center text-muted">
          No collaboration posts yet. Be the first to post what you&apos;re looking for.
        </p>
      )}
    </div>
  );
}
