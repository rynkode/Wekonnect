import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, HeartHandshake, Users } from "lucide-react";
import { getEventById, isUserAttending } from "@/lib/queries/events";
import { getCreativeById, getAuthUser } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";
import { JoinEventButton } from "@/components/JoinEventButton";
import { EventLocationLink } from "@/components/EventLocationLink";
import { getEventWelcomeLine, normalizeEventCategory } from "@/lib/options";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "Event not found — WeKonnect" };
  return { title: `${event.title} — WeKonnect` };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const [host, user] = await Promise.all([
    getCreativeById(event.hostId),
    getAuthUser(),
  ]);

  const attending = user && (await isUserAttending(event.id, user.id));
  const category = normalizeEventCategory(event.category);
  const welcome = getEventWelcomeLine(category, event.city);

  const date = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <DisciplinePill discipline={category} size="md" />
          </div>
        </div>

        <div className="mt-8">
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Come alone. Leave connected.
          </p>

          <div className="mt-3 flex flex-wrap items-start gap-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {event.title}
            </h1>
            {user?.id === event.hostId && (
              <Link
                href={`/events/${event.id}/edit`}
                className="mt-1 rounded-full border border-mist bg-white px-4 py-1.5 text-sm font-medium text-clay transition-colors hover:border-clay"
              >
                Edit event
              </Link>
            )}
          </div>

          {/* Welcome for newcomers */}
          <div className="mt-6 flex gap-3 rounded-2xl border border-clay/20 bg-white p-5">
            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
            <div>
              <p className="text-sm font-medium text-ink">You belong here</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{welcome}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 text-muted sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-sage" />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-sage" />
              {event.time}
            </span>
            <div className="sm:col-span-2">
              <EventLocationLink
                location={event.location}
                city={event.city}
                country={event.country}
              />
            </div>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-sage" />
              {event.attendeeIds.length}{" "}
              {event.attendeeIds.length === 1 ? "person going" : "people going"}
            </span>
          </div>

          {host && (
            <Link
              href={`/profile/${host.id}`}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-mist bg-white p-4 transition-colors hover:border-clay"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={host.photo} alt={host.name} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Hosted by</p>
                <p className="font-medium">{host.name}</p>
                <p className="text-xs text-muted">A creative who wants you to feel welcome</p>
              </div>
            </Link>
          )}

          <div className="mt-8 rounded-2xl border border-mist bg-white p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold tracking-tight">About this gathering</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{event.description}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
            <h2 className="font-display text-lg font-semibold tracking-tight">Join this event</h2>
            <p className="mt-1 text-sm text-muted">
              Showing up is enough. You don&apos;t need to know anyone yet.
            </p>
            <div className="mt-5">
              <JoinEventButton
                eventId={event.id}
                isAttending={Boolean(attending)}
                isLoggedIn={Boolean(user)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
