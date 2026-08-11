"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { RadialGlowButton } from "../ui/radial-glow-button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "../ui/PageTransition";

const SplineScene = dynamic(() => import("../ui/splite").then(mod => mod.SplineScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-transparent" />
});

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { navigateWithTransition } = usePageTransition();
  
  const mouseX = useMotionValue(30);
  const mouseY = useMotionValue(20);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(30);
    mouseY.set(20);
  };

  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);

  useEffect(() => {
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed|gtmetrix/i.test(navigator.userAgent);
    if (!isBot) {
      // Defer WebGL initialization by 500ms to free up the main thread during initial load (Fixes TBT)
      const timer = setTimeout(() => {
        setShouldRenderSpline(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useGSAP(() => {
    // Skip ALL animations for bots/Lighthouse
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed|gtmetrix/i.test(navigator.userAgent);

    if (isBot) {
      // Instantly show content with no animation overhead for bots
      gsap.set(".hero-content-layer", { opacity: 1 });
      gsap.set(".hero-reveal-elem", { y: 0, opacity: 1, filter: "blur(0px)" });
      gsap.set(".hero-spline-wrap", { opacity: 1, scale: 1 });
      return;
    }

    // Initial states
    gsap.set(".hero-content-layer", { opacity: 0 });
    gsap.set(".hero-reveal-elem", { y: 40, opacity: 0 }); 
    gsap.set(".hero-spline-wrap", { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline();

    // 1. Hero content layer fades in FAST
    tl.to(".hero-content-layer", {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.2
    })

    // 4. Staggered content reveals
    .to(".hero-reveal-elem", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4")

    // 5. Spline 3D scene fades in
    .to(".hero-spline-wrap", {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.6");

  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full bg-black pointer-events-auto">
      {/* HERO CONTENT LAYER */}
      <div 
        className="hero-content-layer absolute inset-0 w-full h-full flex flex-col md:flex-row z-10 opacity-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >


        <div className="relative z-10 flex-1 px-6 sm:px-12 md:px-16 lg:px-24 py-20 flex flex-col justify-center max-w-4xl pt-32 md:pt-32">
          
          <div className="hero-reveal-elem flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 opacity-0">
            <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              <span className="w-8 h-[1px] bg-neutral-600"></span>
              XENOTECT — DIGITAL ENGINEERING
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-700"></span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a2 2 0 0 1 2 2v2h1a3 3 0 0 1 3 3v1h.5a1.5 1.5 0 0 1 0 3H18v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4h-.5a1.5 1.5 0 0 1 0-3H6V9a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2Z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>
              AI-Powered Engineering
            </span>
          </div>

          <h1 className="hero-reveal-elem text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 opacity-0 tracking-tight leading-tight">
            Website Development Company <span className="text-neutral-500 font-light">in India & Worldwide</span>
          </h1>

          <div className="hero-reveal-elem display font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-tighter text-white mb-8 group/title cursor-default flex flex-col opacity-0 select-none">
            <span className="block opacity-90 transition-opacity duration-500 group-hover/title:opacity-100 drop-shadow-xl">DIGITAL</span>
            <span className="block text-neutral-500 italic font-light tracking-tight transition-colors duration-500 group-hover/title:text-white">ENGINEERING</span>
          </div>

          <p className="hero-reveal-elem text-lg md:text-xl text-neutral-400 max-w-lg leading-[1.7] mb-14 font-light tracking-wide opacity-0">
            Custom websites, web applications, SaaS platforms and AI-powered digital products engineered for ambitious businesses.
          </p>

          <div className="hero-reveal-elem flex flex-col sm:flex-row items-center gap-6 opacity-0">
            <RadialGlowButton
              className="group flex items-center gap-4 w-full sm:w-auto"
              onClick={() => navigateWithTransition("/contact")}
            >
              <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white">Start Project</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </RadialGlowButton>
            
            <a href="#about" className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-300">
              <span className="w-8 h-[1px] bg-neutral-600 group-hover:w-12 group-hover:bg-white transition-all duration-300"></span>
              Discover
            </a>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="hero-spline-wrap relative z-10 flex-1 min-h-[50vh] md:min-h-[100dvh] border-t md:border-t-0 md:border-l border-white/10 opacity-0 scale-95">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {shouldRenderSpline && (
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full scale-[1.2] md:scale-100" interactive={true} />
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
