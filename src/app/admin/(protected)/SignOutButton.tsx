"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <button 
        onClick={() => signOut()}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-500 transition-colors"
      >
        <LogOut className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button 
      onClick={() => signOut()}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-neutral-400 hover:text-rose-500 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span className="font-medium text-sm">Sign Out</span>
    </button>
  );
}
