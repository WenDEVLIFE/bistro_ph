# Bistro PH — restaurant website portfolio demo

Bistro PH is a **fictional** Filipino restaurant website built as a freelance
portfolio demo. It shows a complete customer flow: browse the menu → build a
cart → check out → hand the order off through WhatsApp.

> **Portfolio demo — fictional restaurant.** This is not commissioned work for a
> real restaurant. The name, menu, prices, address, and opening hours are all
> sample content. There is **no database and no payment** anywhere in this
> project.

## What's inside

- **Homepage** (`/`) — hero with food photography, featured dishes, about
  section, sample opening hours and location.
- **Menu** (`/menu`) — 12 dishes with names, descriptions, and PHP prices,
  filterable by All / Meals / Snacks / Drinks / Desserts.
- **Cart** — a slide-over drawer available from the header, with quantity
  controls, live totals, and an empty state.
- **Checkout** (`/checkout`) — customer name, phone, pickup/delivery, delivery
  address, notes, inline validation, and an order summary.
- **Order handoff** — a `wa.me` link that opens WhatsApp with the order
  pre-filled, or a copy-to-clipboard fallback when no number is configured.

## Stack

- Next.js `16.4.2` (App Router) with `cacheComponents` + `partialPrefetching`
- React `19.3.0`
- TypeScript `5`
- Tailwind CSS `4` (CSS-first; theme tokens live in `app/globals.css`, there is
  **no** `tailwind.config.js`)
- `@solar-icons/react` `2.3.3` (Solar Icon Set, `BoldDuotone` style)

State is handled with React context + `useReducer`. UI icons use
`@solar-icons/react` (Solar Icon Set, `BoldDuotone`). No state, form, or database
library is installed.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The app works with **no environment variables**
set — it just runs in demo mode (see below).

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build                     |
| `npm run start` | Serve a production build             |
| `npm run lint`  | Run ESLint                           |

There is no `typecheck` script. Use `npx tsc --noEmit`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the value you need. Never commit
`.env.local`.

| Variable                                   | Required | Description                                                                                                       |
| ------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER`   | No       | Destination WhatsApp number for demo orders. **Full international format, digits only**, e.g. `639171234567`. Spaces, dashes, brackets and a leading `+` are stripped automatically; a **leading zero is rejected** (it is a national trunk prefix and guessing the country code would link to the wrong number). |

The variable is `NEXT_PUBLIC_`, so it is inlined at **build time**. Set it in your
hosting provider's dashboard (or in `.env.local` before building) if you want the
WhatsApp handoff enabled in that build.

### Demo mode (no number configured)

When `NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER` is unset **or fails validation**,
the checkout switches to demo mode:

- Nothing is sent anywhere.
- The user gets a working **"Copy order summary"** button.
- The confirmation state explains that no number is configured.

This path requires zero configuration and never fabricates a phone number.

## How ordering works

1. The cart is stored in the browser's `localStorage` (`bistro-ph.cart.v1`).
   Storage is read only after mount and wrapped in `try/catch`, so private
   browsing or a full quota degrades to in-memory state without a crash.
2. On checkout, the app builds a readable order summary and URL-encodes the
   whole message with `encodeURIComponent`.
3. It opens `https://wa.me/<number>?text=<encoded message>` in a new tab.
4. **The message is only drafted.** The user must press send in WhatsApp. The
   confirmation state says so explicitly — the restaurant has not received or
   accepted the order.
5. A browser-local order history (`bistro-ph.orders.v1`) powers a
   "Recent orders (this browser)" list. It is **browser-local only** and is never
   presented as server-side persistence or as proof of receipt.

No `app/api/` route exists and no order data leaves the browser except through
the user's own WhatsApp message.

## Images

Food photography is loaded from the [Unsplash](https://unsplash.com) CDN using
direct `images.unsplash.com/...` URLs (free to use under the
[Unsplash License](https://unsplash.com/license)). Remote hosts are allow-listed
in `next.config.ts` via `images.remotePatterns`.

Every image is rendered through `components/safe-image.tsx`, which falls back to
the bundled local asset `public/images/fallback-dish.svg` on error. That means
**no image ever renders broken**, and the site still looks correct fully offline.

Attributes to give credit when reusing these photos: photo IDs `photo-1504674900247-0877df9cc836`,
`photo-1414235077428-338989a2e8c0`, `photo-1544025162-d76694265947`,
`photo-1432139555190-58524dae6a55`, `photo-1476224203421-9ac39bcb3327`,
`photo-1513558161293-cdaf765ed2fd`, `photo-1551782450-a2132b4ba21d`,
`photo-1550547660-d9450f859349`, `photo-1466978913421-dad2ebd01d17`,
`photo-1497034825429-c343d7c6a68f`, `photo-1551024506-0bccd828d307`,
`photo-1565299507177-b0ac66763828`, `photo-1540189549336-e6e99c3679fe`.

## Icons

Interface icons come from the [Solar Icon Set](https://solar-icons.vercel.app) by
**480 Design**, used under the
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence. The site uses
the `BoldDuotone` style via the MIT-licensed
[`@solar-icons/react`](https://github.com/saoudi-h/solar-icons) React wrapper. A
single `.solar` rule in `app/globals.css` sets the duotone secondary colour from
the shared palette, and the primary layer keeps inheriting `currentColor`.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, cart provider, header/footer
  page.tsx              Homepage
  menu/page.tsx         Menu page
  checkout/page.tsx     Checkout page
  globals.css           Tailwind 4 theme tokens (no tailwind.config.js)
components/
  site-header.tsx       Navigation + cart button
  site-footer.tsx       Footer + disclosure
  hero-section.tsx      Homepage hero
  safe-image.tsx        next/image wrapper with a guaranteed local fallback
  menu-card.tsx         Dish card + add to cart
  menu-filters.tsx      Category filter buttons
  menu-browser.tsx      Filter state + menu grid
  cart-drawer.tsx       Slide-over cart
  order-summary.tsx     Shared order summary
  checkout-form.tsx     Checkout form, validation, WhatsApp handoff
lib/
  menu-data.ts          Typed menu data + PHP formatting (single source of truth)
  cart.ts               Cart context, reducer, totals, localStorage persistence
  validation.ts         Checkout field validation
  whatsapp.ts           Order summary builder + wa.me URL encoding + demo detection
  order-history.ts      Browser-local order history
public/images/          Local fallback asset
```

## Deploying to Vercel

1. Push this repository to GitHub (do not commit `.env.local`).
2. Import the project in Vercel. The framework preset is detected automatically;
   no build customization is required.
3. (Optional) Add `NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER` under **Project →
   Settings → Environment Variables** to enable the WhatsApp handoff. Leave it
   unset to deploy in demo mode.
4. Deploy.

No database, storage, or third-party service is required. The demo runs entirely
on the client plus Next.js image optimization.

## Out of scope

Admin dashboard, staff accounts, live order status, driver tracking, inventory,
loyalty, payments, multi-restaurant support, monitoring, and any server-side
order storage are intentionally out of scope for this demo.
