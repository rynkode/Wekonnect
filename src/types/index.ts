/** Creative disciplines / interests a user can select */
export type Discipline =
  | "Art"
  | "Design"
  | "Photography"
  | "Film"
  | "Fashion"
  | "Architecture"
  | "Music"
  | "Technology"
  | "Writing"
  | "Creative technology"
  | "Other";

/** Why someone wants to connect — invitation, not just a portfolio tag */
export type ConnectFor =
  | "Collaboration"
  | "Creative friendships"
  | "Learning"
  | "Networking"
  | "Projects"
  | "Opportunities"
  /** @deprecated legacy values still in DB */
  | "Finding opportunities"
  | "Building creative projects";

/** Event categories — belonging moments, not just calendar labels */
export type EventCategory =
  | "Design Coffee"
  | "Artist Talks"
  | "Photo Walks"
  | "Creative Workshops"
  | "Studio Visits"
  | "Exhibition Openings"
  | "Creator Meetups"
  | "Other"
  /** @deprecated legacy values still in DB */
  | "Design Kaffe"
  | "Artist Talk"
  | "Photo Walk"
  | "Creator Night"
  | "Gallery Meetup"
  | "Workshop";

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

/** A city community on Wapate */
export interface CityCommunity {
  id: string;
  name: string;
  country: string;
  slug: string;
  description: string;
  coverImageUrl: string;
}

/** A creative collaboration invite — "I'm looking for…" (not a job listing) */
export interface Collaboration {
  id: string;
  authorId: string;
  title: string;
  description: string;
  discipline: Discipline | string;
  city: string;
  country: string;
  /** When they want to create together, e.g. "This month", "Flexible" */
  timeline: string;
  createdAt: string;
  author?: { name: string; photo: string };
}

/** A creative tribe — where people belong */
export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  country: string;
  /** Creative focus e.g. Design, Photography, Film */
  focus: string;
  coverImageUrl: string;
  memberIds: string[];
}
