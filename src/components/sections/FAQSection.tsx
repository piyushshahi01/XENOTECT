"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../ui/PageTransition';
import { FAQSchema } from '../seo/JsonLd';

const faqs = [
  { q: "What does website development include?", a: "Our website development process includes discovery, strategy, UI/UX design, frontend & backend development, QA testing, SEO optimization, deployment, and ongoing support." },
  { q: "How much does website development cost in India?", a: "Costs vary based on complexity, features, and integrations. A custom corporate website may start around ₹50,000 to ₹1,500,000+, while complex web applications and SaaS platforms require tailored estimates." },
  { q: "How long does it take to develop a website?", a: "A standard custom website takes 4-8 weeks. E-commerce platforms and complex web applications typically take 2-4 months depending on the required features and third-party integrations." },
  { q: "Do you build custom websites?", a: "Yes, we specialize in 100% custom website development. We do not use pre-made templates; everything is engineered from scratch to match your specific brand and business logic." },
  { q: "Do you develop e-commerce websites?", a: "Yes, we build high-converting e-commerce websites using custom Node.js backends or headless architectures (like Shopify Headless) to ensure lightning-fast checkouts." },
  { q: "Can you redesign an existing website?", a: "Absolutely. We can audit your current website and completely redesign and rebuild it to improve Core Web Vitals, user experience, and conversion rates." },
  { q: "Which technologies do you use?", a: "We build modern, scalable architectures using React, Next.js, Node.js, Python, PostgreSQL, and Supabase. We focus on modern stacks that ensure speed and security." },
  { q: "Can you integrate AI into my website?", a: "Yes, as an AI-engineering firm, we can integrate generative AI, intelligent chatbots, automated customer support voice agents, and custom AI workflows directly into your web application." },
  { q: "Will my website be SEO-friendly?", a: "Yes. Every website we develop includes technical SEO best practices out of the box—including fast server-side rendering, optimized metadata, semantic HTML, and dynamic sitemaps." },
  { q: "Do you provide website maintenance?", a: "Yes, we offer ongoing support and maintenance retainers to keep your website secure, updated, and continually optimized as your business grows." },
  { q: "Do you work with international clients?", a: "Yes, we work with businesses in India as well as international markets including the US, UK, Canada, and UAE, delivering globally competitive digital products." },
  { q: "How do I start a website development project?", a: "Simply click 'Get a Project Estimate' or contact us. We will schedule a brief discovery call to understand your requirements and then provide a detailed proposal and timeline." }
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
            <span className="text-white block">Frequently</span>
            <span className="text-neutral-400 block">Asked Questions.</span>
          </h2>
          
          <p className="text-neutral-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Everything you need to know about our website development services, pricing, and project methodology.
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
