"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePageTransition } from "@/components/ui/PageTransition";

export function PortfolioSection() {
  const { navigateWithTransition } = usePageTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "200px" });

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full py-24 lg:py-32 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
        >
          Selected Portfolio
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/50 text-base max-w-2xl mx-auto mb-16"
        >
          Explore some of our recent work across web development, AI solutions, and digital marketing. 
          Detailed case studies coming soon.
        </motion.p>
        
        {/* Placeholder for future portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: 1, title: "Velvet Roast", videoUrl: "/videos/project-1.mp4", projectUrl: "https://velvet-roast-alpha.vercel.app/" },
            { id: 2, title: "FORGE — Premium Fitness", videoUrl: "/videos/project-2.mp4", projectUrl: "https://forge-orpin-eight.vercel.app/" },
            { id: 3, title: "Himanshu Store", videoUrl: "/videos/project-3.mp4", projectUrl: "https://himanshu-store-grocery-app.vercel.app/" },
            { id: 4, title: "ÉTHÉR — Immersive Web Experience", videoUrl: "/videos/project-4.mp4", projectUrl: "https://ether-eight-dusky.vercel.app/" }
          ].map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="group relative aspect-video bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center pointer-events-auto overflow-hidden cursor-default"
            >
              {project.videoUrl ? (
                <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
                  <video 
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  >
                    <track kind="captions" />
                    {inView && <source src={project.videoUrl} type="video/mp4" />}
                  </video>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 transition-transform duration-700 group-hover:scale-105" />
              )}
              
              {!project.videoUrl && (
                <div className="relative z-10 flex flex-col items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-neutral-400 font-medium tracking-widest uppercase text-sm">
                    Project Slot {project.id}
                  </span>
                  <span className="text-white/20 text-xs">Video coming soon</span>
                </div>
              )}

              {/* Title overlay */}
              {project.title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 flex items-end group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <h3 className="text-white font-semibold text-xl drop-shadow-lg tracking-tight">
                    {project.title}
                  </h3>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                <a 
                  href={project.projectUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-transform duration-300 hover:scale-105 transform translate-y-4 group-hover:translate-y-0"
                >
                  Open Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex justify-center pointer-events-auto"
        >
          <button
            onClick={() => navigateWithTransition('/portfolio')}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all flex items-center gap-3 backdrop-blur-md cursor-pointer"
          >
            Visit Portfolio
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
