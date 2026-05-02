import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cache optimized images for 31 days to reduce re-transformations
    minimumCacheTTL: 2678400,
    // webp only — avif+webp doubles transformations for minimal gain
    formats: ["image/webp"],
    // Lock quality to one value to prevent multiple cached variants
    qualities: [75],
    // Trim to sizes actually used in the layout
    deviceSizes: [640, 1080, 1920],
    imageSizes: [256, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
