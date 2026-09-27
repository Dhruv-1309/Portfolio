"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sparkles } from "lucide-react";
import { usePortfolioTheme, PaletteKey } from "./ThemeContext";

export function PaletteSwitcher() {
  const { palette, setPaletteKey, allPalettes } = usePortfolioTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm backdrop-blur-md"
        style={{
          borderColor: palette.borderDark,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "#e2e8f0",
        }}
        aria-label="Change Realtime Color theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
          style={{ backgroundColor: palette.primary }}
        />
        <Palette className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="hidden sm:inline text-xs font-mono">{palette.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl border shadow-2xl z-50 backdrop-blur-2xl"
              style={{
                backgroundColor: "rgba(13, 18, 30, 0.95)",
                borderColor: palette.borderDark,
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Realtime Colors</span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Theme System
                </span>
              </div>

              <div className="space-y-1.5">
                {allPalettes.map((p) => {
                  const isActive = p.id === palette.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPaletteKey(p.id as PaletteKey);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                        isActive
                          ? "bg-white/10 text-white font-medium shadow-inner"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center -space-x-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: p.primary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: p.secondary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: p.accent }}
                          />
                        </div>
                        <span>{p.name}</span>
                      </div>
                      {isActive && (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: p.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
