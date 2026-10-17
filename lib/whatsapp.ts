import { formatPrice } from "@/lib/menu-data";
import type { Fulfillment } from "@/lib/validation";

export const WHATSAPP_ENV_VAR = "NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER";

export type OrderLine = {
  name: string;
  quantity: number;
  /** Price per unit in PHP. */
  price: number;
};

export type OrderDraft = {
  items: OrderLine[];
  subtotal: number;
  total: number;
  customer: { name: string; phone: string };
  fulfillment: Fulfillment;
  address?: string;
  notes?: string;
};

/**
 * Reads the destination WhatsApp number from the environment and normalizes it
 * into the shape WhatsApp's click-to-chat links require.
 *
 * Official format: the full number in international format, digits only - no
 * `+`, spaces, dashes, brackets, or leading zeroes (WhatsApp Help Center,
 * "How to use click to chat").
 *
 * Human formatting that is unambiguously safe to strip (`+`, spaces, dashes,
 * brackets, dots) is normalized away, because that is the most likely way a
 * real number gets pasted from a business card or chat. Anything else that
 * cannot be normalized returns `null`, which puts the app into
 * copy-to-clipboard demo mode rather than producing a dead `wa.me` link.
 */
export function getRestaurantWhatsAppNumber(
  raw: string | undefined = process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER,
): string | null {
  if (typeof raw !== "string") return null;
  const normalized = raw.replace(/[\s()\-.]/g, "").replace(/^\+/, "");
  if (!/^\d{8,15}$/.test(normalized)) return null;
  // A leading zero is a national trunk prefix. Click-to-chat requires it
  // stripped, but guessing the country code would be unsafe - so fail into
  // demo mode instead of silently linking to the wrong number.
  if (normalized.startsWith("0")) return null;
  return normalized;
}

export function isDemoMode(): boolean {
  return getRestaurantWhatsAppNumber() === null;
}

export function buildOrderSummary(draft: OrderDraft): string {
  const lines: string[] = [];
  lines.push("Bistro PH — draft order");
  lines.push("");
  lines.push("Items");
  for (const item of draft.items) {
    const lineTotal = Math.max(0, item.price) * Math.max(0, item.quantity);
    lines.push(
      `- ${item.quantity} × ${item.name} — ${formatPrice(lineTotal)}`,
    );
  }
  lines.push("");
  lines.push(`Subtotal: ${formatPrice(draft.subtotal)}`);
  lines.push(`Total: ${formatPrice(draft.total)}`);
  lines.push("");
  lines.push(`Name: ${draft.customer.name}`);
  lines.push(`Phone: ${draft.customer.phone}`);
  lines.push(
    `Fulfillment: ${draft.fulfillment === "delivery" ? "Delivery" : "Pickup"}`,
  );
  if (draft.fulfillment === "delivery" && draft.address) {
    lines.push(`Delivery address: ${draft.address}`);
  }
  if (draft.notes) {
    lines.push(`Notes: ${draft.notes}`);
  }
  lines.push("");
  lines.push(
    "The order is not submitted until you press send in WhatsApp.",
  );
  return lines.join("\n");
}

/**
 * Builds a `wa.me` deep link. The whole message is URL-encoded so user input
 * can never break out of the `text` parameter.
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
