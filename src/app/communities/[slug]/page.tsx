import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users } from "lucide-react";
import {
  getCommunityBySlug,
  getCommunityCreatives,
  getCommunityEvents,
  isUserInCommunity,
} from "@/lib/queries/communities";
import { getAuthUser, getCreatives } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";
import { JoinCommunityButton } from "@/components/JoinCommunityButton";
import { EventCard } from "@/components/EventCard";
import { CreativeCard } from "@/components/CreativeCard";

interface CommunityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CommunityDetailPageProps) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  if (!community) return { title: "Community not found — WeKonnect" };
  return {
    title: `${community.name} — WeKonnect`,
    description: community.description,
  };
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) notFound();

  const [user, featured, upcoming, allCreatives] = await Promise.all([
    getAuthUser(),
    getCommunityCreatives(community),
    getCommunityEvents(community),
    getCreatives(),
  ]);

  const isMember = user
    ? await isUserInCommunity(community.id, user.id)
    : false;

  const members = allCreatives.filter((c) => community.memberIds.includes(c.id));

  const place =
    community.city && community.country
      ? `${community.city}, ${community.country}`
      : community.city || "Worldwide";

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl">
          <Image
            src={community.coverImageUrl}
            alt={community.name}
            fill
            className="object-cover"
            priority
            sizes="896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
          <div className="absolute bottom-4 left-4">
            {community.focus && (
              <DisciplinePill discipline={community.focus} size="md" />
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Find your tribe
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {community.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-sage" />
              {place}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 shrink-0 text-sage" />
              {community.memberIds.length}{" "}
              {community.memberIds.length === 1 ? "member" : "members"}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {community.description}
          </p>

          <div className="mt-8">
            <JoinCommunityButton
              communityId={community.id}
              slug={community.slug}
              isMember={isMember}
              isLoggedIn={Boolean(user)}
            />
          </div>
        </div>

        {/* Members */}
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Members
          </h2>
          <p className="mt-1 text-sm text-muted">People who belong here.</p>
          {members.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {members.map((creative) => (
                <CreativeCard key={creative.id} creative={creative} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-mist bg-white/60 px-5 py-8 text-sm text-muted">
              Be the first to join — your name could be here.
            </p>
          )}
        </section>

        {/* Featured creatives */}
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Featured creatives
          </h2>
          <p className="mt-1 text-sm text-muted">
            Makers connected to this scene by city or craft.
          </p>
          {featured.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featured.map((creative) => (
                <CreativeCard key={creative.id} creative={creative} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">
              No featured creatives yet.{" "}
              <Link href="/creatives" className="font-medium text-clay hover:underline">
                Browse all creatives →
              </Link>
            </p>
          )}
        </section>

        {/* Upcoming events */}
        <section className="mt-16 mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Upcoming events
              </h2>
              <p className="mt-1 text-sm text-muted">
                Meetups where this community gathers.
              </p>
            </div>
            <Link
              href="/events"
              className="shrink-0 text-sm font-medium text-clay hover:text-ink"
            >
              All events →
            </Link>
          </div>
          {upcoming.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-mist bg-white/60 px-5 py-8 text-sm text-muted">
              No upcoming events yet.{" "}
              <Link href="/events/create" className="font-medium text-clay hover:underline">
                Host one for this community →
              </Link>
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
