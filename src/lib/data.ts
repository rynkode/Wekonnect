import type { CreativeProfile, Event, CityCommunity } from "@/types";

/** Sample creatives — Bergen-first, with global examples */
export const creatives: CreativeProfile[] = [
  {
    id: "1",
    name: "Ingrid Solheim",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    city: "Bergen",
    country: "Norway",
    disciplines: ["Design", "Creative technology"],
    bio: "Product designer exploring the intersection of Nordic minimalism and digital craft. Co-founder of a small studio in Bergen.",
    skills: ["UI Design", "Figma", "Design systems", "Prototyping"],
    portfolio: [
      {
        title: "Nordic Light App",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      },
      {
        title: "Bergen Transit Rebrand",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      },
    ],
    links: [
      { label: "Website", url: "https://example.com" },
      { label: "Instagram", url: "https://instagram.com" },
    ],
    connectFor: ["Collaboration", "Networking"],
    projects: [
      {
        title: "Design Kaffe Bergen",
        description: "Monthly meetup for designers in Bergen.",
        year: 2025,
      },
    ],
  },
  {
    id: "2",
    name: "Marcus Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    city: "Bergen",
    country: "Norway",
    disciplines: ["Photography", "Film"],
    bio: "Documentary photographer and filmmaker capturing coastal life along the Norwegian west coast.",
    skills: ["Portrait", "Documentary", "Lightroom", "Premiere Pro"],
    portfolio: [
      {
        title: "West Coast Stories",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      },
      {
        title: "Harbor Light",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      },
    ],
    links: [{ label: "Portfolio", url: "https://example.com" }],
    connectFor: ["Collaboration", "Building creative projects"],
    projects: [
      {
        title: "Fjord Documentary",
        description: "Short film about fishing communities.",
        year: 2024,
      },
    ],
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    city: "Tokyo",
    country: "Japan",
    disciplines: ["Art", "Fashion"],
    bio: "Mixed-media artist working with textiles and installation. Exhibited in Tokyo and Oslo.",
    skills: ["Textile art", "Installation", "Curating"],
    portfolio: [
      {
        title: "Thread Memory",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      },
    ],
    links: [{ label: "Instagram", url: "https://instagram.com" }],
    connectFor: ["Collaboration", "Learning"],
    projects: [],
  },
  {
    id: "4",
    name: "Amara Okafor",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    city: "London",
    country: "United Kingdom",
    disciplines: ["Music", "Writing"],
    bio: "Composer and lyricist blending Afrobeat with electronic textures. Looking for filmmakers and visual artists.",
    skills: ["Composition", "Ableton", "Songwriting", "Sound design"],
    portfolio: [
      {
        title: "Echoes EP",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
      },
    ],
    links: [{ label: "Spotify", url: "https://spotify.com" }],
    connectFor: ["Collaboration", "Finding opportunities"],
    projects: [
      {
        title: "Echoes",
        description: "Debut EP released independently.",
        year: 2025,
      },
    ],
  },
  {
    id: "5",
    name: "Leo Bergström",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    city: "Bergen",
    country: "Norway",
    disciplines: ["Architecture", "Design"],
    bio: "Architect focused on sustainable public spaces. Teaching part-time at BAS.",
    skills: ["Urban design", "Rhino", "Sustainability", "Workshop facilitation"],
    portfolio: [
      {
        title: "Bryggen Pavilion Concept",
        imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      },
    ],
    links: [{ label: "Website", url: "https://example.com" }],
    connectFor: ["Networking", "Learning"],
    projects: [],
  },
  {
    id: "6",
    name: "Sofia Reyes",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    city: "New York",
    country: "United States",
    disciplines: ["Film", "Photography"],
    bio: "Independent filmmaker and photographer. Fashion editorials and short documentaries.",
    skills: ["Directing", "Cinematography", "Editing", "Styling"],
    portfolio: [
      {
        title: "City Pulse",
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
      },
    ],
    links: [{ label: "Vimeo", url: "https://vimeo.com" }],
    connectFor: ["Collaboration", "Building creative projects"],
    projects: [
      {
        title: "City Pulse",
        description: "Documentary short about NYC subway musicians.",
        year: 2024,
      },
    ],
  },
];

/** Sample events — mix of Bergen and global */
export const events: Event[] = [
  {
    id: "1",
    title: "Design Kaffe — Bergen Edition",
    category: "Design Kaffe",
    hostId: "1",
    date: "2026-07-18",
    time: "10:00",
    city: "Bergen",
    country: "Norway",
    location: "Kaffebrenneriet, Øvregaten 12",
    description:
      "Creative designers meet for coffee, share work-in-progress, and talk about what inspires us. Bring your laptop or sketchbook — all design disciplines welcome.",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop",
    attendeeIds: ["2", "5"],
  },
  {
    id: "2",
    title: "Photo Walk: Bryggen at Golden Hour",
    category: "Photo Walk",
    hostId: "2",
    date: "2026-07-20",
    time: "19:00",
    city: "Bergen",
    country: "Norway",
    location: "Meeting point: Bryggen Wharf",
    description:
      "Photographers explore Bergen's historic wharf together. We'll walk, shoot, and optionally share edits afterward at a nearby café.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a87a7bb?w=800&h=500&fit=crop",
    attendeeIds: ["1"],
  },
  {
    id: "3",
    title: "Creator Night — Short Films & Feedback",
    category: "Creator Night",
    hostId: "6",
    date: "2026-07-25",
    time: "18:30",
    city: "New York",
    country: "United States",
    location: "Brooklyn Creative Hub, Williamsburg",
    description:
      "Filmmakers share recent projects and get constructive feedback from peers. 5-minute slots — sign up at the door.",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
    attendeeIds: [],
  },
  {
    id: "4",
    title: "Artist Talk: Material & Memory",
    category: "Artist Talk",
    hostId: "3",
    date: "2026-08-02",
    time: "14:00",
    city: "Tokyo",
    country: "Japan",
    location: "Shibuya Gallery Space",
    description:
      "Yuki Tanaka presents her creative process — from textile experiments to large-scale installations. Q&A and networking after.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop",
    attendeeIds: [],
  },
  {
    id: "5",
    title: "Gallery Meetup: Emerging Voices",
    category: "Gallery Meetup",
    hostId: "4",
    date: "2026-07-22",
    time: "17:00",
    city: "London",
    country: "United Kingdom",
    location: "East London Gallery, Shoreditch",
    description:
      "Artists and creatives connect over current exhibitions. Informal introductions, no pitches — just genuine creative conversation.",
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34067e?w=800&h=500&fit=crop",
    attendeeIds: ["6"],
  },
];

/** City communities */
export const cities: CityCommunity[] = [
  {
    id: "1",
    name: "Bergen",
    country: "Norway",
    slug: "bergen",
    description:
      "A UNESCO Creative City of Gastronomy with a thriving design, music, and film scene on Norway's west coast.",
    coverImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    name: "London",
    country: "United Kingdom",
    slug: "london",
    description:
      "One of the world's great creative capitals — fashion, film, design, and art collide in every borough.",
    coverImageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    slug: "new-york",
    description:
      "The city that never sleeps — home to filmmakers, musicians, architects, and artists from every corner of the globe.",
    coverImageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Tokyo",
    country: "Japan",
    slug: "tokyo",
    description:
      "Where tradition meets future — a global hub for art, fashion, architecture, and creative technology.",
    coverImageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
  },
];

export const disciplines = [
  "Art",
  "Design",
  "Photography",
  "Film",
  "Fashion",
  "Architecture",
  "Music",
  "Writing",
  "Creative technology",
  "Other",
] as const;

export const eventCategories = [
  "Design Kaffe",
  "Artist Talk",
  "Photo Walk",
  "Creator Night",
  "Gallery Meetup",
  "Workshop",
  "Other",
] as const;

/** Helper: find a creative by id */
export function getCreativeById(id: string): CreativeProfile | undefined {
  return creatives.find((c) => c.id === id);
}

/** Helper: find an event by id */
export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

/** Helper: count events in a city */
export function getEventCountForCity(cityName: string): number {
  return events.filter((e) => e.city === cityName).length;
}

/** Helper: count creatives in a city */
export function getCreativeCountForCity(cityName: string): number {
  return creatives.filter((c) => c.city === cityName).length;
}
