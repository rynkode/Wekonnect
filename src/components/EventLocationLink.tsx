import { ExternalLink, MapPin } from "lucide-react";
import { getGoogleMapsUrl } from "@/lib/maps";

interface EventLocationLinkProps {
  location: string;
  city: string;
  country: string;
}

export function EventLocationLink({ location, city, country }: EventLocationLinkProps) {
  const mapsUrl = getGoogleMapsUrl({ location, city, country });
  const label = [location, city, country].filter(Boolean).join(", ");

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-start gap-2 text-left text-muted transition-colors hover:text-clay"
    >
      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="underline-offset-2 hover:underline">
        {label}
        <span className="ml-1.5 inline-flex items-center gap-1 text-xs font-medium text-clay">
          Open in Maps
          <ExternalLink className="h-3 w-3" />
        </span>
      </span>
    </a>
  );
}
