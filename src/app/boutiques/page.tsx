import type { Metadata } from "next";
import { SiteImage } from "@/components/site-image";
import { SITE_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Boutiques",
  description: "Visit Maison Lumière in our flagship boutiques and ateliers worldwide.",
};

const boutiques = [
  {
    city: "Paris",
    flagship: true,
    address: "318 Rue Saint-Honoré, 75001",
    hours: "Mon–Sat 10–19",
    phone: "+33 1 42 60 00 00",
    note: "Flagship & atelier · Made-to-measure by appointment",
  },
  {
    city: "Milan",
    address: "Via Monte Napoleone 12, 20121",
    hours: "Mon–Sat 10–19",
    phone: "+39 02 7600 0000",
    note: "Full collection · Personal styling",
  },
  {
    city: "London",
    address: "44 Mount Street, Mayfair, W1K",
    hours: "Mon–Sat 10–18",
    phone: "+44 20 7000 0000",
    note: "Full collection · Tailoring",
  },
  {
    city: "New York",
    address: "27 East 67th Street, NY 10065",
    hours: "Mon–Sat 11–19",
    phone: "+1 212 000 0000",
    note: "Full collection · Private appointments",
  },
  {
    city: "Tokyo",
    address: "Ginza Six, 6-10-1 Ginza, Chūō-ku",
    hours: "Daily 11–20",
    phone: "+81 3 0000 0000",
    note: "Full collection",
  },
  {
    city: "Geneva",
    address: "Rue du Rhône 62, 1204",
    hours: "Mon–Sat 10–18",
    phone: "+41 22 000 00 00",
    note: "Outerwear & tailoring",
  },
];

export default function BoutiquesPage() {
  return (
    <div>
      <section className="relative flex min-h-[46vh] items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #2c2a26, #1f2933 90%)" }}
        />
        <SiteImage
          id={SITE_IMAGES.boutiquesHero}
          alt="Interior of a Maison Lumière boutique"
          priority
          sizes="100vw"
          scrim="linear-gradient(180deg, rgba(20,20,22,0.25) 0%, rgba(20,20,22,0.35) 40%, rgba(20,20,22,0.7) 100%)"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14">
          <p className="eyebrow !text-paper/60">Visit us</p>
          <h1 className="mt-3 font-serif text-5xl text-paper sm:text-6xl">
            Our Boutiques
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {boutiques.map((b) => (
            <div key={b.city} className="bg-paper p-8">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl text-ink">{b.city}</h2>
                {b.flagship && (
                  <span className="eyebrow !text-[0.55rem] text-gold">Flagship</span>
                )}
              </div>
              <p className="mt-4 text-sm text-ink-soft">{b.address}</p>
              <dl className="mt-4 space-y-1.5 text-sm text-stone">
                <div className="flex justify-between">
                  <dt>Hours</dt>
                  <dd className="text-ink-soft">{b.hours}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Telephone</dt>
                  <dd className="text-ink-soft">{b.phone}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-xs text-stone">
                {b.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-line bg-paper-2 px-8 py-12 text-center">
          <p className="eyebrow text-stone">Made-to-measure</p>
          <h2 className="mt-3 font-serif text-3xl text-ink">
            Book a private appointment
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            Our tailors offer complimentary consultations in every boutique. Reserve
            an hour and we will guide you through cloth, cut and fit.
          </p>
          <button className="mt-7 inline-block bg-ink px-9 py-4 transition-colors hover:bg-ink-soft">
            <span className="eyebrow !text-[0.66rem] !text-paper">
              Request appointment
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
