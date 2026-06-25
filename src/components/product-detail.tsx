"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { ProductImage } from "./product-image";
import { useCart } from "./cart-context";
import { useToast } from "./toast-context";
import { Stars } from "./stars";
import { Accordion } from "./accordion";
import { SizeGuide } from "./size-guide";
import { WishlistButton } from "./wishlist-button";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [angle, setAngle] = useState(0);
  const [error, setError] = useState(false);
  const isDefaultColor = color.name === product.colors[0].name;

  function add() {
    if (!size) {
      setError(true);
      return;
    }
    addItem(product.id, size, color.name, qty);
    notify(`${product.name} added to your bag`, {
      href: "/checkout",
      hrefLabel: "Checkout",
    });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* gallery */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ProductImage
          product={product}
          index={angle}
          showPhoto={isDefaultColor}
          swatch={color.swatch}
          accent={color.accent}
          label={color.name}
          seed={angle}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[3/4] w-full"
        />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setAngle(s)}
              className={`overflow-hidden border transition-colors ${
                angle === s ? "border-ink" : "border-transparent"
              }`}
              aria-label={`View ${s + 1}`}
            >
              <ProductImage
                product={product}
                index={s}
                showPhoto={isDefaultColor}
                swatch={color.swatch}
                accent={color.accent}
                monogram={false}
                label=""
                seed={s}
                sizes="(min-width: 1024px) 11vw, 25vw"
                className="aspect-square w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* info */}
      <div className="lg:py-2">
        {(product.isNew || product.isLimited || product.isBestseller) && (
          <p className="eyebrow text-gold">
            {product.isLimited
              ? "Édition limitée"
              : product.isNew
                ? "Nouveau"
                : "Bestseller"}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-2 text-stone">{product.tagline}</p>

        <a href="#reviews" className="mt-3 inline-flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-stone underline-offset-2 hover:underline">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </a>

        <div className="mt-5 flex items-baseline gap-3">
          <p className="text-xl tabular-nums text-ink">
            {formatPrice(product.price, product.currency)}
          </p>
          {product.compareAtPrice && (
            <p className="text-sm tabular-nums text-stone line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </p>
          )}
        </div>

        <p className="mt-6 max-w-prose text-ink-soft">{product.description}</p>

        {/* colour */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <span className="eyebrow text-ink">Colour</span>
            <span className="text-xs text-stone">— {color.name}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c)}
                aria-label={c.name}
                title={c.name}
                className={`h-8 w-8 rounded-full border transition-transform hover:scale-105 ${
                  color.name === c.name
                    ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                    : "border-line"
                }`}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
          </div>
        </div>

        {/* size */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink">Size</span>
            <SizeGuide category={product.category} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={`min-w-12 border px-3 py-2.5 text-sm tabular-nums transition-colors ${
                  size === s
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 text-xs text-gold">Please select a size.</p>}
        </div>

        {/* qty + add */}
        <div className="mt-7 flex items-stretch gap-3">
          <div className="flex items-center border border-line">
            <button
              className="px-3.5 text-ink-soft hover:text-ink"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="min-w-8 text-center text-sm tabular-nums">{qty}</span>
            <button
              className="px-3.5 text-ink-soft hover:text-ink"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={add}
            className="flex-1 bg-ink py-4 text-center text-paper transition-colors hover:bg-ink-soft"
          >
            <span className="eyebrow !text-[0.68rem] !text-paper">Add to bag</span>
          </button>
        </div>

        <div className="mt-3">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            variant="full"
          />
        </div>

        <ul className="mt-6 space-y-1.5 text-xs text-stone">
          <li>— Complimentary express shipping & returns</li>
          <li>— Hand-finished in our Florentine atelier</li>
          <li>— Lifetime repairs and alterations</li>
        </ul>

        {/* accordions */}
        <div className="mt-9">
          <Accordion
            defaultOpen={0}
            items={[
              {
                title: "The Story",
                content: <p className="leading-relaxed">{product.story}</p>,
              },
              {
                title: "Composition & Care",
                content: (
                  <div className="space-y-3">
                    <p>{product.materials.join(" · ")}</p>
                    <ul className="space-y-1">
                      {product.care.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-gold">—</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
              {
                title: "Details",
                content: (
                  <ul className="space-y-1">
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-gold">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Shipping & Returns",
                content: (
                  <p className="leading-relaxed">
                    Complimentary express shipping worldwide, dispatched within 48
                    hours and presented in our signature packaging. Returns are
                    free within 30 days, unworn with tags attached.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
