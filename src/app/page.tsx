"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';

// Import custom CSS for grid pattern and animations
import '@/styles/grid-pattern.css';

// Import the PhoneMockup component using dynamic import
const PhoneMockup = dynamic(() => import('../components/ui/PhoneMockup'), {
  ssr: false,
  loading: () => <LoadingComponent />
});

// Reusable UI components for enhanced design
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl p-6 ${className}`}>
    {children}
  </div>
);

// QR Code component with real-like structure
const QRCode = ({ value = 'https://grapplapp.com' }: { value?: string }) => {
  // Function to generate consistent but random-looking QR pattern
  const generateQRPattern = () => {
    // Create a simple hash-like value from the URL to ensure consistency
    const simpleHash = value.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Use the hash to seed our pattern (deterministic randomness)
    const pattern = [];
    for (let i = 0; i < 25; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;
      const isCorner = (row === 0 && col === 0) || 
                      (row === 0 && col === 4) || 
                      (row === 4 && col === 0) || 
                      (row === 4 && col === 4);
      const isBorder = row === 0 || row === 4 || col === 0 || col === 4;
      const isCenter = row === 2 && col === 2;
      
      // Fixed pattern for QR positioning markers
      if (isCorner) {
        pattern.push(true);
      } else if (isBorder) {
        pattern.push((simpleHash + i) % 3 === 0);
      } else if (isCenter) {
        pattern.push(false); // Center is always empty for our logo
      } else {
        // Inner QR data - make it look like real data
        pattern.push((simpleHash + i * 3) % 2 === 0);
      }
    }
    return pattern;
  };
  
  // Generate the QR pattern
  const qrPattern = generateQRPattern();
  
  return (
    <div className="w-full h-full bg-white rounded-lg p-3 shadow-inner">
      <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full">
        {qrPattern.map((filled, i) => (
          <div 
            key={i} 
            className={`${filled ? 'bg-gray-900' : 'bg-transparent'} 
                       ${(i === 0 || i === 4 || i === 20 || i === 24) ? 'rounded-lg' : 'rounded-sm'}
                       relative`}
          >
            {i === 12 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="bg-[#FF5800] text-white w-4 h-4 rounded-sm flex items-center justify-center text-xs font-bold">
                  G
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Ultra-premium loading component with high-end design - white theme with orange accents
function LoadingComponent() {
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
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
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
  
  // Premium white & orange themed loading animation
  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden relative">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {Array(24).fill(0).map((_, i) => (
            <motion.div 
              key={i}
              className="border-[0.5px] border-orange-200 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
        
        {/* Decorative orange circles */}
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
      
      {/* Light orange gradient accents */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-orange-50/30 -z-10"></div>
      <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-orange-100/20 blur-xl"></div>
      <div className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full bg-orange-50/30 blur-2xl"></div>
      
      {/* Main loading card */}
      <motion.div 
        className="text-center z-10 px-10 py-12 bg-white rounded-2xl border border-orange-100 shadow-xl"
        style={{ boxShadow: '0 10px 40px -10px rgba(255, 88, 0, 0.1), 0 0 20px 0 rgba(0, 0, 0, 0.05)' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div 
          className="relative w-48 h-20 mx-auto mb-8"
          variants={itemVariants}
          animate={pulseVariants.pulse}
        >
          <Image 
            src="/images/PRIMARYGrapplAppLogoORGBLK (1).png" 
            alt="GrapplApp Logo" 
            fill
            className="object-contain drop-shadow-[0_0_8px_rgba(255,88,0,0.3)]"
            priority
          />
          
          {/* Glowing overlay effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5800]/20 to-transparent"
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0, 0.3, 0]
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
            className="w-full h-full drop-shadow-[0_0_8px_rgba(255,88,0,0.4)]"
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
              stroke="#FF5800"
              strokeOpacity="0.3"
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
          className="font-medium tracking-wider mb-6"
          variants={itemVariants}
        >
          <div className="font-light text-sm text-gray-500 mb-1">INITIALIZING SYSTEM</div>
          <div className="text-lg font-mono text-gray-800">GRAPPL<span className="text-[#FF5800]">APP</span></div>
        </motion.div>
        
        {/* Progress bar */}
        <motion.div 
          className="w-64 h-[2px] bg-gray-100 rounded-full overflow-hidden mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FF5800] to-[#FF8A00]"
            variants={progressVariants}
            initial="initial"
            animate="animate"
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

// Modern cursor component with orange accent
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;
    
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const updateCursor = (e: MouseEvent) => {
      // Main cursor follows immediately
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Dot follows with slight delay for tech effect
      setTimeout(() => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }, 50);
    };
    
    const updateCursorType = () => {
      const hoveredElement = document.querySelectorAll("a:hover, button:hover, [role='button']:hover, .interactive");
      setIsPointer(hoveredElement.length > 0);
    };
    
    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', updateCursorType);
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, []);
  
  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50 border-2 border-[#FF5800] rounded-full"
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed w-2 h-2 pointer-events-none z-50 rounded-full bg-[#FF5800]"
        animate={{
          opacity: isPointer ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [downloadHovered, setDownloadHovered] = useState(false);
  
  // Use a longer loading time (2000ms) and apply white background immediately
  useEffect(() => {
    // Force white background on HTML and body elements immediately
    document.documentElement.style.backgroundColor = 'white';
    document.body.style.backgroundColor = 'white';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // QR code and download button animation
  const qrVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2, yoyo: Infinity, repeat: 1 } },
    tap: { scale: 0.98 }
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 30, repeat: Infinity, ease: "linear" }
    }
  };

  const counterOrbitVariants = {
    animate: {
      rotate: -360,
      transition: { duration: 40, repeat: Infinity, ease: "linear" }
    }
  };
  
  // Create a style object for enforcing white background
  const whiteBackground = { backgroundColor: 'white' };
  
  useEffect(() => {
    // Force white background on HTML and body elements immediately
    document.documentElement.style.backgroundColor = 'white';
    document.body.style.backgroundColor = 'white';
    
    // Provide enough time for loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-white min-h-screen text-gray-800 overflow-hidden relative" style={whiteBackground}>
      {/* Decorative elements - only show when not loading */}
      {!isLoading && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-screen bg-orange-50/50 -z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full -z-20">
            <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-orange-100/30 blur-xl"></div>
            <div className="absolute top-[40%] right-[5%] w-64 h-64 rounded-full bg-orange-50/50 blur-3xl"></div>
            <div className="absolute bottom-20 left-[20%] w-48 h-48 rounded-full bg-orange-50/40 blur-2xl"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] z-10"></div>
          </div>
        </>
      )}
      
      {/* Premium loading animation with guaranteed white background */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={whiteBackground}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Abstract grid */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                {Array(24).fill(0).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="border-[0.5px] border-orange-200 opacity-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
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
                    className="absolute rounded-full border border-[#FF5800]/20"
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
                      opacity: [0.1, 0.2, 0.1]
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
            
            {/* Content container */}
            <motion.div 
              className="text-center z-10 px-8 py-12 bg-white/80 backdrop-blur-xl rounded-2xl border border-orange-100 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <motion.div 
                className="relative w-48 h-20 mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: [1, 1.05, 1],
                  transition: { delay: 0.2, duration: 0.5 }
                }}
              >
                <Image 
                  src="/images/PRIMARYGrapplAppLogoORGBLK (1).png" 
                  alt="GrapplApp Logo" 
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(255,88,0,0.4)]"
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
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full drop-shadow-[0_0_5px_rgba(255,88,0,0.4)]"
                >
                  <motion.path
                    d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                    fill="none"
                    stroke="#FF5800"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      transition: { 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="25" 
                    fill="none"
                    stroke="#999999"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="font-light text-sm text-gray-500 mb-1">INITIALIZING SYSTEM</div>
                <div className="text-lg font-mono text-gray-800">GRAPPL<span className="text-[#FF5800]">APP</span></div>
              </motion.div>
              
              {/* Progress bar */}
              <motion.div 
                className="w-64 h-[2px] bg-gray-200 rounded-full overflow-hidden mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#FF5800] to-[#FF8A00]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Subtle loading indicator */}
              <motion.div 
                className="mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-2 h-2 mx-1 bg-[#FF5800] rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Enhanced header with logo and merch tab */}
      <header className="bg-white shadow-sm px-2 py-0.5 sm:px-4 sm:py-2 md:py-5 sticky top-0 z-40 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="relative">
            <motion.div 
              className="relative h-12 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-28 h-8 sm:w-32 sm:h-10">
                <Image 
                  src="/images/PRIMARYGrapplAppLogoORGBLK (1).png" 
                  alt="GrapplApp Logo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
              <motion.div 
                className="absolute -inset-2 bg-orange-100 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10"
                initial={false}
              />
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex space-x-8 relative">
            {['Features', 'Merch'].map((item, i) => {
              // Special handling for Merch tab - link to our custom merch page
              if (item === 'Merch') {
                return (
                  <motion.a 
                    key={item} 
                    href="/merch" 
                    className="text-gray-700 hover:text-[#FF5800] font-medium transition-colors flex items-center gap-1 group relative"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#FF5800] group-hover:w-full transition-all duration-300"
                      initial={false}
                    />
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-0 bg-[#FF5800] text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                    >
                      Shop GrapplApp Merch
                    </motion.span>
                  </motion.a>
                );
              }
              
              return (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-700 hover:text-[#FF5800] font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#FF5800] group-hover:w-full transition-all duration-300"
                    initial={false}
                  />
                </motion.a>
              );
            })}
          </nav>
          
          <motion.button 
            className="bg-gradient-to-r from-[#FF5800] to-orange-500 text-white py-2 px-6 rounded-full font-medium shadow-md hover:shadow-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Sign Up</span>
            <motion.div 
              className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600 to-[#FF5800] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              initial={false}
            />
          </motion.button>
        </div>
      </header>
      
      <main className="pt-0 sm:pt-6 md:pt-10 px-4 relative">
        {/* Mobile-optimized Hero section */}
        <section className="container mx-auto">
          {/* Top badges - hide on smaller screens */}
          <div className="hidden sm:flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
            {['BJJ', 'TRAINING', 'PROGRESS'].map((tag, i) => (
              <motion.div 
                key={tag}
                className="bg-white shadow-sm text-[#FF5800] text-[10px] sm:text-xs font-bold py-1 sm:py-1.5 px-3 sm:px-4 rounded-full border border-orange-100 relative overflow-hidden group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{tag}</span>
                <motion.div 
                  className="absolute inset-0 bg-[#FF5800] opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={false}
                />
                <motion.span 
                  className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                  initial={false}
                >
                  {tag}
                </motion.span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-12">
            
            {/* Left content */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.span 
                className="text-xs font-bold tracking-widest text-[#FF5800] mb-1 sm:mb-2 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                THE ULTIMATE JIU-JITSU APP
              </motion.span>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Track Your <span className="text-gradient">Jiu-Jitsu</span> Journey
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-5 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                The ultimate companion app that helps you track progress, analyze techniques, and connect with the global Jiu-Jitsu community.
              </motion.p>
              
              {/* Enhanced download section with animated QR code */}
              <div className="relative mt-8">
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="relative group">
                    {/* Enhanced download button with glow effect */}
                    <motion.button 
                      className="bg-gradient-to-r from-[#FF5800] to-orange-500 text-white py-4 px-8 rounded-lg font-bold shadow-lg flex items-center gap-3 relative overflow-hidden group z-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setDownloadHovered(true)}
                      onHoverEnd={() => setDownloadHovered(false)}
                    >
                      <span className="relative z-10 text-lg">Download App</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      
                      {/* Button glow effect */}
                      <motion.div 
                        className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600 to-[#FF5800] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        initial={false}
                      />
                    </motion.button>
                    
                    {/* Enhanced QR Code popup with our functional component */}
                    <AnimatePresence>
                      {downloadHovered && (
                        <motion.div 
                          className="absolute top-0 left-full ml-6 bg-white p-5 rounded-lg shadow-2xl z-10 origin-left border border-orange-100"
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-36 h-36 relative">
                            {/* Use our functional QR code component */}
                            <QRCode value="https://grapplapp.com/download" />
                            
                            {/* Scan animation effect */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-100/30 to-transparent h-10 z-10 pointer-events-none"
                              animate={{ top: ["-10%", "100%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                            />
                          </div>
                          
                          <div className="mt-3 text-center">
                            <p className="text-sm font-medium text-gray-800">Scan to download</p>
                            <p className="text-xs text-gray-500 mt-1">Or use app store links below</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* App store buttons with enhanced styling */}
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <motion.a 
                      href="#" 
                      className="flex items-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg viewBox="0 0 384 512" width="20" height="20" fill="white" className="relative z-10">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                      </svg>
                      <div>
                        <div className="text-xs opacity-80">Download on</div>
                        <div className="text-sm font-bold">App Store</div>
                      </div>
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
                        initial={false}
                      />
                    </motion.a>
                    
                    <motion.a 
                      href="#" 
                      className="flex items-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg viewBox="0 0 512 512" width="20" height="20" fill="white" className="relative z-10">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                      </svg>
                      <div>
                        <div className="text-xs opacity-80">Download on</div>
                        <div className="text-sm font-bold">Google Play</div>
                      </div>
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
                        initial={false}
                      />
                    </motion.a>
                  </div>
                </motion.div>
                
                {/* Download count indicator */}
                <motion.div 
                  className="mt-6 flex items-center gap-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold">
                        {['J', 'B', 'T', 'M'][i]}
                      </div>
                    ))}
                  </div>
                  <span>Downloaded by <span className="font-semibold text-[#FF5800]">10,000+</span> grapplers worldwide</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right content - Enhanced Phone mockup with animations */}
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {/* Background glow effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/30 rounded-full blur-3xl -z-10"></div>
              
              {/* Orbital rings - modern, refined design */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <motion.div 
                  className="absolute w-full h-full rounded-full border border-[#FF5800]/30"
                  variants={orbitVariants}
                  animate="animate"
                ></motion.div>
                
                <motion.div 
                  className="absolute w-[120%] h-[120%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200"
                  variants={counterOrbitVariants}
                  animate="animate"
                ></motion.div>
                
                {/* Tech dots around the phone */}
                {[1, 2, 3, 4, 5, 6].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 6;
                  const distance = 40 + (i % 2) * 10; // Vary distance for visual interest
                  return (
                    <motion.div 
                      key={i}
                      className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-[#FF5800]' : 'bg-gray-400'} transform -translate-x-1/2 -translate-y-1/2`}
                      style={{ 
                        left: `${50 + distance * Math.cos(angle)}%`, 
                        top: `${50 + distance * Math.sin(angle)}%` 
                      }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                    />
                  );
                })}
                
                {/* Connection lines */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 200 200">
                  <motion.path 
                    d="M100,100 L140,60 M100,100 L150,100 M100,100 L60,140 M100,100 L100,40" 
                    stroke="#FF5800" 
                    strokeWidth="1"
                    strokeDasharray="10,5"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -30 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
              
              {/* Phone mockup with floating effect */}
              <motion.div 
                className="relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup />
                
                {/* Shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    left: ["-100%", "100%", "100%"] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 5 
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced Feature highlights with improved visuals */}
        <section className="container mx-auto py-24 relative overflow-hidden" id="features">
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl -z-10"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-50 rounded-full opacity-30 blur-2xl -z-10"></div>
          
          {/* Animated dots line before heading */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 2 ? 'w-3 h-3 bg-[#FF5800]' : 'bg-gray-300'}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Built For <span className="text-[#FF5800] relative inline-block">
              Serious Training
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced analytics and tracking designed for BJJ practitioners who demand precision in their technical development.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Track Progress',
                description: 'Log your training sessions, techniques practiced, and rolling partners to see your growth over time.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                ),
                color: 'from-orange-500 to-orange-400',
                tagline: 'STAY FOCUSED',
                delay: 0.1
              },
              {
                title: 'Analyze Techniques',
                description: 'Record and analyze your favorite techniques with video support and intelligent feedback.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                ),
                color: 'from-orange-600 to-orange-500',
                tagline: 'MASTER SKILLS',
                delay: 0.3
              },
              {
                title: 'Connect Globally',
                description: 'Join a worldwide community of grapplers, share techniques, and find training partners wherever you go.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
                color: 'from-orange-500 to-orange-400',
                tagline: 'GROW TOGETHER',
                delay: 0.5
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title} 
                className="bg-white shadow-xl p-8 rounded-lg border border-gray-100 hover:border-[#FF5800]/30 transition-all relative overflow-hidden group"
                whileHover={{ y: -8, boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.08), 0 10px 20px -5px rgba(0, 0, 0, 0.04)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.7 }}
                viewport={{ once: true }}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100 to-transparent opacity-50 -mr-6 -mt-6 rounded-full"></div>
                
                {/* Feature tag */}
                <div className="absolute top-4 right-4">
                  <motion.div 
                    className={`text-xs font-bold tracking-wider py-1 px-2 rounded-full bg-gradient-to-r ${feature.color} text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.tagline}
                  </motion.div>
                </div>
                
                <div className="text-[#FF5800] mb-5 p-3 bg-orange-50 inline-block rounded-lg">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                {/* Animated progress bar */}
                <motion.div 
                  className="h-1 w-16 bg-[#FF5800]/20 rounded-full mt-6 group-hover:w-full transition-all duration-700"
                  whileHover={{ width: '100%' }}
                />
                
                {/* Learn more button that appears on hover */}
                <motion.div 
                  className="mt-6 overflow-hidden h-0 group-hover:h-8 transition-all duration-300"
                  initial={false}
                >
                  <a 
                    href="#" 
                    className="text-[#FF5800] font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* "As seen in" section */}
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-sm uppercase tracking-wider text-gray-500 mb-6">LAUNCHING SOON IN</div>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {[
                { name: 'North America', icon: '🇺🇸' },
                { name: 'Europe', icon: '🇪🇺' },
                { name: 'Brazil', icon: '🇧🇷' },
                { name: 'Asia', icon: '🇯🇵' },
                { name: 'Oceania', icon: '🇦🇺' }
              ].map((region, i) => (
                <motion.div 
                  key={region.name}
                  className="flex flex-col items-center justify-center bg-white bg-opacity-10 px-6 py-3 rounded-lg backdrop-blur-sm border border-gray-100 hover:border-[#FF5800]/20 transition-all hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <span className="text-4xl mb-1">{region.icon}</span>
                  <span className="text-gray-700 text-sm font-medium mt-2">{region.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Call to action section */}
        <section className="container mx-auto py-16 px-4 max-w-5xl">
          <motion.div 
            className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-8 md:p-12 shadow-xl border border-orange-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-20 -mt-20 opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100 rounded-full opacity-10"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your <span className="text-[#FF5800]">Jiu-Jitsu</span> Journey?</h2>
                <p className="text-gray-600 mb-0 md:mb-0">Track your progress, analyze techniques, and join the global community of grapplers today.</p>
              </div>
              <div className="w-full md:w-auto">
                <motion.button 
                  className="w-full md:w-auto bg-[#FF5800] text-white px-8 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Download Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-[#FF5800] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* App version */}
        <div className="text-center py-6 text-xs text-gray-400 font-mono">
          <span>VERSION 2.4.1</span> • <span>{new Date().toLocaleDateString()}</span>
        </div>
      </main>

      {/* Mobile Navigation Bar - Only visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 py-2">
        <div className="container flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-700 hover:text-[#FF5800]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/merch" className="flex flex-col items-center p-2 text-gray-700 hover:text-[#FF5800]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
            </svg>
            <span className="text-xs mt-1">Merch</span>
          </Link>
          
          <a href="https://apps.apple.com/us/app/grapplapp/id1577021977" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 text-gray-700 hover:text-[#FF5800]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span className="text-xs mt-1">Download</span>
          </a>
        </div>
      </div>

      {/* Footer with Mostafa Amir attribution */}
      <Footer />
    </div>
  );
}
