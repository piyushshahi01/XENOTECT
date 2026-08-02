/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface FadeInProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: any;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = "div",
  ...rest
}: FadeInProps) {
  // eslint-disable-next-line react-hooks/static-components
  const Component = React.useMemo(() => motion.create(as as any), [as]);
  return (
    <Component
      initial={{ opacity: 0, x, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20 }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
