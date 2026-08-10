"use client";

import React from "react";

export function GlobalSplineBackground({ tintColor = "" }: { tintColor?: string }) {
  // Completely pure black background, no tints, no Spline cubes.
  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* Soft vignette only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_100%)] opacity-80 z-[2] pointer-events-none" />
    </div>
  );
}
