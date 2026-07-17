/** Build a Google Maps search URL from location parts. */
export function getGoogleMapsUrl(parts: {
  location?: string;
  city?: string;
  country?: string;
}): string {
  const query = [parts.location, parts.city, parts.country]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(", ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
