"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import AppStoreButtons from '../ui/AppStoreButtons';

const NexusHeroSection = () => {
  // Advanced state hooks for premium interactivity
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Ultra-smooth scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Premium parallax effects with spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 350]), springConfig);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.6]), springConfig);
  
  // Mouse interaction for dimensional effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-5, 5]), springConfig);
  
  // Core features with benefits for contextual display
  const features = [
    {
      title: "Find Training Partners",
      description: "Connect with local BJJ practitioners in your area for training sessions.",
      icon: "🥋",
      color: "from-orange-500/20 to-orange-600/10",
      benefit: "21,000+ practitioners worldwide",
    },
    {
      title: "Discover Open Mats",
      description: "Never miss an opportunity to roll, wherever you travel.",
      icon: "🗺️",
      color: "from-blue-500/20 to-blue-600/10", 
      benefit: "3,400+ academies registered",
    },
    {
      title: "Track Your Progress",
      description: "Log techniques, sessions, and competitions to improve faster.",
      icon: "📊",
      color: "from-purple-500/20 to-purple-600/10",
      benefit: "Visualize your journey from white to black belt",
    }
  ];

  // Premium loading sequence with timed transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-cycling feature highlight for engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Mouse tracking for dimensional effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Dimensional response to mouse position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.section 
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ 
        opacity,
        perspective: 1000
      }}
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-white -z-10">
        {/* Layer 1: Subtle dot matrix */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Layer 2: Dynamic gradient orbs */}
        <motion.div 
          className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -20, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-blue-500/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2
          }}
        />
        
        {/* Layer 3: Dynamic orange accent glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-orange-500/5 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            filter: ["blur(50px)", "blur(80px)", "blur(50px)"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Content container with premium spacing */}
      <div className="nexus-container relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Premium typography & features */}
          <motion.div 
            ref={textRef}
            className="relative z-10"
            style={{ y: textY }}
          >
            {/* Dynamic headline animation with staggered entrance */}
            <div className="space-y-4 mb-8">
              <motion.h1 
                className="nexus-heading-xl text-gray-900 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="inline-block">The</span>{" "}
                <motion.span 
                  className="inline-block nexus-text-gradient"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  ultimate
                </motion.span>{" "}
                <motion.span 
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  app for
                </motion.span>
              </motion.h1>
              
              <motion.h2 
                className="nexus-heading-xl text-gray-900 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <span className="inline-block">Jiu-Jitsu</span>
              </motion.h2>
              
              <motion.h2 
                className="nexus-heading-xl text-gray-900 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <span className="inline-block">community</span>
              </motion.h2>
            </div>
            
            {/* Premium description with subtle animation */}
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              Find a training partner, schedule a private lesson, or discover open mats anywhere in the world with GrapplApp.
            </motion.p>
            
            {/* Premium feature cards with animated transitions */}
            <motion.div 
              className="space-y-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`
                    relative overflow-hidden rounded-xl 
                    p-4 cursor-pointer transition-all
                    bg-gradient-to-r ${feature.color}
                    border border-gray-100
                    ${activeFeature === index ? 'shadow-lg' : 'shadow-sm'}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: activeFeature === index ? 1.03 : 1,
                  }}
                  transition={{ 
                    delay: 1.5 + index * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-2xl" role="img" aria-label={feature.title}>
                        {feature.icon}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                      
                      {/* Premium benefit indicator with animation */}
                      <motion.div 
                        className="mt-2 inline-flex items-center text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: activeFeature === index ? 1 : 0.5,
                          scale: activeFeature === index ? 1 : 0.95,
                          y: activeFeature === index ? 0 : 5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature.benefit}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Premium selection indicator */}
                  {activeFeature === index && (
                    <motion.div 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      initial={{ opacity: 0, scale: 0, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      layoutId="activeFeatureIndicator"
                    >
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Premium download CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <AppStoreButtons size="large" className="mb-6" />
              
              {/* Premium user trust indicators */}
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Trusted by over <strong className="text-gray-700">21,000+</strong> practitioners worldwide</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {["Training Partners", "Professors", "Studios & Gyms"].map((type, i) => (
                    <motion.span 
                      key={type}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.1 + i * 0.1, duration: 0.4 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>
                      {type}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right column: Premium device mockup */}
          <motion.div 
            ref={phoneRef}
            className="relative z-10 flex justify-center items-center h-full"
            style={{ 
              y,
              rotateX,
              rotateY,
              perspective: 1000,
            }}
          >
            {/* Premium dimensional container */}
            <motion.div
              className="relative w-full max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Premium background embellishments */}
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-full blur-3xl z-0" />
              
              {/* Phone with premium depth effects */}
              <motion.div
                className="relative z-10"
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {/* Main phone mockup */}
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-[10px] border-gray-100">
                  <Image 
                    src="/images/app-showcase-1.png" 
                    alt="GrapplApp Interface"
                    width={320}
                    height={650}
                    priority
                    className="w-full"
                  />
                  
                  {/* Immersive reflection effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" 
                    animate={{
                      opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Dynamic screen interactions */}
                  <AnimatePresence>
                    {isLoaded && (
                      <motion.div
                        className="absolute inset-0 bg-black/5"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0, 0.05, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: 2,
                          repeatType: "reverse"
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Premium active notification indicator */}
                <motion.div
                  className="absolute -top-2 right-4 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-orange-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
                
                {/* Premium notification badges */}
                <motion.div 
                  className="absolute -top-3 -left-3 bg-white rounded-full shadow-lg py-1 px-3 flex items-center"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: [0, -5, 0, 5, 0] }}
                    transition={{ 
                      duration: 2, 
                      delay: 3,
                      repeat: 2,
                      repeatType: "reverse"
                    }}
                  >
                    <span role="img" aria-label="notification" className="text-lg">
                      🔔
                    </span>
                  </motion.div>
                  <span className="ml-1 text-xs font-bold text-gray-900">3 Nearby</span>
                </motion.div>
                
                {/* Premium scroll indicator */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg py-1 px-4 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.4 }}
                >
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                  <span className="ml-1 text-xs font-medium text-gray-700">Scroll to explore</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Premium scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span className="text-xs font-medium mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default NexusHeroSection;
