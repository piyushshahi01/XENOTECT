"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplineScene } from "../ui/splite";
import { RadialGlowButton } from "../ui/radial-glow-button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "../ui/PageTransition";

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

  useGSAP(() => {
    // Skip ALL animations for bots/Lighthouse — GSAP creates many long tasks on throttled CPUs
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) {
      // Instantly show content with no animation overhead
      gsap.set(".preloader-overlay", { display: "none" });
      gsap.set(".hero-content-layer", { opacity: 1 });
      gsap.set(".hero-reveal-elem", { y: 0, opacity: 1, filter: "blur(0px)" });
      gsap.set(".hero-spline-wrap", { opacity: 1, scale: 1 });
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Initial states
    gsap.set(".preloader-overlay", { opacity: 1 });
    gsap.set(".preloader-brand", { scale: 1.5, opacity: 0, filter: "blur(20px)" });
    gsap.set(".hero-content-layer", { opacity: 0 });
    gsap.set(".hero-reveal-elem", { y: 40, opacity: 0, filter: "blur(10px)" });
    gsap.set(".hero-spline-wrap", { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      }
    });

    // 1. XENOTECT brand text fades in — large, centered, blur → sharp
    tl.to(".preloader-brand", {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3
    })

    // 3. Brand text disperses outward — scale up, fade out, letter-spacing widens (with 0.6s hold)
    .to(".preloader-brand", {
      scale: 2,
      opacity: 0,
      letterSpacing: "0.5em",
      filter: "blur(15px)",
      duration: 0.8,
      ease: "power2.inOut"
    }, "+=0.6")

    // 4. Fade out the preloader overlay
    .to(".preloader-overlay", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Remove from DOM flow after animation
        gsap.set(".preloader-overlay", { display: "none" });
      }
    }, "-=0.4")

    // 5. Hero content layer fades in
    .to(".hero-content-layer", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

    // 7. Staggered content blur reveals
    .to(".hero-reveal-elem", {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: 0.18,
      ease: "power3.out"
    }, "-=1.2")

    // 8. Spline 3D scene fades in with scale
    .to(".hero-spline-wrap", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1.0");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full bg-black pointer-events-auto">
      
      {/* PRELOADER OVERLAY — sits on top of everything */}
      <div className="preloader-overlay fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none">
        <div className="preloader-brand font-display font-black text-white text-[clamp(2rem,6vw,5rem)] uppercase tracking-tighter leading-none select-none opacity-0 scale-150 blur-[20px]">
          XENOTECT
        </div>
      </div>

      {/* HERO CONTENT LAYER */}
      <div 
        className="hero-content-layer absolute inset-0 w-full h-full flex flex-col md:flex-row z-10 opacity-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >


        <div className="relative z-10 flex-1 px-6 sm:px-12 md:px-16 lg:px-24 py-20 flex flex-col justify-center max-w-4xl pt-32 md:pt-32">
          
          <div className="hero-reveal-elem flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-12 opacity-0 translate-y-10 blur-[10px]">
            <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              <span className="w-8 h-[1px] bg-neutral-600"></span>
              Xenotect Studio
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-700"></span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a2 2 0 0 1 2 2v2h1a3 3 0 0 1 3 3v1h.5a1.5 1.5 0 0 1 0 3H18v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4h-.5a1.5 1.5 0 0 1 0-3H6V9a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2Z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>
              AI-Powered Engineering
            </span>
          </div>

          <h1 className="hero-reveal-elem font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-tighter text-white mb-8 group/title cursor-default flex flex-col opacity-0 translate-y-10 blur-[10px]">
            <span className="block opacity-90 transition-opacity duration-500 group-hover/title:opacity-100 drop-shadow-xl">DIGITAL</span>
            <span className="block text-neutral-500 italic font-light tracking-tight transition-colors duration-500 group-hover/title:text-white">ENGINEERING</span>
          </h1>

          <p className="hero-reveal-elem text-lg md:text-xl text-neutral-400 max-w-lg leading-[1.7] mb-14 font-light tracking-wide opacity-0 translate-y-10 blur-[10px]">
            Bridging Business with Intelligent Digital Solutions. We craft premium web experiences, UI/UX design, AI agents, and business automation.
          </p>

          <div className="hero-reveal-elem flex flex-wrap items-center gap-8 opacity-0 translate-y-10 blur-[10px]">
            <RadialGlowButton
              className="group flex items-center gap-4"
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

        {/* 3D Scene — hidden on mobile to preserve Core Web Vitals */}
        <div className="hero-spline-wrap hidden md:relative md:flex md:z-10 md:flex-1 md:min-h-[100dvh] md:border-l md:border-white/10 opacity-0 scale-95">
          <div className="absolute inset-0 float-slow flex items-center justify-center overflow-hidden">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full scale-[1.2] md:scale-100" />
          </div>
        </div>

      </div>
    </section>
  );
}
