"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "./ThemeContext";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  overview: string;
  features: { title: string; description: string }[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const { palette } = usePortfolioTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          style={{
            backgroundColor: palette.cardDark,
            borderColor: palette.borderDark,
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px ${palette.glow}`,
          }}
        >
          {/* Header Image & Close */}
          <div className="relative aspect-video sm:h-72 w-full overflow-hidden flex-shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-transform hover:scale-110 border border-white/10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                style={{
                  backgroundColor: `${palette.primary}33`,
                  color: palette.accent,
                  border: `1px solid ${palette.primary}66`,
                }}
              >
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">{project.subtitle}</p>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Metrics HUD Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl border text-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderColor: palette.borderDark,
                  }}
                >
                  <p className="text-xs text-slate-400">{metric.label}</p>
                  <p
                    className="text-lg font-bold mt-0.5"
                    style={{ color: palette.accent }}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4" style={{ color: palette.primary }} />
                Project Architecture & Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck
                  className="w-4 h-4"
                  style={{ color: palette.primary }}
                />
                Key Technical Capabilities
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border flex items-start gap-3"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      borderColor: palette.borderDark,
                    }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: palette.primary }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {feat.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 text-xs font-mono rounded-lg border text-slate-200"
                    style={{ borderColor: palette.borderDark }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
              <Button
                asChild
                className="flex items-center gap-2 text-white font-medium shadow-lg rounded-xl"
                style={{
                  backgroundColor: palette.primary,
                }}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Repository
                </a>
              </Button>

              {project.liveUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2 rounded-xl text-slate-200 border hover:bg-white/5"
                  style={{ borderColor: palette.borderDark }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Application
                  </a>
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={onClose}
                className="ml-auto text-slate-400 hover:text-white"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
