import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const aiPackages = [
  // Chatbots
  { id: "ai-faq-chatbot", title: "AI FAQ Chatbot", priceInr: 35000, category: "Chatbots", order: 10 },
  { id: "ai-support-chatbot", title: "Customer Support Chatbot", priceInr: 50000, category: "Chatbots", order: 20 },
  { id: "ai-lead-chatbot", title: "Lead Generation Chatbot", priceInr: 45000, category: "Chatbots", order: 30 },
  { id: "ai-web-assistant", title: "Website AI Assistant", priceInr: 40000, category: "Chatbots", order: 40 },
  { id: "ai-custom-chatbot", title: "Custom AI Chatbot", priceInr: 0, category: "Chatbots", order: 50 },

  // Voice Agents
  { id: "ai-receptionist", title: "AI Receptionist", priceInr: 75000, category: "Voice Agents", order: 60 },
  { id: "ai-appointment-voice", title: "Appointment Booking Agent", priceInr: 45000, category: "Voice Agents", order: 70 },
  { id: "ai-support-voice", title: "Customer Support Agent", priceInr: 80000, category: "Voice Agents", order: 80 },
  { id: "ai-outbound-voice", title: "Outbound Calling Agent", priceInr: 120000, category: "Voice Agents", order: 90 },
  { id: "ai-crm-voice", title: "Voice Agent with CRM", priceInr: 95000, category: "Voice Agents", order: 100 },
  { id: "ai-custom-voice", title: "Custom AI Voice Agent", priceInr: 0, category: "Voice Agents", order: 110 },

  // Automation
  { id: "ai-n8n-auto", title: "n8n Workflow Automation", priceInr: 40000, category: "Automation", order: 120 },
  { id: "ai-crm-auto", title: "CRM Automation", priceInr: 45000, category: "Automation", order: 130 },
  { id: "ai-whatsapp-auto", title: "WhatsApp Automation", priceInr: 30000, category: "Automation", order: 140 },
  { id: "ai-email-auto", title: "Email Automation", priceInr: 25000, category: "Automation", order: 150 },
  { id: "ai-document-auto", title: "Document Automation", priceInr: 50000, category: "Automation", order: 160 },
  { id: "ai-custom-auto", title: "Custom Automation", priceInr: 0, category: "Automation", order: 170 },
];

async function main() {
  console.log("Wiping old AI packages...");
  await prisma.cmsPackage.deleteMany({
    where: { serviceId: "ai" }
  });

  console.log("Seeding new tabular AI packages...");
  for (const pkg of aiPackages) {
    await prisma.cmsPackage.create({
      data: {
        id: pkg.id,
        serviceId: "ai",
        title: pkg.title,
        priceUsd: Math.round(pkg.priceInr / 83.5),
        priceInr: pkg.priceInr,
        time: "TBD",
        order: pkg.order,
        category: pkg.category,
        features: []
      } as any // Using any to bypass strict type checking before Prisma generate cache clears
    });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
