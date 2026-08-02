"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { serviceConfig } from "@/config/services";

export function ServiceComparison({ features = [] }: { features: any[] }) {

  return (
    <section className="relative w-full py-24 bg-transparent overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10 text-white/60 mb-6 backdrop-blur-md bg-white/5"
          >
            Feature Matrix
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
          >
            Compare Packages
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2rem] p-2 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl"
        >
          <div className="rounded-[calc(2rem-0.5rem)] border border-white/[0.05] bg-[#050505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="py-8 px-8 text-xs uppercase tracking-widest font-medium text-white/40 w-1/4">Features</th>
                    <th className="py-8 px-8 text-xs uppercase tracking-widest font-medium text-white/80 w-1/4">Starter</th>
                    <th className="py-8 px-8 text-xs uppercase tracking-widest font-medium text-white/80 w-1/4">Business</th>
                    <th className="py-8 px-8 text-xs uppercase tracking-widest font-medium text-white/80 w-1/4">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 relative">
                  {features.map((item, index) => (
                    <motion.tr 
                      key={item.id || index} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="transition-colors duration-500 hover:bg-white/[0.03] group relative"
                    >
                      <td className="py-6 px-8 text-sm font-medium text-white/70 group-hover:text-white transition-colors">{item.name}</td>
                      <td className="py-6 px-8 text-sm text-white/90">
                        {item.starter === "✓" || item.starter === "✅" ? <Check className="w-4 h-4 text-emerald-400" /> : item.starter === "—" || item.starter === "❌" ? <Minus className="w-4 h-4 text-white/20" /> : <span className="text-white/80 font-medium">{item.starter}</span>}
                      </td>
                      <td className="py-6 px-8 text-sm text-white/90">
                        {item.business === "✓" || item.business === "✅" ? <Check className="w-4 h-4 text-emerald-400" /> : item.business === "—" || item.business === "❌" ? <Minus className="w-4 h-4 text-white/20" /> : <span className="text-white/80 font-medium">{item.business}</span>}
                      </td>
                      <td className="py-6 px-8 text-sm text-white/90">
                        {item.enterprise === "✓" || item.enterprise === "✅" ? <Check className="w-4 h-4 text-emerald-400" /> : item.enterprise === "—" || item.enterprise === "❌" ? <Minus className="w-4 h-4 text-white/20" /> : <span className="text-white/80 font-medium">{item.enterprise}</span>}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
