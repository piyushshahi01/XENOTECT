"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { XenotectNav } from "@/components/ui/XenotectNav";
import { Footer } from "@/components/sections/Footer";

// Web Solution Specific Sections
import { WebHero } from "@/components/sections/services/web/WebHero";
import { WebBentoGrid } from "@/components/sections/services/web/WebBentoGrid";
import { WebProblems } from "@/components/sections/services/web/WebProblems";
import { WebProcessTimeline } from "@/components/sections/services/web/WebProcessTimeline";
import { AnimatedTechStack } from "@/components/sections/AnimatedTechStack";
import { WebIncludedFeatures } from "@/components/sections/services/web/WebIncludedFeatures";

import { ServicePricing } from "@/components/sections/services/ServicePricing";
import { ServiceComparison } from "@/components/sections/services/ServiceComparison";
import { CostEstimator } from "@/components/sections/services/CostEstimator";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { useWizard } from "@/context/WizardContext";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WebClientPage({ webTiers, exchangeRate, basePrice, comparisonFeatures = [], cmsFeatures = [] }: { webTiers: any[], exchangeRate: number, basePrice: number, comparisonFeatures?: any[], cmsFeatures?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  useGSAP(() => {
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 },
        { 
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out"
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main className="relative z-0 min-h-[100dvh] bg-transparent text-white font-sans overflow-x-hidden selection:bg-white/30" ref={containerRef}>
      <GlobalSplineBackground tintColor="bg-slate-900/30 mix-blend-color" />
      <XenotectNav />
      
      {/* 1. Hero Section */}
      <WebHero />

      {/* 2. What We Build */}
      <WebBentoGrid />

      {/* 3. Problems We Solve */}
      <WebProblems />

      {/* 4. Development Process */}
      <WebProcessTimeline />

      {/* 5. Technology Stack */}
      <AnimatedTechStack 
        title="Modern Web Stack" 
        technologies={["React", "Next.js", "TypeScript", "Node.js", "Three.js", "PostgreSQL", "TailwindCSS", "GSAP"]} 
        theme="dark" 
      />

      {/* 6. Pricing */}
      <ServicePricing service="web" tiers={webTiers} />

      {/* 7. Feature Comparison */}
      {comparisonFeatures && comparisonFeatures.length > 0 && (
        <div className="relative z-20 py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 reveal-up">
            <ServiceComparison features={comparisonFeatures} />
          </div>
        </div>
      )}

      {/* 8. Website Cost Calculator */}
      <div className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 reveal-up">
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-white/70">
              Transparent Pricing
            </div>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Website Cost Calculator
            </h2>
          </div>
          <CostEstimator service="web" exchangeRate={exchangeRate} basePrice={basePrice} cmsFeatures={cmsFeatures} />
        </div>
      </div>

      {/* 9. What's Included */}
      <WebIncludedFeatures />

      {/* 10. FAQs */}
      <div className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 reveal-up">
          <ServiceFAQ service="web" />
        </div>
      </div>

      {/* 11. Massive CTA */}
      <section className="relative w-full py-56 overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center reveal-up">
          <h2 className="text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tighter mb-16 leading-[0.9]">
            Start building.
          </h2>
          
          <button 
            onClick={() => openWizard("web")}
            className="group relative flex items-center gap-6 h-20 pl-12 pr-3 rounded-full bg-white text-black font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <span className="text-2xl tracking-tight">Initiate Protocol</span>
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
