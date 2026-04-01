"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function Typewriter({ 
  words, 
  className = "", 
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isTyping && !isDeleting) {
        // Typing phase
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Word complete, start delay before deleting
          setTimeout(() => {
            setIsDeleting(true);
            setIsTyping(false);
          }, delayBetweenWords);
        }
      } else if (isDeleting) {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTimeout(() => {
            setIsTyping(true);
          }, 200);
        }
      }
    }, isTyping && !isDeleting ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isTyping, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="bg-gradient-to-r from-[#82c4cb] to-blue-700 bg-clip-text text-transparent font-extrabold">
        {currentText}
      </span>
      {/* Blinking cursor */}
      <motion.span
        className="ml-1 bg-gradient-to-r from-[#82c4cb] to-blue-700 bg-clip-text text-transparent"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        |
      </motion.span>
    </div>
  );
} 