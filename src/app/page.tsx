import Link from "next/link";
import { products } from "@/lib/products";
import { articles } from "@/lib/journal";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SiteImage } from "@/components/site-image";
import { SITE_IMAGES } from "@/lib/images";

export default function HomePage() {
  const featured = products.filter((p) => p.isNew || p.isLimited).slice(0, 4);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const journalPreview = articles.slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #20242a 0%, #2c2a26 45%, #3a342b 100%)",
          }}
        />
        <SiteImage
          id={SITE_IMAGES.hero}
          alt="Maison Lumière winter collection editorial"
          priority
          sizes="100vw"
          scrim="linear-gradient(90deg, rgba(20,20,22,0.78) 0%, rgba(20,20,22,0.45) 45%, rgba(20,20,22,0.2) 100%)"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 75% 10%, rgba(194,168,120,0.22), rgba(0,0,0,0) 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl fade-up [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            <p className="eyebrow !text-paper/70">The Winter Collection — 1924</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl">
              Dressed in
              <br />
              quiet permanence.
            </h1>
            <p className="mt-6 max-w-md text-paper/80">
              Garments conceived to outlive the season — cut from the finest
              European cloth and finished entirely by hand in our ateliers.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/shop"
                className="bg-paper px-9 py-4 transition-colors hover:bg-paper-2"
              >
                <span className="eyebrow !text-[0.68rem] !text-ink">
                  Shop the collection
                </span>
              </Link>
              <Link
                href="/about"
                className="eyebrow link-underline !text-[0.68rem] !text-paper/80"
              >
                Discover the maison
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <span className="eyebrow !text-[0.55rem] !text-paper/40">Scroll</span>
        </div>
      </section>

      {/* ---------------- Marquee values ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line md:grid-cols-4">
          {[
            ["Hand-finished", "In Florence & Paris"],
            ["Natural fibres", "Cashmere, silk, wool"],
            ["Made to last", "Lifetime repairs"],
            ["Carbon neutral", "Shipping worldwide"],
          ].map(([title, sub]) => (
            <div key={title} className="px-5 py-8 text-center">
              <p className="font-serif text-lg text-ink">{title}</p>
              <p className="eyebrow mt-1 !text-[0.58rem]">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Featured products ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Sélection</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">
              The season&apos;s defining pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="eyebrow link-underline hidden text-ink sm:inline"
          >
            View all
          </Link>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Editorial split ---------------- */}
      <section className="grid md:grid-cols-2">
        <div
          className="relative min-h-[60vh] overflow-hidden"
          style={{ background: "linear-gradient(150deg, #4a463f 0%, #2c2a26 70%)" }}
        >
          <SiteImage
            id={SITE_IMAGES.atelier}
            alt="A tailor at work in the atelier"
            sizes="(min-width: 768px) 50vw, 100vw"
            scrim="linear-gradient(160deg, rgba(20,20,22,0.15), rgba(20,20,22,0.5))"
          />
          <span
            aria-hidden
            className="font-serif absolute bottom-8 left-8 text-7xl text-paper/80 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]"
          >
            Atelier
          </span>
        </div>
        <div className="flex items-center bg-paper-2 px-8 py-20 md:px-16">
          <Reveal className="max-w-md">
            <p className="eyebrow">The hand of the maker</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
              Forty hours, three fittings, one coat.
            </h2>
            <p className="mt-6 text-ink-soft">
              Every garment passes through the hands of a single tailor, from the
              first chalk line to the final pressed seam. It is slower. It is the
              only way we know.
            </p>
            <Link
              href="/journal/the-forty-hour-coat"
              className="eyebrow link-underline mt-8 inline-block text-ink"
            >
              Inside the atelier
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Bestsellers ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="text-center">
          <p className="eyebrow">Most desired</p>
          <h2 className="mt-3 font-serif text-4xl text-ink">The bestsellers</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {bestsellers.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Collections strip ---------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <Reveal className="text-center">
          <p className="eyebrow">Explore</p>
          <h2 className="mt-3 font-serif text-4xl text-ink">Shop by category</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { c: "Outerwear", from: "#2c2a26", to: "#4a463f", img: SITE_IMAGES.categoryOuterwear },
            { c: "Tailoring", from: "#1f2933", to: "#3c4a57", img: SITE_IMAGES.categoryTailoring },
            { c: "Knitwear", from: "#43352a", to: "#5f4c3c", img: SITE_IMAGES.categoryKnitwear },
          ].map((cat) => (
            <Link
              key={cat.c}
              href={`/shop?c=${cat.c}`}
              className="group relative flex aspect-[4/5] items-end overflow-hidden p-7"
              style={{ background: `linear-gradient(155deg, ${cat.to}, ${cat.from})` }}
            >
              <SiteImage
                id={cat.img}
                alt={`${cat.c} category`}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                scrim="linear-gradient(180deg, rgba(20,20,22,0) 25%, rgba(20,20,22,0.88) 100%)"
              />
              <div className="relative z-10 [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]">
                <h3 className="font-serif text-2xl text-gold-soft">{cat.c}</h3>
                <span className="eyebrow !text-gold-soft/85">Discover →</span>
              </div>
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Press band ---------------- */}
      <section className="mt-16 border-y border-line bg-paper-2 py-14">
        <p className="eyebrow text-center text-stone">As featured in</p>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
          {["VOGUE", "GQ", "FINANCIAL TIMES", "MONOCLE", "LE FIGARO"].map((p) => (
            <span
              key={p}
              className="font-serif text-xl tracking-[0.12em] text-ink/45"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- Journal preview ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Le Journal</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">Stories from the house</h2>
          </div>
          <Link href="/journal" className="eyebrow link-underline hidden text-ink sm:inline">
            All stories
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {journalPreview.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(150deg, ${a.accent}, ${a.swatch})`,
                  }}
                />
                <p className="eyebrow mt-4 text-stone">
                  {a.category} · {a.readTime}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
