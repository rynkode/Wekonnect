"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import type { EventWithHost } from "@/lib/db/types";
import { DisciplinePill } from "./DisciplinePill";
import { SwipeDeck } from "./SwipeDeck";

interface EventSwipeBrowserProps {
  events: EventWithHost[];
}

export function EventSwipeBrowser({ events }: EventSwipeBrowserProps) {
  return (
    <SwipeDeck
      count={events.length}
      emptyMessage="No events yet. Create the first meetup."
      label="Event"
    >
      {(index) => {
        const event = events[index];
        if (!event) return null;

        const date = new Date(event.date).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

        return (
          <article className="flex h-full flex-col">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                draggable={false}
              />
              <div className="absolute left-3 top-3">
                <DisciplinePill discipline={event.category} />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-semibold leading-snug">{event.title}</h2>
              <div className="mt-3 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  {date} · {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {event.city}, {event.country}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  {event.attendeeIds.length} attending
                </p>
              </div>
              {event.host?.name && (
                <p className="mt-3 text-sm text-muted">
                  Hosted by <span className="font-medium text-ink">{event.host.name}</span>
                </p>
              )}
              <p className="mt-3 line-clamp-3 text-sm text-muted">{event.description}</p>
              <Link
                href={`/events/${event.id}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
                onPointerDown={(e) => e.stopPropagation()}
              >
                View event
              </Link>
            </div>
          </article>
        );
      }}
    </SwipeDeck>
  );
}
