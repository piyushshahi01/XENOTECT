"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Code2, Cpu, TrendingUp, ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroImage = "https://framerusercontent.com/images/JsTyJ8SI0aY2mJTSE3A7MEQ9rQ.jpeg";

const cards = [
  {
    title: "Web Solutions",
    description: "Custom websites and web applications designed for performance, scalability, and business growth.",
    services: [
      "Business Websites",
      "Landing Pages",
      "E-commerce",
      "SaaS Applications",
      "Web Portals",
    ],
    cta: "Explore Web Solutions",
    href: "/services/web-solutions",
    theme: "light",
    icon: "arrow",
    previewImage: "https://picsum.photos/505/465", // We'll just use picsum for web for now if no framer image available
  },
  {
    title: "AI Solutions",
    description: "Intelligent AI systems that automate customer support, sales, and business operations.",
    services: [
      "AI Chatbots",
      "Voice Agents",
      "AI Automation",
      "CRM Automation",
      "WhatsApp AI",
    ],
    cta: "Explore AI Solutions",
    href: "/services/ai-solutions",
    theme: "blue",
    icon: "dots",
    previewImage: "https://framerusercontent.com/images/JsTyJ8SI0aY2mJTSE3A7MEQ9rQ.jpeg",
  },
  {
    title: "Growth Solutions",
    description: "Digital marketing strategies that help businesses attract, convert, and retain customers.",
    services: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Social Media Management",
      "Branding",
    ],
    cta: "Explore Growth",
    href: "/services/growth-solutions",
    theme: "dark",
    icon: "spark",
    previewImage: "https://framerusercontent.com/images/k2uW7N97W344zDtd4tV1E7O2F3o.jpg",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // --- INITIAL STATES ---
      gsap.set(".animation-wrapper", { scale: 1 });

      // Slices start perfectly seamless
      gsap.set(".laptop-slice-0, .laptop-overlay-0", { x: -320, borderTopLeftRadius: 24, borderBottomLeftRadius: 24, borderTopRightRadius: 0, borderBottomRightRadius: 0, rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(".laptop-slice-1, .laptop-overlay-1", { x: 0, borderRadius: 0, rotateY: 0, rotateZ: 0, scale: 1, zIndex: 10 });
      gsap.set(".laptop-slice-2, .laptop-overlay-2", { x: 320, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 24, borderBottomRightRadius: 24, rotateY: 0, rotateZ: 0, scale: 1 });
      
      // Cards start flipped backward (-180deg) and hidden
      gsap.set(".cards-container", { opacity: 1 });
      gsap.set(".service-card-0", { x: -380, rotateY: -180, rotateZ: 0, opacity: 0, scale: 1.1 });
      gsap.set(".service-card-1", { x: 0, rotateY: -180, rotateZ: 0, opacity: 0, scale: 1.1, zIndex: 10, translateZ: 1 }); // Center card IN FRONT
      gsap.set(".service-card-2", { x: 380, rotateY: -180, rotateZ: 0, opacity: 0, scale: 1.1 });
      
      // Content starts hidden
      gsap.set(".service-content", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", 
          scrub: 1, 
          pin: containerRef.current,
          anticipatePin: 1,
        }
      });

      // --- PHASE 1: SPLIT ---
      tl.to([".laptop-slice-0", ".laptop-overlay-0"], { x: -380, borderTopRightRadius: 24, borderBottomRightRadius: 24, duration: 1, ease: "power2.inOut" }, 0);
      tl.to([".laptop-slice-2", ".laptop-overlay-2"], { x: 380, borderTopLeftRadius: 24, borderBottomLeftRadius: 24, duration: 1, ease: "power2.inOut" }, 0);
      tl.to([".laptop-slice-1", ".laptop-overlay-1"], { borderRadius: 24, duration: 1, ease: "power2.inOut" }, 0);

      // --- PHASE 2: 3D FLIP TO FANNED POSITION ---
      const flipStart = 1.2;
      const flipDuration = 1.2;
      const midFlip = flipStart + (flipDuration / 2);

      // Slices flip away (0 to 180) and move into fanned position
      tl.to(".laptop-slice-0", { x: -360, rotateY: 180, rotateZ: -12, y: 40, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      tl.to(".laptop-slice-1", { x: 0, rotateY: 180, rotateZ: 0, y: -20, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      tl.to(".laptop-slice-2", { x: 360, rotateY: 180, rotateZ: 12, y: 40, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      
      tl.to([".laptop-slice-0", ".laptop-slice-1", ".laptop-slice-2"], { scale: 1.05, duration: flipDuration / 2, ease: "power1.out" }, flipStart);

      // Cards flip in (-180 to 0) and land in fanned position
      tl.to(".service-card-0", { x: -360, rotateY: 0, rotateZ: -12, y: 40, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      tl.to(".service-card-1", { x: 0, rotateY: 0, rotateZ: 0, y: -20, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      tl.to(".service-card-2", { x: 360, rotateY: 0, rotateZ: 12, y: 40, duration: flipDuration, ease: "power1.inOut" }, flipStart);
      
      tl.to([".service-card-0", ".service-card-1", ".service-card-2"], { scale: 1, duration: flipDuration / 2, ease: "power1.in" }, midFlip);

      // GUARANTEED SWAP AT EXACTLY 90-DEGREES (Edge-on)
      // This forces the laptop to hide and the cards to appear, regardless of browser backface bugs
      tl.to(".laptop-container", { opacity: 0, duration: 0.01 }, midFlip);
      tl.to([".service-card-0", ".service-card-1", ".service-card-2"], { opacity: 1, duration: 0.01 }, midFlip);

      // --- PHASE 3: REVEAL CONTENT ---
      // Content fades in as the flip crosses the 90-degree mark
      tl.to(".service-content", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, midFlip + 0.2);
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile fallback
      gsap.set(".laptop-container", { display: "none" });
      gsap.set(".cards-container", { opacity: 1, position: "relative", height: "auto" });
      gsap.set(".service-card-0, .service-card-1, .service-card-2", { opacity: 1, x: 0, y: 0, rotateZ: 0, rotateY: 0, z: 0, position: "relative", transform: "none", left: "auto", top: "auto", margin: "0 auto 2rem auto" });
      gsap.set(".service-content", { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Blur reveal for the title on enter
  useGSAP(() => {
    gsap.fromTo(".services-reveal-text",
      { y: 40, opacity: 0, filter: "blur(15px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="bg-transparent relative min-h-screen w-full">
      <BackgroundGlow />
      
      {/* Pinned Container */}
      <div ref={pinRef} className="min-h-screen lg:h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 lg:py-0 relative gap-8 lg:gap-12">
        
        {/* Intro Copy */}
        <div className="relative z-50 max-w-3xl text-center pointer-events-none">
          <h2 className="services-reveal-text font-serif text-4xl leading-[0.92] tracking-[-0.045em] text-white md:text-5xl">
            SERVICES
          </h2>
        </div>

        {/* Animation Perspective Wrapper */}
        <div className="animation-wrapper relative w-full lg:h-[600px] flex items-center justify-center" style={{ perspective: "2000px" }}>
          
          {/* Laptop Mockup Slices */}
          <div className="laptop-container preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block pointer-events-none w-full max-w-[1200px] mx-auto h-[480px]">
            {[
              { position: "0% center" },
              { position: "50% center" },
              { position: "100% center" }
            ].map((slice, i) => (
              <div 
                key={`slice-${i}`}
                className={`laptop-slice-${i} preserve-3d absolute left-1/2 top-1/2 w-[320px] h-[480px] -translate-x-1/2 -translate-y-1/2 bg-no-repeat shadow-[0_30px_60px_rgba(0,0,0,0.4)]`}
                style={{ 
                  backgroundImage: `url(${heroImage})`, 
                  backgroundSize: "960px 480px", // Exactly 3x the slice width
                  backgroundPosition: slice.position
                }} 
              >
                {/* Dynamic Specular Glare */}
                <div className={`glare-${i} absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 mix-blend-overlay rounded-[24px] pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Cards Container */}
          <div className="cards-container preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block w-full max-w-[1200px] mx-auto h-[480px]">
            {cards.map((card, index) => (
              <article 
                key={card.title}
                className={`service-card-${index} preserve-3d absolute left-1/2 top-1/2 w-[320px] h-[480px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] pointer-events-auto ${getCardSurface(card.theme)}`}
              >
                <div className="noise" />
                {/* Dynamic Specular Glare matching the image slices */}
                <div className={`glare-${index} absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 mix-blend-overlay pointer-events-none z-20`} />
                <CardInnerContent card={card} index={index} />
              </article>
            ))}
          </div>
          
          {/* Mobile Cards (rendered naturally without absolute positioning) */}
          <div className="cards-container lg:hidden w-full px-5 flex flex-col gap-6 items-center">
             {cards.map((card, index) => (
              <article 
                key={card.title}
                className={`service-card-${index} w-full max-w-[320px] h-[480px] overflow-hidden rounded-[24px] p-6 shadow-2xl shadow-black/25 pointer-events-auto ${getCardSurface(card.theme)}`}
              >
                <div className="noise" />
                <CardInnerContent card={card} index={index} />
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function getCardSurface(theme: string) {
  if (theme === "light") {
    return "bg-[#050505] border border-emerald-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_40px_rgba(16,185,129,0.05)] text-white";
  }
  if (theme === "blue") {
    return "bg-[#050505] border border-blue-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_40px_rgba(59,130,246,0.05)] text-white";
  }
  return "bg-[#050505] border border-purple-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_40px_rgba(168,85,247,0.05)] text-white";
}

function getOrbColor(theme: string) {
  if (theme === "light") return "bg-emerald-500";
  if (theme === "blue") return "bg-blue-500";
  return "bg-purple-500";
}

function getBadgeStyles(theme: string) {
  if (theme === "light") return "text-emerald-400 border-emerald-500/20";
  if (theme === "blue") return "text-blue-400 border-blue-500/20";
  return "text-purple-400 border-purple-500/20";
}

function CardIcon({ theme }: { theme: string }) {
  if (theme === "light") return <Code2 className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />;
  if (theme === "blue") return <Cpu className="w-6 h-6 text-blue-400" strokeWidth={1.5} />;
  return <TrendingUp className="w-6 h-6 text-purple-400" strokeWidth={1.5} />;
}

function CardInnerContent({ card, index }: { card: any, index: number }) {
  const stringProps = {
    string: "cursor",
    "string-cursor-class": `-target-${index + 1}`,
    "string-cursor-target-style-disable": "true"
  } as any;

  return (
    <div 
      suppressHydrationWarning
      className="service-content relative z-30 flex h-full flex-col"
      {...stringProps}
    >
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none ${getOrbColor(card.theme)}`} />
      
      <div className="mb-4 flex items-center justify-between">
        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
          <CardIcon theme={card.theme} />
        </div>
        <div className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border bg-white/5 backdrop-blur-md ${getBadgeStyles(card.theme)}`}>
          {index === 0 ? 'Engineering' : index === 1 ? 'Intelligence' : 'Scale'}
        </div>
      </div>

      <h3 className="font-display text-[26px] leading-tight font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 mb-2">
        {card.title}
      </h3>
      
      <p className="text-[13px] leading-snug text-white/50 mb-4 font-light line-clamp-2">
        {card.description}
      </p>
      
      <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />

      <ul className="space-y-2 flex-1">
        {card.services.map((service: string) => (
          <li key={service} className="flex items-center gap-2.5 text-[12px] text-white/70 group">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors" />
            <span className="font-medium tracking-wide group-hover:text-white transition-colors">{service}</span>
          </li>
        ))}
      </ul>

      {/* Colorful glow behind the button to make glassmorphism visible */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-24 rounded-full blur-[40px] opacity-40 pointer-events-none ${getOrbColor(card.theme)}`} />

      <div className="mt-auto pt-3 relative z-10">
        <Link
          href={card.href}
          className="group relative flex items-center justify-between w-full overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-2.5 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Glass shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="relative z-10 text-[13px] font-bold tracking-wide text-white group-hover:text-white transition-colors">
            {card.cta}
          </span>
          
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:bg-white group-hover:scale-110">
            <ArrowRight className="h-4 w-4 text-white group-hover:text-black transition-colors" strokeWidth={2} />
          </div>
        </Link>
      </div>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div className="pointer-events-none absolute left-[-10%] top-[8%] h-[380px] w-[380px] rounded-full bg-[#00C853]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-[420px] w-[420px] rounded-full bg-[#007AFF]/5 blur-[120px]" />
    </>
  );
}
