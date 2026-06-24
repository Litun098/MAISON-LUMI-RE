import type { Product } from "@/lib/types";

/**
 * Renders product imagery as layered CSS gradients with an embossed serif
 * monogram. Keeps the project free of binary assets; replace with <Image>
 * and real photography for production.
 *
 * Pass `swatch`/`accent` to override the colourway (variant previews,
 * gallery angles) and `seed` to vary the lighting between gallery frames.
 */
export function ProductSwatch({
  product,
  className = "",
  monogram = true,
  swatch,
  accent,
  label,
  seed = 0,
}: {
  product: Product;
  className?: string;
  monogram?: boolean;
  swatch?: string;
  accent?: string;
  label?: string;
  seed?: number;
}) {
  const base = swatch ?? product.swatch;
  const hi = accent ?? product.swatchAccent;
  const angle = 150 + seed * 22;
  const sheenX = 25 + seed * 18;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, ${hi} 0%, ${base} 55%, ${base} 100%)`,
      }}
    >
      {/* soft sheen */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at ${sheenX}% 12%, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)`,
        }}
      />
      {/* floor vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 120%, rgba(0,0,0,0.45), rgba(0,0,0,0) 60%)",
        }}
      />
      {monogram && (
        <span
          aria-hidden
          className="font-serif absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none leading-none"
          style={{
            fontSize: "8rem",
            color: "rgba(255,255,255,0.08)",
            letterSpacing: "0.05em",
          }}
        >
          {product.name.replace(/^(Le |La |Les |L'|Robe |Col )/, "").charAt(0)}
        </span>
      )}
      <span className="eyebrow absolute bottom-4 left-4 !text-[0.62rem] text-white/70">
        {label ?? product.colorName}
      </span>
    </div>
  );
}
