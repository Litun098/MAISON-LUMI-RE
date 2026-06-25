export type Currency = "EUR";

export interface ColorVariant {
  name: string;
  swatch: string;
  accent: string;
}

export interface Review {
  author: string;
  location: string;
  rating: number; // 1-5
  title: string;
  body: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Short editorial subtitle, e.g. "Italian wool overcoat" */
  tagline: string;
  price: number;
  /** Optional original price for archive/sale pieces */
  compareAtPrice?: number;
  currency: Currency;
  category: Category;
  collection: string;
  /** Primary hero colour rendered as CSS art (no binaries) */
  swatch: string;
  swatchAccent: string;
  colorName: string;
  /** Unsplash photo IDs — the gradient swatch is the loading/fallback layer */
  images: string[];
  /** Selectable colourways */
  colors: ColorVariant[];
  sizes: string[];
  materials: string[];
  description: string;
  /** Longer fabric / atelier narrative */
  story: string;
  details: string[];
  care: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  /** Product ids that complete the look */
  completeTheLook: string[];
  isNew?: boolean;
  isLimited?: boolean;
  isBestseller?: boolean;
}

export type Category =
  | "Outerwear"
  | "Tailoring"
  | "Knitwear"
  | "Dresses"
  | "Shirts"
  | "Trousers";

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface WishItem {
  productId: string;
}
