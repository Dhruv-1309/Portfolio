"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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
  const { palette } = usePortfolioTheme();

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Dynamic Skiper UI spring magnification on cursor proximity
  const iconScaleSync = useTransform(distance, [-100, 0, 100], [1, 1.35, 1]);
  const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const isActive = activeSection === item.id;
  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}
      className={`relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
        isActive ? "text-white" : "text-slate-300 hover:text-white"
      }`}
      aria-label={`Navigate to ${item.label}`}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.div
          layoutId="dock-active-pill"
          className="absolute inset-0 rounded-xl shadow-md -z-10"
          style={{
            backgroundColor: palette.primary,
            boxShadow: `0 0 16px ${palette.glow}`,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}

      {!isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity -z-10"
          whileHover={{ scale: 1.05 }}
        />
      )}

      {/* Spring Magnified Icon */}
      <motion.div style={{ scale: iconScale }}>
        <Icon className="w-4 h-4 relative z-10 transition-transform" />
      </motion.div>

      {/* Persistent text label */}
      <span className="text-xs font-medium relative z-10 mt-1 leading-none tracking-tight">
        {item.label}
      </span>
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
    <nav
      aria-label="Quick Page Navigation Dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-2 max-w-full"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.3 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-2xl border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: "rgba(10, 15, 29, 0.9)",
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
    </nav>
  );
}
