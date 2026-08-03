"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useWizard } from "@/context/WizardContext";

const GROWTH_PRICING: {
  category: string;
  startingFrom: string;
  rows: { service: string; price: string }[];
}[] = [
  {
    category: "Performance Marketing",
    startingFrom: "₹25,000/month",
    rows: [
      { service: "Performance Marketing (1 Month)", price: "₹25,000/month" },
      { service: "Meta Ads Management (Facebook & Instagram)", price: "Included" },
      { service: "Google Ads Management (Search, Display & Shopping)", price: "Included" },
      { service: "Campaign Strategy & Planning", price: "Included" },
      { service: "Audience Research & Targeting", price: "Included" },
      { service: "Ad Copywriting", price: "Included" },
      { service: "Creative Strategy", price: "Included" },
      { service: "Campaign Setup & Optimization", price: "Included" },
      { service: "A/B Testing", price: "Included" },
      { service: "Conversion Tracking Setup", price: "Included" },
      { service: "Retargeting Campaigns", price: "Included" },
      { service: "Weekly Performance Monitoring", price: "Included" },
      { service: "Monthly Performance Report", price: "Included" },
      { service: "Custom Performance Strategy", price: "Custom Quote" },
    ],
  },
  {
    category: "Social Media Management",
    startingFrom: "₹20,000/month",
    rows: [
      { service: "Social Media Management (1 Month)", price: "₹20,000/month" },
      { service: "Content Strategy & Planning", price: "Included" },
      { service: "Monthly Content Calendar", price: "Included" },
      { service: "12 Static Posts", price: "Included" },
      { service: "8 Carousel Posts", price: "Included" },
      { service: "8 Reels (Editing + Captions)", price: "Included" },
      { service: "20 Story Designs", price: "Included" },
      { service: "Caption Copywriting", price: "Included" },
      { service: "Hashtag Research", price: "Included" },
      { service: "Community Management (Reply to comments & DMs)", price: "Included" },
      { service: "Monthly Performance Report", price: "Included" },
      { service: "Custom Social Media Plan", price: "Custom Quote" },
    ],
  },
];

export function GrowthPricingTables() {
  const { openWizard } = useWizard();

  return (
    <section className="w-full relative z-20 py-24 bg-transparent max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col items-center text-center gap-4 mb-20 reveal-up">
        <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-rose-400">
          Pricing Structure
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
          Clear &amp; Transparent Estimates
        </h2>
        <p className="text-neutral-400 max-w-2xl mt-4">
          Select from our growth marketing packages or contact us for a fully customised enterprise plan.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {GROWTH_PRICING.map((table, idx) => (
          <div key={table.category} className="flex flex-col gap-6 reveal-up">
            {/* Category header */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-[1px] bg-rose-500/50" />
              <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                {table.category}
              </h3>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Table card */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-white/10 bg-white/[0.02]">
                  <div className="col-span-8 text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-500">
                    Service
                  </div>
                  <div className="col-span-4 text-right text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-500">
                    Starting From
                  </div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                  {table.rows.map((row, i) => {
                    const isHeader = i === 0;
                    const isCustom = row.price === "Custom Quote";
                    return (
                      <motion.div
                        key={row.service}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className={`group grid grid-cols-12 gap-4 px-8 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center last:border-0 ${
                          isHeader ? "bg-white/[0.03]" : ""
                        }`}
                      >
                        <div className="col-span-8 flex flex-col gap-1">
                          <span
                            className={`text-base md:text-lg font-medium transition-colors flex items-center gap-3 ${
                              isHeader
                                ? "text-white group-hover:text-rose-400"
                                : "text-white/80 group-hover:text-white"
                            }`}
                          >
                            {isHeader && (
                              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                Base
                              </span>
                            )}
                            {row.service}
                          </span>
                        </div>

                        <div className="col-span-4 flex justify-end items-center">
                          {isCustom ? (
                            <span className="text-[10px] uppercase tracking-widest text-rose-400 font-semibold">
                              Custom Quote
                            </span>
                          ) : isHeader ? (
                            <span className="text-xl md:text-2xl font-mono text-white font-semibold">
                              {row.price}
                            </span>
                          ) : (
                            <span className="text-sm md:text-base font-mono text-white/50">
                              {row.price}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => openWizard("growth")}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 hover:scale-105 transition-all duration-300"
        >
          Request Custom Quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
