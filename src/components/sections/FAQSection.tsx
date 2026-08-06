"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../ui/PageTransition';

const faqs = [
  { q: "How long does a typical project take?", a: "Project timelines vary based on scope and complexity. A standard landing page takes 2-4 weeks, while a full web application might take 2-4 months. We always provide a detailed timeline before starting." },
  { q: "Do you offer post-launch support?", a: "Absolutely. We offer various maintenance and support packages to ensure your digital product remains secure, updated, and optimized long after launch." },
  { q: "What technologies do you use?", a: "We specialize in modern stacks, primarily React, Next.js, and Tailwind CSS for the frontend, ensuring high performance, SEO friendliness, and stunning animations." },
  { q: "Can you work with our existing design team?", a: "Yes! We frequently collaborate with internal design teams, taking their Figma files and bringing them to life with pixel-perfect, highly-animated engineering." },
  { q: "How do you handle project management?", a: "We use a transparent, agile methodology. You'll have access to our Jira/Linear boards and a dedicated Slack channel for real-time communication with the engineering team." }
];

export function FAQSection() {
  const { navigateWithTransition } = usePageTransition();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-transparent py-24 md:py-32 px-6 md:px-12 relative z-10 w-full font-sans text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-28">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-transparent px-4 py-1.5 text-[10px] uppercase font-bold text-[#FF5656] tracking-[0.2em] mb-8">
            Knowledge Base
          </div>
          
          <h2 className="font-display font-black tracking-tighter leading-[0.85] uppercase text-[clamp(2.5rem,5vw,4.5rem)] mb-8">
            <span className="text-white block">Common</span>
            <span className="text-white/30 block">Inquiries.</span>
          </h2>
          
          <p className="text-white/40 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Everything you need to know about our engineering process, architectural choices, and how we operate as your elite technical partner.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div className="border-t border-white/10 border-dotted">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                
                return (
                  <div key={i} className="border-b border-white/10 border-dotted">
                    <button 
                      className="w-full text-left py-6 md:py-8 flex items-center justify-between gap-6 cursor-pointer group pointer-events-auto"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                      <h3 className="font-sans text-lg md:text-xl font-medium text-white transition-opacity hover:opacity-80">
                        {faq.q}
                      </h3>
                      
                      <div className="shrink-0 transition-transform duration-300 flex items-center justify-center w-6 h-6">
                        {isOpen ? (
                           <span className="text-2xl font-light leading-none -mt-1 text-[#FF5656]">×</span>
                        ) : (
                           <span className="text-2xl font-light leading-none text-white">+</span>
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-4 md:pr-12">
                            <p className="text-white/50 text-sm md:text-base font-normal leading-relaxed max-w-3xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky top-32">
            <div 
              onClick={() => navigateWithTransition('/contact')}
              className="group relative flex flex-col p-8 md:p-10 rounded-2xl bg-[#0A0A0A] w-full border border-white/5 shadow-2xl cursor-pointer pointer-events-auto"
            >
              
              <div className="mb-6">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">
                  Still have questions?
                </p>
                <p className="text-white text-2xl font-sans font-medium tracking-tight">
                  Speak to an architect
                </p>
              </div>
              
              <div className="w-full h-[1px] bg-white/10 my-6" />
              
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-widest text-[11px] text-white">
                  Contact Us
                </span>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
