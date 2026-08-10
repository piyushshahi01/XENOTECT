"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Home, User, Calendar, Zap, CreditCard, Menu, X, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"


import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import RadialGlowButton from "@/components/ui/radial-glow-button"
import { usePageTransition } from "@/components/ui/PageTransition"

// Helper component for navigation links
const NavLink = ({ href, icon: Icon, label, onClick }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; onClick: (href: string) => void }) => (
  <button 
    onClick={() => onClick(href)}
    className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
  >
    <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
)

// Simple Theme Toggle for Mobile
const MobileThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = (theme === 'dark' || resolvedTheme === 'dark')

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export function NotchNavbar({ className, ...props }: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { navigateWithTransition } = usePageTransition()

  const items = {
    left: [
      { label: "Services", href: "/#services", icon: Zap },
      { label: "Portfolio", href: "/portfolio", icon: Calendar },
      { label: "Pricing", href: "/#pricing", icon: CreditCard }
    ],
    right: [
      { label: "Blog", href: "/blog", icon: User },
      { label: "Contact", href: "/contact", icon: Home }
    ]
  }

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 h-16 flex px-0 pointer-events-auto", className)} {...props}>
        
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#0C0C0C]/60 backdrop-blur-2xl saturate-150 z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          
          {/* Left Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#0C0C0C]/60 backdrop-blur-2xl saturate-150" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
             {/* Background & Lines Layer */}
             <div className="absolute inset-0 bg-[#0C0C0C]/60 backdrop-blur-2xl saturate-150">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
                 </svg>
             </div>

              {/* Content Layer */}
             <div className="relative w-full h-full flex items-end justify-between pb-2 px-4 md:px-8">
               
               {/* Desktop Left Nav */}
               <nav className="hidden md:flex gap-8 mb-1 shrink-0">
                {items.left.map(item => (
                  <NavLink key={item.label} {...item} onClick={navigateWithTransition} />
                ))}
              </nav>

              {/* Mobile Menu Button (Left) */}
              <button 
                className="md:hidden mb-1 p-1 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Logo (Center) */}
              <div className="flex justify-center shrink-0 mx-2 md:mx-4 mt-1">
                {props.logo || (
                  <button onClick={() => navigateWithTransition("/")} className="flex items-center justify-center relative group cursor-pointer">
                    <div className="text-xl md:text-2xl font-black tracking-tight text-white uppercase hover:scale-105 transition-transform">XENOTECT</div>
                  </button>
                )}
              </div>

              {/* Desktop Right Nav */}
              <nav className="hidden md:flex gap-6 items-center shrink-0">
                {items.right.map(item => (
                  <NavLink key={item.label} {...item} onClick={navigateWithTransition} />
                ))}
                
                <div className="flex gap-4 pl-4 border-l border-white/10 shrink-0 items-center">
                  <div role="button" tabIndex={0} onClick={() => navigateWithTransition("/contact")} className="whitespace-nowrap cursor-pointer">
                    <RadialGlowButton style={{ minWidth: 'auto', minHeight: 'auto', padding: '10px 20px', borderRadius: '9999px', fontSize: '14px' }}>
                      Start a Project
                    </RadialGlowButton>
                  </div>
                </div>
              </nav>

              {/* Mobile Right Actions */}
              <div className="md:hidden flex items-center gap-2 mb-1">
                {/* No mobile actions right now */}
              </div>

             </div>
          </div>

          {/* Right Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#0C0C0C]/60 backdrop-blur-2xl saturate-150" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            </svg>
          </div>

        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#0C0C0C]/60 backdrop-blur-2xl saturate-150 z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
          </svg>
        </div>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0C0C0C]/70 backdrop-blur-3xl saturate-200 border-b border-white/10 p-4 md:hidden shadow-2xl pointer-events-auto"
          >
             <nav className="flex flex-col gap-2">
               {/* Combine all items */}
               {[...items.left, ...items.right].map(item => (
                 <button 
                   key={item.label} 
                   onClick={() => {
                     setIsMobileMenuOpen(false);
                     navigateWithTransition(item.href);
                   }}
                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer w-full text-left"
                 >
                   <item.icon className="w-5 h-5 opacity-70 text-white" />
                   <span className="font-medium text-white/90">{item.label}</span>
                 </button>
               ))}
               <div className="h-px bg-white/10 my-2" />
               <div className="flex flex-col gap-2">
                 <div 
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigateWithTransition("/contact");
                    }}
                    className="flex justify-center mt-2 cursor-pointer w-full"
                 >
                   <RadialGlowButton className="w-full" style={{ minWidth: 'auto', minHeight: 'auto', padding: '12px 20px', borderRadius: '12px' }}>
                     Start a Project
                   </RadialGlowButton>
                 </div>
               </div>
             </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
