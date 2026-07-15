"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-ink py-3 text-sm font-medium text-stone transition-colors hover:bg-clay disabled:opacity-60 sm:w-auto sm:px-10"
    >
      {pending ? (pendingLabel ?? "Saving…") : label}
    </button>
  );
}
