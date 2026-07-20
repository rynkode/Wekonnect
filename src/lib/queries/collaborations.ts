import { createClientIfConfigured } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapCollaboration } from "@/lib/db/collaborations";
import type { Collaboration } from "@/types";

const COLLAB_SELECT = `
  *,
  author:profiles!author_id ( name, photo )
`;

const mockCollaborations: Collaboration[] = [
  {
    id: "mock-1",
    authorId: "1",
    title: "I'm looking for a photographer for a fashion project",
    description:
      "Launching a small fashion line in Bergen. Looking for someone who loves natural light and storytelling — let's make a lookbook together.",
    discipline: "Photography",
    city: "Bergen",
    country: "Norway",
    timeline: "Next 4 weeks",
    createdAt: new Date().toISOString(),
    author: {
      name: "Ingrid Solheim",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
  },
  {
    id: "mock-2",
    authorId: "4",
    title: "Looking for musicians for a short film",
    description:
      "Director seeking 2–3 musicians to compose and perform a score for a 10-minute documentary. Creative partnership, not a gig board.",
    discipline: "Music",
    city: "London",
    country: "United Kingdom",
    timeline: "Flexible — spring",
    createdAt: new Date().toISOString(),
    author: {
      name: "Amara Okafor",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
  },
  {
    id: "mock-3",
    authorId: "5",
    title: "Need a designer for a startup brand",
    description:
      "Building a creative tools startup. Want a designer to shape identity and product UI as a collaborator — someone who cares about craft.",
    discipline: "Design",
    city: "",
    country: "",
    timeline: "Ongoing",
    createdAt: new Date().toISOString(),
    author: {
      name: "Kai Nakamura",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
  },
];

export async function getCollaborations(): Promise<Collaboration[]> {
  if (!isSupabaseConfigured()) return mockCollaborations;

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCollaborations;

  const { data, error } = await supabase
    .from("collaborations")
    .select(COLLAB_SELECT)
    .order("created_at", { ascending: false });

  // Live DB: show real empty state — don't hide emptiness with mocks
  if (error) {
    console.error("getCollaborations:", error.message);
    return [];
  }

  return (data ?? []).map(mapCollaboration);
}

export async function getCollaborationById(
  id: string
): Promise<Collaboration | undefined> {
  if (!isSupabaseConfigured()) {
    return mockCollaborations.find((c) => c.id === id);
  }

  const supabase = await createClientIfConfigured();
  if (!supabase) return mockCollaborations.find((c) => c.id === id);

  const { data, error } = await supabase
    .from("collaborations")
    .select(COLLAB_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return mockCollaborations.find((c) => c.id === id);
  }

  return mapCollaboration(data);
}

export async function getCollaborationsByCity(
  cityName: string
): Promise<Collaboration[]> {
  const all = await getCollaborations();
  return all.filter((c) => c.city.toLowerCase() === cityName.toLowerCase());
}
