"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { XCircle, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WebProblems() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray('.problem-reveal').forEach((el: any, i) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { 
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out"
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex flex-col items-center text-center gap-4 mb-20 problem-reveal">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-red-500/10 border border-red-500/20 text-red-400">
            The Problem
          </div>
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Why your current site <br className="hidden md:block" /> is losing you money.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Before Column */}
          <div className="problem-reveal flex flex-col gap-6 p-8 md:p-12 rounded-[2rem] bg-red-950/20 border border-red-900/30">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-semibold text-red-100">Generic Templates</h3>
            </div>
            
            <ul className="flex flex-col gap-6">
              {[
                "Slow loading speeds that kill conversion rates before users even see your offer.",
                "Cookie-cutter designs that make you look identical to your cheapest competitor.",
                "Bloated WordPress plugins causing security vulnerabilities and maintenance nightmares.",
                "Mobile experiences that feel like an afterthought, frustrating mobile buyers."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500/70 shrink-0 mt-0.5" />
                  <p className="text-red-200/60 leading-relaxed text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="problem-reveal flex flex-col gap-6 p-8 md:p-12 rounded-[2rem] bg-emerald-950/20 border border-emerald-900/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <Zap className="w-8 h-8 text-emerald-400 fill-emerald-400/20" />
              <h3 className="text-2xl font-semibold text-emerald-100">Xenotect Architecture</h3>
            </div>
            
            <ul className="flex flex-col gap-6 relative z-10">
              {[
                "Sub-second load times engineered with Next.js edge caching and optimized assets.",
                "Bespoke UI/UX that establishes absolute market authority and builds instant trust.",
                "Clean, decoupled headless architecture. Zero plugin bloat. Enterprise security.",
                "Mobile-first responsive grids that feel like native applications."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-100/70 leading-relaxed text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
