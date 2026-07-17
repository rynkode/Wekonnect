"use client";

import Link from "next/link";
import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventSwipeBrowser } from "@/components/EventSwipeBrowser";
import { BrowseModeToggle } from "@/components/BrowseModeToggle";
import type { EventWithHost } from "@/lib/db/types";

interface EventsPageContentProps {
  events: EventWithHost[];
}

export function EventsPageContent({ events }: EventsPageContentProps) {
  const [mode, setMode] = useState<"grid" | "swipe">("swipe");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="mt-2 text-muted">
            Design Kaffe, photo walks, creator nights — swipe or browse the grid.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BrowseModeToggle mode={mode} onChange={setMode} />
          <Link
            href="/events/create"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-stone hover:bg-clay"
          >
            + Create event
          </Link>
        </div>
      </div>

      <div className="mt-10">
        {mode === "swipe" ? (
          <EventSwipeBrowser events={events} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
