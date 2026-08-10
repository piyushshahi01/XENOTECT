"use client"

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils"

export default function ChromaBackground({ className }: { className?: string }) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        // Use requestAnimationFrame for smoother performance if needed, 
        // but direct style update is usually fine for simple mouse tracking
        blobRef.current.style.left = `${e.clientX}px`;
        blobRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 overflow-hidden bg-[#000000] -z-50",
        className
      )}
    >
      {/* 
        This is the glowing cursor effect. 
        It's a soft white/gray radial gradient that follows the mouse.
      */}
      <div 
        ref={blobRef}
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
          left: '50%', // Default position before mouse moves
          top: '50%',
        }}
      />
    </div>
  )
}


