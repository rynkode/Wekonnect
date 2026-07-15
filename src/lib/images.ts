/** Known-good cover images for seeded cities (avoids broken Unsplash URLs in DB). */
const CITY_COVERS: Record<string, string> = {
  bergen:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
  london:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop",
  "new-york":
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=500&fit=crop",
  tokyo:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
};

const BROKEN_UNSPLASH_IDS = [
  "photo-1513622470522",
  "photo-1496442226666",
  "photo-1569259923769",
  "photo-1485871981521",
];

export const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop";

export const DEFAULT_CITY_COVER =
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop";

export function getCityCoverImage(slug: string, url?: string | null): string {
  if (CITY_COVERS[slug]) return CITY_COVERS[slug];
  if (!url || BROKEN_UNSPLASH_IDS.some((id) => url.includes(id))) {
    return DEFAULT_CITY_COVER;
  }
  return url;
}

export const DEFAULT_PROFILE_PHOTO =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop";

export function getProfilePhoto(url?: string | null): string {
  if (!url || BROKEN_UNSPLASH_IDS.some((id) => url.includes(id)) || url.includes("photo-1535713875002")) {
    return DEFAULT_PROFILE_PHOTO;
  }
  return url;
}

export function getEventImage(url?: string | null): string {
  if (!url || BROKEN_UNSPLASH_IDS.some((id) => url.includes(id))) {
    return DEFAULT_EVENT_IMAGE;
  }
  return url;
}
