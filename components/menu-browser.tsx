"use client";

import { useMemo, useState } from "react";

import { MenuCard } from "@/components/menu-card";
import { MenuFilters } from "@/components/menu-filters";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuFilter,
} from "@/lib/menu-data";

export function MenuBrowser() {
  const [filter, setFilter] = useState<MenuFilter>("all");

  const counts = useMemo(() => {
    const result = {} as Record<MenuFilter, number>;
    for (const category of MENU_CATEGORIES) {
      result[category.id] =
        category.id === "all"
          ? MENU_ITEMS.length
          : MENU_ITEMS.filter((item) => item.category === category.id).length;
    }
    return result;
  }, []);

  const items = useMemo(
    () =>
      filter === "all"
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === filter);

  return (
    <div className="flex flex-col gap-8">
      <MenuFilters active={filter} onChange={setFilter} counts={counts} />

      <p className="body-text text-muted" aria-live="polite">
        Showing <span className="font-semibold text-ink">{items.length}</span>{" "}
        {items.length === 1 ? "dish" : "dishes"}
        {activeCategory ? ` · ${activeCategory.blurb}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-cream-100/60 px-6 py-16 text-center">
          <p className="heading-3">
            Nothing in this category yet
          </p>
          <p className="mt-2 body-text text-muted">
            Try another filter or view the full menu.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
          >
            Show all dishes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
