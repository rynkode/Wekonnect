/** Wapate brand — single source of truth for product name & mark */
export const brand = {
  name: "Wapate",
  mark: "WP",
  /** Split for wordmark styling if needed */
  tagline: "No creative should feel alone.",
  shortDescription:
    "A global home for people who create. Find your community, meet people, join events, and collaborate anywhere in the world.",
  metaTitle: "Wapate — Find your creative community",
  metaDescription:
    "No creative should feel alone. Meet creatives, join communities, attend events, and collaborate anywhere in the world.",
} as const;

export function pageTitle(page: string) {
  return `${page} — ${brand.name}`;
}
