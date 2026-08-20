import prisma from "@/lib/prisma";
import { formatDualCurrency } from "@/lib/currency";
import AIClientPage from "./AIClient";
import { getExchangeRates } from "@/lib/currency";
import type { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
export const metadata: Metadata = {
  title: "AI Solutions & Automation Agency — Voice AI, Chatbots & AI Agents | XENOTECT",
  description:
    "XENOTECT is a premier AI solutions agency. We engineer custom AI agents, human-sounding Voice AI, RAG pipelines, OpenAI integrations, LangChain apps, n8n workflows, and intelligent chatbots that radically automate business operations and scale revenue.",
  keywords: [
    "AI solutions agency", "AI automation agency", "voice AI development", "custom chatbot development",
    "AI agents", "OpenAI API integration", "ChatGPT integration", "LangChain development company",
    "n8n automation experts", "business workflow automation", "AI for enterprise", "AI for small business",
    "custom AI development", "intelligent automation services", "RAG development", "vector database implementation",
    "AI customer support agents", "AI lead generation bots", "Twilio AI voice agents", "Vapi voice AI",
    "machine learning agency", "LLM fine tuning", "custom LLM deployment", "AI consulting services",
    "digital transformation AI", "AI engineering studio", "top AI agency USA", "top AI agency India",
    "AI software development company", "hire AI developers"
  ],
  authors: [{ name: "XENOTECT" }],
  category: "technology",
  openGraph: {
    title: "AI Solutions & Automation Agency | XENOTECT",
    description: "Custom AI agents, voice AI, chatbots and automation workflows that transform how modern businesses operate and scale.",
    url: "https://www.xenotectsolution.com/services/ai-solutions",
    siteName: "XENOTECT",
    images: [{ 
      url: "https://www.xenotectsolution.com/og-image.png", 
      width: 1200, 
      height: 630, 
      alt: "AI Solutions, Automation, and Custom AI Agents by XENOTECT" 
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Automation Agency | XENOTECT",
    description: "Custom AI agents, voice AI, chatbots and automation workflows that transform how modern businesses operate.",
    images: ["https://www.xenotectsolution.com/og-image.png"],
  },
  alternates: { 
    canonical: "https://www.xenotectsolution.com/services/ai-solutions",
    languages: {
      'en-US': 'https://www.xenotectsolution.com/services/ai-solutions',
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
      <ChromaBackground />
      <ServiceSchema 
        name="AI Solutions & Automation Agency" 
        description="Premium artificial intelligence engineering. We develop custom AI agents, conversational voice AI, generative AI workflows, RAG systems, and enterprise LLM integrations using OpenAI, Claude, and LangChain." 
        url="https://www.xenotectsolution.com/services/ai-solutions" 
        category="Artificial Intelligence Development"
        areaServed={["US", "GB", "CA", "AU", "IN", "Worldwide"]}
        audience="B2B, Startups, Enterprises"
        offers={{
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "3000",
          "highPrice": "50000",
          "offerCount": "3"
        }}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.xenotectsolution.com" },
        { name: "Services", url: "https://www.xenotectsolution.com/#services" },
        { name: "AI Solutions", url: "https://www.xenotectsolution.com/services/ai-solutions" },
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
