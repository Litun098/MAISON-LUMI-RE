import Link from "next/link";

const columns = [
  {
    title: "La Maison",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/journal", label: "Le Journal" },
      { href: "/boutiques", label: "Boutiques" },
      { href: "/account", label: "My Account" },
    ],
  },
  {
    title: "Boutique",
    links: [
      { href: "/shop?c=Outerwear", label: "Outerwear" },
      { href: "/shop?c=Tailoring", label: "Tailoring" },
      { href: "/shop?c=Knitwear", label: "Knitwear" },
      { href: "/shop", label: "View All" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { href: "/care", label: "Shipping & Returns" },
      { href: "/boutiques", label: "Made-to-Measure" },
      { href: "/care", label: "Garment Care" },
      { href: "/care", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl tracking-[0.1em] text-ink">
              MAISON LUMIÈRE
            </p>
            <p className="mt-4 max-w-xs text-sm text-stone">
              An independent house dressing the considered wardrobe since 1924.
              Cut, sewn and finished by hand in Florence and Paris.
            </p>
            <form
              className="mt-6 flex max-w-xs items-center border-b border-ink/30 pb-2"
              action="#"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-ink placeholder:text-stone focus:outline-none"
              />
              <button type="submit" className="eyebrow !text-[0.62rem] text-ink">
                Subscribe
              </button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-stone hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-stone">
            © {new Date().getFullYear()} Maison Lumière. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="eyebrow !text-[0.6rem] text-stone">Privacy</span>
            <span className="eyebrow !text-[0.6rem] text-stone">Terms</span>
            <span className="eyebrow !text-[0.6rem] text-stone">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
