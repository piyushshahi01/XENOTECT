"use client";

import { Check, ArrowRight } from "lucide-react";
import { EstimatorSummaryProps } from "./types";
import { BlobCard } from "@/components/unlumen-ui/blob-card";
import { useWizard } from "@/context/WizardContext";

export function EstimatorSummary({ 
  features, 
  timelineProgress, 
  timelineStage, 
  recommendedPlan, 
  totalCostUsd,
  totalCostInr,
  serviceId
}: EstimatorSummaryProps) {
  const { openWizard } = useWizard();
  return (
    <div className="h-full flex flex-col lg:pl-6">
      <BlobCard
        className="h-full"
        headerHeight={180}
        header={
          <div className="flex flex-col h-full justify-center">
            <p className="text-sm font-medium text-white/70 mb-2 uppercase tracking-widest drop-shadow-md">
              Estimated Investment
            </p>
            <div className="flex flex-col gap-1">
              <div className="text-5xl font-black tracking-tight text-white drop-shadow-lg">
                ${totalCostUsd.toLocaleString('en-US')}
              </div>
              <div className="text-sm font-mono text-white/50 tracking-widest">
                ₹{totalCostInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        }
      >
        <div className="flex-1 p-8 lg:p-10 pt-4 flex flex-col bg-[#0a0a0a]">
          
          {/* Visual Timeline */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">Project Phase</h3>
              <span className="text-[11px] text-[#FF5656] font-mono uppercase">{timelineStage}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF5656] to-orange-500 transition-all duration-700 ease-in-out rounded-full shadow-[0_0_10px_rgba(255,86,86,0.5)]" 
                style={{ width: `${timelineProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-2 uppercase tracking-widest font-mono">
              <span>Discovery</span>
              <span>Launch</span>
            </div>
          </div>

          {/* Recommended Package */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-mono text-white uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5656] animate-pulse" />
              Recommended Match
            </div>
            <h4 className="text-lg font-bold text-white mb-1">{recommendedPlan.name}</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              {recommendedPlan.description}
            </p>
          </div>

          {/* Live Feature Checklist */}
          <div className="mb-10 flex-1">
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-widest text-white/80">Included in Scope</h3>
            {features.length === 0 ? (
              <p className="text-neutral-400 text-xs italic">Configure options to build your package...</p>
            ) : (
              <ul className="space-y-3">
                {features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-white/70">
                    <Check className="w-4 h-4 text-[#FF5656] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <button 
            onClick={() => openWizard(serviceId)}
            className="group relative w-full flex items-center justify-center gap-4 h-14 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/90 hover:scale-[0.98]"
          >
            <span>Request Proposal</span>
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </button>

        </div>
      </BlobCard>
    </div>
  );
}
