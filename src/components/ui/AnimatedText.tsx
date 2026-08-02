/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const container = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"]
  });

  const characters = text.split("");
  
  return (
    <p ref={container} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        return <Character key={i} char={char} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}

const Character = ({ char, progress, range }: { char: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  
  if (char === " ") {
    return <span> </span>;
  }
  
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity, filter }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};
