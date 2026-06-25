import Link from "next/link";
import type { Metadata } from "next";
import { SiteImage } from "@/components/site-image";
import { SITE_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "La Maison",
  description:
    "The story of Maison Lumière — an independent house dressing the considered wardrobe since 1924.",
};

export default function AboutPage() {
  return (
    <div>
      {/* hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #2c2a26, #1f2933 90%)" }}
        />
        <SiteImage
          id={SITE_IMAGES.aboutHero}
          alt="The hand of the maker in the atelier"
          priority
          sizes="100vw"
          scrim="linear-gradient(180deg, rgba(20,20,22,0.3) 0%, rgba(20,20,22,0.35) 40%, rgba(20,20,22,0.75) 100%)"
        />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-16">
          <p className="eyebrow !text-paper/60">Since 1924</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-paper sm:text-6xl">
            A house built on the
            <br />
            quiet discipline of craft.
          </h1>
        </div>
      </section>

      {/* manifesto */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-serif text-2xl leading-relaxed text-ink">
          Maison Lumière was founded on a single conviction: that a garment, made
          well, should be a companion for decades — not a season.
        </p>
        <div className="mt-8 space-y-6 text-ink-soft">
          <p>
            From a small atelier on the Rue Saint-Honoré, our founder dressed a
            generation who understood that true luxury is felt, not flaunted.
            That sensibility endures. We work with a handful of mills in Italy,
            Scotland and Japan whose cloth has no equal, and with tailors whose
            craft is measured in decades.
          </p>
          <p>
            Every piece is cut to a generous, considered fit and finished by
            hand. We make fewer things, more carefully, and we stand behind each
            one for life — repairing, re-lining and restoring so that it may be
            worn, and loved, far longer than its maker.
          </p>
        </div>
      </section>

      {/* pillars */}
      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-px md:grid-cols-3">
          {[
            {
              t: "The Cloth",
              d: "Sourced from heritage mills in Biella, Hawick and Osaka — natural fibres chosen for how they age, not merely how they look.",
              img: SITE_IMAGES.aboutCloth,
            },
            {
              t: "The Hand",
              d: "A single tailor sees each garment from first cut to final press. Forty hours of work live inside our overcoat.",
              img: SITE_IMAGES.aboutHand,
            },
            {
              t: "The Promise",
              d: "Lifetime repairs and alterations. We would rather mend a coat than sell its replacement.",
              img: SITE_IMAGES.aboutPromise,
            },
          ].map((p) => (
            <div key={p.t} className="bg-paper">
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: "linear-gradient(150deg, #4a463f, #2c2a26)" }}
              >
                <SiteImage
                  id={p.img}
                  alt={p.t}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="px-8 py-14">
                <h3 className="font-serif text-2xl text-ink">{p.t}</h3>
                <p className="mt-4 text-ink-soft">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow">Begin</p>
        <h2 className="mt-3 font-serif text-4xl text-ink">
          Dress with intention.
        </h2>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-ink px-9 py-4 transition-colors hover:bg-ink-soft"
        >
          <span className="eyebrow !text-[0.68rem] !text-paper">
            Explore the collection
          </span>
        </Link>
      </section>
    </div>
  );
}
