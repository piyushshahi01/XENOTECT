"use client";

import React from "react";

const themes = {
  blue: {
    bg:          "#02091a",
    stripeColor: "#0a2ee8",
    stripeLight: "#1a4fff",
    stripeShadow:"#010a2a",
    spotlight:   "rgba(30,100,255,0.28)",
    edgeDark:    "#010714",
    glowCenter:  "rgba(40,100,255,0.20)",
  },
  rose: {
    bg:          "#0e0106",
    stripeColor: "#a01028",
    stripeLight: "#d01838",
    stripeShadow:"#1a0008",
    spotlight:   "rgba(200,20,50,0.28)",
    edgeDark:    "#08010a",
    glowCenter:  "rgba(200,20,50,0.20)",
  },
};

export function HeroVerticalStripes({ variant = "blue" }: { variant?: "blue" | "rose" }) {
  const t   = themes[variant];
  const n   = 38; // many thin fins

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{ background: t.bg }}
    >
      {/* ─── Fin grid ─────────────────────────────── */}
      <div className="absolute inset-0 flex items-stretch" style={{ gap: "2px", padding: "0 2px" }}>
        {Array.from({ length: n }).map((_, i) => {
          const pos    = i / (n - 1);
          const center = 1 - Math.abs(pos - 0.5) * 2; // 0→1→0
          // Each fin: thin vertical bar with a subtle left-edge highlight
          return (
            <div
              key={i}
              className="flex-1 relative overflow-hidden"
              style={{
                borderRadius: "0 0 0 0",
              }}
            >
              {/* Main fin body */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right,
                    ${t.stripeLight} 0%,
                    ${t.stripeColor} 30%,
                    ${t.stripeShadow} 100%
                  )`,
                  opacity: 0.45 + center * 0.55,
                  animationName: "finPulse",
                  animationDuration: `${3.5 + center}s`,
                  animationDelay: `${Math.abs(pos - 0.5) * 1.6}s`,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
              />
              {/* Thin specular highlight on left edge */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: "1.5px",
                  background: `rgba(255,255,255,${0.06 + center * 0.14})`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ─── Centre spotlight from above ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 80% at 50% -5%,
            ${t.spotlight} 0%,
            transparent 70%
          )`,
        }}
      />

      {/* ─── Centre glow from below ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 110%,
            ${t.glowCenter} 0%,
            transparent 65%
          )`,
        }}
      />

      {/* ─── Left / right edge black-out ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right,
            ${t.edgeDark} 0%,
            transparent 22%,
            transparent 78%,
            ${t.edgeDark} 100%
          )`,
        }}
      />

      {/* ─── Top dark ceiling (nav area) ─── */}
      <div
        className="absolute top-0 inset-x-0 h-36 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${t.bg} 0%, transparent 100%)` }}
      />

      {/* ─── Bottom dissolve into rest of page ─── */}
      <div
        className="absolute bottom-0 inset-x-0 h-60 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent 0%, ${t.bg} 100%)` }}
      />

      {/* ─── Noise grain ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      <style>{`
        @keyframes finPulse {
          0%, 100% { filter: brightness(0.82); }
          50%       { filter: brightness(1.18); }
        }
      `}</style>
    </div>
  );
}
