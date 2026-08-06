"use client";

import React, { useRef, useEffect } from "react";
import { animate, utils } from "animejs";
import { ArrowRight, Mic, MessageSquare, PhoneCall, Zap, BrainCircuit, Activity, BarChart3, Fingerprint, Clock, Play, ArrowDownRight, Bot, Cpu } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { useAnimeReveal } from "@/hooks/useAnimeReveal";
import { ServiceComparison } from "@/components/sections/services/ServiceComparison";
import { CostEstimator } from "@/components/sections/services/CostEstimator";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { AICategoryCards } from "@/components/sections/services/ai/AICategoryCards";
import { AnimatedTechStack } from "@/components/sections/AnimatedTechStack";
import { useWizard } from "@/context/WizardContext";
import { HeroVerticalStripes } from "@/components/ui/HeroVerticalStripes";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";
import { GlassAgencyHero } from "@/components/sections/services/ai/GlassAgencyHero";

export default function AIClientPage({ aiTiers, exchangeRate, basePrice, comparisonFeatures = [], cmsFeatures = [] }: { aiTiers: any[], exchangeRate: number, basePrice: number, comparisonFeatures?: any[], cmsFeatures?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  // Initialize anime.js scroll reveal hook for all elements with .scroll-reveal
  useAnimeReveal({
    selector: ".scroll-reveal",
    threshold: 0.1,
    animationProps: {
      y: [80, 0],
      opacity: [0, 1],
      duration: 1200,
      ease: "outCubic",
    }
  });

  // Continuous floating animation for premium feel
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    animate('.anime-float', {
      translateY: ['-5px', '5px'],
      direction: 'alternate',
      loop: true,
      ease: 'inOutSine',
      duration: 2000,
      delay: utils.stagger(200)
    });
  }, []);

  return (
    <main className="relative z-0 min-h-[100dvh] bg-transparent text-[#E6E6E6] selection:bg-[#00E5FF]/30 font-sans" ref={containerRef}>
      <NotchNavbar />
      <GlassAgencyHero />


      {/* 2. Asymmetrical Bento (Cognitive Infrastructure) */}
      <section className="relative w-full pt-16 pb-32 px-4 sm:px-6 max-w-[1400px] mx-auto">
        <div className="mb-24 scroll-reveal flex flex-col items-start lg:items-center lg:text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6699ff] to-[#0044ff] italic font-[family-name:var(--font-instrument)] font-normal">Workflows</span>
          </h2>
          <p className="text-white/40 text-xl font-light max-w-2xl">Modular AI architectures that integrate directly into your operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[350px] md:auto-rows-[450px]">
          
          {/* Bento Large Feature (Col 8) */}
          <div className="scroll-reveal md:col-span-8 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#0044ff]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#0044ff]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 rounded-full border border-[#0044ff]/30 bg-[#0044ff]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700 anime-float">
                <Mic className="w-8 h-8 text-[#0044ff]" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white mb-4 relative z-10">Voice Agents</h3>
              <p className="text-white/50 text-xl font-light relative z-10 leading-relaxed max-w-lg">Human-sounding AI that handles inbound support and outbound sales calls flawlessly.</p>
            </div>
          </div>

          {/* Bento Small Feature (Col 4) */}
          <div className="scroll-reveal md:col-span-4 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#0044ff]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border border-[#0044ff]/30 bg-[#0044ff]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700 anime-float">
                <Zap className="w-8 h-8 text-[#0044ff]" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white mb-3 relative z-10">Automation</h3>
              <p className="text-white/50 text-lg font-light relative z-10 leading-relaxed">Trigger-based LLM routing connecting your CRM seamlessly.</p>
            </div>
          </div>

          {/* Bento Small Feature (Col 5) */}
          <div className="scroll-reveal md:col-span-5 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#0044ff]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border border-[#0044ff]/30 bg-[#0044ff]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700 anime-float">
                <MessageSquare className="w-8 h-8 text-[#0044ff]" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white mb-3 relative z-10">Knowledge Chatbots</h3>
              <p className="text-white/50 text-lg font-light relative z-10 leading-relaxed">Trained on your internal wiki to answer complex employee queries instantly.</p>
            </div>
          </div>

          {/* Bento Wide Feature (Col 7) */}
          <div className="scroll-reveal md:col-span-7 p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:border-[#0044ff]/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
            <div className="h-full w-full rounded-[calc(2.5rem-0.5rem)] bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-12 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-[#0044ff]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 rounded-full border border-[#0044ff]/30 bg-[#0044ff]/10 flex items-center justify-center backdrop-blur-md mb-auto group-hover:scale-110 transition-transform duration-700 anime-float">
                <BrainCircuit className="w-8 h-8 text-[#0044ff]" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white mb-4 relative z-10">Custom LLMs</h3>
              <p className="text-white/50 text-xl font-light relative z-10 leading-relaxed max-w-lg">Fine-tuned models deployed securely on private infrastructure for absolute data privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Exponential Stack (Premium Z-Axis Cards) */}
      <section className="relative w-full py-40 overflow-hidden">
        {/* Deep ambient glow behind the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0044ff]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mb-32 scroll-reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.25em] font-semibold border border-[#0044ff]/30 text-[#6699ff] mb-8 bg-[#0044ff]/10 shadow-[0_0_20px_rgba(0,68,255,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#0044ff] animate-pulse" />
            The Bottleneck
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">
            Human scaling is <span className="text-white/40">linear.</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6699ff] to-[#0044ff] italic">AI scaling is exponential.</span>
          </h2>
          <p className="text-white/40 text-xl font-light max-w-2xl mx-auto">
            Decouple your revenue growth from your headcount. Scale indefinitely with fixed software costs.
          </p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col gap-8 pb-32">
          
          {/* Connecting line behind cards */}
          <div className="absolute left-[88px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[#0044ff]/50 to-transparent hidden md:block" />
          
          {/* Card 1 */}
          <div className="group relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-[#0044ff]/20 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,68,255,0.15)] z-[3]">
            <div className="w-full rounded-[calc(2rem-1px)] bg-[#030303]/80 backdrop-blur-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0044ff]/20 to-transparent border border-[#0044ff]/30 flex items-center justify-center text-[#6699ff] shadow-[0_0_30px_rgba(0,68,255,0.2)] overflow-hidden anime-float">
                <div className="absolute inset-0 bg-[#0044ff] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                <Activity className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#6699ff] transition-colors duration-500">Infinite Concurrency</h3>
                <p className="text-white/50 text-xl font-light leading-relaxed">AI agents handle 10,000 calls simultaneously without breaking a sweat or waiting on hold. Every customer is instantly first in line.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-[#0044ff]/20 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,68,255,0.15)] z-[2] ml-0 md:ml-12 mt-4">
            <div className="w-full rounded-[calc(2rem-1px)] bg-[#050505]/80 backdrop-blur-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0044ff]/20 to-transparent border border-[#0044ff]/30 flex items-center justify-center text-[#6699ff] shadow-[0_0_30px_rgba(0,68,255,0.2)] overflow-hidden anime-float">
                <div className="absolute inset-0 bg-[#0044ff] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                <Clock className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#6699ff] transition-colors duration-500">Zero Latency</h3>
                <p className="text-white/50 text-xl font-light leading-relaxed">Sub-second response times, 24 hours a day, 365 days a year. No holidays, no sick leave, just relentless operational efficiency.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-[#0044ff]/20 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,68,255,0.15)] z-[1] ml-0 md:ml-24 mt-4">
            <div className="w-full rounded-[calc(2rem-1px)] bg-[#080808]/80 backdrop-blur-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0044ff]/20 to-transparent border border-[#0044ff]/30 flex items-center justify-center text-[#6699ff] shadow-[0_0_30px_rgba(0,68,255,0.2)] overflow-hidden anime-float">
                <div className="absolute inset-0 bg-[#0044ff] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                <BarChart3 className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#6699ff] transition-colors duration-500">Fixed Margins</h3>
                <p className="text-white/50 text-xl font-light leading-relaxed">Your support capability scales instantly in response to demand spikes, while your operational costs stay entirely flat.</p>
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
