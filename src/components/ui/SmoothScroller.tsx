"use client";

import { ReactLenis, useLenis } from 'lenis/react';

function LenisGlobalRef() {
  useLenis((lenis: any) => {
    (window as any).__lenis = lenis;
  });
  return null;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LenisGlobalRef />
      {children}
    </ReactLenis>
  );
}
