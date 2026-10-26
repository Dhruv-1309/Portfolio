"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { SpotlightCard } from "./SpotlightCard";
import { Badge } from "@/components/ui/badge";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  skills: string[];
  description: string;
  relevance: string;
}

const RESUME_SKILL_GROUPS: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: Cpu,
    skills: ["Java", "Python", "JavaScript (ES6+)", "C (Fundamentals)"],
    description: "Object-oriented programming, algorithmic implementations, and core syntax fundamentals.",
    relevance: "Used across DSA practice, Spring Boot backend, and Android apps",
  },
  {
    id: "fundamentals",
    title: "CS Fundamentals",
    icon: Sparkles,
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)"],
    description: "Time/space complexity analysis, memory models, modular design patterns, inheritance, and polymorphism.",
    relevance: "Core focus for SDE problem solving and clean system architecture",
  },
  {
    id: "backend",
    title: "Backend & Databases",
    icon: Server,
    skills: ["Spring Boot", "REST APIs", "PostgreSQL", "Firebase", "Cloud Firestore"],
    description: "RESTful endpoint design, relational database schemas, NoSQL document stores, and authentication.",
    relevance: "Implemented in DSA Tracker (Spring Boot + PostgreSQL) & Digital Spending Tracker (Firestore)",
  },
  {
    id: "web",
    title: "Web Development",
    icon: Workflow,
    skills: ["React", "TypeScript", "HTML5", "CSS3"],
    description: "Modern component-driven web interfaces, strong typing, reactive state management, and semantic markup.",
    relevance: "Built responsive frontend prototypes including DSA Tracker with React & Vite",
  },
  {
    id: "android",
    title: "Android Development",
    icon: Smartphone,
    skills: ["Kotlin", "Android Development", "MVVM", "Retrofit 2", "Coroutines"],
    description: "Native mobile architecture using Repository pattern, asynchronous coroutines, and Material Design 3.",
    relevance: "Demonstrated in CP Contest Tracker (CodeCountdown) Android App",
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: GitBranch,
    skills: ["Git", "GitHub", "VS Code"],
    description: "Feature-branch workflows, commit discipline, pull requests, and standard development environments.",
    relevance: "Daily workflow for all project repositories and version tracking",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages" },
  { id: "fundamentals", label: "CS Fundamentals" },
  { id: "backend", label: "Backend & DBs" },
  { id: "web", label: "Web" },
  { id: "android", label: "Android" },
  { id: "tools", label: "Tools" },
];

export function SkillsMatrix() {
  const { palette } = usePortfolioTheme();
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredGroups =
    selectedCat === "all"
      ? RESUME_SKILL_GROUPS
      : RESUME_SKILL_GROUPS.filter((g) => g.id === selectedCat);

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        role="tablist"
        aria-label="Filter skills by technical category"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "text-white shadow-md font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
              }`}
              style={{
                backgroundColor: isActive ? palette.primary : "rgba(255,255,255,0.03)",
                borderColor: isActive ? palette.primary : palette.borderDark,
                boxShadow: isActive ? `0 0 10px ${palette.glow}` : "none",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Group Cards (No Fake Progress Bars or Percentages) */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2"
      >
        <AnimatePresence>
          {filteredGroups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard className="p-6 h-full flex flex-col justify-between hover:translate-y-[-2px]">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                        style={{
                          backgroundColor: `${palette.primary}25`,
                          color: palette.primary,
                          border: `1px solid ${palette.primary}44`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {group.title}
                        </h3>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {group.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-200 border"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderColor: palette.borderDark,
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {group.description}
                    </p>
                  </div>

                  {/* Context / Application footnote */}
                  <div
                    className="pt-3 border-t text-[11px] text-slate-400 font-mono"
                    style={{ borderColor: palette.borderDark }}
                  >
                    <span className="text-slate-500">Context: </span>
                    {group.relevance}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
