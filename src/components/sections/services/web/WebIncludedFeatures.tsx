"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Server, Globe, Lock, LifeBuoy, Wrench, CloudUpload, Mail, GraduationCap, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  { icon: <Server />, title: "Premium Hosting", desc: "Vercel Enterprise or AWS infrastructure included for year one." },
  { icon: <Globe />, title: "Domain Management", desc: "Configuration, DNS management, and renewal handling." },
  { icon: <Lock />, title: "SSL & Security", desc: "Enterprise-grade encryption and DDoS protection." },
  { icon: <LifeBuoy />, title: "24/7 Support", desc: "Direct Slack channel with our engineering team." },
  { icon: <Wrench />, title: "Maintenance", desc: "Monthly dependency updates and performance audits." },
  { icon: <CloudUpload />, title: "CI/CD Deployment", desc: "Automated testing and zero-downtime deployments." },
  { icon: <Mail />, title: "Custom Emails", desc: "Google Workspace setup and migration." },
  { icon: <GraduationCap />, title: "Team Training", desc: "Comprehensive documentation and handover sessions." }
];

export function WebIncludedFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.included-card', 
      { opacity: 0, y: 30 },
      { 
        scrollTrigger: {
          trigger: ".included-grid",
          start: "top 80%",
        },
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-white/70">
            The Complete Package
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Everything you need. <br className="hidden md:block" /> Nothing you don't.
          </h2>
        </div>

        <div className="included-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <div key={i} className="included-card p-8 rounded-3xl bg-[#0A0A0B] border border-white/10 flex flex-col gap-4 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 mb-2">
                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
