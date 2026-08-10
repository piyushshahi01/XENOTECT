import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animate, utils } from 'animejs';
import { ReactLenis } from 'lenis/react';
import { SolarSystem } from './SolarSystem';
import { usePageTransition } from "@/components/ui/PageTransition";
import Image from 'next/image';

// --- REUSABLE COMPONENTS ---

interface ContactButtonProps {
  className?: string;
}

export function ContactButton({ className = '' }: ContactButtonProps) {
  const { navigateWithTransition } = usePageTransition();
  return (
    <button
      type="button"
      onClick={() => navigateWithTransition('/contact')}
      className={`rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer outline outline-2 outline-white -outline-offset-3 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      Contact Us
    </button>
  );
}

export function LiveProjectButton({ href }: { href?: string }) {
  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 cursor-pointer inline-flex items-center justify-center"
      style={{ textDecoration: 'none' }}
    >
      Live Project
    </a>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Title Animation
export function StaggeredTitle({ text, className }: { text: string, className?: string }) {
  const letters = text.split("");
  return (
    <motion.h1 
      className={`flex overflow-hidden justify-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.04 } }
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
          }}
          className={char === " " ? "w-[0.3em]" : "inline-block"}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export function Magnet({ children, padding = 150, strength = 3, className = '' }: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < Math.max(rect.width, rect.height) / 2 + padding) {
        setIsHovered(true);
        setPosition({
          x: distanceX / strength,
          y: distanceY / strength,
        });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
          transition: isHovered ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function AnimatedChar({ char, start, end, scrollYProgress }: { char: string; start: number; end: number; scrollYProgress: any }) {
  const charOpacity = useTransform(scrollYProgress, [start, Math.min(1, end)], [0.15, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity: charOpacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = '', style = {} }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.3'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center gap-[0.28em] ${className}`} style={style}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const currentIdx = charCounter++;
              const start = currentIdx / totalChars;
              const end = start + 1.2 / totalChars;

              return (
                <AnimatedChar
                  key={charIdx}
                  char={char}
                  start={start}
                  end={end}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

// --- DATA ---

const MARQUEE_IMAGES = [
  ...Array(4).fill([
    { url: '/videos/project-1.mp4', link: 'https://velvet-roast-alpha.vercel.app/' },
    { url: '/videos/project-2.mp4', link: 'https://forge-orpin-eight.vercel.app/' },
    { url: '/videos/project-3.mp4', link: 'https://himanshu-store-grocery-app.vercel.app/' },
    { url: '/videos/project-4.mp4', link: 'https://ether-eight-dusky.vercel.app/' },
    { url: '/videos/cinepass.mp4', link: 'https://cinepass-pink.vercel.app/' },
  ]).flat()
];

// --- BLINDS REVEAL EFFECT (Framer Remix for Services) ---
const barDurations = [0.6, 0.5, 0.7, 0.4, 0.6, 0.6];
const barDelaysOpen = [0.15, 0.2, 0.1, 0.3, 0.05, 0.25];
const barDelaysClose = [0.15, 0.2, 0.1, 0.3, 0.05, 0.05];

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  image: string;
  icon?: string;
  link?: string;
}

function ServicesSparkles() {
  // Stable deterministic sparkles
  const sparkles = React.useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${(i * 17 + 13) % 95}%`,
      left: `${(i * 29 + 7) % 95}%`,
      size: (i % 3 === 0) ? 14 : (i % 2 === 0) ? 8 : 4,
      delay: (i % 5) * 0.7,
      duration: 2.5 + (i % 4) * 0.8,
      symbol: (i % 4 === 0) ? '✦' : (i % 3 === 0) ? '✧' : '•',
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle radial ambient glow in corners */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px]" />

      {sparkles.map((sp) => (
        <motion.span
          key={sp.id}
          className="absolute select-none text-white/60 font-serif flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            top: sp.top,
            left: sp.left,
            fontSize: `${sp.size}px`,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut",
          }}
        >
          {sp.symbol}
        </motion.span>
      ))}
    </div>
  );
}

function ServiceCardReveal({ srv }: { srv: ServiceItem }) {
  const [hovered, setHovered] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  return (
    <div
      className="group relative w-full h-full rounded-[32px] sm:rounded-[40px] border border-white/15 bg-[#121316]/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)] hover:border-white/40 cursor-pointer min-h-[360px] sm:min-h-[420px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      {/* 1. Normal Content (fades and moves on hover) */}
      <motion.div
        className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none"
        animate={{
          opacity: hovered ? 0.03 : 1,
          y: hovered ? -10 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="flex items-center justify-between w-full mb-8">
          <span
            className="font-black text-white/30 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {srv.number}
          </span>
          {srv.icon && (
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 text-white flex items-center justify-center opacity-90"
              dangerouslySetInnerHTML={{ __html: srv.icon }}
            />
          )}
        </div>

        <div className="mt-auto">
          <h3
            className="font-black uppercase tracking-tight text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
          >
            {srv.name}
          </h3>
          <p
            className="font-light text-white/70 leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
          >
            {srv.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80 py-2 px-4 rounded-full border border-white/20 bg-white/5">
            <span>Hover to reveal</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </motion.div>

      {/* 2. Blinds Reveal Layer (Vertical Slats revealing Image) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex w-full h-full overflow-hidden rounded-[inherit]">
        {barDurations.map((duration, i) => {
          const numBars = barDurations.length;
          const widthPercent = 100 / numBars;

          return (
            <motion.div
              key={i}
              className="relative h-full overflow-hidden bg-[#0C0C0C]"
              style={{
                width: `${widthPercent}%`,
                transformOrigin: hovered ? 'bottom' : 'top',
              }}
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: hovered ? 1 : 0,
              }}
              transition={{
                duration: duration,
                delay: hovered ? barDelaysOpen[i] : barDelaysClose[i],
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Inner container to keep image continuous across bars */}
              <div
                className="absolute top-0 bottom-0 h-full max-w-none"
                style={{
                  width: `${numBars * 100}%`,
                  left: `-${i * 100}%`,
                }}
              >
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                {/* Subtle dark overlay on image for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/20 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Revealed Hover Content (Overlay that slides in when blinds open) */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
        }}
        transition={{
          duration: 0.4,
          delay: hovered ? 0.25 : 0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="flex items-center justify-between w-full">
          <span className="font-black text-white/50 text-3xl sm:text-4xl">
            {srv.number}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
            {srv.name}
          </span>
        </div>

        <div className="mt-auto">
          <h3
            className="font-black uppercase tracking-tight text-white mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
          >
            {srv.name}
          </h3>
          <p className="font-light text-white/90 text-sm sm:text-base line-clamp-3 mb-6">
            {srv.description}
          </p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (srv.link) navigateWithTransition(srv.link);
            }}
            className="pointer-events-auto inline-flex items-center gap-3 font-bold uppercase text-xs sm:text-sm tracking-widest bg-white text-[#0C0C0C] px-6 py-3 rounded-full shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105"
          >
            <span>Explore Service</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Web Development',
    description:
      'High-performance, responsive websites and scalable web applications built with modern frameworks, clean architecture, and intuitive user experiences.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">🌐</span>`,
    link: '/services/web-solutions',
  },
  {
    number: '02',
    name: 'AI Solutions',
    description:
      'Custom artificial intelligence integrations, smart workflows, and predictive models designed to transform business operations and unlock new growth.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">🤖</span>`,
    link: '/services/ai-solutions',
  },
  {
    number: '03',
    name: 'Digital Marketing',
    description:
      'Data-driven marketing strategies, SEO optimization, and targeted campaigns that amplify brand visibility and drive measurable conversions.',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">📈</span>`,
    link: '/services/growth-solutions',
  },
  {
    number: '04',
    name: 'Voice AI Agents',
    description:
      'Advanced conversational voice AI assistants capable of handling real-time customer support, scheduling, and lead qualification with human-like speech.',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">🎙️</span>`,
    link: '/services/ai-solutions',
  },
  {
    number: '05',
    name: 'Social Media',
    description:
      'Engaging content creation, community management, and paid social strategies that build brand loyalty and maximize audience engagement.',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">📱</span>`,
    link: '/services/growth-solutions',
  },
  {
    number: '06',
    name: 'Automation & CRM',
    description:
      'Seamless business automation, pipeline integrations, and custom CRM architectures that eliminate repetitive tasks and streamline team efficiency.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    icon: `<span class="text-3xl sm:text-4xl leading-none">⚡</span>`,
    link: '/services/ai-solutions',
  },
];

const PROJECTS_DATA = [
  {
    id: '01',
    title: 'Velvet Roast',
    category: 'Client',
    link: 'https://velvet-roast-alpha.vercel.app/',
    col1Img1:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1280&q=80',
    col1Img2:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1280&q=80',
    col2Img:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: '02',
    title: 'FORGE — Premium Fitness Club',
    category: 'Client',
    link: 'https://forge-orpin-eight.vercel.app/',
    col1Img1:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1280&q=80',
    col1Img2:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1280&q=80',
    col2Img:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: '03',
    title: 'Himanshu Store — Grocery App',
    category: 'Client',
    link: 'https://himanshu-store-grocery-app.vercel.app/',
    col1Img1:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1280&q=80',
    col1Img2:
      'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1280&q=80',
    col2Img:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1280&q=80',
  },
];

const SPECIALITIES_DATA = [
  {
    id: '01',
    title: '3D Character Modeling & Sculpting',
    category: 'Characters & Creatures',
    description:
      'High-fidelity anatomical sculpting, expressive facial rigging, clean topology, and stylized character designs optimized for animation, games, and cinematic collectibles.',
    gradient: 'from-[#B600A8]/20 via-[#7621B0]/10 to-transparent',
    icon: '👤',
  },
  {
    id: '02',
    title: 'Stylized Environments & Worlds',
    category: 'World Building',
    description:
      'Immersive 3D environments, atmospheric volumetric lighting, rich stylized foliage, and custom prop assets created to bring captivating narrative universes to life.',
    gradient: 'from-[#646973]/20 via-[#BBCCD7]/10 to-transparent',
    icon: '🌍',
  },
  {
    id: '03',
    title: 'Real-Time LookDev & Shading',
    category: 'Shaders & PBR',
    description:
      'Custom node-based procedural shaders, ultra-realistic PBR texturing, surface imperfection detailing, and real-time lighting pipelines for high-performance digital environments.',
    gradient: 'from-[#BE4C00]/20 via-[#B600A8]/10 to-transparent',
    icon: '🎨',
  },
  {
    id: '04',
    title: 'Motion Graphics & 3D Web',
    category: 'Interactive & FX',
    description:
      'Fluid particle simulations, dynamic motion animations, physics VFX, and interactive 3D browser experiences built for high-impact digital showcases.',
    gradient: 'from-[#7621B0]/20 via-[#18011F]/20 to-transparent',
    icon: '⚡',
  },
];


interface JackPortfolioProps {
  onBackToToonhub: () => void;
}

export default function JackPortfolio({ onBackToToonhub }: JackPortfolioProps) {
  const { navigateWithTransition } = usePageTransition();
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '80%']);
  const heroTextOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroImageY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    document.title = 'Xeno — 3D Creator';

    // --- Premium Entrance Animation ---
    if (typeof window !== "undefined") {
      animate('.portfolio-curtain', {
        scaleY: [1, 0],
        transformOrigin: ['50% 100%', '50% 0%'],
        duration: 1200,
        ease: 'inOutExpo',
        delay: utils.stagger(150)
      });
    }

    const handleScroll = () => {
      if (!marqueeSectionRef.current) return;
      const sectionTop = marqueeSectionRef.current.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Items = [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)];
  const row2Items = [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)];

  return (
    <ReactLenis root>
      {/* Entrance Curtains */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex">
        <div className="portfolio-curtain w-1/4 h-full bg-[#0C0C0C] origin-top border-r border-white/5"></div>
        <div className="portfolio-curtain w-1/4 h-full bg-[#0C0C0C] origin-top border-r border-white/5"></div>
        <div className="portfolio-curtain w-1/4 h-full bg-[#0C0C0C] origin-top border-r border-white/5"></div>
        <div className="portfolio-curtain w-1/4 h-full bg-[#0C0C0C] origin-top"></div>
      </div>

      <div
        className="w-full bg-[#0C0C0C] text-white font-kanit overflow-x-clip"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-between overflow-x-clip px-6 md:px-10 pt-6 md:pt-8 pb-7 sm:pb-8 md:pb-10">
        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full z-20">
          <nav
            className="flex items-center justify-between w-full text-[#D7E2EA] font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <button
              type="button"
              onClick={onBackToToonhub}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer flex items-center gap-2 text-white bg-white/10 px-4 py-1.5 rounded-full text-xs sm:text-sm shrink-0 font-mono"
            >
              ← HOME
            </button>
            <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-8 md:gap-12 lg:gap-16 mx-auto flex-1 px-4">
              <a href="#about" className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
                About Us
              </a>
              <a href="#services" className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
                Price
              </a>
              <a href="#projects" className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
                Project
              </a>
              <a href="#specialities" className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
                Specialities
              </a>
              <a href="#techstack" className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
                TechStack
              </a>
              <button onClick={() => navigateWithTransition('/contact')} className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap uppercase cursor-pointer">
                Contact
              </button>
            </div>
          </nav>
        </FadeIn>

        {/* Hero Heading with Parallax */}
        <motion.div 
          className="overflow-hidden w-full z-10 my-auto flex items-center justify-center text-center"
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <div className="w-full flex justify-center text-center">
            <StaggeredTitle 
              text="XENOTECT DIGITAL"
              className="hero-heading font-bold uppercase tracking-tighter leading-none whitespace-nowrap w-full text-center text-[8vw] sm:text-[9vw] md:text-[10vw] lg:text-[11vw]"
            />
          </div>
        </motion.div>



        {/* Bottom bar */}
        <div className="flex items-end justify-between w-full relative z-20">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[280px] md:max-w-[340px]"
              style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.35rem)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              We&apos;re here to Connect Visionaries with Exceptional Talent
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section
        ref={marqueeSectionRef}
        className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
      >
        {/* Row 1 */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translate3d(${scrollOffset - 200}px, 0, 0)` }}
        >
          {row1Items.map((item, i) => (
            <a 
              key={`row1-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer transition-transform duration-300 hover:scale-[1.02] shrink-0 w-[420px]"
            >
              {item.url.endsWith('.mp4') ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[270px] rounded-2xl object-cover bg-white/5"
                />
              ) : (
                <Image
                  src={item.url}
                  alt="Portfolio Item"
                  width={420}
                  height={270}
                  className="w-full h-[270px] rounded-2xl object-cover bg-white/5"
                />
              )}
            </a>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translate3d(${-(scrollOffset - 200)}px, 0, 0)` }}
        >
          {row2Items.map((item, i) => (
            <a 
              key={`row2-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer transition-transform duration-300 hover:scale-[1.02] shrink-0 w-[420px]"
            >
              {item.url.endsWith('.mp4') ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[270px] rounded-2xl object-cover bg-white/5"
                />
              ) : (
                <img
                  src={item.url}
                  alt=""
                  loading="lazy"
                  className="w-full h-[270px] rounded-2xl object-cover bg-white/5"
                />
              )}
            </a>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className="w-full min-h-screen px-5 sm:px-8 md:px-10 py-20 relative flex flex-col items-center justify-center"
      >
        {/* Decorative Corner Images */}
        <FadeIn
          delay={0.1}
          duration={0.9}
          x={-80}
          y={0}
          className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt=""
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl animate-pulse"
          />
        </FadeIn>

        <FadeIn
          delay={0.25}
          duration={0.9}
          x={-80}
          y={0}
          className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt=""
            className="w-[100px] sm:w-[140px] md:w-[180px] object-contain drop-shadow-xl"
          />
        </FadeIn>

        <FadeIn
          delay={0.15}
          duration={0.9}
          x={80}
          y={0}
          className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt=""
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl"
          />
        </FadeIn>

        <FadeIn
          delay={0.3}
          duration={0.9}
          x={80}
          y={0}
          className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt=""
            className="w-[130px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-xl"
          />
        </FadeIn>

        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About Us
          </h2>
        </FadeIn>

        {/* Xenotect Digital Content Block */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full max-w-[860px] z-20 px-4 flex flex-col items-center">
          <FadeIn delay={0.1} y={25} className="w-full mb-8 sm:mb-10">
            <AnimatedText
              text="We Build What Moves Businesses Forward."
              className="font-bold tracking-tight text-white uppercase text-center leading-snug"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)', fontFamily: "'Space Grotesk', sans-serif" }}
            />
          </FadeIn>

          <FadeIn delay={0.2} y={25} className="w-full flex flex-col gap-6 sm:gap-8 text-[#D7E2EA]/90 font-normal leading-relaxed text-base sm:text-lg md:text-xl">
            <AnimatedText
              text="Xenotect Digital is a technology and digital growth company focused on building the future of business."
            />
            <AnimatedText
              text="We design and develop high-performance digital experiences, intelligent AI solutions, automation systems, and growth strategies that help businesses operate smarter and scale faster."
            />
            <AnimatedText
              text="Whether it's a website, application, AI voice agent, automated workflow, or digital marketing strategy — we bring technology and creativity together to turn ambitious ideas into real-world impact."
            />
          </FadeIn>

          <FadeIn delay={0.3} y={25} className="mt-10 sm:mt-14 w-full text-center">
            <AnimatedText
              text="We don't follow the digital future. We build it."
              className="font-bold uppercase tracking-wide text-white bg-gradient-to-r from-[#D7E2EA] via-[#B600A8] to-[#D7E2EA] bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(1.15rem, 2.8vw, 1.8rem)', fontFamily: "'Space Grotesk', sans-serif" }}
            />
          </FadeIn>
        </div>

        {/* Contact Button below */}
        <div className="mt-14 sm:mt-18 md:mt-20 z-20">
          <ContactButton />
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section
        id="services"
        className="w-full bg-[#080808] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 overflow-hidden border-t border-white/15 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Background Sparkles Effect */}
        <ServicesSparkles />

        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none relative z-10 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {SERVICES_DATA.map((srv, i) => (
            <FadeIn
              key={srv.number}
              delay={i * 0.1}
              y={25}
              className="h-full"
            >
              <ServiceCardReveal srv={srv} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section
        id="projects"
        className="w-full bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>

        <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16">
          {PROJECTS_DATA.map((proj, index) => {
            const scale = 1 - (PROJECTS_DATA.length - 1 - index) * 0.03;

            return (
              <motion.div
                key={proj.id}
                className="sticky rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
                style={{
                  top: `${96 + index * 28}px`,
                  scale,
                }}
              >
                {/* Top row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4 border-b border-white/10 pb-6 sm:pb-8">
                  <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
                    <span
                      className="font-black leading-none text-[#D7E2EA]"
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
                    >
                      {proj.id}
                    </span>
                    <h3
                      className="font-bold uppercase text-white leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
                    >
                      {proj.title}
                    </h3>
                    <span className="px-4 py-1.5 rounded-full border border-white/30 text-xs sm:text-sm font-light uppercase tracking-wider text-white/80">
                      {proj.category}
                    </span>
                  </div>

                  <LiveProjectButton href={(proj as any).link} />
                </div>

                {/* Bottom row: Two-column image grid */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Left Column (40%) - 2 stacked images */}
                  <div className="lg:w-[40%] flex flex-col gap-4 sm:gap-6">
                    <div className="w-full relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white/5 aspect-video">
                      <Image src={proj.col1Img1} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="w-full relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white/5 aspect-[4/3]">
                      <Image src={proj.col1Img2} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>

                  {/* Right Column (60%) - 1 tall image */}
                  <div className="lg:w-[60%] flex">
                    <div className="w-full relative h-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white/5 aspect-[4/3] lg:aspect-auto">
                      <Image src={(proj as any).col2Img} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. SPECIALITIES & TECH STACK SECTION */}
      <section
        id="specialities"
        className="w-full bg-[#111114] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 px-5 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)]"
      >
        {/* Specialities Header */}
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-24 leading-none"
          style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
        >
          Specialities
        </h2>

        {/* Specialities Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-28 sm:mb-36 md:mb-44">
          {SPECIALITIES_DATA.map((item, idx) => (
            <FadeIn
              key={item.id}
              delay={idx * 0.1}
              y={30}
              className={`group relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 border border-white/10 bg-gradient-to-br ${item.gradient} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/30 shadow-xl overflow-hidden flex flex-col justify-between`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#D7E2EA]/60 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-[#D7E2EA] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#D7E2EA]/75">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                <span>{item.id} // CORE CAPABILITY</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300 text-white">→</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech Stack Anchor & Header */}
        <div id="techstack" className="pt-8 sm:pt-12">
          <h2
            className="hero-heading font-black uppercase text-center mb-6 sm:mb-8 leading-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Tech Stack
          </h2>
          <p className="text-center text-[#D7E2EA]/70 font-light max-w-2xl mx-auto mb-16 sm:mb-20 md:mb-24 text-sm sm:text-base md:text-lg uppercase tracking-wider">
            Industry-standard technologies, cloud ecosystems, and AI pipelines powering digital innovation
          </p>
        </div>

        {/* Interactive 3D Solar System Tech Stack */}
        <FadeIn delay={0.2} y={30} className="w-full">
          <SolarSystem />
        </FadeIn>
      </section>

      {/* 7. CONTACT & FOOTER SECTION */}
      <section
        id="contact"
        className="w-full bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-40 px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-44 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] text-center flex flex-col items-center justify-center"
      >
        <h3 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-8xl mb-8 max-w-4xl leading-tight">
          Let&apos;s Create Something Epic
        </h3>
        <ContactButton />
        <p className="mt-16 sm:mt-20 text-xs uppercase tracking-widest text-[#D7E2EA]/50">
          © {new Date().getFullYear()} Xeno — 3D Creator. All rights reserved.
        </p>
      </section>
    </div>
    </ReactLenis>
  );
}
