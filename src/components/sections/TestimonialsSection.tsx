"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    company: "NovaSpark AI",
    avatar: "AM",
    avatarColor: "from-violet-600 to-indigo-600",
    stars: 5,
    quote:
      "XENOTECT built our entire AI-powered SaaS platform from scratch in 8 weeks. The quality of the code, the design, and the speed of delivery was unmatched. Our investors were blown away at our demo.",
    tag: "AI Solutions",
  },
  {
    name: "Priya Sharma",
    role: "Head of Marketing",
    company: "GrowthEdge",
    avatar: "PS",
    avatarColor: "from-rose-600 to-pink-600",
    stars: 5,
    quote:
      "Our organic traffic went from 1,200 to 18,000 monthly visitors in just 4 months. The SEO and content strategy XENOTECT executed was surgical. ROI was clear within the first 60 days.",
    tag: "Digital Marketing",
  },
  {
    name: "Marcus Chen",
    role: "CTO",
    company: "TradeLens",
    avatar: "MC",
    avatarColor: "from-emerald-600 to-teal-600",
    stars: 5,
    quote:
      "We needed a complex B2B platform with real-time data, custom dashboards, and integrations with 6 different APIs. XENOTECT delivered it on time, on budget, and it's been rock solid in production.",
    tag: "Web Development",
  },
  {
    name: "Sara El-Masri",
    role: "Founder",
    company: "VoiceFlow Studio",
    avatar: "SE",
    avatarColor: "from-amber-600 to-orange-600",
    stars: 5,
    quote:
      "The voice AI agent XENOTECT built for our customer support saved us 40+ hours of manual work per week. It's now handling 70% of our inbound queries with 95% accuracy. Absolutely game changing.",
    tag: "Voice AI",
  },
  {
    name: "Rohan Kapoor",
    role: "Director of Growth",
    company: "PureScale",
    avatar: "RK",
    avatarColor: "from-blue-600 to-cyan-600",
    stars: 5,
    quote:
      "From discovery call to launch in 3 weeks. They redesigned our entire website, improved our Lighthouse score from 54 to 98, and the new site converts 2.3x better. Outstanding work.",
    tag: "Web Development",
  },
  {
    name: "Nadia Torres",
    role: "Operations Manager",
    company: "Finterra",
    avatar: "NT",
    avatarColor: "from-purple-600 to-violet-600",
    stars: 5,
    quote:
      "XENOTECT automated our entire client onboarding process with n8n. What took our team 3 hours now happens in 12 minutes, zero errors. The ROI paid for the project in the first month.",
    tag: "AI Automation",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Client testimonials"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold bg-white/5 border border-white/10 text-neutral-400 mb-6">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            Client Results
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter mb-5">
            Trusted by founders<br />
            <span className="text-neutral-400">& scaling teams worldwide.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Real results from real clients. No cherry-picked metrics — just honest outcomes.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 shadow-[0_4px_32px_rgba(0,0,0,0.3)]"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-7 flex flex-col gap-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[calc(2rem-6px)]" />

                {/* Top row: avatar + name + stars */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-xs font-black text-white shadow-lg flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">{t.name}</p>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-[0.12em] font-medium">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <StarRating count={t.stars} />
                </div>

                {/* Quote */}
                <blockquote className="relative z-10 flex-1">
                  <p className="text-sm text-white/60 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Tag */}
                <div className="relative z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] bg-white/5 border border-white/10 text-neutral-400">
                    {t.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-neutral-500 text-sm">
            Join <span className="text-white font-semibold">120+ clients</span> who have grown their business with XENOTECT.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
