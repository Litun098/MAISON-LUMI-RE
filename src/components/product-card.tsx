"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { ProductSwatch } from "./product-swatch";
import { WishlistButton } from "./wishlist-button";
import { useCart } from "./cart-context";
import { useToast } from "./toast-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [quickAdd, setQuickAdd] = useState(false);

  function add(size: string) {
    addItem(product.id, size, activeColor.name, 1);
    notify(`${product.name} added to your bag`, {
      href: "/checkout",
      hrefLabel: "Checkout",
    });
    setQuickAdd(false);
  }

  return (
    <div className="group">
      <div
        className="relative"
        onMouseLeave={() => setQuickAdd(false)}
      >
        <Link href={`/shop/${product.slug}`} className="block">
          <ProductSwatch
            product={product}
            swatch={activeColor.swatch}
            accent={activeColor.accent}
            label={activeColor.name}
            className="aspect-[3/4] w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </Link>

        {(product.isNew || product.isLimited || product.isBestseller) && (
          <span className="eyebrow absolute left-3 top-3 bg-paper/85 px-2.5 py-1 !text-[0.58rem] text-ink backdrop-blur-sm">
            {product.isLimited
              ? "Édition limitée"
              : product.isNew
                ? "Nouveau"
                : "Bestseller"}
          </span>
        )}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3"
        />

        {/* Quick add */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {!quickAdd ? (
            <button
              onClick={() => setQuickAdd(true)}
              className="w-full bg-paper/95 py-3 backdrop-blur-sm transition-colors hover:bg-paper"
            >
              <span className="eyebrow !text-[0.62rem] text-ink">Quick add</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-1 bg-paper/95 p-2 backdrop-blur-sm">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => add(s)}
                  className="min-w-9 border border-line px-2 py-1.5 text-xs tabular-nums text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-4 block">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight text-ink">
            {product.name}
          </h3>
          <p className="shrink-0 text-sm tabular-nums text-ink-soft">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
        <p className="mt-0.5 text-xs text-stone">{product.tagline}</p>
      </Link>

      {/* colour dots */}
      {product.colors.length > 1 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveColor(c)}
              aria-label={c.name}
              title={c.name}
              className={`h-3.5 w-3.5 rounded-full border transition-transform hover:scale-110 ${
                activeColor.name === c.name
                  ? "border-ink ring-1 ring-ink ring-offset-1 ring-offset-paper"
                  : "border-line"
              }`}
              style={{ backgroundColor: c.swatch }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
