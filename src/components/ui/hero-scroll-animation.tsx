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
}: HeroScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Transform values for content
  const contentY = useTransform(scrollYProgress, [0, 0.7, 1], [100, 0, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, 1]);

  // Transform values for scroll indicator - disappears when user starts scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hero Background - Fixed */}
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#FCFBF8] relative"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        {heroContent}
        
        {/* Scroll to explore indicator - positioned at bottom of hero viewport */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          style={{
            opacity: scrollIndicatorOpacity,
            y: scrollIndicatorY,
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            {/* Text */}
            <motion.span
              className="text-sm font-medium text-gray-700 tracking-wide"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to explore
            </motion.span>
            
            {/* Animated mouse icon */}
            <motion.div
              className="relative w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                borderColor: ["#9CA3AF", "#6B7280", "#9CA3AF"] 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Mouse wheel */}
              <motion.div
                className="w-1 h-3 bg-gray-500 rounded-full mt-2"
                animate={{ 
                  y: [0, 12, 0],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Animated arrow */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content that appears on scroll */}
      <motion.div
        className="relative z-10 bg-[#FCFBF8]"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        {/* Spacer to create scroll distance */}
        <div className="h-screen" />
        
        {/* Actual content */}
        <div className="min-h-screen">
          {children}
        </div>
      </motion.div>
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
          src="/logo_ANLAK_Positivo.png" 
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
        {/* Title with typewriter effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            {/* First line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              Piensa en grande.
            </motion.div>
            
            {/* Second line with typewriter effect */}
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-3 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-gray-900">Crea</span>
              
              {/* Typewriter component */}
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