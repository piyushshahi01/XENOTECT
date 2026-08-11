"use client";

import React from "react";
import { motion } from "framer-motion";

const needs = [
  {
    title: "Startup Websites",
    desc: "Launch rapidly with scalable architectures designed for growth, investor pitches, and user acquisition."
  },
  {
    title: "Corporate Websites",
    desc: "Enterprise-grade digital experiences engineered for trust, compliance, and B2B lead generation."
  },
  {
    title: "E-Commerce",
    desc: "High-performance online stores optimized for lightning-fast checkouts and high conversion rates."
  },
  {
    title: "SaaS Platforms",
    desc: "Complex, scalable multi-tenant software with seamless UI/UX and robust backend integrations."
  },
  {
    title: "Healthcare Websites",
    desc: "Secure, compliant web applications tailored for patients, clinics, and health-tech innovators."
  },
  {
    title: "AI-Powered Businesses",
    desc: "Intelligent platforms integrated with generative AI, custom voice agents, and smart automation workflows."
  }
];

export function BusinessNeedsSection() {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Website Development for Different Business Needs
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg font-light leading-relaxed">
            We build custom digital products tailored specifically to your industry's operational requirements and target audience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((need, idx) => (
            <motion.div 
              key={need.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-4">{need.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {need.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
