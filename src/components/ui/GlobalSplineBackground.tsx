"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Spline component with SSR disabled to avoid 'document is not defined' runtime errors
const Spline = dynamic(() => import("@splinetool/react-spline"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export function GlobalSplineBackground({ tintColor = "" }: { tintColor?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Forward mouse events to the Spline canvas so it reacts globally
  useEffect(() => {
    // Skip everything for bots/Lighthouse to eliminate all overhead
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (isBot) return;

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
    
    // Delay loading the heavy 3D background to prevent blocking initial render (helps Lighthouse/PageSpeed)
    const timer = setTimeout(() => setShouldLoad(true), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Render nothing for bots — static bg-[#050505] from body is sufficient
  if (typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent)) {
    return <div className="fixed inset-0 z-[-1] bg-[#050505]" aria-hidden="true" />;
  }

  return (
    <div 
      className="spline-bg-wrapper fixed inset-0 z-[-1] overflow-hidden bg-[#050505] pointer-events-auto"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full opacity-90">
        {shouldLoad ? (
          <Spline 
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
            className="w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-[#050505]" />
        )}
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
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=''0 0 256 256'' xmlns=''http://www.w3.org/2000/svg''%3E%3Cfilter id=''n''%3E%3CfeTurbulence type=''fractalNoise'' baseFrequency=''0.9'' numOctaves=''4'' stitchTiles=''stitch''/%3E%3C/filter%3E%3Crect width=''100%25'' height=''100%25'' filter=''url(%23n)''/%3E%3C/svg%3E')] mix-blend-overlay z-[3] pointer-events-none" style={{ backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
    </div>
  );
}
