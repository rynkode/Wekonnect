import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { CommunityCard } from "@/components/CommunityCard";
import { LandingHero } from "@/components/home/LandingHero";
import { Reveal } from "@/components/home/Reveal";
import { getEvents } from "@/lib/queries/events";
import { getCitiesWithCounts } from "@/lib/queries/cities";
import { getCommunities } from "@/lib/queries/communities";

export default async function HomePage() {
  const [events, citiesWithCounts, communities] = await Promise.all([
    getEvents(),
    getCitiesWithCounts(),
    getCommunities(),
  ]);
  const upcomingEvents = events.slice(0, 3);
  const featuredCommunities = communities.slice(0, 4);

  return (
    <div className="landing">
      <LandingHero />

      {/* Why WeKonnect exists */}
      <section className="relative overflow-hidden border-b border-mist bg-[#f3efe8]">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-clay/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
              Why WeKonnect exists
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              No creative should feel alone.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
              Moving to a new city, starting creative work, or looking for collaborators
              can feel isolating. WeKonnect exists so you can find your people — nearby
              and around the world — and create together.
            </p>
            <ul className="mt-10 space-y-4 text-base text-ink/80 md:text-lg">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                Find creative people near you
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                Join creative communities in your city
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                Attend events that bring makers together
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                Collaborate with creatives anywhere in the world
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-mist bg-stone py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
              How it works
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Three steps to belong
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                step: "01",
                title: "Find your people",
                text: "Discover creatives by discipline and city — the photographer next door, the filmmaker across the ocean.",
              },
              {
                step: "02",
                title: "Join your community",
                text: "Step into local scenes and global circles. Events, city pages, and shared creative energy.",
              },
              {
                step: "03",
                title: "Create together",
                text: "Collaborate on projects, meet at Design Kaffes and photo walks, and build work that matters.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delayMs={i * 100}>
                <div className="border-t border-ink/10 pt-6">
                  <span className="font-display text-sm font-semibold tracking-widest text-clay">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured communities */}
      <section className="border-b border-mist bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
                  Featured communities
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Find your tribe
                </h2>
                <p className="mt-3 max-w-lg text-muted">
                  Bergen Designers, London Photographers, Film Makers — groups where creatives belong.
                </p>
              </div>
              <Link
                href="/communities"
                className="text-sm font-medium text-clay transition-colors hover:text-ink"
              >
                All communities →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCommunities.map((community, i) => (
              <Reveal key={community.id} delayMs={i * 80}>
                <CommunityCard community={community} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="border-b border-mist bg-stone py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
                  Upcoming events
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Meet in real life
                </h2>
                <p className="mt-3 max-w-lg text-muted">
                  Design Kaffes, photo walks, creator nights — moments that turn strangers into collaborators.
                </p>
              </div>
              <Link
                href="/events"
                className="text-sm font-medium text-clay transition-colors hover:text-ink"
              >
                View all events →
              </Link>
            </div>
          </Reveal>

          {upcomingEvents.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.id} delayMs={i * 80}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-12 border border-dashed border-mist px-6 py-14 text-center">
                <p className="text-muted">
                  No events yet — be the first to host a creative meetup in your city.
                </p>
                <Link
                  href="/events/create"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-ink"
                >
                  Create an event
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Creative cities */}
      <section className="relative overflow-hidden border-b border-mist bg-ink py-24 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,112,74,0.25),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-clay-light">
              Creative cities
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
              From Bergen to Tokyo — and every city that creates.
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              WeKonnect grows with the world&apos;s creative capitals and quiet hometown scenes alike.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {citiesWithCounts.map((city, i) => (
              <Reveal key={city.id} delayMs={i * 70}>
                <Link
                  href={`/cities/${city.slug}`}
                  className="group block border-t border-white/20 pt-5 transition-colors hover:border-clay-light"
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:text-clay-light">
                    {city.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{city.country}</p>
                  <p className="mt-4 text-sm text-white/70">
                    {city.eventCount} events · {city.creativeCount} creatives
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#f3efe8] py-28 md:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-mist to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
              Your people are waiting
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              No creative should feel alone.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
              Join WeKonnect — find creatives near you, join communities, attend events,
              and collaborate anywhere in the world.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-stone transition-colors hover:bg-clay"
              >
                Join WeKonnect
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/creatives"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-transparent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
              >
                Explore Creatives
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
