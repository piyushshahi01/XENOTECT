"use client";
import React, { useRef } from 'react';
import { ArrowUpRight, Code, MessageCircle, Briefcase } from 'lucide-react';
import SocialFlipButton from '../ui/social-flip-button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Stagger footer columns fade up
    gsap.fromTo('.footer-col',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      }
    );

    // Bottom bar slides in
    gsap.fromTo('.footer-bottom',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="border-t border-white/5 pt-16 pb-10 px-6 md:px-16 relative pointer-events-auto" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3, 3, 5, 0.8) 30%, rgba(3, 3, 5, 1) 100%)' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-32">
          <div className="footer-col md:col-span-2">
            <h3 className="text-[clamp(2rem,4vw,3rem)] font-display font-black uppercase tracking-tighter leading-none mb-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>XENOTECT</h3>
            <p className="text-white/50 max-w-sm font-light leading-relaxed">
              Crafting premium digital experiences through cutting-edge engineering and timeless design.
            </p>
          </div>
          
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-2 opacity-40">Navigation</h4>
            {['Home', 'About', 'Services', 'Pricing', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors w-fit text-sm font-medium tracking-wide">
                {item}
              </a>
            ))}
          </div>

          <div className="footer-col flex flex-col gap-4 w-full h-full justify-start items-start md:items-end">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2 opacity-50 text-left md:text-right w-full">Contact & Socials</h4>
            <div className="w-full flex justify-start md:justify-end -ml-4 md:ml-0">
              <SocialFlipButton />
            </div>
          </div>
        </div>
        
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-[10px] font-medium uppercase tracking-[0.15em] gap-4">
          <p>© {new Date().getFullYear()} Xenotect. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
