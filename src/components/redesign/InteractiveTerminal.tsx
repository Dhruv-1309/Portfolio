"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, Play, CornerDownLeft } from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

const COMMAND_MAP: Record<string, React.ReactNode> = {
  "dhruv.profile": (
    <div className="space-y-1 text-slate-300">
      <p className="text-emerald-400">✓ Student Profile Initialized</p>
      <p>Name: <span className="text-white font-semibold">B Dhruv</span></p>
      <p>Institution: <span className="text-cyan-400">KLH University, Hyderabad</span></p>
      <p>Major: <span className="text-indigo-400">B.Tech in Artificial Intelligence & Data Science</span></p>
      <p>Academic Standing: <span className="text-amber-400 font-bold">CGPA: 9.0+</span> (Distinction / Top Tier)</p>
      <p>Current Year: <span className="text-slate-400">2nd Year</span></p>
    </div>
  ),
  "dhruv.skills": (
    <div className="space-y-1 text-slate-300">
      <p className="text-emerald-400">✓ Loaded Core Tech Stack (10 modules)</p>
      <p className="text-xs">
        <span className="text-indigo-400">Languages:</span> Python, Core Java, SQL, TypeScript/JavaScript
      </p>
      <p className="text-xs">
        <span className="text-cyan-400">AI / ML:</span> Prompt Engineering, LLM Workflows, Predictive Modeling, Scikit-Learn
      </p>
      <p className="text-xs">
        <span className="text-emerald-400">Data Science:</span> Pandas, NumPy, Statistical Z-Score Analysis, Matplotlib
      </p>
      <p className="text-xs">
        <span className="text-violet-400">DevOps & Tools:</span> Git, GitHub, Linux Shell, Next.js, Tailwind CSS
      </p>
    </div>
  ),
  "dhruv.contact": (
    <div className="space-y-1 text-slate-300">
      <p className="text-emerald-400">✓ Active Contact Channels</p>
      <p>📧 Email: <a href="mailto:dhruvb324@gmail.com" className="text-cyan-400 hover:underline">dhruvb324@gmail.com</a></p>
      <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/dhruvb-tech" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">linkedin.com/in/dhruvb-tech</a></p>
      <p>🐙 GitHub: <a href="https://github.com/Dhruv-1309" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">github.com/Dhruv-1309</a></p>
    </div>
  ),
  "dhruv.projects": (
    <div className="space-y-1 text-slate-300">
      <p className="text-emerald-400">✓ 3 Production Repositories Discovered</p>
      <p className="text-white font-medium">1. Digital Spending Tracker</p>
      <p className="text-xs text-slate-400">
        &gt; Anomaly detection (Z-scores), depletion runway modeling, Pandas/NumPy engine
      </p>
      <p className="text-white font-medium mt-1">2. AI Prompt Optimization & Eval Studio</p>
      <p className="text-xs text-slate-400">
        &gt; GenAI prompt benchmarking, token economy analysis, heuristic scoring
      </p>
      <p className="text-white font-medium mt-1">3. Predictive Academic Performance Classifier</p>
      <p className="text-xs text-slate-400">
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
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: palette.borderDark,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600" />
          <span className="ml-2 text-slate-400 text-[11px] flex items-center gap-1.5 font-sans font-medium">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            dhruv@klh-university: ~
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>npx dhruv</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Command Quick Pills */}
      <div className="flex items-center gap-1.5 p-3 overflow-x-auto border-b border-white/5 bg-black/20">
        <span className="text-slate-500 text-[10px] uppercase font-sans font-semibold mr-1">
          EXEC:
        </span>
        {Object.keys(COMMAND_MAP).map((cmd) => (
          <button
            key={cmd}
            onClick={() => setActiveCmd(cmd)}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition-all whitespace-nowrap flex items-center gap-1 ${
              activeCmd === cmd
                ? "bg-white/15 text-white font-medium border border-white/20 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: activeCmd === cmd ? palette.accent : "#64748b",
              }}
            />
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 min-h-[220px] space-y-3 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-400">
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
            className="pl-2 border-l-2 py-1"
            style={{ borderColor: palette.primary }}
          >
            {COMMAND_MAP[activeCmd]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Terminal Footer HUD */}
      <div
        className="px-4 py-2 flex items-center justify-between text-[10px] text-slate-500 border-t"
        style={{ borderColor: palette.borderDark }}
      >
        <span>STATUS: SYSTEM OPERATIONAL</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: palette.primary }}
          />
          READY FOR INTERNSHIPS
        </span>
      </div>
    </div>
  );
}
