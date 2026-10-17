import Link from "next/link";

import { HeroSection } from "@/components/hero-section";
import { MenuCard } from "@/components/menu-card";
import { SafeImage } from "@/components/safe-image";
import { SITE_IMAGES, getFeaturedItems } from "@/lib/menu-data";

const ORDER_STEPS = [
  {
    title: "Browse the menu",
    body: "Filter by meals, snacks, drinks, or desserts and add what you like to the cart.",
  },
  {
    title: "Review your cart",
    body: "Adjust quantities and check the running total before you continue.",
  },
  {
    title: "Send on WhatsApp",
    body: "Your order opens as a WhatsApp draft. Press send there to hand it off.",
  },
] as const;

export default function HomePage() {
  const featured = getFeaturedItems();

  return (
    <>
      <HeroSection />

      <section
        aria-labelledby="featured-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
              From the kitchen
            </p>
            <h2
              id="featured-heading"
              className="mt-2 font-display text-3xl font-semibold sm:text-4xl"
            >
              Featured dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark hover:underline"
          >
            See the full menu
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Menu items and prices are sample demo content in Philippine pesos
          (PHP).
        </p>
      </section>

      <section
        aria-labelledby="about-heading"
        className="border-y border-line bg-cream-100"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-cream-200">
            <SafeImage
              src={SITE_IMAGES.about.src}
              alt={SITE_IMAGES.about.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
              Our little kitchen
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-semibold sm:text-4xl"
            >
              Comfort food, cooked the way home tastes
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Bistro Lokal is a neighborhood kitchen built around familiar
              Filipino flavors: slow-braised adobo, citrusy inasal, and
              merienda classics worth lingering over. We keep the menu short,
              cook in small batches, and plate everything to share.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              This story is fictional. The restaurant, its address, and its
              hours exist only for this portfolio demo.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="how-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20"
      >
        <h2
          id="how-heading"
          className="font-display text-3xl font-semibold sm:text-4xl"
        >
          Ordering takes three steps
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {ORDER_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-cream-100/60 p-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-bold text-cream">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="visit"
        aria-labelledby="visit-heading"
        className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6"
      >
        <div className="grid gap-6 rounded-2xl border border-line bg-ink px-6 py-10 text-cream sm:px-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2
              id="visit-heading"
              className="font-display text-2xl font-semibold sm:text-3xl"
            >
              Visit us
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80">
              Dine in or pick up at our  corner spot. Everything
              below is sample content for the demo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
              >
                Order Now
              </Link>
              <Link
                href="/checkout"
                className="rounded-full border border-cream/30 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Go to checkout
              </Link>
            </div>
          </div>
          <dl className="flex flex-col gap-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/60">
                Address (sample)
              </dt>
              <dd className="mt-1 text-cream/90">
                12 Kalayaan Street
                <br />
                Barangay Malaya, Quezon City
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/60">
                Opening hours (sample)
              </dt>
              <dd className="mt-1 text-cream/90">
                Mon–Sun · 10:00 AM – 9:00 PM
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/60">
                Orders
              </dt>
              <dd className="mt-1 text-cream/90">
                WhatsApp draft only — no online payment.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
