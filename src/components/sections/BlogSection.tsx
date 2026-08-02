"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function BlogSection({ posts }: { posts: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="blog" className="relative w-full py-24 lg:py-32 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Latest Insights
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/50 text-base max-w-xl"
            >
              Thoughts on software engineering, AI automation, and digital strategy.
            </motion.p>
          </div>
          
          <motion.a
            href="/blog"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium pointer-events-auto"
          >
            View all posts <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a 
              href={`/blog/${post.slug}`}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
              className="group glass-card-shimmer p-6 rounded-3xl bg-white/[0.02] flex flex-col gap-6 pointer-events-auto"
            >
              <div className="aspect-video rounded-xl flex items-center justify-center overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${['rgba(0,200,83,0.15)', 'rgba(0,122,255,0.15)', 'rgba(124,77,255,0.15)'][i]} 0%, rgba(255,255,255,0.03) 100%)` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2 block">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
