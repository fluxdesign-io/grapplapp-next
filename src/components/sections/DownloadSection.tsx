"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import AppStoreButtons from '../ui/AppStoreButtons';

const DownloadSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.6]);
  
  // Track if user has interacted with the section
  const [hasInteracted, setHasInteracted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHasInteracted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Premium features list
  const features = [
    {
      icon: "🥋",
      title: "Connect & Train",
      description: "Find the perfect training partners in your area",
      bgClass: "bg-grappl-orange/10"
    },
    {
      icon: "🗺️",
      title: "Discover Open Mats",
      description: "Never miss a training opportunity wherever you go",
      bgClass: "bg-blue-500/10"
    },
    {
      icon: "🎓",
      title: "Follow Top Professors",
      description: "Learn from world-class Jiu-Jitsu instructors",
      bgClass: "bg-purple-500/10"
    }
  ];

  return (
    <section id="download" className="py-24 bg-white overflow-hidden relative">
      {/* Premium design elements - floating highlights */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-grappl-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Directional accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-grappl-orange/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Interactive Download Panel */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="10" height="10" x="0" y="0">
                    <circle cx="1" cy="1" r="1" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#gridPattern)" />
                </svg>
              </div>
              
              {/* Content */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    <span className="text-grappl-orange">Download</span> The App
                  </h2>
                  
                  <p className="text-gray-600 mb-8 max-w-md">
                    Join 21,000+ Jiu-Jitsu practitioners worldwide. Experience the ultimate BJJ community app on your device.
                  </p>
                </motion.div>
                
                {/* Feature list - with hover interactions */}
                <div className="space-y-4 mb-10">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl ${feature.bgClass} transition-all cursor-pointer`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                        x: 4
                      }}
                      onHoverStart={() => setHoveredFeature(index)}
                      onHoverEnd={() => setHoveredFeature(null)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center text-xl">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                          <p className="text-gray-700 text-sm">{feature.description}</p>
                        </div>
                      </div>
                      
                      {/* Animated indicator */}
                      {hoveredFeature === index && (
                        <motion.div 
                          className="w-full h-0.5 bg-grappl-orange mt-2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          layoutId="featureIndicator"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Premium App Store Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <AppStoreButtons showQR={true} size="large" />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Dynamic App Showcase */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center items-center"
            style={{ y, opacity }}
          >
            <div className="relative max-w-[300px] mx-auto">
              {/* Primary phone */}
              <motion.div
                initial={{ opacity: 0, rotateY: -20, x: -50 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="relative z-20"
              >
                <div className="relative">
                  <Image
                    src="/images/app-showcase-1.png"
                    alt="GrapplApp Main Screen"
                    width={300}
                    height={600}
                    className="rounded-3xl shadow-2xl"
                  />
                  
                  {/* Dynamic screen content - subtle animation */}
                  {hasInteracted && (
                    <motion.div 
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {/* Subtle screen interactions */}
                      <motion.div 
                        className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-grappl-orange/20"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </motion.div>
                  )}
                  
                  {/* Screen reflection */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"
                    animate={{ 
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Secondary phone - layered for depth */}
              <motion.div
                initial={{ opacity: 0, rotateY: 20, x: 100 }}
                whileInView={{ opacity: 0.8, rotateY: 5, x: 80 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="absolute top-20 right-0 z-10 w-[220px]"
              >
                <Image
                  src="/images/app-showcase-2.png"
                  alt="GrapplApp Secondary Screen"
                  width={220}
                  height={450}
                  className="rounded-3xl shadow-xl"
                />
                
                {/* Screen reflection */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-bl from-white/20 to-transparent rounded-3xl"
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
              </motion.div>
              
              {/* Tertiary phone - for added dimension */}
              <motion.div
                initial={{ opacity: 0, rotateY: -20, x: -100 }}
                whileInView={{ opacity: 0.6, rotateY: -5, x: -40 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="absolute bottom-20 left-0 z-0 w-[180px]"
              >
                <Image
                  src="/images/app-showcase-3.png"
                  alt="GrapplApp Feature Screen"
                  width={180}
                  height={370}
                  className="rounded-3xl shadow-lg"
                />
              </motion.div>
              
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 right-10 bg-white rounded-full shadow-lg py-2 px-4 flex items-center space-x-1"
              >
                <div className="text-grappl-orange">★★★★★</div>
                <div className="text-xs font-medium">5.0</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -top-10 left-10 bg-white rounded-full shadow-lg py-2 px-4 flex items-center space-x-1"
              >
                <div className="text-xs font-medium">21K+ Users</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
