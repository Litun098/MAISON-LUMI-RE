import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/journal";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Le Journal",
  description: "Stories from the atelier — craft, provenance and the considered wardrobe.",
};

export default function JournalPage() {
  const [lead, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="text-center">
        <p className="eyebrow">Le Journal</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Stories from the house</h1>
        <p className="mx-auto mt-4 max-w-xl text-stone">
          Notes on craft, provenance, and the art of dressing with intention.
        </p>
      </header>

      {/* lead article */}
      <Link href={`/journal/${lead.slug}`} className="group mt-14 block">
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <div
            className="aspect-[4/3] w-full overflow-hidden md:aspect-auto"
            style={{
              background: `linear-gradient(150deg, ${lead.accent}, ${lead.swatch})`,
            }}
          />
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-stone">
              {lead.category} · {lead.readTime}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-ink transition-colors group-hover:text-ink-soft">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">{lead.excerpt}</p>
            <span className="eyebrow link-underline mt-6 inline-block text-ink">
              Read the story
            </span>
          </div>
        </div>
      </Link>

      {/* grid */}
      <div className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-3">
        {rest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 80}>
            <Link href={`/journal/${a.slug}`} className="group block">
              <div
                className="aspect-[4/5] w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
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
    </div>
  );
}
