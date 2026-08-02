const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultPackages = [
  // WEB
  {
    id: "web-starter",
    serviceId: "web",
    title: "Starter",
    priceUsd: 15000,
    priceInr: 1250000,
    time: "2 Weeks",
    features: [
      "1 Premium Landing Page",
      "Mobile Responsive Design",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "6 Months Hosting",
    ],
    detailedContent: `
## Transform Your First Impression

Your landing page is your digital storefront. The **Starter** package is meticulously engineered for new businesses that need to make a massive impact immediately. We don't use templates; every pixel is crafted to convert visitors into customers.

### What You Get:
- **Bespoke Design**: A single, beautifully crafted landing page with premium animations.
- **Lightning Fast**: Built on Next.js for instantaneous load times.
- **Conversion Optimized**: Strategic CTA placement and copywriting frameworks.
- **Fully Managed**: We handle the hosting and domain setup for the first 6 months.

*Stop losing leads to poor design. Start winning with Xenotect.*
    `,
    order: 1
  },
  {
    id: "web-business",
    serviceId: "web",
    title: "Business",
    priceUsd: 35000,
    priceInr: 2900000,
    time: "4-6 Weeks",
    features: [
      "Up to 10 Custom Pages",
      "CMS Integration (Sanity/Strapi)",
      "Advanced SEO Structure",
      "Premium Animations",
      "1 Year Hosting & Domain",
    ],
    detailedContent: `
## The Ultimate Digital Engine

The **Business** package is our most popular tier for a reason. It provides a complete, scalable website architecture empowered by a headless CMS, allowing your team to publish content at lightning speed without touching a line of code.

### Core Advantages:
- **Limitless Scalability**: A robust multi-page architecture that grows with you.
- **Content Autonomy**: A fully integrated CMS (Sanity or Strapi) for your marketing team.
- **Technical SEO**: Programmatic SEO foundations, dynamic sitemaps, and schema markup.
- **Immersive UX**: WebGL accents and GSAP scroll animations that feel expensive.

*Dominate your industry with a digital presence that outclasses the competition.*
    `,
    order: 2
  },
  {
    id: "web-enterprise",
    serviceId: "web",
    title: "Enterprise",
    priceUsd: 55000,
    priceInr: 4500000,
    time: "8-12 Weeks",
    features: [
      "Custom Architecture",
      "User Authentication",
      "Payment Gateway Setup",
      "Custom Database Design",
      "6 Months Priority Support",
    ],
    detailedContent: `
## Uncompromising Scale & Power

For complex web applications, SaaS platforms, and massive e-commerce architectures. The **Enterprise** package is a full-scale digital engineering partnership. 

### Enterprise-Grade Engineering:
- **Custom Backend**: Secure authentication, complex database architectures, and API integrations.
- **High-Performance Infrastructure**: Deployed on AWS/Vercel with global edge caching.
- **Conversion Systems**: Advanced Stripe/Paddle payment flows and subscription management.
- **Priority Partnership**: Direct Slack channel with our lead engineers and 6 months of priority maintenance.

*We build the technology that runs your business.*
    `,
    order: 3
  },

  // AI
  {
    id: "ai-starter",
    serviceId: "ai",
    title: "AI Chatbot",
    priceUsd: 420,
    priceInr: 35000,
    time: "2-3 Weeks",
    features: [
      "Text-based AI Agent",
      "Website Integration",
      "Custom Knowledge Base",
      "Standard OpenAI Model",
      "1 Month Support",
    ],
    detailedContent: `
## 24/7 Intelligent Support

Stop letting customer inquiries slip through the cracks. The **AI Chatbot** deploys a hyper-intelligent, text-based AI agent directly to your website, trained strictly on your business data.

### Capabilities:
- **Instant Resolution**: Answers 80% of routine customer questions instantly.
- **Custom Knowledge**: Trained on your PDFs, URLs, and past support tickets.
- **Lead Capture**: Seamlessly hands off complex queries to human agents while capturing email/phone data.
- **Flawless Tone**: Configured to speak in your exact brand voice.
    `,
    order: 1
  },
  {
    id: "ai-voice-agent",
    serviceId: "ai",
    title: "AI Voice Agent",
    priceUsd: 900,
    priceInr: 75000,
    time: "4-6 Weeks",
    features: [
      "AI Voice Agent (Vapi)",
      "Inbound & Outbound Calls",
      "CRM Integration",
      "Appointment Booking",
      "3 Months Support",
    ],
    detailedContent: `
## The Autonomous Sales Rep

The **AI Voice Agent** introduces human-like AI voice agents. This isn't just a chatbot; it's a digital employee that calls inbound leads in seconds, handles objections, and books meetings.

### Features:
- **Conversational Voice AI**: <500ms latency voice agents that sound entirely human.
- **CRM Sync**: Automatically logs call summaries and updates lead status.
- **Calendar Integration**: Direct booking into your Calendly or Google Calendar.
- **Objection Handling**: Trained on your sales scripts and common objections.
    `,
    order: 2
  },
  {
    id: "ai-workflow",
    serviceId: "ai",
    title: "AI Workflow Automation (n8n)",
    priceUsd: 600,
    priceInr: 50000,
    time: "3-4 Weeks",
    features: [
      "Custom n8n Workflows",
      "Multi-step Automation",
      "API Integrations",
      "Error Handling & Monitoring",
      "2 Months Support",
    ],
    detailedContent: `
## Automate Your Operations

**AI Workflow Automation** connects your business tools into intelligent, self-running pipelines using n8n. Eliminate manual data entry and repetitive tasks.

### What We Build:
- **Multi-step Workflows**: Chain together AI, databases, APIs, and notifications.
- **Error Resilience**: Built-in retry logic and error notification systems.
- **Custom Integrations**: Connect any tool with an API to your workflow.
- **Self-hosted**: Your workflows run on your own infrastructure for full control.
    `,
    order: 3
  },
  {
    id: "ai-crm",
    serviceId: "ai",
    title: "CRM Automation",
    priceUsd: 540,
    priceInr: 45000,
    time: "2-3 Weeks",
    features: [
      "HubSpot/Salesforce Automation",
      "Lead Scoring & Routing",
      "Email Sequence Automation",
      "Deal Pipeline Setup",
      "1 Month Support",
    ],
    detailedContent: `
## Never Lose a Lead Again

**CRM Automation** transforms your sales pipeline into a self-running machine. We automate lead scoring, routing, follow-ups, and reporting so your team focuses on closing.

### Deliverables:
- **Smart Lead Scoring**: AI-powered lead prioritization based on behaviour signals.
- **Automated Sequences**: Trigger follow-up emails and tasks based on pipeline stage.
- **Dashboard & Reporting**: Real-time visibility into pipeline health and conversion rates.
- **Custom Fields & Workflows**: Tailored to your exact sales process.
    `,
    order: 4
  },
  {
    id: "ai-whatsapp",
    serviceId: "ai",
    title: "WhatsApp Automation",
    priceUsd: 360,
    priceInr: 30000,
    time: "1-2 Weeks",
    features: [
      "WhatsApp Business API",
      "Automated Responses",
      "Broadcast Campaigns",
      "Order/Booking Notifications",
      "1 Month Support",
    ],
    detailedContent: `
## Engage Customers on WhatsApp

**WhatsApp Automation** puts your business on the platform your customers already use daily. Automate responses, send broadcasts, and capture leads — all through WhatsApp.

### Features:
- **Instant Auto-replies**: Respond to customer inquiries 24/7.
- **Broadcast Campaigns**: Send promotions and updates to segmented lists.
- **Order Notifications**: Automated order confirmations and delivery updates.
- **Lead Capture**: Collect customer information through interactive WhatsApp flows.
    `,
    order: 5
  },
  {
    id: "ai-email",
    serviceId: "ai",
    title: "Email Automation",
    priceUsd: 300,
    priceInr: 25000,
    time: "1-2 Weeks",
    features: [
      "Email Sequence Setup",
      "Drip Campaign Design",
      "Audience Segmentation",
      "A/B Testing Setup",
      "1 Month Support",
    ],
    detailedContent: `
## Convert with Intelligent Email

**Email Automation** builds revenue-generating email sequences that nurture leads and drive conversions on autopilot.

### Deliverables:
- **Welcome Sequences**: Convert new subscribers into paying customers.
- **Drip Campaigns**: Educate and engage leads over time with scheduled content.
- **Smart Segmentation**: Target the right audience with the right message.
- **Performance Tracking**: Monitor open rates, click rates, and revenue attribution.
    `,
    order: 6
  },

  // GROWTH — Marketing Services
  {
    id: "growth-seo",
    serviceId: "growth",
    title: "SEO",
    priceUsd: 145,
    priceInr: 12000,
    time: "Monthly",
    features: [
      "Technical SEO Audit",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "2 Blog Articles/Month",
      "Monthly Reporting",
    ],
    detailedContent: `
## Foundation for Organic Dominance

Traffic is the lifeblood of the internet. **SEO** builds a bulletproof technical foundation and initiates a consistent content pipeline to capture high-intent search traffic.

### Monthly Deliverables:
- **Technical Excellence**: Continuous monitoring of Core Web Vitals, crawl errors, and schema markup.
- **Targeted Content**: 2 expertly written, keyword-optimized articles per month.
- **Strategic Mapping**: Identifying low-hanging fruit and high-converting long-tail keywords.
- **Transparent Reporting**: Monthly breakdown of rankings, traffic growth, and next steps.
    `,
    order: 1
  },
  {
    id: "growth-local-seo",
    serviceId: "growth",
    title: "Local SEO",
    priceUsd: 96,
    priceInr: 8000,
    time: "Monthly",
    features: [
      "Google Business Profile Optimization",
      "Local Keyword Targeting",
      "Citation Building",
      "Review Management",
      "Monthly Reporting",
    ],
    detailedContent: `
## Dominate Your Local Market

**Local SEO** ensures your business appears in Google's local pack and map results when nearby customers search for your services.

### Deliverables:
- **GBP Optimization**: Fully optimized Google Business Profile with posts and Q&A.
- **Local Citations**: Consistent NAP data across 50+ directories.
- **Review Strategy**: Automated review request flows and reputation management.
- **Geo-targeted Keywords**: Rank for "[service] near me" and city-specific searches.
    `,
    order: 2
  },
  {
    id: "growth-smm",
    serviceId: "growth",
    title: "Social Media Management",
    priceUsd: 217,
    priceInr: 18000,
    time: "Monthly",
    features: [
      "Content Calendar & Strategy",
      "12-16 Posts/Month",
      "Graphic Design",
      "Community Management",
      "Monthly Analytics Report",
    ],
    detailedContent: `
## Build a Brand People Follow

**Social Media Management** transforms your social presence from dormant to dynamic with consistent, on-brand content and active community engagement.

### Monthly Deliverables:
- **Content Creation**: 12-16 professionally designed posts per month.
- **Platform Strategy**: Tailored strategy for Instagram, LinkedIn, and X.
- **Community Engagement**: Daily monitoring and response to comments/DMs.
- **Growth Analytics**: Track follower growth, engagement rates, and content performance.
    `,
    order: 3
  },
  {
    id: "growth-google-ads",
    serviceId: "growth",
    title: "Google Ads Management",
    priceUsd: 217,
    priceInr: 18000,
    time: "Monthly",
    features: [
      "Campaign Strategy & Setup",
      "Keyword Bidding Optimization",
      "Ad Copy & Extensions",
      "Conversion Tracking",
      "Bi-Weekly Reporting",
    ],
    detailedContent: `
## Capture High-Intent Buyers

**Google Ads Management** puts your business in front of people actively searching for what you sell. We optimize every dollar of ad spend for maximum ROI.

### What's Included:
- **Search Campaigns**: Target high-intent keywords with optimized ad copy.
- **Smart Bidding**: AI-powered bid strategies to maximize conversions.
- **Negative Keywords**: Continuous refinement to eliminate wasted spend.
- **Performance Dashboards**: Real-time visibility into CPC, CTR, and ROAS.
    `,
    order: 4
  },
  {
    id: "growth-meta-ads",
    serviceId: "growth",
    title: "Meta Ads Management",
    priceUsd: 217,
    priceInr: 18000,
    time: "Monthly",
    features: [
      "Facebook & Instagram Ads",
      "Audience Targeting & Lookalikes",
      "Creative Design & Testing",
      "Retargeting Campaigns",
      "Bi-Weekly Reporting",
    ],
    detailedContent: `
## Reach Your Ideal Customers

**Meta Ads Management** leverages Facebook and Instagram's powerful targeting to put your brand in front of the exact audience most likely to convert.

### Campaign Strategy:
- **Audience Building**: Custom and lookalike audiences based on your best customers.
- **Creative Testing**: Continuous A/B testing of visuals, copy, and CTAs.
- **Retargeting**: Re-engage website visitors and cart abandoners.
- **Full-Funnel**: Awareness → Consideration → Conversion campaigns.
    `,
    order: 5
  },
  {
    id: "growth-performance",
    serviceId: "growth",
    title: "Performance Marketing",
    priceUsd: 300,
    priceInr: 25000,
    time: "Monthly",
    features: [
      "Omnichannel Ad Strategy",
      "Google + Meta Combined",
      "Conversion Rate Optimization",
      "Advanced Analytics Setup",
      "Weekly Reporting",
    ],
    detailedContent: `
## Maximum ROI, Every Channel

**Performance Marketing** combines Google Ads, Meta Ads, and CRO into a single, data-driven growth engine. Every campaign is optimized for measurable business results.

### Full-Stack Approach:
- **Cross-Platform Synergy**: Unified strategy across Google and Meta for maximum reach.
- **CRO**: Landing page optimization and A/B testing to increase conversion rates.
- **Attribution Modeling**: Understand which channels drive the most revenue.
- **Weekly Optimization**: Continuous budget reallocation toward top performers.
    `,
    order: 6
  },

  // GROWTH — Website Maintenance Plans
  {
    id: "growth-maintenance-basic",
    serviceId: "growth",
    title: "Website Maintenance — Basic",
    priceUsd: 60,
    priceInr: 5000,
    time: "Monthly",
    features: [
      "Security Updates & Patches",
      "Weekly Backups",
      "Uptime Monitoring",
      "1 Hour Content Updates/Month",
      "Email Support",
    ],
    detailedContent: `
## Keep Your Site Secure & Running

The **Basic Maintenance** plan ensures your website stays secure, up-to-date, and backed up without you lifting a finger.

### Included:
- **Security Patches**: Regular framework and dependency updates.
- **Automated Backups**: Weekly backups with 30-day retention.
- **Uptime Monitoring**: 24/7 monitoring with instant alerts.
- **Minor Updates**: Up to 1 hour of content changes per month.
    `,
    order: 7
  },
  {
    id: "growth-maintenance-standard",
    serviceId: "growth",
    title: "Website Maintenance — Standard",
    priceUsd: 120,
    priceInr: 10000,
    time: "Monthly",
    features: [
      "Everything in Basic",
      "Daily Backups",
      "Performance Optimization",
      "3 Hours Content Updates/Month",
      "Priority Support",
    ],
    detailedContent: `
## Proactive Care for Growing Sites

**Standard Maintenance** adds performance optimization and faster support for businesses that rely heavily on their web presence.

### Upgrades Over Basic:
- **Daily Backups**: More frequent backups for peace of mind.
- **Speed Optimization**: Monthly performance audits and Core Web Vitals tuning.
- **More Update Hours**: Up to 3 hours of design/content changes per month.
- **Priority Support**: Responses within 4 business hours.
    `,
    order: 8
  },
  {
    id: "growth-maintenance-premium",
    serviceId: "growth",
    title: "Website Maintenance — Premium",
    priceUsd: 180,
    priceInr: 15000,
    time: "Monthly",
    features: [
      "Everything in Standard",
      "Real-time Backups",
      "SEO Monitoring",
      "6 Hours Development/Month",
      "Dedicated Support Manager",
    ],
    detailedContent: `
## White-Glove Website Management

**Premium Maintenance** is the ultimate peace-of-mind plan. A dedicated support manager handles everything — from content updates to new feature development.

### Premium Features:
- **Real-time Backups**: Instant point-in-time recovery.
- **SEO Monitoring**: Track rankings and fix technical SEO issues proactively.
- **Development Hours**: Up to 6 hours of development work per month (new features, redesigns).
- **Dedicated Manager**: A single point of contact who knows your site inside out.
    `,
    order: 9
  }
];

async function main() {
  console.log("Starting DB Seed...");

  const services = [
    { id: "web", title: "Web Solutions", description: "Custom web development", icon: "Code" },
    { id: "ai", title: "AI Solutions", description: "Custom AI automation", icon: "Cpu" },
    { id: "growth", title: "Growth Solutions", description: "Digital marketing", icon: "TrendingUp" }
  ];

  for (const svc of services) {
    await prisma.cmsService.upsert({
      where: { id: svc.id },
      update: {},
      create: svc
    });
  }

  for (const pkg of defaultPackages) {
    await prisma.cmsPackage.upsert({
      where: { id: pkg.id },
      update: {
        title: pkg.title,
        priceUsd: pkg.priceUsd,
        priceInr: pkg.priceInr,
        time: pkg.time,
        features: pkg.features,
        detailedContent: pkg.detailedContent,
        order: pkg.order
      },
      create: {
        id: pkg.id,
        serviceId: pkg.serviceId,
        title: pkg.title,
        priceUsd: pkg.priceUsd,
        priceInr: pkg.priceInr,
        time: pkg.time,
        features: pkg.features,
        detailedContent: pkg.detailedContent,
        order: pkg.order
      }
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
