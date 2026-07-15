import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { getEventById, isUserAttending } from "@/lib/queries/events";
import { getCreativeById, getAuthUser } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";
import { JoinEventButton } from "@/components/JoinEventButton";

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

  const attending =
    user && (await isUserAttending(event.id, user.id));

  const date = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="896px"
        />
      </div>

      <div className="mt-8">
        <DisciplinePill discipline={event.category} size="md" />
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold md:text-4xl">{event.title}</h1>
          {user?.id === event.hostId && (
            <Link
              href={`/events/${event.id}/edit`}
              className="rounded-full border border-mist bg-white px-4 py-1.5 text-sm font-medium text-clay transition-colors hover:border-clay"
            >
              Edit event
            </Link>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-muted">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}, {event.city}, {event.country}
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {event.attendeeIds.length} attending
          </span>
        </div>

        {host && (
          <Link
            href={`/profile/${host.id}`}
            className="mt-6 inline-flex items-center gap-3 rounded-xl border border-mist bg-white p-3 transition-colors hover:border-clay"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={host.photo} alt={host.name} fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <p className="text-xs text-muted">Hosted by</p>
              <p className="font-medium">{host.name}</p>
            </div>
          </Link>
        )}

        <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
          <h2 className="font-semibold">About this event</h2>
          <p className="mt-3 leading-relaxed text-muted">{event.description}</p>
        </div>

        <div className="mt-8">
          <JoinEventButton
            eventId={event.id}
            isAttending={Boolean(attending)}
            isLoggedIn={Boolean(user)}
          />
        </div>
      </div>
    </div>
  );
}
