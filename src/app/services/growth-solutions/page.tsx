import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import GrowthClientPage from "./GrowthClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
export const metadata: Metadata = {
  title: "Digital Marketing & SEO Agency — Performance Ads & Growth | XENOTECT",
  description:
    "XENOTECT is an elite digital marketing and SEO agency. We engineer data-driven growth pipelines through programmatic SEO, Google Ads, Meta Ads, B2B lead generation, and conversion rate optimization to scale your revenue exponentially.",
  keywords: [
    "digital marketing agency", "top SEO agency", "Google Ads management agency", "Meta ads agency",
    "performance marketing company", "social media marketing services", "brand strategy agency",
    "B2B lead generation agency", "CRO agency", "conversion rate optimization services",
    "ecommerce marketing agency", "Shopify marketing experts", "SaaS marketing agency",
    "growth hacking agency", "ROAS optimization", "local SEO services", "programmatic SEO agency",
    "content marketing agency", "digital PR agency", "best marketing agency USA", 
    "digital marketing agency India", "hire SEO experts", "search engine optimization company",
    "PPC management services", "B2B marketing consultants"
  ],
  authors: [{ name: "XENOTECT" }],
  category: "marketing",
  openGraph: {
    title: "Digital Marketing & SEO Agency | XENOTECT",
    description: "SEO, Google Ads, Meta campaigns, and aggressive growth marketing strategies engineered for maximum ROI.",
    url: "https://www.xenotectsolution.com/services/growth-solutions",
    siteName: "XENOTECT",
    images: [{ 
      url: "https://www.xenotectsolution.com/og-image.png", 
      width: 1200, 
      height: 630, 
      alt: "Digital Marketing and SEO Agency by XENOTECT" 
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & SEO Agency | XENOTECT",
    description: "SEO, Google Ads, Meta campaigns, and aggressive growth marketing strategies engineered for maximum ROI.",
    images: ["https://www.xenotectsolution.com/og-image.png"],
  },
  alternates: { 
    canonical: "https://www.xenotectsolution.com/services/growth-solutions",
    languages: {
      'en-US': 'https://www.xenotectsolution.com/services/growth-solutions',
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

export default async function PremiumGrowthSolutions() {
  const packagesData = await prisma.cmsPackage.findMany({
    where: { serviceId: "growth" },
    orderBy: { order: "asc" }
  });

  const ratesData = await getExchangeRates();
  const globalSettings = await prisma.cmsGlobalSetting.findUnique({ where: { id: "global" } });
  
  const exchangeRate = globalSettings?.exchangeRate || ratesData?.rates?.INR || 83.5;
  const basePrice = globalSettings?.basePriceGr || (packagesData.length > 0 ? packagesData[0].priceUsd : 2500);

  const growthTiers = await Promise.all(packagesData.map(async (pkg, i) => {
    
    // Check if it's the custom/enterprise tier (e.g. price > 10000 or specific ID)
    const isCustom = pkg.id.includes("enterprise") || pkg.id.includes("custom");

    return {
      id: pkg.id,
      name: pkg.title,
      price: isCustom ? "Custom" : `$${pkg.priceUsd.toLocaleString('en-US')}`,
      priceInr: isCustom ? "" : `₹${pkg.priceInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      description: `Timeline: ${pkg.time}`,
      features: pkg.features,
      detailedContent: pkg.detailedContent,
      isPopular: i === 1
    };
  }));

  const comparisonFeatures = await prisma.cmsComparisonFeature.findMany({
    where: { serviceId: "growth" },
    orderBy: { order: "asc" }
  });

  const cmsFeatures = await prisma.cmsFeature.findMany({
    where: { category: "growth" },
    orderBy: { order: "asc" }
  });

  return (
    <>
      <ChromaBackground />
      <ServiceSchema 
        name="Digital Marketing & SEO Agency" 
        description="Elite performance marketing, technical SEO, programmatic architectures, Google Ads, Meta campaigns, and B2B lead generation engineered for scale." 
        url="https://www.xenotectsolution.com/services/growth-solutions" 
        category="Digital Marketing & SEO"
        areaServed={["US", "GB", "CA", "AU", "IN", "Worldwide"]}
        audience="B2B, Startups, Enterprises, E-commerce"
        offers={{
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "2500",
          "highPrice": "40000",
          "offerCount": "3"
        }}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.xenotectsolution.com" },
        { name: "Services", url: "https://www.xenotectsolution.com/#services" },
        { name: "Growth & Marketing", url: "https://www.xenotectsolution.com/services/growth-solutions" },
      ]} />
      <GrowthClientPage 
        growthTiers={growthTiers} 
        exchangeRate={exchangeRate} 
        basePrice={basePrice} 
        comparisonFeatures={comparisonFeatures}
        cmsFeatures={cmsFeatures}
      />
    </>
  );
}
