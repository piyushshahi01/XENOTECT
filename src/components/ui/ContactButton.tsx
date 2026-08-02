import React from 'react';
import { Magnet } from './Magnet';
import { GlowEffect } from './glow-effect';

export function ContactButton() {
  return (
    <Magnet padding={100} strength={2}>
      <div className="relative inline-block w-full">
        <GlowEffect
          colors={["#B600A8", "#7621B0", "#BE4C00", "#18011F"]}
          mode="colorShift"
          blur="medium"
          duration={3}
        />
        <button 
          className="relative rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest hover:scale-[1.02] transition-transform z-10 w-full"
          style={{
            background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
            boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
            outline: '1px solid rgba(255, 255, 255, 0.3)',
            outlineOffset: '-2px'
          }}
        >
          Contact Me
        </button>
      </div>
    </Magnet>
  );
}
