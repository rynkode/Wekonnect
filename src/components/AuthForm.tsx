import Link from "next/link";
import { signIn, signUp } from "@/app/actions/auth";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? signIn : signUp;

  return (
    <form action={action} className="space-y-5">
      {mode === "signup" && (
        <Field label="Name" name="name" type="text" required placeholder="Your name" />
      )}
      <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
      <Field label="Password" name="password" type="password" required placeholder="••••••••" minLength={6} />

      <button
        type="submit"
        className="w-full rounded-full bg-ink py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
      >
        {mode === "login" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
  minLength,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
    </div>
  );
}

export function AuthSwitch({ mode }: { mode: "login" | "signup" }) {
  return (
    <p className="mt-6 text-center text-sm text-muted">
      {mode === "login" ? (
        <>
          New to Wapate?{" "}
          <Link href="/auth/signup" className="font-medium text-clay hover:underline">
            Create an account
          </Link>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-clay hover:underline">
            Sign in
          </Link>
        </>
      )}
    </p>
  );
}
