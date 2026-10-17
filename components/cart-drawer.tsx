"use client";

import { CartLargeIcon } from "@solar-icons/react/bold-duotone/cart-large";
import { CloseIcon } from "@solar-icons/react/bold-duotone/close";
import Link from "next/link";
import { useEffect } from "react";

import { SafeImage } from "@/components/safe-image";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu-data";

function QuantityStepper({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (next: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center rounded-full border border-line bg-cream">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={`Decrease quantity of ${label}`}
        className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
      >
        <span aria-hidden="true">−</span>
      </button>
      <span
        aria-live="polite"
        className="w-8 text-center price text-sm"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label={`Increase quantity of ${label}`}
        className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    total,
    isHydrated,
    isOpen,
    closeCart,
    removeItem,
    setQuantity,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="relative flex h-full w-full max-w-md flex-col border-l border-line bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="heading-3">Your cart</h2>
            <p className="text-sm text-muted">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!isHydrated ? (
            <p className="py-12 text-center text-sm text-muted">
              Loading your cart…
            </p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-accent">
                <CartLargeIcon className="h-7 w-7" />
              </span>
              <div>
                <p className="font-medium text-ink">Your cart is empty</p>
                <p className="mt-1 text-sm text-muted">
                  Add a few dishes from the menu to build an order.
                </p>
              </div>
              <Link
                href="/menu"
                onClick={closeCart}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
              >
                Browse the menu
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                    <SafeImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug">
                        {item.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-xs font-medium text-muted underline-offset-2 hover:text-accent-dark hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatPrice(item.price)} each
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        quantity={item.quantity}
                        label={item.name}
                        onChange={(next) => setQuantity(item.id, next)}
                      />
                      <span className="price text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isHydrated && items.length > 0 ? (
          <div className="border-t border-line px-5 py-4">
            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between text-muted">
                <dt>Subtotal</dt>
                <dd className="price">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-ink">
                <dt>Total</dt>
                <dd className="price">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
            >
              Continue to checkout
            </Link>
            <p className="mt-2 text-center text-xs text-muted">
              No payment is collected online — settle up at the restaurant.
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
