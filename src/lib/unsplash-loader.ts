import type { ImageLoaderProps } from "next/image";

/**
 * Custom next/image loader that defers resizing to Unsplash's own image CDN
 * rather than Next's server-side optimizer.
 *
 * Unsplash already serves auto-formatted, width-resized images from its CDN, so
 * routing through `/_next/image` only adds a server-side fetch + sharp re-encode
 * on every request — which on a slow disk or flaky connection stalls and times
 * out ("other side closed"). With this loader the browser requests an
 * appropriately sized image straight from Unsplash, and `next/image` still
 * generates the responsive `srcset` for each width.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const q = quality ?? 80;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}auto=format&fit=crop&w=${width}&q=${q}`;
}
