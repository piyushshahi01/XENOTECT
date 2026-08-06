"use client";

import React, { useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Interactive3DBanner({ title, subtitle }: { title?: string, subtitle?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".banner-text-reveal",
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 0, 
        opacity: 1, 
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-between overflow-hidden border-y border-white/5 bg-[#050505]/40 backdrop-blur-md">
      
      {/* Text Content */}
      <div className="relative z-20 w-full md:w-1/2 pl-6 sm:pl-12 md:pl-24 pr-6 flex flex-col justify-center pointer-events-none">
        <h2 className="banner-text-reveal text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 leading-tight">
          {title || "Architecting the Future."}
        </h2>
        <p className="banner-text-reveal text-white/50 text-lg md:text-xl font-light max-w-lg">
          {subtitle || "We build intelligent, high-performance systems that scale autonomously with your business."}
        </p>
      </div>

      {/* 3D Spline Interactive Element */}
      <div className="absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-80 pointer-events-auto mix-blend-screen z-10">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
          className="w-full h-full scale-[0.8] md:scale-100"
        />
      </div>
      
      {/* Glow effect behind Spline */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96 bg-[#0044ff]/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
}
