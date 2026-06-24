"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { searchProducts, products, formatPrice } from "@/lib/products";
import { ProductSwatch } from "./product-swatch";

const suggestions = ["Cashmere", "Overcoat", "Tailoring", "Silk", "Knitwear"];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(
    () => (query ? searchProducts(query) : []),
    [query],
  );
  const featured = products.filter((p) => p.isBestseller).slice(0, 3);

  return (
    <div
      className={`fixed inset-0 z-[55] transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative mx-auto max-h-[88vh] max-w-3xl overflow-y-auto bg-paper px-6 pb-10 pt-8 shadow-2xl transition-transform duration-400 ease-out ${
          open ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="flex items-center gap-4 border-b border-ink pb-4">
          <SearchIcon />
          <input
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection…"
            className="w-full bg-transparent font-serif text-2xl text-ink placeholder:text-stone focus:outline-none"
          />
          <button onClick={onClose} className="eyebrow !text-[0.62rem] text-stone hover:text-ink">
            Close
          </button>
        </div>

        {!query && (
          <div className="mt-6">
            <p className="eyebrow text-stone">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink"
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="eyebrow mt-8 text-stone">Bestsellers</p>
            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  onClick={onClose}
                  className="group"
                >
                  <ProductSwatch
                    product={p}
                    monogram={false}
                    className="aspect-[3/4] w-full"
                  />
                  <p className="mt-2 font-serif text-base text-ink">{p.name}</p>
                  <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="mt-6">
            <p className="eyebrow text-stone">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            {results.length === 0 ? (
              <p className="mt-6 text-ink-soft">
                Nothing matched “{query}”. Try another search.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/shop/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 py-3 transition-colors hover:bg-paper-2"
                    >
                      <ProductSwatch
                        product={p}
                        monogram={false}
                        className="h-16 w-12 shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-serif text-lg text-ink">{p.name}</p>
                        <p className="text-xs text-stone">{p.tagline}</p>
                      </div>
                      <p className="text-sm tabular-nums text-ink-soft">
                        {formatPrice(p.price)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-stone" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
