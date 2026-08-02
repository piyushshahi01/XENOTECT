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
  const cardBg = theme === "dark" ? "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]" : "bg-black/[0.02] border-black/[0.05] hover:bg-black/[0.04] hover:border-black/[0.1]";
  const textColor = theme === "dark" ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black";
  const gradientFadeLeft = theme === "dark" ? "from-[#050505]" : "from-[#f8f8f3]";
  
  return (
    <section className={`relative w-full py-24 overflow-hidden ${bgColor} border-y ${borderLine}`}>
      {theme === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-24 relative z-20">
        <div className={`inline-flex rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border backdrop-blur-md ${pillBg}`}>
          {title}
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        {/* Edge Gradients */}
        <div className={`absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r ${gradientFadeLeft} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l ${gradientFadeLeft} to-transparent z-10 pointer-events-none`} />

        {/* Row 1: Moves Left */}
        <div className="relative flex overflow-hidden w-full">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {duplicatedTech.map((tech, i) => (
              <div key={`row1-${i}`} className="pr-6">
                <div className={`flex-shrink-0 px-10 py-8 rounded-[2rem] border flex items-center justify-center transition-colors duration-500 shadow-2xl backdrop-blur-sm cursor-default ${cardBg}`}>
                  <span className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}>
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
              <div key={`row2-${i}`} className="pr-6">
                <div className={`flex-shrink-0 px-10 py-8 rounded-[2rem] border flex items-center justify-center transition-colors duration-500 shadow-2xl backdrop-blur-sm cursor-default ${cardBg}`}>
                  <span className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}>
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
