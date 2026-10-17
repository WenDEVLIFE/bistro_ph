---
name: bistro-ph-demo
description: Bistro PH restaurant portfolio demo — activate when building or changing the customer flow (homepage, menu, cart, checkout, order handoff) in this repo.
---

# Bistro PH — Restaurant Website Portfolio Demo

## Project Overview

Build and deploy a polished, responsive restaurant website with online ordering as a fictional portfolio demo. The goal is to give a potential client a live URL to explore today.

- **Working name:** Bistro PH (fictional brand; easy to rename)
- **Primary goal:** Demonstrate a complete customer flow from browsing a menu to submitting an order.
- **Audience:** Potential restaurant client reviewing a freelancer's work.
- **Important disclosure:** This is a self-initiated demo, not a commissioned project for a real restaurant.
- **Priority:** A reliable, visually polished, mobile-friendly demo over a large feature set.

## Instructions for the Coding Agent

1. Inspect the existing repository and identify its framework, package manager, conventions, and current state before changing files.
2. Reuse the existing stack and components where practical. If this is already a Next.js + TypeScript + Tailwind project, continue with it rather than recreating the project.
3. Implement the working MVP end to end. Do not stop at a mockup or static landing page.
4. Run the available lint, type-check, and build commands. Fix issues caused by the implementation.
5. Do not claim deployment has succeeded unless it has actually been performed and verified.
6. Keep the implementation straightforward enough to finish quickly. Avoid unnecessary dependencies and overengineering.
7. If a requirement needs credentials or an external service that is not configured, implement a clearly documented safe fallback and explain the setup needed.

## Recommended Stack

Use the repo's existing stack — Next.js App Router + TypeScript + Tailwind 4 (see [`PROJECT.MD`](PROJECT.MD)). Do not recreate the project.

- Next.js with TypeScript
- Tailwind CSS
- Lucide React for icons, if already installed or easy to add
- React state/context for the cart (no state library needed)
- Vercel for hosting

### No Database (LOCKED)

**There is no database. No Supabase, no Prisma, no server-side order persistence, no `app/api/orders` route, no external service.** Order submission is a WhatsApp handoff plus a browser-local order history. Do not install a database client and do not add any API route for orders.

Configure the restaurant number via an environment variable and document the required international format. **Never invent a real business number.**

## Scope and Acceptance Criteria

### 1. Homepage

- Clear restaurant name/logo treatment and navigation.
- Strong hero section with food photography, concise headline, and primary "Order Now" CTA.
- Featured dishes or bestsellers.
- Short restaurant/about section.
- Opening hours and location details (Davao City — district level only, no invented street or house number).
- Footer with navigation and contact details.
- Consistent typography, spacing, color palette, hover/focus states, and responsive layout.

### 2. Menu

- Menu page or clearly separated menu section.
- At least 8–12 believable sample dishes with names, descriptions, prices in PHP, categories, and image assets.
- Category filtering (for example: All, Meals, Snacks, Drinks, Desserts).
- Add-to-cart action on each item.
- Empty, loading, and image-failure states where relevant.
- Label prices clearly in Philippine pesos (PHP).

### 3. Shopping Cart

- Cart accessible from the header, with item count.
- Add items, remove items, increase/decrease quantity.
- Correctly calculate subtotal and total.
- Handle empty cart with a helpful message and a link/button back to the menu.
- **Persist the cart in `localStorage` — required, not optional.** Read storage only after mount so the server render and first client render agree (avoid hydration mismatch).
- Validate quantities and do not allow negative quantities.

### 4. Checkout

- Collect customer name and phone number.
- Offer pickup or delivery.
- If delivery is selected, require a delivery address.
- Optional order notes.
- Show an order summary and final total before submission.
- Validate required fields and show useful inline errors.
- Prevent accidental duplicate submission while processing.
- Display a clear confirmation state after the WhatsApp handoff that states the order was **not** sent to the restaurant until the user presses send in WhatsApp.
- Do not collect payment card details or imply online payment is supported.

### 5. Order Submission — WhatsApp Handoff (LOCKED)

**Decision: no database, no server-side persistence.** The order is handed off through a WhatsApp message. Order history is kept in browser `localStorage` only, for demo continuity.

- Build a readable order summary containing items, quantities, prices, total, customer contact, fulfillment method, address if delivery, and notes.
- Open WhatsApp via `https://wa.me/<number>?text=<url-encoded message>`. URL-encode the entire message; do not string-concatenate unescaped user input.
- Read the destination number from `NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER`. Document the expected format (international, digits only, no `+`, no spaces or dashes — e.g. `639171234567`).
- When the variable is unset or fails format validation, enter **demo mode**: show a clear message explaining no number is configured, and let the user copy the order summary to the clipboard. **Never fabricate a number.**
- State plainly that opening WhatsApp only *drafts* the message — the user must press send, and the restaurant has not received or accepted the order.
- Keep a local order history in `localStorage` so the demo can show a "recent orders" confirmation. This is browser-local only and must never be presented as server-side persistence or as proof the restaurant received the order.
- Guard `localStorage` access with try/catch (private browsing / quota) and degrade to in-memory state.

### 6. Visual and UX Requirements

- Modern, appetizing restaurant aesthetic; polished and professional rather than a generic dashboard.
- Use a coherent palette: warm cream, deep charcoal, and a restrained orange accent. Define tokens as CSS variables in `app/globals.css` using Tailwind 4's `@theme inline`. There is no `tailwind.config.js`.
- Avoid generic AI-default styling: no purple-on-white gradients, no default Inter/Roboto look.
- Quality food imagery from a permitted source, with a guaranteed fallback. **No broken images under any condition** — every image needs an `onError` (or equivalent) fallback path to a local asset, and the source/license must be documented in the README.
- Mobile-first responsive layout for common phone, tablet, and desktop sizes.
- Accessible semantic elements, labels, keyboard focus indicators, and sufficient contrast.
- Visible cart feedback after adding an item.
- Clear calls to action and consistent navigation.
- No dead buttons, fake links, or controls that appear functional but do nothing.

### 7. Deployment Readiness

- Ensure the project builds successfully.
- Document all environment variables in `.env.example` without real secrets.
- Never commit `.env.local`, private credentials, access tokens, or service-role keys.
- Add a concise README with local setup, available scripts, demo behavior, image attribution, and deployment instructions.
- Make sure the site works with **no environment variables set at all** — that path must be the copy-to-clipboard demo mode, not a crash.
- Prepare for Vercel deployment and explain any required project settings.
- Only report a public URL if deployment has actually completed and the URL has been opened/tested.

## Suggested Project Structure

Adapt to the existing repository instead of forcing this exact layout.

```
app/
  page.tsx
  menu/
    page.tsx
  checkout/
    page.tsx
components/
  site-header.tsx
  site-footer.tsx
  hero-section.tsx
  menu-card.tsx
  menu-filters.tsx
  cart-drawer.tsx
  checkout-form.tsx
  order-summary.tsx
lib/
  menu-data.ts
  cart.ts                 # Or cart context/store
  validation.ts
  whatsapp.ts             # Order summary builder + wa.me URL encoding
public/
  images/                 # Local assets + image fallbacks
.env.example
README.md
```

There is deliberately **no** `app/api/` directory. See Section 5.

## Suggested Execution Sequence

1. Inspect repository and report the current stack and relevant files.
2. Implement design system, header/footer, homepage, and responsive navigation.
3. Add menu data, food cards, category filters, and add-to-cart.
4. Implement cart quantities, totals, persistence, and empty state.
5. Implement checkout validation and the WhatsApp handoff (Section 5 — no database).
6. Add loading, success, and error states.
7. Run lint/type-check/build; fix issues.
8. Test the main user journey manually or with existing test tooling:
   - Open homepage.
   - Browse/filter menu.
   - Add two different dishes.
   - Change quantities and verify totals.
   - Proceed to checkout.
   - Validate required fields.
   - Submit through the WhatsApp handoff or the copy-to-clipboard demo fallback.
   - Confirm the user sees accurate feedback.
   - Test on a narrow viewport.
9. Update README and `.env.example`.
10. Provide a concise completion report: files changed, features implemented, checks run and results, any configuration needed, and whether deployment is still pending.

## Explicitly Out of Scope for Today's MVP

- Restaurant admin dashboard
- Staff accounts and authentication
- Live kitchen/order status management
- Delivery-driver tracking
- Inventory management
- Loyalty points and promotions engine
- Payment gateway or storage of payment card data
- Multi-restaurant support
- Production SLA, monitoring, and advanced analytics
- Any database or server-side order storage

These may be proposed as future enhancements, but should not block the live portfolio demo.

## Definition of Done

- [ ] Homepage and menu look polished on desktop and mobile.
- [ ] Menu filters work.
- [ ] Cart add/remove/quantity controls work and totals are correct.
- [ ] Checkout validates required fields and delivery address.
- [ ] Order submission has a truthful success/error/demo state.
- [ ] No fake claims that an order was persisted or sent.
- [ ] No database or server-side order storage exists; order data lives only in the WhatsApp message and browser `localStorage`.
- [ ] No dead buttons or broken image assets.
- [ ] Lint/type-check/build commands pass where available.
- [ ] README and `.env.example` are present and accurate.
- [ ] The app is ready for deployment; a live URL is only claimed after verified deployment.
