import Link from "next/link";
import { CollaborationCard } from "@/components/CollaborationCard";
import { getCollaborations } from "@/lib/queries/collaborations";

export const metadata = {
  title: "Collaborate — Wapate",
  description:
    "Find people to create with. Post what you're looking for — creative collaboration, not jobs.",
};

export default async function CollaboratePage() {
  const collaborations = await getCollaborations();

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
              Create together
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Collaborate
            </h1>
            <p className="mt-4 text-lg text-muted">
              The future of creativity is not more followers. It is more collaboration.
              Find people to make something with — anywhere in the world.
            </p>
          </div>
          <Link
            href="/collaborate/create"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-stone transition-colors hover:bg-clay"
          >
            I&apos;m looking for…
          </Link>
        </div>

        {collaborations.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {collaborations.map((collab) => (
              <CollaborationCard key={collab.id} collaboration={collab} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-mist bg-white/60 px-6 py-14 text-center">
            <p className="font-display text-lg font-medium text-ink">
              No invites yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Be the first to say what you&apos;re looking for — a photographer, a band,
              a co-founder who designs.
            </p>
            <Link
              href="/collaborate/create"
              className="mt-6 inline-flex rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-white hover:bg-clay-light"
            >
              Post an invite
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
