"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  Code2,
  Download,
  Mail,
  LucideIcon,
} from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "resume", label: "Resume", icon: Download },
  { id: "contact", label: "Contact", icon: Mail },
];

function DockIcon({
  item,
  mouseX,
  activeSection,
  onClick,
}: {
  item: NavItem;
  mouseX: any;
  activeSection: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const { palette } = usePortfolioTheme();

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [42, 58, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const isActive = activeSection === item.id;
  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-2xl transition-colors ${
        isActive ? "text-white" : "text-slate-400 hover:text-white"
      }`}
      whileTap={{ scale: 0.88 }}
      aria-label={item.label}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.div
          layoutId="dock-active-pill"
          className="absolute inset-0 rounded-2xl shadow-lg -z-10"
          style={{
            backgroundColor: palette.primary,
            boxShadow: `0 0 16px ${palette.glow}`,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}

      {!isActive && (
        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity -z-10" />
      )}

      <Icon className="w-5 h-5 relative z-10 transition-transform" />

      {/* Skiper UI Floating Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap shadow-xl border z-50 backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: palette.borderDark,
              color: "#f8fafc",
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny active bottom indicator dot */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: palette.accent }}
        />
      )}
    </motion.button>
  );
}

export function FloatingDock({ activeSection }: { activeSection: string }) {
  const mouseX = useMotionValue(Infinity);
  const { palette } = usePortfolioTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-2 px-3 py-2 rounded-3xl border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: "rgba(10, 15, 29, 0.85)",
          borderColor: palette.borderDark,
          boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 25px -5px ${palette.glow}`,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            activeSection={activeSection}
            onClick={() => scrollTo(item.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}
