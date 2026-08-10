"use client";

import React, { useEffect } from "react";
import { ArrowRight, Mic, Activity, MicOff, Phone, Grid } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export function AIVoiceAgentSection() {
  useEffect(() => {
    gsap.fromTo('.hero-reveal-voice',
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
      
      {/* Dark Mode Background Elements */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '64px 64px' }} 
      />

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Editorial Content */}
        <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-12">
          
          {/* Badges Row */}
          <div className="hero-reveal-voice flex flex-wrap items-center gap-4 mb-8 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60">
            <div className="px-4 py-1.5 rounded-full border border-white/20">
              AI Voice Integration
            </div>
            <div className="tracking-[0.15em] text-[#1A45DD]">
              Autonomous Call Center
            </div>
          </div>

          {/* Massive Serif Headline (matching the requested style) */}
          <h1 className="hero-reveal-voice text-[clamp(3.5rem,6vw,5.5rem)] font-display leading-[1.05] tracking-tight mb-8">
            <span className="block text-white">Flawless support.</span>
            <span className="block text-[#1A45DD] italic pr-4">Zero wait time.</span>
          </h1>

          <hr className="hero-reveal-voice w-full border-t border-white/10 mb-8" />

          {/* Subtext and Quote */}
          <div className="hero-reveal-voice flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <p className="flex-1 text-white/60 text-lg leading-relaxed font-light">
              We deploy advanced AI voice agents that sound completely human. Automate your inbound customer service, outbound sales, and appointment scheduling at infinite scale.
            </p>
            <div className="flex-1 border-l-2 border-[#1A45DD] pl-6 py-1">
              <p className="font-display text-2xl leading-tight mb-4 text-white/90">
                “It handles 10,000 concurrent calls without breaking a sweat.”
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Infinite Concurrency
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-reveal-voice flex flex-wrap items-center gap-4 mb-16">
            <button className="flex items-center gap-3 bg-white text-[#050505] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Activity className="w-4 h-4" />
              Deploy Agent
            </button>
            <button className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/5 transition-colors">
              View Capabilities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <hr className="hero-reveal-voice w-full border-t border-white/10 mb-8" />

          {/* Stats Row */}
          <div className="hero-reveal-voice flex flex-wrap items-center gap-12 lg:gap-20">
            <div>
              <span className="text-4xl font-display mr-2 text-white">0.5s</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Latency</span>
            </div>
            <div>
              <span className="text-4xl font-display mr-2 text-white">24/7</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Availability</span>
            </div>
            <div>
              <span className="text-4xl font-display mr-2 text-white">100%</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Brand Match</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Blue AI Agent Interface */}
        <div className="hero-reveal-voice lg:col-span-6 flex justify-center lg:justify-end w-full h-full mt-12 lg:mt-0">
          <div className="w-full max-w-[520px] aspect-[4/5] bg-gradient-to-br from-[#1A45DD] to-[#0A1D6B] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_80px_rgba(26,69,221,0.3)] flex flex-col justify-between text-white border border-white/10">
            
            {/* Top Bar */}
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-2">
                  Active Connection
                </p>
                <p className="text-lg font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Inbound Support Agent
                </p>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 backdrop-blur-md">
                <Mic className="w-3 h-3" /> Listening
              </div>
            </div>

            {/* Middle: Radar & AI Pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Concentric SVG Circles */}
              <svg className="w-full h-full absolute inset-0 opacity-20" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.5" />
                <circle cx="200" cy="200" r="220" stroke="white" strokeWidth="0.5" />
                {/* Orbiting dot */}
                <circle cx="200" cy="200" r="220" stroke="none" />
                <motion.circle 
                  cx="200" cy="200" r="140" 
                  stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="100 1000"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "200px", originY: "200px" }}
                />
              </svg>

              <div className="absolute top-[30%] left-[20%] px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest opacity-80">
                Processing intent...
              </div>

              {/* Central AI Orb */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 rounded-full bg-gradient-to-tr from-white/20 to-white/40 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.3)] backdrop-blur-xl border border-white/30 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <Activity className="w-8 h-8 text-[#1A45DD]" strokeWidth={2} />
                </div>
              </motion.div>
            </div>

            {/* Bottom: Voice Waveform & Live Transcript */}
            <div className="z-10 relative mt-auto flex flex-col gap-4">
              
              <div className="bg-black/20 rounded-2xl p-5 backdrop-blur-md border border-white/10">
                {/* Live Transcript Mock */}
                <div className="mb-6 space-y-4">
                  <div className="flex gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 shrink-0 flex items-center justify-center text-[10px]">U</div>
                    <p className="text-white/70">"Hi, I need to reschedule my consultation for tomorrow."</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-white shrink-0 flex items-center justify-center text-[10px] text-[#1A45DD] font-bold">AI</div>
                    <p className="text-white font-medium">"I can help with that. What time tomorrow works best for you?"</p>
                  </div>
                </div>

                {/* Waveform */}
                <div className="flex items-center justify-center gap-[3px] h-8 opacity-80">
                  {[...Array(40)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05, ease: "easeInOut" }}
                      className="w-1 rounded-full bg-white"
                      style={{ height: '20%' }}
                    />
                  ))}
                </div>
              </div>

              {/* Call Control Buttons */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors">
                  <MicOff className="w-5 h-5 text-white" />
                </button>
                <button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-white fill-current rotate-[135deg]" />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors">
                  <Grid className="w-5 h-5 text-white" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
