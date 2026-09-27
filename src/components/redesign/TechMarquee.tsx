"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
  Workflow,
} from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

interface TechItem {
  name: string;
  category: string;
  icon: any;
}

const TECH_STACK: TechItem[] = [
  { name: "Python", category: "Core / AI", icon: Code2 },
  { name: "Core Java", category: "OOP / Systems", icon: Cpu },
  { name: "SQL & Relational DBs", category: "Data", icon: Database },
  { name: "Prompt Engineering", category: "GenAI / LLMs", icon: Brain },
  { name: "Pandas & NumPy", category: "Data Analytics", icon: Layers },
  { name: "Scikit-Learn", category: "Machine Learning", icon: Activity },
  { name: "Statistical Modeling", category: "Data Science", icon: Sparkles },
  { name: "Git & Version Control", category: "DevOps", icon: GitBranch },
  { name: "Next.js & React", category: "Frontend Web", icon: Workflow },
  { name: "Linux & Bash", category: "Environment", icon: Terminal },
];

export function TechMarquee() {
  const { palette } = usePortfolioTheme();
  // Duplicate for seamless infinite loop
  const duplicated = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative w-full overflow-hidden py-6 select-none">
      {/* Edge gradient fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10"
        style={{
          background: `linear-gradient(to right, ${palette.bgDark}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10"
        style={{
          background: `linear-gradient(to left, ${palette.bgDark}, transparent)`,
        }}
      />

      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicated.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${idx}`}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 hover:scale-105 backdrop-blur-md cursor-default"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: palette.borderDark,
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: palette.primary,
                }}
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {tech.name}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {tech.category}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
