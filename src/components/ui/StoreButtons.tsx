"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface StoreButtonsProps {
  className?: string;
  animate?: boolean;
}

const StoreButtons: React.FC<StoreButtonsProps> = ({ 
  className = '',
  animate = true
}) => {
  return (
    <div className={`flex flex-wrap gap-4 items-center justify-center ${className}`}>
      {/* App Store Button */}
      <motion.div
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }}
        className="rounded-xl overflow-hidden shadow-md"
      >
        <Link 
          href="https://apps.apple.com/us/app/grapplapp/id1577021977" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download on the App Store"
        >
          <Image 
            src="/images/app-store-button.png" 
            alt="Download on the App Store"
            width={180} 
            height={60}
            className="transform transition-transform hover:scale-105"
          />
        </Link>
      </motion.div>
      
      {/* Google Play Button */}
      <motion.div
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }}
        className="rounded-xl overflow-hidden shadow-md"
      >
        <Link 
          href="https://play.google.com/store/apps/details?id=com.grapplapp" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get it on Google Play"
        >
          <Image 
            src="/images/google-play-button.png" 
            alt="Get it on Google Play"
            width={180} 
            height={60}
            className="transform transition-transform hover:scale-105"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default StoreButtons;
