import { EventCard } from "@/components/EventCard";
import { getEvents } from "@/lib/queries/events";

export const metadata = {
  title: "Events — WeKonnect",
  description: "Discover and join creative events on WeKonnect.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="mt-2 text-muted">
            Design Kaffe, photo walks, creator nights, and more — find your next creative meetup.
          </p>
        </div>
        <a
          href="/events/create"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-stone hover:bg-clay"
        >
          + Create event
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
