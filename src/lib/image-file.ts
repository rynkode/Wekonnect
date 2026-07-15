const MAX_SIZE = 5 * 1024 * 1024;

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export function resolveImageMimeType(file: File): string | null {
  if (file.type && file.type.startsWith("image/")) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXT[ext] ?? null;
}

export function validateImageFile(file: File): string | null {
  if (file.size === 0) return "File is empty";
  if (file.size > MAX_SIZE) return "Image must be under 5 MB";
  if (!resolveImageMimeType(file)) {
    return "Use JPG, PNG, WebP, or GIF";
  }
  return null;
}

export function storageSetupErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("bucket not found")) {
    return "Image storage is not set up yet. In Supabase SQL Editor, run supabase/schema-phase3.sql, then try again.";
  }
  if (lower.includes("row-level security") || lower.includes("policy")) {
    return "Upload blocked by storage permissions. Run supabase/schema-phase3.sql in Supabase.";
  }
  return message;
}
