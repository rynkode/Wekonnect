import type { Collaboration, Discipline } from "@/types";

export interface CollaborationRow {
  id: string;
  author_id: string;
  title: string;
  description: string;
  discipline: string;
  city: string;
  country: string;
  created_at: string;
  author?: { name: string; photo: string } | { name: string; photo: string }[];
}

export function mapCollaboration(row: CollaborationRow): Collaboration {
  const authorData = Array.isArray(row.author) ? row.author[0] : row.author;
  return {
    id: row.id,
    authorId: row.author_id,
    title: row.title,
    description: row.description,
    discipline: row.discipline as Discipline,
    city: row.city,
    country: row.country,
    createdAt: row.created_at,
    author: authorData,
  };
}
