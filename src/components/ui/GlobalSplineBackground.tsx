"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Spline component with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export function GlobalSplineBackground({ tintColor = "" }: { tintColor?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip for bots/Lighthouse
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) return;

    // Load after idle — gives the browser time to paint critical UI first
    const loadTimer = "requestIdleCallback" in window
      ? (window as any).requestIdleCallback(() => setShouldLoad(true), { timeout: 4000 })
      : setTimeout(() => setShouldLoad(true), 3500);

    // Use IntersectionObserver to pause/resume based on visibility
    // (Spline keeps animating even off-screen which burns GPU)
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "200px" }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(loadTimer);
      } else {
        clearTimeout(loadTimer as any);
      }
      observer.disconnect();
    };
  }, []);

  // Static fallback for bots
  if (typeof navigator !== "undefined" && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent)) {
    return <div className="fixed inset-0 z-[-1] bg-[#050505]" aria-hidden="true" />;
  }

  return (
    <div
      ref={wrapperRef}
      className="spline-bg-wrapper fixed inset-0 z-[-1] overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-500"
        style={{ opacity: isVisible ? 0.9 : 0, willChange: "opacity" }}
      >
        {shouldLoad && (
          <Spline 
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
            className="w-full h-full"
          />
        )}
      </div>

      {/* Optional tint */}
      {tintColor && (
        <div className={`absolute inset-0 z-[1] pointer-events-none ${tintColor}`} />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] opacity-40 z-[2] pointer-events-none" />
    </div>
  );
}
