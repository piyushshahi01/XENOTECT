"use client";

import * as React from "react";
import { FluidBlobs } from "@/components/ui/FluidBlobs";
import { GlowEffect } from "@/components/ui/glow-effect";
import { cn } from "@/lib/utils";

export interface BlobCardProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  headerHeight?: number;
  lightColors?: string[];
  darkColors?: string[];
  glowColors?: string[];
  className?: string;
}

const DEFAULT_LIGHT = ["#00C853", "#00A040", "#007AFF", "#005bb5"];
const DEFAULT_DARK = ["#00401A", "#002510", "#002244", "#00152a"];
const DEFAULT_GLOW = ["#00C853", "#00A040", "#007AFF", "#005bb5", "#00C853"];

export function BlobCard({
  header,
  children,
  headerHeight = 224,
  lightColors = DEFAULT_LIGHT,
  darkColors = DEFAULT_DARK,
  glowColors = DEFAULT_GLOW,
  className,
}: BlobCardProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute -inset-[1.5px] rounded-[21.5px] overflow-hidden z-0">
        <GlowEffect
          colors={glowColors}
          mode="rotate"
          blur="strongest"
          duration={5}
          scale={1}
        />
      </div>

      <div className="relative z-10 rounded-[20px] overflow-hidden bg-[#0a0a0a] h-full flex flex-col">
        <div
          className="relative overflow-hidden rounded-t-[20px] shrink-0"
          style={{ height: headerHeight }}
        >
          <div className="absolute inset-0 z-0">
            <FluidBlobs
              lightColors={lightColors}
              darkColors={darkColors}
              origins={[
                { x: 50, y: -55 },
                { x: 50, y: -25 },
                { x: 50, y: -25 },
                { x: 50, y: -25 },
              ]}
              margin={60}
              blur={50}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none z-0" />
          {header && <div className="absolute inset-0 z-10 p-8 flex flex-col">{header}</div>}
        </div>

        {children && <div className="flex-1 flex flex-col">{children}</div>}
      </div>
    </div>
  );
}
