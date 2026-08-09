"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { LayoutDashboard, Component, Box, FileBox, Menu, X, ArrowUpRight, FileText, Table } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SignOutButton } from "./SignOutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (status === "unauthenticated") {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Command Center", path: "/admin", icon: LayoutDashboard },
    { name: "Services", path: "/admin/cms/services", icon: Component },
    { name: "Packages", path: "/admin/cms/packages", icon: Box },
    { name: "Features", path: "/admin/cms/features", icon: FileBox },
    { name: "Comparisons", path: "/admin/cms/comparisons", icon: Table },
    { name: "Blog Posts", path: "/admin/cms/blog", icon: FileText },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-white flex font-sans overflow-hidden">
      
      {/* Premium Ethereal Glass Sidebar (Double-Bezel) */}
      <aside className="hidden md:flex flex-col w-72 m-4 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative z-50">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="p-8 pb-4 flex flex-col gap-1">
          <div className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2">
            Workspace
          </div>
          <Link href="/" className="font-display font-black text-2xl tracking-tighter uppercase flex items-center gap-2 group">
            XENOTECT 
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path}
                href={item.path} 
                className={`anime-child group flex items-center justify-between px-4 py-3.5 rounded-[1rem] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive 
                    ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/5' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04] active:scale-[0.98]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'scale-110 text-white' : 'text-neutral-500 group-hover:text-white group-hover:scale-110'}`} />
                  <span className="text-sm tracking-tight group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 relative z-10">
          <div className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/5">
            <div className="rounded-[calc(1.5rem-4px)] bg-[#0A0A0F]/80 p-4 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-3">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-9 h-9 rounded-full border border-white/10" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold truncate text-white tracking-tight">{session?.user?.name || 'Administrator'}</span>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 truncate">{session?.user?.email || 'System Access'}</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none" />

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-50 sticky top-0">
          <Link href="/" className="font-display font-black text-xl tracking-tighter uppercase">
            XENOTECT
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-[0.96] transition-transform"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-3xl pt-24 px-6 flex flex-col gap-2"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${
                      pathname === item.path 
                        ? 'bg-white/[0.08] text-white border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                        : 'text-neutral-400 border-transparent hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${pathname === item.path ? 'text-white' : 'text-neutral-500'}`} />
                    <span className="text-lg font-bold tracking-tight">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pb-10"
              >
                <SignOutButton />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex-1 overflow-auto p-6 md:p-8 relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}

