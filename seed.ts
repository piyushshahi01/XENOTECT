import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CMS Services...");
  
  // 1. Services
  await prisma.cmsService.upsert({
    where: { id: "web" },
    update: {},
    create: {
      id: "web",
      title: "Web Solutions",
      description: "High-performance web applications and landing pages.",
      icon: "Code",
      order: 1,
    }
  });

  await prisma.cmsService.upsert({
    where: { id: "ai" },
    update: {},
    create: {
      id: "ai",
      title: "AI Solutions",
      description: "Custom AI agents and cognitive workflows.",
      icon: "Cpu",
      order: 2,
    }
  });

  await prisma.cmsService.upsert({
    where: { id: "growth" },
    update: {},
    create: {
      id: "growth",
      title: "Growth & SEO",
      description: "Data-driven marketing and SEO automation.",
      icon: "Palette",
      order: 3,
    }
  });

  // 2. Packages (Web)
  await prisma.cmsPackage.upsert({
    where: { id: "web-starter" },
    update: {},
    create: {
      id: "web-starter",
      serviceId: "web",
      title: "Landing Page",
      priceUsd: 1500,
      priceInr: 120000,
      time: "2 Weeks",
      features: ["Next.js Frontend", "Responsive Design", "Basic Animations"],
      order: 1,
    }
  });
  
  await prisma.cmsPackage.upsert({
    where: { id: "web-pro" },
    update: {},
    create: {
      id: "web-pro",
      serviceId: "web",
      title: "Full Stack App",
      priceUsd: 5000,
      priceInr: 400000,
      time: "6 Weeks",
      features: ["Full Stack Next.js", "Database & Auth", "Admin Panel"],
      order: 2,
    }
  });

  // AI Packages
  await prisma.cmsPackage.upsert({
    where: { id: "ai-agent" },
    update: {},
    create: {
      id: "ai-agent",
      serviceId: "ai",
      title: "AI Voice Agent",
      priceUsd: 2500,
      priceInr: 200000,
      time: "3 Weeks",
      features: ["Custom Voice Model", "Real-time TTS/STT", "Knowledge Base Integration"],
      order: 1,
    }
  });

  await prisma.cmsPackage.upsert({
    where: { id: "ai-workflow" },
    update: {},
    create: {
      id: "ai-workflow",
      serviceId: "ai",
      title: "Cognitive Automation",
      priceUsd: 5000,
      priceInr: 400000,
      time: "5 Weeks",
      features: ["n8n / LangChain", "Multi-Agent System", "Business Process Integration"],
      order: 2,
    }
  });

  // Growth Packages
  await prisma.cmsPackage.upsert({
    where: { id: "growth-seo" },
    update: {},
    create: {
      id: "growth-seo",
      serviceId: "growth",
      title: "SEO Strategy",
      priceUsd: 1000,
      priceInr: 80000,
      time: "Ongoing",
      features: ["Technical Audit", "Content Strategy", "Backlink Profile"],
      order: 1,
    }
  });

  await prisma.cmsPackage.upsert({
    where: { id: "growth-ads" },
    update: {},
    create: {
      id: "growth-ads",
      serviceId: "growth",
      title: "Performance Ads",
      priceUsd: 2000,
      priceInr: 150000,
      time: "Ongoing",
      features: ["Google Ads", "Meta Ads", "A/B Testing & Funnels"],
      order: 2,
    }
  });

  // 3. Features (Web Addons)
  await prisma.cmsFeature.upsert({
    where: { id: "web-hosting" },
    update: {},
    create: {
      id: "web-hosting",
      category: "web",
      stepGroup: "Add-ons",
      title: "Managed Hosting (1 Year)",
      priceUsd: 500,
      priceInr: 40000,
      isMultiplier: false,
      multiplier: 1.0,
      order: 1,
    }
  });

  await prisma.cmsFeature.upsert({
    where: { id: "web-seo" },
    update: {},
    create: {
      id: "web-seo",
      category: "web",
      stepGroup: "Add-ons",
      title: "Advanced SEO Setup",
      priceUsd: 800,
      priceInr: 65000,
      isMultiplier: false,
      multiplier: 1.0,
      order: 2,
    }
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
