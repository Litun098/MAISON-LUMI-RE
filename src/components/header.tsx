"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { SearchOverlay } from "./search-overlay";
import { categories, products } from "@/lib/products";
import { ProductSwatch } from "./product-swatch";

const primaryNav = [
  { href: "/shop", label: "Boutique", mega: true },
  { href: "/shop?c=Outerwear", label: "Outerwear" },
  { href: "/shop?c=Knitwear", label: "Knitwear" },
  { href: "/journal", label: "Le Journal" },
  { href: "/about", label: "La Maison" },
];

const megaImagery = [
  { label: "New Arrivals", href: "/shop", product: products[4] },
  { label: "Bestsellers", href: "/shop", product: products[0] },
];

export function Header() {
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset menus when the route changes (intentional state reset).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        scrolled || megaOpen
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper/60 backdrop-blur-sm"
      }`}
      onMouseLeave={() => setMegaOpen(false)}
    >
      {/* announcement strip */}
      <div className="bg-ink text-paper">
        <p className="eyebrow mx-auto max-w-7xl px-6 py-2 text-center !text-[0.58rem] !text-paper/80">
          Complimentary shipping & returns worldwide · Hand-finished in Florence
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-5">
        {/* left: nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setMegaOpen(Boolean(item.mega))}
              className="eyebrow link-underline !text-[0.66rem] text-ink-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="eyebrow flex items-center gap-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="flex h-3 w-4 flex-col justify-between">
            <span className="h-px w-full bg-ink" />
            <span className="h-px w-full bg-ink" />
            <span className="h-px w-full bg-ink" />
          </span>
          Menu
        </button>

        {/* center: wordmark */}
        <Link href="/" className="text-center">
          <span className="font-serif text-base leading-none tracking-[0.08em] text-ink sm:text-xl sm:tracking-[0.12em] md:text-2xl">
            MAISON LUMIÈRE
          </span>
          <span className="eyebrow mt-1 block !text-[0.46rem] text-stone sm:!text-[0.5rem]">
            Paris · est. 1924
          </span>
        </Link>

        {/* right: utilities */}
        <div className="flex items-center justify-end gap-4 sm:gap-5">
          {/* compact icons on mobile */}
          <div className="flex items-center gap-4 sm:hidden">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-ink">
              <SearchIcon />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="relative text-ink">
              <HeartIcon />
              {wishCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-gold px-0.5 text-[0.5rem] leading-none text-paper">
                  {wishCount}
                </span>
              )}
            </Link>
            <button onClick={openCart} aria-label="Open cart" className="relative text-ink">
              <BagIcon />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-ink px-0.5 text-[0.5rem] leading-none text-paper">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* text labels on larger screens */}
          <div className="hidden items-center gap-5 sm:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="eyebrow !text-[0.66rem] text-ink-soft hover:text-ink"
            >
              Search
            </button>
            <Link
              href="/account"
              className="eyebrow hidden !text-[0.66rem] text-ink-soft hover:text-ink lg:inline"
            >
              Compte
            </Link>
            <Link
              href="/wishlist"
              className="eyebrow relative !text-[0.66rem] text-ink-soft hover:text-ink"
            >
              Wishlist
              {wishCount > 0 && (
                <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.58rem] leading-none text-paper">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="eyebrow relative !text-[0.66rem] text-ink-soft hover:text-ink"
              aria-label="Open cart"
            >
              Panier
              {count > 0 && (
                <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[0.58rem] leading-none text-paper">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu */}
      <div
        className={`absolute inset-x-0 top-full hidden border-t border-line bg-paper transition-all duration-300 md:block ${
          megaOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        onMouseEnter={() => setMegaOpen(true)}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_2fr] gap-10 px-6 py-10">
          <div>
            <p className="eyebrow text-stone">Categories</p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/shop?c=${c}`}
                    className="link-underline font-serif text-lg text-ink"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-stone">Collections</p>
            <ul className="mt-4 space-y-2.5">
              {["Hiver 1924", "Soirée", "The Permanent Collection", "Made-to-Measure"].map(
                (c) => (
                  <li key={c}>
                    <Link href="/shop" className="link-underline text-sm text-ink-soft">
                      {c}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <p className="eyebrow mt-8 text-stone">Discover</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/journal" className="link-underline text-sm text-ink-soft">
                  Le Journal
                </Link>
              </li>
              <li>
                <Link href="/boutiques" className="link-underline text-sm text-ink-soft">
                  Our Boutiques
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {megaImagery.map((m) => (
              <Link key={m.label} href={m.href} className="group block">
                <ProductSwatch
                  product={m.product}
                  monogram={false}
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <p className="eyebrow mt-3 text-ink">{m.label} →</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <nav className="border-t border-line bg-paper px-6 py-4 md:hidden">
          <button
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            className="eyebrow block py-2.5 !text-[0.7rem] text-ink-soft"
          >
            Search
          </button>
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="eyebrow block py-2.5 !text-[0.7rem] text-ink-soft"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/wishlist" className="eyebrow block py-2.5 !text-[0.7rem] text-ink-soft">
            Wishlist
          </Link>
          <Link href="/account" className="eyebrow block py-2.5 !text-[0.7rem] text-ink-soft">
            Compte
          </Link>
        </nav>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.2 5c2 0 3.3 1.1 4.8 3 1.5-1.9 2.8-3 4.8-3 3.2 0 4.8 3.4 3.2 6.7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 8h12l1 12H5L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
