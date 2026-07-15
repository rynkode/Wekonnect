import Link from "next/link";
import { createCollaboration } from "@/app/actions/collaborations";
import { disciplines } from "@/lib/data";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata = {
  title: "Post collaboration — WeKonnect",
};

export default function CreateCollaborationPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Post a collaboration request</h1>
      <p className="mt-2 text-muted">
        Looking for a photographer, designer, or musician? Tell the community what you need.
      </p>

      <form action={createCollaboration} className="mt-10 space-y-6">
        <Field
          label="Title"
          name="title"
          required
          placeholder="Need a photographer for fashion project"
        />

        <div>
          <label htmlFor="discipline" className="block text-sm font-medium">
            Discipline needed
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
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Describe your project, timeline, and what kind of collaborator you're looking for…"
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City (optional)" name="city" placeholder="Bergen" />
          <Field label="Country (optional)" name="country" placeholder="Norway" />
        </div>

        <SubmitButton label="Post request" pendingLabel="Posting…" />
      </form>

      <Link href="/collaborate" className="mt-6 inline-block text-sm text-clay hover:underline">
        ← Back to collaborate
      </Link>
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
