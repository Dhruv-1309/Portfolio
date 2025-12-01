"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Download, Code2, Database, Brain, Sparkles, ArrowRight, GraduationCap, Award, TrendingDown, ExternalLink, Home, User, FolderOpen, MessageSquare, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    { name: "Python", icon: Code2, color: "from-blue-500 to-cyan-500" },
    { name: "Core Java", icon: Code2, color: "from-orange-500 to-red-500" },
    { name: "SQL", icon: Database, color: "from-indigo-500 to-purple-500" },
    { name: "Prompt Engineering", icon: Brain, color: "from-green-500 to-emerald-500" },
  ];

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: MessageSquare }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Close menu after a small delay to ensure scroll initiates
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 100);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-lg" 
            : "bg-background/80 backdrop-blur-xl border-b border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.h2 
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              B Dhruv
            </motion.h2>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)} 
                  className="relative group px-4 py-2 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:w-full transition-all duration-300" 
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors text-left group"
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    <span className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden scroll-mt-20">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
              AI & Data Science Student
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            >
              Hi, I'm{" "}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                B Dhruv
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Second-year B.Tech student at KLH University, Hyderabad. Passionate about building intelligent solutions 
              through artificial intelligence and data science.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4 px-4 sm:px-0"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  onClick={() => scrollToSection("projects")} 
                  size="lg" 
                  className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-2xl border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-3">
                    <FolderOpen className="w-5 h-5" />
                    View My Work
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  onClick={() => scrollToSection("contact")} 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto relative overflow-hidden border-2 border-blue-500/50 hover:border-blue-500 bg-background/50 backdrop-blur-xl hover:bg-blue-500/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl group transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="relative flex items-center justify-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    Get in Touch
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8"
            >
              {[
                { href: "https://github.com/Dhruv-1309", icon: Github },
                { href: "https://www.linkedin.com/in/dhruvb-tech", icon: Linkedin },
                { href: "mailto:dhruvb324@gmail.com", icon: Mail }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-muted hover:bg-accent flex items-center justify-center transition-all"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">About Me</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Driven by curiosity and a passion for innovation in AI and data science
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {/* Education Card */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 hover:border-blue-500/50 transition-all hover:shadow-xl group h-full">
                <CardHeader className="space-y-4">
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl">Education</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2">Academic Journey</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-bold text-lg sm:text-xl">B.Tech in AI & Data Science</h3>
                    <p className="text-muted-foreground font-medium text-sm sm:text-base">KLH University, Hyderabad</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Currently in Second Year</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-base sm:text-lg">CGPA: 9+</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Maintaining excellent academic performance</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Card */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 hover:border-violet-500/50 transition-all hover:shadow-xl group h-full">
                <CardHeader className="space-y-4">
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl">Technical Skills</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2">Core Competencies</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={fadeInUp}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="group relative overflow-hidden p-3 sm:p-4 rounded-xl border-2 hover:border-transparent transition-all bg-card cursor-pointer"
                      >
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="relative flex items-center gap-3">
                          <motion.div 
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-md`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </motion.div>
                          <span className="font-semibold text-sm sm:text-base">{skill.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-violet-500 pl-4">
                    Continuously learning and expanding my technical expertise
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Showcasing practical applications of data science and programming
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              layout
              onClick={() => setIsProjectExpanded(!isProjectExpanded)}
              className="cursor-pointer"
              whileHover={{ scale: isProjectExpanded ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`border-2 hover:border-blue-500/50 transition-all hover:shadow-2xl group ${
                isProjectExpanded ? '' : 'max-w-md mx-auto'
              }`}>
                <CardHeader className="space-y-4 sm:space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: isProjectExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                    </motion.div>
                  </div>
                  <div>
                    <CardTitle className={`${isProjectExpanded ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'} mb-2 sm:mb-3 transition-all`}>
                      Digital Spending Tracker
                    </CardTitle>
                    <CardDescription className={`${isProjectExpanded ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} transition-all`}>
                      An intelligent expense management system powered by data science
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {isProjectExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <CardContent className="space-y-6 sm:space-y-8">
                        {/* Project Image */}
                        <motion.div 
                          className="relative aspect-video rounded-2xl overflow-hidden border-2 shadow-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop"
                            alt="Digital Spending Tracker"
                            width={800}
                            height={450}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>

                        {/* Project Description */}
                        <motion.div 
                          className="space-y-2 sm:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4 className="font-bold text-lg sm:text-xl">Project Overview</h4>
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                            A sophisticated expense tracking application that leverages data science techniques to provide 
                            users with intelligent insights into their spending patterns and financial health.
                          </p>
                        </motion.div>

                        {/* Key Features */}
                        <div className="space-y-3 sm:space-y-4">
                          <h4 className="font-bold text-lg sm:text-xl">Key Features</h4>
                          <motion.div 
                            className="grid gap-3 sm:gap-4"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                          >
                            {[
                              {
                                title: "Expense Tracking",
                                description: "Comprehensive system to log and categorize daily expenses"
                              },
                              {
                                title: "Statistical Analysis",
                                description: "Calculates average spending and z-scores to identify unusual spending patterns"
                              },
                              {
                                title: "Predictive Analytics",
                                description: "Estimates when current balance will be depleted based on spending rate"
                              },
                              {
                                title: "Smart Insights",
                                description: "Provides actionable recommendations to improve financial management"
                              }
                            ].map((feature, index) => (
                              <motion.div 
                                key={index} 
                                className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/50 border hover:border-blue-500/50 hover:bg-muted transition-all"
                                variants={fadeInUp}
                                whileHover={{ 
                                  x: 10,
                                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <motion.div 
                                  className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                />
                                <div>
                                  <p className="font-semibold text-sm sm:text-base md:text-lg mb-1">{feature.title}</p>
                                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base">{feature.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Tech Stack */}
                        <motion.div 
                          className="space-y-3 sm:space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h4 className="font-bold text-lg sm:text-xl">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Python", "Data Science", "Statistical Analysis", "Pandas", "NumPy", "Data Visualization"].map((tech, index) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border hover:bg-accent hover:border-blue-500 transition-all"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Open to opportunities, collaborations, and conversations
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2">
              <CardContent className="p-6 sm:p-8">
                <motion.div 
                  className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      href: "mailto:dhruvb324@gmail.com",
                      icon: Mail,
                      gradient: "from-blue-500 to-cyan-600",
                      borderColor: "blue-500",
                      title: "Email",
                      subtitle: "dhruvb324@gmail.com"
                    },
                    {
                      href: "https://github.com/Dhruv-1309",
                      icon: Github,
                      gradient: "from-violet-500 to-purple-600",
                      borderColor: "violet-500",
                      title: "GitHub",
                      subtitle: "@Dhruv-1309"
                    },
                    {
                      href: "https://www.linkedin.com/in/dhruvb-tech",
                      icon: Linkedin,
                      gradient: "from-blue-500 to-blue-700",
                      borderColor: "blue-500",
                      title: "LinkedIn",
                      subtitle: "dhruvb-tech"
                    }
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      variants={fadeInUp}
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl border-2 hover:border-${contact.borderColor} bg-card hover:bg-accent/50 transition-all cursor-pointer`}
                    >
                      <motion.div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center shadow-md`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <contact.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </motion.div>
                      <div>
                        <p className="font-bold text-base sm:text-lg">{contact.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground break-all">{contact.subtitle}</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-center pt-6 sm:pt-8 border-t"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-2xl transition-all"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send a Message
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 sm:py-12 px-4 sm:px-6 border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © 2025 B Dhruv. Built with Next.js and Tailwind CSS.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {[
                { href: "https://github.com/Dhruv-1309", label: "GitHub" },
                { href: "https://www.linkedin.com/in/dhruvb-tech", label: "LinkedIn" },
                { href: "mailto:dhruvb324@gmail.com", label: "Contact" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors relative text-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-violet-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}