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
    <header className="sticky top-0 z-40 border-b border-white/40 bg-cream/40 bg-clip-padding shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-cream/30">
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
                    ? "bg-accent-soft/80 text-accent-dark backdrop-blur-sm"
                    : "text-ink-soft hover:bg-white/40 hover:text-ink"
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
            className="relative flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-3.5 py-2 text-sm font-semibold text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-white/60 hover:text-accent-dark"
            aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          >
            <CartLargeIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-semibold ${
                itemCount > 0
                  ? "bg-accent text-cream"
                  : "bg-cream-200/80 text-muted"
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
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/40 text-ink backdrop-blur-sm md:hidden"
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
          className="border-t border-white/30 bg-cream/60 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 pt-3 pb-4">
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
                        ? "bg-accent-soft/80 text-accent-dark"
                        : "text-ink-soft hover:bg-white/50"
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