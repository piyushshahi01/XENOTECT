"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Check, ArrowRight, Zap, ShieldCheck, Clock, Award } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface PackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: any | null;
  onGetStarted: () => void;
}

export function PackageDetailModal({ isOpen, onClose, pkg, onGetStarted }: PackageDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && pkg && (
        <ModalBody key="modal" pkg={pkg} onClose={onClose} onGetStarted={onGetStarted} />
      )}
    </AnimatePresence>
  );
}

function ModalBody({ pkg, onClose, onGetStarted }: { pkg: any, onClose: () => void, onGetStarted: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const html = document.documentElement as any;
    const lenis = html.__lenis || (window as any).__lenis;
    if (lenis) lenis.stop();
    return () => {
      document.body.style.overflow = "unset";
      if (lenis) lenis.start();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div
        ref={scrollRef}
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 35, bounce: 0.2 }}
        className="relative w-full max-w-[1100px]"
      >
        {/* Outer Glass Shell */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-[1px]"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)`,
            boxShadow: `0 60px 140px -20px rgba(0,0,0,0.9), 0 0 160px -40px rgba(0, 229, 255, 0.25)`,
          }}
        >
          {/* Inner Content Area */}
          <div className="relative rounded-[2.5rem] bg-[#050508]/90 backdrop-blur-[80px] h-full p-6 md:p-10 flex flex-col lg:flex-row gap-6 md:gap-8">
            
            {/* Background Meshes */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15] mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: "#00E5FF" }} />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.1] mix-blend-screen pointer-events-none translate-y-1/3 -translate-x-1/3" style={{ backgroundColor: "#00E5FF" }} />

            {/* Close Button */}
            <div className="absolute top-8 right-8 z-50">
              <button
                onClick={onClose}
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
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#00E5FF" }}></span>
                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: "#00E5FF", boxShadow: `0 0 15px #00E5FF` }}></span>
                    </span>
                    <span className="text-white/50 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">PACKAGE SELECTION</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight leading-[1.2]">
                    {pkg.title || pkg.name}
                  </h3>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8">
                    {pkg.detailedContent ? pkg.detailedContent.split('\n')[0] : "Premium digital solutions engineered for absolute market dominance and scale."}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/[0.06]">
                    <p className="text-neutral-400 text-[10px] uppercase tracking-widest font-mono mb-3 font-semibold">Investment</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#00E5FF" }}>
                        {pkg.priceUsd !== undefined ? (typeof pkg.priceUsd === 'number' ? `$${pkg.priceUsd.toLocaleString('en-US')}` : (pkg.priceUsd.toString().startsWith('$') ? pkg.priceUsd : `$${pkg.priceUsd}`)) : pkg.price}
                      </p>
                    </div>
                    {pkg.priceInr && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.05] text-white/50 text-[11px] font-mono">
                          {typeof pkg.priceInr === 'number' ? `₹${pkg.priceInr.toLocaleString('en-IN')}` : (pkg.priceInr.toString().startsWith('₹') ? pkg.priceInr : `₹${pkg.priceInr}`)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Modules */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              
              {/* Features Module */}
              <div className="p-8 md:p-10 rounded-[2rem] border border-white/[0.04] bg-white/[0.01] flex-1">
                <p className="text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-mono mb-8 font-semibold flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-white/10"></span> Deliverables
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                  {pkg.features?.map((item: string, i: number) => (
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      key={i} 
                      className="group flex items-start gap-4 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-[1px] bg-white/[0.03] border border-white/[0.08] group-hover:border-white/[0.2] group-hover:scale-110 transition-all duration-300">
                        <Check className="w-3.5 h-3.5 text-[#00E5FF]" />
                      </div>
                      <span className="leading-relaxed font-light">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom Row Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Good to know Module (Fallback to placeholder if no specific data exists on pkg) */}
                <div className="p-8 rounded-[2rem] border border-white/[0.04] bg-black/20 flex flex-col justify-center">
                   {pkg.time && (
                     <>
                        <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-mono mb-6 font-semibold">
                          Delivery Timeline
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]">
                            <Clock className="w-5 h-5 text-[#00E5FF]" />
                          </div>
                          <span className="text-white/80 font-mono uppercase tracking-widest text-sm">{pkg.time}</span>
                        </div>
                     </>
                   )}
                </div>

                {/* CTA Module */}
                <div className="p-8 rounded-[2rem] border border-white/[0.04] bg-gradient-to-tr from-white/[0.02] to-white/[0.05] flex flex-col justify-center relative overflow-hidden group">
                   {/* Dynamic Hover Glow */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at center, rgba(0,229,255, 0.15) 0%, transparent 70%)` }} />
                   
                   {/* Premium CTA Button */}
                   <div className="pt-10 mt-auto">
                     <button
                       onClick={onGetStarted}
                       className="group/btn relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                     >
                       {/* Button Background - Premium Glass / Dark */}
                       <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl transition-colors duration-500 group-hover/btn:bg-white/[0.05]" />
                       
                       {/* Button Hover Glow Border */}
                       <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px rgba(0,229,255, 0.5), 0 0 30px rgba(0,229,255, 0.2)` }} />
                       
                       <span className="relative z-10 text-white tracking-wide">Start Project</span>
                       <ArrowRight className="w-5 h-5 text-white/50 group-hover/btn:text-white transition-colors relative z-10" />
                     </button>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
