"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useDesignSystem } from '@/components/core/DesignSystemProvider';

interface NavItem {
  label: string;
  href: string;
}

// Bleeding-edge header component with premium micro-interactions
export default function NexusHeader() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { colorScheme } = useDesignSystem();
  
  // Advanced animation primitives
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollYMotion = useSpring(scrollY, { stiffness: 500, damping: 50 });
  const headerOpacity = useTransform(scrollYMotion, [0, 50], [1, 0.98]);
  const headerY = useTransform(scrollYMotion, [0, 50], [0, -8]);
  const logoScale = useTransform(scrollYMotion, [0, 50], [1, 0.95]);
  
  // Mouse position tracking for premium hover effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Advanced navigation items with smooth scrolling
  const navItems: NavItem[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Download', href: '#download' },
  ];

  // Ultra-smooth scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Precise section tracking for premium UX
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, navItems]);

  // Advanced mouse tracking for premium hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{ 
          opacity: headerOpacity,
          y: headerY
        }}
      >
        {/* Premium glass morphism effect with dynamic opacity */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-lg"
          style={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
            borderBottom: scrolled ? '1px solid rgba(229, 229, 229, 0.8)' : 'none',
            boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.03)' : 'none'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Innovative belt-inspired accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 nexus-gradient-belt w-full opacity-80" />
        
        {/* Content container with premium spacing system */}
        <div className="nexus-container relative flex items-center justify-between py-4">
          {/* Premium logomark with subtle animations */}
          <Link href="/" className="relative z-10 flex items-center group">
            <motion.div 
              className="relative w-11 h-11 mr-3"
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Image 
                src="/images/TheAppCircle (1).png" 
                alt="GrapplApp" 
                fill
                style={{ objectFit: "contain" }}
                priority
              />
              
              {/* Premium logo interaction effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-nexus-orange-base/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                }}
              />
            </motion.div>
            
            {/* Kinetic typography for brand name */}
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <motion.span 
                  className="text-xl font-bold text-gray-900 tracking-tight"
                  whileHover={{ scale: 1.03 }}
                >
                  Grappl<span className="text-nexus-orange-base">App</span>
                </motion.span>
                
                {/* Premium status indicator - subtle pulse effect */}
                <motion.div
                  className="ml-2 w-1.5 h-1.5 rounded-full bg-nexus-orange-base"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              
              {/* Premium micro-typography */}
              <span className="text-[10px] text-gray-500 font-medium -mt-1">
                BJJ Community Platform
              </span>
            </div>
          </Link>

          {/* Premium desktop navigation - with dynamic interactions */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onHoverStart={() => setHoveredItem(item.href)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link 
                  href={item.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition-all 
                    ${activeSection === item.href.substring(1) 
                      ? 'text-nexus-orange-base' 
                      : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      const yOffset = -80; // Header height + buffer
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  {/* Premium text rendering */}
                  <motion.span
                    className="relative z-10"
                    animate={{ 
                      y: hoveredItem === item.href ? -2 : 0,
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Ultra-premium interaction effects */}
                  {hoveredItem === item.href && (
                    <motion.span 
                      className="absolute inset-0 -z-10 rounded-full bg-gray-100/80"
                      layoutId="navHoverEffect"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  
                  {/* Premium active state indicator */}
                  {activeSection === item.href.substring(1) && (
                    <motion.span 
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-nexus-orange-base"
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Premium CTA - with dimensional effects */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="#download"
              className="
                relative inline-flex items-center py-2 px-5 
                text-sm font-semibold text-white
                bg-nexus-orange-base rounded-full
                overflow-hidden shadow-lg
                transition-all duration-300 
                hover:shadow-xl hover:shadow-nexus-orange-base/20
              "
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#download');
                if (element) {
                  const yOffset = -80;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -4 }}
                className="mr-2"
              >
                Download
              </motion.span>
              
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                initial={{ y: 0 }}
                whileHover={{ y: 2 }}
              >
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5.586L5.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L11 9.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </motion.svg>
              
              {/* Premium interaction surface effects */}
              <motion.div 
                className="absolute -inset-px rounded-full"
                style={{ 
                  backgroundImage: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 80%)',
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                onMouseMove={(e) => {
                  const bounds = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - bounds.left;
                  const y = e.clientY - bounds.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              />
            </Link>
          </motion.div>
          
          {/* Premium mobile menu button */}
          <motion.button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-gray-800 rounded-full"
                animate={{ 
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-gray-800 rounded-full"
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-gray-800 rounded-full"
                animate={{ 
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Premium button indication */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gray-100"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: mobileMenuOpen ? 1 : 0,
                opacity: mobileMenuOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.header>
      
      {/* Premium mobile menu - with dimensional animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop blur with premium aesthetics */}
            <motion.div 
              className="absolute inset-0 bg-white/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile navigation container */}
            <motion.div
              className="relative z-50 min-h-screen flex flex-col pt-24 px-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Premium mobile navigation */}
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    exit={{ opacity: 0, x: -20, transition: { delay: 0 } }}
                  >
                    <Link 
                      href={item.href}
                      className={`
                        relative py-3 px-4 text-lg font-medium rounded-xl
                        ${activeSection === item.href.substring(1) 
                          ? 'text-nexus-orange-base bg-nexus-orange-ultra-light' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                        transition-all duration-200
                      `}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        const element = document.querySelector(item.href);
                        if (element) {
                          setTimeout(() => {
                            const yOffset = -80;
                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }, 300);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {item.label}
                        
                        {/* Premium active indicator */}
                        {activeSection === item.href.substring(1) && (
                          <motion.span 
                            className="ml-2 w-1.5 h-1.5 rounded-full bg-nexus-orange-base"
                            layoutId="mobileActiveIndicator"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Premium mobile CTA */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                exit={{ opacity: 0, y: 20, transition: { delay: 0 } }}
              >
                <Link 
                  href="#download"
                  className="
                    inline-flex items-center justify-center w-full
                    py-3 text-base font-semibold text-white
                    bg-nexus-orange-base rounded-xl
                    shadow-lg shadow-nexus-orange-base/20
                    transition-all duration-300
                  "
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const element = document.querySelector('#download');
                    if (element) {
                      setTimeout(() => {
                        const yOffset = -80;
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }, 300);
                    }
                  }}
                >
                  Download App
                </Link>
              </motion.div>
              
              {/* Premium decorative elements */}
              <motion.div
                className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-nexus-orange-base/5 to-transparent rounded-full blur-3xl z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
