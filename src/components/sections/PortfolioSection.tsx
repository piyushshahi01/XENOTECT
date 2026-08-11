"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePageTransition } from "@/components/ui/PageTransition";
import Link from "next/link";

const projects = [
  { 
    id: 1, 
    title: "Velvet Roast", 
    category: "Restaurant Website Development", 
    industry: "Food & Beverage", 
    focus: "Responsive experience, performance and conversion", 
    tech: "React, Next.js, Tailwind", 
    videoUrl: "/videos/project-1.mp4", 
    projectUrl: "https://velvet-roast-alpha.vercel.app/" 
  },
  { 
    id: 2, 
    title: "FORGE", 
    category: "Fitness Website Development", 
    industry: "Health & Wellness", 
    focus: "Membership funnels and dynamic rendering", 
    tech: "Next.js, GSAP, Prisma", 
    videoUrl: "/videos/project-2.mp4", 
    projectUrl: "https://forge-orpin-eight.vercel.app/" 
  },
  { 
    id: 3, 
    title: "Himanshu Store", 
    category: "E-Commerce Website Development", 
    industry: "Retail & Grocery", 
    focus: "High-speed catalog browsing and secure checkout", 
    tech: "Node.js, React, Supabase", 
    videoUrl: "/videos/project-3.mp4", 
    projectUrl: "https://himanshu-store-grocery-app.vercel.app/" 
  },
  { 
    id: 4, 
    title: "ÉTHÉR", 
    category: "Immersive Web Experience", 
    industry: "Luxury & Fashion", 
    focus: "WebGL 3D interactions and storytelling", 
    tech: "Three.js, Next.js, Framer Motion", 
    videoUrl: "/videos/project-4.mp4", 
    projectUrl: "https://ether-eight-dusky.vercel.app/" 
  }
];

export function PortfolioSection() {
  const { navigateWithTransition } = usePageTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "200px" });

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full py-24 lg:py-32 overflow-hidden bg-[#050505]">
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Selected Website Development Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto mb-16 font-light leading-relaxed"
        >
          Explore some of our recent custom website development and digital product engineering work.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pointer-events-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="group flex flex-col bg-[#09090B] border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                {project.videoUrl ? (
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
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 transition-transform duration-700 group-hover:scale-105" />
                )}
                
                {/* Hover overlay for button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                  <a 
                    href={project.projectUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-transform duration-300 hover:scale-105 transform translate-y-4 group-hover:translate-y-0"
                  >
                    View Case Study
                  </a>
                </div>
              </div>

              {/* Semantic SEO Content Layer */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-1">{project.title} — {project.category}</h3>
                
                <div className="w-full h-px bg-white/10 my-4" />
                
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong className="text-white/80 font-medium">Industry:</strong> <span className="text-neutral-400">{project.industry}</span>
                  </p>
                  <p className="text-sm">
                    <strong className="text-white/80 font-medium">Focus:</strong> <span className="text-neutral-400">{project.focus}</span>
                  </p>
                  <p className="text-sm">
                    <strong className="text-white/80 font-medium">Technology:</strong> <span className="text-neutral-400">{project.tech}</span>
                  </p>
                </div>
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
            Visit Full Portfolio
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
