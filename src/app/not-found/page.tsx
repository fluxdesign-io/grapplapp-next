"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function NotFound() {
  // Add class to body for full-page styling
  useEffect(() => {
    document.body.classList.add('error-page');
    return () => {
      document.body.classList.remove('error-page');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-grappl-black p-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-grappl-orange mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">You've Been Caught in a Submission</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for seems to have tapped out and left the mat.
          </p>
        </motion.div>
        
        {/* Jiu-Jitsu animation - submission hold */}
        <div className="relative h-64 mb-12">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          >
            <div className="relative">
              {/* Stylized figures in a submission hold */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32">
                {/* Attacker - triangle choke */}
                <div className="absolute left-0 top-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-grappl-orange"></div>
                  <div className="absolute top-8 left-20 w-16 h-6 bg-grappl-orange rounded-full transform -rotate-45"></div>
                  <div className="absolute top-20 left-16 w-6 h-16 bg-grappl-orange rounded-full"></div>
                </div>
                
                {/* Defender - caught in triangle */}
                <motion.div 
                  className="absolute right-0 top-5 w-full h-full"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white"></div>
                  <div className="absolute top-10 right-5 w-4 h-14 bg-white rounded-full"></div>
                  <div className="absolute top-20 right-10 w-12 h-4 bg-white rounded-full"></div>
                </motion.div>
                
                {/* Tap animation */}
                <motion.div
                  className="absolute top-10 right-[-10px] text-2xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.5, 1.2, 0.5],
                    y: [0, -20, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                >
                  🖐️
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mat border */}
        <div className="bg-grappl-orange h-2 w-full mb-10 rounded-full"></div>
        
        {/* Navigation options */}
        <div className="text-center space-y-4">
          <AnimatedButton href="/" variant="primary" size="lg">
            Return to Home Page
          </AnimatedButton>
          
          <p className="text-gray-400 mt-4">
            Or check out our <Link href="#community" className="text-grappl-orange hover:underline">community section</Link> to find local Jiu-Jitsu gyms
          </p>
        </div>
      </div>
    </div>
  );
}
