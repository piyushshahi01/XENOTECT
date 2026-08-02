"use client";

import { useState, useEffect, useMemo } from "react";
import { RadioItem, CheckboxItem } from "./shared";
import { EstimatorSummaryProps } from "./types";

// Helper: group CMS features by stepGroup
function groupByStep(features: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  for (const f of features) {
    const key = f.stepGroup || "Add-on Features";
    if (!groups[key]) groups[key] = [];
    groups[key].push(f);
  }
  // Sort each group by order
  for (const key of Object.keys(groups)) {
    groups[key].sort((a: any, b: any) => a.order - b.order);
  }
  return groups;
}

// The ordered list of steps for the web estimator
// stepGroup name → selection type (radio = pick one, checkbox = pick many)
const WEB_STEPS: { group: string; type: "radio" | "checkbox"; label: string }[] = [
  { group: "Website Type",     type: "radio",    label: "What do you want to build?" },
  { group: "Page Range",       type: "radio",    label: "How many pages?" },
  { group: "Design Style",     type: "radio",    label: "Design Style" },
  { group: "Add-on Features",  type: "checkbox", label: "Features Needed" },
  { group: "Hosting",          type: "radio",    label: "Hosting" },
  { group: "Domain",           type: "radio",    label: "Domain" },
  { group: "Maintenance",      type: "radio",    label: "Maintenance" },
  { group: "Timeline",         type: "radio",    label: "Timeline" },
];

export function WebEstimator({ 
  basePrice = 2000, 
  exchangeRate = 83.5, 
  cmsFeatures = [],
  onUpdate 
}: { 
  basePrice?: number, 
  exchangeRate?: number, 
  cmsFeatures?: any[],
  onUpdate: (data: EstimatorSummaryProps) => void 
}) {
  // Group features by stepGroup
  const groups = useMemo(() => groupByStep(cmsFeatures), [cmsFeatures]);

  // State: for radio steps, store the selected title; for checkbox steps, store array of titles
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});

  // Initialize default radio selections (first item in each radio group)
  useEffect(() => {
    const defaults: Record<string, string> = {};
    for (const step of WEB_STEPS) {
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

  // Price label helper
  const priceLabel = (f: any) => {
    if (f.isMultiplier && f.multiplier !== 1) return `x${f.multiplier}`;
    if (!f.isMultiplier && (f.priceUsd > 0 || f.priceInr > 0)) return `+$${f.priceUsd.toLocaleString('en-US')} / ₹${f.priceInr.toLocaleString('en-IN')}`;
    return "";
  };

  // Calculate cost
  useEffect(() => {
    let costUsd = basePrice;

    // Process all steps
    for (const step of WEB_STEPS) {
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
        // checkbox — apply all selected
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

    // Determine recommendation
    const type = selections["Website Type"] || "";
    const addons = multiSelections["Add-on Features"] || [];
    let recommended = {
      name: "Starter Package",
      description: "Perfect for basic web presence and fast deployment."
    };
    if (type === "E-commerce Store" || addons.includes("Shopping Cart")) {
      recommended = {
        name: "E-commerce Pro",
        description: "Everything you need to sell online at scale, including payments and inventory."
      };
    } else if (type === "SaaS Platform" || addons.includes("API Integration")) {
      recommended = {
        name: "Enterprise Architecture",
        description: "Robust backend infrastructure for complex web applications and SaaS platforms."
      };
    } else if (costUsd > 10000) {
      recommended = {
        name: "Premium Business Package",
        description: "Includes an admin dashboard, high-end UI/UX, and extensive custom integrations."
      };
    }

    // Timeline progress
    const allAddons = multiSelections["Add-on Features"] || [];
    const maintenance = selections["Maintenance"] || "";
    let progress = 20;
    let stage = "Discovery";
    if (allAddons.length > 3) { progress = 40; stage = "Design"; }
    if (allAddons.length > 6) { progress = 70; stage = "Development"; }
    if (maintenance && maintenance !== "No maintenance") { progress = 100; stage = "Launch & Support"; }

    // Summary
    const summaryList = [
      selections["Website Type"],
      selections["Page Range"],
      selections["Design Style"],
      selections["Hosting"],
      selections["Domain"],
      selections["Maintenance"],
      selections["Timeline"],
      ...allAddons,
    ].filter(Boolean);

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
    <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E] lg:rounded-l-2xl lg:border lg:border-r-0 lg:border-white/10">
      {WEB_STEPS.map((step, idx) => {
        const items = groups[step.group] || [];
        if (items.length === 0) return null;
        
        const isFirst = idx === 0;
        const isLast = idx === WEB_STEPS.length - 1;
        
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
