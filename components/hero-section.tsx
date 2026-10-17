import { ArrowRightIcon } from "@solar-icons/react/bold-duotone/arrow-right";
import Link from "next/link";

import { SafeImage } from "@/components/safe-image";
import { SITE_IMAGES } from "@/lib/menu-data";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src={SITE_IMAGES.hero.src}
          alt={SITE_IMAGES.hero.alt}
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cream/90 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Now serving · Davao City
          </p>
          <h1 className="mt-5 heading-1 text-cream">
            Filipino comfort food, ordered in a minute.
          </h1>
          <p className="mt-5 max-w-xl lead-text text-cream/85">
            Rice bowls, sizzling plates, and merienda classics from a
            neighborhood kitchen. Build your order, then send it straight to
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-accent-dark"
            >
              Order Now
              <ArrowRightIcon
                className="h-4 w-4"
                secondaryColor="var(--cream)"
                secondaryOpacity={1}
              />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-cream/40 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              View the menu
            </Link>
          </div>
          <p className="mt-6 text-xs text-cream/70">
            Orders are only drafted in WhatsApp — press send there to confirm.
            No payment is collected online.
          </p>
        </div>
      </div>
    </section>
  );
}
