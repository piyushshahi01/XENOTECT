"use client";

import { useState, useEffect, useMemo } from "react";
import { RadioItem, CheckboxItem } from "./shared";
import { EstimatorSummaryProps } from "./types";

function groupByStep(features: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  for (const f of features) {
    const key = f.stepGroup || "Add-on Features";
    if (!groups[key]) groups[key] = [];
    groups[key].push(f);
  }
  for (const key of Object.keys(groups)) {
    groups[key].sort((a: any, b: any) => a.order - b.order);
  }
  return groups;
}

const GROWTH_STEPS: { group: string; type: "radio" | "checkbox"; label: string }[] = [
  { group: "Core Growth Service",     type: "radio",    label: "Core Growth Service" },
  { group: "Add-on Features",         type: "checkbox", label: "Add-on Features" },
  { group: "Business Type",           type: "radio",    label: "Business Type" },
  { group: "Marketing Channels",      type: "checkbox", label: "Marketing Channels" },
  { group: "Social Media Platforms",  type: "checkbox", label: "Social Media Platforms" },
  { group: "Content Needed",          type: "checkbox", label: "Content Needed" },
  { group: "Reporting",               type: "radio",    label: "Reporting" },
];

export function GrowthEstimator({ 
  basePrice = 2500, 
  exchangeRate = 83.5, 
  cmsFeatures = [],
  onUpdate 
}: { 
  basePrice?: number, 
  exchangeRate?: number, 
  cmsFeatures?: any[],
  onUpdate: (data: EstimatorSummaryProps) => void 
}) {
  const groups = useMemo(() => groupByStep(cmsFeatures), [cmsFeatures]);

  const [selections, setSelections] = useState<Record<string, string>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const defaults: Record<string, string> = {};
    for (const step of GROWTH_STEPS) {
      if (step.type === "radio" && groups[step.group]?.length > 0 && !selections[step.group]) {
        defaults[step.group] = groups[step.group][0].title;
      }
    }
    if (Object.keys(defaults).length > 0) {
      setSelections(prev => ({ ...prev, ...defaults }));
    }
  }, [groups]);

  const setRadio = (group: string, value: string) => {
    setSelections(prev => ({ ...prev, [group]: value }));
  };

  const toggleCheckbox = (group: string, value: string) => {
    setMultiSelections(prev => {
      const current = prev[group] || [];
      return {
        ...prev,
        [group]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  const priceLabel = (f: any) => {
    if (f.isMultiplier && f.multiplier !== 1) return `x${f.multiplier}`;
    if (!f.isMultiplier && (f.priceUsd > 0 || f.priceInr > 0)) return `+$${f.priceUsd.toLocaleString('en-US')} / ₹${f.priceInr.toLocaleString('en-IN')}`;
    return "";
  };

  useEffect(() => {
    let costUsd = basePrice;

    for (const step of GROWTH_STEPS) {
      const items = groups[step.group] || [];
      
      if (step.type === "radio") {
        const selected = selections[step.group];
        const feat = items.find(f => f.title === selected);
        if (feat) {
          if (feat.isMultiplier) {
            costUsd *= feat.multiplier;
          } else {
            costUsd += feat.priceUsd;
          }
        }
      } else {
        const selected = multiSelections[step.group] || [];
        for (const title of selected) {
          const feat = items.find(f => f.title === title);
          if (feat) {
            if (feat.isMultiplier) {
              costUsd *= feat.multiplier;
            } else {
              costUsd += feat.priceUsd;
            }
          }
        }
      }
    }

    const costInr = Math.round(costUsd * exchangeRate);

    const service = selections["Core Growth Service"] || "";
    const channels = multiSelections["Marketing Channels"] || [];
    let recommended = {
      name: "Growth Catalyst",
      description: "Ideal for aggressive scaling with high ROI focus."
    };
    if (service === "Complete Growth Package" || channels.length >= 4) {
      recommended = {
        name: "Market Dominance Package",
        description: "Full-scale omnipresence across all channels with maximum ad budget utilization."
      };
    } else if (selections["Business Type"] === "Local Business") {
      recommended = {
        name: "Local Authority Setup",
        description: "Dominate your local market through targeted SEO and tight community engagement."
      };
    }

    const smPlatforms = multiSelections["Social Media Platforms"] || [];
    const content = multiSelections["Content Needed"] || [];
    let progress = 20;
    let stage = "Strategy";
    if (channels.length > 0 || smPlatforms.length > 0) { progress = 50; stage = "Channel Setup"; }
    if (content.length > 0) { progress = 75; stage = "Content Production"; }
    if (costUsd > 15000) { progress = 100; stage = "Campaign Live"; }

    const summaryList = [
      selections["Core Growth Service"],
      selections["Business Type"] ? `${selections["Business Type"]} Business` : null,
      ...channels.map(c => `${c} Ads`),
      ...smPlatforms.map(s => `${s} Management`),
      ...content,
      ...(multiSelections["Add-on Features"] || []),
      selections["Reporting"] ? `${selections["Reporting"]} Reporting` : null,
    ].filter(Boolean) as string[];

    onUpdate({
      features: summaryList,
      timelineProgress: progress,
      timelineStage: stage,
      recommendedPlan: recommended,
      totalCostUsd: Math.round(costUsd),
      totalCostInr: costInr
    });
  }, [selections, multiSelections, basePrice, exchangeRate, groups, onUpdate]);

  return (
    <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E] lg:rounded-l-2xl lg:border lg:border-r-0 lg:border-white/10 space-y-6 lg:space-y-0 lg:pr-8">
      {GROWTH_STEPS.map((step, idx) => {
        const items = groups[step.group] || [];
        if (items.length === 0) return null;
        
        const isFirst = idx === 0;
        const isLast = idx === GROWTH_STEPS.length - 1;
        
        return (
          <div key={step.group} className={isFirst ? "pb-8" : isLast ? "pt-8" : "py-8"}>
            <h3 className="text-lg font-medium mb-4">Step {idx + 1} — {step.label}</h3>
            <div className={`grid ${step.type === "checkbox" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"} gap-2`}>
              {items.map(f => {
                const label = priceLabel(f);
                const displayLabel = label ? `${f.title} (${label})` : f.title;
                
                if (step.type === "radio") {
                  return (
                    <RadioItem 
                      key={f.id} 
                      label={displayLabel} 
                      checked={selections[step.group] === f.title} 
                      onChange={() => setRadio(step.group, f.title)} 
                    />
                  );
                } else {
                  const checked = (multiSelections[step.group] || []).includes(f.title);
                  return (
                    <CheckboxItem 
                      key={f.id} 
                      label={displayLabel} 
                      checked={checked} 
                      onChange={() => toggleCheckbox(step.group, f.title)} 
                    />
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
