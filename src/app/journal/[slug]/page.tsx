import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/journal";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      {/* hero */}
      <header className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${article.accent}, ${article.swatch} 90%)`,
          }}
        />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-16">
          <p className="eyebrow !text-paper/60">
            {article.category} · {article.readTime} · {article.date}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-paper sm:text-6xl">
            {article.title}
          </h1>
        </div>
      </header>

      {/* body */}
      <div className="mx-auto max-w-2xl px-6 py-20">
        <p className="font-serif text-2xl leading-relaxed text-ink">
          {article.excerpt}
        </p>
        <div className="mt-8 space-y-6 text-ink-soft">
          {article.body.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <Link href="/journal" className="eyebrow link-underline text-ink">
            ← All stories
          </Link>
        </div>
      </div>

      {/* more */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-serif text-3xl text-ink">Continue reading</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
                <div
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(150deg, ${a.accent}, ${a.swatch})`,
                  }}
                />
                <p className="eyebrow mt-4 text-stone">{a.category}</p>
                <h3 className="mt-2 font-serif text-xl text-ink">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
