"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Info, X, Sparkles } from "lucide-react";

const pricingServices = [
  {
    id: "01",
    title: "Website Development",
    description: "Custom websites designed for performance, scalability, and converting visitors into customers.",
    basePrice: "From ₹19,999",
    href: "/services/web-solutions",
    accentRgb: "16, 185, 129",        // emerald
    accentHex: "#10B981",
    borderColor: "rgba(16,185,129,0.15)",
    glowColor: "rgba(16,185,129,0.08)",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    setup: "₹19,999 starting",
    maintenance: "₹3,000/mo",
    includes: [
      "Custom UI/UX Design",
      "Mobile Responsive Layout",
      "CMS Integration",
      "Basic SEO Setup",
      "3 Months Support",
    ],
    goodToKnow: [
      "Domain & hosting are client owned.",
      "E-commerce and advanced features cost extra.",
    ],
  },
  {
    id: "02",
    title: "AI Voice Agent",
    description: "A voice agent that answers, understands, and routes every inbound call or makes outbound calls.",
    basePrice: "From ₹35,000",
    href: "/services/ai-solutions",
    accentRgb: "99, 102, 241",        // indigo/violet
    accentHex: "#6366F1",
    borderColor: "rgba(99,102,241,0.15)",
    glowColor: "rgba(99,102,241,0.08)",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    setup: "₹5,000 one-time",
    maintenance: "₹2,000/mo",
    includes: [
      "Custom voice persona",
      "CRM integration",
      "Call recording & analytics",
      "Multilingual support",
    ],
    goodToKnow: [
      "Usage billed separately per minute.",
      "Telephony provider charges are separate.",
    ],
  },
  {
    id: "03",
    title: "Growth & SEO",
    description: "Data-driven marketing, SEO automation, and social media management to grow your business.",
    basePrice: "From ₹8,000/mo",
    href: "/services/growth-solutions",
    accentRgb: "245, 158, 11",        // amber
    accentHex: "#F59E0B",
    borderColor: "rgba(245,158,11,0.15)",
    glowColor: "rgba(245,158,11,0.08)",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    setup: "₹5,000 Initial Audit",
    maintenance: "₹8,000/mo",
    includes: [
      "Keyword Strategy & Research",
      "On-page Optimization",
      "Social Media Management",
      "Monthly Reporting",
    ],
    goodToKnow: [
      "SEO typically takes 3–6 months to show significant results.",
      "Content creation may be billed separately.",
    ],
  },
  {
    id: "04",
    title: "WhatsApp AI + CRM",
    description: "Conversational AI that captures, qualifies, and converts leads on WhatsApp automatically.",
    basePrice: "From ₹30,000",
    href: "/services/ai-solutions",
    accentRgb: "236, 72, 153",        // pink/rose
    accentHex: "#EC4899",
    borderColor: "rgba(236,72,153,0.15)",
    glowColor: "rgba(236,72,153,0.08)",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    setup: "₹30,000",
    maintenance: "₹2,000/mo",
    includes: [
      "Meta WhatsApp API setup",
      "Brand customization",
      "Automated workflow setup",
      "Deployment guidance",
    ],
    goodToKnow: [
      "Actual AI / API usage billed separately.",
    ],
  },
];

function PricingCard({ service, index, onExpand }: { service: typeof pricingServices[0]; index: number; onExpand: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      className="relative group cursor-pointer"
    >
      {/* Outer glow ring on hover - much stronger now */}
      <div
        className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ 
          background: `linear-gradient(135deg, rgba(${service.accentRgb}, 0.5) 0%, rgba(${service.accentRgb}, 0.1) 40%, transparent 100%)`, 
          boxShadow: `0 0 60px rgba(${service.accentRgb}, 0.15)` 
        }}
      />

      {/* Permanent ambient glow behind card */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 100%, rgba(${service.accentRgb}, 0.15) 0%, transparent 70%)` }}
      />

      {/* Card Body */}
      <div
        className="relative rounded-[23px] overflow-hidden flex flex-col h-full bg-[#050508]"
        style={{
          background: `linear-gradient(145deg, rgba(20,20,25,0.8) 0%, rgba(10,10,15,0.9) 60%, rgba(${service.accentRgb}, 0.08) 100%)`,
          border: `1px solid rgba(${service.accentRgb}, 0.25)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 40px rgba(${service.accentRgb}, 0.03)`,
        }}
      >
        {/* Intense Shine sweep on hover tracking mouse */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
          style={{ background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${service.accentRgb}, 0.15) 0%, transparent 50%)` }}
        />

        {/* Top thick color strip accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb}, 0.8), transparent)` }} />
        
        {/* Bottom edge color reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30 pointer-events-none" style={{ background: `linear-gradient(0deg, rgba(${service.accentRgb}, 0.2), transparent)` }} />

        <div className="p-7 md:p-8 flex flex-col h-full relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.accentHex, boxShadow: `0 0 8px ${service.accentHex}` }} />
              <span className="text-white/35 font-mono text-[11px] tracking-[0.2em]">{service.id}</span>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
              {service.basePrice}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-white transition-colors">
              {service.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Includes preview */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {service.includes.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: `rgba(${service.accentRgb}, 0.12)` }}>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/25">Tap to explore</span>
            <motion.div
              className="flex items-center justify-center w-9 h-9 rounded-full border"
              style={{ borderColor: `rgba(${service.accentRgb}, 0.3)`, color: service.accentHex }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Helper to map UI service links to wizard service IDs
  const getServiceId = (href: string) => {
    if (href.includes("web-solutions")) return "web";
    if (href.includes("ai-solutions")) return "ai";
    if (href.includes("growth-solutions")) return "growth";
    return "web";
  };

  const getPackageId = (href: string) => {
    if (href.includes("web-solutions")) return "web-starter";
    if (href.includes("ai-solutions")) return "ai-voice-agent"; // Matches the ₹35k base price in PricingSection
    if (href.includes("growth-solutions")) return "growth-seo";
    return "web-starter";
  };

  // Pre-compute expanded service to avoid repetitive lookups
  const expandedService = expandedId ? pricingServices.find(s => s.id === expandedId) : null;
  return (
    <section 
      className={`relative w-full py-24 lg:py-36 overflow-hidden bg-transparent pointer-events-auto transition-all ${expandedId ? 'z-[100]' : 'z-10'}`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <Sparkles className="w-3 h-3 text-white/50" />
            <span className="text-white/50 font-mono text-xs tracking-widest uppercase">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Four intelligent systems.
          </h2>
          <p className="text-white/50 text-lg font-light">
            Each one a complete solution. Click any card to see full pricing details.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {pricingServices.map((service, index) => (
            <PricingCard
              key={service.id}
              service={service}
              index={index}
              onExpand={() => setExpandedId(service.id)}
            />
          ))}
        </div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('services');
              if (el) {
                if ((window as any).__lenis) {
                  (window as any).__lenis.scrollTo(el);
                } else {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm font-medium hover:bg-white/[0.08] hover:border-white/15 hover:text-white transition-all duration-300 group"
          >
            Explore all services & pricing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Expanded Detail Modal */}
      <AnimatePresence>
        {expandedId && expandedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 35, bounce: 0.2 }}
                className="relative w-full max-w-[1100px] pointer-events-auto"
              >
                {/* Outer Glass Shell */}
                <div
                  className="relative rounded-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-[1px]"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)`,
                    boxShadow: `0 60px 140px -20px rgba(0,0,0,0.9), 0 0 160px -40px rgba(${expandedService.accentRgb}, 0.25)`,
                  }}
                >
                  {/* Inner Content Area */}
                  <div className="relative rounded-[2.5rem] bg-[#050508]/90 backdrop-blur-[80px] h-full p-6 md:p-10 flex flex-col lg:flex-row gap-6 md:gap-8">
                    
                    {/* Background Meshes */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15] mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: expandedService.accentHex }} />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.1] mix-blend-screen pointer-events-none translate-y-1/3 -translate-x-1/3" style={{ backgroundColor: expandedService.accentHex }} />

                    {/* Close Button */}
                    <div className="absolute top-8 right-8 z-50">
                      <button
                        onClick={() => setExpandedId(null)}
                        className="group flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] text-white/50 hover:text-white transition-all backdrop-blur-xl hover:scale-110 active:scale-95"
                      >
                        <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                      </button>
                    </div>

                    {/* LEFT COLUMN: The Hero Bento Box */}
                    <div className="lg:w-[45%] flex flex-col gap-6">
                      {/* Main Info Card */}
                      <div className="relative p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden flex-1 flex flex-col">
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=''0 0 256 256'' xmlns=''http://www.w3.org/2000/svg''%3E%3Cfilter id=''n''%3E%3CfeTurbulence type=''fractalNoise'' baseFrequency=''0.8'' numOctaves=''3'' stitchTiles=''stitch''/%3E%3C/filter%3E%3Crect width=''100%25'' height=''100%25'' filter=''url(%23n)''/%3E%3C/svg%3E')] pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-8">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: expandedService.accentHex }}></span>
                              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: expandedService.accentHex, boxShadow: `0 0 15px ${expandedService.accentHex}` }}></span>
                            </span>
                            <span className="text-white/50 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Service {expandedService.id}</span>
                          </div>

                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight leading-[1.2]">
                            {expandedService.title}
                          </h3>
                          <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8">
                            {expandedService.description}
                          </p>

                          <div className="mt-auto pt-8 border-t border-white/[0.06]">
                            <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono mb-3 font-semibold">Investment</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: expandedService.accentHex }}>
                                {expandedService.basePrice}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.05] text-white/50 text-[11px] font-mono">
                                + {expandedService.maintenance} maintenance
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Modules */}
                    <div className="lg:w-[55%] flex flex-col gap-6">
                      
                      {/* Features Module */}
                      <div className="p-8 md:p-10 rounded-[2rem] border border-white/[0.04] bg-white/[0.01] flex-1">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-mono mb-8 font-semibold flex items-center gap-4">
                          <span className="w-10 h-[1px] bg-white/10"></span> Deliverables
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                          {expandedService.includes.map((item, i) => (
                            <motion.li 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + (i * 0.05) }}
                              key={i} 
                              className="group flex items-start gap-4 text-sm text-white/70 hover:text-white transition-colors"
                            >
                              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-[1px] bg-white/[0.03] border border-white/[0.08] group-hover:border-white/[0.2] group-hover:scale-110 transition-all duration-300">
                                <Check className="w-3.5 h-3.5" style={{ color: expandedService.accentHex }} />
                              </div>
                              <span className="leading-relaxed font-light">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Row Modules */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Good to know Module */}
                        {expandedService.goodToKnow.length > 0 ? (
                          <div className="p-8 rounded-[2rem] border border-white/[0.04] bg-black/20">
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono mb-6 font-semibold">
                              Good to know
                            </p>
                            <ul className="space-y-4">
                              {expandedService.goodToKnow.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-xs text-white/40 leading-relaxed font-light">
                                  <Info className="w-4 h-4 shrink-0 mt-[1px] opacity-40" style={{ color: expandedService.accentHex }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                           <div className="p-8 rounded-[2rem] border border-white/[0.04] bg-black/20 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: expandedService.accentHex }} />
                              </div>
                           </div>
                        )}

                        {/* CTA Module */}
                        <div className="p-8 rounded-[2rem] border border-white/[0.04] bg-gradient-to-tr from-white/[0.02] to-white/[0.05] flex flex-col justify-center relative overflow-hidden group">
                           {/* Dynamic Hover Glow */}
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at center, rgba(${expandedService.accentRgb}, 0.15) 0%, transparent 70%)` }} />
                           
                           {/* Premium CTA Button */}
                           <div className="pt-10 mt-auto">
                             <Link
                               href={`/contact?serviceId=${getServiceId(expandedService.href)}&packageId=${getPackageId(expandedService.href)}`}
                               className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                               onClick={() => setExpandedId(null)}
                             >
                               {/* Button Background - Premium Glass / Dark */}
                               <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl transition-colors duration-500 group-hover:bg-white/[0.05]" />
                               
                               {/* Button Hover Glow Border */}
                               <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px rgba(${expandedService.accentRgb}, 0.5), 0 0 30px rgba(${expandedService.accentRgb}, 0.2)` }} />
                               
                               <span className="relative z-10 text-white group-hover:text-white tracking-wide transition-colors">
                                 Start Project
                               </span>
                               
                               <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 group-hover:bg-white/20">
                                 <ArrowUpRight className="w-4 h-4 text-white" />
                               </div>
                             </Link>
                           </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
