"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PhoneMockup from '@/components/ui/PhoneMockup';

const AdvancedShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 0.8]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  // App features to showcase
  const features = [
    {
      title: "TECHNIQUE ANALYSIS",
      description: "Get real-time feedback on your technique execution with frame-by-frame analysis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      )
    },
    {
      title: "PROGRESS TRACKING",
      description: "Visualize your Jiu-Jitsu journey with detailed progression analytics and milestones.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      )
    },
    {
      title: "COMPETITION PREPARATION",
      description: "Optimize your training regimen with specialized competition preparation tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>
      )
    },
    {
      title: "COMMUNITY INTEGRATION",
      description: "Connect with the global Jiu-Jitsu community and share techniques and insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="showcase"
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5800] to-transparent opacity-70"></div>
      
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 text-white"
      >
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="mb-16 text-center">
            <motion.span 
              className="inline-block text-sm font-mono text-[#FF5800] tracking-wider mb-2"
              variants={itemVariants}
            >
              CORE FUNCTIONALITY
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
              variants={itemVariants}
            >
              ADVANCED <span className="text-[#FF5800]">FEATURES</span>
            </motion.h2>
            
            <motion.div 
              className="h-px w-40 bg-gradient-to-r from-transparent via-[#FF5800] to-transparent mx-auto mb-8"
              variants={itemVariants}
            ></motion.div>
            
            <motion.p 
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              GrapplApp leverages cutting-edge technology to revolutionize your Jiu-Jitsu training experience.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Phone mockup with animation */}
            <motion.div
              variants={itemVariants}
              className="relative order-2 lg:order-1 mt-10 lg:mt-0"
            >
              <div className="w-full max-w-xs mx-auto">
                <PhoneMockup />
              </div>
              
              {/* Orbit elements around the phone */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <motion.div 
                  className="absolute w-40 h-40 rounded-full border border-[#FF5800]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute w-56 h-56 rounded-full border border-gray-700/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute w-72 h-72 rounded-full border border-[#FF5800]/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                {/* Feature highlight dots */}
                <motion.div 
                  className="absolute w-3 h-3 rounded-full bg-[#FF5800]"
                  style={{ top: '20%', right: '25%' }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                
                <motion.div 
                  className="absolute w-2 h-2 rounded-full bg-[#FF5800]"
                  style={{ bottom: '25%', left: '30%' }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                ></motion.div>
              </div>
            </motion.div>
            
            {/* Features list */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-6 rounded-sm"
                    whileHover={{ 
                      x: 10, 
                      boxShadow: "0 20px 25px -5px rgba(255, 88, 0, 0.05), 0 10px 10px -5px rgba(255, 88, 0, 0.01)" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-5 pt-1 text-[#FF5800]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-mono text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-10 text-center lg:text-left"
              >
                <Link href="#" className="group">
                  <div className="inline-flex items-center justify-center px-6 py-3 border border-[#FF5800] rounded-sm text-[#FF5800] text-sm font-mono tracking-wider cursor-pointer group-hover:bg-[#FF5800]/10 transition-colors">
                    VIEW ALL FEATURES
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Tech specs indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-24 flex justify-between text-xs font-mono text-gray-500 border-t border-gray-800/50 pt-8"
          >
            <div>PROCESSOR: NEURAL NETWORK v5.2</div>
            <div>MEMORY: 512GB QUANTUM</div>
            <div>BATTERY: 48HR RUNTIME</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdvancedShowcaseSection;
