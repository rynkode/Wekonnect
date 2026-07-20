import type {
  CreativeProfile,
  Event,
  PortfolioItem,
  Project,
  SocialLink,
} from "@/types";
import { getCityCoverImage, getEventImage, getProfilePhoto } from "@/lib/images";
import {
  normalizeConnectForList,
  normalizeDisciplineList,
  normalizeEventCategory,
} from "@/lib/options";

/** Raw row from Supabase `profiles` table */
export interface ProfileRow {
  id: string;
  name: string;
  photo: string;
  city: string;
  country: string;
  bio: string;
  disciplines: string[];
  skills: string[];
  connect_for: string[];
  portfolio: PortfolioItem[];
  links: SocialLink[];
  projects: Project[];
}

/** Raw row from Supabase `events` table */
export interface EventRow {
  id: string;
  title: string;
  category: string;
  host_id: string;
  date: string;
  time: string;
  city: string;
  country: string;
  location: string;
  description: string;
  image_url: string;
  event_attendees?: { user_id: string }[];
  host?: { name: string; photo: string } | { name: string; photo: string }[];
}

export interface EventWithHost extends Event {
  host?: { name: string; photo: string };
}

/** Raw row from Supabase `cities` table */
export interface CityRow {
  id: string;
  name: string;
  country: string;
  slug: string;
  description: string;
  cover_image_url: string;
}

export function mapProfile(row: ProfileRow): CreativeProfile {
  return {
    id: row.id,
    name: row.name,
    photo: getProfilePhoto(row.photo),
    city: row.city,
    country: row.country,
    disciplines: normalizeDisciplineList(row.disciplines),
    bio: row.bio,
    skills: row.skills,
    portfolio: row.portfolio ?? [],
    links: row.links ?? [],
    connectFor: normalizeConnectForList(row.connect_for),
    projects: row.projects ?? [],
  };
}

export function mapEvent(row: EventRow): EventWithHost {
  const hostData = Array.isArray(row.host) ? row.host[0] : row.host;
  return {
    id: row.id,
    title: row.title,
    category: normalizeEventCategory(row.category),
    hostId: row.host_id,
    date: row.date,
    time: row.time,
    city: row.city,
    country: row.country,
    location: row.location,
    description: row.description,
    imageUrl: getEventImage(row.image_url),
    attendeeIds: row.event_attendees?.map((a) => a.user_id) ?? [],
    host: hostData,
  };
}

export function mapCity(row: CityRow) {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    slug: row.slug,
    description: row.description,
    coverImageUrl: getCityCoverImage(row.slug, row.cover_image_url),
  };
}

export function profileToRow(
  id: string,
  data: Partial<CreativeProfile>
): Partial<ProfileRow> {
  return {
    id,
    name: data.name,
    photo: data.photo,
    city: data.city,
    country: data.country,
    bio: data.bio,
    disciplines: data.disciplines,
    skills: data.skills,
    connect_for: data.connectFor,
    portfolio: data.portfolio,
    links: data.links,
    projects: data.projects,
    updated_at: new Date().toISOString(),
  } as Partial<ProfileRow>;
}
