import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your Bistro PH order, choose pickup or delivery, and hand off the order through a WhatsApp draft. No payment is collected.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">
          Almost there
        </p>
        <h1 className="mt-2 heading-1">
          Checkout
        </h1>
        <p className="mt-4 body-text text-muted">
          Tell us who the order is for, then we&apos;ll prepare a WhatsApp
          message. No card details are collected, and the order is not sent to
          the restaurant until you press send in WhatsApp.
        </p>
      </header>

      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
