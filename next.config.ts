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
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      // Figma prototypes / external assets
      {
        protocol: "https",
        hostname: "*.figma.site",
      },
    ],
    // Enable next-gen WebP/AVIF formats for automatic image optimization
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Security + SEO headers on all routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HSTS — tells browsers to always use HTTPS (flagged by Lighthouse)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // COOP — origin isolation (flagged by Lighthouse best practices)
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // CSP — prevents XSS (flagged by Lighthouse)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://prod.spline.design",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob:",
              "connect-src 'self' https://prod.spline.design https://*.vercel-insights.com",
              "frame-src 'self' https://prod.spline.design",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
      {
        // Aggressive caching for static assets — speeds up repeat visits massively
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/services/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        // Cache fonts and images aggressively
        source: "/:path*\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
