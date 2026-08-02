const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const GROWTH_SERVICE = { id: "growth", title: "Growth Marketing", icon: "TrendingUp", description: "Programmatic scaling & acquisition", order: 4 };

const PACKAGES_TO_UPDATE_OR_CREATE = [
  // Growth Packages
  { id: "growth-starter", serviceId: "growth", title: "Growth Starter", price: 2500, time: "Monthly", features: ["Local SEO Optimization", "Basic Meta Ads", "Monthly Analytics Report", "Standard Support"], order: 1 },
  { id: "growth-pro", serviceId: "growth", title: "Growth Pro", price: 6000, time: "Monthly", features: ["Full Technical SEO", "Omnichannel Ad Management", "Conversion Rate Optimization", "Priority Support"], order: 2 },
  { id: "growth-enterprise", serviceId: "growth", title: "Growth Enterprise", price: 12000, time: "Monthly", features: ["Custom Funnel Engineering", "Brand Positioning Strategy", "Dedicated Growth Team", "24/7 Priority Support"], order: 3 },
  
  // Update AI Custom to Enterprise
  { id: "custom", serviceId: "ai", title: "Enterprise Custom Agent", price: 10000, time: "10+ Weeks", features: ["Custom LLM Training", "Complex Reasoning", "API Development", "Secure Data Handling", "SLA Guarantee"], order: 3 },
  
  // Add Brand Enterprise
  { id: "brand-enterprise", serviceId: "brand", title: "Enterprise Identity", price: 15000, time: "8+ Weeks", features: ["Global Brand Architecture", "Custom Typeface", "Complete Sonic Identity", "3D Motion System", "24/7 Agency Support"], order: 3 }
];

async function main() {
  console.log("Seeding Phase 5 Additions...");
  
  // Upsert Growth Service
  await prisma.cmsService.upsert({
    where: { id: GROWTH_SERVICE.id },
    update: GROWTH_SERVICE,
    create: GROWTH_SERVICE
  });
  
  // Upsert Packages
  for (const pkg of PACKAGES_TO_UPDATE_OR_CREATE) {
    await prisma.cmsPackage.upsert({
      where: { id: pkg.id },
      update: pkg,
      create: pkg
    });
  }
  
  console.log("Phase 5 Seeding successful!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
