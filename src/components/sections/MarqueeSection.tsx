"use client";
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const gifs = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const row1 = gifs.slice(0, 11);
const row2 = gifs.slice(11);

export function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade-in on enter
  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="marquee-section" className="bg-white pt-12 sm:pt-16 pb-16 overflow-hidden flex flex-col gap-4 relative z-20">
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
        {[...row1, ...row1, ...row1].map((src, i) => (
          <Image 
            key={`r1-${i}`} 
            src={src} 
            width={420}
            height={270}
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 border border-black/10" 
            loading="lazy" 
            alt={`Xenotect portfolio showcase ${i + 1}`} 
          />
        ))}
      </div>
      <div className="flex gap-4 animate-marquee [animation-direction:reverse] hover:[animation-play-state:paused]">
        {[...row2, ...row2, ...row2].map((src, i) => (
          <Image 
            key={`r2-${i}`} 
            src={src} 
            width={420}
            height={270}
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 border border-black/10" 
            loading="lazy" 
            alt={`Xenotect previous work example ${i + 1}`} 
          />
        ))}
      </div>
    </section>
  );
}
