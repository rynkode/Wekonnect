import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { getCollaborationById } from "@/lib/queries/collaborations";
import { getAuthUser } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";
import { ContactCreativeButton } from "@/components/ContactCreativeButton";

interface CollaborationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CollaborationDetailPageProps) {
  const { id } = await params;
  const collab = await getCollaborationById(id);
  if (!collab) return { title: "Collaboration not found — Wapate" };
  return {
    title: `${collab.title} — Wapate`,
    description: collab.description,
  };
}

export default async function CollaborationDetailPage({
  params,
}: CollaborationDetailPageProps) {
  const { id } = await params;
  const collab = await getCollaborationById(id);

  if (!collab) notFound();

  const user = await getAuthUser();
  const isOwn = Boolean(user && user.id === collab.authorId);

  const place =
    collab.city && collab.country
      ? `${collab.city}, ${collab.country}`
      : collab.city || "Anywhere in the world";

  const posted = new Date(collab.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <Link
          href="/collaborate"
          className="text-sm font-medium text-clay transition-colors hover:text-ink"
        >
          ← All collaborations
        </Link>

        <div className="mt-8">
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-sage">
            I&apos;m looking for…
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <DisciplinePill discipline={collab.discipline} size="md" />
          </div>

          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {collab.title}
          </h1>

          <div className="mt-6 flex gap-3 rounded-2xl border border-clay/20 bg-white p-5">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
            <div>
              <p className="text-sm font-medium text-ink">Create together</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                This is a creative invite — not a job listing. Reach out if the project
                resonates and you want to make something together.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-muted">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-sage" />
              {place}
            </p>
            {collab.timeline && (
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-sage" />
                Timeline: {collab.timeline}
              </p>
            )}
            <p className="text-sm">Posted {posted}</p>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              About the project
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-muted">
              {collab.description}
            </p>
          </section>

          {collab.author && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Creator
              </h2>
              <Link
                href={`/profile/${collab.authorId}`}
                className="mt-4 flex items-center gap-4 rounded-2xl border border-mist bg-white p-4 transition-colors hover:border-clay"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-mist">
                  {collab.author.photo ? (
                    <Image
                      src={collab.author.photo}
                      alt={collab.author.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-lg font-semibold">
                      {collab.author.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-ink">{collab.author.name}</p>
                  <p className="text-sm text-muted">View profile →</p>
                </div>
              </Link>
            </section>
          )}

          <div className="mt-10">
            <ContactCreativeButton
              profileId={collab.authorId}
              name={collab.author?.name ?? "creator"}
              isOwn={isOwn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
