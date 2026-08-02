"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Rocket, Database, ShoppingCart, Layout, Cpu, X, ArrowRight } from "lucide-react";

const bentoItems = [
  {
    id: "business",
    title: "Business Websites",
    icon: <Globe className="w-8 h-8" />,
    description: "High-end corporate presences engineered to establish absolute market authority and trust.",
    colSpan: "col-span-1 md:col-span-2",
    gradient: "from-blue-500/20 to-indigo-500/5",
    accent: "text-blue-400",
    fullContent: "Corporate websites that act as your most valuable asset. We build SEO-optimized, blazing-fast Next.js architectures that turn visitors into enterprise leads."
  },
  {
    id: "landing",
    title: "Landing Pages",
    icon: <Rocket className="w-8 h-8" />,
    description: "High-conversion marketing funnels.",
    colSpan: "col-span-1 md:col-span-1",
    gradient: "from-rose-500/20 to-orange-500/5",
    accent: "text-rose-400",
    fullContent: "Every pixel engineered for conversion. A/B tested layouts, instant load times, and GSAP micro-interactions that keep users scrolling."
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    icon: <Database className="w-8 h-8" />,
    description: "Complex logic disguised as simple UI.",
    colSpan: "col-span-1 md:col-span-1",
    gradient: "from-emerald-500/20 to-teal-500/5",
    accent: "text-emerald-400",
    fullContent: "Scalable multi-tenant applications built on React and Node.js. State management, role-based access, and real-time data sync without the technical debt."
  },
  {
    id: "ecommerce",
    title: "Ecommerce",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "Bespoke digital storefronts designed for maximum cart value.",
    colSpan: "col-span-1 md:col-span-2",
    gradient: "from-purple-500/20 to-pink-500/5",
    accent: "text-purple-400",
    fullContent: "Headless Shopify or custom Node backends. We decouple the frontend to achieve 100/100 Lighthouse scores, dramatically reducing bounce rates and increasing sales."
  },
  {
    id: "portals",
    title: "Web Portals",
    icon: <Layout className="w-8 h-8" />,
    description: "Secure environments for teams.",
    colSpan: "col-span-1 md:col-span-2",
    gradient: "from-amber-500/20 to-yellow-500/5",
    accent: "text-amber-400",
    fullContent: "Custom dashboards for internal operations, vendor management, or client communication. Integrated directly with your existing ERPs and CRMs."
  },
  {
    id: "custom",
    title: "Custom Solutions",
    icon: <Cpu className="w-8 h-8" />,
    description: "If it involves a browser, we build it.",
    colSpan: "col-span-1 md:col-span-1",
    gradient: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-400",
    fullContent: "WebRTC video tools, WebGL experiences, or custom algorithms. We solve the engineering problems other agencies decline."
  }
];

export function WebBentoGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = bentoItems.find(item => item.id === selectedId);

  return (
    <section className="relative w-full py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex flex-col gap-4 mb-16">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-white/70 w-fit">
            What We Build
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Architecture for <br /> every scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {bentoItems.map((item) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`relative ${item.colSpan} rounded-[2rem] bg-[#0A0A0B] border border-white/10 p-8 cursor-pointer overflow-hidden group hover:border-white/20 transition-colors`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <motion.div layoutId={`icon-${item.id}`} className={`mb-6 ${item.accent}`}>
                {item.icon}
              </motion.div>
              
              <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-bold text-white mb-2">
                {item.title}
              </motion.h3>
              
              <motion.p layoutId={`desc-${item.id}`} className="text-white/50 text-sm leading-relaxed max-w-sm">
                {item.description}
              </motion.p>
              
              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              />
              
              <motion.div
                layoutId={`card-${selectedItem.id}`}
                className="relative w-full max-w-2xl bg-[#09090B] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl z-10 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedItem.gradient} opacity-20`} />
                
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>

                <motion.div layoutId={`icon-${selectedItem.id}`} className={`mb-8 ${selectedItem.accent}`}>
                  {React.cloneElement(selectedItem.icon as React.ReactElement<{ className?: string }>, { className: "w-12 h-12" })}
                </motion.div>
                
                <motion.h3 layoutId={`title-${selectedItem.id}`} className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
                  {selectedItem.title}
                </motion.h3>
                
                <motion.p layoutId={`desc-${selectedItem.id}`} className="text-xl text-white/50 mb-8 relative z-10">
                  {selectedItem.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 pt-8 border-t border-white/10"
                >
                  <p className="text-white/70 leading-relaxed text-lg">
                    {selectedItem.fullContent}
                  </p>
                  
                  <button className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors">
                    Start {selectedItem.title} Project
                  </button>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
