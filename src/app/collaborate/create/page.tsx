import Link from "next/link";
import { createCollaboration } from "@/app/actions/collaborations";
import { disciplines } from "@/lib/data";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata = {
  title: "Post a collaboration — Wapate",
  description: "Invite someone to create with you on Wapate.",
};

export default function CreateCollaborationPage() {
  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Create together
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          I&apos;m looking for…
        </h1>
        <p className="mt-3 text-muted">
          Invite a photographer, designer, musician, or fellow maker to collaborate —
          not to apply for a job.
        </p>

        <form action={createCollaboration} className="mt-10 space-y-6">
          <Field
            label="What are you looking for?"
            name="title"
            required
            placeholder="I need a photographer for a fashion project"
          />

          <div>
            <label htmlFor="discipline" className="block text-sm font-medium">
              Creative category
            </label>
            <select
              id="discipline"
              name="discipline"
              required
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            >
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Project description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="What are you making? What kind of creative partner feels right? Share the vibe — not a job description."
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>

          <Field
            label="Timeline"
            name="timeline"
            required
            placeholder="This month · Spring 2026 · Flexible"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" name="city" placeholder="Bergen (or leave blank)" />
            <Field label="Country" name="country" placeholder="Norway" />
          </div>
          <p className="!mt-2 text-xs text-muted">
            Leave city blank if you&apos;re open to collaborating anywhere in the world.
          </p>

          <SubmitButton label="Share invite" pendingLabel="Sharing…" />
        </form>

        <Link
          href="/collaborate"
          className="mt-8 inline-block text-sm text-clay hover:underline"
        >
          ← Back to collaborations
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
    </div>
  );
}
