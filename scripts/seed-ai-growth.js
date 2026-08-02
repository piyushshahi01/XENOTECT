const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NEW_FEATURES = [
  // AI Solutions (category: "ai")
  { id: "ai-whatsapp", category: "ai", title: "WhatsApp Integration", price: 800, order: 1 },
  { id: "ai-crm", category: "ai", title: "CRM Syncing", price: 1000, order: 2 },
  { id: "ai-voice", category: "ai", title: "Voice Calling Capabilities", price: 1500, order: 3 },
  { id: "ai-custom-kb", category: "ai", title: "Custom Knowledge Base Setup", price: 1200, order: 4 },
  { id: "ai-analytics", category: "ai", title: "Advanced Interaction Analytics", price: 600, order: 5 },
  
  // Growth Solutions (category: "growth")
  { id: "growth-seo", category: "growth", title: "Advanced Technical SEO Audit", price: 1200, order: 1 },
  { id: "growth-cro", category: "growth", title: "Conversion Rate Optimization (CRO)", price: 1500, order: 2 },
  { id: "growth-content", category: "growth", title: "4 Blog Posts / Month", price: 800, order: 3 },
  { id: "growth-email", category: "growth", title: "Automated Email Sequences", price: 1000, order: 4 },
  { id: "growth-analytics", category: "growth", title: "Custom Looker Studio Dashboard", price: 900, order: 5 },
];

async function main() {
  console.log("Seeding AI and Growth features...");
  
  for (const f of NEW_FEATURES) {
    // Upsert ensures we don't crash if they already exist
    await prisma.cmsFeature.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
    console.log(`Added/Updated feature: ${f.title}`);
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
