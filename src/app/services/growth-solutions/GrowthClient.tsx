"use client";
import dynamic from "next/dynamic";

import React, { useRef } from "react";
import { ArrowRight, BarChart, TrendingUp, Search, Megaphone, Target, Share2, MousePointerClick, DollarSign } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
const ServiceComparison = dynamic(() => import("@/components/sections/services/ServiceComparison").then(mod => mod.ServiceComparison));
const CostEstimator = dynamic(() => import("@/components/sections/services/CostEstimator").then(mod => mod.CostEstimator));
const ServiceFAQ = dynamic(() => import("@/components/sections/services/ServiceFAQ").then(mod => mod.ServiceFAQ));
const ServicePricing = dynamic(() => import("@/components/sections/services/ServicePricing").then(mod => mod.ServicePricing));
import { GrowthCategoryCards } from "@/components/sections/services/growth/GrowthCategoryCards";
import { AnimatedTechStack } from "@/components/sections/AnimatedTechStack";
import { useWizard } from "@/context/WizardContext";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";
import { HeroVerticalStripes } from "@/components/ui/HeroVerticalStripes";
import { HoverFeatureCards } from "@/components/unlumen-ui/hover-feature-cards";

// SEO Sections
const BusinessNeedsSection = dynamic(() => import("@/components/sections/BusinessNeedsSection").then(mod => mod.BusinessNeedsSection));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
const GlobalReachSection = dynamic(() => import("@/components/sections/GlobalReachSection").then(mod => mod.GlobalReachSection));
const TechnologiesSection = dynamic(() => import("@/components/sections/TechnologiesSection").then(mod => mod.TechnologiesSection));

gsap.registerPlugin(ScrollTrigger, useGSAP);

const growthFeatures = [
  {
    name: "Traffic Generation",
    description: "Omnichannel SEO & Paid Ads targeting high-intent keywords across Google and Meta.",
    icon: <Search />,
    containerClassName: "bg-rose-500/5",
  },
  {
    name: "Audience Engagement",
    description: "Data-driven UI/UX engineered to reduce bounce rates and capture extreme attention.",
    icon: <MousePointerClick />,
    containerClassName: "bg-orange-500/5",
  },
  {
    name: "Lead Conversion",
    description: "Aggressive CRO strategies turning passive website visitors into qualified pipeline leads.",
    icon: <TrendingUp />,
    containerClassName: "bg-rose-500/5",
  },
  {
    name: "Revenue Scaling",
    description: "Continuous optimization maximizing your long-term ROI and Customer Lifetime Value.",
    icon: <DollarSign />,
    containerClassName: "bg-orange-500/5",
  }
];

const growthNeeds = [
  { title: "B2B Lead Generation", desc: "Engineered funnels that capture high-intent enterprise prospects through LinkedIn and programmatic SEO." },
  { title: "E-Commerce Scaling", desc: "Aggressive ROAS optimization for Shopify and WooCommerce stores across Google Shopping and Meta Ads." },
  { title: "SaaS Growth", desc: "Lowering Customer Acquisition Cost (CAC) while scaling trial sign-ups through content clusters." },
  { title: "Local SEO Dominance", desc: "Capturing regional search intent with optimized Google Business Profiles and localized landing pages." },
  { title: "Brand Authority", desc: "Digital PR and premium content marketing that positions your company as the definitive industry leader." },
  { title: "Conversion Optimization", desc: "A/B testing and behavioral analytics that squeeze maximum revenue from your existing website traffic." }
];

const growthProcessSteps = [
  { step: "01", title: "Comprehensive Audit", desc: "Deep technical analysis of your current SEO, ad accounts, and conversion funnels." },
  { step: "02", title: "Strategy Architecture", desc: "Mapping out the highest-ROI channels and creating a 12-month growth roadmap." },
  { step: "03", title: "Technical Foundation", desc: "Fixing Core Web Vitals, site speed, and indexability issues before scaling." },
  { step: "04", title: "Campaign Launch", desc: "Deploying highly targeted paid media campaigns and rolling out programmatic content." },
  { step: "05", title: "Conversion Optimization", desc: "Running continuous A/B tests on landing pages to maximize lead capture." },
  { step: "06", title: "Data Analysis", desc: "Tracking granular metrics through GA4, PostHog, and server-side tracking." },
  { step: "07", title: "Aggressive Scaling", desc: "Pouring budget into winning campaigns while ruthlessly cutting underperformers." },
  { step: "08", title: "Transparent Reporting", desc: "Providing real-time dashboards that show exactly how your marketing dollars turn into revenue." }
];

const growthTechs = [
  { category: "Performance Media", icon: <Target className="w-6 h-6 text-emerald-400" />, techs: ["Google Ads (PMax & Search)", "Meta Ads (Facebook/IG)", "LinkedIn Ads", "TikTok For Business", "Programmatic Display"] },
  { category: "SEO & Content", icon: <Search className="w-6 h-6 text-blue-400" />, techs: ["Ahrefs / Semrush", "Screaming Frog", "Programmatic SEO", "Schema Markup", "Content Clusters", "Digital PR"] },
  { category: "Analytics & Data", icon: <BarChart className="w-6 h-6 text-purple-400" />, techs: ["Google Analytics 4", "PostHog / Mixpanel", "Segment", "Server-Side GTM", "Looker Studio"] },
  { category: "Conversion (CRO)", icon: <MousePointerClick className="w-6 h-6 text-orange-400" />, techs: ["VWO / Optimizely", "Hotjar / Clarity", "Unbounce", "Figma", "Custom Landing Pages"] }
];

export default function GrowthClientPage({ growthTiers, exchangeRate, basePrice, comparisonFeatures = [], cmsFeatures = [] }: { growthTiers: any[], exchangeRate: number, basePrice: number, comparisonFeatures?: any[], cmsFeatures?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  useGSAP(() => {
    // Cinematic pop-up scale reveal
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0, scale: 0.85, filter: 'blur(12px)' },
        { 
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 0, 
          opacity: 1, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2, 
          ease: "expo.out"
        }
      );
    });

    // 3D Parallax Dashboard
    gsap.to('.dash-layer-1', {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to('.dash-layer-2', {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Animated Funnel 3D Scroll
    const funnelSteps = gsap.utils.toArray('.funnel-step');
    funnelSteps.forEach((step: any, i) => {
      gsap.fromTo(step, 
        { scale: 0.8, opacity: 0, z: -500 },
        {
          scrollTrigger: {
            trigger: ".funnel-section",
            start: `top+=${i * 150} center`,
            end: `top+=${(i + 1) * 150} center`,
            scrub: true
          },
          scale: 1,
          opacity: 1,
          z: 0,
          ease: "power1.inOut"
        }
      );
    });

  }, { scope: containerRef });

  return (
    <main className="relative z-0 min-h-[100dvh] bg-transparent text-white selection:bg-rose-500/30 font-sans" ref={containerRef}>
      <GlobalSplineBackground tintColor="bg-rose-900/30 mix-blend-color" />
      <NotchNavbar />
      
      {/* 1. Hero Section (Floating Dashboard Marketing Edition - Dark Rose/Black) */}
      <section className="hero-section relative w-full pt-40 pb-16 min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
        {/* Animated vertical stripes hero background */}
        <HeroVerticalStripes variant="rose" />
        {/* Floating Reports / Graphs Parallax */}
        <div className="absolute top-[20%] left-[10%] w-64 h-48 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 hidden lg:flex flex-col gap-4 dash-layer-2 transform -rotate-6 shadow-[0_8px_40px_rgba(244,63,94,0.12)] z-10">
          <div className="flex items-center gap-4 text-white/50">
            <TrendingUp className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-medium">Conversion Rate</span>
          </div>
          <div className="text-4xl font-bold text-white">+142%</div>
          <div className="w-full h-12 bg-white/5 rounded-xl overflow-hidden relative mt-auto">
            <div className="absolute bottom-0 left-0 h-full w-[80%] bg-gradient-to-r from-rose-500/40 to-orange-500/80" />
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[10%] w-80 h-64 rounded-[2rem] bg-[#0A0A0A] border border-white/10 shadow-[0_12px_50px_rgba(244,63,94,0.15)] p-8 hidden lg:flex flex-col gap-4 dash-layer-1 transform rotate-3 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-white/50 mb-4">
            <BarChart className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">Revenue Growth</span>
          </div>
          <div className="flex items-end gap-2 h-full">
            {[40, 60, 45, 80, 65, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-t-sm transition-all duration-1000 overflow-hidden" style={{ height: `${h}%` }}>
                <div className="w-full h-full bg-gradient-to-t from-orange-500/40 to-rose-500/90 rounded-t-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
          <div className="reveal-up mb-12 inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400 backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.1)]">
            Performance Architecture
          </div>
          
          <h1 className="reveal-up text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-4">
            Scale with
          </h1>
          <h1 className="reveal-up text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-rose-400 to-orange-600 pb-4 mb-8">
            velocity.
          </h1>
          
          <p className="reveal-up text-lg md:text-2xl text-neutral-400 max-w-2xl mb-16 font-light leading-relaxed tracking-wide">
            We don't guess. We engineer data-driven growth pipelines that consistently capture market share and drive exponential revenue.
          </p>
          
          <div className="reveal-up flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
            <button 
              onClick={() => openWizard("growth")}
              className="group relative flex items-center gap-4 h-16 pl-8 pr-2.5 rounded-full bg-white text-black font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span className="text-lg">Start Project</span>
              <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                <ArrowRight className="w-5 h-5 text-black" strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Marketing Services (Bento Grid) */}
      <section className="relative w-full py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-24 reveal-up">
          <div className="flex flex-col gap-4 mb-16">
            <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit">
              Omnichannel Dominance
            </div>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Engineered campaigns across <br /> every high-intent touchpoint.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {[
              { icon: <Search />, title: "Technical SEO", desc: "Dominate search engine real estate with programmatic architectures and elite content clusters.", colSpan: "col-span-1 md:col-span-2" },
              { icon: <Target />, title: "Performance Ads", desc: "Hyper-targeted Google and Meta campaigns optimized purely for CPA and ROAS.", colSpan: "col-span-1 md:col-span-1" },
              { icon: <Megaphone />, title: "Brand Engineering", desc: "Positioning strategies that command premium pricing and absolute market authority.", colSpan: "col-span-1 md:col-span-1" },
              { icon: <Share2 />, title: "Social Acquisition", desc: "Viral organic loops combined with precise paid amplification.", colSpan: "col-span-1 md:col-span-2" }
            ].map((service, i) => (
              <div key={i} className={`reveal-up w-full ${service.colSpan} p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] group hover:bg-rose-900/10 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer shadow-2xl`}>
                <div className="w-full h-full rounded-[calc(2rem-0.25rem)] bg-[#050505]/80 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.05),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  
                  <div className="w-12 h-12 rounded-2xl border border-rose-500/20 bg-rose-500/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, { className: "w-6 h-6 text-rose-400", strokeWidth: 1.5 })}
                  </div>
                  
                  <div className="flex flex-col z-10">
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3D Growth Funnel */}
      <section className="funnel-section relative w-full pt-32 pb-32 bg-transparent overflow-visible perspective-[1500px]">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-rose-500/20 text-rose-400 mb-16">
            The Framework
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-24">Website Growth Engine</h2>
          
          <div className="relative w-full max-w-6xl mt-12 mb-12 reveal-up">
            <HoverFeatureCards 
              items={growthFeatures} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full" 
            />
          </div>
        </div>
      </section>

      {/* 4. Platforms & Infrastructure */}
      <AnimatedTechStack 
        title="Ad Networks & Analytics" 
        technologies={["Google Ads", "Meta", "LinkedIn", "TikTok", "PostHog", "Google Analytics 4", "Segment", "Mixpanel"]} 
        theme="dark" 
      />

      {/* SEO Expansion Sections */}
      <TechnologiesSection 
        title="Growth & Marketing Stack"
        description="We leverage enterprise-grade analytics, programmatic SEO architectures, and algorithmic bidding platforms to dominate your market."
        technologies={growthTechs}
      />
      
      <BusinessNeedsSection 
        title="Digital Marketing for Every Business Stage"
        description="We architect data-driven acquisition pipelines tailored to your precise target audience and unit economics."
        items={growthNeeds}
      />

      <ProcessSection 
        title="Our Growth Methodology"
        description="A mathematical, test-driven approach to digital marketing that eliminates guesswork and maximizes ROI."
        steps={growthProcessSteps}
      />

      <GlobalReachSection 
        title="Marketing Solutions for Indian & Global Brands"
        description="XENOTECT drives exponential growth for companies worldwide. From hyper-localized SEO in India to cross-border performance campaigns targeting North America and Europe, we engineer marketing strategies that scale globally."
      />

      {/* Components from Existing Architecture (Wrapped in Premium Spacing) */}
      <div className="relative z-20 bg-transparent">
        <GrowthCategoryCards tiers={growthTiers} service="growth" />
      </div>

      <div className="relative z-20 py-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-20 md:gap-40">
        {comparisonFeatures && comparisonFeatures.length > 0 && <div className="scroll-reveal"><ServiceComparison features={comparisonFeatures} /></div>}
        <div className="scroll-reveal"><ServiceFAQ service="growth" /></div>
      </div>

      {/* 5. Massive CTA */}
      <section className="relative w-full py-56 overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05),transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center reveal-up">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 leading-[0.9]">Ignite your growth.</h2>
          
          <button 
            onClick={() => openWizard("growth")}
            className="group relative flex items-center gap-6 h-20 pl-12 pr-3 rounded-full bg-white text-black font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <span className="text-2xl tracking-tight">Scale Revenue</span>
            <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1.5 group-hover:scale-105">
              <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
