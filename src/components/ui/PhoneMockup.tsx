import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

/**
 * MinimalistPhoneMockup Component
 * A modern, clean phone mockup with a real hand design and subtle animations
 * Inspired by minimalist design principles with advanced interactions
 */
const PhoneMockup: React.FC = () => {
  // Animation controls for synchronized animations
  const controls = useAnimation();
  const controlsContent = useAnimation();
  
  // State for interactions and features
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for elements
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Viewport detection - modified to show immediately on mobile
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
    rootMargin: '0px'
  });
  
  // Features data for display in the phone
  const features = [
    {
      id: 'connect',
      title: 'Connect with Training Partners',
      description: 'Find and connect with BJJ practitioners near you',
      icon: '👥',
    },
    {
      id: 'discover',
      title: 'Discover Open Mats',
      description: 'Find places to roll while traveling',
      icon: '🌏',
    },
    {
      id: 'track',
      title: 'Track Progress',
      description: 'Log techniques and training sessions',
      icon: '📈',
    },
  ];

  // Users data - for realistic app demonstration
  const users = [
    {
      id: 'user1',
      name: 'Stefan Quandt',
      location: 'BJJ Practitioner',
      avatar: '/images/avatar1.jpg'
    },
    {
      id: 'user2',
      name: 'Joris Mars',
      location: 'BJJ Practitioner',
      avatar: '/images/avatar2.jpg'
    },
    {
      id: 'user3',
      name: 'Lara Denigan',
      location: 'BJJ Practitioner',
      avatar: '/images/avatar3.jpg'
    }
  ];

  // Tasks data - for realistic app demonstration
  const tasks = [
    { id: 't1', text: 'Daily Review', completed: true },
    { id: 't2', text: 'Gym Review', completed: false }
  ];

  // Trigger animations when the component comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      controlsContent.start('visible');
    } else {
      controls.start('hidden');
      controlsContent.start('hidden');
    }
  }, [inView, controls, controlsContent]);

  // Handle scroll effects for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax effect for subtle interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-1 to 1)
      const x = ((e.clientX - centerX) / (rect.width / 2));
      const y = ((e.clientY - centerY) / (rect.height / 2));
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle through features
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [inView, features.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  };

  const phoneVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  // Handle subtle parallax effect based on mouse position
  const getParallaxStyle = (strength: number = 1) => {
    return {
      transform: `translate(${mousePosition.x * 10 * strength}px, ${mousePosition.y * 10 * strength}px)`
    };
  };

  // Calculate blob position based on scroll
  const getBlobStyle = () => {
    return {
      transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.03}px) rotate(${scrollY * 0.02}deg)`
    };
  };

  // Auto-trigger animations on mobile to ensure phone is visible immediately without waiting for scroll
  useEffect(() => {
    // Force animation to start immediately on small screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      controls.start('visible');
      controlsContent.start('visible');
    }
  }, [controls, controlsContent]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full min-h-[50vh] md:min-h-[70vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 md:py-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-[url('/images/gradient-bg.svg')] bg-no-repeat bg-cover opacity-90"></div>
        <motion.div 
          className="absolute right-0 top-20 md:top-0 w-[600px] h-[600px]"
          style={getBlobStyle()}
        >
          <Image 
            src="/images/blob-shape.svg" 
            alt="Background shape" 
            width={600} 
            height={600}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
      
      {/* Content section */}
      <div className="w-full md:w-1/2 z-10 mb-16 md:mb-0 pr-0 md:pr-6">
        <motion.div 
          className="max-w-lg"
          variants={textVariants}
          initial="hidden"
          animate={controlsContent}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Find your <span className="text-[#FF5800]">perfect</span> training partner
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Connect with local BJJ practitioners, discover open mats, and track your progress with GrapplApp's intuitive interface.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="px-6 py-3 bg-black text-white rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Download App
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Phone mockup section */}
      <div className="w-full md:w-1/2 relative z-10 flex justify-center items-center" ref={ref}>
        <motion.div
          className="relative"
          variants={phoneVariants}
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          {/* Hand holding phone image */}
          <div className="relative w-[300px] h-[600px] md:w-[380px] md:h-[760px]">
            <Image
              src="/images/phone-hand.svg"
              alt="Hand holding phone"
              width={380}
              height={760}
              className="w-full h-auto"
              priority
            />
            
            {/* Phone screen content - positioned precisely within the phone frame */}
            <div className="absolute top-[170px] left-[50px] w-[200px] md:top-[170px] md:left-[63px] md:w-[254px] h-[420px] bg-white rounded-[12px] overflow-hidden shadow-inner">
              {/* Status bar */}
              <div className="h-8 w-full bg-white flex items-center justify-between px-4 border-b border-gray-100">
                <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-2 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* App content */}
              <div className="p-4">
                {/* Search bar */}
                <div className="flex items-center bg-gray-100 p-2 rounded-full mb-5">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span className="text-xs text-gray-400">Find training partners</span>
                </div>
                
                {/* User profiles */}
                <div className="mb-6">
                  {users.map((user, index) => (
                    <motion.div 
                      key={user.id} 
                      className="flex items-center mb-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mr-3">
                        <div className="text-xs font-medium text-gray-500">{user.name.charAt(0)}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-800">{user.name}</div>
                        <div className="text-[10px] text-gray-500">{user.location}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Daily tasks */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3">Daily To-dos</h4>
                  
                  {tasks.map((task, index) => (
                    <motion.div 
                      key={task.id}
                      className="flex items-center mb-3"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-[#FF5800]' : 'border-2 border-gray-300'} flex items-center justify-center mr-2`}>
                        {task.completed && (
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${task.completed ? 'text-gray-500' : 'text-gray-700'}`}>{task.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* To-dos for everyone */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-3">To-dos for everyone</h4>
                  
                  <motion.div 
                    className="flex items-center mb-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2"></div>
                    <span className="text-xs text-gray-700">Gym Review</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center mb-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2"></div>
                    <span className="text-xs text-gray-700">Dojo Review</span>
                  </motion.div>
                </div>
                
                {/* Shared with */}
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Shared with 3 persons</span>
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 border border-white z-30"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-300 border border-white z-20"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-400 border border-white z-10"></div>
                  </div>
                </div>
              </div>
              
              {/* App features - animated transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-12"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-3 bg-black rounded-lg text-white">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{features[activeFeature].icon}</span>
                      <div>
                        <h5 className="font-medium text-[11px]">{features[activeFeature].title}</h5>
                        <p className="text-[9px] text-gray-300">{features[activeFeature].description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Screen shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          {/* Interactive dots/indicators */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            {features.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  index === activeFeature ? 'bg-[#FF5800]' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => setActiveFeature(index)}
                animate={{
                  scale: index === activeFeature ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
