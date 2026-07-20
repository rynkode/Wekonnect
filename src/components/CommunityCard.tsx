import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { Community } from "@/types";
import { DisciplinePill } from "./DisciplinePill";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  const place =
    community.city && community.country
      ? `${community.city}, ${community.country}`
      : community.city || "Worldwide";

  return (
    <Link
      href={`/communities/${community.slug}`}
      className="group overflow-hidden rounded-2xl border border-mist bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={community.coverImageUrl}
          alt={community.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute bottom-3 left-3">
          {community.focus && <DisciplinePill discipline={community.focus} />}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-clay">
          {community.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {place}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-muted">{community.description}</p>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
          <Users className="h-4 w-4" />
          {community.memberIds.length}{" "}
          {community.memberIds.length === 1 ? "member" : "members"}
        </p>
      </div>
    </Link>
  );
}
