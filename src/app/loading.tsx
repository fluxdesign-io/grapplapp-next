"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// Ultra-premium loading component with high-end design
export default function Loading() {
  // Animation variants for sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const pulseVariants = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  };
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 3, ease: "easeInOut" }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
          {Array(24).fill(0).map((_, i) => (
            <motion.div 
              key={i}
              className="border-[0.5px] border-gray-700 opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
        
        {/* Decorative circles */}
        {[...Array(5)].map((_, i) => {
          const size = 300 + (i * 50);
          return (
            <motion.div 
              key={i}
              className="absolute rounded-full border border-[#FF5800]/10"
              style={{ 
                width: size, 
                height: size,
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%'
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                delay: i,
                ease: "easeInOut" 
              }}
            />
          );
        })}
      </div>
      
      <motion.div 
        className="text-center z-10 px-8 py-12 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div 
          className="relative w-48 h-20 mx-auto mb-8"
          variants={itemVariants}
          animate={pulseVariants}
        >
          <Image 
            src="/images/PRIMARYGrapplAppLogoORGBLK (1).png" 
            alt="GrapplApp Logo" 
            fill
            className="object-contain filter brightness-150 drop-shadow-[0_0_8px_rgba(255,88,0,0.6)]"
            priority
          />
          
          {/* Glowing overlay effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5800]/20 to-transparent"
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatDelay: 1
            }}
          />
        </motion.div>
        
        {/* Animated hexagon with glow effect */}
        <motion.div 
          className="relative w-16 h-16 mx-auto mb-6"
          variants={itemVariants}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_0_8px_rgba(255,88,0,0.6)]"
          >
            <motion.path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke="#FF5800"
              strokeWidth="2"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            
            <motion.circle 
              cx="50" 
              cy="50" 
              r="25" 
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="157"
              animate={{ 
                strokeDashoffset: [157, 0, 157],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
          
          {/* Pulsing center */}
          <motion.div 
            className="absolute w-3 h-3 bg-[#FF5800] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                '0 0 0 0 rgba(255,88,0,0.7)',
                '0 0 0 10px rgba(255,88,0,0)',
                '0 0 0 0 rgba(255,88,0,0)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
        
        {/* Status text */}
        <motion.div 
          className="text-white font-medium tracking-wider mb-6"
          variants={itemVariants}
        >
          <div className="font-light text-sm text-gray-400 mb-1">INITIALIZING SYSTEM</div>
          <div className="text-lg font-mono text-white">GRAPPL<span className="text-[#FF5800]">APP</span></div>
        </motion.div>
        
        {/* Progress bar */}
        <motion.div 
          className="w-64 h-[2px] bg-gray-800 rounded-full overflow-hidden mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FF5800] to-[#FF8A00]"
            initial="initial"
            animate="animate"
            variants={progressVariants}
          />
        </motion.div>
        
        {/* Dynamic status text */}
        <motion.div 
          className="mt-4 text-xs text-gray-500 font-mono"
          variants={itemVariants}
        >
          <span className="inline-block w-2 h-2 bg-[#FF5800] rounded-full mr-2 animate-pulse"></span>
          Processing jiu-jitsu algorithms...
        </motion.div>
      </motion.div>
    </div>
  );
}
