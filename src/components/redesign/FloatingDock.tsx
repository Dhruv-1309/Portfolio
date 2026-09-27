"use client";

import React, { useRef, useState } from "react";
import {
  motion,
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
  activeSection,
  onClick,
}: {
  item: NavItem;
  activeSection: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { palette } = usePortfolioTheme();
  const isActive = activeSection === item.id;
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
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
            boxShadow: `0 0 12px ${palette.glow}`,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}

      {!isActive && (
        <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity -z-10" />
      )}

      <Icon className="w-4 h-4 relative z-10 transition-transform" />

      {/* Issue 26: Persistent readable text label below icon */}
      <span className="text-xs font-medium relative z-10 mt-1 leading-none tracking-tight">
        {item.label}
      </span>
    </button>
  );
}

export function FloatingDock({ activeSection }: { activeSection: string }) {
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
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
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
            activeSection={activeSection}
            onClick={() => scrollTo(item.id)}
          />
        ))}
      </motion.div>
    </nav>
  );
}
