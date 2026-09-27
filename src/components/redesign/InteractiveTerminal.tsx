"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

const COMMAND_MAP: Record<string, React.ReactNode> = {
  "dhruv.profile": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Student Profile Initialized</p>
      <p>Name: <span className="text-white font-semibold">B Dhruv</span></p>
      <p>Institution: <span className="text-cyan-400">KLH University, Hyderabad</span></p>
      <p>Major: <span className="text-indigo-400">B.Tech in Artificial Intelligence & Data Science</span></p>
      <p>Academic Standing: <span className="text-amber-400 font-bold">CGPA: 9.0+</span> (Distinction / Top Tier)</p>
      <p>Current Year: <span className="text-slate-400">2nd Year</span></p>
    </div>
  ),
  "dhruv.skills": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Loaded Core Tech Stack (10 modules)</p>
      <p>
        <span className="text-indigo-400 font-medium">Languages:</span> Python, Core Java, SQL, TypeScript/JavaScript
      </p>
      <p>
        <span className="text-cyan-400 font-medium">AI / ML:</span> Prompt Engineering, LLM Workflows, Predictive Modeling, Scikit-Learn
      </p>
      <p>
        <span className="text-emerald-400 font-medium">Data Science:</span> Pandas, NumPy, Statistical Z-Score Analysis, Matplotlib
      </p>
      <p>
        <span className="text-violet-400 font-medium">DevOps & Tools:</span> Git, GitHub, Linux Shell, Next.js, Tailwind CSS
      </p>
    </div>
  ),
  "dhruv.contact": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Active Contact Channels</p>
      <p>Email: <a href="mailto:dhruvb324@gmail.com" className="text-cyan-400 hover:underline">dhruvb324@gmail.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/dhruvb-tech" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">linkedin.com/in/dhruvb-tech</a></p>
      <p>GitHub: <a href="https://github.com/Dhruv-1309" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">github.com/Dhruv-1309</a></p>
    </div>
  ),
  "dhruv.projects": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ 3 Production Repositories Discovered</p>
      <p className="text-white font-medium">1. Digital Spending Tracker</p>
      <p className="text-slate-400">
        &gt; Anomaly detection (Z-scores), depletion runway modeling, Pandas/NumPy engine
      </p>
      <p className="text-white font-medium mt-1">2. AI Prompt Optimization & Eval Studio</p>
      <p className="text-slate-400">
        &gt; GenAI prompt benchmarking, token economy analysis, heuristic scoring
      </p>
      <p className="text-white font-medium mt-1">3. Predictive Academic Performance Classifier</p>
      <p className="text-slate-400">
        &gt; Supervised regression & classification for student milestone forecasting
      </p>
    </div>
  ),
};

export function InteractiveTerminal() {
  const { palette } = usePortfolioTheme();
  const [activeCmd, setActiveCmd] = useState<string>("dhruv.profile");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx dhruv-portfolio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-2xl border shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(10, 14, 25, 0.9)",
        borderColor: palette.borderDark,
      }}
    >
      {/* Vengeance UI Cyber Terminal Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{
          borderColor: palette.borderDark,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600" />
          <span className="ml-2 text-slate-300 text-xs flex items-center gap-2 font-sans font-medium">
            <Terminal className="w-4 h-4 text-slate-400" />
            dhruv@klh-university: ~
          </span>
        </div>

        {/* Issue 28: Generous padding and clear button affordance */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors shadow-sm"
          title="Copy command"
          aria-label="Copy npx command to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>npx dhruv</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Command Quick Pills - Issue 15, 22, 27: Clear interactive button affordance, generous gap */}
      <div className="flex items-center gap-2.5 px-4 py-3 overflow-x-auto border-b border-white/5 bg-black/20">
        <span className="text-slate-400 text-xs font-mono font-semibold mr-1 flex-shrink-0">
          EXEC:
        </span>
        {Object.keys(COMMAND_MAP).map((cmd) => {
          const isActive = activeCmd === cmd;
          return (
            <button
              key={cmd}
              onClick={() => setActiveCmd(cmd)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-sm ${
                isActive
                  ? "bg-white/15 text-white border border-white/30"
                  : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/25"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: `${palette.primary}35`,
                      borderColor: palette.primary,
                      boxShadow: `0 0 10px ${palette.glow}`,
                    }
                  : {}
              }
              aria-pressed={isActive}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isActive ? palette.accent : "#94a3b8",
                }}
              />
              <span>{cmd}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Body */}
      <div className="p-5 min-h-[220px] space-y-3 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span className="text-emerald-400">dhruv@ai-workstation</span>
          <span>:</span>
          <span className="text-cyan-400">~/portfolio</span>
          <span>$</span>
          <span className="text-white font-semibold">{activeCmd}</span>
          <span
            className="w-2 h-4 animate-pulse inline-block align-middle"
            style={{ backgroundColor: palette.primary }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCmd}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pl-3 border-l-2 py-1"
            style={{ borderColor: palette.primary }}
          >
            {COMMAND_MAP[activeCmd]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Issue 8: Standardized body text size (12px min) */}
      <div
        className="px-5 py-2.5 flex items-center justify-between text-xs text-slate-400 border-t font-sans"
        style={{ borderColor: palette.borderDark }}
      >
        <span>Status: System Operational</span>
        <span className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: palette.primary }}
          />
          Available for Internships
        </span>
      </div>
    </div>
  );
}
