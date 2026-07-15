import { createClient } from "@/lib/supabase/server";
import { resolveImageMimeType, storageSetupErrorMessage, validateImageFile } from "@/lib/image-file";

const MAX_SIZE = 5 * 1024 * 1024;

/** Read a file input from FormData (requires multipart form encoding). */
export function getUploadedFile(formData: FormData, name = "image"): File | null {
  const value = formData.get(name);
  if (value instanceof File && value.size > 0) return value;
  return null;
}

export function getUploadedImageUrl(formData: FormData): string {
  return (formData.get("uploadedImageUrl") as string)?.trim() ?? "";
}

/** Prefer browser upload URL, then pasted URL, then server-side file upload. */
export async function resolveImageUrl(
  formData: FormData,
  folder: string,
  fallback: string,
  urlFieldNames: string[] = ["imageUrl", "photo"]
): Promise<string> {
  const fromClient = getUploadedImageUrl(formData);
  if (fromClient) return fromClient;

  let pasted = "";
  for (const field of urlFieldNames) {
    const value = (formData.get(field) as string)?.trim();
    if (value) {
      pasted = value;
      break;
    }
  }

  const imageFile = getUploadedFile(formData);
  if (!imageFile) return pasted || fallback;

  const uploaded = await uploadImage(imageFile, folder);
  return uploaded ?? (pasted || fallback);
}

/** Upload an image file to Supabase Storage. Returns public URL or null. */
export async function uploadImage(
  file: File | null,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${user.id}/${folder}-${Date.now()}.${ext}`;
  const contentType = resolveImageMimeType(file) ?? "image/jpeg";

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file, { contentType, upsert: false });

  if (error) throw new Error(storageSetupErrorMessage(error.message));

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}
