import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import type { EventWithHost } from "@/lib/db/types";
import { getCreativeById } from "@/lib/data";
import { DisciplinePill } from "./DisciplinePill";

interface EventCardProps {
  event: EventWithHost;
}

export function EventCard({ event }: EventCardProps) {
  const hostFromDb = event.host;
  const hostFromMock = !hostFromDb ? getCreativeById(event.hostId) : undefined;
  const hostName = hostFromDb?.name ?? hostFromMock?.name;
  const date = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <Link
      href={`/events/${event.id}`}
      className="group overflow-hidden rounded-2xl border border-mist bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3">
          <DisciplinePill discipline={event.category} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-clay">
          {event.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {date} · {event.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event.city}, {event.country}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {hostName && (
            <span className="text-sm text-muted">
              Hosted by <span className="font-medium text-ink">{hostName}</span>
            </span>
          )}
          <span className="flex items-center gap-1 text-sm text-muted">
            <Users className="h-4 w-4" />
            {event.attendeeIds.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
