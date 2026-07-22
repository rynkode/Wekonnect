import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users, Calendar } from "lucide-react";
import { getCityBySlug } from "@/lib/queries/cities";
import { getEventsByCity } from "@/lib/queries/events";
import { getCreativesByCity } from "@/lib/queries/creatives";
import { getCollaborationsByCity } from "@/lib/queries/collaborations";
import { EventCard } from "@/components/EventCard";
import { CreativeCard } from "@/components/CreativeCard";
import { CollaborationCard } from "@/components/CollaborationCard";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CityPageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: "City not found — Wapate" };
  return { title: `${city.name} — Wapate` };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);

  if (!city) notFound();

  const [events, creatives, collaborations] = await Promise.all([
    getEventsByCity(city.name),
    getCreativesByCity(city.name),
    getCollaborationsByCity(city.name),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-mist">
        <div className="relative aspect-[21/7] min-h-[220px] w-full">
          <Image
            src={city.coverImageUrl}
            alt={city.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-10">
            <p className="text-sm font-medium uppercase tracking-widest text-clay-light">
              Wapate
            </p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{city.name}</h1>
            <p className="mt-2 flex items-center gap-1 text-white/80">
              <MapPin className="h-4 w-4" />
              {city.country}
            </p>
            <p className="mt-4 max-w-2xl text-white/90">{city.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {events.length} events
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {creatives.length} creatives
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Events */}
        <section>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Events in {city.name}</h2>
            <Link href="/events/create" className="text-sm font-medium text-clay hover:underline">
              Create event →
            </Link>
          </div>
          {events.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted">No events in {city.name} yet. Be the first to host one.</p>
          )}
        </section>

        {/* Creatives */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Creatives in {city.name}</h2>
          {creatives.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {creatives.map((creative) => (
                <CreativeCard key={creative.id} creative={creative} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted">No creatives in {city.name} yet.</p>
          )}
        </section>

        {/* Collaborations */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Collaboration requests</h2>
            <Link href="/collaborate/create" className="text-sm font-medium text-clay hover:underline">
              Post a request →
            </Link>
          </div>
          {collaborations.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {collaborations.map((collab) => (
                <CollaborationCard key={collab.id} collaboration={collab} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted">No collaboration posts in {city.name} yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
