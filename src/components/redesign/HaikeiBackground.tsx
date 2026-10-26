"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioTheme } from "./ThemeContext";

export function HaikeiBackground() {
  const { palette } = usePortfolioTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Haikei Dot Grid Mesh */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="haikei-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={palette.primary} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#haikei-grid)" />
      </svg>

      {/* Haikei Organic Blob 1 - Top Left */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${palette.primary} 0%, ${palette.secondary} 40%, transparent 70%)`,
        }}
      />

      {/* Haikei Organic Blob 2 - Top Right */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 45, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -top-24 -right-32 w-[650px] h-[650px] rounded-full blur-3xl opacity-20 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${palette.secondary} 0%, ${palette.accent} 45%, transparent 70%)`,
        }}
      />

      {/* Haikei Organic Blob 3 - Center Ambient */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, ${palette.primary} 0%, ${palette.accent} 60%, transparent 80%)`,
        }}
      />
    </div>
  );
}

/**
 * Haikei Layered Wave Divider - High quality organic SVG curve divider
 */
export function HaikeiWaveDivider({ flip = false }: { flip?: boolean }) {
  const { palette } = usePortfolioTheme();

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none my-0 py-0 ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        className="relative block w-full h-10 sm:h-14 opacity-80"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
          fill={palette.primary}
          fillOpacity="0.35"
        />
        <path
          d="M0,20 C200,110 420,-10 600,60 C780,130 1000,30 1200,60 L1200,120 L0,120 Z"
          fill={palette.accent}
          fillOpacity="0.25"
        />
      </svg>
    </div>
  );
}
