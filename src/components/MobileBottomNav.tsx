"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Compass, Users, UsersRound, User } from "lucide-react";

const tabs = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/communities", label: "Tribes", icon: UsersRound },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/creatives", label: "Creatives", icon: Users },
];

interface MobileBottomNavProps {
  isLoggedIn: boolean;
  userId?: string;
}

export function MobileBottomNav({ isLoggedIn, userId }: MobileBottomNavProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/explore") {
      return pathname === "/" || pathname.startsWith("/explore") || pathname.startsWith("/cities");
    }
    return pathname.startsWith(href);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-mist bg-stone/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium ${
                  active ? "text-clay" : "text-muted"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-clay" : "text-muted"}`} />
                {tab.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <Link
            href={isLoggedIn && userId ? `/profile/${userId}` : "/auth/login"}
            className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium ${
              pathname.startsWith("/profile") || pathname.startsWith("/auth")
                ? "text-clay"
                : "text-muted"
            }`}
          >
            <User
              className={`h-5 w-5 ${
                pathname.startsWith("/profile") || pathname.startsWith("/auth")
                  ? "text-clay"
                  : "text-muted"
              }`}
            />
            {isLoggedIn ? "You" : "Join"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
