import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary (common CMS image host)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Uploadthing / direct uploads
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      // AWS S3 / Supabase storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      // GitHub CDN (raw.githubusercontent) for blog cover images
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      // General placeholder services
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      // Luma / Runway / AI-generated image CDNs
      {
        protocol: "https",
        hostname: "cdn.lumalabs.ai",
      },
      // Any other domains you use for blog cover images
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
    // Enable next-gen WebP/AVIF formats for automatic image optimization
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
