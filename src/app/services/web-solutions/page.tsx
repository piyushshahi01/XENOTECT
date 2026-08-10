import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import WebClientPage from "./WebClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
export const metadata: Metadata = {
  title: "Custom Web Development Services — Next.js, React & SaaS",
  description:
    "Expert custom web development agency. We build high-performance websites, SaaS platforms, ecommerce stores, and web apps using Next.js, React, TypeScript, and Tailwind CSS. Fast, scalable, and SEO-ready.",
  keywords: [
    "custom web development", "Next.js agency", "React development agency",
    "SaaS development", "ecommerce website development", "web app development",
    "hire Next.js developer", "TypeScript developer", "Tailwind CSS development",
    "full stack development", "website redesign", "landing page development",
    "web development India", "affordable web development",
  ],
  openGraph: {
    title: "Custom Web Development — Next.js, React & SaaS | XENOTECT",
    description: "High-performance custom websites and web apps built with Next.js, React & TypeScript.",
    url: "https://xenotect.com/services/web-solutions",
    images: [{ url: "https://xenotect.com/og-image.png", width: 1200, height: 630, alt: "Custom Web Development by XENOTECT" }],
  },
  alternates: { canonical: "https://xenotect.com/services/web-solutions" },
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
      price: isCustom ? "Custom" : `$${pkg.priceUsd.toLocaleString('en-US')}`,
      priceInr: isCustom ? "" : `₹${pkg.priceInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
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
        name="Web & SaaS Architecture" 
        description="Premium web development, SaaS platforms, and enterprise digital experiences engineered for performance." 
        url="https://xenotect.com/services/web-solutions" 
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://xenotect.com" },
        { name: "Services", url: "https://xenotect.com/#services" },
        { name: "Web Development", url: "https://xenotect.com/services/web-solutions" },
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
