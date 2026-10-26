"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Download,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Award,
  Copy,
  Check,
  FolderOpen,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Redesign Modules
import { usePortfolioTheme } from "@/components/redesign/ThemeContext";
import { PaletteSwitcher } from "@/components/redesign/PaletteSwitcher";
import {
  HaikeiBackground,
  HaikeiWaveDivider,
} from "@/components/redesign/HaikeiBackground";
import { SpotlightCard } from "@/components/redesign/SpotlightCard";
import { TiltCard } from "@/components/redesign/TiltCard";
import { BorderBeam } from "@/components/redesign/BorderBeam";
import { Magnetic } from "@/components/redesign/MagneticButton";
import { FloatingDock } from "@/components/redesign/FloatingDock";
import { TechMarquee } from "@/components/redesign/TechMarquee";
import { InteractiveTerminal } from "@/components/redesign/InteractiveTerminal";
import {
  ProjectModal,
  ProjectData,
} from "@/components/redesign/ProjectModal";
import { SkillsMatrix } from "@/components/redesign/SkillsMatrix";
import { TextMorph } from "@/components/redesign/MotionText";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Priority 1.1 — Exactly 3 verified projects from resume
const VERIFIED_PROJECTS: ProjectData[] = [
  {
    id: "dsa-tracker",
    title: "DSA Tracker",
    subtitle: "Problem Practice & Revision Scheduling Web App",
    category: "Full-Stack Web",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
    description:
      "A web app to organize and track DSA practice problems by topic, log attempt details, and schedule revisits.",
    overview:
      "Built with a React (Vite + TypeScript) frontend and a Spring Boot REST API backend using PostgreSQL, implementing JWT-based authentication and user-specific data access. Features a spaced-repetition revisit queue and an approval-based friend sharing system.",
    features: [
      {
        title: "Attempt-Logging Architecture",
        description:
          "Records thinking ability, coding ability, time/space complexity, and confidence score per problem attempt.",
      },
      {
        title: "Revisit Queue System",
        description:
          "Problem status is auto-derived from the latest attempt, driving a structured spaced-repetition queue based on stored next-review dates.",
      },
      {
        title: "Secure JWT Authentication",
        description:
          "Stateless token-based authentication with Spring Security and role-guarded user-specific database scoping.",
      },
      {
        title: "Friend-Sharing & Heatmap",
        description:
          "Approval-based permission model allowing peer users read-only access to full problem logs, approach notes, and contribution activity heatmaps.",
      },
    ],
    metrics: [
      { label: "Frontend", value: "React + TS" },
      { label: "Backend API", value: "Spring Boot" },
      { label: "Database", value: "PostgreSQL" },
    ],
    techStack: [
      "React",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "JWT",
      "Vite",
      "REST APIs",
    ],
    githubUrl: "https://github.com/Dhruv-1309",
  },
  {
    id: "cp-tracker",
    title: "CP Contest Tracker (CodeCountdown)",
    subtitle: "Contest Aggregator & Reminder Android App",
    category: "Android Application",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
    description:
      "An Android app that pulls upcoming competitive programming contests from Codeforces, LeetCode, CodeChef, and AtCoder and sends local reminders.",
    overview:
      "Developed in Kotlin using MVVM and Repository Pattern, integrating the CLIST API (v4) via Retrofit 2 and Kotlin Coroutines to display live and upcoming contests with custom filtering and reliable background alarm notifications.",
    features: [
      {
        title: "Live Contest Synchronization",
        description:
          "Integrates CLIST API (v4) with Retrofit 2 and Kotlin Coroutines for asynchronous, non-blocking contest ingestion.",
      },
      {
        title: "Day & Platform Filtering",
        description:
          "Scrollable day-selector and multi-choice platform filter chips styled with Material Design 3, backed by LiveData state observation.",
      },
      {
        title: "Local Notification Reminders",
        description:
          "Schedules exact alerts via AlarmManager and NotificationCompat, paired with a BootReceiver to persist reminders across device reboots.",
      },
      {
        title: "Preference Persistence",
        description:
          "Caches user theme choices and selected contest platform filters locally using SharedPreferences.",
      },
    ],
    metrics: [
      { label: "Language", value: "Kotlin" },
      { label: "Architecture", value: "MVVM" },
      { label: "UI System", value: "Material 3" },
    ],
    techStack: [
      "Kotlin",
      "Android",
      "MVVM",
      "Retrofit 2",
      "Coroutines",
      "Material Design 3",
      "AlarmManager",
    ],
    githubUrl: "https://github.com/Dhruv-1309",
  },
  {
    id: "spending-tracker",
    title: "Digital Spending Tracker",
    subtitle: "Personal Finance & Statistical Anomaly Web App",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    description:
      "A browser-based personal finance tracker with category charts, Z-score anomaly detection, and Excel export.",
    overview:
      "Built with HTML5, CSS3, JavaScript (ES6+), and Firebase to deliver real-time personal expense management. Features category-level spending anomaly detection using mathematical Z-scores and visual trend breakdown.",
    features: [
      {
        title: "Z-Score Anomaly Detection",
        description:
          "Calculates historical category mean and standard deviation, flagging transactions that exceed a Z-score threshold of 2.",
      },
      {
        title: "Firebase Cloud Sync",
        description:
          "Secured multi-device transaction history and custom category creation powered by Firebase Authentication and Cloud Firestore.",
      },
      {
        title: "Interactive Chart.js Dashboard",
        description:
          "Visualizes spending distribution by category, timeline progression, and day-of-week consumption patterns.",
      },
      {
        title: "Excel Data Export",
        description:
          "One-click complete transaction history download formatted for spreadsheet analysis and record keeping.",
      },
    ],
    metrics: [
      { label: "Anomaly Filter", value: "Z-Score ≥ 2" },
      { label: "Cloud Store", value: "Firestore" },
      { label: "Visuals", value: "Chart.js" },
    ],
    techStack: [
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Firebase",
      "Cloud Firestore",
      "Chart.js",
    ],
    githubUrl: "https://github.com/Dhruv-1309",
  },
];

export default function Portfolio() {
  const { palette } = usePortfolioTheme();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Track active section for floating dock
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "resume", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dhruvb324@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 transition-colors duration-500 relative selection:bg-white/20"
      style={{ backgroundColor: palette.bgDark }}
    >
      {/* Haikei Background */}
      <HaikeiBackground />

      {/* Top Glass Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b transition-all duration-300"
        style={{
          backgroundColor: "rgba(8, 12, 22, 0.8)",
          borderColor: palette.borderDark,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.25}>
              <a
                href="#home"
                className="flex items-center gap-2 group cursor-pointer"
                aria-label="Home - Dhruv B Portfolio"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider shadow-lg border"
                  style={{
                    backgroundColor: `${palette.primary}20`,
                    borderColor: palette.borderDark,
                    color: palette.accent,
                  }}
                >
                  DB
                </motion.div>
                <div>
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-slate-200 transition-colors">
                    Dhruv B
                  </span>
                  <span className="block text-xs text-slate-400 font-mono">
                    Software Engineer in Training
                  </span>
                </div>
              </a>
            </Magnetic>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-3">
            {/* Status Beacon with animated pulse */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md cursor-default"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: palette.borderDark,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: palette.accent }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: palette.accent }}
                />
              </span>
              <span className="text-slate-300 text-xs">
                Open for SDE Internships
              </span>
            </motion.div>

            {/* Realtime Colors Theme Switcher */}
            <PaletteSwitcher />

            {/* Resume Button in Header */}
            <Magnetic strength={0.25}>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-medium px-3.5 py-1.5 text-slate-200 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-all shadow-sm"
              >
                <motion.a
                  href="/Resume.pdf"
                  download="Dhruv_B_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Resume (PDF)
                </motion.a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* HERO SECTION with Motion Primitives Text Roll and Staggered Animations */}
        <section
          id="home"
          className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative overflow-hidden"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            {/* Status Pill with rotating sparkle */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-inner backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: palette.borderDark,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: palette.accent }} />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                KL University • B.Tech in Artificial Intelligence & Data Science • CGPA: 9.58 / 10.0
              </span>
            </motion.div>

            {/* Name with Animated Shimmer Gradient */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
                Hi, I'm{" "}
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #ffffff 15%, ${palette.primary} 70%, ${palette.accent} 100%)`,
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                >
                  Dhruv B
                </motion.span>
              </h1>

              {/* SDE Candidate Positioning with Motion Primitives TextMorph */}
              <div className="text-lg sm:text-2xl font-semibold tracking-tight text-slate-200 flex items-center justify-center gap-2 flex-wrap min-h-[44px]">
                <span className="text-slate-400">Software Engineer in Training | Building with</span>
                <TextMorph
                  words={[
                    "Java & Spring Boot",
                    "Data Structures & Algorithms",
                    "React & TypeScript",
                    "Kotlin & Android Apps",
                    "PostgreSQL & REST APIs",
                  ]}
                  className="font-bold underline decoration-2 underline-offset-8"
                  style={{
                    color: palette.accent,
                    textDecorationColor: palette.primary,
                  }}
                />
              </div>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto pt-1">
                B.Tech in AI & Data Science @ KL University • Class of 2028 • <span className="text-white font-bold">CGPA: 9.58 / 10.0</span>
              </p>
            </motion.div>

            {/* Professional Summary from Resume */}
            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1"
            >
              Building web and Android application prototypes. Exploring software development
              with Java, Python, REST APIs, databases, and frontend technologies. Focused on
              strengthening implementation, testing, and problem-solving through hands-on projects.
            </motion.p>

            {/* Hero CTAs with Magnetic Spring & Hover Ripple */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Magnetic strength={0.3}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollTo("projects")}
                    size="lg"
                    className="relative group overflow-hidden px-8 py-5 rounded-xl text-sm font-semibold shadow-xl text-white border-0 cursor-pointer"
                    style={{
                      backgroundColor: palette.primary,
                      boxShadow: `0 8px 24px -4px ${palette.glow}`,
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      Explore Projects
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
                      }}
                    />
                  </Button>
                </motion.div>
              </Magnetic>

              <Magnetic strength={0.3}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 py-5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5 text-slate-200 cursor-pointer"
                    style={{
                      borderColor: palette.borderDark,
                      backgroundColor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <a href="/Resume.pdf" download="Dhruv_B_Resume.pdf">
                      <Download className="w-4 h-4 mr-2" style={{ color: palette.accent }} />
                      Download Resume (PDF)
                    </a>
                  </Button>
                </motion.div>
              </Magnetic>

              {/* Social Profiles with Magnetic Lift */}
              <div className="flex items-center gap-2 pl-2">
                <Magnetic strength={0.35}>
                  <motion.a
                    href="https://github.com/Dhruv-1309"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-300 hover:text-white transition-colors backdrop-blur-md shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      borderColor: palette.borderDark,
                    }}
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <motion.a
                    href="https://www.linkedin.com/in/dhruvb-tech"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-300 hover:text-white transition-colors backdrop-blur-md shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      borderColor: palette.borderDark,
                    }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Skiper UI Infinite Tech Marquee */}
        <section className="relative z-10 border-y border-white/5 py-2 bg-black/20" aria-label="Core Technology Ribbon">
          <TechMarquee />
        </section>

        {/* Haikei Organic Wave Divider */}
        <HaikeiWaveDivider />

        {/* ABOUT & EDUCATION SECTION */}
        <section
          id="about"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 space-y-3"
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Academic Background & Education
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Education & Engineering Foundation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Dedicated student at KL University focused on data structures, algorithms,
              backend architectures, and mobile prototypes.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Education Card (Animaster 3D Tilt + Motion Primitives Spotlight) */}
            <div className="lg:col-span-6 space-y-6">
              <TiltCard maxTilt={8}>
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border"
                      style={{
                        backgroundColor: `${palette.primary}25`,
                        borderColor: `${palette.primary}44`,
                        color: palette.accent,
                      }}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </motion.div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium"
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            borderColor: "rgba(16, 185, 129, 0.3)",
                            color: "#34d399",
                          }}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Academic Standing</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Bachelor of Technology – Artificial Intelligence & Data Science
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: palette.primary }}
                      >
                        KL University, Hyderabad, Telangana, India
                      </p>
                      <p className="text-xs text-slate-400">
                        2024 – Expected 2028 (Undergraduate)
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Solid foundation in Data Structures & Algorithms, Object-Oriented Programming (OOP),
                      Database Management Systems, and Software Development. Project experience spanning
                      Java, Python, Spring Boot, React, and Android development with Kotlin.
                    </p>

                    {/* Exact CGPA: 9.58 / 10.0 */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 rounded-xl border flex items-center justify-between"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        borderColor: palette.borderDark,
                      }}
                    >
                      <div>
                        <p className="text-xs text-slate-400 font-medium">
                          Cumulative Grade Point Average
                        </p>
                        <p
                          className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5"
                          style={{ color: palette.accent }}
                        >
                          9.58 / 10.0
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-400 font-medium">
                          Verified Official Grade
                        </span>
                        <p className="text-xs text-slate-400">KL University</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2
                      className="w-4 h-4"
                      style={{ color: palette.accent }}
                    />
                    <span>AI Fluency for Students – Certificate of Completion (2024)</span>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </div>

            {/* Interactive Terminal */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <InteractiveTerminal />
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="skills"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-8 space-y-3"
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Technical Core
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technical Skills
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Verified skills directly supported by project implementations and coursework.
            </p>
          </motion.div>

          <SkillsMatrix />
        </section>

        {/* Haikei Organic Wave Divider (Flipped) */}
        <HaikeiWaveDivider flip={true} />

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 space-y-3"
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Verified Academic Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Concrete implementations built, tested, and verifiable in an engineering interview.
            </p>
          </motion.div>

          {/* Projects Grid with Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            {VERIFIED_PROJECTS.map((project, idx) => {
              const isFlagship = idx === 0;

              return (
                <motion.div key={project.id} variants={fadeInUp}>
                  <TiltCard maxTilt={6}>
                    <SpotlightCard className="h-full flex flex-col justify-between overflow-hidden relative group">
                      {isFlagship && (
                        <BorderBeam
                          size={240}
                          duration={10}
                          colorFrom={palette.primary}
                          colorTo={palette.accent}
                        />
                      )}

                      <div className="flex-1 flex flex-col">
                        {/* Image Thumbnail with smooth hover zoom */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl flex-shrink-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                          {isFlagship && (
                            <motion.div
                              animate={{ scale: [1, 1.04, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider border shadow-md flex items-center gap-1 text-white"
                              style={{
                                backgroundColor: palette.primary,
                                borderColor: `${palette.primary}88`,
                              }}
                            >
                              <Star className="w-3 h-3 fill-current" />
                              Flagship
                            </motion.div>
                          )}

                          <span
                            className="absolute bottom-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-md"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.6)",
                              borderColor: palette.borderDark,
                              color: palette.accent,
                            }}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">
                              {project.subtitle}
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 pt-1">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Badges with hover lift */}
                          <div className="min-h-[52px] flex flex-wrap content-start gap-1.5 pt-2">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <motion.div
                                key={tech}
                                whileHover={{ scale: 1.08, y: -1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs font-medium px-2.5 py-0.5 border text-slate-300 rounded-md cursor-default"
                                  style={{ borderColor: palette.borderDark }}
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                            {project.techStack.length > 4 && (
                              <motion.div whileHover={{ scale: 1.08, y: -1 }}>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-medium px-2 py-0.5 border text-slate-400 rounded-md cursor-default"
                                  style={{ borderColor: palette.borderDark }}
                                >
                                  +{project.techStack.length - 4}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-6 pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-semibold px-0 text-white hover:text-white flex items-center gap-1.5 group/btn cursor-pointer"
                          style={{ color: palette.accent }}
                        >
                          Deep-Dive Details
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Button>

                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </motion.a>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* RESUME SECTION */}
        <section
          id="resume"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <TiltCard maxTilt={5}>
              <SpotlightCard className="p-8 sm:p-10 relative overflow-hidden">
                <BorderBeam
                  size={300}
                  duration={14}
                  colorFrom={palette.primary}
                  colorTo={palette.accent}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="space-y-2.5 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium text-slate-300">
                      <CheckCircle2
                        className="w-3.5 h-3.5"
                        style={{ color: palette.accent }}
                      />
                      Verified PDF Resume
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      Dhruv B — Official Resume
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Software Development Engineer Intern Candidate. Comprehensive record of university
                      coursework at KL University, academic projects (DSA Tracker, CP Contest Tracker,
                      Digital Spending Tracker), and verified technical skills.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <Magnetic strength={0.3}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          asChild
                          size="lg"
                          className="px-7 py-5 rounded-xl text-sm font-semibold shadow-xl text-white cursor-pointer"
                          style={{
                            backgroundColor: palette.primary,
                            boxShadow: `0 8px 24px -4px ${palette.glow}`,
                          }}
                        >
                          <a href="/Resume.pdf" download="Dhruv_B_Resume.pdf">
                            <Download className="w-4 h-4 mr-2" />
                            Download Resume (PDF)
                          </a>
                        </Button>
                      </motion.div>
                    </Magnetic>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 space-y-3"
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Contact & Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get In Touch
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Available for Software Development Engineer (SDE) internship opportunities and technical conversations.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {/* Email Card */}
            <motion.div variants={fadeInUp}>
              <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px] transition-transform">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                  style={{
                    backgroundColor: `${palette.primary}20`,
                    borderColor: `${palette.primary}44`,
                    color: palette.accent,
                  }}
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-base">Direct Email</h3>
                  <p className="text-xs text-slate-400 mt-1">Primary communication</p>
                </div>
                <a
                  href="mailto:dhruvb324@gmail.com"
                  className="inline-block text-xs font-semibold hover:underline break-all"
                  style={{ color: palette.primary }}
                >
                  dhruvb324@gmail.com
                </a>
              </SpotlightCard>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div variants={fadeInUp}>
              <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px] transition-transform">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 0.4)",
                    color: "#60a5fa",
                  }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-base">LinkedIn</h3>
                  <p className="text-xs text-slate-400 mt-1">Professional network</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/dhruvb-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold hover:underline"
                  style={{ color: palette.primary }}
                >
                  in/dhruvb-tech
                </a>
              </SpotlightCard>
            </motion.div>

            {/* GitHub Card */}
            <motion.div variants={fadeInUp}>
              <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px] transition-transform">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                  style={{
                    backgroundColor: "rgba(168, 85, 247, 0.2)",
                    borderColor: "rgba(168, 85, 247, 0.4)",
                    color: "#c084fc",
                  }}
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-base">GitHub</h3>
                  <p className="text-xs text-slate-400 mt-1">Project repositories</p>
                </div>
                <a
                  href="https://github.com/Dhruv-1309"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold hover:underline"
                  style={{ color: palette.primary }}
                >
                  github.com/Dhruv-1309
                </a>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* Quick Copy Email Action with interactive feedback */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center pt-8"
          >
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-sm hover:bg-white/5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: palette.borderDark,
              }}
              aria-label="Copy email address to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied dhruvb324@gmail.com!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Click to copy email: dhruvb324@gmail.com</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer
          className="border-t py-10 px-4 sm:px-6 lg:px-8 mt-12 pb-28 text-center text-xs text-slate-400 space-y-2.5"
          style={{ borderColor: palette.borderDark }}
        >
          <p className="text-slate-300">
            Designed & Developed by{" "}
            <span className="text-white font-semibold">Dhruv B</span>.
          </p>
          <p className="text-xs text-slate-400">
            Software Development Engineer Intern Candidate • Java · Python · Spring Boot · React · Kotlin
          </p>
          <p className="text-xs text-slate-400 font-mono">
            KL University • B.Tech in Artificial Intelligence & Data Science • Class of 2028 • CGPA: 9.58 / 10.0
          </p>
        </footer>
      </main>

      {/* Floating Navigation Dock */}
      <FloatingDock activeSection={activeSection} />

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
