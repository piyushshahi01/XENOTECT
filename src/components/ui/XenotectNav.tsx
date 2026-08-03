"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" }
];

const ease = [0.23, 1, 0.32, 1] as const;

import { Magnet } from "./Magnet";
import { usePageTransition } from "./PageTransition";

import { usePathname } from "next/navigation";

export function XenotectNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = usePageTransition();
  const pathname = usePathname();
  const delay = pathname === "/" ? 2.5 : 0.5;

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setScrolled(y > 80);
    });
  }, [scrollY]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay }}
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
      >
        <div
          className={`pointer-events-auto w-max max-w-[90vw] flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] gap-8 md:gap-12 ${
            scrolled
              ? "nav-glass-solid border-white/[0.08]"
              : "bg-black/20 border-white/[0.05] backdrop-blur-2xl"
          }`}
        >
          {/* Logo */}
          <button onClick={() => navigateWithTransition("/")} className="text-sm font-medium tracking-[0.15em] uppercase text-white select-none cursor-pointer">
            XENOTECT
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Magnet key={link.name} padding={50} strength={1.5}>
                {link.href.startsWith("/#") ? (
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => navigateWithTransition(link.href)}
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                  >
                    {link.name}
                  </button>
                )}
              </Magnet>
            ))}
          </div>

          {/* Desktop CTA */}
          <Magnet className="hidden md:block" padding={100} strength={2}>
            <motion.button
              onClick={() => navigateWithTransition("/contact")}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white text-black text-[13px] font-medium pl-5 pr-1.5 py-1.5 rounded-full group cursor-pointer"
            >
              <span>Start Project</span>
              <span className="w-7 h-7 rounded-full bg-black/[0.06] flex items-center justify-center group-hover:bg-black/[0.1] transition-colors duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" strokeWidth={2} />
              </span>
            </motion.button>
          </Magnet>

          {/* Mobile Hamburger Morph */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.5, ease: [0.32,0.72,0,1] }}
              className="absolute w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.5, ease: [0.32,0.72,0,1] }}
              className="absolute w-5 h-[1.5px] bg-white rounded-full"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <React.Fragment key={link.name}>
                  {link.href.startsWith("/#") ? (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      passHref
                      legacyBehavior
                    >
                      <motion.a
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{
                          delay: 0.08 + i * 0.06,
                          duration: 0.6,
                          ease,
                        }}
                        className="text-3xl font-light text-white/80 hover:text-white transition-colors"
                      >
                        {link.name}
                      </motion.a>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => {
                        setMenuOpen(false);
                        navigateWithTransition(link.href);
                      }}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.06,
                        duration: 0.6,
                        ease,
                      }}
                      className="text-3xl font-light text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </motion.button>
                  )}
                </React.Fragment>
              ))}
              <motion.button
                onClick={() => { setMenuOpen(false); navigateWithTransition("/contact"); }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 flex items-center gap-2 bg-white text-black text-sm font-medium pl-6 pr-2 py-2 rounded-full group cursor-pointer"
              >
                <span>Start Project</span>
                <span className="w-8 h-8 rounded-full bg-black/[0.06] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-black" strokeWidth={2} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
