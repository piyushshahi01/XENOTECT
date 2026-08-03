"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { FluidBlobs } from "@/components/ui/FluidBlobs";
import { GlowEffect } from "@/components/ui/glow-effect";
import { PackageDetailModal } from "@/components/sections/services/PackageDetailModal";
import { useWizard } from "@/context/WizardContext";

const blobColors = {
  ai: {
    light: ["#00E5FF", "#0088FF", "#0055FF"],
    dark: ["#00E5FF", "#0088FF", "#0055FF"]
  }
};

const cardGlowColors = {
  ai: ["#00E5FF", "#0088FF"]
};

export function AICategoryCards({ tiers, service }: { tiers: any[], service: string }) {
  const { openWizard } = useWizard();
  
  // Group the 17 packages by category so we can render 1 card per category
  const groupedTiers = useMemo(() => {
    const groups: Record<string, any[]> = {};
    tiers.forEach(tier => {
      const cat = tier.category || "default";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tier);
    });
    return groups;
  }, [tiers]);

  const categories = Object.keys(groupedTiers).sort((a, b) => {
    // Custom sort: Chatbots first, Voice Agents second, Automation third
    if (a.toLowerCase().includes("chatbot")) return -1;
    if (a.toLowerCase().includes("voice")) return 0;
    if (a.toLowerCase().includes("automation")) return 1;
    return a.localeCompare(b);
  });

  return (
    <section className="py-24 relative z-10 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-[#00E5FF]">
            Pricing Structure
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl lg:text-6xl text-white tracking-tight mb-6"
          >
            Transparent pricing for <br className="hidden md:block" />
            <span className="text-white/40">premium quality.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-lg leading-relaxed"
          >
            No hidden fees, no surprises. Just straightforward packages designed to deliver maximum return on your investment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {categories.map((category, i) => {
            const categoryPackages = groupedTiers[category];
            const isPopular = i === 1; // Highlight the middle card
            
            return (
              <motion.div
                key={`${category}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col h-full rounded-3xl"
              >
                <div className="absolute -inset-[1.5px] rounded-[25.5px] overflow-hidden z-0 pointer-events-none opacity-80">
                  <GlowEffect
                    colors={cardGlowColors.ai}
                    mode="rotate"
                    blur={isPopular ? "strongest" : "medium"}
                    duration={5}
                    scale={1}
                  />
                </div>

                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                    <div 
                      className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2"
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" 
                        style={{ backgroundColor: cardGlowColors.ai[0], color: cardGlowColors.ai[0] }} 
                      />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative z-10 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border flex flex-col h-full overflow-hidden ${
                  isPopular
                    ? "bg-[#050505]/95 border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "bg-[#0A0A0A]/95 border-white/5"
                }`}>
                  {/* Fluid Blobs inside the card */}
                  <div className="absolute top-0 left-0 w-full h-[300px] z-0 pointer-events-none opacity-40">
                    <div className="absolute inset-0">
                      <FluidBlobs
                        lightColors={blobColors.ai.light}
                        darkColors={blobColors.ai.dark}
                        origins={[{ x: 50, y: -55 }, { x: 50, y: -25 }, { x: 50, y: -25 }, { x: 50, y: -25 }]}
                        margin={60}
                        blur={50}
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isPopular ? "to-[#050505]/95" : "to-[#0A0A0A]/95"} pointer-events-none`} />
                  </div>
                
                  <div className="mb-8 relative z-10">
                    <h3 className="text-3xl text-white font-serif tracking-tight mb-2">{category}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">Choose from our pre-built solutions or request a custom quote.</p>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  <ul className="flex-1 space-y-4 mb-8 relative z-10 flex flex-col gap-1">
                    {categoryPackages.map((pkg: any, j: number) => (
                      <motion.li
                        key={pkg.id || j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (j * 0.05) }}
                        className="flex items-center justify-between gap-3 text-sm pb-4 border-b border-white/5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 shrink-0">
                          <Check className="w-4 h-4 text-white/40 shrink-0" />
                          <span className="text-white/80 font-medium text-xs sm:text-sm">{pkg.name}</span>
                        </div>
                        <div className="text-right whitespace-nowrap pl-2">
                          {(pkg.priceInr || pkg.price) && pkg.price !== "Custom" ? (
                            <span className="font-mono text-white/90 font-semibold text-xs sm:text-sm">{pkg.priceInr || pkg.price}</span>
                          ) : (
                            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#00E5FF]">Custom Quote</span>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openWizard(service, category.toLowerCase().replace(/\s+/g, '-'))}
                    className={`relative z-10 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 mt-auto ${
                      isPopular
                        ? "bg-white text-black hover:bg-neutral-200"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center px-4"
        >
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
            * Prices are starting estimates. Final pricing depends on project scope, features, integrations, and timeline. <button onClick={() => openWizard(service, "custom")} className="text-white hover:underline transition-all">Contact us for a custom quote.</button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
