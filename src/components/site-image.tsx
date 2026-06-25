import Image from "next/image";
import { unsplash } from "@/lib/images";

/**
 * Editorial backdrop for marketing sections: a curated Unsplash photo layered
 * over whatever gradient the section already paints. The gradient renders first
 * (instant paint + fallback if the photo is unavailable); the photo covers it
 * once loaded, and an optional `scrim` keeps overlaid text legible.
 */
export function SiteImage({
  id,
  alt,
  priority = false,
  sizes = "100vw",
  scrim,
  className = "",
}: {
  id: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** CSS background for a legibility overlay painted above the photo. */
  scrim?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={unsplash(id)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {scrim && <div className="absolute inset-0" style={{ background: scrim }} />}
    </div>
  );
}
