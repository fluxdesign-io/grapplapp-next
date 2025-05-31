import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

/**
 * Premium PhoneMockup Component
 * A luxury, high-end phone mockup with premium animations and effects
 * designed to look like it cost $1B to create
 */
const PhoneMockup = () => {
  // State for interactions and animations
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0.3);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  
  // References for DOM elements
  const phoneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Visibility detection for animations
  const [ref, inView] = useInView({ 
    triggerOnce: false,
    threshold: 0.1
  });
  
  // Track viewport position for parallax effects
  const [viewportPosition, setViewportPosition] = useState(0);
  
  // App features to showcase
  const features = [
    {
      title: "Connect & Train",
      description: "Find elite BJJ training partners nearby",
      icon: "🥋",
      color: "from-purple-600 to-indigo-700"
    },
    {
      title: "Global Open Mats",
      description: "Discover premier training locations worldwide",
      icon: "🗺️",
      color: "from-emerald-500 to-teal-700"
    },
    {
      title: "Performance Analytics",
      description: "Track techniques with advanced metrics",
      icon: "📊",
      color: "from-orange-500 to-red-600"
    }
  ];
  
  // 3D rotation effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position (limited range)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Calculate distance from center for glow effect
    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(rect.width/2, 2) + Math.pow(rect.height/2, 2));
    const normalizedDistance = Math.min(1, distance / maxDistance);
    
    // Set glow intensity based on proximity to center
    setGlowOpacity(0.3 + (1 - normalizedDistance) * 0.6);
  };
  
  // Reset effects when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlowOpacity(0.3);
  };
  
  // Auto-cycle through features
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveFeature((prev: number) => (prev + 1) % features.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [inView, features.length]);
  
  // Scroll effect tracking
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how far through the viewport the element has scrolled (0-1)
        const scrollProgress = 1 - (rect.bottom / viewportHeight);
        setViewportPosition(Math.min(1, Math.max(0, scrollProgress)));
        
        // Mark as seen when fully visible
        if (rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3) {
          setHasBeenSeen(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const phoneVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1],
        delay: 0.2 
      }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };
  
  // Shimmer effect elements
  const ShimmerEffect = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[400px] animate-[shimmer_5s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 transform rotate-45"></div>
    </div>
  );
  
  // Floating elements in background
  const FloatingElements = () => (
    <>
      <motion.div 
        className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-xl"
        animate={{ 
          y: [0, -15, 0], 
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"
        animate={{ 
          y: [0, 20, 0], 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 
        }}
      />
    </>
  );
  
  return (
    <div 
      ref={containerRef}
      className="relative flex justify-center items-center py-20 w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background elements */}
      <FloatingElements />
      
      {/* Ambient background glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(255,88,0,${glowOpacity}) 0%, rgba(0,0,0,0) 70%)`,
          transform: `translateY(${viewportPosition * 20}px)`
        }}
      />
      
      {/* Premium Phone Display */}
      <motion.div
        ref={phoneRef}
        className="relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={phoneVariants}
        whileHover="hover"
        style={{ 
          perspective: 1000,
          transformStyle: "preserve-3d",
          transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
          transition: 'transform 0.2s ease-out'
        }}
      >
        {/* Premium outer frame with gradient border */}
        <div className="relative">
          {/* Reflective frame effect */}
          <div className="absolute -inset-2 rounded-[48px] bg-gradient-to-br from-white/80 via-white/20 to-black/20 p-0.5 blur-[1px]"></div>
          <div className="absolute -inset-[6px] rounded-[48px] bg-gradient-to-r from-orange-500/40 to-red-600/40 opacity-50 blur-[2px]"></div>
          
          {/* Main phone body */}
          <div className="relative w-[320px] h-[650px] bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] rounded-[45px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border-[10px] border-[#1c1c1c]">
            {/* Phone notch & camera */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-[#1c1c1c] rounded-b-2xl z-20 flex justify-center items-center">
              <div className="w-3 h-3 rounded-full bg-black mr-1 flex items-center justify-center border border-gray-700/50">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70"></div>
              </div>
              <div className="w-12 h-2 rounded-full bg-black mx-1"></div>
              <div className="w-3 h-3 rounded-full bg-black ml-1"></div>
            </div>
            
            {/* Screen with premium glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#222] overflow-hidden rounded-[35px]">
              <div className="absolute inset-0 bg-[url('/phone-design-reference.png')] bg-cover bg-center opacity-100 blur-[0.5px]"></div>
              
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Glass reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-white/5 to-white/10 pointer-events-none"></div>
              <ShimmerEffect />
              
              {/* App interface with glassmorphism */}
              <div className="absolute inset-0 flex flex-col pt-12">
                {/* App header with blur glass effect */}
                <div className="h-16 backdrop-blur-xl bg-white/10 flex items-center justify-center border-b border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-2 shadow-lg">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    GrapplApp
                  </div>
                </div>
                
                {/* Main content with premium glass cards */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col justify-between">
                  {/* Feature showcase - premium cards */}
                  <div className="mb-6">
                    <h3 className="text-white/80 text-sm uppercase tracking-wider mb-3 font-medium">Featured</h3>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        className={`bg-gradient-to-br ${features[activeFeature].color} rounded-2xl p-6 shadow-lg backdrop-blur-lg border border-white/10 mb-4`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={featureVariants}
                      >
                        <div className="text-4xl mb-3 bg-white/20 w-14 h-14 rounded-full flex items-center justify-center">{features[activeFeature].icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {features[activeFeature].title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {features[activeFeature].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Feature indicator dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {features.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-2 h-2 rounded-full 
                            ${index === activeFeature 
                              ? 'bg-gradient-to-r from-orange-500 to-red-600 scale-125' 
                              : 'bg-white/30'
                            } transition-all duration-300`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* User profiles with glass cards */}
                  <div className="space-y-3 mb-16">
                    <div className="backdrop-blur-lg bg-white/5 rounded-xl p-3 border border-white/5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5800] to-red-600 mr-3 flex items-center justify-center text-white font-bold text-xs shadow-lg">JJ</div>
                      <div className="flex-1">
                        <div className="h-2.5 bg-white/30 rounded-full w-3/4"></div>
                        <div className="h-2 bg-white/20 rounded-full w-1/2 mt-1.5"></div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-white/5 rounded-xl p-3 border border-white/5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 mr-3 flex items-center justify-center text-white/80 text-xs">MT</div>
                      <div className="flex-1">
                        <div className="h-2.5 bg-white/30 rounded-full w-2/3"></div>
                        <div className="h-2 bg-white/20 rounded-full w-1/2 mt-1.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom navigation with glass effect */}
                <div className="h-20 backdrop-blur-xl bg-white/5 border-t border-white/10 flex justify-around items-center px-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/50 rounded-full"></div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg -mt-6 border-4 border-[#1c1c1c]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path d="M12 3v10m0 0L8 9.5m4 3.5l4-3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/50 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Edge lighting effect */}
          <div className="absolute inset-0 rounded-[45px] bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none"></div>
          {isHovering && (
            <div className="absolute inset-0 rounded-[45px] bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent pointer-events-none"></div>
          )}
        </div>
        
        {/* Premium shadow with color */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] h-12 bg-black/50 blur-xl rounded-full"></div>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-[50%] h-6 bg-orange-500/20 blur-xl rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;
