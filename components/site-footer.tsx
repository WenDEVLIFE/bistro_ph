import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/40 bg-cream-100/50 bg-clip-padding shadow-[0_-1px_0_0_rgba(255,255,255,0.5)_inset] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold">Bistro Lokal</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A small Filipino kitchen serving rice bowls, sizzling plates, and
            merienda favorites.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <Link
                href="/"
                className="rounded-md px-1 text-ink-soft transition-colors hover:bg-white/40 hover:text-accent-dark"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="rounded-md px-1 text-ink-soft transition-colors hover:bg-white/40 hover:text-accent-dark"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="rounded-md px-1 text-ink-soft transition-colors hover:bg-white/40 hover:text-accent-dark"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Visit (sample)
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-ink-soft">
            <li>
              12 Kalayaan Street
              <br />
              Barangay Malaya, Quezon City
            </li>
            <li>Mon–Sun · 10:00 AM – 9:00 PM</li>
            <li className="text-xs text-muted">
              Address and hours are fictional demo content.
            </li>
            <li>
              <Link
                href="/checkout"
                className="font-medium text-accent-dark hover:underline"
              >
                Order via WhatsApp draft
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/30 bg-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© Bistro-PH</p>
          <p>
            No payment is collected. Orders are not stored on a server; a
            WhatsApp message is only drafted for you to send.
          </p>
        </div>
      </div>
    </footer>
  );
}