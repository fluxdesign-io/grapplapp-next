"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingExperienceProps {
  onLoadComplete: () => void;
}

/**
 * Simple, elegant loading experience
 */
const LoadingExperience = ({ onLoadComplete }: LoadingExperienceProps) => {
  // Simple loading state
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Ensure loading completes reliably
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 40);
    
    // Guaranteed completion after 2 seconds
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      setTimeout(() => {
        onLoadComplete();
      }, 300); // Small delay to show completion
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-sm mx-auto px-6 text-center">
        {/* Subtle light effects */}
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-gradient-to-b from-grappl-orange/5 to-transparent rounded-full blur-3xl" />
        
        {/* Logo */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <Image 
              src="/images/TheAppCircle (1).png" 
              alt="GrapplApp" 
              width={80} 
              height={80}
              className="mx-auto"
            />
            
            {/* Subtle glow */}
            <motion.div 
              className="absolute -inset-3 bg-grappl-orange/5 rounded-full blur-xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* Brand typography */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-grappl-orange">Grappl</span>
            <span className="text-gray-900">App</span>
          </h1>
          
          <motion.p 
            className="text-gray-600 text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {loadingProgress < 100 ? "Loading your experience..." : "Ready"}
          </motion.p>
        </motion.div>
        
        {/* Simple, reliable progress bar */}
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs mx-auto mb-4">
          <motion.div
            className="h-full bg-grappl-orange"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        {/* Loading indicator */}
        <motion.div
          className="flex justify-center space-x-2 h-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {loadingProgress < 100 ? (
            // Loading dots
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-grappl-orange"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ) : (
            // Success checkmark
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-grappl-orange"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingExperience;
