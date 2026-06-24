import type { Metadata } from "next";
import { products, categories } from "@/lib/products";
import { ShopBrowser } from "@/components/shop-browser";
import type { Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Browse the full Maison Lumière collection.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active = categories.includes(c as Category) ? (c as Category) : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="text-center">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">
          {active ?? "Boutique"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-stone">
          Every piece is cut, sewn and finished by hand. Filter by category,
          size, colour and price to find your next companion.
        </p>
      </header>

      <div className="mt-12">
        <ShopBrowser
          key={active ?? "all"}
          allProducts={products}
          initialCategory={active}
        />
      </div>
    </div>
  );
}
