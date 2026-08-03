"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechStackProps {
  title: string;
  technologies: string[];
  theme?: "dark" | "light";
}

export function AnimatedTechStack({ title, technologies, theme = "dark" }: TechStackProps) {
  // Double the array to ensure a perfect 50% seamless loop
  const duplicatedTech = [...technologies, ...technologies];
  const reversedTech = [...technologies].reverse();
  const duplicatedReversed = [...reversedTech, ...reversedTech];

  const bgColor = theme === "dark" ? "bg-transparent" : "bg-[#f8f8f3]";
  const borderLine = theme === "dark" ? "border-white/5" : "border-black/5";
  const pillBg = theme === "dark" ? "bg-white/5 border-white/10 text-white/60 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "bg-black/5 border-black/10 text-black/60 shadow-[0_0_30px_rgba(0,0,0,0.05)]";
  const cardBg = theme === "dark" ? "bg-[#050505]/50 border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.2]" : "bg-white/50 border-black/[0.08] hover:bg-black/[0.05] hover:border-black/[0.2]";
  const textColor = theme === "dark" ? "text-white/60 group-hover:text-white" : "text-black/60 group-hover:text-black";
  const dotColorClass = theme === "dark" ? "bg-white/20 group-hover:bg-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "bg-black/20 group-hover:bg-black group-hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]";
  const gradientFadeLeft = theme === "dark" ? "from-[#050505]" : "from-[#f8f8f3]";
  
  return (
    <section className={`relative w-full py-24 overflow-hidden ${bgColor} border-y ${borderLine}`}>
      {theme === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-20">
        <div className={`inline-flex rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border backdrop-blur-md ${pillBg}`}>
          {title}
        </div>
      </div>

      <div 
        className="relative w-full overflow-hidden flex flex-col gap-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >

        {/* Row 1: Moves Left */}
        <div className="relative flex overflow-hidden w-full">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {duplicatedTech.map((tech, i) => (
              <div key={`row1-${i}`} className="pr-4 md:pr-6">
                <div className={`group relative flex-shrink-0 px-8 md:px-10 py-4 md:py-5 rounded-full border flex items-center justify-center transition-all duration-700 shadow-xl backdrop-blur-md cursor-default hover:scale-105 overflow-hidden ${cardBg}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className={`text-lg md:text-xl font-semibold tracking-wide transition-colors duration-700 relative z-10 flex items-center gap-3 ${textColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${dotColorClass}`} />
                    {tech}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Row 2: Moves Right */}
        <div className="relative flex overflow-hidden w-full">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
          >
            {duplicatedReversed.map((tech, i) => (
              <div key={`row2-${i}`} className="pr-4 md:pr-6">
                <div className={`group relative flex-shrink-0 px-8 md:px-10 py-4 md:py-5 rounded-full border flex items-center justify-center transition-all duration-700 shadow-xl backdrop-blur-md cursor-default hover:scale-105 overflow-hidden ${cardBg}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className={`text-lg md:text-xl font-semibold tracking-wide transition-colors duration-700 relative z-10 flex items-center gap-3 ${textColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${dotColorClass}`} />
                    {tech}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
