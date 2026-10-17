import type { Metadata } from "next";

import { MenuBrowser } from "@/components/menu-browser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the Bistro PH menu — meals, snacks, drinks, and desserts with prices in Philippine pesos. Filter by category and add dishes to your cart.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">
          Kitchen favorites
        </p>
        <h1 className="mt-2 heading-1">
          The menu
        </h1>
        <p className="mt-4 body-text text-muted">
          House dishes across meals, snacks, drinks, and desserts, all priced in
          Philippine pesos (PHP). Add anything to your cart to get started.
        </p>
      </header>

      <div className="mt-10">
        <MenuBrowser />
      </div>
    </div>
  );
}
