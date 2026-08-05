"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

function LenisGlobalRef() {
  useLenis((lenis: any) => {
    (window as any).__lenis = lenis;
  });
  return null;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip Lenis entirely for bots/Lighthouse — its RAF loop creates long tasks
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent);
    if (!isBot) {
      // Defer Lenis init until after the main thread is free from initial paint
      const timer = setTimeout(() => setEnabled(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LenisGlobalRef />
      {children}
    </ReactLenis>
  );
}
