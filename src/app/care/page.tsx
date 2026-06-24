import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";

export const metadata: Metadata = {
  title: "Client Care",
  description: "Shipping, returns, garment care and made-to-measure — answered.",
};

const groups = [
  {
    heading: "Orders & Shipping",
    items: [
      {
        title: "When will my order arrive?",
        content:
          "Orders are dispatched within 48 hours and delivered by express courier — typically 2–4 business days. You will receive tracking the moment your parcel leaves the atelier.",
      },
      {
        title: "Do you ship worldwide?",
        content:
          "Yes. We ship to over 80 countries with complimentary express shipping and duties included to most destinations.",
      },
      {
        title: "How is my order packaged?",
        content:
          "Each piece is wrapped in tissue and presented in our signature box, ready to be gifted. A hand-written gift note can be added at checkout.",
      },
    ],
  },
  {
    heading: "Returns & Exchanges",
    items: [
      {
        title: "What is your returns policy?",
        content:
          "Returns are free within 30 days of delivery, unworn and with tags attached. Initiate a return from your account and we will arrange collection.",
      },
      {
        title: "Can I exchange for another size?",
        content:
          "Of course. Select 'exchange' when initiating your return and we will reserve your preferred size while your parcel is in transit.",
      },
    ],
  },
  {
    heading: "Garment Care & Repairs",
    items: [
      {
        title: "Do you offer repairs?",
        content:
          "Every Maison Lumière piece is covered by our lifetime repairs promise. Bring it to any boutique or post it to our atelier and we will restore it.",
      },
      {
        title: "How should I care for cashmere?",
        content:
          "Hand wash cold with a gentle detergent, reshape and dry flat. Store folded with cedar to deter moths. De-pill gently each season with a comb.",
      },
    ],
  },
  {
    heading: "Made-to-Measure",
    items: [
      {
        title: "How does made-to-measure work?",
        content:
          "Book a consultation in any boutique. Our tailor takes your measurements and guides you through cloth and detailing. Your garment is then cut to your specification in Florence, ready in 4–6 weeks.",
      },
    ],
  },
];

export default function CarePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="text-center">
        <p className="eyebrow">Client Care</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">How may we help?</h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Everything you need to know about ordering, returns, care and our
          made-to-measure service.
        </p>
      </header>

      <div className="mt-14 space-y-12">
        {groups.map((g) => (
          <section key={g.heading}>
            <h2 className="font-serif text-2xl text-ink">{g.heading}</h2>
            <div className="mt-4">
              <Accordion items={g.items} />
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border border-line bg-paper-2 p-8 text-center">
        <h2 className="font-serif text-2xl text-ink">Still have a question?</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Our client advisors are available Monday to Saturday.
        </p>
        <p className="mt-4 text-sm text-ink">
          clients@maison-lumiere.example · +33 1 42 60 00 00
        </p>
      </div>
    </div>
  );
}
