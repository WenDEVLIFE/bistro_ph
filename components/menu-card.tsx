"use client";

import { CheckIcon } from "@solar-icons/react/bold-duotone/check";
import { useEffect, useRef, useState } from "react";

import { SafeImage } from "@/components/safe-image";
import { useCart } from "@/lib/cart";
import {
  MENU_CATEGORIES,
  formatPrice,
  type MenuItem,
} from "@/lib/menu-data";

const CATEGORY_LABELS = new Map(
  MENU_CATEGORIES.map((category) => [category.id, category.label]),
);

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleAdd() {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        imageAlt: item.imageAlt,
      },
      1,
    );
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream-100/60 transition-shadow hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-cream-200">
        <SafeImage
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-accent-dark shadow-sm">
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="heading-3">
            {item.name}
          </h3>
          <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
            {CATEGORY_LABELS.get(item.category) ?? item.category}
          </span>
        </div>
        <p className="mt-2 flex-1 body-text text-muted">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="price text-xl text-ink">
            {formatPrice(item.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-live="polite"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              added
                ? "bg-success text-cream"
                : "bg-accent text-cream hover:bg-accent-dark"
            }`}
          >
            {added ? (
              <>
                <CheckIcon
                  className="h-4 w-4"
                  secondaryColor="currentColor"
                  secondaryOpacity={1}
                />
                Added
              </>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
