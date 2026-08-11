"use client";

import React, { useRef } from 'react';
import { Shield, Zap, Target, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { 
    id: "quality",
    icon: <Shield className="w-8 h-8 text-[#00C853]" strokeWidth={1.5} />, 
    title: "Uncompromising Quality", 
    desc: "We build secure, scalable web applications and digital products designed to grow with your business.",
    rotate: -12,
    x: -180,
    y: 40,
    zIndex: 1
  },
  { 
    id: "speed",
    icon: <Zap className="w-8 h-8 text-[#00C853]" strokeWidth={1.5} />, 
    title: "Performance-Focused Engineering", 
    desc: "We optimize architecture, rendering, and infrastructure to create blazing fast experiences.",
    rotate: -4,
    x: -60,
    y: 10,
    zIndex: 2
  },
  { 
    id: "strategy",
    icon: <Target className="w-8 h-8 text-[#00C853]" strokeWidth={1.5} />, 
    title: "Business-Focused Development", 
    desc: "Every project is planned around your business goals, target audience, and conversion journey.",
    rotate: 4,
    x: 60,
    y: 10,
    zIndex: 3
  },
  { 
    id: "ux",
    icon: <Award className="w-8 h-8 text-[#00C853]" strokeWidth={1.5} />, 
    title: "Award-Winning UX", 
    desc: "We design clean, modern, and accessible interfaces that turn your visitors into customers.",
    rotate: 12,
    x: 180,
    y: 40,
    zIndex: 4
  }
];

export function WhySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // GSAP blur reveal for header text
  useGSAP(() => {
    gsap.fromTo(".why-reveal-text",
      { y: 40, opacity: 0, filter: "blur(15px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="why-us" className="bg-transparent relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-[#00C853]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center z-20 mb-24 md:mb-32 px-4 relative">
        <div className="why-reveal-text inline-flex items-center gap-2 rounded-full border border-[#00C853]/30 bg-white/5 px-4 py-1.5 text-[10px] uppercase font-bold text-[#00C853] backdrop-blur w-max mb-6 tracking-[0.2em]">
          Fluid, Performant & Distinct
        </div>
        <h2 className="why-reveal-text font-display font-black tracking-tighter leading-[1.05] text-white text-[clamp(2rem,4vw,3.5rem)]">
          Why leading <br className="hidden md:block" /> brands choose us.
        </h2>
      </div>

      {/* DESKTOP: Fan Out Cards (Only visible on large screens) */}
      <div className="hidden lg:flex relative w-full max-w-[1000px] h-[440px] items-center justify-center z-10 mx-auto">
        {reasons.map((reason, i) => {
          // Tight spread to fit all 4 cards within viewport at 100% zoom
          const desktopX = reason.id === 'quality' ? -210 : reason.id === 'speed' ? -70 : reason.id === 'strategy' ? 70 : 210;
          const desktopRotate = reason.id === 'quality' ? -8 : reason.id === 'speed' ? -3 : reason.id === 'strategy' ? 3 : 8;
          const desktopY = (reason.id === 'quality' || reason.id === 'ux') ? 25 : 5;
          return (
            <motion.div
              key={`desktop-${reason.id}`}
              initial={{ opacity: 0, scale: 0.8, x: 0, y: 200, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, x: desktopX, y: desktopY, rotate: desktopRotate } : {}}
              whileHover={{ scale: 1.05, y: desktopY - 20, zIndex: 50, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
              transition={{ duration: 1.2, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-shimmer absolute w-[240px] h-[340px] rounded-[1.5rem] p-1.5 bg-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer origin-bottom flex flex-col pointer-events-auto"
              style={{ zIndex: reason.zIndex }}
            >
              <div className="relative z-10 flex flex-col h-full rounded-[calc(1.5rem-0.375rem)] surface-elevated p-5 overflow-hidden justify-between text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
                <div className="flex flex-col gap-4 relative z-20">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/5 border border-white/10">{reason.icon}</div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#00C853]/60 uppercase tracking-[0.2em] mb-2">0{i + 1}</div>
                    <h3 className="text-xl font-bold tracking-tight leading-tight mb-2">{reason.title}</h3>
                    <p className="text-white/60 text-xs font-medium leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00C853]/20 to-transparent mt-auto rounded-full relative z-20" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE/TABLET: Vertical Stack (Visible on small/medium screens) */}
      <div className="flex lg:hidden flex-col gap-6 w-full max-w-md px-6 z-10">
        {reasons.map((reason, i) => (
          <motion.div
            key={`mobile-${reason.id}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + (i * 0.1), ease: "easeOut" }}
            className="glass-card-shimmer w-full h-[320px] rounded-[2rem] p-1.5 bg-white/5 shadow-xl flex flex-col pointer-events-auto"
          >
            <div className="relative z-10 flex flex-col h-full rounded-[calc(2rem-0.375rem)] surface-elevated p-6 overflow-hidden justify-between text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
              <div className="flex flex-col gap-4 relative z-20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/5 border border-white/10">{reason.icon}</div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#00C853]/60 uppercase tracking-[0.2em] mb-1">0{i + 1}</div>
                  <h3 className="text-xl font-bold tracking-tight leading-tight mb-2">{reason.title}</h3>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">{reason.desc}</p>
                </div>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00C853]/20 to-transparent mt-auto rounded-full relative z-20" />
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
