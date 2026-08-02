"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const processSteps = [
  {
    title: "Discovery & Architecture",
    description: "We don't just ask for colors. We map your entire business logic, user flow, and API requirements to architect a scalable foundation.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "text-blue-400"
  },
  {
    title: "UI/UX & Prototyping",
    description: "High-fidelity Figma mockups, wireframes, and interactive prototypes. We iterate until the visual language establishes absolute authority.",
    icon: <PenTool className="w-8 h-8" />,
    color: "text-purple-400"
  },
  {
    title: "Full-Stack Engineering",
    description: "React, Next.js, Node, and custom databases. We write clean, decoupled, highly performant code that scales to millions of requests.",
    icon: <Code2 className="w-8 h-8" />,
    color: "text-emerald-400"
  },
  {
    title: "QA & Deployment",
    description: "Rigorous testing, edge-network deployment, and CI/CD pipelines. We ensure a flawless launch with zero downtime.",
    icon: <Rocket className="w-8 h-8" />,
    color: "text-rose-400"
  }
];

export function WebProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the left side while the right side scrolls
    ScrollTrigger.create({
      trigger: ".process-container",
      start: "top 20%",
      end: "bottom 80%",
      pin: ".process-header",
      pinSpacing: false,
    });

    const steps = gsap.utils.toArray('.process-step');
    
    steps.forEach((step: any, i) => {
      gsap.fromTo(step,
        { opacity: 0.2, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: "top center+=100",
            end: "top center-=100",
            scrub: true,
            toggleClass: "active-step"
          }
        }
      );
    });

    // Animate the connecting line
    gsap.fromTo(".progress-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-list",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-transparent overflow-hidden">
      <div className="process-container max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-20 relative">
        
        {/* Left Side (Pinned) */}
        <div className="process-header lg:w-1/3 flex flex-col gap-6">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-white/70 w-fit">
            Development Process
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
            How we build <br /> the future.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-sm mt-4">
            A precise, battle-tested methodology for constructing enterprise-grade digital experiences from concept to deployment.
          </p>
        </div>

        {/* Right Side (Scrolling Steps) */}
        <div className="process-list lg:w-2/3 relative flex flex-col gap-32 pt-20 pb-32">
          
          {/* Vertical Line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-white/5" />
          <div className="progress-line absolute left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500 origin-top" />

          {processSteps.map((step, i) => (
            <div key={i} className="process-step relative flex gap-12 group">
              
              {/* Icon / Node */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#0A0A0B] border border-white/10 flex items-center justify-center shrink-0 shadow-xl transition-colors duration-500 group-[.active-step]:border-white/30 group-[.active-step]:bg-white/5">
                <div className={`${step.color} transition-transform duration-500 group-[.active-step]:scale-110`}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 pt-2">
                <span className="text-sm font-mono text-white/30 tracking-widest uppercase">Phase 0{i + 1}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{step.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
