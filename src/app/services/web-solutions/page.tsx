import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import WebClientPage from "./WebClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
export const metadata: Metadata = {
  title: "Website & SaaS Development Company — Custom Web Apps | XENOTECT",
  description:
    "XENOTECT is an elite custom web development company. We engineer high-performance SaaS platforms, corporate websites, scalable e-commerce stores, and complex web applications using React, Next.js, and Node.",
  keywords: [
    "custom website development company", "top web development agency", "SaaS development company",
    "React.js development agency", "Next.js development company", "Node.js development services",
    "web application development company", "e-commerce website development", "Shopify headless commerce",
    "enterprise web development", "B2B website development", "startup MVP development",
    "website redesign agency", "frontend development agency", "backend architecture design",
    "custom software development company", "web development company India", "web development agency USA",
    "hire React developers", "hire Next.js developers", "UI/UX web development",
    "high performance websites", "custom web portal development", "API integration services"
  ],
  authors: [{ name: "XENOTECT" }],
  category: "technology",
  openGraph: {
    title: "Website & SaaS Development Company | XENOTECT",
    description: "High-performance custom websites, SaaS platforms, and enterprise web applications engineered with Next.js & React.",
    url: "https://www.xenotectsolution.com/services/web-solutions",
    siteName: "XENOTECT",
    images: [{ 
      url: "https://www.xenotectsolution.com/og-image.png", 
      width: 1200, 
      height: 630, 
      alt: "Custom Website and Web App Development by XENOTECT" 
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website & SaaS Development Company | XENOTECT",
    description: "High-performance custom websites, SaaS platforms, and enterprise web applications engineered with Next.js & React.",
    images: ["https://www.xenotectsolution.com/og-image.png"],
  },
  alternates: { 
    canonical: "https://www.xenotectsolution.com/services/web-solutions",
    languages: {
      'en-US': 'https://www.xenotectsolution.com/services/web-solutions',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function PremiumWebSolutions() {
  const packagesData = await prisma.cmsPackage.findMany({
    where: { serviceId: "web" },
    orderBy: { order: "asc" }
  });

  const ratesData = await getExchangeRates();
  const globalSettings = await prisma.cmsGlobalSetting.findUnique({ where: { id: "global" } });
  
  const exchangeRate = globalSettings?.exchangeRate || ratesData?.rates?.INR || 83.5;
  const basePrice = globalSettings?.basePriceWeb || (packagesData.length > 0 ? packagesData[0].priceUsd : 2000);

  const webTiers = await Promise.all(packagesData.map(async (pkg, i) => {
    
    // Check if it's the custom/enterprise tier
    const isCustom = pkg.id.includes("enterprise") || pkg.id.includes("custom");

    return {
      id: pkg.id,
      name: pkg.title,
      price: isCustom ? "Custom" : `Starting at ₹${pkg.priceInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      priceInr: isCustom ? "" : `(~$${pkg.priceUsd.toLocaleString('en-US')})`,
      description: `Timeline: ${pkg.time}`,
      features: pkg.features,
      detailedContent: pkg.detailedContent,
      isPopular: i === 1 // Typically the middle package
    };
  }));

  const comparisonFeatures = await prisma.cmsComparisonFeature.findMany({
    where: { serviceId: "web" },
    orderBy: { order: "asc" }
  });

  const cmsFeatures = await prisma.cmsFeature.findMany({
    where: { category: "web" },
    orderBy: { order: "asc" }
  });

  return (
    <>
      <ChromaBackground />
      <ServiceSchema 
        name="Custom Web & SaaS Development Company" 
        description="Premium web development services. We engineer custom SaaS platforms, complex web applications, and enterprise digital experiences using Next.js, React, Node, and TypeScript." 
        url="https://www.xenotectsolution.com/services/web-solutions" 
        category="Software Development"
        areaServed={["US", "GB", "CA", "AU", "IN", "Worldwide"]}
        audience="B2B, Startups, Enterprises"
        offers={{
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "2000",
          "highPrice": "150000",
          "offerCount": "3"
        }}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.xenotectsolution.com" },
        { name: "Services", url: "https://www.xenotectsolution.com/#services" },
        { name: "Web Development", url: "https://www.xenotectsolution.com/services/web-solutions" },
      ]} />
      <WebClientPage 
        webTiers={webTiers} 
        exchangeRate={exchangeRate} 
        basePrice={basePrice} 
        comparisonFeatures={comparisonFeatures}
        cmsFeatures={cmsFeatures}
      />
    </>
  );
}
