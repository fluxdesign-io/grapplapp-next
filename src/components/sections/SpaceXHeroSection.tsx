import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PhoneMockup from '../ui/PhoneMockup';

const SpaceXHeroSection: React.FC = () => {
  // Refs and scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Futuristic counter effect for stats
  const CounterElement = ({ end, label }: { end: number, label: string }) => {
    const [count, setCount] = React.useState(0);
    
    useEffect(() => {
      let startTime: number;
      let animationFrame: number;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 2000, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };
      
      animationFrame = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationFrame);
    }, [end]);
    
    return (
      <div className="flex flex-col items-center">
        <div className="text-4xl font-mono text-white mb-1 flex items-center tracking-tighter">
          <span className="text-[#FF5800]">+</span>
          {count.toLocaleString()}
        </div>
        <div className="text-sm uppercase tracking-widest text-gray-400">{label}</div>
      </div>
    );
  };
  
  // Typewriter effect for subheading
  const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);
    
    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 40);
        
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text]);
    
    return (
      <div className="font-mono text-lg md:text-xl text-[#FF5800] h-6">
        {displayText}
        <span className="inline-block w-2 h-5 bg-[#FF5800] ml-1 animate-pulse"></span>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Tech grid lines */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Content container */}
      <motion.div 
        className="container mx-auto z-20 flex flex-col md:flex-row items-center justify-between px-6 py-20"
        style={{ opacity }}
      >
        {/* Left content - Text */}
        <motion.div 
          className="w-full md:w-1/2 mb-20 md:mb-0 pr-0 md:pr-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pre-title - with typewriter effect */}
          <div className="mb-3">
            <TypewriterText text="INITIATING BJJ MATCH SEQUENCE" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6 tracking-tight">
            <div className="flex items-center">
              <span className="text-[#FF5800]">G</span>rappl
              <div className="relative inline-block">
                <span>App</span>
                <motion.div 
                  className="absolute -top-1 -right-2 w-3 h-3 bg-[#FF5800] rounded-full"
                  animate={{ 
                    opacity: [1, 0.3, 1], 
                    scale: [1, 1.2, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
            <div className="text-4xl md:text-6xl font-bold mt-1">
              Jiu-Jitsu <span className="text-gray-400">Perfected</span>
            </div>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Find training partners, track progress, and discover open mats with aerospace-grade precision.
          </p>
          
          {/* CTA buttons with futuristic design */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#FF5800] to-[#FF3300] text-white rounded font-medium text-base relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out_infinite]"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">LAUNCH APP</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-transparent border border-gray-600 text-white rounded font-medium text-base relative hover:border-gray-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                <span>MISSION BRIEF</span>
              </span>
            </motion.button>
          </div>
          
          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-4">
            <CounterElement end={21500} label="USERS" />
            <CounterElement end={750} label="DOJOS" />
            <CounterElement end={15300} label="MATCHES" />
          </div>
        </motion.div>
        
        {/* Right content - Phone */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            {/* Orbit effect around phone */}
            <div className="absolute inset-0 -m-12 rounded-full border border-gray-800 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-0 -m-20 rounded-full border border-gray-800 animate-[spin_25s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 -m-32 rounded-full border border-gray-800 animate-[spin_30s_linear_infinite]"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 -m-10 bg-[#FF5800]/20 blur-3xl rounded-full"></div>
            
            {/* The actual phone */}
            <PhoneMockup />
            
            {/* Tech specs appearing around the phone */}
            <motion.div 
              className="absolute -left-40 top-1/4 text-xs text-gray-400 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <div className="w-16 h-px bg-gray-700 mr-3"></div>
              <div className="font-mono">ADVANCED NEURAL NETWORK</div>
            </motion.div>
            
            <motion.div 
              className="absolute -right-44 top-2/3 text-xs text-gray-400 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="font-mono">QUANTUM MATCH ALGORITHM</div>
              <div className="w-16 h-px bg-gray-700 ml-3"></div>
            </motion.div>
            
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 text-xs text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.6 }}
            >
              <div className="font-mono text-center">SATELLITE CONNECTIVITY</div>
              <div className="w-px h-8 bg-gray-700 mx-auto mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="text-xs tracking-widest mb-2 font-mono">SCROLL</div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Version number - SpaceX style */}
      <div className="absolute bottom-6 right-6 text-xs text-gray-600 font-mono">
        GrapplApp v2.1.0
      </div>
    </section>
  );
};

export default SpaceXHeroSection;
