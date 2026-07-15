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
    title: "Need a photographer for fashion project",
    description:
      "I'm launching a small fashion line in Bergen and need a photographer for a lookbook shoot. Paid collaboration.",
    discipline: "Photography",
    city: "Bergen",
    country: "Norway",
    createdAt: new Date().toISOString(),
    author: { name: "Ingrid Solheim", photo: "" },
  },
  {
    id: "mock-2",
    authorId: "4",
    title: "Looking for musicians for a short film",
    description:
      "Director seeking 2–3 musicians to compose and perform a score for a 10-minute documentary. Remote OK.",
    discipline: "Music",
    city: "London",
    country: "United Kingdom",
    createdAt: new Date().toISOString(),
    author: { name: "Amara Okafor", photo: "" },
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

  if (error || !data?.length) return mockCollaborations;

  return data.map(mapCollaboration);
}

export async function getCollaborationsByCity(cityName: string): Promise<Collaboration[]> {
  const all = await getCollaborations();
  return all.filter((c) => c.city.toLowerCase() === cityName.toLowerCase());
}
