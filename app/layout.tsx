import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Bistro PH — Filipino comfort food in Davao City",
    template: "%s · Bistro PH",
  },
  description:
    "Bistro PH serves Filipino comfort food in Davao City — slow-braised adobo, citrusy inasal, and merienda classics. Browse the menu, build your order, and send it straight to WhatsApp.",
  applicationName: "Bistro PH",
  keywords: [
    "Filipino food",
    "Davao City restaurant",
    "adobo",
    "inasal",
    "merienda",
    "WhatsApp ordering",
  ],
  openGraph: {
    title: "Bistro PH — Filipino comfort food in Davao City",
    description:
      "Filipino comfort food in Davao City: rice bowls, sizzling plates, and merienda classics. Build your order and send it straight to WhatsApp.",
    type: "website",
    siteName: "Bistro PH",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
