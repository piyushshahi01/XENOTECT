"use client";

import React, { useState, useEffect } from "react";
import { createCmsComparisonFeature } from "@/app/actions/cms";
import { useRouter } from "next/navigation";
import { X, Save, Import } from "lucide-react";
import { animate } from "animejs";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

export function BulkImportModal({ serviceId }: { serviceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const lenis = useLenis();

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

  const handleImport = async () => {
    if (!markdownText.trim()) return;
    setSaving(true);
    
    // Parse Markdown Table
    const lines = markdownText.split('\n');
    let order = 0;
    
    for (const line of lines) {
      // Ignore lines that don't look like a markdown table row
      if (!line.includes('|')) continue;
      
      const cols = line.split('|').map(c => c.trim());
      // A valid row would split into ["", "Feature", "Starter", "Business", "Enterprise", ""]
      // Filter out empty strings from the ends
      const cleanCols = cols.filter((_, i) => i !== 0 && i !== cols.length - 1);
      
      if (cleanCols.length >= 4) {
        const featureName = cleanCols[0];
        
        // Skip header and separator lines
        if (featureName.toLowerCase().includes('feature') || featureName.includes('---')) continue;
        
        await createCmsComparisonFeature({
          serviceId,
          name: featureName,
          starter: cleanCols[1],
          business: cleanCols[2],
          enterprise: cleanCols[3],
          order: order++
        });
      }
    }

    setSaving(false);
    setMarkdownText("");
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.98] flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
      >
        <span className="relative z-10 flex items-center gap-2 text-sm">
          <Import className="w-4 h-4" />
          Bulk Import Table
        </span>
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="modal-overlay absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="modal-content relative w-full max-w-3xl bg-[#0a0a0f] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 shrink-0 bg-white/[0.01]">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Bulk Import (Markdown)</h3>
                <p className="text-sm text-neutral-400">Paste a markdown table to instantly create comparison rows.</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Markdown Table</label>
                <textarea 
                  value={markdownText}
                  onChange={e => setMarkdownText(e.target.value)}
                  className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] min-h-[300px] font-mono text-sm"
                  placeholder={`| Feature | Starter | Business | Enterprise |\n|---|---|---|---|\n| Responsive Design | ✅ | ✅ | ✅ |\n| Pages | 1 | 5 | Unlimited |`}
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.01] flex justify-end gap-3 shrink-0">
              <button 
                type="button"
                onClick={closeModal}
                className="px-6 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 text-white transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button 
                onClick={handleImport}
                disabled={saving || !markdownText.trim()}
                className="px-6 py-3 rounded-full font-medium bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Importing..." : "Run Import"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
