import { ArrowRightIcon } from "@solar-icons/react/bold-duotone/arrow-right";
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
            <p className="eyebrow">
              From the kitchen
            </p>
            <h2
              id="featured-heading"
              className="mt-2 heading-2"
            >
              Featured dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark hover:underline"
          >
            See the full menu
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Prices are in Philippine pesos (PHP).
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
            <p className="eyebrow">
              Our little kitchen
            </p>
            <h2
              id="about-heading"
              className="mt-2 heading-2"
            >
              Comfort food, cooked the way home tastes
            </h2>
            <p className="mt-5 body-text text-muted">
              Bistro PH is a neighborhood kitchen built around familiar
              Filipino flavors: slow-braised adobo, citrusy inasal, and
              merienda classics worth lingering over. We keep the menu short,
              cook in small batches, and plate everything to share.
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
          className="heading-2"
        >
          Ordering takes three steps
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {ORDER_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-cream-100/60 p-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-cream">
                {index + 1}
              </span>
              <h3 className="mt-4 heading-3">
                {step.title}
              </h3>
              <p className="mt-2 body-text text-muted">
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
              className="heading-2"
            >
              Visit us
            </h2>
            <p className="mt-4 max-w-xl body-text text-cream/80">
              Dine in or pick up at our spot in Davao City. Come by for lunch,
              or send your order ahead on WhatsApp.
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
          <dl className="flex flex-col gap-4">
            <div>
              <dt className="caption-label text-cream/60">
                Address
              </dt>
              <dd className="mt-1 text-cream/90">
                Poblacion District
                <br />
                Davao City, 8000 Philippines
              </dd>
            </div>
            <div>
              <dt className="caption-label text-cream/60">
                Opening hours
              </dt>
              <dd className="mt-1 text-cream/90">
                Mon–Sun · 10:00 AM – 9:00 PM
              </dd>
            </div>
            <div>
              <dt className="caption-label text-cream/60">
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
