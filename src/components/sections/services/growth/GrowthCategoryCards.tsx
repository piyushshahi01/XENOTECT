"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FluidBlobs } from "@/components/ui/FluidBlobs";
import { GlowEffect } from "@/components/ui/glow-effect";
import { PackageDetailModal } from "@/components/sections/services/PackageDetailModal";
import { useWizard } from "@/context/WizardContext";

/* ── theme ── */
const blobLight  = ["#FFA559", "#FF8C00", "#FF4500"];
const blobDark   = ["#4a1c00", "#2d1100", "#1a0a00"];
const glowColors = ["#FFA559", "#FF4500"];

/* ── static cards ── */
const STATIC_CARDS = [
  {
    category: "Performance Marketing",
    basePrice: "₹25,000/month",
    rows: [
      { name: "Meta Ads Management (Facebook & Instagram)",        price: "Included" },
      { name: "Google Ads Management (Search, Display & Shopping)", price: "Included" },
      { name: "Campaign Strategy & Planning",                       price: "Included" },
      { name: "Audience Research & Targeting",                      price: "Included" },
      { name: "Ad Copywriting",                                     price: "Included" },
      { name: "Creative Strategy",                                  price: "Included" },
      { name: "Campaign Setup & Optimization",                      price: "Included" },
      { name: "A/B Testing",                                        price: "Included" },
      { name: "Conversion Tracking Setup",                          price: "Included" },
      { name: "Retargeting Campaigns",                              price: "Included" },
      { name: "Weekly Performance Monitoring",                      price: "Included" },
      { name: "Monthly Performance Report",                         price: "Included" },
      { name: "Custom Performance Strategy",                        price: "Custom Quote" },
    ],
  },
  {
    category: "Social Media Management",
    basePrice: "₹20,000/month",
    rows: [
      { name: "Content Strategy & Planning",                        price: "Included" },
      { name: "Monthly Content Calendar",                           price: "Included" },
      { name: "12 Static Posts",                                    price: "Included" },
      { name: "8 Carousel Posts",                                   price: "Included" },
      { name: "8 Reels (Editing + Captions)",                       price: "Included" },
      { name: "20 Story Designs",                                   price: "Included" },
      { name: "Caption Copywriting",                                price: "Included" },
      { name: "Hashtag Research",                                   price: "Included" },
      { name: "Community Management (Reply to comments & DMs)",     price: "Included" },
      { name: "Monthly Performance Report",                         price: "Included" },
      { name: "Custom Social Media Plan",                           price: "Custom Quote" },
    ],
  },
];

export function GrowthCategoryCards({ tiers, service }: { tiers: any[]; service: string }) {
  const { openWizard } = useWizard();
  const [selectedPkg, setSelectedPkg] = useState<any | null>(null);

  /* Group DB tiers by category */
  const groupedTiers = useMemo(() => {
    const groups: Record<string, any[]> = {};
    tiers.forEach((tier) => {
      const cat = tier.category || "default";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tier);
    });
    return groups;
  }, [tiers]);

  const dbCategories = Object.keys(groupedTiers).sort((a, b) => {
    if (a.toLowerCase().includes("performance")) return -1;
    if (a.toLowerCase().includes("social"))      return 0;
    if (a.toLowerCase().includes("seo"))         return 1;
    return a.localeCompare(b);
  });

  /* Build one unified card list: DB cards first, then static cards */
  type CardItem =
    | { kind: "db";     cat: string; pkgs: any[]; idx: number }
    | { kind: "static"; card: typeof STATIC_CARDS[0]; idx: number };

  const allCards: CardItem[] = [
    ...dbCategories.map((cat, i) => ({ kind: "db" as const, cat, pkgs: groupedTiers[cat], idx: i })),
    ...STATIC_CARDS.map((card, i) => ({ kind: "static" as const, card, idx: dbCategories.length + i })),
  ];

  /* middle card gets "Most Popular" */
  const popularIdx = Math.floor(allCards.length / 2);

  return (
    <section className="py-24 relative z-10 bg-transparent overflow-visible">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-rose-400">
            Pricing Structure
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl lg:text-6xl text-white tracking-tight"
          >
            Transparent pricing for{" "}
            <br className="hidden md:block" />
            <span className="text-white/40">premium quality.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-lg leading-relaxed max-w-2xl"
          >
            No hidden fees, no surprises. Just straightforward packages designed to deliver maximum return on your investment.
          </motion.p>
        </div>

        {/* ── Single unified row of cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {allCards.map((item) => {
            const isPopular = item.idx === popularIdx;

            return (
              <motion.div
                key={item.idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: item.idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col h-full rounded-3xl"
              >
                {/* Glow border */}
                <div className="absolute -inset-[1.5px] rounded-[25.5px] overflow-hidden z-0 pointer-events-none opacity-80">
                  <GlowEffect colors={glowColors} mode="rotate" blur={isPopular ? "strongest" : "medium"} duration={5} scale={1} />
                </div>

                {/* Most Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColors[0] }} />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card body */}
                <div className={`relative z-10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl border flex flex-col h-full overflow-hidden ${
                  isPopular
                    ? "bg-[#050505]/95 border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "bg-[#0A0A0A]/95 border-white/5"
                }`}>
                  {/* FluidBlobs */}
                  <div className="absolute top-0 left-0 w-full h-[320px] z-0 pointer-events-none opacity-70">
                    <div className="absolute inset-0">
                      <FluidBlobs
                        lightColors={blobLight}
                        darkColors={blobDark}
                        origins={[{ x: 50, y: -55 }, { x: 50, y: -25 }, { x: 50, y: -25 }, { x: 50, y: -25 }]}
                        margin={60}
                        blur={50}
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isPopular ? "to-[#050505]/95" : "to-[#0A0A0A]/95"} pointer-events-none`} />
                  </div>

                  {/* ── DB card header ── */}
                  {item.kind === "db" && (
                    <div className="mb-6 relative z-10">
                      <h3 className="text-3xl text-white font-serif tracking-tight mb-2">
                        {item.cat === "default" ? "Growth Packages" : item.cat}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Choose from our pre-built solutions or request a custom quote.
                      </p>
                    </div>
                  )}

                  {/* ── Static card header ── */}
                  {item.kind === "static" && (
                    <div className="mb-6 relative z-10">
                      <h3 className="text-2xl md:text-3xl text-white font-serif tracking-tight mb-1">{item.card.category}</h3>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-2xl lg:text-3xl font-serif text-white tracking-tight">{item.card.basePrice}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mt-2">All features below included in this package.</p>
                    </div>
                  )}

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 relative z-10" />

                  {/* ── DB card rows ── */}
                  {item.kind === "db" && (
                    <ul className="flex-1 flex flex-col gap-0 mb-8 relative z-10">
                      {item.pkgs.map((pkg: any, j: number) => (
                        <motion.li
                          key={pkg.id || j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + j * 0.05 }}
                          className="flex items-center justify-between gap-3 py-3.5 border-b border-white/[0.06] last:border-0"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Check className="w-4 h-4 text-white/40 shrink-0" />
                            <span className="text-white/80 font-medium text-xs sm:text-sm">{pkg.name}</span>
                          </div>
                          <div className="shrink-0 pl-3 text-right">
                            {(pkg.priceInr || pkg.price) && pkg.price !== "Custom" ? (
                              <span className="font-mono text-white/90 font-semibold text-xs sm:text-sm">{pkg.priceInr || pkg.price}</span>
                            ) : (
                              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">Custom Quote</span>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* ── Static card rows ── */}
                  {item.kind === "static" && (
                    <ul className="flex-1 flex flex-col gap-0 mb-8 relative z-10">
                      {item.card.rows.map((row, j) => (
                        <motion.li
                          key={row.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + j * 0.04 }}
                          className="flex items-center justify-between gap-3 py-3.5 border-b border-white/[0.06] last:border-0"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Check className="w-4 h-4 text-white/40 shrink-0" />
                            <span className="text-white/80 font-medium text-xs sm:text-sm">{row.name}</span>
                          </div>
                          <div className="shrink-0 pl-3 text-right">
                            {row.price === "Custom Quote" ? (
                              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">Custom Quote</span>
                            ) : (
                              <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Included</span>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => {
                      const slug = item.kind === "db"
                        ? item.cat.toLowerCase().replace(/\s+/g, "-")
                        : item.card.category.toLowerCase().replace(/\s+/g, "-");
                      openWizard(service, slug);
                    }}
                    className={`relative z-10 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 mt-auto ${
                      isPopular
                        ? "bg-white text-black hover:bg-neutral-200"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center px-4"
        >
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
            * Prices are starting estimates. Final pricing depends on project scope, features, and timeline.{" "}
            <button onClick={() => openWizard(service, "custom")} className="text-white hover:underline transition-all">
              Contact us for a custom quote.
            </button>
          </p>
        </motion.div>
      </div>

      {/* Package Detail Modal */}
      <PackageDetailModal
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        pkg={selectedPkg}
        onGetStarted={() => {
          setSelectedPkg(null);
          const packageId = selectedPkg?.id || selectedPkg?.name?.toLowerCase().replace(/\s+/g, "-");
          openWizard(service, packageId);
        }}
      />
    </section>
  );
}
