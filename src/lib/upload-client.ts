import { createClient } from "@/lib/supabase/client";
import { resolveImageMimeType, storageSetupErrorMessage, validateImageFile } from "@/lib/image-file";

/** Upload from the browser directly to Supabase Storage (most reliable for file picks). */
export async function uploadImageFromBrowser(
  file: File,
  folder: string
): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be logged in to upload images");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${user.id}/${folder}-${Date.now()}.${ext}`;
  const contentType = resolveImageMimeType(file) ?? "image/jpeg";

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file, { contentType, upsert: false });

  if (error) {
    throw new Error(storageSetupErrorMessage(error.message));
  }

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}
