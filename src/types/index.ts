/** Creative disciplines a user can select */
export type Discipline =
  | "Art"
  | "Design"
  | "Photography"
  | "Film"
  | "Fashion"
  | "Architecture"
  | "Music"
  | "Writing"
  | "Creative technology"
  | "Other";

/** Why someone wants to connect */
export type ConnectFor =
  | "Collaboration"
  | "Networking"
  | "Learning"
  | "Finding opportunities"
  | "Building creative projects";

/** Event categories */
export type EventCategory =
  | "Design Kaffe"
  | "Artist Talk"
  | "Photo Walk"
  | "Creator Night"
  | "Gallery Meetup"
  | "Workshop"
  | "Other";

export interface PortfolioItem {
  title: string;
  imageUrl: string;
  link?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  year: number;
}

/** A creative person's public profile */
export interface CreativeProfile {
  id: string;
  name: string;
  photo: string;
  city: string;
  country: string;
  disciplines: Discipline[];
  bio: string;
  skills: string[];
  portfolio: PortfolioItem[];
  links: SocialLink[];
  connectFor: ConnectFor[];
  projects: Project[];
}

/** A meetup or creative event */
export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  hostId: string;
  date: string;
  time: string;
  city: string;
  country: string;
  location: string;
  description: string;
  imageUrl: string;
  attendeeIds: string[];
}

/** A city community on WeKonnect */
export interface CityCommunity {
  id: string;
  name: string;
  country: string;
  slug: string;
  description: string;
  coverImageUrl: string;
}

/** A collaboration request — "looking for" post */
export interface Collaboration {
  id: string;
  authorId: string;
  title: string;
  description: string;
  discipline: Discipline | string;
  city: string;
  country: string;
  createdAt: string;
  author?: { name: string; photo: string };
}
