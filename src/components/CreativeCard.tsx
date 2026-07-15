import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { CreativeProfile } from "@/types";
import { DisciplinePill } from "./DisciplinePill";

interface CreativeCardProps {
  creative: CreativeProfile;
}

export function CreativeCard({ creative }: CreativeCardProps) {
  return (
    <Link
      href={`/profile/${creative.id}`}
      className="group rounded-2xl border border-mist bg-white p-5 transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={creative.photo}
            alt={creative.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold group-hover:text-clay">{creative.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {creative.city}, {creative.country}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {creative.disciplines.slice(0, 3).map((d) => (
          <DisciplinePill key={d} discipline={d} />
        ))}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted">{creative.bio}</p>
    </Link>
  );
}
