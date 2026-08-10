"use client";
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTransition } from '../ui/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = usePageTransition();

  useGSAP(() => {
    gsap.fromTo('.cta-bezel',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: {
           trigger: containerRef.current,
           start: "top 80%"
        }
      }
    );

    gsap.fromTo('.cta-reveal',
      { y: 40, opacity: 0, filter: "blur(10px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-transparent relative w-full pt-16 pb-24 px-4 sm:px-6 flex justify-center overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Glassmorphic Container */}
      <div className="cta-bezel w-full max-w-[1000px] relative rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden">
        
        {/* Inner Content Container */}
        <div className="w-full px-8 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
          
          <div className="cta-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase font-bold text-white/70 backdrop-blur w-max mb-8 tracking-[0.2em]">
            Ready to scale?
          </div>

          <h2 className="cta-reveal font-display font-bold tracking-tight text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 mb-6 max-w-3xl">
            Let's build <br />
            <span className="italic font-light text-neutral-400">the future.</span>
          </h2>
          
          <p className="cta-reveal text-[15px] md:text-[17px] text-white/50 font-light max-w-lg mb-12">
            Transform your business with cutting-edge engineering, intelligent AI solutions, and data-driven growth strategies.
          </p>
          
          <button
            onClick={() => navigateWithTransition('/contact')}
            className="cta-reveal group relative flex items-center justify-between w-full max-w-[300px] overflow-hidden rounded-full border border-white/20 bg-white/5 px-6 py-3.5 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10 text-[14px] font-bold tracking-[0.1em] text-white uppercase transition-colors">
              Start Your Project
            </span>
            
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:bg-white group-hover:scale-110">
              <ArrowRight className="h-5 w-5 text-white group-hover:text-black transition-colors" strokeWidth={2} />
            </div>
          </button>
          
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-50" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/10 to-transparent opacity-50" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />
      </div>
    </section>
  );
}
