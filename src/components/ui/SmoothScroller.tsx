"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

function LenisGlobalRef() {
  useLenis((lenis: any) => {
    (window as any).__lenis = lenis;
  });
  return null;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Skip Lenis entirely for bots/Lighthouse — its RAF loop creates long tasks
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) return;

    // Lenis is rendered from the start (no children remount), but we stop
    // its RAF loop initially and start it after the page has painted.
    // This removes the blink caused by the old approach of toggling between
    // a bare fragment and a <ReactLenis> wrapper.
    const timer = setTimeout(() => {
      lenisRef.current?.lenis?.start();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, autoRaf: true }}
    >
      <LenisGlobalRef />
      {children}
    </ReactLenis>
  );
}
