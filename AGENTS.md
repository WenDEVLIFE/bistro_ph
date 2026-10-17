<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Context

Read this before planning or writing anything in this repo.

- This repo (`bistro_ph`) is **Bistro PH** — a *fictional* restaurant website built as a freelance portfolio demo. It is **not** commissioned work for a real restaurant.
- The implementation plan, acceptance criteria, order-submission options, out-of-scope list, and definition of done live in [`docs/skills/SKILL.md`](docs/skills/SKILL.md). Read it before proposing or writing changes.
- Repo identity, verified dependency versions, and current scaffold state: [`docs/skills/PROJECT.MD`](docs/skills/PROJECT.MD).

### Stack (verified in `package.json` — do not assume newer)

- Next.js `16.4.2` App Router, React `19.3`, TypeScript `5`, Tailwind CSS `4`.
- Tailwind 4 is **CSS-first**: `@import "tailwindcss"` and `@theme inline` in `app/globals.css`. There is **no `tailwind.config.js`** — theme tokens are declared in CSS.
- No state, form, or database library is installed. UI icons use `@solar-icons/react` (BoldDuotone) via per-icon imports.
- Scripts: `npm run dev` / `build` / `start` / `lint`. There is **no `typecheck` script** — use `npx tsc --noEmit`.

### Non-negotiables

1. Never invent a real WhatsApp/phone number. Read it from `NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER`; when unset, fall back to a copy-to-clipboard demo mode.
2. Never claim an order was persisted or sent, or that deployment succeeded, unless it actually happened and was verified.
3. Never collect payment card details or imply online payment is supported.
4. No dead buttons, fake links, or broken image assets — provide fallbacks.
5. Never commit `.env.local`, tokens, or service-role keys.
6. Never invent a real phone number, never claim an order was sent or persisted when it was not, and never imply online payment is supported. Menu prices are shown in Philippine pesos (PHP). Keep `robots: { index: false }` in `app/layout.tsx` unchanged. Do not add a visible "fictional/demo" disclosure — the owner removed it so the site reads as a real restaurant.
7. **No database.** Order submission is a WhatsApp handoff (`NEXT_PUBLIC_RESTAURANT_WHATSAPP_NUMBER`) plus a browser-local `localStorage` order history. Do not add a database client, an `app/api/orders` route, or any server-side order storage.

### Editing This File

The `nextjs-agent-rules` block above is managed by `next dev`, which upserts only inside its markers (`generate-agent-files.js:234-239`). Everything below the block is safe to edit — do not modify anything between the markers.
