"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { unsplash } from "@/lib/images";
import { ProductSwatch } from "./product-swatch";

/**
 * Real product photography layered over the CSS gradient swatch. The swatch is
 * the base — it renders instantly, covers the image while it loads, and remains
 * visible as a graceful fallback if the photo is missing or fails to load.
 *
 * `showPhoto` lets callers suppress the photo (e.g. when a colourway is selected
 * that the photo doesn't depict) so the tinted swatch shows the chosen colour.
 */
export function ProductImage({
  product,
  index = 0,
  showPhoto = true,
  swatch,
  accent,
  label,
  monogram = true,
  seed = 0,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  product: Product;
  index?: number;
  showPhoto?: boolean;
  swatch?: string;
  accent?: string;
  label?: string;
  monogram?: boolean;
  seed?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const id = product.images?.[index];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const render = showPhoto && Boolean(id) && !failed;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* gradient swatch — loading + fallback layer */}
      <ProductSwatch
        product={product}
        swatch={swatch}
        accent={accent}
        label={label}
        monogram={monogram}
        seed={seed}
        className="absolute inset-0 h-full w-full"
      />
      {render && (
        <Image
          src={unsplash(id!)}
          alt={`${product.name} — ${product.tagline}`}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-opacity duration-700 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
