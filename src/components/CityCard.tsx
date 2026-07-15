import Link from "next/link";
import type { CityCommunity } from "@/types";

interface CityCardProps {
  city: CityCommunity;
  eventCount?: number;
  creativeCount?: number;
}

export function CityCard({ city, eventCount = 0, creativeCount = 0 }: CityCardProps) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={city.coverImageUrl}
          alt={city.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">
          WeKonnect
        </p>
        <h3 className="text-xl font-semibold">{city.name}</h3>
        <p className="mt-1 text-sm text-white/80">
          {eventCount} events · {creativeCount} creatives
        </p>
      </div>
    </Link>
  );
}
