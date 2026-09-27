"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type PaletteKey = "indigo" | "emerald" | "aurora" | "amber";

export interface PaletteConfig {
  id: PaletteKey;
  name: string;
  dotColor: string;
  primary: string;
  secondary: string;
  accent: string;
  bgDark: string;
  cardDark: string;
  borderDark: string;
  glow: string;
  gradientText: string;
}

export const PALETTES: Record<PaletteKey, PaletteConfig> = {
  indigo: {
    id: "indigo",
    name: "Electric Indigo",
    dotColor: "#6366f1",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    bgDark: "#080c16",
    cardDark: "#0d1424",
    borderDark: "rgba(99, 102, 241, 0.2)",
    glow: "rgba(99, 102, 241, 0.35)",
    gradientText: "from-indigo-400 via-violet-400 to-cyan-400",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Matrix",
    dotColor: "#10b981",
    primary: "#10b981",
    secondary: "#06b6d4",
    accent: "#84cc16",
    bgDark: "#06130e",
    cardDark: "#0a1f18",
    borderDark: "rgba(16, 185, 129, 0.2)",
    glow: "rgba(16, 185, 129, 0.35)",
    gradientText: "from-emerald-400 via-teal-300 to-cyan-400",
  },
  aurora: {
    id: "aurora",
    name: "Sunset Crimson",
    dotColor: "#f43f5e",
    primary: "#f43f5e",
    secondary: "#fb923c",
    accent: "#e879f9",
    bgDark: "#13080f",
    cardDark: "#21101b",
    borderDark: "rgba(244, 63, 94, 0.2)",
    glow: "rgba(244, 63, 94, 0.35)",
    gradientText: "from-rose-400 via-pink-400 to-amber-300",
  },
  amber: {
    id: "amber",
    name: "Solar Amber",
    dotColor: "#f59e0b",
    primary: "#f59e0b",
    secondary: "#fbbf24",
    accent: "#38bdf8",
    bgDark: "#120e06",
    cardDark: "#20180b",
    borderDark: "rgba(245, 158, 11, 0.2)",
    glow: "rgba(245, 158, 11, 0.35)",
    gradientText: "from-amber-400 via-orange-400 to-yellow-300",
  },
};

interface ThemeContextType {
  palette: PaletteConfig;
  setPaletteKey: (key: PaletteKey) => void;
  allPalettes: PaletteConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
  palette: PALETTES.indigo,
  setPaletteKey: () => {},
  allPalettes: Object.values(PALETTES),
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("indigo");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-palette") as PaletteKey | null;
    if (saved && PALETTES[saved]) {
      setPaletteKey(saved);
    }
  }, []);

  const changePalette = (key: PaletteKey) => {
    setPaletteKey(key);
    localStorage.setItem("portfolio-palette", key);
    const p = PALETTES[key];
    document.documentElement.style.setProperty("--brand-primary", p.primary);
    document.documentElement.style.setProperty("--brand-secondary", p.secondary);
    document.documentElement.style.setProperty("--brand-accent", p.accent);
    document.documentElement.style.setProperty("--brand-glow", p.glow);
    document.documentElement.style.setProperty("--brand-bg", p.bgDark);
    document.documentElement.style.setProperty("--brand-card", p.cardDark);
    document.documentElement.style.setProperty("--brand-border", p.borderDark);
  };

  useEffect(() => {
    const p = PALETTES[paletteKey];
    document.documentElement.style.setProperty("--brand-primary", p.primary);
    document.documentElement.style.setProperty("--brand-secondary", p.secondary);
    document.documentElement.style.setProperty("--brand-accent", p.accent);
    document.documentElement.style.setProperty("--brand-glow", p.glow);
    document.documentElement.style.setProperty("--brand-bg", p.bgDark);
    document.documentElement.style.setProperty("--brand-card", p.cardDark);
    document.documentElement.style.setProperty("--brand-border", p.borderDark);
  }, [paletteKey]);

  return (
    <ThemeContext.Provider
      value={{
        palette: PALETTES[paletteKey],
        setPaletteKey: changePalette,
        allPalettes: Object.values(PALETTES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  return useContext(ThemeContext);
}
