"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useWizard } from "@/context/WizardContext";

export function AIPricingTables({ tiers, service }: { tiers: any[], service: string }) {
  const { openWizard } = useWizard();

  // Group tiers by category
  const groupedTiers = useMemo(() => {
    const groups: Record<string, any[]> = {};
    tiers.forEach(tier => {
      const cat = tier.category || "default";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tier);
    });
    return groups;
  }, [tiers]);

  // If there's only a default category and no named categories, fallback to a single table
  // Otherwise, render multiple tables for each category.
  const categories = Object.keys(groupedTiers).sort((a, b) => {
    // Custom sort: Chatbots first, Voice Agents second, Automation third
    if (a.toLowerCase().includes("chatbot")) return -1;
    if (a.toLowerCase().includes("voice")) return 0;
    if (a.toLowerCase().includes("automation")) return 1;
    return a.localeCompare(b);
  });

  return (
    <section className="w-full relative z-20 py-24 bg-transparent max-w-5xl mx-auto px-4 sm:px-6">
      
      <div className="flex flex-col items-center text-center gap-4 mb-20 reveal-up">
        <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-[#00E5FF]">
          Pricing Structure
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
          Clear & Transparent Estimates
        </h2>
        <p className="text-neutral-400 max-w-2xl mt-4">
          Select from our foundational models or contact us for a fully customized enterprise solution.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {categories.map((category, idx) => {
          const categoryTiers = groupedTiers[category];
          // Hide default category title if it's the only one
          const showTitle = categories.length > 1 || category !== "default";
          
          return (
            <div key={category} className="flex flex-col gap-6 reveal-up">
              {showTitle && (
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-[1px] bg-[#00E5FF]/50" />
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                    {category === "default" ? "Other Services" : category}
                  </h3>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>
              )}
              
              <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="flex flex-col">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-white/10 bg-white/[0.02]">
                    <div className="col-span-8 md:col-span-8 text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-500">
                      Service
                    </div>
                    <div className="col-span-4 md:col-span-4 text-right text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-500">
                      Starting From
                    </div>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="flex flex-col">
                    {categoryTiers.map((tier, i) => (
                      <motion.div 
                        key={tier.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group grid grid-cols-12 gap-4 px-8 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center last:border-0"
                      >
                        <div className="col-span-8 md:col-span-8 flex flex-col gap-1">
                          <span className="text-lg text-white font-medium group-hover:text-[#00E5FF] transition-colors flex items-center gap-3">
                            {tier.name}
                            {tier.isPopular && (
                              <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                                <Sparkles className="w-2.5 h-2.5" />
                                Popular
                              </span>
                            )}
                          </span>
                        </div>
                        
                        <div className="col-span-4 md:col-span-4 flex justify-end items-center">
                          <span className="text-xl md:text-2xl font-mono text-white/90 font-medium">
                            {tier.priceInr || tier.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 text-center">
        <button 
          onClick={() => openWizard(service)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 hover:scale-105 transition-all duration-300"
        >
          Request Custom Quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
