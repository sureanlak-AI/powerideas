"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { Typewriter } from "./typewriter";

interface HeroScrollAnimationProps {
  children: ReactNode;
  heroContent: ReactNode;
  className?: string;
}

export function HeroScrollAnimation({ 
  children, 
  heroContent, 
  className = "" 
}: HeroScrollAnimation) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero fades out completely in the first 100vh of scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  // Scroll indicator fades quickly
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hero section — sticky, fades out, then content scrolls in */}
      <motion.div 
        className="sticky top-0 h-screen flex items-center justify-center bg-[#FCFBF8] overflow-hidden pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <motion.div style={{ scale: heroScale, y: heroY }} className="w-full h-full pointer-events-auto">
          {heroContent}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1"
            >
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content — solid background, scrolls over the faded hero */}
      <div className="relative bg-[#FCFBF8]">
        {children}
      </div>
    </div>
  );
}

export function HeroContent() {
  const words = ["con IA", "estrategia", "tecnología", "sin código", "ahora"];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Logo positioned at top left */}
      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}logo_ANLAK_Positivo.png`} 
          alt="ANLAK Logo" 
          className="h-12 md:h-16"
        />
      </motion.div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-orange-100/20 to-amber-100/20 blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main content - centered text */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              Piensa en grande.
            </motion.div>
            
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-3 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-gray-900">Crea</span>
              <div className="relative h-16 md:h-20 lg:h-24 flex items-center justify-start min-w-[200px] md:min-w-[300px]">
                <Typewriter 
                  words={words}
                  typingSpeed={120}
                  deletingSpeed={60}
                  delayBetweenWords={2500}
                  className="text-4xl md:text-6xl lg:text-7xl"
                />
              </div>
            </motion.div>
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
