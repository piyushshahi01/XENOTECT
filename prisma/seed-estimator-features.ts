import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Each entry maps to a CmsFeature record.
// stepGroup determines which estimator "step" it appears in.
// category determines which service estimator it belongs to (web / ai / growth).
// isMultiplier + multiplier: when true, the price is a multiplier on the total cost.
// When isMultiplier is false, priceUsd/priceInr are flat add-on costs.

const FEATURES = [
  // =========================================================================
  // WEB SERVICES
  // =========================================================================

  // Step: Website Type (radio — pick one)
  { id: "web-type-landing",       category: "web", stepGroup: "Website Type",     title: "Landing Page",           priceUsd: 500,   priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "web-type-business",      category: "web", stepGroup: "Website Type",     title: "Business Website",       priceUsd: 1500,  priceInr: 125250, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "web-type-portfolio",     category: "web", stepGroup: "Website Type",     title: "Portfolio Website",      priceUsd: 2000,  priceInr: 167000, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "web-type-ecommerce",     category: "web", stepGroup: "Website Type",     title: "E-commerce Store",       priceUsd: 3500,  priceInr: 292250, isMultiplier: false, multiplier: 1, order: 4 },
  { id: "web-type-saas",          category: "web", stepGroup: "Website Type",     title: "SaaS Platform",          priceUsd: 6000,  priceInr: 501000, isMultiplier: false, multiplier: 1, order: 5 },
  { id: "web-type-portal",        category: "web", stepGroup: "Website Type",     title: "Web Portal",             priceUsd: 2000,  priceInr: 167000, isMultiplier: false, multiplier: 1, order: 6 },
  { id: "web-type-custom",        category: "web", stepGroup: "Website Type",     title: "Custom Web Application", priceUsd: 2000,  priceInr: 167000, isMultiplier: false, multiplier: 1, order: 7 },

  // Step: Page Range (radio — pick one) — uses multiplier
  { id: "web-pages-1-3",          category: "web", stepGroup: "Page Range",       title: "1–3 Pages",              priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1,   order: 1 },
  { id: "web-pages-4-7",          category: "web", stepGroup: "Page Range",       title: "4–7 Pages",              priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1.5, order: 2 },
  { id: "web-pages-8-15",         category: "web", stepGroup: "Page Range",       title: "8–15 Pages",             priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 2,   order: 3 },
  { id: "web-pages-16-25",        category: "web", stepGroup: "Page Range",       title: "16–25 Pages",            priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 3,   order: 4 },
  { id: "web-pages-25plus",       category: "web", stepGroup: "Page Range",       title: "25+ Pages",              priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 4,   order: 5 },

  // Step: Design Style (radio — pick one)
  { id: "web-design-template",    category: "web", stepGroup: "Design Style",     title: "Use a Template",         priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 0.8, order: 1 },
  { id: "web-design-custom",      category: "web", stepGroup: "Design Style",     title: "Custom UI/UX",           priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1,   order: 2 },
  { id: "web-design-premium",     category: "web", stepGroup: "Design Style",     title: "Premium UI/UX",          priceUsd: 1000, priceInr: 83500,  isMultiplier: false, multiplier: 1,   order: 3 },
  { id: "web-design-awwwards",    category: "web", stepGroup: "Design Style",     title: "Awwwards-Level Experience", priceUsd: 3000, priceInr: 250500, isMultiplier: false, multiplier: 1, order: 4 },

  // Step: Domain (radio — pick one)
  { id: "web-domain-have",        category: "web", stepGroup: "Domain",           title: "Already have domain",        priceUsd: 0,   priceInr: 0,     isMultiplier: false, multiplier: 1, order: 1 },
  { id: "web-domain-new",         category: "web", stepGroup: "Domain",           title: "Register new domain",        priceUsd: 50,  priceInr: 4175,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "web-domain-premium",     category: "web", stepGroup: "Domain",           title: "Premium domain consultation", priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 3 },

  // Step: Maintenance (radio — pick one)
  { id: "web-maint-none",         category: "web", stepGroup: "Maintenance",      title: "No maintenance",  priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 1 },
  { id: "web-maint-1m",           category: "web", stepGroup: "Maintenance",      title: "1 Month",        priceUsd: 200,  priceInr: 16700,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "web-maint-3m",           category: "web", stepGroup: "Maintenance",      title: "3 Months",       priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 3 },
  { id: "web-maint-6m",           category: "web", stepGroup: "Maintenance",      title: "6 Months",       priceUsd: 900,  priceInr: 75150,  isMultiplier: false, multiplier: 1, order: 4 },
  { id: "web-maint-12m",          category: "web", stepGroup: "Maintenance",      title: "12 Months",      priceUsd: 1500, priceInr: 125250, isMultiplier: false, multiplier: 1, order: 5 },

  // =========================================================================
  // AI SOLUTIONS
  // =========================================================================

  // Step: Core AI Solution (radio)
  { id: "ai-sol-chatbot",         category: "ai", stepGroup: "Core AI Solution",  title: "AI Chatbot",             priceUsd: 2000, priceInr: 167000, isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-sol-voice",           category: "ai", stepGroup: "Core AI Solution",  title: "Voice Agent",            priceUsd: 5000, priceInr: 417500, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-sol-whatsapp",        category: "ai", stepGroup: "Core AI Solution",  title: "WhatsApp AI",            priceUsd: 2000, priceInr: 167000, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "ai-sol-crm",             category: "ai", stepGroup: "Core AI Solution",  title: "CRM Automation",         priceUsd: 3000, priceInr: 250500, isMultiplier: false, multiplier: 1, order: 4 },
  { id: "ai-sol-email",           category: "ai", stepGroup: "Core AI Solution",  title: "Email Automation",       priceUsd: 3000, priceInr: 250500, isMultiplier: false, multiplier: 1, order: 5 },
  { id: "ai-sol-lead",            category: "ai", stepGroup: "Core AI Solution",  title: "Lead Qualification",     priceUsd: 3000, priceInr: 250500, isMultiplier: false, multiplier: 1, order: 6 },
  { id: "ai-sol-booking",         category: "ai", stepGroup: "Core AI Solution",  title: "Appointment Booking",    priceUsd: 3000, priceInr: 250500, isMultiplier: false, multiplier: 1, order: 7 },
  { id: "ai-sol-custom",          category: "ai", stepGroup: "Core AI Solution",  title: "Custom AI",              priceUsd: 5000, priceInr: 417500, isMultiplier: false, multiplier: 1, order: 8 },

  // Step: AI Model (radio)
  { id: "ai-model-openai",        category: "ai", stepGroup: "AI Model",          title: "OpenAI",                 priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-model-claude",        category: "ai", stepGroup: "AI Model",          title: "Claude",                 priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-model-gemini",        category: "ai", stepGroup: "AI Model",          title: "Gemini",                 priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 3 },
  { id: "ai-model-unsure",        category: "ai", stepGroup: "AI Model",          title: "Unsure (Recommend)",     priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 4 },

  // Step: Integrations (checkbox — pick many)
  { id: "ai-int-whatsapp",        category: "ai", stepGroup: "Integrations",      title: "WhatsApp",               priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-int-crm",             category: "ai", stepGroup: "Integrations",      title: "CRM",                    priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-int-gcal",            category: "ai", stepGroup: "Integrations",      title: "Google Calendar",        priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 3 },
  { id: "ai-int-slack",           category: "ai", stepGroup: "Integrations",      title: "Slack",                  priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 4 },
  { id: "ai-int-email",           category: "ai", stepGroup: "Integrations",      title: "Email",                  priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 5 },
  { id: "ai-int-shopify",         category: "ai", stepGroup: "Integrations",      title: "Shopify",                priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 6 },
  { id: "ai-int-custom",          category: "ai", stepGroup: "Integrations",      title: "Custom API",             priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 7 },

  // Step: Knowledge Base (checkbox — pick many)
  { id: "ai-kb-pdf",              category: "ai", stepGroup: "Knowledge Base",    title: "PDF",                    priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-kb-website",          category: "ai", stepGroup: "Knowledge Base",    title: "Website",                priceUsd: 800,  priceInr: 66800,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-kb-database",         category: "ai", stepGroup: "Knowledge Base",    title: "Database",               priceUsd: 1500, priceInr: 125250, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "ai-kb-none",             category: "ai", stepGroup: "Knowledge Base",    title: "Not Required",           priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 4 },

  // Step: Languages (radio)
  { id: "ai-lang-en",             category: "ai", stepGroup: "Languages",         title: "English",                priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-lang-hi",             category: "ai", stepGroup: "Languages",         title: "Hindi",                  priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-lang-multi",          category: "ai", stepGroup: "Languages",         title: "Multilingual",           priceUsd: 1500, priceInr: 125250, isMultiplier: false, multiplier: 1, order: 3 },

  // Step: Expected Users (radio — multiplier)
  { id: "ai-users-100",           category: "ai", stepGroup: "Expected Users",    title: "Under 100/day",          priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1,   order: 1 },
  { id: "ai-users-1000",          category: "ai", stepGroup: "Expected Users",    title: "100–1,000/day",          priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1.3, order: 2 },
  { id: "ai-users-1000plus",      category: "ai", stepGroup: "Expected Users",    title: "1,000+",                 priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1.8, order: 3 },

  // Step: Ongoing Support (radio)
  { id: "ai-support-none",        category: "ai", stepGroup: "Ongoing Support",   title: "None",                   priceUsd: 0,    priceInr: 0,      isMultiplier: false, multiplier: 1, order: 1 },
  { id: "ai-support-monthly",     category: "ai", stepGroup: "Ongoing Support",   title: "Monthly",                priceUsd: 1000, priceInr: 83500,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "ai-support-quarterly",   category: "ai", stepGroup: "Ongoing Support",   title: "Quarterly",              priceUsd: 2500, priceInr: 208750, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "ai-support-dedicated",   category: "ai", stepGroup: "Ongoing Support",   title: "Dedicated Support",      priceUsd: 5000, priceInr: 417500, isMultiplier: false, multiplier: 1, order: 4 },

  // =========================================================================
  // GROWTH & MARKETING
  // =========================================================================

  // Step: Core Growth Service (radio)
  { id: "gr-svc-seo",             category: "growth", stepGroup: "Core Growth Service",  title: "SEO",                      priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "gr-svc-google",          category: "growth", stepGroup: "Core Growth Service",  title: "Google Ads",               priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 2 },
  { id: "gr-svc-meta",            category: "growth", stepGroup: "Core Growth Service",  title: "Meta Ads",                 priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 3 },
  { id: "gr-svc-social",          category: "growth", stepGroup: "Core Growth Service",  title: "Social Media Management",  priceUsd: 500,  priceInr: 41750,  isMultiplier: false, multiplier: 1, order: 4 },
  { id: "gr-svc-branding",        category: "growth", stepGroup: "Core Growth Service",  title: "Branding",                 priceUsd: 1500, priceInr: 125250, isMultiplier: false, multiplier: 1, order: 5 },
  { id: "gr-svc-complete",        category: "growth", stepGroup: "Core Growth Service",  title: "Complete Growth Package",  priceUsd: 2500, priceInr: 208750, isMultiplier: false, multiplier: 1, order: 6 },

  // Step: Business Type (radio — multiplier)
  { id: "gr-biz-startup",         category: "growth", stepGroup: "Business Type",        title: "Startup",          priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1,   order: 1 },
  { id: "gr-biz-local",           category: "growth", stepGroup: "Business Type",        title: "Local Business",   priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1,   order: 2 },
  { id: "gr-biz-ecom",            category: "growth", stepGroup: "Business Type",        title: "E-commerce",       priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1.3, order: 3 },
  { id: "gr-biz-saas",            category: "growth", stepGroup: "Business Type",        title: "SaaS",             priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 1.4, order: 4 },
  { id: "gr-biz-enterprise",      category: "growth", stepGroup: "Business Type",        title: "Enterprise",       priceUsd: 0, priceInr: 0, isMultiplier: true, multiplier: 2,   order: 5 },

  // Step: Marketing Channels (checkbox)
  { id: "gr-ch-google",           category: "growth", stepGroup: "Marketing Channels",   title: "Google",           priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 1 },
  { id: "gr-ch-facebook",         category: "growth", stepGroup: "Marketing Channels",   title: "Facebook",         priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "gr-ch-instagram",        category: "growth", stepGroup: "Marketing Channels",   title: "Instagram",        priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "gr-ch-linkedin",         category: "growth", stepGroup: "Marketing Channels",   title: "LinkedIn",         priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 4 },
  { id: "gr-ch-youtube",          category: "growth", stepGroup: "Marketing Channels",   title: "YouTube",          priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 5 },
  { id: "gr-ch-twitter",          category: "growth", stepGroup: "Marketing Channels",   title: "X (Twitter)",      priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 6 },

  // Step: Social Media Platforms (checkbox)
  { id: "gr-sm-instagram",        category: "growth", stepGroup: "Social Media Platforms", title: "Instagram",      priceUsd: 400, priceInr: 33400, isMultiplier: false, multiplier: 1, order: 1 },
  { id: "gr-sm-facebook",         category: "growth", stepGroup: "Social Media Platforms", title: "Facebook",       priceUsd: 400, priceInr: 33400, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "gr-sm-linkedin",         category: "growth", stepGroup: "Social Media Platforms", title: "LinkedIn",       priceUsd: 400, priceInr: 33400, isMultiplier: false, multiplier: 1, order: 3 },
  { id: "gr-sm-x",                category: "growth", stepGroup: "Social Media Platforms", title: "X",              priceUsd: 400, priceInr: 33400, isMultiplier: false, multiplier: 1, order: 4 },
  { id: "gr-sm-youtube",          category: "growth", stepGroup: "Social Media Platforms", title: "YouTube",        priceUsd: 400, priceInr: 33400, isMultiplier: false, multiplier: 1, order: 5 },

  // Step: Content Needed (checkbox)
  { id: "gr-content-posts",       category: "growth", stepGroup: "Content Needed",        title: "Posts",           priceUsd: 200,  priceInr: 16700,  isMultiplier: false, multiplier: 1, order: 1 },
  { id: "gr-content-reels",       category: "growth", stepGroup: "Content Needed",        title: "Reels",           priceUsd: 1200, priceInr: 100200, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "gr-content-stories",     category: "growth", stepGroup: "Content Needed",        title: "Stories",         priceUsd: 200,  priceInr: 16700,  isMultiplier: false, multiplier: 1, order: 3 },
  { id: "gr-content-video",       category: "growth", stepGroup: "Content Needed",        title: "Video Editing",   priceUsd: 1700, priceInr: 141950, isMultiplier: false, multiplier: 1, order: 4 },
  { id: "gr-content-copy",        category: "growth", stepGroup: "Content Needed",        title: "Copywriting",     priceUsd: 200,  priceInr: 16700,  isMultiplier: false, multiplier: 1, order: 5 },

  // Step: Reporting (radio)
  { id: "gr-report-monthly",      category: "growth", stepGroup: "Reporting",              title: "Monthly",        priceUsd: 0,   priceInr: 0,     isMultiplier: false, multiplier: 1, order: 1 },
  { id: "gr-report-biweekly",     category: "growth", stepGroup: "Reporting",              title: "Bi-weekly",      priceUsd: 200, priceInr: 16700, isMultiplier: false, multiplier: 1, order: 2 },
  { id: "gr-report-weekly",       category: "growth", stepGroup: "Reporting",              title: "Weekly",         priceUsd: 500, priceInr: 41750, isMultiplier: false, multiplier: 1, order: 3 },
];

async function main() {
  console.log("🌱 Seeding estimator features...");
  
  let created = 0;
  let skipped = 0;
  
  for (const feat of FEATURES) {
    try {
      await prisma.cmsFeature.upsert({
        where: { id: feat.id },
        update: {
          category: feat.category,
          stepGroup: feat.stepGroup,
          title: feat.title,
          priceUsd: feat.priceUsd,
          priceInr: feat.priceInr,
          isMultiplier: feat.isMultiplier,
          multiplier: feat.multiplier,
          order: feat.order,
        },
        create: feat,
      });
      created++;
    } catch (e: any) {
      console.error(`  ❌ Failed: ${feat.id} — ${e.message}`);
      skipped++;
    }
  }
  
  console.log(`\n✅ Done! ${created} features upserted, ${skipped} skipped.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
