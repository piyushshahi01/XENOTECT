"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function AmbientBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!spotlightRef.current) return;

    // Skip all GSAP animations for bots/Lighthouse
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) return;

    // Scroll-reactive spotlight — moves down the page as the user scrolls
    gsap.to(spotlightRef.current, {
      y: () => document.documentElement.scrollHeight - window.innerHeight,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Subtle pulse on the spotlight opacity
    gsap.to(spotlightRef.current, {
      opacity: 0.7,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* ─── Deep Base with subtle gradient ─── */}
      <div className="absolute inset-0 bg-[#030305]" />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 0%, rgba(0, 200, 83, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(0, 122, 255, 0.03) 0%, transparent 50%)",
        }}
      />

      {/* ─── Aurora Mesh Blobs (Higher opacity for richer color) ─── */}
      {/* Emerald — top left drift */}
      <div
        className="aurora-blob-1 absolute -top-[20%] -left-[15%] w-[800px] h-[800px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #00C853 0%, #00E676 30%, transparent 70%)",
          filter: "blur(130px)",
          willChange: "transform",
        }}
      />

      {/* Teal — center right drift */}
      <div
        className="aurora-blob-2 absolute top-[25%] -right-[10%] w-[700px] h-[700px] rounded-full opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, #00BFA5 0%, #1DE9B6 30%, transparent 70%)",
          filter: "blur(110px)",
          willChange: "transform",
        }}
      />

      {/* Deep Blue — bottom center drift */}
      <div
        className="aurora-blob-3 absolute bottom-[10%] left-[20%] w-[900px] h-[900px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #1565C0 0%, #42A5F5 30%, transparent 70%)",
          filter: "blur(150px)",
          willChange: "transform",
        }}
      />

      {/* Violet — mid-page accent */}
      <div
        className="aurora-blob-1 absolute top-[50%] left-[60%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #7C4DFF 0%, #B388FF 30%, transparent 70%)",
          filter: "blur(120px)",
          willChange: "transform",
          animationDelay: "-12s",
        }}
      />

      {/* Warm coral accent — lower page */}
      <div
        className="aurora-blob-2 absolute bottom-[30%] right-[30%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #FF5656 0%, #FF8A80 30%, transparent 70%)",
          filter: "blur(110px)",
          willChange: "transform",
          animationDelay: "-8s",
        }}
      />

      {/* Gold accent — upper right (NEW) */}
      <div
        className="aurora-blob-3 absolute top-[15%] right-[25%] w-[450px] h-[450px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #FFC107 0%, #FFD54F 30%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
          animationDelay: "-20s",
        }}
      />

      {/* ─── Dot Grid Pattern ─── */}
      <div className="absolute inset-0 dot-grid opacity-[0.025]" />

      {/* ─── Scroll-Reactive Spotlight (Larger & more dramatic) ─── */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[1000px] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 200, 83, 0.1) 0%, rgba(0, 122, 255, 0.05) 30%, rgba(124, 77, 255, 0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform, opacity",
        }}
      />

      {/* ─── Vignette Edges ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(3, 3, 5, 0.6) 100%)",
        }}
      />

      {/* ─── Film Grain Overlay ─── */}
      <div className="grain-overlay" />
    </div>
  );
}
