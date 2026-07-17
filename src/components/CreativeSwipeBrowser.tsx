"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { CreativeProfile } from "@/types";
import { DisciplinePill } from "./DisciplinePill";
import { SwipeDeck } from "./SwipeDeck";

interface CreativeSwipeBrowserProps {
  creatives: CreativeProfile[];
}

export function CreativeSwipeBrowser({ creatives }: CreativeSwipeBrowserProps) {
  return (
    <SwipeDeck
      count={creatives.length}
      emptyMessage="No creatives to browse yet."
      label="Profile"
    >
      {(index) => {
        const creative = creatives[index];
        if (!creative) return null;

        return (
          <article className="flex h-full flex-col">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-mist">
              <Image
                src={creative.photo}
                alt={creative.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                draggable={false}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-semibold">{creative.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                {creative.city}, {creative.country}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {creative.disciplines.slice(0, 4).map((d) => (
                  <DisciplinePill key={d} discipline={d} />
                ))}
              </div>
              <p className="mt-3 line-clamp-4 text-sm text-muted">{creative.bio}</p>
              {creative.connectFor.length > 0 && (
                <p className="mt-2 text-xs text-muted">
                  Looking for: {creative.connectFor.slice(0, 2).join(", ")}
                </p>
              )}
              <Link
                href={`/profile/${creative.id}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
                onPointerDown={(e) => e.stopPropagation()}
              >
                View profile
              </Link>
            </div>
          </article>
        );
      }}
    </SwipeDeck>
  );
}
