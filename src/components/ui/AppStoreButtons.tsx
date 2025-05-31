"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface AppStoreButtonsProps {
  className?: string;
  showQR?: boolean;
  animated?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({ 
  className = '',
  showQR = false,
  animated = true,
  size = 'medium'
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isQRVisible, setIsQRVisible] = useState(false);
  
  // Size dimensions for the buttons
  const dimensions = {
    small: { width: 120, height: 40 },
    medium: { width: 150, height: 50 },
    large: { width: 180, height: 60 }
  };
  
  // Determine actual dimensions
  const { width, height } = dimensions[size];
  
  // Generate QR code animation variants
  const qrVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Handler for QR toggle
  const toggleQR = () => {
    setIsQRVisible(!isQRVisible);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex flex-wrap gap-4 justify-center">
        {/* App Store Button - Exact Match to Reference Image */}
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setHoveredButton('appstore')}
          onHoverEnd={() => setHoveredButton(null)}
          className="relative"
        >
          <Link 
            href="https://apps.apple.com/us/app/grapplapp/id1577021977" 
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
              {/* Recreating App Store Button Exactly Like Reference */}
              <div className="flex items-center justify-between px-4 py-2.5 w-full" style={{ width: width, height: height }}>
                <div className="flex-shrink-0 mr-3">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-xs text-gray-300 font-medium">Download on the</div>
                  <div className="text-xl text-white font-semibold tracking-tight -mt-1">App Store</div>
                </div>
              </div>
              
              {/* Premium hover effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredButton === 'appstore' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Glowing border on hover */}
              <motion.div 
                className="absolute -inset-0.5 bg-blue-500/20 rounded-xl blur-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredButton === 'appstore' ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Ultra-premium particle effect on hover - subtle dots */}
              {hoveredButton === 'appstore' && (
                <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      initial={{ 
                        x: Math.random() * width, 
                        y: Math.random() * height,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{ 
                        y: [null, Math.random() * height - 20],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 1 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </Link>
        </motion.div>
        
        {/* Google Play Button - Exact Match to Reference */}
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setHoveredButton('googleplay')}
          onHoverEnd={() => setHoveredButton(null)}
          className="relative"
        >
          <Link 
            href="https://play.google.com/store/apps/details?id=com.grapplapp" 
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
              {/* Recreating Google Play Button Exactly Like Reference */}
              <div className="flex items-center justify-between px-4 py-2.5 w-full" style={{ width: width, height: height }}>
                <div className="flex-shrink-0 mr-3">
                  <div className="relative w-7 h-7">
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                        <path d="M0.15002 0.390015C0.0500202 0.540015 0 0.740015 0 0.980015V21.0001C0 21.2401 0.0500202 21.4401 0.15002 21.5901L0.22998 21.6701L11.11 10.7901V10.2001L0.23004 -0.679985L0.15002 0.390015Z" fill="#5BC9F4"/>
                        <path d="M14.71 14.3899L11.11 10.7899V10.1999L14.71 6.5999L14.81 6.6599L19.03 9.0799C20.31 9.8099 20.31 11.1999 19.03 11.9299L14.81 14.3299L14.71 14.3899Z" fill="#EA4335"/>
                        <path d="M14.81 14.3299L11.11 10.6299L0.15002 21.5899C0.58002 22.0099 1.29998 22.0599 2.08998 21.6499L14.81 14.3299Z" fill="#34A853"/>
                        <path d="M14.81 6.93994L2.09003 -0.380005C1.30003 -0.790005 0.580078 -0.740005 0.150078 -0.320005L11.11 10.6399L14.81 6.93994Z" fill="#FBBC04"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-xs text-gray-300 font-medium">GET IT ON</div>
                  <div className="text-xl text-white font-semibold tracking-tight -mt-1">Google Play</div>
                </div>
              </div>
              
              {/* Premium hover effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredButton === 'googleplay' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Glowing border on hover - multicolor for Google */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-red-500/20 to-yellow-500/20 rounded-xl blur-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredButton === 'googleplay' ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Ultra-premium particle effect on hover */}
              {hoveredButton === 'googleplay' && (
                <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ 
                        backgroundColor: ['#5BC9F4', '#EA4335', '#34A853', '#FBBC04'][Math.floor(Math.random() * 4)]
                      }}
                      initial={{ 
                        x: Math.random() * width, 
                        y: Math.random() * height,
                        opacity: 0,
                        scale: 0 
                      }}
                      animate={{ 
                        y: [null, Math.random() * height - 20],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 1 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
      
      {/* QR Code Option */}
      {showQR && (
        <div className="mt-6 text-center">
          <motion.button
            onClick={toggleQR}
            className="inline-flex items-center gap-2 px-4 py-2 text-grappl-orange hover:text-grappl-orange-light transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">Scan QR Code</span>
            <motion.div
              animate={{ rotate: isQRVisible ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>
          
          <motion.div
            variants={qrVariants}
            initial="hidden"
            animate={isQRVisible ? "visible" : "hidden"}
            className="overflow-hidden"
          >
            <div className="py-6 px-3">
              <div className="relative mx-auto w-48 h-48 bg-white rounded-xl p-2 shadow-lg">
                {/* Dynamic QR Code */}
                <div className="w-full h-full relative overflow-hidden">
                  <Image 
                    src="/images/qr-grapplapp.png" 
                    alt="QR Code to download GrapplApp" 
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                  
                  {/* Interactive scanning animation */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-grappl-orange to-transparent"
                    animate={{
                      y: [0, 180, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Center logo overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-lg p-2">
                      <div className="w-full h-full relative">
                        <Image 
                          src="/images/TheAppCircle (1).png" 
                          alt="GrapplApp Icon" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="mt-2 text-center text-xs text-gray-600">Scan to download</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AppStoreButtons;
