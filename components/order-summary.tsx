import { formatPrice } from "@/lib/menu-data";
import type { Fulfillment } from "@/lib/validation";

export type OrderSummaryLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export function OrderSummary({
  items,
  subtotal,
  total,
  customer,
  fulfillment,
  address,
  notes,
  title = "Order summary",
}: {
  items: OrderSummaryLine[];
  subtotal: number;
  total: number;
  customer?: { name: string; phone: string };
  fulfillment?: Fulfillment;
  address?: string;
  notes?: string;
  title?: string;
}) {
  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-line bg-cream-100/70 p-5"
    >
      <h2 className="heading-3">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-3 body-text text-muted">
          No items yet. Add dishes from the menu to see them here.
        </p>
      ) : (
        <>
          <ul className="mt-4 flex flex-col divide-y divide-line">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 py-2.5 text-sm"
              >
                <span className="text-ink-soft">
                  {item.name}
                  <span className="ml-1.5 text-muted">× {item.quantity}</span>
                </span>
                <span className="price shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4 text-sm">
            <div className="flex items-center justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="price">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-ink">
              <dt>Total</dt>
              <dd className="price">{formatPrice(total)}</dd>
            </div>
          </dl>
        </>
      )}

      {customer || fulfillment ? (
        <dl className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4 text-sm">
          {customer ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Name</dt>
                <dd className="text-right font-medium">{customer.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Phone</dt>
                <dd className="text-right font-medium tabular-nums">
                  {customer.phone}
                </dd>
              </div>
            </>
          ) : null}
          {fulfillment ? (
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Fulfillment</dt>
              <dd className="text-right font-medium">
                {fulfillment === "delivery" ? "Delivery" : "Pickup"}
              </dd>
            </div>
          ) : null}
          {fulfillment === "delivery" && address ? (
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted">Delivery address</dt>
              <dd className="font-medium">{address}</dd>
            </div>
          ) : null}
          {notes ? (
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted">Notes</dt>
              <dd className="font-medium">{notes}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </section>
  );
}
