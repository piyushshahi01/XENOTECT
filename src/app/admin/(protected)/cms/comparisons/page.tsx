"use client";

import React, { useEffect, useState } from "react";
import { getCmsComparisonFeaturesByCategory } from "@/app/actions/cms";
import { ComparisonForm } from "./ComparisonForm";
import { BulkImportModal } from "./BulkImportModal";

export default function ComparisonsCmsPage() {
  const [featuresWeb, setFeaturesWeb] = useState<any[]>([]);
  const [featuresAi, setFeaturesAi] = useState<any[]>([]);
  const [featuresGr, setFeaturesGr] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCmsComparisonFeaturesByCategory("web"),
      getCmsComparisonFeaturesByCategory("ai"),
      getCmsComparisonFeaturesByCategory("growth")
    ]).then(([web, ai, gr]) => {
      setFeaturesWeb(web);
      setFeaturesAi(ai);
      setFeaturesGr(gr);
      setLoading(false);
    });
  }, []);

  const renderServiceSection = (title: string, serviceId: string, features: any[]) => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-white/10" />
        <BulkImportModal serviceId={serviceId} />
        <ComparisonForm feature={null} serviceId={serviceId} />
      </div>
      
      <div className="bg-[#0A0A0F]/90 border border-white/5 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="py-4 px-6 font-bold text-neutral-400 text-sm uppercase tracking-wider">Feature</th>
                <th className="py-4 px-6 font-bold text-neutral-400 text-sm uppercase tracking-wider">Starter</th>
                <th className="py-4 px-6 font-bold text-neutral-400 text-sm uppercase tracking-wider">Business</th>
                <th className="py-4 px-6 font-bold text-neutral-400 text-sm uppercase tracking-wider">Enterprise</th>
                <th className="py-4 px-6 text-right font-bold text-neutral-400 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500 italic text-sm">
                    No comparison rows configured for {title}.
                  </td>
                </tr>
              ) : (
                features.map((feat) => (
                  <tr key={feat.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6 text-white font-medium">{feat.name}</td>
                    <td className="py-4 px-6 text-neutral-300">{feat.starter}</td>
                    <td className="py-4 px-6 text-neutral-300">{feat.business}</td>
                    <td className="py-4 px-6 text-neutral-300">{feat.enterprise}</td>
                    <td className="py-4 px-6 text-right">
                      <ComparisonForm feature={feat} serviceId={serviceId} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col gap-3 relative z-10">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          CMS Module
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Compare Packages</h1>
        <p className="text-neutral-400 max-w-lg text-lg">Manage the feature comparison matrices for all services.</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="h-64 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
          <div className="h-64 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
        </div>
      ) : (
        <div className="flex flex-col gap-16 relative z-10">
          {renderServiceSection("Web Solutions", "web", featuresWeb)}
          {renderServiceSection("AI Solutions", "ai", featuresAi)}
          {renderServiceSection("Growth & Marketing", "growth", featuresGr)}
        </div>
      )}
    </div>
  );
}
