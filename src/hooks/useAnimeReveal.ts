"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimeRevealOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  animationProps?: any;
  staggerDelay?: number;
}

export function useAnimeReveal({
  selector = ".scroll-reveal-anime",
  threshold = 0.15,
  rootMargin = "0px",
  animationProps = {
    y: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    ease: "outCubic"
  },
  staggerDelay = 0
}: AnimeRevealOptions = {}) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll(selector);
    
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            
            // Mark as animating so we don't re-trigger immediately if scrolling fast
            if (el.dataset.animeTriggered === "true") return;
            el.dataset.animeTriggered = "true";

            // Trigger the animation
            animate(el, animationProps);

            // Unobserve after triggering if we only want it to happen once
            observer.unobserve(el);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach((el) => {
      // Set initial state before animation starts so it doesn't flicker
      if (!(el as HTMLElement).dataset.animeTriggered) {
        if (animationProps.opacity) {
          const startOpacity = Array.isArray(animationProps.opacity) ? animationProps.opacity[0] : 0;
          (el as HTMLElement).style.opacity = String(startOpacity);
        }
        if (animationProps.y || animationProps.translateY) {
          const transY = animationProps.y || animationProps.translateY;
          const startY = Array.isArray(transY) ? transY[0] : 0;
          (el as HTMLElement).style.transform = `translateY(${startY}px)`;
        }
      }
      
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, threshold, rootMargin, animationProps]);
}
