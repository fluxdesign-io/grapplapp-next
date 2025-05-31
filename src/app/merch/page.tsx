"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ULTRA-premium merch page with next-level graphic design
export default function MerchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);
  const isInView = useInView(pageRef);
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    // Only enable parallax effects on desktop to improve mobile performance
    const isMobile = window.innerWidth <= 768;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Skip on mobile devices for better performance
      
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate mouse position as normalized values (-1 to 1)
      const normalizedX = (clientX / windowWidth) * 2 - 1;
      const normalizedY = (clientY / windowHeight) * 2 - 1;
      
      setMousePosition({ x: normalizedX, y: normalizedY });
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    
    // For mobile, set default values to enable static effects
    if (isMobile) {
      mouseX.set(0);
      mouseY.set(0);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Fix for mobile loading issues
  useEffect(() => {
    document.documentElement.style.backgroundColor = 'white';
    document.body.style.backgroundColor = 'white';
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      if (window.innerWidth <= 768) {
        window.scrollBy(0, 1);
        setTimeout(() => window.scrollBy(0, -1), 100);
      }
    }, 600);
    
    const redirectTimer = setTimeout(() => {
      setIsRedirecting(true);
      
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            window.location.href = 'https://grapplmerch.printful.me/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    }, 1500);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(redirectTimer);
    };
  }, []);
  
  // Merch store URL
  const MERCH_STORE_URL = 'https://grapplmerch.printful.me/';
  
  // Redirect handler
  const handleRedirectNow = () => {
    window.location.href = MERCH_STORE_URL;
  };
  
  // Premium background component - optimized for all devices
  const PremiumBackground = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const bgX = useTransform(mouseX, [-1, 1], [-5, 5]);
    const bgY = useTransform(mouseY, [-1, 1], [-5, 5]);
    
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 10 : 20;
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"
          style={{ x: bgX, y: bgY }}
        />
        
        <div className="absolute inset-0 opacity-10 sm:opacity-20">
          <div className="absolute inset-0" style={{ 
            background: 'linear-gradient(135deg, transparent 45%, #FF5800 45%, #FF5800 46%, transparent 46%)', 
            backgroundSize: isMobile ? '20px 20px' : '30px 30px' 
          }}></div>
        </div>
        
        {/* Subtle particles - reduced for mobile */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[#FF5800]/30' : 'bg-gray-200/40'}`}
            style={{
              width: 2 + Math.random() * (isMobile ? 2 : 3),
              height: 2 + Math.random() * (isMobile ? 2 : 3),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, isMobile ? -8 : -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * (isMobile ? 5 : 10),
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-white" ref={pageRef}>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 border-4 border-orange-100 border-t-[#FF5800] rounded-full animate-spin mb-4"></div>
              <h2 className="text-gray-800 font-semibold">Loading GrapplApp Merch</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-1 sm:gap-2">
              <motion.div 
                whileHover={{ x: -3 }}
                className="text-gray-700 hover:text-[#FF5800]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </motion.div>
              <span className="font-bold text-lg sm:text-xl whitespace-nowrap">
                <span className="text-[#FF5800]">Grappl</span>
                <span className="text-gray-800">App</span>
              </span>
            </Link>
            
            <motion.button 
              className="bg-[#FF5800] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium shadow-md relative overflow-hidden group whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRedirectNow}
            >
              <span className="relative z-10">Go to Store</span>
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex flex-col items-center justify-center w-full py-8 px-4 relative">
        <PremiumBackground />
        
        {/* Main banner - SpaceX inspired, optimized for mobile and desktop */}
        <div className="w-full max-w-[95vw] sm:max-w-[90vw] mx-auto mb-8 sm:mb-12">
          <div className="relative py-6 sm:py-10">
            <motion.div 
              className="w-full bg-gradient-to-r from-white via-gray-50 to-white rounded-xl overflow-hidden relative py-8 sm:py-12 px-4 sm:px-8 md:px-12"
              style={{
                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,88,0,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                borderLeft: '1px solid rgba(255,255,255,0.6)',
                borderRight: '1px solid rgba(220,220,220,0.4)',
                borderBottom: '1px solid rgba(200,200,200,0.4)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Futuristic grid overlay */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `linear-gradient(transparent 95%, rgba(255,88,0,0.3) 95%), linear-gradient(90deg, transparent 95%, rgba(255,88,0,0.3) 95%)`,
                    backgroundSize: '20px 20px'
                  }}
                ></div>
              </div>
              
              {/* Shine effect */}
              <motion.div 
                className="absolute -top-[400px] left-0 w-full h-[600px] bg-white opacity-20"
                style={{
                  transform: 'skewY(-10deg)'
                }}
                animate={{
                  left: ['-100%', '100%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                  repeatDelay: 10
                }}
              />
              {/* Responsive horizontal layout - optimized for all devices */}
              <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
                {/* Left section with logo - Responsive sizing */}
                <div className="flex-shrink-0 md:w-1/4 lg:w-1/6 relative md:pt-2">
                  {/* Logo container */}
                  <motion.div 
                    className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center z-10 shadow-[0_0_30px_5px_rgba(255,255,255,0.4)] mx-auto"
                    style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,88,0,0.05) inset, 0 0 15px 3px rgba(255,255,255,0.6)' }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ rotateY: [0, 360], rotateZ: [0, 5, -5, 0] }}
                    transition={{ 
                      rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                      rotateZ: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    {/* Logo effects */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-50 to-white blur-lg"></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50 opacity-80"></div>
                      
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute w-[200%] h-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                        style={{ transform: "rotate(30deg) translateY(-50%)" }}
                      />
                    </div>
                    
                    {/* GrapplApp logo - responsive sizing */}
                    <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 overflow-hidden">
                      <Image
                        src="/images/PRIMARYGrapplAppLogoORGBLK (1).png"
                        alt="GrapplApp Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                        priority
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5800]/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Right section with content - responsive spacing */}
                <div className="flex-grow md:pl-6 lg:pl-12 relative z-10 flex flex-col justify-center max-w-full md:max-w-[75%]">
                  {/* Heading - SpaceX inspired typography */}
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center md:text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <span className="tracking-tight inline-flex flex-wrap justify-center md:justify-start"> 
                      <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-extrabold tracking-tighter">GRAPPL</span>
                      <span className="bg-gradient-to-r from-[#FF5800] to-orange-500 bg-clip-text text-transparent font-extrabold tracking-tighter">APP</span>
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-gray-800 font-light tracking-wide uppercase">Premium Merch</span>
                  </motion.h2>
                  
                  {/* Description - SpaceX inspired typography */}
                  <motion.p
                    className="text-gray-600 mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg leading-relaxed tracking-wide font-light text-center md:text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Rep your journey with premium quality gear designed for the modern athlete. Our exclusive collection of high-performance apparel and accessories is built to match your dedication to excellence.
                  </motion.p>
                  
                  {/* Separator line - SpaceX aesthetic, responsive alignment */}
                  <motion.div 
                    className="w-24 h-[2px] bg-gradient-to-r from-[#FF5800] to-orange-300 mb-6 sm:mb-8 mx-auto md:mx-0"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  
                  {/* Countdown and CTA - SpaceX inspired, responsive layout */}
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-8 md:gap-12">
                    {/* Countdown timer - Futuristic */}
                    <motion.div
                      className="bg-white/50 backdrop-blur-lg px-4 sm:px-6 py-3 sm:py-4 rounded-lg flex items-center relative overflow-hidden w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
                      style={{
                        boxShadow: '0 15px 30px -8px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.6) inset',
                        borderLeft: '1px solid rgba(255,255,255,0.7)',
                        borderTop: '1px solid rgba(255,255,255,0.7)',
                        borderRight: '1px solid rgba(200,200,200,0.2)',
                        borderBottom: '1px solid rgba(200,200,200,0.2)'
                      }}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.7 }}
                    >
                      {/* Subtle grid lines */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" 
                          style={{
                            backgroundImage: `linear-gradient(transparent 95%, rgba(255,88,0,0.5) 95%)`,
                            backgroundSize: '8px 8px'
                          }}
                        ></div>
                      </div>
                      
                      <div className="mr-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 uppercase tracking-wider font-light">Redirecting in</span>
                        <div className="flex items-center gap-1">
                          <div className="relative overflow-hidden">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={countdown}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="font-mono font-bold text-2xl text-[#FF5800] min-w-[2rem] inline-block text-center"
                              >
                                {countdown}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <span className="text-gray-700 font-light tracking-wide">seconds</span>
                        </div>
                      </div>
                      
                      {/* Animated ring */}
                      <motion.div 
                        className="absolute -inset-0.5 rounded-lg opacity-20"
                        style={{ border: '1px solid #FF5800' }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    {/* CTA button - SpaceX inspired */}
                    <motion.button
                      className="bg-gradient-to-r from-[#FF5800] to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg relative overflow-hidden group w-full sm:w-auto"
                      style={{
                        boxShadow: '0 10px 30px -5px rgba(255,88,0,0.25)'
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: '0 15px 30px -5px rgba(255,88,0,0.3), 0 0 0 1px rgba(255,88,0,0.2) inset'
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      onClick={handleRedirectNow}
                    >
                      <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide text-lg">
                        GO TO STORE
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, repeatDelay: 2, duration: 1.2 }}
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </motion.svg>
                      </span>
                      
                      {/* Energy glow under the button */}
                      <motion.div 
                        className="absolute -bottom-2 left-1/2 w-[90%] h-2 bg-[#FF5800] blur-xl -translate-x-1/2"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Button shine effect */}
                      <motion.div 
                        className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20"
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 7 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* GrapplInsights Section */}
        <div className="w-full max-w-[90vw] mx-auto my-16">
          <motion.div
            className="w-full rounded-xl overflow-hidden relative py-10 px-8 md:px-10 bg-white"
            style={{
              boxShadow: '0 15px 30px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.6) inset',
              borderTop: '1px solid rgba(255,255,255,0.8)',
              borderLeft: '1px solid rgba(255,255,255,0.6)',
              borderRight: '1px solid rgba(220,220,220,0.4)',
              borderBottom: '1px solid rgba(200,200,200,0.4)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section header */}
            <div className="flex flex-col items-center mb-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="inline-block">
                  <span className="text-gray-800 tracking-tight font-extrabold">Grappl</span>
                  <span className="text-[#FF5800] tracking-tight font-extrabold">Insights</span>
                </span>
              </motion.h2>
              
              <motion.div 
                className="w-24 h-[2px] bg-gradient-to-r from-[#FF5800] to-orange-300 mb-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              
              <motion.p
                className="text-gray-600 max-w-2xl text-center font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Latest insights and knowledge from the world of Jiu Jitsu
              </motion.p>
            </div>
            
            {/* Insights grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Insight Card 1 */}
              <motion.div 
                className="rounded-lg overflow-hidden bg-white group"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(240,240,240,1) inset',
                }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(240,240,240,1) inset' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-light text-sm">Martial Arts Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF5800] transition-colors">
                    The Best Martial Art for Self Defence
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Exploring the effectiveness of different martial arts for real-world self-defense scenarios.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">May 2025</span>
                    <Link href="https://www.grapplapp.io/the-best-martial-art-for-self-defence/" target="_blank" className="text-[#FF5800] text-sm font-medium hover:underline flex items-center gap-1 group">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Insight Card 2 */}
              <motion.div 
                className="rounded-lg overflow-hidden bg-white group"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(240,240,240,1) inset',
                }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(240,240,240,1) inset' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-light text-sm">BJJ Open Mat Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF5800] transition-colors">
                    Find a BJJ Open Mat FAST and FREE
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Use GrapplApp to find the nearest BJJ open mats in your area quickly and easily.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">May 2025</span>
                    <Link href="https://www.grapplapp.io/find-a-bjj-open-mat-fast-and-free/" target="_blank" className="text-[#FF5800] text-sm font-medium hover:underline flex items-center gap-1 group">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Insight Card 3 */}
              <motion.div 
                className="rounded-lg overflow-hidden bg-white group"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(240,240,240,1) inset',
                }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(240,240,240,1) inset' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-light text-sm">Open Mat Training Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF5800] transition-colors">
                    What is a Jiu Jitsu Open Mat?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Learn what a Jiu Jitsu open mat is and how to find one near you using GrapplApp.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">May 2025</span>
                    <Link href="https://www.grapplapp.io/what-is-a-jiu-jitsu-open-mat/" target="_blank" className="text-[#FF5800] text-sm font-medium hover:underline flex items-center gap-1 group">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* View all insights button */}
            <div className="flex justify-center mt-10">
              <motion.a
                href="https://www.grapplapp.io/grapplinsights/"
                target="_blank"
                className="bg-white text-[#FF5800] px-8 py-3 rounded-lg font-medium relative overflow-hidden group"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(255,88,0,0.1), 0 0 0 1px rgba(255,88,0,0.1) inset'
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 15px 30px -5px rgba(255,88,0,0.15), 0 0 0 1px rgba(255,88,0,0.2) inset'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
                  View All GrapplInsights
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer - Optimized for responsiveness */}
      <footer className="bg-gray-50 py-4 sm:py-6 mt-auto shadow-inner">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
              <Image
                src="/images/PRIMARYGrapplAppLogoORGBLK (1).png"
                alt="GrapplApp Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 20px, 24px"
              />
            </div>
            <span className="font-bold text-sm sm:text-base text-[#FF5800]">GrapplApp</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-500 text-xs sm:text-sm">© {new Date().getFullYear()} All rights reserved</p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Made by <a href="https://www.linkedin.com/in/mostafaamir/" target="_blank" rel="noopener noreferrer" className="text-[#FF5800] hover:underline">Mostafa Amir</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
