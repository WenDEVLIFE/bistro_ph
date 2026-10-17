"use client";

import {
  MENU_CATEGORIES,
  type MenuFilter,
} from "@/lib/menu-data";

export function MenuFilters({
  active,
  onChange,
  counts,
}: {
  active: MenuFilter;
  onChange: (next: MenuFilter) => void;
  counts: Record<MenuFilter, number>;
}) {
  return (
    <div
      role="group"
      aria-label="Filter menu by category"
      className="flex flex-wrap gap-2"
    >
      {MENU_CATEGORIES.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-accent bg-accent text-cream"
                : "border-line bg-cream-100 text-ink-soft hover:border-accent hover:text-accent-dark"
            }`}
          >
            {category.label}
            <span
              className={`rounded-full px-1.5 text-xs tabular-nums ${
                isActive ? "bg-cream/25 text-cream" : "bg-cream-200 text-muted"
              }`}
            >
              {counts[category.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
