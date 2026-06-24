import type { Category, Product, Review } from "./types";

/**
 * Mock catalogue for MAISON LUMIÈRE.
 * Product imagery is rendered as CSS gradient "swatches" so the project
 * has zero binary asset dependencies — swap `swatch`/`colors` for real
 * photography when wiring to a real backend.
 */

const sampleReviews = (name: string): Review[] => [
  {
    author: "Camille D.",
    location: "Paris",
    rating: 5,
    title: "Worth every euro",
    body: `The ${name} exceeded my expectations — the finishing is impeccable and it feels like it will last a lifetime.`,
    date: "March 2026",
  },
  {
    author: "Henrik L.",
    location: "Copenhagen",
    rating: 5,
    title: "Quiet perfection",
    body: "Understated, beautifully cut, and the fabric is extraordinary. Exactly what I hoped for.",
    date: "February 2026",
  },
  {
    author: "Sofia R.",
    location: "Milan",
    rating: 4,
    title: "Beautiful, runs slightly large",
    body: "Stunning craftsmanship. I would consider sizing down — otherwise flawless.",
    date: "January 2026",
  },
];

export const products: Product[] = [
  {
    id: "ml-001",
    slug: "le-manteau-overcoat",
    name: "Le Manteau",
    tagline: "Double-faced cashmere overcoat",
    price: 2890,
    currency: "EUR",
    category: "Outerwear",
    collection: "Hiver",
    swatch: "#2c2a26",
    swatchAccent: "#4a463f",
    colorName: "Espresso",
    colors: [
      { name: "Espresso", swatch: "#2c2a26", accent: "#4a463f" },
      { name: "Camel", swatch: "#b8a888", accent: "#9c8d6f" },
      { name: "Noir", swatch: "#1a1a1c", accent: "#34343a" },
    ],
    sizes: ["44", "46", "48", "50", "52"],
    materials: ["100% Mongolian cashmere", "Cupro lining"],
    description:
      "A sculptural overcoat cut from double-faced cashmere, finished entirely by hand. The unstructured shoulder and concealed placket give a silhouette that is at once severe and effortless.",
    story:
      "The cashmere is woven by a single mill in Biella that has supplied the house since 1952. Double-faced and bonded by hand, the cloth needs no lining — only the patient work of a tailor closing every edge with an invisible stitch. Forty hours of labour live inside this coat.",
    details: [
      "Hand-finished raw edges",
      "Concealed two-button placket",
      "Welt pockets at hip",
      "Made in our Florentine atelier",
    ],
    care: [
      "Specialist dry clean only",
      "Store on a broad wooden hanger",
      "Brush gently with a natural-bristle clothes brush",
    ],
    rating: 4.9,
    reviewCount: 128,
    reviews: sampleReviews("Le Manteau"),
    completeTheLook: ["ml-003", "ml-006", "ml-011"],
    isLimited: true,
    isBestseller: true,
  },
  {
    id: "ml-002",
    slug: "tailleur-blazer",
    name: "Le Tailleur",
    tagline: "Single-breasted virgin wool blazer",
    price: 1650,
    currency: "EUR",
    category: "Tailoring",
    collection: "Permanent",
    swatch: "#1f2933",
    swatchAccent: "#3c4a57",
    colorName: "Midnight",
    colors: [
      { name: "Midnight", swatch: "#1f2933", accent: "#3c4a57" },
      { name: "Charcoal", swatch: "#33312e", accent: "#4f4c47" },
    ],
    sizes: ["44", "46", "48", "50", "52", "54"],
    materials: ["Super 130s virgin wool", "Bemberg lining"],
    description:
      "Our house blazer, drafted over forty hours across three fittings. A softly canvassed chest follows the body without constraint.",
    story:
      "Cut from a Super 130s virgin wool with a faint open weave that breathes through the seasons. The chest is built on a full floating canvas — never fused — so the jacket moulds to its wearer and improves with every year of wear.",
    details: [
      "Full floating canvas",
      "Horn buttons",
      "Pick-stitched lapel",
      "Functional surgeon's cuffs",
    ],
    care: ["Dry clean sparingly", "Steam to refresh", "Rest 24 hours between wears"],
    rating: 4.8,
    reviewCount: 96,
    reviews: sampleReviews("Le Tailleur"),
    completeTheLook: ["ml-005", "ml-006", "ml-001"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "ml-003",
    slug: "col-roule-knit",
    name: "Col Roulé",
    tagline: "Fine-gauge ribbed roll-neck",
    price: 540,
    currency: "EUR",
    category: "Knitwear",
    collection: "Permanent",
    swatch: "#e7e1d4",
    swatchAccent: "#cfc6b2",
    colorName: "Ivoire",
    colors: [
      { name: "Ivoire", swatch: "#e7e1d4", accent: "#cfc6b2" },
      { name: "Noir", swatch: "#1f1f21", accent: "#39393d" },
      { name: "Camel", swatch: "#b08d5b", accent: "#c8a878" },
      { name: "Bordeaux", swatch: "#5e3340", accent: "#7a4453" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["100% extra-fine merino"],
    description:
      "A whisper-weight roll-neck knitted on vintage gauge machines in Scotland. Cut close, worn for a lifetime.",
    story:
      "Knitted on vintage gauge machines in the Scottish Borders from extra-fine merino, then fully fashioned so each panel is shaped on the machine rather than cut from cloth. The result is a roll-neck that holds its shape and softens with age.",
    details: ["12-gauge knit", "Self-fabric roll collar", "Fully fashioned seams"],
    care: ["Hand wash cold", "Dry flat", "Store folded"],
    rating: 4.7,
    reviewCount: 214,
    reviews: sampleReviews("Col Roulé"),
    completeTheLook: ["ml-001", "ml-006", "ml-007"],
    isBestseller: true,
  },
  {
    id: "ml-004",
    slug: "robe-soir-dress",
    name: "Robe du Soir",
    tagline: "Bias-cut silk evening dress",
    price: 1980,
    currency: "EUR",
    category: "Dresses",
    collection: "Soirée",
    swatch: "#3a1f29",
    swatchAccent: "#5e3340",
    colorName: "Bordeaux",
    colors: [
      { name: "Bordeaux", swatch: "#3a1f29", accent: "#5e3340" },
      { name: "Encre", swatch: "#191a1d", accent: "#2f3136" },
      { name: "Emerald", swatch: "#1f3a30", accent: "#356050" },
    ],
    sizes: ["34", "36", "38", "40", "42"],
    materials: ["100% silk charmeuse"],
    description:
      "Cut on the true bias so the silk traces every movement. A column that falls without interruption from a draped cowl.",
    story:
      "A single length of silk charmeuse cut on the true bias and assembled with French seams so that not a raw edge remains. Worn, it pools and moves like liquid — the most technical and the most quietly dramatic piece in the house.",
    details: ["French seams throughout", "Hand-rolled hem", "Concealed side zip"],
    care: ["Specialist dry clean only", "Hang in a breathable garment bag"],
    rating: 4.9,
    reviewCount: 64,
    reviews: sampleReviews("Robe du Soir"),
    completeTheLook: ["ml-010", "ml-012"],
    isLimited: true,
  },
  {
    id: "ml-005",
    slug: "chemise-blanche-shirt",
    name: "La Chemise",
    tagline: "Poplin dress shirt",
    price: 320,
    currency: "EUR",
    category: "Shirts",
    collection: "Permanent",
    swatch: "#f2efe9",
    swatchAccent: "#dcd6c9",
    colorName: "Blanc",
    colors: [
      { name: "Blanc", swatch: "#f2efe9", accent: "#dcd6c9" },
      { name: "Ciel", swatch: "#cdd8e0", accent: "#b3c2cd" },
      { name: "Rayé", swatch: "#dfe3e8", accent: "#9aa6b2" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    materials: ["Two-ply Egyptian cotton poplin", "Mother-of-pearl buttons"],
    description:
      "The white shirt, reconsidered. A spread collar with just enough roll, cut from cool two-ply poplin.",
    story:
      "Woven from two-ply Egyptian cotton, the poplin is crisp yet cool against the skin. Single-needle stitching at every seam and a split yoke that sits clean across the shoulders — the quiet architecture of a perfect shirt.",
    details: ["Single-needle stitching", "Split yoke", "Mother-of-pearl buttons"],
    care: ["Machine wash 30°", "Iron damp", "Hang to dry"],
    rating: 4.8,
    reviewCount: 187,
    reviews: sampleReviews("La Chemise"),
    completeTheLook: ["ml-002", "ml-006", "ml-012"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "ml-006",
    slug: "pantalon-pleat-trouser",
    name: "Le Pantalon",
    tagline: "Single-pleat wool trouser",
    price: 590,
    currency: "EUR",
    category: "Trousers",
    collection: "Permanent",
    swatch: "#36332b",
    swatchAccent: "#54503f",
    colorName: "Olive",
    colors: [
      { name: "Olive", swatch: "#36332b", accent: "#54503f" },
      { name: "Charcoal", swatch: "#2f2e2c", accent: "#4a4844" },
      { name: "Stone", swatch: "#9a9180", accent: "#b3aa98" },
    ],
    sizes: ["44", "46", "48", "50", "52"],
    materials: ["High-twist wool", "Curtained waistband"],
    description:
      "A high-rise trouser with a single forward pleat that releases into a clean, tapering line.",
    story:
      "High-twist wool keeps its press and resists the creases of travel. A curtained waistband and side adjusters mean the trouser sits exactly where it should, with the hem left unfinished for your tailor.",
    details: ["Curtained waistband", "Side adjusters", "Unfinished hem for tailoring"],
    care: ["Dry clean", "Press with a cloth"],
    rating: 4.7,
    reviewCount: 142,
    reviews: sampleReviews("Le Pantalon"),
    completeTheLook: ["ml-002", "ml-005", "ml-003"],
  },
  {
    id: "ml-007",
    slug: "trench-gabardine",
    name: "Le Trench",
    tagline: "Cotton gabardine trench coat",
    price: 1790,
    currency: "EUR",
    category: "Outerwear",
    collection: "Permanent",
    swatch: "#b8a888",
    swatchAccent: "#9c8d6f",
    colorName: "Sable",
    colors: [
      { name: "Sable", swatch: "#b8a888", accent: "#9c8d6f" },
      { name: "Noir", swatch: "#1a1a1c", accent: "#34343a" },
    ],
    sizes: ["44", "46", "48", "50", "52"],
    materials: ["Tightly woven cotton gabardine", "Removable wool liner"],
    description:
      "The archetypal trench rendered in densely woven gabardine, weatherproof and softly broken-in from the first wear.",
    story:
      "The gabardine is woven so tightly it sheds rain, then garment-washed for an immediate softness. A removable wool liner buttons in for winter and out for spring — one coat for three seasons.",
    details: ["Storm shield & gun flap", "Removable wool liner", "Buckled cuff straps"],
    care: ["Dry clean", "Reproof annually"],
    rating: 4.8,
    reviewCount: 109,
    reviews: sampleReviews("Le Trench"),
    completeTheLook: ["ml-003", "ml-006"],
  },
  {
    id: "ml-008",
    slug: "cardigan-cable-knit",
    name: "Le Cardigan",
    tagline: "Hand-framed cable cardigan",
    price: 780,
    currency: "EUR",
    category: "Knitwear",
    collection: "Hiver",
    swatch: "#43352a",
    swatchAccent: "#5f4c3c",
    colorName: "Tabac",
    colors: [
      { name: "Tabac", swatch: "#43352a", accent: "#5f4c3c" },
      { name: "Brume", swatch: "#9aa0a6", accent: "#7e858c" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["Lambswool & cashmere blend"],
    description:
      "A substantial cable cardigan hand-framed in the Scottish Borders, with leather-trimmed buttons.",
    story:
      "Hand-framed on a vintage loom, the Aran cable front carries real weight and warmth. Buttons are bound in vegetable-tanned leather that patinas alongside the wool.",
    details: ["Aran cable front", "Leather-bound buttons", "Ribbed shawl collar"],
    care: ["Hand wash cold", "Dry flat", "De-pill seasonally"],
    rating: 4.6,
    reviewCount: 73,
    reviews: sampleReviews("Le Cardigan"),
    completeTheLook: ["ml-005", "ml-006"],
  },
  {
    id: "ml-009",
    slug: "robe-chemise-dress",
    name: "Robe Chemise",
    tagline: "Belted poplin shirt dress",
    price: 690,
    currency: "EUR",
    category: "Dresses",
    collection: "Permanent",
    swatch: "#2b3a33",
    swatchAccent: "#46544b",
    colorName: "Sapin",
    colors: [
      { name: "Sapin", swatch: "#2b3a33", accent: "#46544b" },
      { name: "Blanc", swatch: "#f2efe9", accent: "#dcd6c9" },
    ],
    sizes: ["34", "36", "38", "40", "42"],
    materials: ["Cotton-silk poplin"],
    description:
      "A shirt dress with the precision of tailoring — sharp collar, deep cuffs, and a self-belt to define the waist.",
    story:
      "A cotton-silk poplin lends a faint lustre and a fluid drape. Cut with the discipline of a shirt and the ease of a dress, finished with a self-belt to draw in the waist.",
    details: ["Self-fabric belt", "Pleated back yoke", "Tonal horn buttons"],
    care: ["Machine wash 30°", "Iron damp"],
    rating: 4.7,
    reviewCount: 58,
    reviews: sampleReviews("Robe Chemise"),
    completeTheLook: ["ml-001", "ml-011"],
    isNew: true,
  },
  {
    id: "ml-010",
    slug: "veste-cuir-jacket",
    name: "La Veste",
    tagline: "Nappa leather blouson",
    price: 2450,
    currency: "EUR",
    category: "Outerwear",
    collection: "Permanent",
    swatch: "#23211e",
    swatchAccent: "#3d3a34",
    colorName: "Noir",
    colors: [
      { name: "Noir", swatch: "#23211e", accent: "#3d3a34" },
      { name: "Cognac", swatch: "#5a3923", accent: "#7a4f30" },
    ],
    sizes: ["46", "48", "50", "52"],
    materials: ["Lamb nappa leather", "Quilted satin lining"],
    description:
      "A blouson in butter-soft lamb nappa, garment-dyed for depth and finished with a knitted hem.",
    story:
      "Each hide is selected by hand and garment-dyed after construction, so the colour settles into every seam and fold. The leather is so supple it folds like cloth and softens further with wear.",
    details: ["Garment-dyed nappa", "Knitted rib hem & cuffs", "Hidden zip pockets"],
    care: ["Leather specialist only", "Condition twice yearly", "Avoid prolonged sun"],
    rating: 4.9,
    reviewCount: 81,
    reviews: sampleReviews("La Veste"),
    completeTheLook: ["ml-003", "ml-006"],
    isLimited: true,
    isBestseller: true,
  },
  {
    id: "ml-011",
    slug: "pull-cachemire",
    name: "Le Pull",
    tagline: "Crew-neck cashmere sweater",
    price: 620,
    currency: "EUR",
    category: "Knitwear",
    collection: "Permanent",
    swatch: "#9aa0a6",
    swatchAccent: "#7e858c",
    colorName: "Brume",
    colors: [
      { name: "Brume", swatch: "#9aa0a6", accent: "#7e858c" },
      { name: "Ivoire", swatch: "#e7e1d4", accent: "#cfc6b2" },
      { name: "Marine", swatch: "#23303f", accent: "#3b4a5c" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["Grade-A Inner Mongolian cashmere"],
    description:
      "A four-ply crew-neck with quiet heft, knitted to soften beautifully with every wear.",
    story:
      "Four plies of grade-A Inner Mongolian cashmere give this crew-neck its quiet weight. Long fibres mean less pilling and more years — a sweater built to be reached for again and again.",
    details: ["Four-ply cashmere", "Fully fashioned", "Ribbed trims"],
    care: ["Hand wash cold", "Dry flat", "Store folded with cedar"],
    rating: 4.8,
    reviewCount: 165,
    reviews: sampleReviews("Le Pull"),
    completeTheLook: ["ml-006", "ml-001"],
    isBestseller: true,
  },
  {
    id: "ml-012",
    slug: "smoking-tuxedo",
    name: "Le Smoking",
    tagline: "Grosgrain-lapel dinner jacket",
    price: 2290,
    currency: "EUR",
    category: "Tailoring",
    collection: "Soirée",
    swatch: "#191a1d",
    swatchAccent: "#2f3136",
    colorName: "Encre",
    colors: [
      { name: "Encre", swatch: "#191a1d", accent: "#2f3136" },
      { name: "Bordeaux", swatch: "#3a1f29", accent: "#5e3340" },
    ],
    sizes: ["46", "48", "50", "52", "54"],
    materials: ["Wool-mohair barathea", "Silk grosgrain facing"],
    description:
      "An evening jacket cut from wool-mohair barathea with a peaked grosgrain lapel — the house's answer to black tie.",
    story:
      "Wool-mohair barathea gives a deep, dry lustre that catches the light without shine. The peaked lapel is faced in silk grosgrain and the buttons covered by hand — black tie, in its most distilled form.",
    details: ["Peaked grosgrain lapel", "Covered buttons", "Jetted pockets"],
    care: ["Dry clean", "Rest on a broad hanger"],
    rating: 4.9,
    reviewCount: 47,
    reviews: sampleReviews("Le Smoking"),
    completeTheLook: ["ml-005", "ml-004"],
    isLimited: true,
  },
];

export const categories: Category[] = [
  "Outerwear",
  "Tailoring",
  "Knitwear",
  "Dresses",
  "Shirts",
  "Trousers",
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(
      products.filter((p) => p.id !== product.id && p.category !== product.category),
    )
    .slice(0, limit);
}

export function getCompleteTheLook(product: Product): Product[] {
  return product.completeTheLook
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colorName.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q)),
  );
}

/** Unique colour names across the catalogue, for filter UIs. */
export function allColors(): string[] {
  return Array.from(
    new Set(products.flatMap((p) => p.colors.map((c) => c.name))),
  ).sort();
}

/** Unique sizes across the catalogue. */
export function allSizes(): string[] {
  const order = ["XS", "S", "M", "L", "XL"];
  const set = Array.from(new Set(products.flatMap((p) => p.sizes)));
  return set.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia > -1 && ib > -1) return ia - ib;
    if (ia > -1) return -1;
    if (ib > -1) return 1;
    return Number(a) - Number(b);
  });
}

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
