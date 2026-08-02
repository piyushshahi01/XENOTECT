"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code2, Sparkles, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BentoCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  className?: string;
}

function BentoCard({ title, desc, icon, className }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`about-bento-card glass-card-shimmer relative rounded-[2rem] p-1.5 bg-white/5 flex flex-col overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.4)] pointer-events-auto ${className}`}
    >
      {/* Inner Core */}
      <div className="relative z-10 flex flex-col h-full rounded-[calc(2rem-0.375rem)] surface-elevated p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
        
        {/* 3D Inner Content */}
        <motion.div style={{ translateZ: 50 }} className="relative z-20 flex flex-col h-full">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-auto group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-[#00C853]/50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] relative">
            <div className="absolute inset-0 rounded-full bg-[#00C853]/0 group-hover:bg-[#00C853]/10 blur-md transition-all duration-500" />
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 text-white/70 group-hover:text-[#00C853] transition-colors duration-500 relative z-10" })}
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">{desc}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Independent blur-reveal for each text element
    gsap.fromTo(".about-reveal-text",
      { y: 64, opacity: 0, filter: "blur(12px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.15, ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Staggered bento card reveals
    gsap.fromTo(".about-bento-card",
      { y: 80, opacity: 0, filter: "blur(8px)", scale: 0.92 },
      {
        y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, stagger: 0.2, ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-bento-card",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );

  }, { scope: container });

  return (
    <section ref={container} id="about" className="relative bg-transparent py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden z-10">
      
      {/* Ambient Background Glow — richer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] aspect-square bg-gradient-to-br from-[#00C853]/8 via-transparent to-[#007AFF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#7C4DFF]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Top Text Reveal */}
        <div className="max-w-4xl">
          <div className="about-reveal-text inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase font-bold text-[#00C853] w-max mb-8 tracking-[0.2em] backdrop-blur-md">
            The Xenotect Standard
          </div>
          <h2 className="about-reveal-text text-3xl md:text-4xl font-display font-black text-white leading-[1.05] tracking-tighter mb-8">
            Building more than websites.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Engineering growth.</span>
          </h2>
          <p className="about-reveal-text text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            We believe every business deserves a digital presence that is fast, memorable, and built for scale. We combine bleeding-edge web development, intelligent AI architecture, and hyper-targeted marketing to deliver measurable business value.
          </p>
        </div>

        {/* Kinetic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[250px] md:auto-rows-[300px]">
          <BentoCard 
            className="md:col-span-8"
            icon={<Code2 />}
            title="Elite Web Engineering"
            desc="React, Next.js, and WebGL architectures that feel instantaneous and rank perfectly. We don't use templates; we build highly bespoke digital products from the ground up."
          />
          <BentoCard 
            className="md:col-span-4"
            icon={<Sparkles />}
            title="AI Integration"
            desc="Automate workflows and delight users with custom LLMs, Voice Agents, and intelligent search implementations."
          />
          <BentoCard 
            className="md:col-span-12"
            icon={<TrendingUp />}
            title="Strategic Growth & Marketing"
            desc="Traffic is meaningless without conversion. We align our technical builds with aggressive SEO strategies, performance marketing, and conversion rate optimization to ensure your investment returns multiple times over."
          />
        </div>

      </div>
    </section>
  );
}
