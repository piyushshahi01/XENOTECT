"use client";

import React, { Suspense, lazy, useEffect } from "react";

import dynamic from "next/dynamic";

// Dynamically import the Spline component with SSR disabled to avoid 'document is not defined' runtime errors
const Spline = dynamic(() => import("@splinetool/react-spline"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export function GlobalSplineBackground({ tintColor = "" }: { tintColor?: string }) {
  // Forward mouse events to the Spline canvas so it reacts globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.querySelector('.spline-bg-wrapper canvas');
      if (canvas) {
        const event = new PointerEvent('pointermove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
          pointerType: 'mouse'
        });
        canvas.dispatchEvent(event);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="spline-bg-wrapper fixed inset-0 z-[-1] overflow-hidden bg-[#050505] pointer-events-auto"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full opacity-90">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
          <Spline 
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
            className="w-full h-full"
          />
        </Suspense>
      </div>
      
      {/* Optional Tint Overlay */}
      {tintColor && (
        <div className={`absolute inset-0 z-[1] pointer-events-none ${tintColor}`} />
      )}

      {/* Dark overlay — keep text readable without hiding the cube grid */}
      <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />
      
      {/* Soft vignette — subtle only at extreme edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] opacity-40 z-[2] pointer-events-none" />
      
      {/* Noise grain for cinematic quality */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-[3] pointer-events-none" />
    </div>
  );
}
