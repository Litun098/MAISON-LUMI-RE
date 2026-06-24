"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "./cart-context";
import { products, formatPrice } from "@/lib/products";
import { ProductSwatch } from "./product-swatch";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    updateQuantity,
    removeItem,
    giftNote,
    setGiftNote,
  } = useCart();
  const [noteOpen, setNoteOpen] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const inCart = new Set(lines.map((l) => l.productId));
  const recommendations = products
    .filter((p) => p.isBestseller && !inCart.has(p.id))
    .slice(0, 4);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-xl text-ink">Votre Panier</h2>
          <button
            onClick={closeCart}
            className="eyebrow !text-[0.66rem] text-stone hover:text-ink"
          >
            Fermer
          </button>
        </div>

        {/* free shipping meter */}
        {lines.length > 0 && (
          <div className="border-b border-line px-6 py-4">
            <p className="text-center text-xs text-ink-soft">
              {remaining > 0 ? (
                <>
                  You are{" "}
                  <span className="font-medium text-ink">
                    {formatPrice(remaining)}
                  </span>{" "}
                  from complimentary express shipping
                </>
              ) : (
                <span className="text-gold">
                  ✓ You have unlocked complimentary express shipping
                </span>
              )}
            </p>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-stone">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="eyebrow link-underline text-ink"
            >
              Discover the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-line">
                {lines.map((line) => {
                  const product = products.find((p) => p.id === line.productId);
                  if (!product) return null;
                  const color =
                    product.colors.find((c) => c.name === line.color) ??
                    product.colors[0];
                  return (
                    <li
                      key={`${line.productId}-${line.size}-${line.color}`}
                      className="flex gap-4 py-5"
                    >
                      <ProductSwatch
                        product={product}
                        monogram={false}
                        swatch={color.swatch}
                        accent={color.accent}
                        label=""
                        className="h-28 w-20 shrink-0"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-base text-ink">
                              {product.name}
                            </h3>
                            <p className="text-xs text-stone">
                              {line.color} · Taille {line.size}
                            </p>
                          </div>
                          <p className="text-sm tabular-nums text-ink-soft">
                            {formatPrice(product.price * line.quantity)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-line">
                            <button
                              className="px-2.5 py-1 text-ink-soft hover:text-ink"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.size,
                                  line.color,
                                  line.quantity - 1,
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>
                            <span className="min-w-7 text-center text-sm tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              className="px-2.5 py-1 text-ink-soft hover:text-ink"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.size,
                                  line.color,
                                  line.quantity + 1,
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(line.productId, line.size, line.color)
                            }
                            className="eyebrow !text-[0.6rem] text-stone hover:text-ink"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* gift note */}
              <div className="border-t border-line py-4">
                <button
                  onClick={() => setNoteOpen((v) => !v)}
                  className="eyebrow flex w-full items-center justify-between !text-[0.62rem] text-ink-soft"
                >
                  Add a gift note
                  <span>{noteOpen ? "−" : "+"}</span>
                </button>
                {noteOpen && (
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    rows={3}
                    placeholder="Your message, hand-written on a card…"
                    className="mt-3 w-full border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-stone focus:border-ink focus:outline-none"
                  />
                )}
              </div>

              {/* recommendations */}
              {recommendations.length > 0 && (
                <div className="border-t border-line py-5">
                  <p className="eyebrow text-stone">Complete your wardrobe</p>
                  <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                    {recommendations.map((p) => (
                      <Link
                        key={p.id}
                        href={`/shop/${p.slug}`}
                        onClick={closeCart}
                        className="w-24 shrink-0"
                      >
                        <ProductSwatch
                          product={p}
                          monogram={false}
                          className="aspect-[3/4] w-full"
                        />
                        <p className="mt-1.5 truncate font-serif text-sm text-ink">
                          {p.name}
                        </p>
                        <p className="text-[0.7rem] text-stone">
                          {formatPrice(p.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-stone">Sous-total</span>
                <span className="font-serif text-xl text-ink tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone">
                Shipping & duties calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block w-full bg-ink py-4 text-center text-paper transition-colors hover:bg-ink-soft"
              >
                <span className="eyebrow !text-[0.66rem] !text-paper">
                  Passer la commande
                </span>
              </Link>
              <button
                onClick={closeCart}
                className="eyebrow mt-3 w-full !text-[0.6rem] text-stone hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
