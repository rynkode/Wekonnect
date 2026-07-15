import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { CityCard } from "@/components/CityCard";
import { DisciplinePill } from "@/components/DisciplinePill";
import { getEvents } from "@/lib/queries/events";
import { getCitiesWithCounts } from "@/lib/queries/cities";
import { disciplines } from "@/lib/data";

export default async function HomePage() {
  const [events, citiesWithCounts] = await Promise.all([
    getEvents(),
    getCitiesWithCounts(),
  ]);
  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-mist">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-clay/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-clay">
            WeKonnect · Weko · WK
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Connect through{" "}
            <span className="text-clay">creativity</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Discover creative people, join events, and build meaningful connections —
            from Bergen to the world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
            >
              Explore events
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-6 py-3 text-sm font-medium transition-colors hover:border-clay hover:text-clay"
            >
              Create a meetup
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-semibold">How WeKonnect works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Create your profile",
              text: "Share who you are — your discipline, skills, portfolio, and what you want to connect for.",
              icon: Users,
            },
            {
              step: "02",
              title: "Discover nearby",
              text: "Find creatives and events in your city — or explore creative communities worldwide.",
              icon: MapPin,
            },
            {
              step: "03",
              title: "Meet & collaborate",
              text: "Join a Design Kaffe, a photo walk, or a creator night. Build real creative connections.",
              icon: Calendar,
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-mist bg-white p-6">
              <span className="text-xs font-bold text-clay">{item.step}</span>
              <item.icon className="mt-4 h-6 w-6 text-sage" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-mist bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured events</h2>
              <p className="mt-2 text-muted">Meetups happening near you and around the world</p>
            </div>
            <Link href="/events" className="hidden text-sm font-medium text-clay hover:underline md:block">
              View all events →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {featuredEvents.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-mist bg-stone p-10 text-center">
              <p className="text-muted">No events yet — be the first to host a creative meetup.</p>
              <Link
                href="/events/create"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-stone hover:bg-clay"
              >
                Create an event
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-semibold">Every creative discipline</h2>
        <p className="mt-2 text-muted">
          Art, design, film, music, architecture, and more — all welcome on WeKonnect
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <Link key={d} href={`/creatives?discipline=${encodeURIComponent(d)}`}>
              <DisciplinePill discipline={d} size="md" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-mist bg-stone py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold">Creative cities</h2>
          <p className="mt-2 text-muted">
            Local scenes with global ambition — starting with Bergen, built for everywhere
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {citiesWithCounts.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                eventCount={city.eventCount}
                creativeCount={city.creativeCount}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold">Ready to connect?</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Join the creative network that helps you find your people — wherever you are in the world.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-light"
        >
          Start exploring
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
