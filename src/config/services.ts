export const serviceConfig = {
  web: {
    pricing: [
      {
        name: "Starter",
        price: "$15,000",
        description: "Perfect for new businesses needing a high-converting landing page.",
        features: [
          "1 Premium Landing Page",
          "Mobile Responsive Design",
          "Basic SEO Optimization",
          "Contact Form Integration",
          "6 Months Hosting",
        ],
        isPopular: false,
      },
      {
        name: "Business",
        price: "$35,000",
        description: "A complete website with CMS for growing companies.",
        features: [
          "Up to 10 Custom Pages",
          "CMS Integration (Sanity/Strapi)",
          "Advanced SEO Structure",
          "Premium Animations",
          "1 Year Hosting & Domain",
        ],
        isPopular: true,
      },
      {
        name: "Enterprise",
        price: "$55,000+",
        description: "Custom web applications and large-scale SaaS platforms.",
        features: [
          "Custom Architecture",
          "User Authentication",
          "Payment Gateway Setup",
          "Custom Database Design",
          "6 Months Priority Support",
        ],
        isPopular: false,
      },
    ],
    comparison: {
      features: [
        { name: "Pages", starter: "1 Page", business: "Up to 10", enterprise: "Unlimited" },
        { name: "Hosting", starter: "6 Months", business: "1 Year", enterprise: "1 Year" },
        { name: "Domain", starter: "1 Year", business: "1 Year", enterprise: "1 Year" },
        { name: "Support", starter: "1 Month", business: "3 Months", enterprise: "6 Months" },
        { name: "CMS", starter: "—", business: "✓", enterprise: "Custom" },
        { name: "Admin Dashboard", starter: "—", business: "Basic", enterprise: "Advanced" },
        { name: "SEO", starter: "Basic", business: "Advanced", enterprise: "Enterprise" },
        { name: "Business Emails", starter: "1 Account", business: "5 Accounts", enterprise: "Unlimited" },
      ],
    },
    estimator: {
      projectTypes: [
        { id: "landing-page", label: "Landing Page", basePrice: 15000 },
        { id: "business-site", label: "Business Website", basePrice: 35000 },
        { id: "ecommerce", label: "E-Commerce", basePrice: 55000 },
        { id: "saas", label: "Custom SaaS App", basePrice: 85000 },
      ],
      addOns: [
        { id: "cms", label: "Content Management System (CMS)", price: 5000 },
        { id: "auth", label: "User Authentication", price: 8000 },
        { id: "payments", label: "Payment Gateway", price: 10000 },
        { id: "seo", label: "Advanced SEO Setup", price: 6000 },
        { id: "copywriting", label: "Professional Copywriting", price: 7500 },
      ],
    },
    faqs: [
      {
        question: "How long does a website take to build?",
        answer: "A high-converting landing page typically takes 2-4 weeks. A full business website takes 4-8 weeks, while complex web applications can take 3-6 months depending on requirements.",
      },
      {
        question: "Do you handle hosting and domains?",
        answer: "Yes. All our packages include setup for hosting and domain management. Business and Enterprise packages include the first year of hosting and domain registration for free.",
      },
      {
        question: "Will I be able to edit the content myself?",
        answer: "Absolutely. If you choose a package with CMS integration, we build an intuitive admin dashboard where you can easily update text, images, and blog posts without touching any code.",
      },
      {
        question: "Do you provide ongoing support?",
        answer: "Yes, every project comes with a standard support period (1 to 6 months depending on the package) to handle any bugs or minor updates. After that, we offer monthly maintenance retainers.",
      },
    ],
  },
  ai: {
    pricing: [
      {
        name: "Chatbot Starter",
        price: "$10,000",
        description: "Automate basic customer support with an intelligent text agent.",
        features: [
          "Text-based AI Agent",
          "Website Integration",
          "Basic Knowledge Base",
          "Standard OpenAI Model",
          "1 Month Support",
        ],
        isPopular: false,
      },
      {
        name: "Voice & Automation",
        price: "$25,000",
        description: "Advanced AI capable of handling phone calls and CRM tasks.",
        features: [
          "AI Voice Agent (Vapi)",
          "CRM Integration (HubSpot/Salesforce)",
          "WhatsApp Integration",
          "Appointment Booking",
          "3 Months Support",
        ],
        isPopular: true,
      },
      {
        name: "Enterprise AI",
        price: "$50,000+",
        description: "Fully custom AI workflows tailored to your specific operations.",
        features: [
          "Custom LLM Fine-tuning",
          "Complex Multi-Agent Systems",
          "On-Premise or Private Cloud",
          "Advanced Analytics Dashboard",
          "6 Months Priority Support",
        ],
        isPopular: false,
      },
    ],
    comparison: {
      features: [
        { name: "AI Model", starter: "Standard", business: "Advanced", enterprise: "Custom Finetuned" },
        { name: "Knowledge Base", starter: "Basic PDF/URL", business: "Dynamic (Syncs w/ Docs)", enterprise: "Enterprise Data Lake" },
        { name: "Voice Calling", starter: "—", business: "Optional", enterprise: "Included" },
        { name: "CRM Integration", starter: "—", business: "✓", enterprise: "Custom Bi-directional" },
        { name: "WhatsApp", starter: "Optional", business: "✓", enterprise: "✓" },
        { name: "Analytics", starter: "Basic", business: "Advanced", enterprise: "Custom Dashboard" },
        { name: "Support", starter: "1 Month", business: "3 Months", enterprise: "6 Months" },
      ],
    },
    estimator: {
      projectTypes: [
        { id: "customer-support", label: "Customer Support Chatbot", basePrice: 10000 },
        { id: "voice-agent", label: "Inbound/Outbound Voice Agent", basePrice: 20000 },
        { id: "lead-gen", label: "Lead Generation & Booking Agent", basePrice: 15000 },
        { id: "internal-tool", label: "Internal AI Workflow Assistant", basePrice: 25000 },
      ],
      addOns: [
        { id: "whatsapp", label: "WhatsApp Integration", price: 5000 },
        { id: "crm", label: "CRM Integration", price: 8000 },
        { id: "voice", label: "Voice Calling Capabilities", price: 10000 },
        { id: "multi-language", label: "Multi-language Support", price: 4000 },
        { id: "custom-dashboard", label: "Admin Analytics Dashboard", price: 12000 },
      ],
    },
    faqs: [
      {
        question: "Which AI models do you use?",
        answer: "We are model-agnostic. We typically use OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), or Google (Gemini Pro) depending on the specific use case, speed requirements, and cost constraints.",
      },
      {
        question: "Can the AI integrate with WhatsApp?",
        answer: "Yes, we can deploy your AI agent directly to WhatsApp Business, allowing it to converse naturally with your customers via text or voice notes.",
      },
      {
        question: "Does it work 24/7?",
        answer: "Absolutely. Our AI systems are deployed on high-availability cloud infrastructure, ensuring they answer calls and messages instantly, 24/7/365, without fatigue.",
      },
      {
        question: "What are the ongoing costs?",
        answer: "Beyond the initial setup fee, you will only pay for the API usage (e.g., OpenAI token costs, Vapi minute costs, Twilio numbers) directly to the providers, which is typically very cheap. We can also provide a managed monthly maintenance plan.",
      },
    ],
  },
  growth: {
    pricing: [
      {
        name: "SEO Starter",
        price: "$3,000/mo",
        description: "Essential SEO to start ranking on Google and driving organic traffic.",
        features: [
          "Technical SEO Audit",
          "Keyword Research",
          "On-Page Optimization",
          "2 Blog Articles/Month",
          "Monthly Reporting",
        ],
        isPopular: false,
      },
      {
        name: "Growth Engine",
        price: "$6,500/mo",
        description: "Comprehensive SEO and Paid Ads strategy for aggressive scaling.",
        features: [
          "Advanced SEO Strategy",
          "Google Ads Management",
          "Meta Ads Management",
          "Conversion Rate Optimization",
          "Bi-Weekly Strategy Calls",
        ],
        isPopular: true,
      },
      {
        name: "Enterprise Marketing",
        price: "$12,000+/mo",
        description: "Full-stack marketing department for established enterprises.",
        features: [
          "Omnichannel Strategy",
          "Custom Content Production",
          "Dedicated Account Manager",
          "Advanced Analytics Setup",
          "Weekly Reporting",
        ],
        isPopular: false,
      },
    ],
    comparison: {
      features: [
        { name: "SEO", starter: "Basic On-Page", business: "Advanced Off-Page", enterprise: "Enterprise Strategy" },
        { name: "Google Ads", starter: "—", business: "Included (up to $10k spend)", enterprise: "Custom Spend Limits" },
        { name: "Meta Ads", starter: "—", business: "Included", enterprise: "Included" },
        { name: "Content Creation", starter: "2 Articles/mo", business: "4 Articles/mo", enterprise: "Custom Volume" },
        { name: "Reporting", starter: "Monthly", business: "Bi-weekly", enterprise: "Weekly" },
        { name: "CRO", starter: "—", business: "Basic A/B Testing", enterprise: "Advanced CRO Strategy" },
        { name: "Support", starter: "Email Support", business: "Priority Support", enterprise: "Dedicated Manager" },
      ],
    },
    estimator: {
      projectTypes: [
        { id: "seo", label: "SEO Retainer", basePrice: 3000 },
        { id: "google-ads", label: "Google Ads Management", basePrice: 2500 },
        { id: "meta-ads", label: "Meta Ads Management", basePrice: 2500 },
        { id: "full-stack", label: "Full-Stack Growth Engine", basePrice: 6500 },
      ],
      addOns: [
        { id: "content", label: "Content Production (Blogs/Copy)", price: 2000 },
        { id: "cro", label: "Conversion Rate Optimization (CRO)", price: 3000 },
        { id: "branding", label: "Brand Identity Revamp", price: 8000 },
        { id: "analytics", label: "Advanced Data Analytics Setup", price: 4500 },
      ],
    },
    faqs: [
      {
        question: "How long does SEO take to see results?",
        answer: "SEO is a long-term investment. While technical fixes can yield immediate improvements, substantial organic traffic growth typically takes 3 to 6 months of consistent effort.",
      },
      {
        question: "Is ad spend included in the pricing?",
        answer: "No, the pricing covers our management, strategy, and optimization fees. The actual ad budget is paid directly to Google or Meta.",
      },
      {
        question: "Do you create the ad creatives?",
        answer: "Yes, our Growth Engine and Enterprise packages include standard ad copywriting and graphic design. For high-end video production, custom quotes apply.",
      },
      {
        question: "Can I cancel monthly services?",
        answer: "Our retainers typically start with a 3-month commitment to ensure enough time to generate measurable results. After that, it transitions to a month-to-month agreement.",
      },
    ],
  }
};
