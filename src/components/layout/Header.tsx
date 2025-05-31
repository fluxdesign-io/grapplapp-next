"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesignSystem } from '@/components/core/DesignSystemProvider';

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { colorScheme } = useDesignSystem();
  
  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div 
            className="relative w-10 h-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src="/images/SMGrapplAppLogoORGBLK (1).png" 
              alt="GrapplApp Logo" 
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
          <motion.span 
            className="ml-2 text-lg font-bold"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-grappl-orange">Grappl</span>
            <span className="text-black">App</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link 
                href={item.href}
                className={`text-gray-800 hover:text-grappl-orange transition-colors font-medium relative group ${
                  activeSection === item.href.substring(1) ? 'text-grappl-orange' : ''
                }`}
              >
                {item.label}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-grappl-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                
                {activeSection === item.href.substring(1) && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-grappl-orange"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="https://apps.apple.com/us/app/grapplapp/id1577021977" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block px-5 py-2 bg-grappl-orange hover:bg-grappl-orange-light text-white rounded-md font-medium transition-all shadow-md hover:shadow-lg"
            >
              Download App
            </Link>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-800" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-2 font-medium ${
                        activeSection === item.href.substring(1) 
                          ? 'text-grappl-orange' 
                          : 'text-gray-800'
                      }`}
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <Link 
                    href="https://apps.apple.com/us/app/grapplapp/id1577021977" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-grappl-orange text-white rounded-md font-medium"
                    onClick={toggleMenu}
                  >
                    Download App
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
