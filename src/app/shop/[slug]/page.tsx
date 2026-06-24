import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProduct,
  getRelated,
  getCompleteTheLook,
  products,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { Stars } from "@/components/stars";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const lookProducts = getCompleteTheLook(product);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="eyebrow flex gap-2 !text-[0.6rem] text-stone">
        <Link href="/shop" className="hover:text-ink">
          Boutique
        </Link>
        <span>/</span>
        <Link href={`/shop?c=${product.category}`} className="hover:text-ink">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      {/* Complete the look */}
      {lookProducts.length > 0 && (
        <section className="mt-28">
          <Reveal>
            <p className="eyebrow text-stone">Styled by the atelier</p>
            <h2 className="mt-2 font-serif text-3xl text-ink">
              Complete the look
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {lookProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section id="reviews" className="mt-28 scroll-mt-28 border-t border-line pt-14">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <p className="eyebrow text-stone">Client reviews</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-serif text-5xl text-ink">
                {product.rating.toFixed(1)}
              </span>
              <div>
                <Stars rating={product.rating} />
                <p className="mt-1 text-xs text-stone">
                  Based on {product.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
          <ul className="space-y-8">
            {product.reviews.map((r, i) => (
              <li key={i} className="border-b border-line pb-8 last:border-0">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="text-xs text-stone">{r.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg text-ink">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
                <p className="mt-3 text-xs text-stone">
                  {r.author} · {r.location}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* related */}
      <section className="mt-28">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-ink">You may also like</h2>
          <Link href="/shop" className="eyebrow link-underline text-ink">
            View all
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
