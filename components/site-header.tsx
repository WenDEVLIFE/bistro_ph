"use client";

import { CartLargeIcon } from "@solar-icons/react/bold-duotone/cart-large";
import { CloseIcon } from "@solar-icons/react/bold-duotone/close";
import { HamburgerMenuIcon } from "@solar-icons/react/bold-duotone/hamburger-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/checkout", label: "Checkout" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center rounded-md py-1"
          onClick={() => setMenuOpen(false)}
          aria-label="Bistro PH home"
        >
          <Image
            src="/images/logo-wordmark.png"
            alt="Bistro PH"
            width={733}
            height={200}
            preload
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent-soft text-accent-dark"
                    : "text-ink-soft hover:bg-cream-100 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border border-line bg-cream-100 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-dark"
            aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          >
            <CartLargeIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-semibold ${
                itemCount > 0
                  ? "bg-accent text-cream"
                  : "bg-cream-200 text-muted"
              }`}
            >
              {itemCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream-100 text-ink md:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <HamburgerMenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-cream px-4 pb-4 md:hidden"
        >
          <ul className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      active
                        ? "bg-accent-soft text-accent-dark"
                        : "text-ink-soft hover:bg-cream-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
