"use client";

import { useState, useEffect } from "react";
import { ServiceType, EstimatorSummaryProps } from "./estimator/types";
import { WebEstimator } from "./estimator/WebEstimator";
import { AIEstimator } from "./estimator/AIEstimator";
import { GrowthEstimator } from "./estimator/GrowthEstimator";
import { EstimatorSummary } from "./estimator/EstimatorSummary";
import { getCmsFeaturesByCategory } from "@/app/actions/cms";

export function CostEstimator({ service, exchangeRate = 83.5, basePrice = 2000, cmsFeatures: initialCmsFeatures = [] }: { service: ServiceType, exchangeRate?: number, basePrice?: number, cmsFeatures?: any[] }) {
  const [cmsFeatures, setCmsFeatures] = useState<any[]>(initialCmsFeatures.length > 0 ? initialCmsFeatures : []);
  const [summaryData, setSummaryData] = useState<EstimatorSummaryProps>({
    features: [],
    timelineProgress: 0,
    timelineStage: "Configuration",
    recommendedPlan: { name: "", description: "" },
    totalCostUsd: 0,
    totalCostInr: 0,
    serviceId: service
  });

  useEffect(() => {
    async function loadFeatures() {
      const feats = await getCmsFeaturesByCategory(service);
      setCmsFeatures(feats);
    }
    loadFeatures();
  }, [service]);

  return (
    <section id="calculator-section" className="w-full bg-transparent py-16 md:py-28 px-4 md:px-16 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5656] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Interactive Pricing Engine
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight">
            Calculate your investment
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Get an instant, transparent estimate for your custom project. Configure your requirements below and see real-time pricing and timelines.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-white/10 lg:border-none lg:rounded-none lg:gap-0 relative">
          
          {/* LEFT COLUMN: Dynamic Forms (Takes up 7 columns on large screens) */}
          <div className="lg:col-span-7 z-10">
            {service === "web" && <WebEstimator basePrice={basePrice} exchangeRate={exchangeRate} cmsFeatures={cmsFeatures} onUpdate={setSummaryData} />}
            {service === "ai" && <AIEstimator basePrice={basePrice} exchangeRate={exchangeRate} cmsFeatures={cmsFeatures} onUpdate={setSummaryData} />}
            {service === "growth" && <GrowthEstimator basePrice={basePrice} exchangeRate={exchangeRate} cmsFeatures={cmsFeatures} onUpdate={setSummaryData} />}
          </div>

          {/* RIGHT COLUMN: Sticky Summary (Takes up 5 columns on large screens) */}
          <div className="lg:col-span-5 relative z-20">
            <div className="lg:sticky lg:top-24 h-full">
              <EstimatorSummary {...summaryData} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
