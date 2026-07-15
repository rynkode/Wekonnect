"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut } from "@/app/actions/auth";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/events", label: "Events" },
  { href: "/creatives", label: "Creatives" },
  { href: "/collaborate", label: "Collaborate" },
];

interface NavbarClientProps {
  isLoggedIn: boolean;
  profileName?: string;
  userId?: string;
}

export function NavbarClient({ isLoggedIn, profileName, userId }: NavbarClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist/80 bg-stone/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm font-bold text-stone">
            WK
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            We<span className="text-clay">Konnect</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:gap-6 md:flex">
          <div className="flex items-center gap-4 lg:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 border-l border-mist pl-4 lg:gap-4 lg:pl-6">
            {isLoggedIn ? (
              <>
                {userId && (
                  <>
                    <Link
                      href={`/profile/${userId}`}
                      className="max-w-[10rem] truncate text-sm font-medium text-muted transition-colors hover:text-ink lg:max-w-[12rem]"
                      title={profileName}
                    >
                      {profileName ?? "Profile"}
                    </Link>
                    <Link
                      href="/profile/edit"
                      className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
                    >
                      Edit profile
                    </Link>
                  </>
                )}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
                  >
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="whitespace-nowrap text-sm font-medium text-clay transition-colors hover:text-clay-light"
                >
                  Join
                </Link>
              </>
            )}
            <Link
              href="/events/create"
              className="whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-stone transition-colors hover:bg-clay"
            >
              Create event
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="shrink-0 rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-mist bg-stone px-4 py-4 sm:px-6 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events/create"
              className="mt-2 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-stone"
              onClick={() => setOpen(false)}
            >
              Create event
            </Link>
            <div className="mt-3 border-t border-mist pt-3">
              {isLoggedIn ? (
                <>
                  {userId && (
                    <Link
                      href={`/profile/${userId}`}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/50"
                      onClick={() => setOpen(false)}
                    >
                      {profileName ?? "My profile"}
                    </Link>
                  )}
                  <Link
                    href="/profile/edit"
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-mist/50"
                    onClick={() => setOpen(false)}
                  >
                    Edit profile
                  </Link>
                  <form action={signOut} className="mt-1">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted hover:bg-mist/50"
                    >
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth/login"
                    className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-mist/50"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-full bg-clay px-4 py-2.5 text-center text-sm font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Join WeKonnect
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
