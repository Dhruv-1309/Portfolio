"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "./ThemeContext";

export interface ProjectScreenshot {
  url: string;
  title: string;
  caption: string;
  tag?: string;
}

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
  screenshots?: ProjectScreenshot[];
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const { palette } = usePortfolioTheme();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when opening a different project
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  if (!project) return null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const currentImage = hasScreenshots
    ? project.screenshots![activeImageIndex].url
    : project.image;
  const currentTitle = hasScreenshots
    ? project.screenshots![activeImageIndex].title
    : project.title;
  const currentCaption = hasScreenshots
    ? project.screenshots![activeImageIndex].caption
    : project.subtitle;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasScreenshots) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? project.screenshots!.length - 1 : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasScreenshots) return;
    setActiveImageIndex((prev) =>
      prev === project.screenshots!.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-4xl my-6 rounded-2xl border shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
          style={{
            backgroundColor: palette.cardDark,
            borderColor: palette.borderDark,
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px ${palette.glow}`,
          }}
        >
          {/* Header Image Gallery & Controls */}
          <div className="relative aspect-video sm:h-80 md:h-96 w-full overflow-hidden flex-shrink-0 bg-slate-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={currentTitle}
                  fill
                  priority
                  className="object-contain sm:object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 pointer-events-none" />

            {/* Top Bar: Close & Fullscreen Action */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
              <a
                href={currentImage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-105 border border-white/10"
                title="View full-resolution screenshot"
                aria-label="View full resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-105 border border-white/10"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Previous / Next Arrows for Gallery */}
            {hasScreenshots && project.screenshots!.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 border border-white/10 z-20 cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 border border-white/10 z-20 cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-10 pointer-events-none">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: `${palette.primary}33`,
                    color: palette.accent,
                    border: `1px solid ${palette.primary}66`,
                  }}
                >
                  {project.category}
                </span>

                {hasScreenshots && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-black/60 border border-white/10">
                    Screenshot {activeImageIndex + 1} of {project.screenshots!.length}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                {currentTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 line-clamp-2 drop-shadow">
                {currentCaption}
              </p>
            </div>
          </div>

          {/* Screenshot Navigation Thumbnails Strip */}
          {hasScreenshots && (
            <div
              className="px-4 sm:px-6 py-2.5 border-b flex items-center gap-2 overflow-x-auto bg-black/40"
              style={{ borderColor: palette.borderDark }}
            >
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
                <Layers className="w-3 h-3 text-cyan-400" />
                Views:
              </span>
              {project.screenshots!.map((sc, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex-shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-white/15 text-white border shadow-sm"
                        : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: palette.accent,
                            color: palette.accent,
                          }
                        : {}
                    }
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{sc.tag || `View ${idx + 1}`}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Metrics HUD Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl border text-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderColor: palette.borderDark,
                  }}
                >
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    {metric.label}
                  </p>
                  <p
                    className="text-base sm:text-lg font-bold mt-0.5 tracking-tight"
                    style={{ color: palette.accent }}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4" style={{ color: palette.primary }} />
                Project Architecture & Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck
                  className="w-4 h-4"
                  style={{ color: palette.primary }}
                />
                Key Technical Capabilities & System Features
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border flex items-start gap-2.5"
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
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
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
                Technologies & Core Frameworks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-2.5 py-0.5 text-xs font-mono rounded-lg border text-slate-200"
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
                className="flex items-center gap-2 text-white font-medium shadow-lg rounded-xl text-xs sm:text-sm"
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
                  className="flex items-center gap-2 rounded-xl text-slate-200 border hover:bg-white/5 text-xs sm:text-sm"
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
                className="ml-auto text-slate-400 hover:text-white text-xs sm:text-sm"
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
