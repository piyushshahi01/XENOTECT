"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../ui/PageTransition';
import { FAQSchema } from '../seo/JsonLd';

const faqs = [
  { q: "What services does XENOTECT provide?", a: "We are a full-service digital engineering and growth agency. We specialize in custom website development, AI automation (including voice agents and chatbots), and technical SEO strategies." },
  { q: "Do you work with international clients?", a: "Yes, we partner with businesses globally, including the US, UK, Canada, Australia, and the UAE, alongside our domestic clients in India." },
  { q: "Do you build custom digital products?", a: "Absolutely. We engineer 100% custom web applications, SaaS platforms, and enterprise websites tailored entirely to your specific business logic and brand identity." },
  { q: "Can you combine web development with AI automation?", a: "Yes, this is our core strength. We frequently integrate intelligent AI agents, automated workflows, and custom LLM solutions directly into the web platforms we build." },
  { q: "Do you provide ongoing support?", a: "Yes, we offer flexible post-launch maintenance and support retainers to ensure your digital infrastructure remains secure, fast, and fully optimized." },
  { q: "Can XENOTECT help with SEO and growth?", a: "Yes, our dedicated growth team implements advanced technical SEO, programmatic content strategies, and comprehensive marketing campaigns to scale your visibility." },
  { q: "How do I start a project?", a: "Click 'Get a Project Estimate' or contact us through our website. We'll schedule a discovery call to understand your goals, map out a custom strategy, and provide a transparent timeline and quote." }
];

export function FAQSection() {
  const { navigateWithTransition } = usePageTransition();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-transparent py-24 md:py-32 px-6 md:px-12 relative z-10 w-full font-sans text-white">
      <FAQSchema faqs={faqs} />
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-28">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-transparent px-4 py-1.5 text-[10px] uppercase font-bold text-[#00C853] tracking-[0.2em] mb-8">
            Knowledge Base
          </div>
          
          <h2 className="font-display font-black tracking-tighter leading-[0.85] uppercase text-[clamp(2.5rem,5vw,4.5rem)] mb-8">
            <span className="text-white block">Common</span>
            <span className="text-neutral-400 block">Inquiries.</span>
          </h2>
          
          <p className="text-neutral-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Everything you need to know about our engineering process, full-stack capabilities, and how we operate as your elite technical partner.
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
                <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-3">
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
