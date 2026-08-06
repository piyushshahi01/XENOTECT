"use client";

import React, { useRef } from "react";
import { ArrowRight, BarChart, TrendingUp, Search, Megaphone, Target, Share2 } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { ServiceComparison } from "@/components/sections/services/ServiceComparison";
import { CostEstimator } from "@/components/sections/services/CostEstimator";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServicePricing } from "@/components/sections/services/ServicePricing";
import { GrowthCategoryCards } from "@/components/sections/services/growth/GrowthCategoryCards";
import { AnimatedTechStack } from "@/components/sections/AnimatedTechStack";
import { useWizard } from "@/context/WizardContext";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";
import { HeroVerticalStripes } from "@/components/ui/HeroVerticalStripes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function GrowthClientPage({ growthTiers, exchangeRate, basePrice, comparisonFeatures = [], cmsFeatures = [] }: { growthTiers: any[], exchangeRate: number, basePrice: number, comparisonFeatures?: any[], cmsFeatures?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  useGSAP(() => {
    // Cinematic fade-up
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 80, opacity: 0, filter: 'blur(8px)' },
        { 
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 1.5, 
          ease: "power4.out"
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
          
          <p className="reveal-up text-lg md:text-2xl text-white/40 max-w-2xl mb-16 font-light leading-relaxed tracking-wide">
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

      {/* 2. Marketing Services (Massive Typography Blocks) */}
      <section className="relative w-full py-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-24 reveal-up">
          <div className="mb-32 reveal-up">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">Omnichannel Dominance</h2>
            <p className="text-white/40 text-xl font-light">Engineered campaigns across every high-intent touchpoint.</p>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {[
              { icon: <Search />, title: "Technical SEO", desc: "Dominate search engine real estate with programmatic architectures and elite content clusters." },
              { icon: <Target />, title: "Performance Ads", desc: "Hyper-targeted Google and Meta campaigns optimized purely for CPA and ROAS." },
              { icon: <Megaphone />, title: "Brand Engineering", desc: "Positioning strategies that command premium pricing and absolute market authority." },
              { icon: <Share2 />, title: "Social Acquisition", desc: "Viral organic loops combined with precise paid amplification." }
            ].map((service, i) => (
              <div key={i} className="reveal-up w-full p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] group hover:bg-rose-900/10 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer">
                <div className="w-full rounded-[calc(2.5rem-0.5rem)] bg-black/30 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.05),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  
                  <div className="w-20 h-20 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, { className: "w-8 h-8 text-rose-400", strokeWidth: 1.5 })}
                  </div>
                  
                  <div className="flex flex-col z-10">
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-4">{service.title}</h3>
                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-3xl">{service.desc}</p>
                  </div>
                  
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block z-10">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                      <ArrowRight className="w-6 h-6 text-white/50" />
                    </div>
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
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-24">Revenue Physics</h2>
          
          <div className="relative w-full max-w-4xl flex flex-col items-center justify-center gap-6 perspective-[1500px]">
            {/* Background connection line */}
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/0 via-rose-500/50 to-orange-500/0 -z-10" />

            {[
              { title: "Acquisition", stat: "100K+ Impressions", color: "from-rose-500 to-rose-600", width: "w-full" },
              { title: "Activation", stat: "15% Click Rate", color: "from-rose-600 to-orange-500", width: "w-[85%]" },
              { title: "Conversion", stat: "4.2% Lead Gen", color: "from-orange-500 to-orange-600", width: "w-[70%]" },
              { title: "Retention", stat: "$450 LTV", color: "from-orange-600 to-amber-500", width: "w-[55%]" }
            ].map((layer, i) => (
              <div key={i} className={`funnel-step ${layer.width} h-36 rounded-[2rem] bg-gradient-to-r ${layer.color} p-[1px] transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
                <div className="w-full h-full bg-black/60 rounded-[calc(2rem-1px)] flex items-center justify-between px-12 relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
                  <span className="text-3xl font-bold text-white relative z-10">{layer.title}</span>
                  <span className="text-xl font-medium text-white/50 relative z-10">{layer.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Platforms & Infrastructure */}
      <AnimatedTechStack 
        title="Ad Networks & Analytics" 
        technologies={["Google Ads", "Meta", "LinkedIn", "TikTok", "PostHog", "Google Analytics 4", "Segment", "Mixpanel"]} 
        theme="dark" 
      />

      {/* Components from Existing Architecture (Wrapped in Premium Spacing) */}
      <div className="relative z-20 bg-transparent">
        <GrowthCategoryCards tiers={growthTiers} service="growth" />
      </div>

      <div className="relative z-20 py-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-20 md:gap-40">
        {comparisonFeatures && comparisonFeatures.length > 0 && <div className="scroll-reveal"><ServiceComparison features={comparisonFeatures} /></div>}
        <div className="scroll-reveal"><CostEstimator service="growth" exchangeRate={exchangeRate} basePrice={basePrice} cmsFeatures={cmsFeatures} /></div>
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
