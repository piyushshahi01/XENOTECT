"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { serviceConfig } from "@/config/services";
import { useWizard } from "@/context/WizardContext";
import { PackageDetailModal } from "./PackageDetailModal";
import { GlowEffect } from "@/components/ui/glow-effect";
import { FluidBlobs } from "@/components/ui/FluidBlobs";

export function ServicePricing({ service, tiers }: { service: "web" | "ai" | "growth" | "brand", tiers?: any[] }) {
  const displayPricing = tiers || serviceConfig[service as keyof typeof serviceConfig]?.pricing || [];
  const { openWizard } = useWizard();
  const [selectedPkg, setSelectedPkg] = useState<any | null>(null);

  const glowColors = {
    web: "bg-indigo-500/10",
    ai: "bg-[#00E5FF]/10",
    growth: "bg-[#FFA559]/10",
    brand: "bg-blue-500/10",
  };

  const cardGlowColors = {
    web: ["#007AFF", "#005bb5", "#007AFF", "#005bb5", "#007AFF"],
    ai: ["#00E5FF", "#0088FF", "#0044FF", "#00E5FF", "#00E5FF"],
    growth: ["#FFA559", "#FF8C00", "#FF4500", "#FFA559", "#FFA559"],
    brand: ["#00C853", "#00A040", "#00C853", "#00A040", "#00C853"]
  };

  const blobColors = {
    web: { light: ["#007AFF", "#005bb5", "#007AFF"], dark: ["#002244", "#00152a", "#002244"] },
    ai: { light: ["#00E5FF", "#0088FF", "#0044FF"], dark: ["#001133", "#000a1a", "#001133"] },
    growth: { light: ["#FFA559", "#FF8C00", "#FF4500"], dark: ["#4a1c00", "#2d1100", "#4a1c00"] },
    brand: { light: ["#00C853", "#00A040", "#00C853"], dark: ["#00401A", "#002510", "#00401A"] }
  };

  return (
    <>
      <section className="relative w-full py-24 lg:py-32 bg-transparent overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${glowColors[service as keyof typeof glowColors]} blur-[120px] rounded-full pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl lg:text-6xl text-white tracking-tight mb-6"
          >
            Transparent pricing for <br className="hidden md:block" />
            <span className="text-white/40">premium quality.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-lg leading-relaxed"
          >
            No hidden fees, no surprises. Just straightforward packages designed to deliver maximum return on your investment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {displayPricing.map((plan, i) => (
            <motion.div
              key={`${plan.name}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col h-full rounded-3xl"
            >
              <div className="absolute -inset-[1.5px] rounded-[25.5px] overflow-hidden z-0 pointer-events-none opacity-80">
                <GlowEffect
                  colors={cardGlowColors[service as keyof typeof cardGlowColors]}
                  mode="rotate"
                  blur={plan.isPopular ? "strongest" : "medium"}
                  duration={5}
                  scale={1}
                />
              </div>

              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                  <div 
                    className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" 
                      style={{ 
                        backgroundColor: cardGlowColors[service as keyof typeof cardGlowColors][0],
                        color: cardGlowColors[service as keyof typeof cardGlowColors][0]
                      }} 
                    />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative z-10 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border flex flex-col h-full overflow-hidden ${
                plan.isPopular
                  ? "bg-[#050505]/95 border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "bg-[#0A0A0A]/95 border-white/5"
              }`}>
                {/* Fluid Blobs inside the card */}
                <div className="absolute top-0 left-0 w-full h-[300px] z-0 pointer-events-none opacity-40">
                  <div className="absolute inset-0">
                    <FluidBlobs
                      lightColors={blobColors[service as keyof typeof blobColors].light}
                      darkColors={blobColors[service as keyof typeof blobColors].dark}
                      origins={[{ x: 50, y: -55 }, { x: 50, y: -25 }, { x: 50, y: -25 }, { x: 50, y: -25 }]}
                      margin={60}
                      blur={50}
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${plan.isPopular ? "to-[#050505]/95" : "to-[#0A0A0A]/95"} pointer-events-none`} />
                </div>
              
              <div className="mb-8 relative z-10">
                {plan.category && plan.category !== "default" && (
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#00E5FF]">
                    {plan.category}
                  </div>
                )}
                <h3 className="text-xl text-white font-medium mb-4">{plan.name}</h3>
                <div className="flex flex-col mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-serif text-white tracking-tight">{plan.price}</span>
                  </div>
                  {plan.priceInr && (
                    <span className="text-sm font-mono tracking-widest text-white/40 mt-1">{plan.priceInr}</span>
                  )}
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{plan.description}</p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              <ul className="flex-1 space-y-4 mb-8 relative z-10">
                {plan.features.map((feature: string, j: number) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (j * 0.05) }}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <Check className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPkg(plan)}
                className={`relative z-10 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                Get Started
              </button>
            </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center px-4"
        >
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
            * Prices are starting estimates. Final pricing depends on project scope, features, integrations, and timeline. <button onClick={() => openWizard(service, "custom")} className="text-white hover:underline transition-all">Contact us for a custom quote.</button>
          </p>
        </motion.div>
      </div>
    </section>
    
    <PackageDetailModal 
      isOpen={!!selectedPkg} 
      onClose={() => setSelectedPkg(null)} 
      pkg={selectedPkg}
      onGetStarted={() => {
        setSelectedPkg(null);
        // Note: some tiers have .id from DB, some have .name from default static.
        // We pass plan.id if it exists, otherwise a generated id based on name.
        const packageId = selectedPkg?.id || selectedPkg?.name?.toLowerCase().replace(/\s+/g, '-');
        openWizard(service, packageId);
      }}
    />
    </>
  );
}
