import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Collaboration } from "@/types";
import { DisciplinePill } from "./DisciplinePill";

interface CollaborationCardProps {
  collaboration: Collaboration;
}

export function CollaborationCard({ collaboration }: CollaborationCardProps) {
  const place =
    collaboration.city && collaboration.country
      ? `${collaboration.city}, ${collaboration.country}`
      : collaboration.city || "Anywhere in the world";

  return (
    <Link
      href={`/collaborate/${collaboration.id}`}
      className="group block rounded-2xl border border-mist bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <DisciplinePill discipline={collaboration.discipline} />
        {collaboration.timeline && (
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {collaboration.timeline}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight group-hover:text-clay">
        {collaboration.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{collaboration.description}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-mist/80 pt-4">
        <span className="flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {place}
        </span>

        {collaboration.author && (
          <span className="flex items-center gap-2 text-sm font-medium text-ink">
            {collaboration.author.photo ? (
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src={collaboration.author.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </span>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-xs font-semibold text-ink">
                {collaboration.author.name.charAt(0)}
              </span>
            )}
            {collaboration.author.name}
          </span>
        )}
      </div>
    </Link>
  );
}
