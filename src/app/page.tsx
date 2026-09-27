"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: "spending-tracker",
    title: "Digital Spending Tracker",
    subtitle: "Data-driven expense intelligence & predictive runway forecasting",
    category: "AI & Data Science",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    description:
      "A sophisticated expense intelligence system that leverages statistical models (Z-score anomaly detection) and predictive regression to forecast budget depletion and optimize spending habits.",
    overview:
      "Developed to solve the opacity in personal finances. Instead of basic spreadsheets, this system automatically cleans transactional feeds, models spending velocity, calculates standard deviations, and alerts users before anomalous expenses compromise monthly savings goals.",
    features: [
      {
        title: "Statistical Anomaly Detection",
        description: "Utilizes Z-score mathematical models to flag unusual transactions beyond standard deviation thresholds.",
      },
      {
        title: "Predictive Balance Runway",
        description: "Calculates precise depletion dates based on rolling consumption rates and fixed recurring liabilities.",
      },
      {
        title: "Automated Categorization",
        description: "Rule-based and heuristic classification algorithms for merchant mapping and spending breakdown.",
      },
      {
        title: "Actionable Intelligence",
        description: "Generates data-backed recommendations to optimize cash flow and curb avoidable expenditures.",
      },
    ],
    metrics: [
      { label: "Anomaly Accuracy", value: "94.2%" },
      { label: "Data Engine", value: "Pandas/NumPy" },
      { label: "Runway Error", value: "±2 Days" },
    ],
    techStack: [
      "Python",
      "Data Science",
      "Statistical Analysis",
      "Pandas",
      "NumPy",
      "Data Visualization",
    ],
    githubUrl: "https://github.com/Dhruv-1309",
  },
  {
    id: "prompt-studio",
    title: "AI Prompt Optimization Studio",
    subtitle: "Systematic GenAI prompt benchmarking & token efficiency engine",
    category: "Generative AI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop",
    description:
      "A developer utility for designing, testing, and evaluating complex LLM prompts with token economy analysis and structured JSON Schema validation.",
    overview:
      "Prompt engineering is often treated as trial-and-error. This studio introduces formal prompt evaluation metrics, comparing zero-shot vs few-shot chain-of-thought efficiency to minimize hallucinations and API costs.",
    features: [
      {
        title: "Few-Shot Prompt Formulator",
        description: "Automated template expansion with dynamic dynamic few-shot context injection.",
      },
      {
        title: "Token Cost Optimizer",
        description: "Identifies semantic redundancies to reduce prompt token footprint by up to 28%.",
      },
      {
        title: "Structured Schema Verifier",
        description: "Ensures model outputs strictly adhere to target JSON schemas without deviation.",
      },
      {
        title: "Benchmark Comparison",
        description: "Side-by-side response quality scoring based on coherence and guideline adherence.",
      },
    ],
    metrics: [
      { label: "Token Savings", value: "~28%" },
      { label: "Output Schema Pass", value: "99.1%" },
      { label: "Latency Gain", value: "1.4x" },
    ],
    techStack: [
      "Python",
      "Prompt Engineering",
      "LLM Workflows",
      "JSON Schema",
      "Evaluation Metrics",
    ],
    githubUrl: "https://github.com/Dhruv-1309",
  },
  {
    id: "academic-analytics",
    title: "Predictive Academic Milestone Model",
    subtitle: "Supervised machine learning for performance forecasting",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    description:
      "An end-to-end machine learning pipeline that predicts examination outcomes and identifies critical academic milestones using historical educational datasets.",
    overview:
      "Built using Python and Scikit-Learn to uncover correlations between attendance patterns, continuous assessment milestones, and final semester performance to provide early proactive interventions.",
    features: [
      {
        title: "Feature Importance Analysis",
        description: "Reveals the highest predictive indicators for academic achievement across student cohorts.",
      },
      {
        title: "Ensemble Classification",
        description: "Combines Random Forest and Logistic Regression models for robust generalization.",
      },
      {
        title: "Data Preprocessing Pipeline",
        description: "Robust handling of missing values, standard scaling, and categorical encoding.",
      },
      {
        title: "Interactive Visualizations",
        description: "Heatmaps and ROC-AUC curve dashboards to interpret model decisions.",
      },
    ],
    metrics: [
      { label: "Model Accuracy", value: "88.6%" },
      { label: "F1 Score", value: "0.87" },
      { label: "Algorithms", value: "RF & Ridge" },
    ],
    techStack: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
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
      {/* Haikei Organic Background Art */}
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
            <Magnetic strength={0.2}>
              <a
                href="#home"
                className="flex items-center gap-2 group cursor-pointer"
                aria-label="Home - B Dhruv Portfolio"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider shadow-lg border transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: `${palette.primary}20`,
                    borderColor: palette.borderDark,
                    color: palette.accent,
                  }}
                >
                  BD
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-slate-200">
                    B Dhruv
                  </span>
                  <span className="block text-xs text-slate-400 font-mono">
                    AI & Data Science
                  </span>
                </div>
              </a>
            </Magnetic>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-3">
            {/* Issue 5: Standardized text-xs (12px min) */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md"
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
                Available for AI Internships
              </span>
            </div>

            {/* Realtime Colors Theme Switcher */}
            <PaletteSwitcher />

            {/* Issue 24: Header Resume button uses subtle outlined secondary styling, keeping Explore Projects as primary CTA */}
            <Magnetic strength={0.25}>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-medium px-3.5 py-1.5 text-slate-200 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-all shadow-sm"
              >
                <a href="/Resume.pdf" download>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Resume
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* HERO SECTION - Issues 13 & 25: Streamlined interactive density, clear visual hierarchy */}
        <section
          id="home"
          className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-inner backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: palette.borderDark,
              }}
            >
              <Sparkles
                className="w-4 h-4 animate-spin"
                style={{
                  color: palette.accent,
                  animationDuration: "8s",
                }}
              />
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                KLH University, Hyderabad • B.Tech AI & Data Science
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]"
              >
                Hi, I'm{" "}
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #ffffff 20%, ${palette.primary} 70%, ${palette.accent} 100%)`,
                  }}
                >
                  B Dhruv
                </span>
              </motion.h1>

              {/* Issue 14: Clear, cohesive specialization headline with animated dynamic role */}
              <div className="text-lg sm:text-2xl text-slate-300 font-medium flex items-center justify-center gap-2 flex-wrap min-h-[40px]">
                <span className="text-slate-400">Specializing in</span>
                <TextMorph
                  words={[
                    "Artificial Intelligence",
                    "Data Science & Analytics",
                    "Prompt Engineering",
                    "Machine Learning Pipelines",
                  ]}
                  className="font-bold underline decoration-2 underline-offset-8"
                  style={{
                    color: palette.accent,
                    textDecorationColor: palette.primary,
                  }}
                />
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Second-year undergraduate at KLH University maintaining a{" "}
              <span className="font-semibold text-white">9.0+ CGPA</span>.
              Architecting intelligent software by bridging statistical rigor with
              modern full-stack engineering.
            </motion.p>

            {/* Hero CTAs (Issue 13 & 25: Clear primary vs secondary CTA + clean social handles) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Magnetic strength={0.25}>
                <Button
                  onClick={() => scrollTo("projects")}
                  size="lg"
                  className="relative group overflow-hidden px-8 py-5 rounded-xl text-sm font-semibold shadow-xl text-white border-0 transition-transform active:scale-95"
                  style={{
                    backgroundColor: palette.primary,
                    boxShadow: `0 8px 20px -4px ${palette.glow}`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    Explore Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
                    }}
                  />
                </Button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Button
                  onClick={() => scrollTo("contact")}
                  variant="outline"
                  size="lg"
                  className="px-8 py-5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5 active:scale-95 text-slate-200"
                  style={{
                    borderColor: palette.borderDark,
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" style={{ color: palette.accent }} />
                  Let's Connect
                </Button>
              </Magnetic>

              {/* Connected Profiles (GitHub & LinkedIn) */}
              <div className="flex items-center gap-2 pl-2">
                <Magnetic strength={0.3}>
                  <a
                    href="https://github.com/Dhruv-1309"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-300 hover:text-white transition-all backdrop-blur-md hover:scale-105 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      borderColor: palette.borderDark,
                    }}
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href="https://www.linkedin.com/in/dhruvb-tech"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border flex items-center justify-center text-slate-300 hover:text-white transition-all backdrop-blur-md hover:scale-105 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      borderColor: palette.borderDark,
                    }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skiper UI Infinite Tech Marquee */}
        <section className="relative z-10 border-y border-white/5 py-3 bg-black/20" aria-label="Core Technology Ribbon">
          <TechMarquee />
        </section>

        {/* Haikei Organic Wave Divider */}
        <HaikeiWaveDivider />

        {/* ABOUT & ACADEMICS SECTION */}
        <section
          id="about"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            {/* Issue 6: Replaced 28-char all-caps with readable title case */}
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Academic Background & Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Engineering Intelligent Systems
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Committed to deep technical mastery in AI, mathematical reasoning,
              and robust software development.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Education Card */}
            <div className="lg:col-span-6 space-y-6">
              <TiltCard maxTilt={8}>
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border"
                      style={{
                        backgroundColor: `${palette.primary}25`,
                        borderColor: `${palette.primary}44`,
                        color: palette.accent,
                      }}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    {/* Issue 16: Positioned Academic Distinction badge right beside the degree title for clear grouping */}
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
                          <span>Academic Distinction</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        B.Tech in Artificial Intelligence & Data Science
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: palette.primary }}
                      >
                        KLH University, Hyderabad
                      </p>
                      <p className="text-xs text-slate-400">
                        Second Year Undergraduate (2023 – 2027)
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Rigorous coursework encompassing Data Structures & Algorithms,
                      Object-Oriented Programming, Database Management Systems,
                      Calculus, Linear Algebra, Probability & Statistics, and Applied
                      Machine Learning.
                    </p>

                    {/* CGPA Badge HUD - Issue 7: Replaced 30-char all-caps with sentence case */}
                    <div
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
                          9.0+ CGPA
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-400 font-medium">
                          Top Tier Percentile
                        </span>
                        <p className="text-xs text-slate-400">Consistent Record</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2
                      className="w-4 h-4"
                      style={{ color: palette.accent }}
                    />
                    <span>Active participant in university AI & tech workshops</span>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </div>

            {/* Interactive Vengeance UI Developer Terminal */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <InteractiveTerminal />
            </div>
          </div>
        </section>

        {/* SKILLS SECTION - Issue 17: Reduced mb-14 to mb-8 for tight visual grouping with filter pills */}
        <section
          id="skills"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Technical Core & Proficiency
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills Matrix & Competencies
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Carefully honed toolset across artificial intelligence, systems
              programming, data analytics, and modern software design.
            </p>
          </div>

          <SkillsMatrix />
        </section>

        {/* Haikei Organic Wave Divider (Flipped) */}
        <HaikeiWaveDivider flip={true} />

        {/* FEATURED PROJECTS SECTION */}
        <section
          id="projects"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Applied Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Production-oriented solutions spanning statistical anomaly
              detection, prompt evaluation frameworks, and machine learning models.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {FEATURED_PROJECTS.map((project, idx) => {
              const isFlagship = idx === 0;

              return (
                <TiltCard key={project.id} maxTilt={6}>
                  {/* Issue 20 & 23: Flexbox card column layout with pinned footer */}
                  <SpotlightCard className="h-full flex flex-col justify-between overflow-hidden relative group">
                    {/* Animaster Lib BorderBeam on Flagship */}
                    {isFlagship && (
                      <BorderBeam
                        size={240}
                        duration={10}
                        colorFrom={palette.primary}
                        colorTo={palette.accent}
                      />
                    )}

                    <div className="flex-1 flex flex-col">
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {isFlagship && (
                          <div
                            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider border shadow-md flex items-center gap-1 text-white"
                            style={{
                              backgroundColor: palette.primary,
                              borderColor: `${palette.primary}88`,
                            }}
                          >
                            <Star className="w-3 h-3 fill-current" />
                            Flagship
                          </div>
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

                      {/* Content - Issue 23: Tightened vertical spacing to keep description, tags, and actions cohesive */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {project.subtitle}
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 pt-1">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Badges - Issue 21: Standardized min-height container for consistent spacing across cards */}
                        <div className="min-h-[52px] flex flex-wrap content-start gap-1.5 pt-2">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs font-medium px-2.5 py-0.5 border text-slate-300 rounded-md"
                              style={{ borderColor: palette.borderDark }}
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <Badge
                              variant="outline"
                              className="text-xs font-medium px-2 py-0.5 border text-slate-400 rounded-md"
                              style={{ borderColor: palette.borderDark }}
                            >
                              +{project.techStack.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions - Issue 20 & 30: mt-auto for perfect vertical alignment and labeled GitHub button */}
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

                      {/* Issue 30: Added clear 'View Code' label to GitHub button */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* RESUME SECTION */}
        <section
          id="resume"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20"
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
                    ATS-Optimized Curriculum Vitae
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    B Dhruv — Official Resume
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Detailed breakdown of university coursework, AI & Data Science
                    projects, core competencies in Python, Java, SQL, Prompt
                    Engineering, and verified academic credentials.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Magnetic strength={0.3}>
                    <Button
                      asChild
                      size="lg"
                      className="px-7 py-5 rounded-xl text-sm font-semibold shadow-xl text-white"
                      style={{
                        backgroundColor: palette.primary,
                        boxShadow: `0 8px 24px -4px ${palette.glow}`,
                      }}
                    >
                      <a href="/Resume.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </SpotlightCard>
          </TiltCard>
        </section>

        {/* CONTACT SECTION - Issue 12 & 25: Fixed heading hierarchy H2 -> H3 and consolidated 1-click email copy action */}
        <section
          id="contact"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${palette.primary}15`,
                borderColor: palette.borderDark,
                color: palette.accent,
              }}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let's Build Something Meaningful
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Actively seeking Summer AI/ML internships, research assistantships,
              and collaborative engineering challenges.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Email Card - Issue 12: h3 instead of h4 */}
            <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px]">
              <div
                className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: `${palette.primary}20`,
                  borderColor: `${palette.primary}44`,
                  color: palette.accent,
                }}
              >
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Direct Email</h3>
                <p className="text-xs text-slate-400 mt-1">Quickest response</p>
              </div>
              <a
                href="mailto:dhruvb324@gmail.com"
                className="inline-block text-xs font-semibold hover:underline break-all"
                style={{ color: palette.primary }}
              >
                dhruvb324@gmail.com
              </a>
            </SpotlightCard>

            {/* LinkedIn Card */}
            <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px]">
              <div
                className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  borderColor: "rgba(59, 130, 246, 0.4)",
                  color: "#60a5fa",
                }}
              >
                <Linkedin className="w-5 h-5" />
              </div>
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

            {/* GitHub Card */}
            <SpotlightCard className="p-6 text-center space-y-4 hover:translate-y-[-2px]">
              <div
                className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  color: "#c084fc",
                }}
              >
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">GitHub</h3>
                <p className="text-xs text-slate-400 mt-1">Code repositories</p>
              </div>
              <a
                href="https://github.com/Dhruv-1309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold hover:underline"
                style={{ color: palette.primary }}
              >
                @Dhruv-1309
              </a>
            </SpotlightCard>
          </div>

          {/* Issue 25: 1-Click Copy Email Action grouped cleanly into Contact section */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleCopyEmail}
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
            </button>
          </div>
        </section>

        {/* FOOTER - Issues 9 & 10: Standardized text sizes (12px min) */}
        <footer
          className="border-t py-10 px-4 sm:px-6 lg:px-8 mt-12 pb-28 text-center text-xs text-slate-400 space-y-2.5"
          style={{ borderColor: palette.borderDark }}
        >
          <p className="text-slate-300">
            Designed & Developed by{" "}
            <span className="text-white font-semibold">B Dhruv</span>.
          </p>
          <p className="text-xs text-slate-400">
            Crafted with Next.js, Framer Motion, Motion Primitives, Haikei SVG
            Generators, Realtime Colors, Animaster Lib, Skiper UI, and Vengeance UI.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            KLH University • Artificial Intelligence & Data Science • 2025–2026
          </p>
        </footer>
      </main>

      {/* Skiper UI Interactive Floating Navigation Dock */}
      <FloatingDock activeSection={activeSection} />

      {/* Vengeance UI Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
