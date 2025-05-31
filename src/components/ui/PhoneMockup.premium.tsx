import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

/**
 * Premium Phone Mockup Component
 * Optimized for performance with subtle, premium animations
 * Light theme styling with orange accents
 */
const PhoneMockup = () => {
  // Visibility detection with optimized threshold
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.2
  });
  
  // Component state (minimized for performance)
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Subtle tilt effect state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  // Screen content options
  const screens = [
    {
      title: "Find Training Partners",
      description: "Connect with BJJ practitioners in your area",
      icon: "🥋",
      color: "bg-grappl-orange" 
    },
    {
      title: "Discover Open Mats",
      description: "Join training sessions anywhere you go",
      icon: "🗺️",
      color: "bg-blue-500"
    },
    {
      title: "Track Your Progress",
      description: "Log techniques and rolling sessions",
      icon: "📊",
      color: "bg-green-500"
    }
  ];

  // Handle mouse interaction for subtle tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setTilt({ 
      x: x * 2, // Subtle tilt (only 2 degrees)
      y: y * -2 // Invert y-axis for natural tilt
    });
  };

  // Reset tilt when mouse leaves
  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Screen cycling effect (simple interval-based)
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentScreen((prev) => (prev + 1) % screens.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [inView, screens.length]);

  return (
    <div 
      ref={ref}
      className="w-full max-w-xs mx-auto"
    >
      {/* Interactive phone container with subtle animations */}
      <motion.div
        ref={phoneRef}
        className="relative w-full aspect-[9/19] max-w-[280px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ 
          rotateY: tilt.x,
          rotateX: tilt.y,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        onMouseEnter={() => setIsHovering(true)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Phone frame with premium styling */}
        <div className="absolute inset-0 rounded-[40px] bg-gray-100 shadow-xl overflow-hidden transform-gpu transition-all duration-300 border-[10px] border-white">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-white z-10 flex justify-between items-center px-5 pt-1">
            <div className="text-[10px] font-medium text-gray-700">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full border border-gray-700"></div>
              <div className="w-3 h-3 rounded-full border border-gray-700"></div>
              <div className="w-3 h-3 rounded-full bg-grappl-orange"></div>
            </div>
          </div>
          
          {/* Dynamic notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-6 bg-black rounded-b-2xl z-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1 w-4 h-1 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Screen content with animated transitions */}
          <motion.div
            className="absolute inset-0 pt-8 bg-white overflow-hidden"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            {/* App header */}
            <div className="w-full px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-grappl-orange flex items-center justify-center text-white font-bold text-xs">
                  G
                </div>
                <span className="ml-2 font-semibold text-gray-800 text-sm">GrapplApp</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>
            
            {/* Main content with animated transitions */}
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-6"
            >
              {/* Feature card */}
              <div className="w-full rounded-2xl bg-white shadow-md p-4 border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${screens[currentScreen].color} flex items-center justify-center text-white text-xl mb-3`}>
                  {screens[currentScreen].icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{screens[currentScreen].title}</h3>
                <p className="text-gray-600 text-xs">{screens[currentScreen].description}</p>
              </div>
              
              {/* Secondary content */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
                    👥
                  </div>
                  <p className="text-gray-800 text-xs font-medium">23 nearby</p>
                  <p className="text-gray-500 text-[10px]">Training partners</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-grappl-orange/10 flex items-center justify-center text-grappl-orange mb-2">
                    🏆
                  </div>
                  <p className="text-gray-800 text-xs font-medium">8 this week</p>
                  <p className="text-gray-500 text-[10px]">Open mats</p>
                </div>
              </div>
              
              {/* Activity feed */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-sm">Recent Activity</h4>
                  <span className="text-grappl-orange text-[10px]">See all</span>
                </div>
                
                <div className="space-y-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-center p-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="ml-2 flex-1">
                        <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                        <div className="h-2 w-16 bg-gray-100 rounded-full mt-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Navigation bar */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-100 flex justify-around items-center px-4">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className={`w-12 h-10 rounded-lg flex items-center justify-center ${currentScreen === index ? 'bg-grappl-orange/10' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full ${currentScreen === index ? 'bg-grappl-orange text-white' : 'bg-gray-100 text-gray-500'} flex items-center justify-center text-xs`}>
                    {index === 0 ? '🏠' : index === 1 ? '🔍' : '👤'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Reflection/shadow effect */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] h-4 bg-black/10 blur-xl rounded-full"></div>
        
        {/* Light effect overlay */}
        <div className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-50"></div>
        </div>
        
        {/* Hover highlight effect */}
        {isHovering && (
          <motion.div 
            className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-grappl-orange/5"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-grappl-orange/10 blur-xl rounded-full"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PhoneMockup;
