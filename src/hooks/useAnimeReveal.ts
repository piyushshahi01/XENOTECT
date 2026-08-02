import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface UseAnimeRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  distance?: string;
  stagger?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function useAnimeReveal<T extends HTMLElement>(options: UseAnimeRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    duration = 800,
    distance = '40px',
    stagger: staggerDelay = 0,
    easing = 'outExpo',
    direction = 'up',
  } = options;

  const ref = useRef<T>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Initial State Setup
    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return `translateY(${distance})`;
        case 'down': return `translateY(-${distance})`;
        case 'left': return `translateX(${distance})`;
        case 'right': return `translateX(-${distance})`;
      }
    };
    
    // Setup targets list based on whether we are staggering children
    let target: HTMLElement | NodeListOf<HTMLElement> | Element[] = element;
    let targetsList: Element[] = [];
    
    if (staggerDelay > 0 && element.children.length > 0) {
      const children = element.querySelectorAll('.anime-child');
      if (children.length === 0) {
        targetsList = Array.from(element.children);
      } else {
        targetsList = Array.from(children);
      }
      target = targetsList;
    } else {
      targetsList = [element];
    }

    if (!hasRevealed) {
      // Set initial styles on the targets that will be animated
      targetsList.forEach(t => {
        (t as HTMLElement).style.opacity = '0';
        (t as HTMLElement).style.transform = getInitialTransform();
      });
      // If we are staggering children, make sure the parent itself is visible
      if (staggerDelay > 0) {
        element.style.opacity = '1';
        element.style.transform = 'none';
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasRevealed || !triggerOnce)) {
          
          animate(target, {
            opacity: [0, 1],
            y: direction === 'up' || direction === 'down' ? [getInitialTransform().match(/-?\d+(px|rem|%)/)?.[0] || '40px', 0] : 0,
            x: direction === 'left' || direction === 'right' ? [getInitialTransform().match(/-?\d+(px|rem|%)/)?.[0] || '40px', 0] : 0,
            duration,
            delay: staggerDelay > 0 ? stagger(staggerDelay, { start: delay }) : delay,
            ease: easing,
          });

          setHasRevealed(true);
        } else if (!entry.isIntersecting && !triggerOnce) {
            targetsList.forEach(t => {
              (t as HTMLElement).style.opacity = '0';
              (t as HTMLElement).style.transform = getInitialTransform();
            });
            setHasRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, duration, distance, stagger, easing, direction, hasRevealed]);

  return ref;
}
