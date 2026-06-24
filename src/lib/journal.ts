export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  swatch: string;
  accent: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "the-forty-hour-coat",
    title: "The Forty-Hour Coat",
    excerpt:
      "Inside the Florentine atelier where a single tailor shepherds each overcoat from chalk line to final press.",
    category: "Atelier",
    readTime: "6 min",
    date: "June 2026",
    swatch: "#2c2a26",
    accent: "#4a463f",
    body: [
      "There is a particular silence in the atelier in the early morning, before the irons are hot and the radio finds its station. It is in this hour that the cutting begins.",
      "Our overcoat passes through the hands of a single tailor — never a line, never a conveyor of specialists. The reasoning is simple: a coat made by one pair of hands carries a coherence that no assembly can replicate. The shoulder remembers the way the chest was canvassed; the hem answers to the drape established at the very first fitting.",
      "Forty hours is not a marketing figure. It is the honest accounting of double-faced cashmere closed entirely by hand, of buttonholes worked under a loupe, of a garment pressed and rested and pressed again until it learns its own shape.",
      "We make fewer coats this way. We would not make them any other.",
    ],
  },
  {
    slug: "in-praise-of-the-white-shirt",
    title: "In Praise of the White Shirt",
    excerpt:
      "Why the most ordinary garment in the wardrobe is, in fact, the most demanding to perfect.",
    category: "Wardrobe",
    readTime: "4 min",
    date: "May 2026",
    swatch: "#e7e1d4",
    accent: "#cfc6b2",
    body: [
      "The white shirt hides nothing. There is no pattern to distract the eye, no colour to forgive an uneven seam. It is, for this reason, the truest test of a maker.",
      "We weave ours from two-ply Egyptian cotton, a yarn long enough to spin fine and strong. Single-needle stitching keeps every seam flat and clean; a split yoke lets the shoulders move without strain.",
      "Worn open under a blazer or buttoned beneath black tie, it is the quiet foundation upon which a wardrobe is built.",
    ],
  },
  {
    slug: "the-mills-of-biella",
    title: "The Mills of Biella",
    excerpt:
      "A journey to the foothills of the Italian Alps, where our cashmere has been woven since 1952.",
    category: "Provenance",
    readTime: "7 min",
    date: "April 2026",
    swatch: "#43352a",
    accent: "#5f4c3c",
    body: [
      "Biella sits where the Po valley rises toward the Alps, and the water that runs down from the mountains is soft enough to have drawn weavers here for centuries.",
      "It is in one such mill, family-run for four generations, that our double-faced cashmere is woven. The looms are slow by modern standards — deliberately so. Speed, here, is the enemy of hand.",
      "To stand among the bolts of finished cloth is to understand why we have never sourced elsewhere. Some relationships are not worth optimising away.",
    ],
  },
  {
    slug: "dressing-for-the-evening",
    title: "Dressing for the Evening",
    excerpt:
      "Notes on black tie, the grosgrain lapel, and the enduring grammar of evening dress.",
    category: "Style",
    readTime: "5 min",
    date: "March 2026",
    swatch: "#191a1d",
    accent: "#2f3136",
    body: [
      "Evening dress is a language with a small vocabulary and very strict grammar. Within those constraints lies enormous room for personality.",
      "The barathea weave gives a dinner jacket its depth — a lustre that reads in candlelight without ever shining. The grosgrain lapel catches the eye precisely once, and then recedes.",
      "Dress for the evening, and you dress for everyone in the room but yourself.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
