"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
}: {
  className?: string;
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-screen w-full bg-black overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Aurora Blobs */}
        <div className="absolute -inset-[10px] opacity-70 blur-[120px] z-0">
          <motion.div
            animate={{
              x: ["0%", "15%", "-10%", "0%"],
              y: ["0%", "-10%", "15%", "0%"],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4a044e] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ["-10%", "15%", "0%", "-10%"],
              y: ["15%", "0%", "-15%", "15%"],
              scale: [0.9, 1.2, 1, 0.9],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0f172a] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ["15%", "0%", "-15%", "15%"],
              y: ["-15%", "15%", "0%", "-15%"],
              scale: [1.1, 0.9, 1.3, 1.1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-[#082f49] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ["0%", "-15%", "15%", "0%"],
              y: ["0%", "15%", "-15%", "0%"],
              scale: [1, 1.4, 0.9, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[30%] left-[30%] w-[50%] h-[50%] bg-[#172554] rounded-full mix-blend-screen"
          />
        </div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter="url(#noiseFilter)"
            />
          </svg>
        </div>

        {/* Radial Fade out for Spotlight Effect */}
        {showRadialGradient && (
          <div className="absolute inset-0 z-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, black 100%)"
          }} />
        )}
      </div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
