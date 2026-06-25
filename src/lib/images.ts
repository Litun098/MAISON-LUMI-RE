/**
 * Central registry of premium imagery (curated Unsplash photography).
 *
 * Every entry is an Unsplash photo ID. `unsplash()` returns the base CDN URL;
 * the per-request sizing/format params (`w`, `q`, `auto=format`) are appended by
 * the custom next/image loader (`unsplash-loader.ts`), so Unsplash's own CDN
 * resizes each image rather than Next's server-side optimiser.
 * To use your own brand photography, swap the IDs for your asset URLs (or move
 * to local files in /public and update `unsplash()` accordingly).
 *
 * The comment beside each ID documents the *type of shot* intended for that
 * slot, so art direction stays consistent when images are replaced.
 */

export function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}`;
}

export const SITE_IMAGES = {
  /** Home hero — full-bleed editorial fashion portrait, moody, vertical room for type */
  hero: "1490481651871-ab68de25d43d",

  /** Home editorial split — atelier / hands at work, craft in progress */
  atelier: "1604176354204-9268737828e4",

  /** Home category tiles — a representative garment per category, portrait */
  categoryOuterwear: "1434389677669-e08b4cac3105", // tailored coat on figure
  categoryTailoring: "1507679799987-c73779587ccf", // suit / tailoring
  categoryKnitwear: "1576566588028-4147f3842f27", // knitwear close-up

  /** Newsletter modal — aspirational editorial / boutique still life */
  newsletter: "1492707892479-7bc8d5a4ee93",

  /** Boutiques hero — interior of a luxury retail space */
  boutiquesHero: "1604644401890-0bd678c83788",

  /** About hero — atelier / sewing, the hand of the maker */
  aboutHero: "1608748010899-18f300247112",

  /** About pillars — cloth (fabric macro), hand (thread/needle), promise (boutique) */
  aboutCloth: "1487222477894-8943e31ef7b2",
  aboutHand: "1556905055-8f358a7a47b2",
  aboutPromise: "1521335629791-ce4aec67dd15",
} as const;
