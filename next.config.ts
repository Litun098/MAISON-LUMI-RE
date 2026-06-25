import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash's CDN handles resizing/format; bypass Next's server-side
    // optimizer to avoid per-request fetch + sharp re-encode stalls in dev.
    loader: "custom",
    loaderFile: "./src/lib/unsplash-loader.ts",
  },
};

export default nextConfig;
