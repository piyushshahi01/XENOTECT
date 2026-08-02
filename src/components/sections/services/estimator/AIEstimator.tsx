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

const AI_STEPS: { group: string; type: "radio" | "checkbox"; label: string }[] = [
  { group: "Core AI Solution",  type: "radio",    label: "Core AI Solution" },
  { group: "Add-on Features",   type: "checkbox", label: "Add-on Features" },
  { group: "AI Model",          type: "radio",    label: "AI Model" },
  { group: "Integrations",      type: "checkbox", label: "Integrations" },
  { group: "Knowledge Base",    type: "checkbox", label: "Knowledge Base" },
  { group: "Languages",         type: "radio",    label: "Languages" },
  { group: "Expected Users",    type: "radio",    label: "Expected Users" },
  { group: "Ongoing Support",   type: "radio",    label: "Ongoing Support" },
];

export function AIEstimator({ 
  basePrice = 3000, 
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
    for (const step of AI_STEPS) {
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

    for (const step of AI_STEPS) {
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

    const solution = selections["Core AI Solution"] || "";
    const integrations = multiSelections["Integrations"] || [];
    let recommended = {
      name: "Standard AI Integration",
      description: "A robust AI setup to automate basic workflows and engage users."
    };
    if (solution === "Custom AI" || integrations.length > 3) {
      recommended = {
        name: "Enterprise AI Infrastructure",
        description: "Full-scale custom AI deployment with complex logic, multiple integrations, and heavy scaling."
      };
    } else if (solution === "Voice Agent") {
      recommended = {
        name: "Conversational Voice AI",
        description: "Advanced voice synthesis and recognition for seamless human-like interactions."
      };
    }

    const kb = multiSelections["Knowledge Base"] || [];
    const support = selections["Ongoing Support"] || "";
    let progress = 25;
    let stage = "Model Selection";
    if (integrations.length > 0) { progress = 50; stage = "Integration Planning"; }
    if (kb.length > 0) { progress = 75; stage = "Training Pipeline"; }
    if (support && support !== "None") { progress = 100; stage = "Deployment & Support"; }

    const summaryList = [
      selections["Core AI Solution"],
      selections["AI Model"] ? `Model: ${selections["AI Model"]}` : null,
      ...integrations.map(i => `${i} Integration`),
      ...kb.filter(k => k !== "Not Required").map(k => `${k} Knowledge Base`),
      selections["Languages"],
      selections["Expected Users"] ? `${selections["Expected Users"]} Users` : null,
      ...(multiSelections["Add-on Features"] || []),
      support && support !== "None" ? `${support} Support` : null
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
    <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E] lg:rounded-l-2xl lg:border lg:border-r-0 lg:border-white/10">
      {AI_STEPS.map((step, idx) => {
        const items = groups[step.group] || [];
        if (items.length === 0) return null;
        
        const isFirst = idx === 0;
        const isLast = idx === AI_STEPS.length - 1;
        
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
