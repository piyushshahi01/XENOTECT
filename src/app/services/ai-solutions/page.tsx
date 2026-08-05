import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import AIClientPage from "./AIClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Solutions & Automation Agency — Voice AI, Chatbots & AI Agents",
  description:
    "Custom AI solutions for businesses. We build AI agents, voice AI, ChatGPT integrations, LangChain apps, n8n automation workflows, and intelligent chatbots that save time and drive revenue.",
  keywords: [
    "AI solutions agency", "AI automation", "voice AI development", "chatbot development",
    "AI agents", "OpenAI integration", "ChatGPT API", "LangChain development",
    "n8n automation", "business automation AI", "AI for business",
    "custom AI development", "intelligent automation", "RAG development",
    "AI customer support", "AI lead generation",
  ],
  openGraph: {
    title: "AI Solutions & Automation | XENOTECT",
    description: "Custom AI agents, voice AI, chatbots and automation workflows that transform how businesses operate.",
    url: "https://xenotect.com/services/ai-solutions",
    images: [{ url: "https://xenotect.com/og-image.png", width: 1200, height: 630, alt: "AI Solutions by XENOTECT" }],
  },
  alternates: { canonical: "https://xenotect.com/services/ai-solutions" },
};

export default async function PremiumAISolutions() {
  const packagesData = await prisma.cmsPackage.findMany({
    where: { serviceId: "ai" },
    orderBy: { order: "asc" }
  });

  const ratesData = await getExchangeRates();
  const globalSettings = await prisma.cmsGlobalSetting.findUnique({ where: { id: "global" } });
  
  const exchangeRate = globalSettings?.exchangeRate || ratesData?.rates?.INR || 83.5;
  const basePrice = globalSettings?.basePriceAi || (packagesData.length > 0 ? packagesData[0].priceUsd : 3000);

  const aiTiers = await Promise.all(packagesData.map(async (pkg, i) => {
    
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
      isPopular: i === 1,
      category: (pkg as any).category || "default"
    };
  }));

  const comparisonFeatures = await prisma.cmsComparisonFeature.findMany({
    where: { serviceId: "ai" },
    orderBy: { order: "asc" }
  });

  const cmsFeatures = await prisma.cmsFeature.findMany({
    where: { category: "ai" },
    orderBy: { order: "asc" }
  });

  return (
    <>
      <ServiceSchema 
        name="AI Solutions & Automation" 
        description="Custom AI agents, voice AI, chatbots and automation workflows that transform how businesses operate." 
        url="https://xenotect.com/services/ai-solutions" 
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://xenotect.com" },
        { name: "Services", url: "https://xenotect.com/#services" },
        { name: "AI Solutions", url: "https://xenotect.com/services/ai-solutions" },
      ]} />
      <AIClientPage 
        aiTiers={aiTiers} 
        exchangeRate={exchangeRate} 
        basePrice={basePrice} 
        comparisonFeatures={comparisonFeatures}
        cmsFeatures={cmsFeatures}
      />
    </>
  );
}
