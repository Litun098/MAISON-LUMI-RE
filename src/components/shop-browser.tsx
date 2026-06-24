"use client";

import { useMemo, useState } from "react";
import type { Product, Category } from "@/lib/types";
import { categories, allSizes, allColors } from "@/lib/products";
import { ProductCard } from "./product-card";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const priceBands = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under €500", min: 0, max: 500 },
  { label: "€500 – €1,000", min: 500, max: 1000 },
  { label: "€1,000 – €2,000", min: 1000, max: 2000 },
  { label: "€2,000 +", min: 2000, max: Infinity },
];

export function ShopBrowser({
  allProducts,
  initialCategory,
}: {
  allProducts: Product[];
  initialCategory?: Category | null;
}) {
  const [cats, setCats] = useState<Category[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [band, setBand] = useState(0);
  const [sort, setSort] = useState<Sort>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sizeOptions = allSizes();
  const colorOptions = allColors();

  function toggle<T>(value: T, list: T[], set: (v: T[]) => void) {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  function clearAll() {
    setCats([]);
    setSizes([]);
    setColors([]);
    setBand(0);
  }

  const filtered = useMemo(() => {
    const { min, max } = priceBands[band];
    const result = allProducts.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name)))
        return false;
      if (p.price < min || p.price >= max) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "newest":
        return [...result].sort(
          (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
        );
      default:
        return [...result].sort(
          (a, b) =>
            Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)),
        );
    }
  }, [allProducts, cats, sizes, colors, band, sort]);

  const activeCount =
    cats.length + sizes.length + colors.length + (band > 0 ? 1 : 0);

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <Check
            key={c}
            label={c}
            checked={cats.includes(c)}
            onChange={() => toggle(c, cats, setCats)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggle(s, sizes, setSizes)}
              className={`min-w-10 border px-2.5 py-1.5 text-xs tabular-nums transition-colors ${
                sizes.includes(s)
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((name) => {
            const sample = allProducts
              .flatMap((p) => p.colors)
              .find((c) => c.name === name);
            const on = colors.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggle(name, colors, setColors)}
                title={name}
                aria-label={name}
                className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
                  on
                    ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                    : "border-line"
                }`}
                style={{ backgroundColor: sample?.swatch ?? "#ccc" }}
              />
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        {priceBands.map((b, i) => (
          <Radio
            key={b.label}
            label={b.label}
            checked={band === i}
            onChange={() => setBand(i)}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
      {/* desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="flex items-center justify-between border-b border-ink pb-3">
            <span className="eyebrow text-ink">Filter</span>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="eyebrow !text-[0.58rem] text-stone hover:text-ink"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          <div className="mt-6">{filters}</div>
        </div>
      </aside>

      <div>
        {/* toolbar */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="text-sm text-stone">
            {filtered.length} piece{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="eyebrow !text-[0.62rem] text-ink lg:hidden"
            >
              Filter{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <label className="flex items-center gap-2">
              <span className="eyebrow hidden !text-[0.6rem] text-stone sm:inline">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-line bg-paper px-3 py-1.5 text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* active chips */}
        {activeCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[...cats, ...sizes, ...colors].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 border border-line px-3 py-1 text-xs text-ink-soft"
              >
                {tag}
                <button
                  onClick={() => {
                    setCats((v) => v.filter((x) => x !== tag));
                    setSizes((v) => v.filter((x) => x !== tag));
                    setColors((v) => v.filter((x) => x !== tag));
                  }}
                  className="text-stone hover:text-ink"
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
            {band > 0 && (
              <span className="flex items-center gap-2 border border-line px-3 py-1 text-xs text-ink-soft">
                {priceBands[band].label}
                <button onClick={() => setBand(0)} className="text-stone hover:text-ink">
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="py-28 text-center">
            <p className="font-serif text-2xl text-ink">No pieces match.</p>
            <button
              onClick={clearAll}
              className="eyebrow link-underline mt-4 text-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-paper px-6 py-6">
            <div className="flex items-center justify-between border-b border-ink pb-3">
              <span className="eyebrow text-ink">Filter</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="eyebrow !text-[0.6rem] text-stone"
              >
                Done
              </button>
            </div>
            <div className="mt-6">{filters}</div>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="eyebrow mt-8 w-full border border-line py-3 !text-[0.62rem] text-ink"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-3 text-ink">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
      <span
        className={`flex h-4 w-4 items-center justify-center border transition-colors ${
          checked ? "border-ink bg-ink text-paper" : "border-line"
        }`}
      >
        {checked && <span className="text-[0.6rem] leading-none">✓</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
          checked ? "border-ink" : "border-line"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
      </span>
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}
