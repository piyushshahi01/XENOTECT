"use client";

import React from "react";
import Link from "next/link";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

export function GlassAgencyHero() {
  return (
    <section className="relative isolate flex flex-col min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* Shader wrapper */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Shader style={{ width: "100%", height: "100%", display: "block" }}>
          <Swirl colorA="#0a0a0a" colorB="#141414" detail={1.7} />
          <ChromaFlow 
            baseColor="#0a0a0a" 
            downColor="#0044ff" 
            leftColor="#56c2fc" 
            rightColor="#5b4fff" 
            upColor="#7f66ff" 
            momentum={13} 
            radius={3.5} 
          />
          <FlutedGlass 
            aberration={0.61} 
            angle={31} 
            frequency={8} 
            highlight={0.12} 
            highlightSoftness={0} 
            lightAngle={-90} 
            refraction={4} 
            shape="rounded" 
            softness={1} 
            speed={0.15} 
          />
          <FilmGrain strength={0.05} />
        </Shader>
        
        {/* Bottom Blend Gradient to fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>


      {/* Headline Row */}
      <section className="relative z-10 mt-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10 px-6 pb-10 sm:px-12 sm:pb-14">
        
        {/* Headline Wrap */}
        <div className="max-w-3xl">
          <h1 
            className="reveal font-display font-medium tracking-[-0.03em] leading-[0.95] text-balance"
            style={{ 
              fontSize: "clamp(3rem, 7.5vw, 6rem)", 
              "--reveal-delay": "0.25s" 
            } as React.CSSProperties}
          >
            Automate with <em className="font-[family-name:var(--font-instrument)] font-normal italic text-[#0044ff]">intelligence.</em>
          </h1>
        </div>

        {/* Client Strip */}
        <div 
          className="reveal hidden lg:block shrink-0 text-right"
          style={{ "--reveal-delay": "0.55s" } as React.CSSProperties}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/50">
            Capabilities
          </p>
          <ul className="mt-3 space-y-1 text-sm text-white/60">
            <li>Voice Agents</li>
            <li>Intelligent Chatbots</li>
            <li>Autonomous Workflows</li>
            <li>CRM Automation</li>
          </ul>
        </div>
      </section>

      {/* Reveal CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          animation: reveal-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--reveal-delay, 0s);
        }
        @keyframes reveal-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none; opacity: 1; transform: none; }
        }
      `}} />
    </section>
  );
}
