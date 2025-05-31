import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { fadeInOnScroll } from '@/lib/utils/animations';
import AnimatedButton from '../ui/AnimatedButton';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Features data
  const features: FeatureCard[] = [
    {
      title: "Find Private Instructors",
      description: "Connect with your own private, mobile Jiu-Jitsu Professor for personalized training.",
      icon: "🥋",
      color: "from-orange-400 to-orange-600",
    },
    {
      title: "Discover Local Gyms",
      description: "Easily find local Jiu-Jitsu gyms in your area with detailed information.",
      icon: "🏢",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Open Mat Registry",
      description: "Find 'friendly' gyms wherever you are with our comprehensive Open Mat registry.",
      icon: "🗺️",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Instant Booking",
      description: "Book sessions instantly with links to websites and social media accounts.",
      icon: "📅",
      color: "from-purple-400 to-purple-600",
    }
  ];
  
  // Intersection observer for animations
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5, once: true });
  
  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Initialize animations
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsContainerRef.current) return;
    
    // Animate heading when it becomes visible
    fadeInOnScroll(headingRef.current);
    
    // Auto-rotate through features
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => {
      clearInterval(featureInterval);
    };
  }, [features.length]);
  
  return (
    <section 
      id="app" 
      ref={sectionRef}
      className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-5"
        style={{ y: backgroundY }}
        aria-hidden="true"
      >
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={`pattern-${i}`}
              className="absolute bg-grappl-orange/30 rounded-full"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(60px)',
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 z-10">
        {/* Section title */}
        <div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-grappl-black"
            >
              Forget Google,&nbsp;
              <span className="text-grappl-orange">Go GrapplApp</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              GrapplApp is providing real, affordable solutions for the Jiu-Jitsu community by developing the first, real, affordable, and effective alternative to Google.
            </p>
          </motion.div>
        </div>
        
        {/* Feature showcase */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* 3D Prism Effect */}
          <motion.div 
            className="w-full lg:w-1/2 perspective"
            style={{ opacity: cardOpacity, scale: cardScale }}
          >
            <div 
              className="relative aspect-[9/16] max-w-xs mx-auto preserve-3d"
              style={{ transform: 'rotateY(-15deg) rotateX(10deg)' }}
            >
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl border border-gray-300 overflow-hidden preserve-3d">
                {/* App screen */}
                <div className="absolute inset-1 rounded-2xl bg-gray-100 overflow-hidden">
                  {/* App screen content */}
                  <div className="relative w-full h-full overflow-hidden">
                    {/* App header */}
                    <div className="bg-grappl-orange text-white p-4 flex justify-between items-center">
                      <span className="font-bold">GrapplApp</span>
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-white/30" />
                        <div className="w-4 h-4 rounded-full bg-white/30" />
                      </div>
                    </div>
                    
                    {/* App content */}
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        className="absolute inset-0 p-4 pt-20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ 
                          opacity: activeFeature === index ? 1 : 0,
                          x: activeFeature === index ? 0 : 50,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-2`}>
                            {feature.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        
                        {/* Mock cards */}
                        <div className="space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <div key={`card-${i}`} className="bg-white rounded-lg p-3 shadow-md flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                              <div className="flex-grow">
                                <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                                <div className="h-2 w-32 bg-gray-100 rounded" />
                              </div>
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} flex-shrink-0 flex items-center justify-center text-white text-xs`}>
                                →
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* App navigation */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around">
                      {features.map((_, index) => (
                        <button 
                          key={`nav-${index}`}
                          onClick={() => setActiveFeature(index)}
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: activeFeature === index 
                              ? '#FF5800' 
                              : '#e0e0e0' 
                          }}
                          aria-label={`View feature ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reflection */}
              <div 
                className="absolute left-[5%] right-[5%] h-[30%] bottom-[-30px] rounded-[50%] bg-black/20 blur-md"
                style={{ transform: 'rotateX(80deg) scale(0.9, 0.2)' }}
              />
              
              {/* Floating elements */}
              <div className="absolute -right-8 top-20 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg opacity-80 animate-float" />
              <div className="absolute -left-6 top-40 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg opacity-80 animate-float" style={{ animationDelay: '1.5s' }} />
              <div className="absolute right-4 -bottom-8 w-20 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg opacity-80 animate-float" style={{ animationDelay: '0.8s' }} />
            </div>
          </motion.div>
          
          {/* Feature descriptions */}
          <div 
            ref={cardsContainerRef} 
            className="w-full lg:w-1/2 space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                onClick={() => setActiveFeature(index)}
                className={`grappl-card cursor-pointer transition-all ${activeFeature === index ? 'border-grappl-orange/50 shadow-lg' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-grappl-black dark:text-white flex items-center gap-2">
                      {feature.title}
                      {activeFeature === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-grappl-orange"
                        />
                      )}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <AnimatedButton href="#install" variant="primary" size="lg">
                TAPP That
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transform -skew-y-2 translate-y-8 z-0" />
    </section>
  );
}
