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
      className="fixed inset-0 z-[99999] flex items-center justify-center p-0 md:p-4 lg:p-6"
    >
      {/* Backdrop with extreme blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[40px]"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div
        ref={scrollRef}
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.98, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative flex flex-col w-full h-full md:h-[90vh] max-w-5xl bg-[#020202] md:rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_100px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* Ambient Animated Glows inside modal */}
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden rounded-t-[2.5rem] pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] rounded-full mix-blend-screen"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -right-[20%] w-[70%] h-[70%] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px] rounded-full mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        {/* Sticky Navigation / Header Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide">{pkg.title || pkg.name}</h3>
              <p className="text-white/50 text-[10px] uppercase tracking-widest">Selected Package</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onGetStarted}
              className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Initiate <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inner Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full relative z-10"
        >
        {/* Hero Section */}
        <div className="relative px-6 pt-8 pb-10 md:px-12 md:pt-8 md:pb-12 flex flex-col items-center text-center shrink-0">
          {pkg.isPopular && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-emerald-400 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Zap className="w-4 h-4 fill-emerald-400" /> Most Popular Choice
            </motion.div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 tracking-tighter mb-4 leading-tight"
          >
            {pkg.title || pkg.name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12"
          >
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 md:px-6 md:py-3 rounded-full">
                <span className="text-white/40 text-[10px] uppercase tracking-widest">Investment</span>
                <span className="text-white font-bold text-lg md:text-xl">
                  {pkg.priceUsd !== undefined ? (typeof pkg.priceUsd === 'number' ? `$${pkg.priceUsd.toLocaleString('en-US')}` : (pkg.priceUsd.toString().startsWith('$') ? pkg.priceUsd : `$${pkg.priceUsd}`)) : pkg.price}
                </span>
              </div>
              {pkg.priceInr && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 md:px-6 md:py-3 rounded-full">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest">₹ INR</span>
                  <span className="text-white font-mono text-sm md:text-base">
                    {typeof pkg.priceInr === 'number' ? `₹${pkg.priceInr.toLocaleString('en-IN')}` : (pkg.priceInr.toString().startsWith('₹') ? pkg.priceInr : `₹${pkg.priceInr}`)}
                  </span>
                </div>
              )}
            {pkg.time && (
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-5 py-2.5 md:px-6 md:py-3 rounded-full">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/70 text-sm font-mono tracking-widest uppercase">{pkg.time}</span>
                  </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Content & Features Grid */}
        <div className="relative z-10 px-6 pb-20 md:px-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left: Rich Markdown Content */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-7 flex flex-col gap-8"
            >
              <div className="prose prose-base prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-display prose-headings:tracking-tight prose-headings:mb-3 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:text-emerald-400 prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-li:text-white/70 prose-hr:border-white/10 prose-strong:text-white prose-em:text-white/50 max-w-none">
                {pkg.detailedContent ? (
                  <ReactMarkdown>
                    {pkg.detailedContent.split(/\r?\n/).map((line: string) => {
                      const trimmed = line.trim();
                      if (!trimmed) return '';
                      // Auto-format short lines without punctuation as headings to make plain text look attractive
                      if (trimmed.length > 0 && trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.endsWith(':') && !trimmed.startsWith('#')) {
                        return `### **${trimmed}**`;
                      }
                      return trimmed;
                    }).join('\n\n')}
                  </ReactMarkdown>
                ) : (
                  <div className="flex flex-col gap-6 opacity-50">
                    <div className="h-6 w-3/4 bg-white/10 rounded-full animate-pulse" />
                    <div className="h-4 w-full bg-white/10 rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/10 rounded-full animate-pulse" />
                    <p className="text-sm italic text-white/40 mt-4">Detailed presentation loading or not available...</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Sticky Features & CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <div className="flex flex-col gap-8 h-full">
                
                {/* Features Bento */}
                <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group flex-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 flex items-center justify-center border border-emerald-500/20">
                      <Award className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">What's Included</h3>
                  </div>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
                    {pkg.features?.map((feature: string, idx: number) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (idx * 0.05) }}
                        key={idx} 
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white-[0.02] hover:bg-white/[0.05] transition-colors group/item"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-[15px] font-medium text-white/80 group-hover/item:text-white leading-snug transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Massive Action Button */}
                  <button
                    onClick={onGetStarted}
                    className="group relative w-full flex items-center justify-between p-2 rounded-[2rem] bg-white text-black transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
                  >
                    <span className="text-xl font-black tracking-tight pl-8 relative z-10">Initiate Project</span>
                    <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-500 group-hover:bg-black/10 relative z-10">
                      <ArrowRight className="w-7 h-7 text-black transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2.5} />
                    </div>
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}
