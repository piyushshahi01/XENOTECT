import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import GrowthClientPage from "./GrowthClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
export const metadata: Metadata = {
  title: "Digital Marketing Agency — SEO, Performance Ads & Brand Growth",
  description:
    "Full-service digital marketing agency. We drive growth through technical SEO, Google Ads, Meta campaigns, brand engineering, and social media acquisition strategies that generate measurable ROI.",
  keywords: [
    "digital marketing agency", "SEO agency", "Google Ads agency", "Meta ads agency",
    "performance marketing", "social media marketing", "brand strategy agency",
    "content marketing", "lead generation agency", "CRO agency",
    "ecommerce marketing", "B2B marketing agency", "startup marketing",
    "growth hacking agency", "ROAS optimization",
  ],
  openGraph: {
    title: "Digital Marketing & SEO Agency | XENOTECT",
    description: "SEO, Google Ads, Meta campaigns and brand growth strategies that generate real business results.",
    url: "https://xenotect.com/services/growth-solutions",
    images: [{ url: "https://xenotect.com/og-image.png", width: 1200, height: 630, alt: "Digital Marketing Agency by XENOTECT" }],
  },
  alternates: { canonical: "https://xenotect.com/services/growth-solutions" },
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
        name="Growth & Marketing" 
        description="Data-driven marketing, SEO, and paid acquisition designed to scale digital businesses predictably." 
        url="https://xenotect.com/services/growth-solutions" 
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://xenotect.com" },
        { name: "Services", url: "https://xenotect.com/#services" },
        { name: "Growth & Marketing", url: "https://xenotect.com/services/growth-solutions" },
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
