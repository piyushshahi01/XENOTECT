"use client";

import React, { Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { animate, stagger, utils } from "animejs";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    animate('.login-card', {
      opacity: [0, 1],
      y: [40, 0],
      duration: 1000,
      ease: 'outExpo'
    });
    animate('.login-item', {
      opacity: [0, 1],
      y: [20, 0],
      delay: stagger(100, { start: 200 }),
      duration: 800,
      ease: 'outExpo'
    });
  }, []);

  return (
    <main className="min-h-[100dvh] bg-[#020202] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      
      {/* Double Bezel Glass Card */}
      <div className="login-card opacity-0 relative z-10 w-full max-w-md p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="h-full rounded-[calc(2.5rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-10 md:p-12 flex flex-col items-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl -mr-24 -mt-24 pointer-events-none" />

          <div className="login-item opacity-0 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>

          <h1 className="login-item opacity-0 text-4xl font-display font-bold text-white tracking-tighter mb-2">Admin Portal</h1>
          <p className="login-item opacity-0 text-neutral-400 mb-10 text-sm">Sign in to manage projects and leads.</p>

          {error === "AccessDenied" && (
            <div className="login-item opacity-0 w-full p-4 mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <p className="text-rose-400 text-xs font-bold uppercase tracking-widest">Access denied. Unauthorized.</p>
            </div>
          )}

          <button 
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="login-item opacity-0 group relative w-full overflow-hidden rounded-2xl p-0.5 bg-white/10 hover:bg-white/20 transition-all duration-500 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-4 bg-[#0A0A0F] py-4 px-6 rounded-[calc(1rem-2px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-white tracking-tight">Sign in with Google</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202]" />}>
      <LoginContent />
    </Suspense>
  );
}
