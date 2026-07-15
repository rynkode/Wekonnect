import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-mist bg-stone">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm font-bold text-stone">
                WK
              </span>
              <span className="text-lg font-semibold">WeKonnect</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted">
              A global creative network. Discover people, events, and communities —
              built for creatives everywhere.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li><Link href="/events" className="hover:text-ink">Events</Link></li>
                <li><Link href="/creatives" className="hover:text-ink">Creatives</Link></li>
                <li><Link href="/explore" className="hover:text-ink">Cities</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">WeKonnect</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li><Link href="/collaborate" className="hover:text-ink">Collaborate</Link></li>
                <li><Link href="/events/create" className="hover:text-ink">Create event</Link></li>
                <li><span className="text-mist">About (soon)</span></li>
                <li><Link href="/auth/signup" className="hover:text-ink">Join</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-mist pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} WeKonnect · Making the world more connected through creativity
        </p>
      </div>
    </footer>
  );
}
