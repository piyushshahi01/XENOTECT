"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function GlobalReachSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center mx-auto mb-8">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Website Development for Indian & Global Businesses
          </h2>
          
          <p className="text-neutral-400 text-lg leading-relaxed font-light">
            XENOTECT works with businesses in India and international markets to build modern websites, web applications, and digital products tailored to their specific business goals, audiences, and operational requirements. We architect scalable solutions that seamlessly handle multiple regions, compliance standards, and user bases.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
