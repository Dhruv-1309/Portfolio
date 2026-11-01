"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { usePortfolioTheme } from "./ThemeContext";

const COMMAND_MAP: Record<string, React.ReactNode> = {
  "dhruv.profile": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Student Profile Initialized</p>
      <p>Name: <span className="text-white font-semibold">Dhruv B</span></p>
      <p>Role: <span className="text-cyan-400">Software Development | Backend & Full-Stack | Android Dev</span></p>
      <p>University: <span className="text-indigo-400">KL University (Koneru Lakshmaiah Education Foundation)</span></p>
      <p>Degree: <span className="text-slate-200">Bachelor of Technology in Artificial Intelligence & Data Science</span></p>
      <p>Timeline: <span className="text-slate-400">2024 – 2028 (Expected)</span></p>
      <p>Academic Standing: <span className="text-amber-400 font-bold">CGPA: 9.58 / 10.0</span></p>
    </div>
  ),
  "dhruv.skills": (
    <div className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Verified Technical Skills (Resume-Aligned)</p>
      <p>
        <span className="text-indigo-400 font-medium">Languages:</span> Java, Kotlin, TypeScript, JavaScript (ES6+), Python, C, SQL, HTML5, CSS3
      </p>
      <p>
        <span className="text-cyan-400 font-medium">Backend & Frameworks:</span> Spring Boot, Spring Security, Spring Data JPA, Hibernate, React (Vite), Android SDK, Retrofit 2, Kotlin Coroutines, Chart.js
      </p>
      <p>
        <span className="text-emerald-400 font-medium">Databases & Security:</span> PostgreSQL, Cloud Firestore, Firebase Authentication, Stateless JWT (JJWT), Google OAuth 2.0, BCrypt, Rate Limiting, CORS/CSP/HSTS
      </p>
      <p>
        <span className="text-violet-400 font-medium">Tools & Concepts:</span> Apache Maven, Git, GitHub, RESTful APIs, DSA, OOP, MVVM, Repository Pattern
      </p>
    </div>
  ),
  "dhruv.projects": (
    <div className="space-y-2 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ 3 Verified Production & Academic Projects</p>
      <div>
        <p className="text-white font-medium">1. DSA Tracker — Full-Stack Problem Practice Platform</p>
        <p className="text-slate-400">
          Java, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, React (Vite+TS), JWT, Maven. 35 REST endpoints, token blacklisting, rate limiting, N+1 query elimination, spaced repetition.
        </p>
        <a href="https://github.com/Dhruv-1309/dsa-tracker" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs">
          github.com/Dhruv-1309/dsa-tracker
        </a>
      </div>
      <div>
        <p className="text-white font-medium">2. Contestory (CodeCountdown) — Contest Tracker Android App</p>
        <p className="text-slate-400">
          Kotlin, Android SDK, MVVM, Repo Pattern, Retrofit 2, Coroutines, LiveData, Material 3. Synchronizes contests from Codeforces, LeetCode, CodeChef, and AtCoder with AlarmManager reminders.
        </p>
        <a href="https://github.com/Dhruv-1309/Contestory" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs">
          github.com/Dhruv-1309/Contestory
        </a>
      </div>
      <div>
        <p className="text-white font-medium">3. Digital Spending Tracker — Expense Analytics & Anomaly Detection</p>
        <p className="text-slate-400">
          JavaScript (ES6+), HTML5, CSS3, Firebase Auth, Cloud Firestore, Chart.js. Automated category anomaly detection with statistical Z-score threshold of 2 (|Z| &gt; 2) and Excel export.
        </p>
        <a href="https://github.com/Dhruv-1309/Digital-Spending-Tracker" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs">
          github.com/Dhruv-1309/Digital-Spending-Tracker
        </a>
      </div>
    </div>
  ),
  "dhruv.achievements": (
    <div className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Competitive Programming & Certifications</p>
      <p>
        <span className="text-amber-400 font-semibold">Problems Solved:</span> 968+ algorithmic problems & 146 rated contests over 240+ active coding days
      </p>
      <p>
        <span className="text-cyan-400 font-medium">LeetCode:</span> 100 Days Badge (2026) & 50 Days Badge (2026) • 257 DSA solved • 43 contests • Peak rating 1,439
      </p>
      <p>
        <span className="text-indigo-400 font-medium">CodeChef:</span> 500+ Problems Solved & 50+ Contests badges • 677 problems solved • 96 contests
      </p>
      <p>
        <span className="text-emerald-400 font-medium">Certification:</span> AI Fluency for Students – Certificate of Completion (2024)
      </p>
      <p>
        <span className="text-slate-400 font-medium">Codolio Profile:</span>{" "}
        <a href="https://codolio.com/profile/Dhruv_13" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
          codolio.com/profile/Dhruv_13
        </a>
      </p>
    </div>
  ),
  "dhruv.contact": (
    <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
      <p className="text-emerald-400">✓ Direct Contact Details</p>
      <p>Email: <a href="mailto:dhruvb324@gmail.com" className="text-cyan-400 hover:underline">dhruvb324@gmail.com</a></p>
      <p>Phone: <span className="text-slate-300">+91-9933260140</span></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/dhruvb-tech" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">linkedin.com/in/dhruvb-tech</a></p>
      <p>GitHub: <a href="https://github.com/Dhruv-1309" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">github.com/Dhruv-1309</a></p>
      <p>Codolio: <a href="https://codolio.com/profile/Dhruv_13" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">codolio.com/profile/Dhruv_13</a></p>
    </div>
  ),
};

export function InteractiveTerminal() {
  const { palette } = usePortfolioTheme();
  const [activeCmd, setActiveCmd] = useState<string>("dhruv.profile");
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx dhruv-portfolio");
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative rounded-2xl border shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(10, 14, 25, 0.9)",
        borderColor: palette.borderDark,
      }}
    >
      {/* Header */}
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
            dhruv@kl-university: ~
          </span>
        </div>

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

      {/* Quick Pills */}
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
          <span className="text-emerald-400">dhruv@sde-workstation</span>
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

      {/* Footer */}
      <div
        className="px-5 py-2.5 flex items-center justify-between text-xs text-slate-400 border-t font-sans"
        style={{ borderColor: palette.borderDark }}
      >
        <span>Status: SDE Intern Candidate</span>
        <span className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: palette.primary }}
          />
          Open for SDE Internships
        </span>
      </div>
    </div>
  );
}
