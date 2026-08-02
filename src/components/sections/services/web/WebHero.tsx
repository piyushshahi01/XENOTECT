"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { HLSBackground } from "@/components/ui/hls-background";
import { useWizard } from "@/context/WizardContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WebHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWizard } = useWizard();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".hero-title", 
      { opacity: 0, y: 30, filter: "blur(10px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-desc", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-cta", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );



  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="web-hero relative w-full min-h-[100dvh] flex flex-col justify-start pt-[20vh] items-center overflow-hidden">
      <HLSBackground url="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
      


      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col items-center text-center gap-8">
        
        {/* Badge */}
        <div className="hero-badge rounded-full p-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent">
          <div className="bg-[#09090B]/80 backdrop-blur-md rounded-full px-5 py-2 flex items-center justify-center border border-white/5">
            <span className="font-mono text-sm text-[#A1A1AA]">Xenotect Premium Web Solutions</span>
          </div>
        </div>
        
        {/* Massive Headline */}
        <h1 className="hero-title font-sans text-5xl md:text-[72px] lg:text-[88px] font-bold leading-[0.9] tracking-tighter text-white max-w-5xl drop-shadow-2xl">
          Architect the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-700">Digital Realm.</span>
        </h1>
        
        {/* Description */}
        <p className="hero-desc font-sans text-xl leading-relaxed text-neutral-400 max-w-2xl mt-4">
          Bespoke high-performance web applications, striking landing pages, and complex digital platforms engineered for absolute market dominance.
        </p>
        
        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center gap-6 mt-8">
          <button 
            onClick={() => openWizard("web")}
            className="group relative flex items-center gap-4 h-16 pl-8 pr-2.5 rounded-full bg-white text-black font-semibold transition-all duration-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-lg">Start Project</span>
            <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 group-hover:translate-x-1 group-hover:scale-105">
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </button>
        </div>


      </div>
    </section>
  );
}
