"use client";

import React, { createContext, useContext, useRef, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionContextType {
  navigateWithTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateWithTransition: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const isInitialMount = useRef(true);

  // When pathname changes → run EXIT animation (reveal new page)
  useEffect(() => {
    if (isInitialMount.current) {
      // On first load, we WANT to run the reveal animation!
      isInitialMount.current = false;
    } else {
      // On subsequent path changes, only run if we navigated via our custom function
      if (!isNavigating.current) return;
    }
    isNavigating.current = false;

    const overlay = overlayRef.current;
    const brand = brandRef.current;
    if (!overlay || !brand) return;

    // Kill lingering tweens
    gsap.killTweensOf([overlay, brand]);

    // Force overlay to visible/covering state
    gsap.set(overlay, { opacity: 1, pointerEvents: "all" });

    const exitTl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
        gsap.set(brand, { opacity: 0, scale: 1.5, filter: "blur(20px)", visibility: "hidden" });
      },
    });

    // Brand blows up and fades
    exitTl.to(brand, {
      scale: 2.5,
      opacity: 0,
      letterSpacing: "0.6em",
      filter: "blur(24px)",
      duration: 0.45,
      ease: "power2.in",
    });

    // Overlay fades out to reveal the new page
    exitTl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.15"
    );
  }, [pathname]);

  const navigateWithTransition = useCallback(
    (href: string) => {
      // Same-page or anchor: skip animation
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.pathname === pathname) {
          router.push(href);
          return;
        }
      } catch {
        if (href === pathname || href.startsWith("#")) {
          router.push(href);
          return;
        }
      }

      if (isNavigating.current) return;

      const overlay = overlayRef.current;
      const brand   = brandRef.current;
      if (!overlay || !brand) {
        router.push(href);
        return;
      }

      isNavigating.current = true;
      gsap.killTweensOf([overlay, brand]);

      // Reset
      gsap.set(overlay, { opacity: 0, pointerEvents: "all" });
      gsap.set(brand, {
        scale: 1,
        opacity: 0,
        letterSpacing: "0em",
        filter: "blur(8px)",
        visibility: "visible",
      });

      // Run visual transition
      const tl = gsap.timeline({
        onComplete: () => {
          // Subtle pulse while new page loads
          gsap.to(brandRef.current, {
            opacity: 0.35,
            scale: 0.97,
            duration: 0.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });

          // Safety fallback: if navigation gets stuck or fails, clear the overlay after 4s
          // We put this BEFORE router.push so it still runs even if router.push crashes
          const timeoutId = setTimeout(() => {
            if (isNavigating.current) {
              isNavigating.current = false;
              if (overlayRef.current && brandRef.current) {
                gsap.killTweensOf([overlayRef.current, brandRef.current]);
                gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.5 });
                gsap.to(brandRef.current, { opacity: 0, scale: 1.5, filter: "blur(20px)", visibility: "hidden", duration: 0.5 });
              }
            }
          }, 4000);

          try {
            router.push(href);
          } catch (error) {
            console.error("Router push failed:", error);
            // If it failed immediately, don't wait 4s
            clearTimeout(timeoutId);
            isNavigating.current = false;
            gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.5 });
          }
        }
      });

      tl.to(overlay, { opacity: 1, duration: 0.22, ease: "power2.out" });
      tl.to(brand, {
        opacity: 0.7,
        filter: "blur(0px)",
        duration: 0.25,
        ease: "power2.out",
      }, "-=0.1");
    },
    [router, pathname]
  );

  // Prefetch critical routes
  useEffect(() => {
    router.prefetch("/contact");
    router.prefetch("/portfolio");
  }, [router]);

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}

      {/* Single solid overlay — opacity-based, no slices */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-all flex items-center justify-center"
        style={{ opacity: 1, backgroundColor: "#030305" }}
        aria-hidden="true"
      >
        {/* Centered Brand Text */}
        <h1
          ref={brandRef}
          className="font-display font-black text-white text-[clamp(2.5rem,8vw,7rem)] uppercase tracking-tighter leading-none select-none whitespace-nowrap"
          style={{ opacity: 1, filter: "blur(0px)", visibility: "visible" }}
        >
          XENOTECT
        </h1>
      </div>
    </PageTransitionContext.Provider>
  );
}
