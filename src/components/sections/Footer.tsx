"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SocialFlipButton from "../ui/social-flip-button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services/web-solutions" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "Growth & Marketing", href: "/services/growth-solutions" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".footer-col",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".footer-bottom",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/5 pt-16 pb-10 px-6 md:px-16 relative pointer-events-auto"
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.8) 30%, rgba(3,3,5,1) 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20">

          {/* Brand */}
          <div className="footer-col sm:col-span-2 md:col-span-1">
            <Link href="/" aria-label="XENOTECT Home">
              <h3
                className="text-[clamp(2rem,4vw,3rem)] font-display font-black uppercase tracking-tighter leading-none mb-6 w-fit"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                XENOTECT
              </h3>
            </Link>
            <p className="text-white/50 max-w-sm font-light leading-relaxed text-sm">
              Crafting premium digital experiences through cutting-edge engineering and timeless design.
            </p>
          </div>

          {/* Navigation */}
          <nav className="footer-col flex flex-col gap-4" aria-label="Site navigation">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-1 opacity-40">
              Navigation
            </h4>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white transition-colors w-fit text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Services */}
          <nav className="footer-col flex flex-col gap-4" aria-label="Services navigation">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-1 opacity-40">
              Services
            </h4>
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white transition-colors w-fit text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-colors w-fit group"
            >
              Start a Project
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </nav>

          {/* Contact & Socials */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1 opacity-50">
              Contact &amp; Socials
            </h4>
            <a
              href="mailto:hello@xenotect.com"
              className="text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              hello@xenotect.com
            </a>
            <div className="-ml-2 md:-ml-2">
              <SocialFlipButton />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-[10px] font-medium uppercase tracking-[0.15em] gap-4">
          <p>© {new Date().getFullYear()} Xenotect. All rights reserved.</p>
          <div className="flex gap-8">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
