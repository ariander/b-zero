import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Slår av Vercel sin innebygde bildeoptimalisering, siden vi allerede
    // optimaliserer bildene direkte via Sanity (urlFor). Dette sparer oss 
    // fra å bruke opp kvoten på 5000 optimaliseringer i Vercel.
    unoptimized: true,
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
  async redirects() {
    return [
      {
        source: '/om-oss',
        destination: '/kontakt',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
