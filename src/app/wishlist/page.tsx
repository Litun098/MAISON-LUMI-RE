"use client";

import Link from "next/link";
import { useWishlist } from "@/components/wishlist-context";
import { getProductById } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="text-center">
        <p className="eyebrow">Saved pieces</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Wishlist</h1>
        <p className="mt-4 text-stone">
          {items.length === 0
            ? "You have not saved any pieces yet."
            : `${items.length} piece${items.length === 1 ? "" : "s"} saved`}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="mx-auto max-w-md text-ink-soft">
            Tap the heart on any piece to keep it here — your wishlist is saved to
            this device for whenever you return.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-ink px-9 py-4 transition-colors hover:bg-ink-soft"
          >
            <span className="eyebrow !text-[0.68rem] !text-paper">
              Discover the collection
            </span>
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
