"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle,
} from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";
import { SpotlightCard } from "./SpotlightCard";

interface SkillItem {
  name: string;
  category: "ai" | "core" | "data" | "tools";
  categoryLabel: string;
  level: number;
  experience: string;
  icon: any;
  description: string;
}

const ALL_SKILLS: SkillItem[] = [
  {
    name: "Python",
    category: "core",
    categoryLabel: "Core Language",
    level: 92,
    experience: "Primary Language",
    icon: Code2,
    description: "Data pipelines, algorithmic problem solving, machine learning scripts, and backend logic.",
  },
  {
    name: "Core Java",
    category: "core",
    categoryLabel: "Systems & OOP",
    level: 85,
    experience: "Academic & Systems",
    icon: Cpu,
    description: "Object-oriented design patterns, memory management, data structures, and algorithms.",
  },
  {
    name: "SQL & Databases",
    category: "data",
    categoryLabel: "Data Management",
    level: 88,
    experience: "Relational Modeling",
    icon: Database,
    description: "Complex multi-table queries, indexing, schema design, and aggregation pipelines.",
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    categoryLabel: "Generative AI",
    level: 95,
    experience: "Specialized Field",
    icon: Brain,
    description: "System instructions, Chain-of-Thought prompting, hallucination mitigation, and LLM benchmarking.",
  },
  {
    name: "Pandas & NumPy",
    category: "data",
    categoryLabel: "Data Analysis",
    level: 90,
    experience: "Analytics Stack",
    icon: Layers,
    description: "Vectorized computations, time-series transforms, exploratory data analysis, and anomaly filtering.",
  },
  {
    name: "Machine Learning (Scikit-Learn)",
    category: "ai",
    categoryLabel: "Applied ML",
    level: 84,
    experience: "Model Training",
    icon: Activity,
    description: "Classification, regression, cross-validation, feature scaling, and performance metrics (ROC-AUC, F1).",
  },
  {
    name: "Statistical Analysis",
    category: "data",
    categoryLabel: "Data Science",
    level: 86,
    experience: "Mathematical Rigor",
    icon: Sparkles,
    description: "Z-score anomaly detection, probability distributions, variance analysis, and predictive modeling.",
  },
  {
    name: "Git & GitHub",
    category: "tools",
    categoryLabel: "Version Control",
    level: 90,
    experience: "Production Flow",
    icon: GitBranch,
    description: "Feature branch management, PR workflows, interactive rebasing, and repository hygiene.",
  },
  {
    name: "Next.js & React",
    category: "tools",
    categoryLabel: "Modern Web",
    level: 82,
    experience: "Frontend Stack",
    icon: Workflow,
    description: "Component architecture, Tailwind styling, responsive mobile-first layouts, and SSR/SSG.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "core", label: "Core Programming" },
  { id: "data", label: "Data Science & SQL" },
  { id: "tools", label: "Tools & Frameworks" },
];

export function SkillsMatrix() {
  const { palette } = usePortfolioTheme();
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredSkills =
    selectedCat === "all"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === selectedCat);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills (Vengeance UI Cyber Bar) */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
                backgroundColor: isActive ? palette.primary : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? palette.primary : palette.borderDark}`,
                boxShadow: isActive ? `0 0 15px ${palette.glow}` : "none",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard className="p-5 h-full flex flex-col justify-between hover:translate-y-[-2px]">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
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
                      <span
                        className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderColor: palette.borderDark,
                          color: palette.accent,
                        }}
                      >
                        {skill.categoryLabel}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-slate-400">{skill.experience}</span>
                      <span className="font-semibold text-slate-200">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent})`,
                        }}
                      />
                    </div>
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
