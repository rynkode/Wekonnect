import { EventCard } from "@/components/EventCard";
import { CreativeCard } from "@/components/CreativeCard";
import { CityCard } from "@/components/CityCard";
import { CommunityCard } from "@/components/CommunityCard";
import { getEvents } from "@/lib/queries/events";
import { getCreatives } from "@/lib/queries/creatives";
import { getCitiesWithCounts } from "@/lib/queries/cities";
import { getCommunities } from "@/lib/queries/communities";

export const metadata = {
  title: "Explore — WeKonnect",
  description: "Discover creatives, events, and communities on WeKonnect.",
};

export default async function ExplorePage() {
  const [events, creatives, citiesWithCounts, communities] = await Promise.all([
    getEvents(),
    getCreatives(),
    getCitiesWithCounts(),
    getCommunities(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold">Explore</h1>
        <p className="mt-3 text-muted">
          Discover creatives, events, and communities — filter by location and discipline as we grow.
        </p>
      </div>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming events</h2>
          <a href="/events" className="text-sm font-medium text-clay hover:underline">
            See all →
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Creatives nearby & worldwide</h2>
          <a href="/creatives" className="text-sm font-medium text-clay hover:underline">
            Search all →
          </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creatives.slice(0, 3).map((creative) => (
            <CreativeCard key={creative.id} creative={creative} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Communities</h2>
          <a href="/communities" className="text-sm font-medium text-clay hover:underline">
            Find your tribe →
          </a>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.slice(0, 3).map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">Creative cities</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {citiesWithCounts.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              eventCount={city.eventCount}
              creativeCount={city.creativeCount}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
