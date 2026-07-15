import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Collaboration } from "@/types";
import { DisciplinePill } from "./DisciplinePill";

interface CollaborationCardProps {
  collaboration: Collaboration;
}

export function CollaborationCard({ collaboration }: CollaborationCardProps) {
  const date = new Date(collaboration.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border border-mist bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <DisciplinePill discipline={collaboration.discipline} />
        <span className="text-xs text-muted">{date}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold">{collaboration.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{collaboration.description}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {collaboration.city && (
          <span className="flex items-center gap-1 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {collaboration.city}
            {collaboration.country ? `, ${collaboration.country}` : ""}
          </span>
        )}
        {collaboration.author && (
          <Link
            href={`/profile/${collaboration.authorId}`}
            className="text-sm font-medium text-clay hover:underline"
          >
            {collaboration.author.name}
          </Link>
        )}
      </div>
    </article>
  );
}
