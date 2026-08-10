"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

export interface HoverFeatureCard {
  name: string;
  description: string;
  href?: string;
  img?: string;
  imgLight?: string;
  imgClassName?: string;
  imgWidth?: number;
  icon?: React.ReactNode;
  containerClassName?: string;
  fadeBottom?: boolean;
  soon?: boolean;
}

export interface HoverFeatureCardsProps {
  items: HoverFeatureCard[];
  className?: string;
  renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
}

function HoverFeatureCard({
  item,
  renderLink,
}: {
  item: HoverFeatureCard;
  renderLink?: HoverFeatureCardsProps["renderLink"];
}) {
  const inner = (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: item.href && !item.soon ? 0.97 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      variants={{ rest: { scale: 1, y: 0 } }}
      className={cn(
        "group flex flex-col w-full relative",
        item.soon
          ? "opacity-80 cursor-not-allowed"
          : item.href
            ? "cursor-pointer"
            : "",
      )}
    >
      <div
        className={cn(
          "flex flex-col rounded-3xl border h-64 z-5 bg-[#050505]/60 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-colors w-full",
          !item.soon && item.href ? "hover:border-white/20" : "",
          item.soon ? "border-dashed border-white/5" : "border-white/10",
        )}
      >
        {item.soon && (
          <span className="absolute top-3 right-3 z-10 text-xs text-muted-foreground border rounded-full px-2 py-1 bg-card">
            Coming soon
          </span>
        )}

        <div
          className={cn(
            "relative w-full h-full overflow-hidden px-6 pt-6 pb-4 flex flex-col gap-4 items-center justify-center text-center",
            item.containerClassName,
          )}
        >
          {item.icon && (
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.05]">
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
            </div>
          )}
          <span
            className={cn(
              "font-medium text-2xl tracking-tight text-white/90",
              item.soon ? "text-neutral-400" : "text-white",
            )}
          >
            {item.name}
          </span>

          {item.img && (
            <Image
              src={item.img}
              alt={item.name}
              width={item.imgWidth ?? 200}
              height={200}
              className={cn("h-auto hidden dark:block mt-auto", item.imgClassName)}
            />
          )}
          {(item.imgLight ?? item.img) && (
            <Image
              src={item.imgLight ?? item.img ?? ""}
              alt={item.name}
              width={item.imgWidth ?? 200}
              height={200}
              className={cn("h-auto dark:hidden mt-auto", item.imgClassName)}
            />
          )}

          {item.fadeBottom && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-22 bg-gradient-to-t from-black/80 to-transparent" />
          )}
        </div>
      </div>

      <motion.div
        variants={{
          rest: { opacity: 0, y: -20 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="overflow-hidden z-1 w-11/12 self-center -mt-4 relative"
      >
        <div className="py-4 px-6 rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-2xl">
          <p className="text-sm font-light leading-relaxed text-white/60 text-center">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  if (item.href && renderLink) {
    return renderLink(item.href, inner);
  }

  return inner;
}

function HoverFeatureCards({
  items,
  className,
  renderLink,
}: HoverFeatureCardsProps) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 w-full", className)}
    >
      {items.map((item) => (
        <HoverFeatureCard key={item.name} item={item} renderLink={renderLink} />
      ))}
    </div>
  );
}

export { HoverFeatureCards, HoverFeatureCard };
