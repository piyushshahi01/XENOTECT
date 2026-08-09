"use client";
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Laptop, ShoppingCart, Wallet, HeartPulse, Hexagon, Building2, MonitorPlay, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const industriesCol1 = [
  {
    name: "SaaS & Tech",
    desc: "Scalable architectures for fast-growing platforms.",
    icon: <Laptop className="w-6 h-6 text-[#00C853]" />
  },
  {
    name: "FinTech",
    desc: "Secure, compliant, and high-performance financial apps.",
    icon: <Wallet className="w-6 h-6 text-[#00C853]" />
  },
  {
    name: "Web3 & Crypto",
    desc: "Decentralized applications and smart contract interfaces.",
    icon: <Hexagon className="w-6 h-6 text-[#00C853]" />
  },
  {
    name: "Entertainment",
    desc: "Immersive media streaming and community platforms.",
    icon: <MonitorPlay className="w-6 h-6 text-[#00C853]" />
  }
];

const industriesCol2 = [
  {
    name: "E-Commerce",
    desc: "High-conversion storefronts and custom cart solutions.",
    icon: <ShoppingCart className="w-6 h-6 text-[#00C853]" />
  },
  {
    name: "Healthcare",
    desc: "HIPAA-compliant telehealth and patient portals.",
    icon: <HeartPulse className="w-6 h-6 text-[#00C853]" />
  },
  {
    name: "Real Estate",
    desc: "Property management and virtual tour integrations.",
    icon: <Building2 className="w-6 h-6 text-[#00C853]" />
  }
];

export function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    // Staggered card reveals
    gsap.fromTo(".ind-card",
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      }
    );

    // Right-side text reveal
    gsap.fromTo(".ind-text-reveal",
      { opacity: 0, y: 24, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0, 200, 83, 0.02) 30%, rgba(0, 122, 255, 0.02) 70%, transparent 100%)' }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* LEFT: Staggered Cards */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-end gap-4 sm:gap-6 md:gap-8 z-10">
          
          {/* Background vertical text */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[clamp(6rem,10vw,12rem)] font-display font-black text-transparent select-none pointer-events-none z-0 tracking-tighter" 
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.02)" }}
          >
            INDUSTRIES
          </div>

          {/* Column 1 */}
          <div className="ind-col-1 flex flex-col gap-4 sm:gap-6 md:gap-8 w-1/2 max-w-[280px] z-10">
            {industriesCol1.map((ind, i) => (
              <div key={i} className="ind-card glass-card-shimmer relative rounded-[2rem] p-1.5 bg-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] group pointer-events-auto">
                <div className="relative z-10 flex flex-col w-full h-full rounded-[calc(2rem-0.375rem)] surface-elevated p-6 md:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-6 relative self-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <div className="absolute inset-0 bg-[#00C853]/20 blur-md rounded-full" />
                    <div className="relative z-10">{ind.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-3">{ind.name}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="ind-col-2 flex flex-col gap-4 sm:gap-6 md:gap-8 w-1/2 max-w-[280px] z-10 mt-16 sm:mt-24">
            {industriesCol2.map((ind, i) => (
              <div key={i} className="ind-card glass-card-shimmer relative rounded-[2rem] p-1.5 bg-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] group pointer-events-auto">
                <div className="relative z-10 flex flex-col w-full h-full rounded-[calc(2rem-0.375rem)] surface-elevated p-6 md:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-6 relative self-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <div className="absolute inset-0 bg-[#00C853]/20 blur-md rounded-full" />
                    <div className="relative z-10">{ind.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-3">{ind.name}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT: Sticky Content */}
        <div className="lg:col-span-5 relative z-20">
          <div className="lg:sticky lg:top-1/3 flex flex-col items-start mt-12 lg:mt-0">
            <h2 className="ind-text-reveal font-display font-black tracking-tighter leading-[1.1] text-white text-[clamp(2.5rem,4vw,4rem)] mb-6 relative">
              Industries <br />
              We Serve
              {/* Subtle underline/swoosh effect */}
              <div className="absolute -bottom-2 left-0 w-32 h-2 bg-[#00C853] rounded-full blur-[4px] opacity-50 rotate-[-2deg]" />
            </h2>
            
            <p className="ind-text-reveal text-white/60 text-lg font-light leading-relaxed max-w-md mb-8">
              We have partnered with leading companies across multiple verticals, delivering highly specialized, scalable software that addresses the unique challenges of your industry.
            </p>

            <p className="ind-text-reveal text-[#00C853] font-medium mb-8">
              Don't see your industry? Let's discuss your specific needs.
            </p>
            
            <button
              onClick={() => router.push('/contact')}
              className="ind-text-reveal group relative flex items-center h-14 pl-8 pr-2 rounded-full bg-white text-black font-bold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] pointer-events-auto"
            >
              <span className="mr-6">Let's Talk</span>
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
