"use client";
import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlobCard } from '@/components/unlumen-ui/blob-card';

export interface PricingTier {
  id?: string;
  name: string;
  price: string;
  priceInr?: string;
  desc: string;
  features: string[];
  featured: boolean;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$2k",
    desc: "Perfect for early-stage startups needing a premium digital presence.",
    features: ["Custom Landing Page", "Responsive Design", "Basic SEO Setup", "1 Month Support"],
    featured: false
  },
  {
    name: "Professional",
    price: "$7k",
    desc: "For growing businesses ready to scale their web applications.",
    features: ["Full Web Application", "Complex Animations", "CMS Integration", "Advanced SEO", "3 Months Support"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored solutions for large-scale enterprise requirements.",
    features: ["Dedicated Team", "Custom Architecture", "SLA Guarantee", "Unlimited Revisions", "24/7 Priority Support"],
    featured: false
  }
];

import { useWizard } from '@/context/WizardContext';

export function PricingSection({ tiers, serviceId }: { tiers?: PricingTier[], serviceId?: string }) {
  const displayTiers = tiers || defaultTiers;
  const { openWizard } = useWizard();

  return (
    <section id="pricing" className="bg-transparent py-40 md:py-56 px-6 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        <div className="mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase font-medium text-neutral-300 backdrop-blur w-max mb-8 tracking-[0.2em]">
            Investment
          </div>
          <h2 className="font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,4vw,3.5rem)] text-center uppercase">
            Transparent <br className="md:hidden" /><span className="text-white/40">Pricing.</span>
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl relative z-10" 
        >
          {displayTiers.map((tier, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] } }
              }}
              className={`relative flex flex-col h-full ${tier.featured ? 'md:-translate-y-8 z-10' : 'z-0'}`}
            >
              <BlobCard
                className="h-full flex-1"
                headerHeight={260}
                header={
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {tier.featured && (
                        <div className="inline-block bg-white text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit mb-4">
                          Most Popular
                        </div>
                      )}
                      <h3 className="text-xl font-medium text-white mb-2 uppercase tracking-widest">{tier.name}</h3>
                      <p className="text-white/50 text-sm font-light min-h-[40px] leading-relaxed">{tier.desc}</p>
                    </div>
                    <div className="mt-4">
                      <span className="text-[clamp(3rem,4vw,3.5rem)] font-display font-black text-white tracking-tighter leading-none">{tier.price}</span>
                      {tier.priceInr && (
                        <p className="text-white/40 text-sm mt-1 font-mono tracking-widest">{tier.priceInr}</p>
                      )}
                    </div>
                  </div>
                }
              >
                <div className="p-8 lg:p-10 pt-0 flex flex-col h-full bg-[#0a0a0a]">
                  <div className="flex flex-col gap-4 flex-1 mb-10 mt-6">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-3 hover-target cursor-default">
                        <Check className="w-5 h-5 text-white/40 mt-[2px] shrink-0" strokeWidth={1.5} />
                        <span className="text-white/70 font-light hover:text-white transition-colors">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => openWizard(serviceId, tier.id)}
                    className={`w-full py-4 rounded-full font-medium uppercase tracking-[0.15em] text-xs transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${tier.featured ? 'bg-white text-black hover:bg-white/80 hover:scale-[0.98]' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[0.98]'}`}
                  >
                    Select Plan
                  </button>
                </div>
              </BlobCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-3xl text-center px-4"
        >
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
            * Prices are starting estimates. Final pricing depends on project scope, features, integrations, and timeline. <button onClick={() => openWizard(serviceId, "custom")} className="text-white hover:underline transition-all">Contact us for a custom quote.</button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
