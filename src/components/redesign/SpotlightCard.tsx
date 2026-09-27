"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { usePortfolioTheme } from "./ThemeContext";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  ...props
}: SpotlightCardProps) {
  const { palette } = usePortfolioTheme();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const activeColor = spotlightColor || palette.primary;
  const background = useMotionTemplate`radial-gradient(
    320px circle at ${mouseX}px ${mouseY}px,
    ${activeColor}22,
    transparent 80%
  )`;

  const borderMask = useMotionTemplate`radial-gradient(
    220px circle at ${mouseX}px ${mouseY}px,
    ${activeColor}99,
    transparent 70%
  )`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${className}`}
      style={{
        backgroundColor: palette.cardDark,
        borderColor: palette.borderDark,
      }}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Inner Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background,
        }}
      />

      {/* Dynamic Border Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderMask,
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
