"use client";

import React, { useState, useEffect, useRef } from "react";
import { createCmsPackage, updateCmsPackage, deleteCmsPackage } from "@/app/actions/cms";
import { useRouter } from "next/navigation";
import { X, Save, Edit2, Plus, Trash2 } from "lucide-react";
import { animate } from "animejs";
import { createPortal } from "react-dom";

// Helper: find the global Lenis instance and stop/start it
function getLenisInstance(): any {
  if (typeof window === "undefined") return null;
  // Lenis stores itself on the html element's __lenis property
  const html = document.documentElement as any;
  return html.__lenis || (window as any).__lenis || null;
}

export function PackageForm({ pkg, services, allFeatures, onSuccess }: { pkg?: any, services: any[], allFeatures: any[], onSuccess?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: pkg?.title || "",
    priceUsd: pkg?.priceUsd || "",
    priceInr: pkg?.priceInr || "",
    time: pkg?.time || "",
    detailedContent: pkg?.detailedContent || "",
    order: pkg?.order || 0,
    serviceId: pkg?.serviceId || "",
    category: pkg?.category || "default"
  });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(pkg?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isEdit = !!pkg;

  // Sync serviceId once services are loaded
  useEffect(() => {
    if (!isEdit && !formData.serviceId && services.length > 0) {
      setFormData(prev => ({ ...prev, serviceId: services[0].id }));
    }
  }, [services, isEdit, formData.serviceId]);

  useEffect(() => {
    if (isOpen) {
      // Stop Lenis smooth scroll
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.stop();
      } else {
        // Lenis may not be available yet; retry after a tick
        const timer = setTimeout(() => {
          const l = getLenisInstance();
          if (l) l.stop();
        }, 100);
        return () => clearTimeout(timer);
      }
      document.body.style.overflow = 'hidden';
      
      // Entry animation
      requestAnimationFrame(() => {
        animate('.pkg-modal-overlay', {
          opacity: [0, 1],
          duration: 400,
          ease: 'outExpo'
        });
        animate('.pkg-modal-content', {
          opacity: [0, 1],
          scale: [0.95, 1],
          y: [20, 0],
          duration: 600,
          ease: 'outExpo',
          delay: 100
        });
      });
    } else {
      const lenis = getLenisInstance();
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
    return () => { 
      const lenis = getLenisInstance();
      if (lenis) lenis.start();
      document.body.style.overflow = ''; 
    };
  }, [isOpen]);

  // Native capture-phase wheel blocker to prevent Lenis from intercepting scroll inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: WheelEvent) => {
      // If our scrollable ref exists and the event target is inside it, let it scroll naturally
      // Otherwise block the event from reaching Lenis
      const scrollEl = scrollRef.current;
      if (scrollEl && scrollEl.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };
    // Capture phase so we get it before Lenis does
    window.addEventListener('wheel', handler, { capture: true, passive: false });
    return () => window.removeEventListener('wheel', handler, { capture: true });
  }, [isOpen]);

  const closeModal = () => {
    const lenis = getLenisInstance();
    animate('.pkg-modal-overlay, .pkg-modal-content', {
      opacity: 0,
      scale: 0.95,
      duration: 300,
      ease: 'inExpo',
      onComplete: () => {
        setIsOpen(false);
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (isEdit) {
      await updateCmsPackage(pkg.id, {
        title: formData.title,
        priceUsd: Number(formData.priceUsd),
        priceInr: Number(formData.priceInr),
        time: formData.time,
        features: selectedFeatures,
        detailedContent: formData.detailedContent,
        order: Number(formData.order),
        category: formData.category
      });
    } else {
      await createCmsPackage({
        id: pkg?.id || `pkg-${Date.now()}`,
        serviceId: formData.serviceId || services[0]?.id,
        title: formData.title,
        priceUsd: Number(formData.priceUsd),
        priceInr: Number(formData.priceInr),
        time: formData.time,
        features: selectedFeatures,
        detailedContent: formData.detailedContent,
        order: 0,
        category: formData.category
      });
    }
    setSaving(false);
    setIsOpen(false);
    if (onSuccess) {
      onSuccess();
    } else {
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this package?")) {
      setDeleting(true);
      await deleteCmsPackage(pkg.id);
      setDeleting(false);
      setIsOpen(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    }
  };

  const addFeature = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (newFeature.trim()) {
      const newFeaturesList = newFeature
        .split(/[\n,]/)
        .map(f => f.trim())
        .filter(f => f && !selectedFeatures.includes(f));
        
      if (newFeaturesList.length > 0) {
        setSelectedFeatures([...selectedFeatures, ...newFeaturesList]);
      }
      setNewFeature("");
    }
  };

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.98] ${
          isEdit 
            ? "px-5 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
            : "px-6 py-3 bg-white text-black hover:bg-neutral-200"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isEdit ? <Edit2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Edit Package" : "Add Package"}
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div className="pkg-modal-overlay absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal} />
          
          <div className="pkg-modal-content relative w-full max-w-3xl p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2.5rem-6px)] bg-[#0A0A0F] border border-white/5 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative flex flex-col max-h-[90vh]">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              {/* Header - fixed at top */}
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 relative z-10 shrink-0">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">{isEdit ? "Edit Package" : "New Package"}</h2>
                  <p className="text-neutral-400 text-sm">Configure pricing package details</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div 
                ref={scrollRef}
                className="p-6 md:p-8 relative z-10 flex-1 min-h-0"
                style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}
              >
                <form id="package-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Service</label>
                    <select 
                      value={formData.serviceId}
                      onChange={e => setFormData({...formData, serviceId: e.target.value})}
                      disabled={isEdit}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] appearance-none disabled:opacity-50"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Package Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Table Category (e.g. Chatbots, Voice Agents)</label>
                    <input 
                      type="text" 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Price ($)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <input 
                          type="number" 
                          required
                          value={formData.priceUsd}
                          onChange={e => setFormData({...formData, priceUsd: e.target.value})}
                          className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Price (₹)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                        <input 
                          type="number" 
                          required
                          value={formData.priceInr}
                          onChange={e => setFormData({...formData, priceInr: e.target.value})}
                          className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Timeline Estimate</label>
                      <input 
                        type="text" 
                        required
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        placeholder="e.g. 2-4 Weeks"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Detailed Explanations (Markdown)</label>
                    <textarea 
                      value={formData.detailedContent}
                      onChange={e => setFormData({...formData, detailedContent: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] min-h-[120px] font-mono text-sm"
                      placeholder="Use markdown to write premium detailed copy for the package popup..."
                    />
                  </div>

                  {/* ===== FEATURES SECTION ===== */}
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Included Features</label>
                    
                    {/* Available features filtered by selected service */}
                    {(() => {
                      // Map serviceId to feature category (e.g. "web" service → "web" category)
                      const serviceCategory = formData.serviceId || pkg?.serviceId || "";
                      const filteredFeatures = allFeatures.filter(f => f.category === serviceCategory);
                      
                      return filteredFeatures.length > 0 ? (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                          {filteredFeatures.map((feat: any) => {
                            const isSelected = selectedFeatures.includes(feat.title);
                            return (
                              <button
                                key={feat.id}
                                type="button"
                                onClick={() => toggleFeature(feat.title)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                  isSelected 
                                    ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30" 
                                    : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                {feat.title}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-neutral-500 text-sm text-center">
                          {serviceCategory ? `No add-on features found for this service. Add them in the Features tab.` : `Select a service first.`}
                        </div>
                      );
                    })()}

                    {/* Selected features list */}
                    {selectedFeatures.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400/60">Selected ({selectedFeatures.length})</p>
                        {selectedFeatures.map((feat: string, i: number) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#050508] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group">
                            <span className="text-sm text-neutral-300">{feat}</span>
                            <button 
                              type="button"
                              onClick={() => toggleFeature(feat)}
                              className="text-neutral-500 hover:text-rose-400 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Custom Feature */}
                    <div className="flex gap-2 items-start">
                      <textarea 
                        value={newFeature}
                        onChange={e => setNewFeature(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                        placeholder="Add custom feature(s)... you can paste a list separated by commas or newlines!"
                        className="flex-1 bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] min-h-[50px] resize-y"
                        rows={1}
                      />
                      <button 
                        type="button"
                        onClick={addFeature}
                        disabled={!newFeature.trim()}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </form>
              </div>

              {/* Footer - fixed at bottom */}
              <div className="p-6 md:p-8 border-t border-white/5 flex justify-between gap-4 shrink-0 bg-[#0A0A0F]/50 backdrop-blur-sm relative z-10">
                {isEdit ? (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-6 py-3 rounded-full text-red-500 font-medium hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                ) : <div />}

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 rounded-full text-neutral-400 font-medium hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    form="package-form"
                    type="submit" 
                    disabled={saving}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2 active:scale-95"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}

