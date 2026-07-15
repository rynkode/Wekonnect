"use client";

import Image from "next/image";
import { useState } from "react";
import { uploadImageFromBrowser } from "@/lib/upload-client";

interface ImageUploadProps {
  label: string;
  folder?: string;
  hint?: string;
  currentImageUrl?: string;
  /** Hidden form field name for the uploaded public URL */
  hiddenFieldName?: string;
}

export function ImageUpload({
  label,
  folder = "upload",
  hint = "JPEG, PNG, WebP or GIF — max 5 MB",
  currentImageUrl,
  hiddenFieldName = "uploadedImageUrl",
}: ImageUploadProps) {
  const [preview, setPreview] = useState(currentImageUrl ?? "");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setStatus("uploading");
    setPreview(URL.createObjectURL(file));

    try {
      const url = await uploadImageFromBrowser(file, folder);
      setUploadedUrl(url);
      setPreview(url);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setUploadedUrl("");
      setPreview(currentImageUrl ?? "");
      setError(err instanceof Error ? err.message : "Upload failed");
      event.target.value = "";
    }
  }

  return (
    <div>
      <label htmlFor={`file-${folder}`} className="block text-sm font-medium">
        {label}
      </label>

      {preview && (
        <div className="relative mt-2 aspect-[16/10] w-full max-w-xs overflow-hidden rounded-xl border border-mist">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={preview.startsWith("blob:")}
          />
        </div>
      )}

      <input type="hidden" name={hiddenFieldName} value={uploadedUrl} />

      <input
        id={`file-${folder}`}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
        onChange={handleChange}
        className="mt-2 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-clay/10 file:px-4 file:py-1 file:text-sm file:font-medium file:text-clay"
      />

      {status === "uploading" && (
        <p className="mt-1 text-xs text-clay">Uploading image…</p>
      )}
      {status === "done" && (
        <p className="mt-1 text-xs text-green-700">Image uploaded — click Save to apply.</p>
      )}
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
      {!error && status === "idle" && (
        <p className="mt-1 text-xs text-muted">
          {currentImageUrl
            ? "Choose a new file to replace the current image."
            : hint}
        </p>
      )}
    </div>
  );
}
