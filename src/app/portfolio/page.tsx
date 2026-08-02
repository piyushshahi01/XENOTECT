"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import JackPortfolio from '@/components/sections/portfolio/JackPortfolio';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const GRAIN_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showJackPortfolio, setShowJackPortfolio] = useState(false);

  useEffect(() => {
    // Preload all 4 images on mount
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 4;
      } else {
        return (prev + 3) % 4;
      }
    });
  }, [isAnimating]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isAnimating) {
      timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    }
    return () => clearTimeout(timeout);
  }, [isAnimating]);

  if (showJackPortfolio) {
    return <JackPortfolio onBackToToonhub={() => setShowJackPortfolio(false)} />;
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        className="relative w-full"
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant ghost text "PORTFOLIO" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(48px, 16vw, 220px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          PORTFOLIO
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, i) => {
            const isCenter = i === activeIndex;
            const isLeft = i === (activeIndex + 3) % 4;
            const isRight = i === (activeIndex + 1) % 4;
            const isBack = i === (activeIndex + 2) % 4;

            let roleStyle: React.CSSProperties = {};

            if (isCenter) {
              roleStyle = {
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: 'blur(0px)',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isMobile ? '60%' : '92%',
                bottom: isMobile ? '22%' : '0',
              };
            } else if (isLeft) {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '20%' : '30%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
              };
            } else if (isRight) {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '80%' : '70%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
              };
            } else if (isBack) {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(4px)',
                opacity: 1,
                zIndex: 5,
                left: '50%',
                height: isMobile ? '13%' : '22%',
                bottom: isMobile ? '32%' : '12%',
              };
            }

            return (
              <div
                key={item.src}
                className="absolute"
                style={{
                  aspectRatio: '0.6 / 1',
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity, left',
                  ...roleStyle,
                }}
              >
                <img
                  src={item.src}
                  alt={`Portfolio item ${i + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-12 left-4 sm:bottom-32 sm:left-24 text-white"
          style={{
            zIndex: 60,
            maxWidth: '460px',
          }}
        >
          <p
            className="font-extrabold uppercase mb-2 sm:mb-3 text-2xl sm:text-[38px]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              opacity: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            XENOTECT DIGITAL
          </p>
          <p
            className="hidden sm:block text-base sm:text-[18px] font-medium tracking-wide mb-5 sm:mb-6"
            style={{
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            CONNECT VISIONARIES WITH EXCEPTIONAL TALENT
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Previous item"
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-transparent border-2 border-white text-white hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.12)] cursor-pointer"
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next item"
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-transparent border-2 border-white text-white hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.12)] cursor-pointer"
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowJackPortfolio(true);
            window.scrollTo(0, 0);
          }}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-3 text-white uppercase bg-transparent border-0 opacity-95 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          style={{
            zIndex: 60,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(16px, 2vw, 28px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
