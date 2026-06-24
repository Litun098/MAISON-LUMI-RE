# Maison Lumière

A premium, editorial storefront for a fictional luxury clothing house — built with
**Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

The project is a polished, frontend-only demo backed by local mock data. There is
no database or payment processor; the checkout is a simulated flow. Everything is
structured so a real commerce backend can be wired in with minimal changes.

> **Note on imagery:** to keep the repo free of binary assets, product "photography"
> is rendered with layered CSS gradients (`ProductSwatch`). Replace it with
> `next/image` + real photography for production.

## Stack

- Next.js 16 (App Router, Server Components)
- React 19
- TypeScript
- Tailwind CSS v4 (design tokens via `@theme`)
- `next/font` — Cormorant Garamond (display) + Jost (body)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, cart provider, header/footer/drawer
│   ├── page.tsx                # home — hero, featured, editorial, categories
│   ├── about/page.tsx          # brand story
│   ├── shop/page.tsx           # listing + category filter (?c=)
│   ├── shop/[slug]/page.tsx    # product detail (static params + metadata)
│   ├── checkout/page.tsx       # simulated checkout + confirmation
│   ├── not-found.tsx           # 404
│   └── globals.css             # design system / tokens
├── components/
│   ├── header.tsx              # sticky nav + cart trigger (client)
│   ├── footer.tsx
│   ├── cart-context.tsx        # cart state + localStorage (client)
│   ├── cart-drawer.tsx         # slide-over bag (client)
│   ├── product-card.tsx
│   ├── product-swatch.tsx      # CSS-art product imagery
│   └── add-to-cart.tsx         # size selector + add (client)
└── lib/
    ├── types.ts                # Product, CartLine, Category
    └── products.ts             # mock catalogue + helpers
```

## Design system

Tokens live in `src/app/globals.css` and are exposed to Tailwind via `@theme`:

| Token      | Value     | Use                |
| ---------- | --------- | ------------------ |
| `paper`    | `#f7f5f0` | ivory canvas       |
| `ink`      | `#1b1a17` | headings / primary |
| `ink-soft` | `#3a3833` | body copy          |
| `stone`    | `#8c8678` | captions           |
| `line`     | `#e2dccf` | hairline borders   |
| `gold`     | `#9a7b40` | restrained accent  |

Utilities: `.eyebrow` (tracked small-caps label), `.link-underline` (animated
underline), `.fade-up` (entrance animation).

## Wiring a real backend

- **Products:** swap `src/lib/products.ts` for a data layer (Shopify, Medusa,
  a CMS, or a DB via server components / route handlers).
- **Cart:** `cart-context.tsx` persists to `localStorage`; point `addItem`/
  `updateQuantity` at a cart API or server actions.
- **Checkout:** replace the simulated form in `app/checkout/page.tsx` with a
  Stripe Checkout session or your PSP of choice.
- **Imagery:** replace `ProductSwatch` with `next/image`.
