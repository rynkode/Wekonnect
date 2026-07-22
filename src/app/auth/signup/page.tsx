import Link from "next/link";
import { AuthForm, AuthSwitch } from "@/components/AuthForm";
import { AuthError } from "@/components/AuthError";

export const metadata = {
  title: "Join Wapate",
};

interface SignUpPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold">Join Wapate</h1>
      <p className="mt-2 text-muted">
        Create your creative profile and start discovering events worldwide.
      </p>
      <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
        <AuthError message={error} />
        <AuthForm mode="signup" />
        <AuthSwitch mode="signup" />
      </div>
      <p className="mt-6 text-center">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
