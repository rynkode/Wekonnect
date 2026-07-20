import type { Community } from "@/types";

/** Demo communities when Supabase table is empty / not set up */
export const mockCommunities: Community[] = [
  {
    id: "c1",
    name: "Bergen Designers",
    slug: "bergen-designers",
    description:
      "A home for product, graphic, and spatial designers in Bergen — coffee, critique, and collaboration on the west coast.",
    city: "Bergen",
    country: "Norway",
    focus: "Design",
    coverImageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop",
    memberIds: ["1", "5"],
  },
  {
    id: "c2",
    name: "London Photographers",
    slug: "london-photographers",
    description:
      "Street, portrait, and documentary photographers across London. Walks, shares, and creative friendships.",
    city: "London",
    country: "United Kingdom",
    focus: "Photography",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop",
    memberIds: ["6"],
  },
  {
    id: "c3",
    name: "Tokyo Artists",
    slug: "tokyo-artists",
    description:
      "Painters, installation artists, and makers in Tokyo — tradition meeting the contemporary scene.",
    city: "Tokyo",
    country: "Japan",
    focus: "Art",
    coverImageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
    memberIds: ["3"],
  },
  {
    id: "c4",
    name: "Creative Entrepreneurs",
    slug: "creative-entrepreneurs",
    description:
      "Creatives building studios, products, and brands. Global tribe for makers who also ship.",
    city: "",
    country: "",
    focus: "Technology",
    coverImageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    memberIds: ["1", "4"],
  },
  {
    id: "c5",
    name: "Film Makers",
    slug: "film-makers",
    description:
      "Directors, editors, and storytellers worldwide. Feedback nights, co-productions, and crew connections.",
    city: "",
    country: "",
    focus: "Film",
    coverImageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
    memberIds: ["2", "6"],
  },
  {
    id: "c6",
    name: "Illustrators",
    slug: "illustrators",
    description:
      "Illustration, comics, and visual storytelling. Share process, find clients, and make friends who draw.",
    city: "",
    country: "",
    focus: "Art",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop",
    memberIds: [],
  },
  {
    id: "c7",
    name: "Architecture Community",
    slug: "architecture-community",
    description:
      "Architects, spatial designers, and urban thinkers — studio talks, site visits, and shared ambition.",
    city: "",
    country: "",
    focus: "Architecture",
    coverImageUrl:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop",
    memberIds: [],
  },
];
