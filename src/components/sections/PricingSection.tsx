"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function PricingSection() {
  return (
    <section className="relative w-full py-24 lg:py-36 overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-white/70 font-mono text-xs tracking-widest uppercase">Project Investment</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">
            Website Development Pricing
          </h2>
          
          <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12">
            Every project is different. Website development costs depend on scope, design complexity, custom integrations, content needs, advanced features, and ongoing requirements. We engineer tailored solutions designed to generate a positive return on investment.
          </p>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-semibold text-base overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Premium Button Background */}
            <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-full transition-colors duration-500 group-hover:bg-white/[0.08]" />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px rgba(16,185,129,0.5), 0 0 30px rgba(16,185,129,0.2)` }} />
            
            <span className="relative z-10 text-white tracking-wide transition-colors">
              Get a Project Estimate
            </span>
            
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 group-hover:bg-white/20">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
