import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";
import { AuthError } from "@/components/AuthError";

export const metadata = {
  title: "Forgot password — Wapate",
};

interface ForgotPasswordPageProps {
  searchParams: Promise<{ error?: string; sent?: string }>;
}

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const { error, sent } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold">Forgot password?</h1>
      <p className="mt-2 text-muted">
        Enter the email for your account. We&apos;ll send a link to set a new
        password.
      </p>

      <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
        <AuthError message={error} />

        {sent ? (
          <div className="space-y-4 text-sm text-muted">
            <p className="font-medium text-ink">Check your email</p>
            <p>
              If that address has a Wapate account, you&apos;ll get a reset link
              shortly. Open it on this device, then choose a new password.
            </p>
            <p>
              Don&apos;t see it? Check spam, or try another email you may have
              used to sign up.
            </p>
            <Link
              href="/auth/login"
              className="inline-block font-medium text-clay hover:underline"
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <form action={requestPasswordReset} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-ink py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
            >
              Send reset link
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center">
        <Link href="/auth/login" className="text-sm text-muted hover:text-ink">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}
