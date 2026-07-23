import Link from "next/link";
import { redirect } from "next/navigation";
import { updatePassword } from "@/app/actions/auth";
import { AuthError } from "@/components/AuthError";
import { getAuthUser } from "@/lib/queries/creatives";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = {
  title: "Set new password — Wapate",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  if (!isSupabaseConfigured()) redirect("/setup");

  const user = await getAuthUser();
  if (!user) {
    redirect(
      "/auth/login?error=" +
        encodeURIComponent("Open the reset link from your email first.")
    );
  }

  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold">Set a new password</h1>
      <p className="mt-2 text-muted">
        Choose a new password for {user.email ?? "your account"}.
      </p>

      <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
        <AuthError message={error} />
        <form action={updatePassword} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ink py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
          >
            Save password & continue
          </button>
        </form>
      </div>

      <p className="mt-6 text-center">
        <Link href="/auth/login" className="text-sm text-muted hover:text-ink">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}
