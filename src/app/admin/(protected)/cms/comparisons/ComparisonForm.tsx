"use client";

import React, { useState, useEffect } from "react";
import { createCmsComparisonFeature, updateCmsComparisonFeature, deleteCmsComparisonFeature } from "@/app/actions/cms";
import { useRouter } from "next/navigation";
import { X, Save, Edit2, Trash2 } from "lucide-react";
import { animate } from "animejs";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

export function ComparisonForm({ feature, serviceId }: { feature: any, serviceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: feature?.name || "",
    starter: feature?.starter || "—",
    business: feature?.business || "✓",
    enterprise: feature?.enterprise || "✓",
    order: feature?.order || 0
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const lenis = useLenis();
  
  const isEdit = !!feature;

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
      await updateCmsComparisonFeature(feature.id, formData);
    } else {
      await createCmsComparisonFeature({
        serviceId,
        ...formData
      });
    }
    setSaving(false);
    setIsOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this feature?")) {
      setDeleting(true);
      await deleteCmsComparisonFeature(feature.id);
      setDeleting(false);
      setIsOpen(false);
      router.refresh();
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
          {isEdit ? "Edit Feature" : "Add Feature"}
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="modal-overlay absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal} />
          
          <div className="modal-content relative w-full max-w-xl p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2.5rem-6px)] bg-[#0A0A0F] border border-white/5 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative flex flex-col max-h-[90vh]">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 relative z-10 shrink-0">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">{isEdit ? "Edit Feature" : "New Feature"}</h2>
                  <p className="text-neutral-400 text-sm">{isEdit ? `Update row details for ${feature.name}` : "Configure new comparison row"}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto relative z-10 flex-1 custom-scrollbar min-h-0" data-lenis-prevent="true">
                <form id="comparison-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Feature Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Starter Package</label>
                      <input 
                        type="text" 
                        required
                        value={formData.starter}
                        onChange={e => setFormData({...formData, starter: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Business Package</label>
                      <input 
                        type="text" 
                        required
                        value={formData.business}
                        onChange={e => setFormData({...formData, business: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Enterprise Package</label>
                      <input 
                        type="text" 
                        required
                        value={formData.enterprise}
                        onChange={e => setFormData({...formData, enterprise: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Order (Position)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.order}
                      onChange={e => setFormData({...formData, order: Number(e.target.value)})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                </form>
              </div>

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
                    form="comparison-form"
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
