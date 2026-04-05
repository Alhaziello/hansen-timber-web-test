import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/journal',
        permanent: true,
      },
      {
        source: '/types-of-wood',
        destination: '/species',
        permanent: true,
      },
      {
        source: '/types-of-wood/:slug*', 
        destination: '/species/:slug*',
        permanent: true,
      },
      {
        source: '/your-projects',
        destination: '/gallery',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
