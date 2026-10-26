"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cpu,
  GitBranch,
  Smartphone,
  Layers,
  Server,
  FileCode,
  Workflow,
  Sparkles,
} from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

interface TechItem {
  name: string;
  category: string;
  icon: any;
}

const TECH_STACK: TechItem[] = [
  { name: "Java", category: "Language / OOP", icon: Cpu },
  { name: "Python", category: "Language", icon: Code2 },
  { name: "Spring Boot", category: "Backend Framework", icon: Server },
  { name: "PostgreSQL", category: "Relational Database", icon: Database },
  { name: "React", category: "Frontend Web", icon: Workflow },
  { name: "TypeScript", category: "Typed JavaScript", icon: FileCode },
  { name: "Kotlin", category: "Android App Dev", icon: Smartphone },
  { name: "REST APIs", category: "Backend Architecture", icon: Layers },
  { name: "Data Structures & Algorithms", category: "CS Fundamentals", icon: Sparkles },
  { name: "Cloud Firestore", category: "NoSQL Database", icon: Database },
  { name: "Git & GitHub", category: "Version Control", icon: GitBranch },
  { name: "JavaScript (ES6+)", category: "Web Standards", icon: Code2 },
];

export function TechMarquee() {
  const { palette } = usePortfolioTheme();
  const duplicated = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none" aria-label="Verified Technology Stack">
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
          duration: 32,
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
              className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 backdrop-blur-md cursor-default"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: palette.borderDark,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm"
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
                <p className="text-xs text-slate-400 font-mono">
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
