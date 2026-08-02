"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { serviceConfig } from "@/config/services";

export function ServiceFAQ({ service }: { service: "web" | "ai" | "growth" }) {
  const { faqs } = serviceConfig[service];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl lg:text-5xl text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border border-white/10 rounded-2xl overflow-hidden transition-colors ${
                openIndex === i ? "bg-white/[0.04]" : "bg-white/[0.01] hover:bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg text-white font-medium pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0 text-white/50"
                >
                  {openIndex === i ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-white/60 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
