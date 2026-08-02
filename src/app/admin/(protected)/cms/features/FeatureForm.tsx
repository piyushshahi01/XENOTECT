"use client";

import React, { useState, useEffect } from "react";
import { createCmsFeature, updateCmsFeature, deleteCmsFeature } from "@/app/actions/cms";
import { useRouter } from "next/navigation";
import { X, Save, Edit2, Trash2 } from "lucide-react";
import { animate } from "animejs";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

export function FeatureForm({ feat, onSuccess }: { feat: any, onSuccess?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: feat?.title || "",
    priceUsd: feat?.priceUsd || "",
    priceInr: feat?.priceInr || "",
    category: feat?.category || "web",
    stepGroup: feat?.stepGroup || "Add-on Features",
    isMultiplier: feat?.isMultiplier || false,
    multiplier: feat?.multiplier || 1.0,
    order: feat?.order || 0
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const lenis = useLenis();
  
  const isEdit = !!feat;

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      animate('.modal-overlay', {
        opacity: [0, 1],
        duration: 400,
        ease: 'outExpo'
      });
      animate('.modal-content', {
        opacity: [0, 1],
        scale: [0.95, 1],
        y: [20, 0],
        duration: 600,
        ease: 'outExpo',
        delay: 100
      });
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = 'auto';
    }
    return () => { 
      if (lenis) lenis.start();
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen, lenis]);

  const closeModal = () => {
    animate('.modal-overlay, .modal-content', {
      opacity: 0,
      scale: 0.95,
      duration: 300,
      ease: 'inExpo',
      onComplete: () => setIsOpen(false)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (isEdit) {
      await updateCmsFeature(feat.id, {
        title: formData.title,
        priceUsd: Number(formData.priceUsd),
        priceInr: Number(formData.priceInr),
        category: formData.category,
        stepGroup: formData.stepGroup,
        isMultiplier: formData.isMultiplier,
        multiplier: Number(formData.multiplier),
        order: feat?.order || 0
      });
    } else {
      await createCmsFeature({
        id: feat?.id || `feat-${Date.now()}`,
        title: formData.title,
        priceUsd: Number(formData.priceUsd),
        priceInr: Number(formData.priceInr),
        category: formData.category,
        stepGroup: formData.stepGroup,
        isMultiplier: formData.isMultiplier,
        multiplier: Number(formData.multiplier),
        order: 0
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
    if (confirm("Are you sure you want to delete this feature?")) {
      setDeleting(true);
      await deleteCmsFeature(feat.id);
      setDeleting(false);
      setIsOpen(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.98] flex items-center gap-2 ${
          isEdit 
            ? "px-5 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
            : "px-6 py-3 bg-white text-black hover:bg-neutral-200"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2 text-sm">
          {isEdit ? <Edit2 className="w-3.5 h-3.5" /> : <Save className="w-4 h-4" />} 
          {isEdit ? "Edit Add-on" : "Add Add-on"}
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="modal-overlay absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal} />
          
          <div className="modal-content relative w-full max-w-3xl p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2.5rem-6px)] bg-[#0A0A0F] border border-white/5 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative flex flex-col max-h-[90vh]">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 relative z-10 shrink-0">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">Edit Feature</h2>
                  <p className="text-neutral-400 text-sm">Configure feature details</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto relative z-10 flex-1 custom-scrollbar min-h-0" data-lenis-prevent="true">
                <form id="feature-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Feature Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Service Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] appearance-none"
                    >
                      <option value="web">Web Services</option>
                      <option value="ai">AI Solutions</option>
                      <option value="growth">Growth & Marketing</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Step Group (Estimator Section)</label>
                    <input 
                      type="text" 
                      required
                      list="stepGroupOptions"
                      value={formData.stepGroup}
                      onChange={e => setFormData({...formData, stepGroup: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                    <datalist id="stepGroupOptions">
                      <option value="Add-on Features" />
                      <option value="Website Type" />
                      <option value="Page Range" />
                      <option value="Design Style" />
                      <option value="Domain" />
                      <option value="Maintenance" />
                      <option value="Core AI Solution" />
                      <option value="AI Model" />
                      <option value="Integrations" />
                      <option value="Knowledge Base" />
                      <option value="Languages" />
                      <option value="Expected Users" />
                      <option value="Ongoing Support" />
                      <option value="Core Growth Service" />
                      <option value="Business Type" />
                      <option value="Marketing Channels" />
                      <option value="Social Media Platforms" />
                      <option value="Content Needed" />
                      <option value="Reporting" />
                    </datalist>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3 h-full">
                      <input 
                        type="checkbox" 
                        id="isMultiplier"
                        checked={formData.isMultiplier}
                        onChange={e => setFormData({...formData, isMultiplier: e.target.checked})}
                        className="w-5 h-5 rounded bg-[#050508] border border-white/20 text-emerald-500 focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="isMultiplier" className="text-sm font-bold text-white tracking-tight">Is Multiplier?</label>
                      <p className="text-xs text-neutral-500">Instead of adding a flat fee, multiplies the total.</p>
                    </div>
                    <div className={`flex flex-col gap-2.5 ${!formData.isMultiplier && "opacity-30 pointer-events-none"}`}>
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Multiplier Value</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={formData.multiplier}
                        onChange={e => setFormData({...formData, multiplier: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>



                </form>
              </div>

              <div className="p-6 md:p-8 border-t border-white/5 flex justify-between gap-4 shrink-0 bg-[#0A0A0F]/50 backdrop-blur-sm relative z-10">
                {isEdit ? (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting || saving}
                    className="px-6 py-3 rounded-full text-rose-400 font-medium hover:text-rose-300 hover:bg-rose-400/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {deleting ? (
                      <div className="w-4 h-4 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
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
                    form="feature-form"
                    type="submit" 
                    disabled={saving || deleting}
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
