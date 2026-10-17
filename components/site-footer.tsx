import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-cream-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="heading-3">Bistro PH</p>
          <p className="mt-3 max-w-sm body-text text-muted">
            A small Filipino kitchen in Davao City serving rice bowls, sizzling
            plates, and merienda favorites.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="caption-label text-muted">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <Link href="/" className="text-ink-soft hover:text-accent-dark">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-ink-soft hover:text-accent-dark">
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="text-ink-soft hover:text-accent-dark"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="caption-label text-muted">
            Visit
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-ink-soft">
            <li>
              Poblacion District
              <br />
              Davao City, 8000 Philippines
            </li>
            <li>Mon–Sun · 10:00 AM – 9:00 PM</li>
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

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© Bistro PH. All rights reserved.</p>
          <p>
            No payment is collected online. Orders are completed over WhatsApp —
            a message is only drafted for you to send.
          </p>
        </div>
      </div>
    </footer>
  );
}
