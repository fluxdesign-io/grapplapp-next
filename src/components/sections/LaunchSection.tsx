"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const LaunchSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-200px" });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [launchActive, setLaunchActive] = useState(false);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 1]);
  
  // Countdown timer functionality
  useEffect(() => {
    // Set launch date to 7 days from now for demo
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 7);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setLaunchActive(true);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
  
  const handleLaunch = () => {
    setLaunchActive(true);
    
    // Reset after animation completes
    setTimeout(() => setLaunchActive(false), 3000);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white py-20 overflow-hidden"
      id="launch"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-6 h-full w-full">
          {[...Array(7)].map((_, i) => (
            <div key={`v-line-${i}`} className="h-full w-px bg-gray-900"></div>
          ))}
        </div>
        <div className="grid grid-rows-6 h-full w-full">
          {[...Array(7)].map((_, i) => (
            <div key={`h-line-${i}`} className="w-full h-px bg-gray-900"></div>
          ))}
        </div>
      </div>
      
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-mono text-white mb-4 tracking-tight"
          >
            PREPARE FOR <span className="text-[#FF5800]">LAUNCH</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 mb-12 text-lg"
          >
            The next generation of Jiu-Jitsu tracking is ready for deployment
          </motion.p>
          
          {/* Countdown timer */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-4 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto"
          >
            {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((unit, i) => {
              const value = [
                countdown.days,
                countdown.hours,
                countdown.minutes,
                countdown.seconds
              ][i];
              
              return (
                <div key={unit} className="bg-gray-900 p-4 rounded border border-gray-800 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-mono text-[#FF5800] mb-1">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 font-mono tracking-widest">
                    {unit}
                  </div>
                </div>
              );
            })}
          </motion.div>
          
          {/* Launch buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link 
              href="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <motion.button 
                className="bg-[#FF5800] text-black px-8 py-4 rounded-sm font-mono tracking-wider group-hover:scale-105 transition-transform flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">LAUNCH ON IOS</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M19 14l-7 7-7-7"/>
                  <path d="M12 21V5"/>
                  <path d="M5 10l7-7 7 7"/>
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
            
            <Link 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <motion.button 
                className="border border-[#FF5800] text-[#FF5800] px-8 py-4 rounded-sm font-mono tracking-wider group-hover:scale-105 transition-transform flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">LAUNCH ON ANDROID</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M19 14l-7 7-7-7"/>
                  <path d="M12 21V5"/>
                  <path d="M5 10l7-7 7 7"/>
                </svg>
                <div className="absolute inset-0 bg-[#FF5800] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Launch animation */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          initial={{ y: "100%" }}
          animate={{ y: launchActive ? "-120%" : "100%" }}
          transition={{ 
            duration: 2.5, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "spring",
            stiffness: 50 
          }}
        >
          <div className="relative">
            <Image
              src="/images/rocket.png"
              alt="GrapplApp Rocket"
              width={100}
              height={200}
              className="object-contain"
            />
            
            {/* Rocket flames */}
            <motion.div 
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-20 origin-top"
              animate={{
                scaleY: launchActive ? [1, 1.2, 1.1, 1.3, 1] : 0,
              }}
              transition={{ 
                duration: 0.5, 
                repeat: launchActive ? Infinity : 0,
                repeatType: "reverse" 
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-[#FF5800] to-yellow-500 rounded-b-full opacity-80"></div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Mission telemetry data */}
        <div className="absolute bottom-10 left-10 text-xs font-mono text-gray-600">
          <div>MISSION ID: GRAPPL-2023-A</div>
          <div>PAYLOAD: USER TRACKING MODULE</div>
          <div>DESTINATION: APP STORE ORBIT</div>
        </div>
      </motion.div>
    </section>
  );
};

export default LaunchSection;
