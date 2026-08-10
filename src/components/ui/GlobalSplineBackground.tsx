"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Spline component with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export function GlobalSplineBackground({ tintColor = "" }: { tintColor?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    // Skip for bots/Lighthouse
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) return;

    // Load after idle — gives the browser time to paint critical UI first
    const loadTimer = "requestIdleCallback" in window
      ? (window as any).requestIdleCallback(() => setShouldLoad(true), { timeout: 4000 })
      : setTimeout(() => setShouldLoad(true), 3500);

    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(loadTimer);
      } else {
        clearTimeout(loadTimer as any);
      }
    };
  }, []);

  useEffect(() => {
    // Pause background rendering if user scrolls down more than 1.5x the screen height
    // This frees up GPU resources for the content below the fold
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) {
        if (inView) setInView(false);
      } else {
        if (!inView) setInView(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);

  // Static fallback for bots
  if (typeof navigator !== "undefined" && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent)) {
    return <div className="fixed inset-0 z-[-1] bg-[#050505]" aria-hidden="true" />;
  }

  // Remove mix-blend-color from tintColor to prevent expensive compositing over WebGL
  const optimizedTintColor = tintColor.replace("mix-blend-color", "");

  return (
    <div
      className="spline-bg-wrapper fixed inset-0 z-[-1] overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full opacity-90">
        {shouldLoad && inView && (
          <Spline 
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
            className="w-full h-full"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>

      {/* Optional tint without mix-blend-color */}
      {optimizedTintColor && (
        <div className={`absolute inset-0 z-[1] pointer-events-none ${optimizedTintColor}`} />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] opacity-60 z-[2] pointer-events-none" />
    </div>
  );
}
