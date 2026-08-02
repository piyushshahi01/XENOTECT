const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SERVICES = [
  { id: "web", title: "Web Solutions", icon: "Code", description: "High-end corporate websites & apps", order: 1 },
  { id: "ai", title: "AI Automation", icon: "Cpu", description: "Intelligent agents & custom LLMs", order: 2 },
  { id: "brand", title: "Brand Identity", icon: "Palette", description: "Premium visual design & strategy", order: 3 },
];

const PACKAGES = [
  { id: "starter", serviceId: "web", title: "Starter", price: 1500, time: "2 Weeks", features: ["1-3 Pages", "Responsive Design", "Basic SEO", "Contact Form"], order: 1 },
  { id: "business", serviceId: "web", title: "Business", price: 3500, time: "4 Weeks", features: ["Up to 10 Pages", "CMS Integration", "Advanced SEO", "Analytics Setup", "Custom Animations"], order: 2 },
  { id: "enterprise", serviceId: "web", title: "Enterprise", price: 8000, time: "8+ Weeks", features: ["Unlimited Pages", "Custom Web App", "Payment Gateway", "User Authentication", "Priority Support"], order: 3 },
  { id: "chatbot", serviceId: "ai", title: "AI Chatbot", price: 2000, time: "3 Weeks", features: ["Website Integration", "Custom Knowledge Base", "Lead Generation", "Analytics Dashboard"], order: 1 },
  { id: "workflow", serviceId: "ai", title: "Workflow Automation", price: 5000, time: "6 Weeks", features: ["Multi-App Integration", "Custom Triggers", "Data Sync", "Error Handling", "Email Notifications"], order: 2 },
  { id: "custom", serviceId: "ai", title: "Custom Agent", price: 10000, time: "10+ Weeks", features: ["Custom LLM Training", "Complex Reasoning", "API Development", "Secure Data Handling", "SLA Guarantee"], order: 3 },
  { id: "refresh", serviceId: "brand", title: "Brand Refresh", price: 2500, time: "3 Weeks", features: ["Logo Refinement", "Color Palette", "Typography", "Basic Brand Guidelines"], order: 1 },
  { id: "full", serviceId: "brand", title: "Full Identity", price: 6000, time: "6 Weeks", features: ["Custom Logo Design", "Full Brand Book", "Marketing Materials", "Social Media Kits", "Stationery Design"], order: 2 },
];

const FEATURES = [
  { id: "cms", title: "Content Management (CMS)", price: 500, order: 1 },
  { id: "payments", title: "Payment Integration", price: 800, order: 2 },
  { id: "seo", title: "Advanced SEO Setup", price: 600, order: 3 },
  { id: "animations", title: "Premium 3D/GSAP Animations", price: 1200, order: 4 },
  { id: "multilingual", title: "Multi-language Support", price: 900, order: 5 },
  { id: "auth", title: "User Auth & Profiles", price: 1500, order: 6 },
  { id: "crm", title: "CRM Integration", price: 1000, order: 7 },
  { id: "ecommerce", title: "E-Commerce Functionality", price: 2500, order: 8 },
  { id: "analytics", title: "Custom Analytics Dashboard", price: 1800, order: 9 },
  { id: "automation", title: "Automated Workflows", price: 1400, order: 10 }
];

async function main() {
  console.log("Seeding Database...");
  
  // Clean up
  await prisma.cmsFeature.deleteMany();
  await prisma.cmsPackage.deleteMany();
  await prisma.cmsService.deleteMany();
  
  // Seed Services
  for (const s of SERVICES) {
    await prisma.cmsService.create({ data: s });
  }
  
  // Seed Packages
  for (const p of PACKAGES) {
    await prisma.cmsPackage.create({ data: p });
  }
  
  // Seed Features
  for (const f of FEATURES) {
    await prisma.cmsFeature.create({ data: f });
  }
  
  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
