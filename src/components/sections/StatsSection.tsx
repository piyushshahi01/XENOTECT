"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered", description: "Across web, AI & marketing", accentClass: "stat-accent-green", glowColor: "rgba(0, 200, 83, 0.06)" },
  { value: 98,  suffix: "%", label: "Client Retention",   description: "Clients who come back for more", accentClass: "stat-accent-blue", glowColor: "rgba(0, 122, 255, 0.06)" },
  { value: 3.2, suffix: "M+", label: "Revenue Generated",  description: "For our clients combined", prefix: "$", accentClass: "stat-accent-gold", glowColor: "rgba(255, 193, 7, 0.06)" },
  { value: 15,  suffix: "+", label: "Countries Served",   description: "Global reach, local expertise", accentClass: "stat-accent-purple", glowColor: "rgba(124, 77, 255, 0.06)" },
];

function CountUp({ to, prefix = "", suffix = "", decimals = 0 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16; // ~60fps
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Company statistics"
      className="relative w-full py-20 overflow-hidden"
    >
      {/* Subtle divider glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        <div className="gradient-border-animated rounded-3xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] pointer-events-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`stat-cell group relative flex flex-col items-center justify-center text-center p-8 md:p-12 bg-[#050505] transition-all duration-500 ${stat.accentClass}`}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/[0.02] rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Hover glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${stat.glowColor} 0%, transparent 70%)`,
                }}
              />

              <div className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tighter tabular-nums mb-3 relative z-10">
                <CountUp
                  to={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <p className="text-sm md:text-base font-bold text-white/80 tracking-tight mb-1.5 relative z-10">{stat.label}</p>
              <p className="text-[11px] text-white/35 uppercase tracking-[0.12em] font-medium relative z-10">{stat.description}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
