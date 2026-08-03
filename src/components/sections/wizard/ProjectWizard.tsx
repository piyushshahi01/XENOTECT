"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check, Code, Cpu, Palette, Sparkles, Building2, Rocket, ShieldCheck
} from "lucide-react";
import { RadialGlowButton } from "@/components/ui/radial-glow-button";
import { submitProjectWizard } from "@/app/actions/wizard";

const ICON_MAP: Record<string, React.ReactNode> = {
  "Code": <Code className="w-6 h-6" />,
  "Cpu": <Cpu className="w-6 h-6" />,
  "Palette": <Palette className="w-6 h-6" />,
};

interface ProjectWizardProps {
  initialServices: any[];
  initialPackages: any[];
  initialFeatures: any[];
  preSelectedServiceId?: string | null;
  preSelectedPackageId?: string | null;
  preSelectedCategory?: string | null;
}

// --- COMPONENT ---
export function ProjectWizard({ 
  initialServices, 
  initialPackages, 
  initialFeatures,
  preSelectedServiceId,
  preSelectedPackageId,
  preSelectedCategory
}: ProjectWizardProps) {
  // If we have a preSelected package or service, we might want to start at step 2 or 3
  const initialStep = preSelectedPackageId ? 3 : (preSelectedServiceId ? 2 : 1);
  const [step, setStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  // Find base price if package is preselected
  let preSelectedBasePrice = 0;
  let preSelectedTimeline = "";
  if (preSelectedPackageId) {
    const pkg = initialPackages.find(p => p.id === preSelectedPackageId);
    if (pkg) {
      preSelectedBasePrice = pkg.priceUsd;
      preSelectedTimeline = pkg.time;
    }
  }

  const [data, setData] = useState({
    service: preSelectedServiceId || "",
    package: preSelectedPackageId || "",
    basePrice: preSelectedBasePrice,
    timeline: preSelectedTimeline,
    features: {} as Record<string, boolean>,
    contact: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      requirements: ""
    }
  });

  // Calculate live estimate
  const estimatedPrice = 
    data.basePrice + 
    Object.entries(data.features)
      .filter(([_, isSelected]) => isSelected)
      .reduce((total, [featId]) => {
        const feature = initialFeatures.find(f => f.id === featId);
        return total + (feature ? feature.priceUsd : 0);
      }, 0);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleServiceSelect = (serviceId: string) => {
    setData(prev => ({ ...prev, service: serviceId, package: "", basePrice: 0 }));
    nextStep();
  };

  const handlePackageSelect = (pkg: any) => {
    setData(prev => ({ 
      ...prev, 
      package: pkg.id, 
      basePrice: pkg.priceUsd,
      timeline: pkg.time
    }));
    nextStep();
  };

  const toggleFeature = (featureId: string) => {
    setData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureId]: !prev.features[featureId]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...data,
      estimatedPrice,
      estimatedTimeline: data.timeline,
    };

    const res = await submitProjectWizard(payload);
    
    if (res.success) {
      setInquiryId(res.inquiryId ?? null);
      nextStep(); // Go to step 6 (Confirmation)
    } else {
      alert("Something went wrong. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[400px] flex flex-col justify-start pt-0 pb-8 relative z-10">
      
      {/* Progress Bar (Hidden on success) */}
      {step < 6 && (
        <div className="mb-12">
          <div className="flex justify-between mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <span>Step {step} of 5</span>
            <span className="text-white">${estimatedPrice.toLocaleString('en-US')} Est.</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: "20%" }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">What do you need?</h2>
                <p className="text-neutral-400 max-w-lg text-sm md:text-base">Select the primary focus of your project so we can tailor the right solution.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {initialServices.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv.id)}
                    className={`group relative p-8 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden flex flex-col items-start justify-start min-h-[220px] ${
                      data.service === srv.id 
                        ? "border-[#00E5FF]/40 bg-[#00E5FF]/[0.03] shadow-[0_0_30px_rgba(0,229,255,0.05)]" 
                        : "border-white/10 bg-[#050508] hover:border-white/30 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 w-full flex flex-col flex-1">
                      <div className={`mb-6 p-4 rounded-2xl inline-block transition-colors duration-500 ${
                        data.service === srv.id ? "bg-[#00E5FF]/20 text-[#00E5FF]" : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
                      }`}>
                        {ICON_MAP[srv.icon] || <Code className="w-6 h-6" />}
                      </div>
                      <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                        data.service === srv.id ? "text-white" : "text-white/90 group-hover:text-white"
                      }`}>{srv.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed font-light">{srv.description || srv.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PACKAGE */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">Choose a baseline</h2>
                <p className="text-neutral-400 max-w-lg text-sm md:text-base">Select a package that best fits the scale of your operation.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {initialPackages
                  .filter(p => p.serviceId === data.service)
                  .filter(p => !preSelectedCategory || (p.category && p.category.toLowerCase().replace(/\s+/g, '-') === preSelectedCategory))
                  .map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className="group relative p-8 md:p-10 rounded-[2rem] border border-white/10 bg-[#050508] hover:border-white/20 transition-all duration-500 text-left flex flex-col justify-between min-h-[460px] overflow-hidden"
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight mb-4 group-hover:text-[#00E5FF] transition-colors">{pkg.title}</h3>
                      
                      {pkg.time && pkg.time !== "TBD" && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-8">
                          <span className="w-1 h-1 rounded-full bg-[#00E5FF]" />
                          Timeline: {pkg.time}
                        </div>
                      )}
                      
                      <ul className="space-y-4 mb-10">
                        {pkg.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                            <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00E5FF]/10 transition-colors">
                              <Check className="w-2.5 h-2.5 text-white/70 group-hover:text-[#00E5FF] transition-colors" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-2">Starting from</p>
                      <p className="text-3xl md:text-4xl font-display text-white">${pkg.priceUsd.toLocaleString('en-US')}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-12 flex justify-start">
                <button onClick={prevStep} className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FEATURES */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">Customize features</h2>
                <p className="text-neutral-400 max-w-lg text-sm md:text-base">Select additional capabilities you need for your project.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {initialFeatures
                  .filter(feat => feat.category === data.service)
                  .map(feat => (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`group relative flex flex-col justify-between p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 text-left overflow-hidden min-h-[160px] ${
                      data.features[feat.id]
                        ? "border-[#00E5FF]/40 bg-[#00E5FF]/[0.03] shadow-[0_0_30px_rgba(0,229,255,0.05)]"
                        : "border-white/10 bg-[#050508] hover:border-white/20 hover:bg-[#0a0a0f]"
                    }`}
                  >
                    {/* Background glow when selected */}
                    {data.features[feat.id] && (
                       <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/[0.05] to-transparent pointer-events-none" />
                    )}

                    <div className="flex items-start justify-between gap-4 relative z-10 w-full mb-6">
                      <span className={`font-serif text-xl tracking-tight leading-tight ${data.features[feat.id] ? "text-white" : "text-white/80 group-hover:text-white transition-colors"}`}>
                        {feat.title}
                      </span>
                      <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        data.features[feat.id] 
                          ? "bg-[#00E5FF] border-[#00E5FF] text-black scale-110 shadow-[0_0_15px_rgba(0,229,255,0.3)]" 
                          : "border-white/20 text-transparent bg-black/50 group-hover:border-white/40"
                      }`}>
                        <Check className={`w-3.5 h-3.5 transition-transform duration-500 ${data.features[feat.id] ? "scale-100" : "scale-50"}`} />
                      </div>
                    </div>
                    
                    <div className="relative z-10 w-full flex items-end justify-between mt-auto">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Add-on</span>
                      <span className={`text-lg font-mono tracking-wider ${data.features[feat.id] ? "text-[#00E5FF]" : "text-neutral-400 group-hover:text-white transition-colors"}`}>
                        +${feat.priceUsd.toLocaleString('en-US')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-12 flex items-center justify-between">
                <button onClick={prevStep} className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <RadialGlowButton onClick={nextStep} className="px-8 flex items-center gap-2">
                  <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white">Review & Continue</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </RadialGlowButton>
              </div>
            </motion.div>
          )}

          {/* STEP 4: LIVE ESTIMATE REVIEW */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">Investment Summary</h2>
                <p className="text-neutral-400 max-w-lg text-sm md:text-base">Review your estimated timeline and investment before submitting.</p>
              </div>
              
              <div className="p-8 md:p-12 rounded-3xl bg-[#050508] border border-white/10 mt-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col md:flex-row gap-12 justify-between items-start md:items-center border-b border-white/10 pb-12 mb-12 relative z-10">
                  <div>
                    <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-bold mb-2">Service Line</p>
                    <h3 className="text-2xl text-white font-bold">{initialServices.find(s => s.id === data.service)?.title}</h3>
                    <p className="text-neutral-400">{initialPackages.find(p => p.id === data.package)?.title} Package</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-bold mb-2">Estimated Investment</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white">${estimatedPrice.toLocaleString('en-US')}</h2>
                    <p className="text-neutral-400 text-sm md:text-base">Timeline: ~{data.timeline}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-bold mb-6">Included Add-ons</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(data.features).filter(([_, v]) => v).map(([k]) => (
                      <li key={k} className="flex items-center gap-3 text-neutral-300">
                        <Check className="w-4 h-4 text-white/50" />
                        {initialFeatures.find(f => f.id === k)?.title}
                      </li>
                    ))}
                    {Object.entries(data.features).filter(([_, v]) => v).length === 0 && (
                      <li className="text-neutral-500 italic">No add-ons selected.</li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <button onClick={prevStep} className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <RadialGlowButton onClick={nextStep} className="px-8 flex items-center gap-2">
                  <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white">Enter Contact Info</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </RadialGlowButton>
              </div>
            </motion.div>
          )}

          {/* STEP 5: CONTACT INFO */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">Let's talk</h2>
                <p className="text-neutral-400 max-w-lg text-sm md:text-base">Leave your details and our lead architect will reach out to schedule a consultation.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      value={data.contact.fullName}
                      onChange={(e) => setData(p => ({...p, contact: {...p.contact, fullName: e.target.value}}))}
                      className="bg-[#050508] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      value={data.contact.email}
                      onChange={(e) => setData(p => ({...p, contact: {...p.contact, email: e.target.value}}))}
                      className="bg-[#050508] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Company (Optional)</label>
                    <input 
                      type="text" 
                      value={data.contact.company}
                      onChange={(e) => setData(p => ({...p, contact: {...p.contact, company: e.target.value}}))}
                      className="bg-[#050508] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      value={data.contact.phone}
                      onChange={(e) => setData(p => ({...p, contact: {...p.contact, phone: e.target.value}}))}
                      className="bg-[#050508] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Project Details (Optional)</label>
                  <textarea 
                    value={data.contact.requirements}
                    onChange={(e) => setData(p => ({...p, contact: {...p.contact, requirements: e.target.value}}))}
                    className="bg-[#050508] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors min-h-[120px] resize-none"
                    placeholder="Tell us a bit more about what you want to achieve..."
                  />
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={prevStep} className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <RadialGlowButton type="submit" className="px-8 flex items-center gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white">Submitting...</span>
                    ) : (
                      <>
                        <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white">Submit Request</span>
                        <Sparkles className="w-4 h-4 text-white" />
                      </>
                    )}
                  </RadialGlowButton>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 6: SUCCESS / CONFIRMATION */}
          {step === 6 && (
            <motion.div 
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20 gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-white/20 blur-[30px] rounded-full" />
                <ShieldCheck className="w-10 h-10 text-white relative z-10" />
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Request Received</h2>
                <p className="text-neutral-400 max-w-md mx-auto mb-8 text-sm md:text-base">
                  Your project requirements have been securely transmitted to our CRM. Our lead architect will review your brief and contact you within 24 hours.
                </p>
                
                <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl bg-[#050508] border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Your Inquiry ID</span>
                  <span className="text-2xl font-mono text-white tracking-wider">{inquiryId}</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
