"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function PremiumBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth spring physics for mouse tracking
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the center of the viewport (0 to 1 range)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform 0-1 range to percentage for background position
  const backgroundPositionX = useTransform(mouseX, (x) => `${x * 100}%`);
  const backgroundPositionY = useTransform(mouseY, (y) => `${y * 100}%`);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]" 
      aria-hidden="true"
    >
      {/* 1. Base Grid - Linear style sharp grid */}
      <div 
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem"
        }}
      />

      {/* 2. Mouse Tracking Glow - Soft, elegant spotlight */}
      <motion.div
        className="absolute inset-0 opacity-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(0,200,83,0.08), rgba(0,122,255,0.03), transparent)",
          // @ts-ignore
          "--mouse-x": backgroundPositionX,
          "--mouse-y": backgroundPositionY,
        }}
      />

      {/* 3. Static Ambient Glows - Top center and bottom corners for depth */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4F46E5] opacity-[0.15] blur-[100px] rounded-[100%]" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#06B6D4] opacity-[0.2] blur-[80px] rounded-[100%]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3B82F6] opacity-[0.05] blur-[120px] rounded-full" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#8B5CF6] opacity-[0.05] blur-[120px] rounded-full" />

      {/* 4. Heavy Vignette - Fades out the edges so the grid only lives in the center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] opacity-90" />
      
      {/* 5. Film Grain for texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
