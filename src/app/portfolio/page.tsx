import type { Metadata } from "next";
import { WebPageSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const PortfolioClient = dynamic(() => import("./PortfolioClient"));

export const metadata: Metadata = {
  title: "Portfolio — Our Work in Web, AI & Digital Design",
  description:
    "Explore XENOTECT's portfolio of custom web development, AI solutions, and UI/UX design projects. Real results for startups, enterprises, and growing businesses worldwide.",
  keywords: [
    "web development portfolio",
    "AI solutions portfolio",
    "UI UX design portfolio",
    "agency portfolio",
    "XENOTECT projects",
    "SaaS portfolio",
    "custom website examples",
    "digital agency case studies",
  ],
  openGraph: {
    title: "Portfolio — Our Work | XENOTECT",
    description: "Real-world examples of premium web development, AI solutions, and UI/UX design by XENOTECT.",
    url: "https://www.xenotectsolution.com/portfolio",
    images: [{ url: "https://www.xenotectsolution.com/og-image.png", width: 1200, height: 630, alt: "XENOTECT Portfolio" }],
  },
  alternates: { canonical: "https://www.xenotectsolution.com/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <WebPageSchema
        name="XENOTECT Portfolio"
        description="Explore our work in web development, AI solutions, and UI/UX design."
        url="https://www.xenotectsolution.com/portfolio"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.xenotectsolution.com" },
          { name: "Portfolio", url: "https://www.xenotectsolution.com/portfolio" },
        ]}
      />
      <PortfolioClient />
    </>
  );
}
