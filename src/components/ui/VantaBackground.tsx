"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import NET from 'vanta/dist/vanta.net.min';

export function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          color: 0xff5656,
          backgroundColor: 0x050505,
          points: 15,
          maxDistance: 25,
          spacing: 20,
          showDots: true,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={myRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
