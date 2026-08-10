import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { animate, utils } from 'animejs';
import { ReactLenis } from 'lenis/react';
import { SolarSystem } from './SolarSystem';
import { usePageTransition } from "@/components/ui/PageTransition";
import Image from 'next/image';
import { ArrowUpRight, Globe, BrainCircuit, TrendingUp, Mic, Smartphone, Zap, Plus, User, Paintbrush, Sparkles } from 'lucide-react';

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
  icon?: React.ReactNode;
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
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full h-full rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#121316]/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(255,255,255,0.05)] hover:border-white/20 cursor-pointer min-h-[360px] sm:min-h-[420px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      {/* 0. Dynamic Hover Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 154, 240, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0 border border-transparent"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 60%
            )
          `,
          WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

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
            className="font-black text-neutral-400 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {srv.number}
          </span>
          {srv.icon && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 text-white/50 flex items-center justify-center">
              {srv.icon}
            </div>
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
          <div className="mt-8 flex items-center gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#a89af0] opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-[#a89af0]/10 transition-colors">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span>Explore</span>
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
    icon: <Globe strokeWidth={1.5} className="w-full h-full" />,
    link: '/services/web-solutions',
  },
  {
    number: '02',
    name: 'AI Solutions',
    description:
      'Custom artificial intelligence integrations, smart workflows, and predictive models designed to transform business operations and unlock new growth.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    icon: <BrainCircuit strokeWidth={1.5} className="w-full h-full" />,
    link: '/services/ai-solutions',
  },
  {
    number: '03',
    name: 'Digital Marketing',
    description:
      'Data-driven marketing strategies, SEO optimization, and targeted campaigns that amplify brand visibility and drive measurable conversions.',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    icon: <TrendingUp strokeWidth={1.5} className="w-full h-full" />,
    link: '/services/growth-solutions',
  },
  {
    number: '04',
    name: 'Voice AI Agents',
    description:
      'Advanced conversational voice AI assistants capable of handling real-time customer support, scheduling, and lead qualification with human-like speech.',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    icon: <Mic strokeWidth={1.5} className="w-full h-full" />,
    link: '/services/ai-solutions',
  },
  {
    number: '05',
    name: 'Social Media',
    description:
      'Engaging content creation, community management, and paid social strategies that build brand loyalty and maximize audience engagement.',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    icon: <Smartphone strokeWidth={1.5} className="w-full h-full" />,
    link: '/services/growth-solutions',
  },
  {
    number: '06',
    name: 'Automation & CRM',
    description:
      'Seamless business automation, pipeline integrations, and custom CRM architectures that eliminate repetitive tasks and streamline team efficiency.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    icon: <Zap strokeWidth={1.5} className="w-full h-full" />,
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
    title: 'Full-Stack Engineering',
    category: 'Web & Mobile',
    description:
      'High-performance web applications, scalable cloud architectures, and seamless digital platforms built with modern frameworks and robust backend systems.',
    gradient: 'from-[#B600A8] via-[#7621B0] to-transparent',
    iconColor: 'text-[#F9A8D4]', // Soft vibrant pink
    icon: <Globe strokeWidth={1.5} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />,
  },
  {
    id: '02',
    title: 'Enterprise AI Solutions',
    category: 'Artificial Intelligence',
    description:
      'Custom LLM integrations, autonomous voice agents, and data-driven automation pipelines designed to streamline operations and scale business intelligence.',
    gradient: 'from-[#00D1FF] via-[#7621B0] to-transparent',
    iconColor: 'text-[#67E8F9]', // Soft vibrant cyan
    icon: <BrainCircuit strokeWidth={1.5} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />,
  },
  {
    id: '03',
    title: 'Growth & Acquisition',
    category: 'Digital Marketing',
    description:
      'Data-led marketing strategies, conversion rate optimization, SEO, and targeted ad campaigns that drive measurable growth and maximize ROI.',
    gradient: 'from-[#BE4C00] via-[#B600A8] to-transparent',
    iconColor: 'text-[#FDBA74]', // Soft vibrant orange
    icon: <TrendingUp strokeWidth={1.5} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />,
  },
  {
    id: '04',
    title: 'Immersive Experiences',
    category: 'Interactive Web',
    description:
      'Fluid animations, high-performance WebGL, premium glassmorphism interfaces, and interactive browser experiences built for high-impact digital showcases.',
    gradient: 'from-[#7621B0] via-[#18011F] to-transparent',
    iconColor: 'text-[#D8B4FE]', // Soft vibrant purple
    icon: <Sparkles strokeWidth={1.5} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />,
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
        className="w-full bg-[#0C0C0C] text-white overflow-x-clip"
      >
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-between overflow-x-clip px-6 md:px-10 pt-6 md:pt-8 pb-7 sm:pb-8 md:pb-10 font-sans">
        
        {/* Fullscreen Background Video with Edge Blending and Watermark Crop */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen flex items-center justify-center"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
          }}
        >
          <video
            src="/videos/portfolio-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
<track kind='captions' />
        </div>

        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full z-20">
          <nav
            className="flex items-center justify-between w-full text-white tracking-widest text-[11px] sm:text-xs font-medium"
          >
            {/* Logo Left */}
            <div className="flex-1 flex justify-start">
              <button
                type="button"
                onClick={onBackToToonhub}
                className="hover:opacity-70 transition-opacity font-semibold tracking-wider cursor-pointer"
              >
                XD
              </button>
            </div>
            
            {/* Center Email */}
            <div className="flex-1 hidden md:flex justify-center text-white/80 lowercase tracking-widest font-sans text-[11px] sm:text-xs">
              xenotectdigital@gmail.com
            </div>

            {/* Links Right */}
            <div className="flex-1 flex justify-end gap-6 sm:gap-10 uppercase text-[11px] sm:text-xs">
              <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
              <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Work</a>
              <button onClick={() => navigateWithTransition('/contact')} className="hover:opacity-70 transition-opacity duration-200 uppercase cursor-pointer">Contact</button>
            </div>
          </nav>
        </FadeIn>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center relative w-full z-10">
          <div className="w-full flex justify-between items-center pl-12 md:pl-20">
            {/* Left Text */}
            <div className="flex-1">
              <FadeIn delay={0.2} x={-30} y={0}>
                <p className="text-[#a89af0] text-sm md:text-base font-sans tracking-widest mb-2 uppercase">
                  Digital & AI
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1] font-sans mb-4">
                  XENOTECT
                </h1>
                <p className="text-white/60 text-xs md:text-sm font-sans tracking-widest uppercase max-w-sm leading-relaxed">
                  We engineer intelligent software, immersive experiences, and scalable AI systems for forward-thinking brands.
                </p>
              </FadeIn>
            </div>

            {/* Right Text */}
            <div className="flex-1 hidden sm:flex flex-col items-end text-right pr-4 md:pr-12 mt-10">
              <FadeIn delay={0.4} x={30} y={0} className="flex flex-col items-end">
                <h2 className="text-sm md:text-base font-light tracking-[0.25em] text-white/60 uppercase leading-[1.8] text-right">
                  Premium<br/>
                  <span className="text-white font-medium">Digital Agency</span>
                </h2>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#a89af0] mt-5 opacity-70"></div>
              </FadeIn>
            </div>
          </div>

        </div>

        {/* Bottom Row: Socials (Left) + Resume/Action (Right) */}
        <div className="w-full flex justify-between items-end relative z-20">
          
          {/* Social Icons (Far Left, Bottom Aligned) */}
          <FadeIn delay={0.3} x={-20} y={0} className="flex flex-col gap-7 text-white items-center">
            <a href="#" className="hover:text-white/70 transition-colors hover:-translate-y-1 transform duration-200">
              <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="hover:text-white/70 transition-colors hover:-translate-y-1 transform duration-200">
              <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="hover:text-white/70 transition-colors hover:-translate-y-1 transform duration-200">
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white/70 transition-colors hover:-translate-y-1 transform duration-200">
              <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </FadeIn>

          {/* Bottom Right Action */}
          <FadeIn delay={0.6} y={20}>
            <button
              onClick={() => navigateWithTransition('/contact')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold font-sans cursor-pointer group"
            >
              CONTACT US <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
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

      {/* 3. ULTRA-PREMIUM ABOUT SECTION */}
      <section
        id="about"
        className="w-full bg-[#050505] min-h-[85vh] px-5 sm:px-8 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="w-full max-w-[1400px] flex flex-col gap-8 md:gap-16 relative z-10">
          
          {/* Top Label */}
          <FadeIn delay={0} y={20}>
            <p className="text-neutral-400 uppercase tracking-[0.3em] text-xs font-semibold">
              [ 01 &mdash; The Studio ]
            </p>
          </FadeIn>

          {/* Massive Statement */}
          <div className="w-full max-w-5xl">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                }
              }}
              className="text-white text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tighter font-medium font-sans"
            >
              <span className="block overflow-hidden pb-1 sm:pb-2">
                <motion.span 
                  className="inline-block" 
                  variants={{ 
                    hidden: { y: "100%", opacity: 0, rotate: 2 }, 
                    visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } 
                  }}
                >
                  We don't follow
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1 sm:pb-2">
                <motion.span 
                  className="inline-block" 
                  variants={{ 
                    hidden: { y: "100%", opacity: 0, rotate: 2 }, 
                    visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } 
                  }}
                >
                  the future.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1 sm:pb-2">
                <motion.span 
                  className="inline-block text-[#a89af0] font-instrument italic pr-4" 
                  variants={{ 
                    hidden: { y: "100%", opacity: 0, rotate: 2 }, 
                    visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } 
                  }}
                >
                  We engineer it.
                </motion.span>
              </span>
            </motion.h2>
          </div>

          {/* Grid Layout for Copy */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-white/10 mt-4 md:mt-8">
            
            <div className="md:col-span-4">
              <FadeIn delay={0.2} y={30}>
                <h3 className="text-white/90 text-xl font-medium tracking-wide mb-6">
                  Who We Are
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed font-light pr-4">
                  Xenotect Digital is a technology and digital growth company focused on building the future of business. We operate at the intersection of design, engineering, and performance.
                </p>
              </FadeIn>
            </div>
            
            <div className="md:col-span-4">
              <FadeIn delay={0.3} y={30}>
                <h3 className="text-white/90 text-xl font-medium tracking-wide mb-6">
                  What We Do
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed font-light pr-4">
                  We design and develop high-performance digital experiences, intelligent AI solutions, automation systems, and aggressive growth strategies that help businesses scale faster.
                </p>
              </FadeIn>
            </div>
            
            <div className="md:col-span-4">
              <FadeIn delay={0.4} y={30}>
                <h3 className="text-white/90 text-xl font-medium tracking-wide mb-6">
                  The Result
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed font-light pr-4">
                  Whether it's a web application, an AI voice agent, or an automated workflow &mdash; we bring technology and creativity together to turn ambitious ideas into real-world market dominance.
                </p>
                <div className="mt-10">
                  <ContactButton />
                </div>
              </FadeIn>
            </div>

          </div>
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
              <div
                key={proj.id}
                className="sticky w-full"
                style={{
                  top: `${96 + index * 24}px`,
                  zIndex: index,
                }}
              >
                <motion.div
                  className="w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-5 md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
                  style={{
                    scale,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-4 border-b border-white/10 pb-4 sm:pb-5">
                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                      <span
                        className="font-black leading-none text-[#D7E2EA]"
                        style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
                      >
                        {proj.id}
                      </span>
                      <h3
                        className="font-bold uppercase text-white leading-tight"
                        style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}
                      >
                        {proj.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full border border-white/30 text-[10px] sm:text-xs font-light uppercase tracking-wider text-white/80">
                        {proj.category}
                      </span>
                    </div>

                    <LiveProjectButton href={(proj as any).link} />
                  </div>

                  {/* Bottom row: Two-column image grid */}
                  <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                    {/* Left Column (40%) - 2 stacked images */}
                    <div className="lg:w-[40%] flex flex-col gap-3 sm:gap-4">
                      <div className="w-full relative overflow-hidden rounded-[16px] sm:rounded-[24px] bg-white/5 aspect-[21/9] sm:aspect-[2.5/1]">
                        <Image src={proj.col1Img1} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                      <div className="w-full relative overflow-hidden rounded-[16px] sm:rounded-[24px] bg-white/5 aspect-[21/9] sm:aspect-[2.5/1]">
                        <Image src={proj.col1Img2} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                    </div>

                    {/* Right Column (60%) - 1 tall image */}
                    <div className="lg:w-[60%] flex">
                      <div className="w-full relative min-h-[250px] sm:min-h-[300px] lg:h-full overflow-hidden rounded-[16px] sm:rounded-[24px] bg-white/5 aspect-video lg:aspect-auto">
                        <Image src={(proj as any).col2Img} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
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

        {/* Background Glowing Orbs for True Glassmorphism */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#B600A8]/40 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-80 -right-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#00D1FF]/25 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] sm:w-[800px] sm:h-[400px] bg-[#BE4C00]/25 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

        {/* Specialities Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-28 sm:mb-36 md:mb-44 relative z-10">
          {SPECIALITIES_DATA.map((item, idx) => (
            <FadeIn
              key={item.id}
              delay={idx * 0.1}
              y={30}
              className="group relative rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 md:p-12 border border-white/10 bg-white/[0.04] backdrop-blur-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_24px_60px_rgba(182,0,168,0.15)] min-h-[420px]"
            >
              {/* Glass edge inner highlight for that bevel look */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[inherit]" />
              
              {/* Subtle inner corner glare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.06] to-transparent rounded-bl-full pointer-events-none z-0" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10 sm:mb-12">
                  <span className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.iconColor} shadow-[inset_0_1px_4px_rgba(255,255,255,0.15)] backdrop-blur-md`}>
                    {item.icon}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-5 leading-[1.1] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/80 max-w-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-semibold relative z-10 group-hover:text-white transition-colors duration-300">
                <span>{item.id} &mdash; CAPABILITY</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">EXPLORE <ArrowUpRight className="inline w-3 h-3 ml-1 -mt-0.5" /></span>
              </div>
            </FadeIn>
          ))}
        </div>

      </section>

      {/* 6. TECH STACK SECTION */}
      <section
        id="techstack-section"
        className="relative w-full bg-black text-white flex flex-col items-center overflow-hidden z-30 pb-20 pt-16 sm:pt-24"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video/video.webm" type="video/webm" />
          </video>
          {/* Pure black overlay to remove any warm/orange tints */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#111114] to-transparent z-20" />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0C0C0C] to-transparent z-20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
          <div className="mb-12 sm:mb-16">
            <h2
              className="hero-heading uppercase text-center leading-none bg-gradient-to-b from-white to-[#c2a4ff] bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(3rem, 7vw, 70px)' }}
            >
              Tech Stack
            </h2>
          </div>

          <FadeIn delay={0.2} y={30} className="w-full">
            <SolarSystem />
          </FadeIn>
        </div>
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
