"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { ProjectWizard } from "./ProjectWizard";
import { X } from "lucide-react";

export function WizardModalClient({ 
  initialServices, 
  initialPackages, 
  initialFeatures 
}: { 
  initialServices: any[]; 
  initialPackages: any[]; 
  initialFeatures: any[]; 
}) {
  const { isOpen, closeWizard, initialServiceId, initialPackageId, initialCategory } = useWizard();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const node = scrollRef.current;
    if (!node) return;

    const stopScrollPropagation = (e: Event) => e.stopPropagation();
    
    node.addEventListener('wheel', stopScrollPropagation, { passive: false });
    node.addEventListener('touchmove', stopScrollPropagation, { passive: false });
    
    return () => {
      document.body.style.overflow = "unset";
      if (node) {
        node.removeEventListener('wheel', stopScrollPropagation);
        node.removeEventListener('touchmove', stopScrollPropagation);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeWizard}
          />
          
          {/* Modal Content */}
          <motion.div 
            ref={scrollRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#020203] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl custom-scrollbar"
          >
            <button 
              onClick={closeWizard}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <ProjectWizard 
              initialServices={initialServices} 
              initialPackages={initialPackages} 
              initialFeatures={initialFeatures}
              preSelectedServiceId={initialServiceId}
              preSelectedPackageId={initialPackageId}
              preSelectedCategory={initialCategory}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
