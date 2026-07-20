import type { Community } from "@/types";

export interface CommunityRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  country: string;
  focus: string;
  cover_image_url: string;
  community_members?: { user_id: string }[];
}

export function mapCommunity(row: CommunityRow): Community {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    city: row.city,
    country: row.country,
    focus: row.focus,
    coverImageUrl:
      row.cover_image_url ||
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
    memberIds: row.community_members?.map((m) => m.user_id) ?? [],
  };
}
