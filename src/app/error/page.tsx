"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ErrorPage() {
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
          <h1 className="text-6xl font-bold text-grappl-orange mb-4">500</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Technical Time-Out</h2>
          <p className="text-gray-400 mb-8">
            Our server needs a moment to recover. Please try again in a few minutes.
          </p>
        </motion.div>
        
        {/* Technical time-out animation */}
        <div className="relative h-64 mb-12 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          {/* Timer display */}
          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <motion.div 
              className="bg-grappl-orange text-white px-8 py-2 rounded-full font-mono text-2xl"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              00:30
            </motion.div>
          </div>
          
          {/* Coach and injured fighter */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="relative h-40 w-full">
              {/* Mat */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-gray-900"></div>
              
              {/* Coach (server admin) */}
              <motion.div
                className="absolute bottom-10 left-10 flex flex-col items-center"
                animate={{ x: [0, 5, 0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                <div className="w-16 h-20 rounded-t-lg bg-grappl-orange mt-2"></div>
                <div className="text-xs text-white mt-2">Server Admin</div>
              </motion.div>
              
              {/* Server (injured fighter) */}
              <div className="absolute bottom-10 right-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div className="w-16 h-20 rounded-t-lg bg-gray-500 mt-2"></div>
                <motion.div 
                  animate={{ rotate: [0, -5, 0, 5, 0], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-2 right-2 text-xl"
                >
                  💻
                </motion.div>
                <div className="text-xs text-white mt-2">Server</div>
              </div>
              
              {/* Repair tools */}
              <motion.div
                className="absolute bottom-16 right-16"
                animate={{ 
                  rotate: [0, 20, 0, -20, 0],
                  y: [0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              >
                <span className="text-2xl">🔧</span>
              </motion.div>
            </div>
          </div>
          
          {/* Loading status messages */}
          <motion.div
            className="absolute left-5 top-20 text-sm font-mono text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>Diagnosing issue...</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Restarting server processes...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Applying emergency patches...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 2, repeat: Infinity }}
            >
              Recovery in progress_
            </motion.p>
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
            Our team has been notified and is working to resolve the issue
          </p>
        </div>
      </div>
    </div>
  );
}
