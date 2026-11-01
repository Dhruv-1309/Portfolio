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
  ShieldCheck,
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
    skills: [
      "Java",
      "Kotlin",
      "TypeScript",
      "JavaScript (ES6+)",
      "Python",
      "C",
      "SQL",
      "HTML5",
      "CSS3",
    ],
    description:
      "Multi-paradigm languages for enterprise backend systems, native Android development, and modern reactive web applications.",
    relevance: "Applied across DSA Tracker, Contestory (CodeCountdown), and Digital Spending Tracker",
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    icon: Server,
    skills: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "React (Vite)",
      "Android SDK",
      "Retrofit 2",
      "Kotlin Coroutines",
      "Chart.js",
    ],
    description:
      "Enterprise microservices, ORM persistence, reactive asynchronous coroutines, and modern frontend/mobile UI frameworks.",
    relevance: "Powers the 35 REST endpoints in DSA Tracker and real-time contest ingestion in Contestory",
  },
  {
    id: "security",
    title: "Databases & Security",
    icon: ShieldCheck,
    skills: [
      "PostgreSQL",
      "Cloud Firestore",
      "Firebase Authentication",
      "Stateless JWT (JJWT)",
      "Google OAuth 2.0",
      "BCrypt",
      "Rate Limiting",
      "CORS/CSP/HSTS",
    ],
    description:
      "Relational & NoSQL persistence, cryptographic password hashing, stateless token authorization, and API hardening against abuse.",
    relevance: "Normalized PostgreSQL schemas, TokenBlacklistService, and bucket-based RateLimitingFilter",
  },
  {
    id: "tools",
    title: "Tools & Core Concepts",
    icon: GitBranch,
    skills: [
      "Apache Maven",
      "Git",
      "GitHub",
      "RESTful APIs",
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP)",
      "MVVM",
      "Repository Pattern",
    ],
    description:
      "Algorithmic problem solving, clean architectural patterns, version control discipline, and dependency lifecycle automation.",
    relevance: "Foundation of 968+ solved problems, clean MVVM separation, and multi-module builds",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend & Frameworks" },
  { id: "security", label: "Databases & Security" },
  { id: "tools", label: "Tools & Core Concepts" },
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
