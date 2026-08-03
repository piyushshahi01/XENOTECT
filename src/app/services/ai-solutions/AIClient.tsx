"use client";

import React, { useRef } from "react";
import { ArrowRight, Mic, MessageSquare, PhoneCall, Zap, BrainCircuit, Activity, BarChart3, Fingerprint, Clock, Play, ArrowDownRight, Bot, Cpu } from "lucide-react";
import { XenotectNav } from "@/components/ui/XenotectNav";
import { Footer } from "@/components/sections/Footer";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ServiceComparison } from "@/components/sections/services/ServiceComparison";
import { CostEstimator } from "@/components/sections/services/CostEstimator";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { AICategoryCards } from "@/components/sections/services/ai/AICategoryCards";
import { AnimatedTechStack } from "@/components/sections/AnimatedTechStack";
import { useWizard } from "@/context/WizardContext";
import { HeroVerticalStripes } from "@/components/ui/HeroVerticalStripes";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AIClientPage({ aiTiers, exchangeRate, basePrice, comparisonFeatures = [], cmsFeatures = [] }: { aiTiers: any[], exchangeRate: number, basePrice: number, comparisonFeatures?: any[], cmsFeatures?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  useGSAP(() => {
    // Hero elements animate immediately on load to prevent empty blocks
    gsap.fromTo('.hero-reveal',
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );

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

    // Cinematic fade-up for scroll elements
    gsap.utils.toArray('.scroll-reveal').forEach((el: any) => {
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
          duration: 1.4, 
          ease: "power3.out"
        }
      );
    });

    // Ambient Orchid Particles
    gsap.to('.orchid-particle', {
      y: "random(-60, 60)",
      x: "random(-60, 60)",
      scale: "random(0.5, 1.5)",
      opacity: "random(0.3, 0.8)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15
    });

    // Z-Axis Cascade
    const cascadeCards = gsap.utils.toArray('.cascade-card');
    cascadeCards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { y: 150, z: -100, rotateX: 5, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          y: 0,
          z: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out"
        }
      );
    });

  }, { scope: containerRef });

  return (
    <main className="relative z-0 min-h-[100dvh] bg-transparent text-[#E6E6E6] selection:bg-[#00E5FF]/30 font-sans" ref={containerRef}>
      <GlobalSplineBackground tintColor="bg-blue-900/40 mix-blend-color" />
      <XenotectNav />
      
      {/* 1. Hero Section (Floating Dashboard AI Edition - Dark Blue/Black) */}
      <section className="hero-section relative w-full pt-40 pb-16 min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
        {/* Animated vertical stripes hero background */}
        <HeroVerticalStripes variant="blue" />
        <div className="absolute top-[20%] left-[10%] w-64 h-48 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 hidden lg:flex flex-col gap-4 dash-layer-2 transform -rotate-6 shadow-[0_8px_40px_rgba(0,68,255,0.12)] z-10">
          <div className="flex items-center gap-4 text-white/50">
            <Cpu className="w-5 h-5 text-[#0044ff]" />
            <span className="text-sm font-medium">Automated Tasks</span>
          </div>
          <div className="text-4xl font-bold text-white">+4,200<span className="text-xl text-white/50">/hr</span></div>
          <div className="w-full h-12 bg-white/5 rounded-xl overflow-hidden relative mt-auto">
            <div className="absolute bottom-0 left-0 h-full w-[80%] bg-gradient-to-r from-[#001188] to-[#0044ff]" />
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[10%] w-80 h-64 rounded-[2rem] bg-[#0A0A0A] border border-white/10 shadow-[0_12px_50px_rgba(0,68,255,0.15)] p-8 hidden lg:flex flex-col gap-4 dash-layer-1 transform rotate-3 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-white/50 mb-4">
            <Bot className="w-5 h-5 text-[#0044ff]" />
            <span className="text-sm font-medium">Response Latency</span>
          </div>
          <div className="flex items-end gap-2 h-full">
            {[40, 60, 45, 80, 65, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-t-sm transition-all duration-1000 overflow-hidden" style={{ height: `${h}%` }}>
                <div className="w-full h-full bg-gradient-to-t from-[#001188] to-[#0044ff] rounded-t-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
          <div className="hero-reveal mb-12 inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0044ff]/10 border border-[#0044ff]/20 text-[#6699ff] backdrop-blur-md shadow-[0_0_30px_rgba(0,68,255,0.1)]">
            Cognitive Infrastructure
          </div>
          
          <h1 className="hero-reveal text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-4">
            Automate with
          </h1>
          <h1 className="hero-reveal text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-[#6699ff] to-[#0022cc] pb-4 mb-8">
            intelligence.
          </h1>
          
          <p className="hero-reveal text-lg md:text-2xl text-white/40 max-w-2xl mb-16 font-light leading-relaxed tracking-wide">
            We don't just build chatbots. We engineer autonomous systems that handle complex operations, allowing your business to scale without limits.
          </p>
          
          <div className="hero-reveal flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
            <button 
              onClick={() => openWizard("ai")}
              className="group relative flex items-center gap-4 h-16 pl-8 pr-2.5 rounded-full bg-white text-[#001188] font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(0,68,255,0.2)]"
            >
              <span className="text-lg">Start Project</span>
              <div className="w-11 h-11 rounded-full bg-[#0044ff]/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                <ArrowRight className="w-5 h-5 text-[#0044ff]" strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Asymmetrical Bento (Cognitive Infrastructure) */}
      <section className="relative w-full pt-16 pb-32 px-4 sm:px-6 max-w-[1400px] mx-auto">
        <div className="mb-24 scroll-reveal flex flex-col items-start lg:items-center lg:text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Autonomous Workflows</h2>
          <p className="text-white/40 text-xl font-light max-w-2xl">Modular AI architectures that integrate directly into your operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[350px] md:auto-rows-[450px]">
          
          {/* Bento Large Feature (Col 8) */}
          <div className="scroll-reveal md:col-span-8 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#00E5FF]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#00E5FF]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700">
                <Mic className="w-8 h-8 text-[#00E5FF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white mb-4 relative z-10">Voice Agents</h3>
              <p className="text-white/50 text-xl font-light relative z-10 leading-relaxed max-w-lg">Human-sounding AI that handles inbound support and outbound sales calls flawlessly.</p>
            </div>
          </div>

          {/* Bento Small Feature (Col 4) */}
          <div className="scroll-reveal md:col-span-4 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#00E5FF]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700">
                <Zap className="w-8 h-8 text-[#00E5FF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white mb-3 relative z-10">Automation</h3>
              <p className="text-white/50 text-lg font-light relative z-10 leading-relaxed">Trigger-based LLM routing connecting your CRM seamlessly.</p>
            </div>
          </div>

          {/* Bento Small Feature (Col 5) */}
          <div className="scroll-reveal md:col-span-5 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#00E5FF]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700">
                <MessageSquare className="w-8 h-8 text-[#00E5FF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white mb-3 relative z-10">Knowledge Chatbots</h3>
              <p className="text-white/50 text-lg font-light relative z-10 leading-relaxed">Trained on your internal wiki to answer complex employee queries instantly.</p>
            </div>
          </div>

          {/* Bento Wide Feature (Col 7) */}
          <div className="scroll-reveal md:col-span-7 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#00E5FF]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700">
                <BrainCircuit className="w-8 h-8 text-[#00E5FF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white mb-4 relative z-10">Custom LLMs</h3>
              <p className="text-white/50 text-xl font-light relative z-10 leading-relaxed max-w-lg">Fine-tuned models deployed securely on private infrastructure for absolute data privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Z-Axis Cascade (The Problem vs Solution) */}
      <section className="relative w-full py-40 overflow-visible">
        {/* Removed hardcoded background tint that was cutting across the Spline */}
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mb-32 scroll-reveal">
          <div className="inline-flex rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border border-[#00E5FF]/20 text-[#00E5FF] mb-8 bg-[#00E5FF]/5">
            The Bottleneck
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
            Human scaling is linear.<br/>
            <span className="text-[#00E5FF] italic">AI scaling is exponential.</span>
          </h2>
          <p className="text-white/40 text-xl font-light max-w-2xl mx-auto">
            Decouple your revenue growth from your headcount. Scale indefinitely with fixed software costs.
          </p>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col gap-12 pb-32">
          
          <div className="cascade-card p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-2xl relative z-[3]">
            <div className="w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl p-12 flex flex-col md:flex-row items-center gap-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                <Activity className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">Infinite Concurrency</h3>
                <p className="text-white/50 text-xl leading-relaxed">AI agents handle 10,000 calls simultaneously without breaking a sweat or waiting on hold.</p>
              </div>
            </div>
          </div>

          <div className="cascade-card p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/10 shadow-2xl relative z-[2] -mt-20 md:-mt-24 ml-0 md:ml-12 opacity-90 scale-[0.98]">
            <div className="w-full rounded-[calc(2.5rem-0.5rem)] bg-black/35 backdrop-blur-xl p-12 flex flex-col md:flex-row items-center gap-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                <Clock className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">Zero Latency</h3>
                <p className="text-white/50 text-xl leading-relaxed">Sub-second response times, 24 hours a day, 365 days a year. No holidays.</p>
              </div>
            </div>
          </div>

          <div className="cascade-card p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/10 shadow-2xl relative z-[1] -mt-20 md:-mt-24 ml-0 md:ml-24 opacity-80 scale-[0.96]">
            <div className="w-full rounded-[calc(2.5rem-0.5rem)] bg-black/30 backdrop-blur-xl p-12 flex flex-col md:flex-row items-center gap-10 border border-white/5">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                <BarChart3 className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">Fixed Margins</h3>
                <p className="text-white/50 text-xl leading-relaxed">Your support capability scales instantly. Your costs stay entirely flat.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. AI Tech Stack */}
      <AnimatedTechStack 
        title="Neural Ecosystem" 
        technologies={["OpenAI", "Claude 3.5", "Gemini 1.5 Pro", "LangChain", "Llama 3", "Vapi"]} 
        theme="dark" 
      />

      {/* Components from Existing Architecture 
          Wrapped natively since we are back in dark mode! 
      */}
      <div className="relative z-20 bg-transparent">
        <AICategoryCards tiers={aiTiers} service="ai" />
      </div>

      <div className="relative z-20 py-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-20 md:gap-40">
        {comparisonFeatures && comparisonFeatures.length > 0 && <div className="scroll-reveal"><ServiceComparison features={comparisonFeatures} /></div>}
        <div className="scroll-reveal"><CostEstimator service="ai" exchangeRate={exchangeRate} basePrice={basePrice} cmsFeatures={cmsFeatures} /></div>
        <div className="scroll-reveal"><ServiceFAQ service="ai" /></div>
      </div>

      {/* 5. Massive CTA (Double Bezel) */}
      <section className="relative w-full py-40 px-4 sm:px-6 flex justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="scroll-reveal w-full max-w-6xl p-2 rounded-[3.5rem] bg-[#1D1D1D] border border-white/10 relative shadow-[0_0_100px_rgba(0,229,255,0.1)]">
          <div className="w-full rounded-[calc(3.5rem-0.5rem)] bg-[#0A0A0A] p-16 md:p-32 flex flex-col items-center text-center relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-[#00E5FF]/20 blur-[180px] rounded-full pointer-events-none" />
            
            <h2 className="text-6xl md:text-9xl font-bold tracking-tight mb-16 leading-[0.95] text-white relative z-10 drop-shadow-2xl">
              Automate <br/> everything.
            </h2>
            
            <button 
              onClick={() => openWizard("ai")}
              className="group relative flex items-center h-20 pl-10 pr-3 rounded-full bg-[#00E5FF] text-[#1D1D1D] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_60px_rgba(0,229,255,0.4)] z-10"
            >
              <span className="text-[14px] uppercase tracking-[0.15em] font-bold mr-8">Consult AI Architect</span>
              <div className="w-14 h-14 rounded-full bg-[#1D1D1D]/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                <ArrowRight className="w-6 h-6 text-[#1D1D1D]" strokeWidth={2} />
              </div>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
