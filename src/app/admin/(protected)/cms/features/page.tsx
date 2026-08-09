"use client";

import React, { useEffect, useState } from "react";
import { getCmsFeatures } from "@/app/actions/cms";
import { FeatureForm } from "./FeatureForm";

export default function FeaturesCmsPage() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getCmsFeatures().then(data => {
      setFeatures(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            CMS Module
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Estimator Options</h1>
          <p className="text-neutral-400 max-w-lg text-lg">Manage all options, add-ons, hosting, and timeline settings for the Cost Estimators.</p>
        </div>
        <div className="shrink-0">
          <FeatureForm feat={null} onSuccess={loadData} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-16 relative z-10">
          {["web", "ai", "growth"].map(category => {
            const categoryFeatures = features.filter(f => f.category === category);
            const title = category === "web" ? "Web Services" : category === "ai" ? "AI Solutions" : "Growth & Marketing";
            
            return (
              <div key={category} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryFeatures.map((feat) => (
                    <div key={feat.id} className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/10 transition-colors group">
                      <div className="h-full rounded-[calc(2rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-6 flex flex-col justify-between min-h-[200px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col gap-2">
                          <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">{feat.title}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm uppercase tracking-widest text-neutral-500 font-bold">{feat.stepGroup}</span>
                            <div className="h-1 w-1 rounded-full bg-white/20" />
                            {feat.isMultiplier ? (
                              <p className="text-sm text-amber-400 font-bold tracking-tight">x{feat.multiplier} MULTIPLIER</p>
                            ) : (
                              <p className="text-sm text-emerald-400 font-bold tracking-tight">${feat.priceUsd.toLocaleString()} / ₹{feat.priceInr.toLocaleString()}</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-6 border-t border-white/5 flex justify-end relative z-10">
                          <FeatureForm feat={feat} onSuccess={loadData} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {categoryFeatures.length === 0 && (
                    <div className="col-span-full p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 text-center flex items-center justify-center">
                      <p className="text-neutral-500 italic text-sm">No features currently assigned to this category.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
