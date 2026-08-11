"use client";

import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  { step: "01", title: "Discovery", desc: "Understanding your business goals, target audience, and operational requirements." },
  { step: "02", title: "Strategy", desc: "Mapping the architecture, user journeys, and technical stack." },
  { step: "03", title: "UI/UX Design", desc: "Crafting premium, accessible, and high-converting visual interfaces." },
  { step: "04", title: "Development", desc: "Engineering the frontend and backend with secure, scalable code." },
  { step: "05", title: "Testing", desc: "Rigorous QA testing across devices, browsers, and performance metrics." },
  { step: "06", title: "SEO & Performance", desc: "Optimizing Core Web Vitals, metadata, and rendering speeds." },
  { step: "07", title: "Deployment", desc: "Seamlessly launching your digital product to production environments." },
  { step: "08", title: "Support", desc: "Ongoing maintenance, monitoring, and continuous iterations." }
];

export function ProcessSection() {
  return (
    <section className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Our Website Development Process
          </h2>
          <p className="text-neutral-400 text-lg font-light leading-relaxed">
            A proven engineering methodology that transforms complex business requirements into fast, scalable digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {processSteps.map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              {/* Connector Line for Desktop */}
              {idx % 4 !== 3 && idx !== processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 right-[-2rem] h-px bg-white/10" />
              )}
              
              <div className="text-[10px] font-bold text-white/40 mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 relative z-10">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
