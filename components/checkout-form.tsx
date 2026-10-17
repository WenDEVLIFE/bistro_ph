"use client";

import { CheckIcon } from "@solar-icons/react/bold-duotone/check";
import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/lib/cart";
import { saveOrder, type OrderRecord } from "@/lib/order-history";
import { formatPrice } from "@/lib/menu-data";
import {
  EMPTY_CHECKOUT,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutValues,
  type Fulfillment,
} from "@/lib/validation";
import {
  buildOrderSummary,
  buildWhatsAppUrl,
  getRestaurantWhatsAppNumber,
} from "@/lib/whatsapp";

type PlacedOrder = {
  record: OrderRecord;
  summary: string;
  whatsappUrl: string | null;
};

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "just now";
  return date.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function CheckoutForm() {
  const { items, subtotal, total, isHydrated, clearCart } = useCart();
  const [values, setValues] = useState<CheckoutValues>(EMPTY_CHECKOUT);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>([]);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const fieldId = useId();
  const whatsappNumber = useMemo(() => getRestaurantWhatsAppNumber(), []);
  const demoMode = whatsappNumber === null;

  const isDelivery = values.fulfillment === "delivery";

  function updateField<Key extends keyof CheckoutValues>(
    key: Key,
    value: CheckoutValues[Key],
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  async function copySummary(text: string) {
    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      success = false;
    }
    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }
    setCopyStatus(success ? "copied" : "error");
    window.setTimeout(() => setCopyStatus("idle"), 2200);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || placed) return;

    const { valid, errors: nextErrors } = validateCheckout(values);
    if (!valid) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      if (firstKey) {
        document.getElementById(`${fieldId}-${firstKey}`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const lines = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const draft = {
      items: lines,
      subtotal,
      total,
      customer: { name: values.name.trim(), phone: values.phone.trim() },
      fulfillment: values.fulfillment,
      address: isDelivery ? values.address.trim() : undefined,
      notes: values.notes.trim() || undefined,
    };

    const summary = buildOrderSummary(draft);
    const savedOrders = saveOrder(draft);
    const whatsappUrl = whatsappNumber
      ? buildWhatsAppUrl(whatsappNumber, summary)
      : null;

    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setRecentOrders(savedOrders);
    const record = savedOrders[0];
    setPlaced({ record, summary, whatsappUrl });
    clearCart();
    setIsSubmitting(false);
    setCopyStatus("idle");
  }

  function startNewOrder() {
    setPlaced(null);
    setValues(EMPTY_CHECKOUT);
    setErrors({});
    setCopyStatus("idle");
  }

  if (!isHydrated) {
    return (
      <div className="rounded-2xl border border-line bg-cream-100/60 px-6 py-16 text-center text-sm text-muted">
        Loading your order…
      </div>
    );
  }

  if (placed) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success text-cream">
              <CheckIcon
                className="h-4 w-4"
                secondaryColor="currentColor"
                secondaryOpacity={1}
              />
            </span>
            <div>
              <h2 className="heading-3 text-ink">
                {placed.whatsappUrl
                  ? "WhatsApp draft ready"
                  : "Order summary ready"}
              </h2>
              <p className="mt-2 body-text text-ink-soft">
                {placed.whatsappUrl ? (
                  <>
                    We opened WhatsApp with your order pre-filled.{" "}
                    <strong>
                      You must press send in WhatsApp for the restaurant to
                      receive it.
                    </strong>{" "}
                    Bistro PH has not received or accepted this order yet. No
                    payment was collected.
                  </>
                ) : (
                  <>
                    No <code>NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER</code> is
                    configured, so nothing was sent anywhere. Copy the summary
                    below and share it however you like — the restaurant has not
                    received this order.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copySummary(placed.summary)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
            >
              {copyStatus === "copied"
                ? "Copied!"
                : copyStatus === "error"
                  ? "Copy failed — select below"
                  : "Copy order summary"}
            </button>
            {placed.whatsappUrl ? (
              <a
                href={placed.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
              >
                Open WhatsApp again
              </a>
            ) : null}
            <button
              type="button"
              onClick={startNewOrder}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
            >
              Start a new order
            </button>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-accent-dark hover:underline"
            >
              Back to menu
            </Link>
          </div>

          <p
            aria-live="polite"
            className="sr-only"
            role="status"
          >
            {copyStatus === "copied" ? "Order summary copied to clipboard." : ""}
            {copyStatus === "error" ? "Copy failed." : ""}
          </p>
        </div>

        <OrderSummary
          items={placed.record.items.map((line, index) => ({
            id: `${index}-${line.name}`,
            name: line.name,
            price: line.price,
            quantity: line.quantity,
          }))}
          subtotal={placed.record.subtotal}
          total={placed.record.total}
          customer={placed.record.customer}
          fulfillment={placed.record.fulfillment}
          address={placed.record.address}
          notes={placed.record.notes}
          title="Order draft"
        />

        <section className="rounded-2xl border border-line bg-cream-100/70 p-5">
          <h3 className="heading-3">
            Order summary to send
          </h3>
          <p className="mt-1 text-xs text-muted">
            This is the exact text placed in your WhatsApp message draft.
          </p>
          <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-cream p-4 text-xs leading-relaxed text-ink-soft">
            {placed.summary}
          </pre>
        </section>

        <RecentOrders orders={recentOrders} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-cream-100/60 px-6 py-16 text-center">
        <p className="heading-3">
          Your cart is empty
        </p>
        <p className="mx-auto mt-2 max-w-sm body-text text-muted">
          Add a few dishes from the menu, then come back here to complete your
          WhatsApp order.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-5">
          <legend className="heading-3">
            Contact details
          </legend>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${fieldId}-name`} className="text-sm font-medium">
              Name <span className="text-accent">*</span>
            </label>
            <input
              id={`${fieldId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
              className={`rounded-xl border bg-cream px-4 py-3 outline-none transition-colors ${
                errors.name
                  ? "border-accent"
                  : "border-line focus:border-accent"
              }`}
            />
            {errors.name ? (
              <p
                id={`${fieldId}-name-error`}
                className="text-xs font-medium text-accent-dark"
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${fieldId}-phone`} className="text-sm font-medium">
              Phone <span className="text-accent">*</span>
            </label>
            <input
              id={`${fieldId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+63 917 000 0000"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? `${fieldId}-phone-error` : undefined
              }
              className={`rounded-xl border bg-cream px-4 py-3 outline-none transition-colors ${
                errors.phone
                  ? "border-accent"
                  : "border-line focus:border-accent"
              }`}
            />
            {errors.phone ? (
              <p
                id={`${fieldId}-phone-error`}
                className="text-xs font-medium text-accent-dark"
              >
                {errors.phone}
              </p>
            ) : null}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="heading-3">
            Pickup or delivery
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                { value: "pickup", label: "Pickup", hint: "Ready in ~25 min" },
                {
                  value: "delivery",
                  label: "Delivery",
                  hint: "Address required",
                },
              ] as const
            ).map((option) => {
              const active = values.fulfillment === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    active
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-cream hover:border-accent/60"
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <input
                      type="radio"
                      name="fulfillment"
                      value={option.value}
                      checked={active}
                      onChange={() =>
                        updateField(
                          "fulfillment",
                          option.value as Fulfillment,
                        )
                      }
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    {option.label}
                  </span>
                  <span className="pl-6 text-xs text-muted">{option.hint}</span>
                </label>
              );
            })}
          </div>

          {isDelivery ? (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`${fieldId}-address`}
                className="text-sm font-medium"
              >
                Delivery address <span className="text-accent">*</span>
              </label>
              <textarea
                id={`${fieldId}-address`}
                name="address"
                rows={3}
                autoComplete="street-address"
                value={values.address}
                onChange={(event) => updateField("address", event.target.value)}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? `${fieldId}-address-error` : undefined
                }
                className={`rounded-xl border bg-cream px-4 py-3 outline-none transition-colors ${
                  errors.address
                    ? "border-accent"
                    : "border-line focus:border-accent"
                }`}
              />
              {errors.address ? (
                <p
                  id={`${fieldId}-address-error`}
                  className="text-xs font-medium text-accent-dark"
                >
                  {errors.address}
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${fieldId}-notes`} className="text-sm font-medium">
            Order notes <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id={`${fieldId}-notes`}
            name="notes"
            rows={3}
            placeholder="Allergies, landmarks, or anything the kitchen should know."
            value={values.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? `${fieldId}-notes-error` : undefined}
            className={`rounded-xl border bg-cream px-4 py-3 outline-none transition-colors ${
              errors.notes ? "border-accent" : "border-line focus:border-accent"
            }`}
          />
          {errors.notes ? (
            <p
              id={`${fieldId}-notes-error`}
              className="text-xs font-medium text-accent-dark"
            >
              {errors.notes}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-line bg-cream-100/70 p-4 text-xs leading-relaxed text-muted">
          {demoMode ? (
            <>
              No WhatsApp number is configured in this build, so submitting will
              not send anything. You will get a copy-to-clipboard order summary
              instead.
            </>
          ) : (
            <>
              Submitting opens WhatsApp with your order drafted. You must press
              send there. No payment is collected and nothing is charged online.
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Preparing your order…"
            : demoMode
              ? "Create order summary"
              : "Send order via WhatsApp"}
        </button>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          total={total}
          customer={
            values.name || values.phone
              ? { name: values.name || "—", phone: values.phone || "—" }
              : undefined
          }
          fulfillment={values.fulfillment}
          address={isDelivery ? values.address || undefined : undefined}
          notes={values.notes || undefined}
        />
      </div>
    </div>
  );
}

function RecentOrders({ orders }: { orders: OrderRecord[] }) {
  if (orders.length === 0) return null;

  return (
    <section className="rounded-2xl border border-line bg-cream-100/70 p-5">
      <h3 className="heading-3">
        Recent orders (this browser)
      </h3>
      <p className="mt-1 text-xs text-muted">
        Stored only in this browser&apos;s local storage for your convenience.
        This is not server-side data and does not prove the restaurant received
        any order.
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {orders.slice(0, 3).map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-line bg-cream px-4 py-3 text-sm"
          >
            <div className="min-w-0">
              <p className="font-semibold">{order.id}</p>
              <p className="truncate text-xs text-muted">
                {formatTimestamp(order.createdAt)} ·{" "}
                {order.items.reduce((sum, line) => sum + line.quantity, 0)} items
                · {order.fulfillment === "delivery" ? "Delivery" : "Pickup"}
              </p>
            </div>
            <span className="price shrink-0">
              {formatPrice(order.total)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
