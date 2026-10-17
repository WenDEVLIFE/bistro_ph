import type { Fulfillment } from "@/lib/validation";
import type { OrderLine } from "@/lib/whatsapp";

export const ORDER_HISTORY_KEY = "bistro-ph.orders.v1";
const MAX_ORDERS = 10;

export type OrderRecord = {
  id: string;
  createdAt: string;
  items: OrderLine[];
  subtotal: number;
  total: number;
  customer: { name: string; phone: string };
  fulfillment: Fulfillment;
  address?: string;
  notes?: string;
};

function isOrderRecord(value: unknown): value is OrderRecord {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    Array.isArray(candidate.items) &&
    typeof candidate.subtotal === "number" &&
    typeof candidate.total === "number"
  );
}

/**
 * Reads the browser-local order history. Guarded against private browsing and
 * corrupted payloads; always returns an array.
 */
export function loadOrders(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDER_HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isOrderRecord);
  } catch {
    return [];
  }
}

/** Persists an order to the browser-local history and returns the new list. */
export function saveOrder(
  order: Omit<OrderRecord, "id" | "createdAt">,
): OrderRecord[] {
  const record: OrderRecord = {
    ...order,
    id: createOrderId(),
    createdAt: new Date().toISOString(),
  };
  const next = [record, ...loadOrders()].slice(0, MAX_ORDERS);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures — the confirmation state still works in memory.
    }
  }
  return next;
}

function createOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BL-${Date.now().toString(36).toUpperCase()}-${random}`;
}
