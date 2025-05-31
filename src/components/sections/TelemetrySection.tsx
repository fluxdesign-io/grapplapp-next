"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface TelemetryData {
  activeUsers: number;
  trainingHours: number;
  techniquesRecorded: number;
  globalRank: number;
  progression: number;
}

const TelemetrySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  // Animation for data loading effect
  const [telemetryData, setTelemetryData] = useState<TelemetryData>({
    activeUsers: 0,
    trainingHours: 0,
    techniquesRecorded: 0,
    globalRank: 0,
    progression: 0
  });
  
  const targetData = {
    activeUsers: 27843,
    trainingHours: 142,
    techniquesRecorded: 89,
    globalRank: 327,
    progression: 94
  };
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setTelemetryData(prev => {
          const newData = { ...prev };
          let allComplete = true;
          
          // Increment each value toward target
          Object.keys(prev).forEach(key => {
            const k = key as keyof TelemetryData;
            if (prev[k] < targetData[k]) {
              const increment = Math.max(1, Math.ceil((targetData[k] - prev[k]) / 15));
              newData[k] = Math.min(targetData[k], prev[k] + increment);
              allComplete = false;
            }
          });
          
          if (allComplete) clearInterval(interval);
          return newData;
        });
      }, 40);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 0.8]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      id="telemetry"
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Grid lines background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12">
          {Array(12).fill(0).map((_, i) => (
            <div key={`vline-${i}`} className="h-full border-l border-gray-800"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array(12).fill(0).map((_, i) => (
            <div key={`hline-${i}`} className="w-full border-t border-gray-800"></div>
          ))}
        </div>
      </div>
      
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.span 
              variants={itemVariants}
              className="inline-block text-sm font-mono text-[#FF5800] tracking-widest mb-4"
            >
              REAL-TIME ANALYTICS
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6"
            >
              LIVE <span className="text-[#FF5800]">TELEMETRY</span>
            </motion.h2>
            
            <motion.div 
              variants={itemVariants} 
              className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FF5800] to-transparent mb-8"
            ></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl mx-auto text-lg mb-12"
            >
              Real-time data from your Jiu-Jitsu journey, continuously updated and monitored
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono text-gray-400 tracking-wider">ACTIVE TRAINING TIME</h3>
                <div className="w-2 h-2 bg-[#FF5800] rounded-full"></div>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-mono text-white mr-2">{telemetryData.trainingHours}</span>
                <span className="text-sm text-gray-500">HRS</span>
              </div>
              
              <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#FF5800]"
                  style={{ width: `${(telemetryData.trainingHours / targetData.trainingHours) * 100}%` }}
                ></motion.div>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <span className="text-[#FF5800]">+12%</span> from last week
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono text-gray-400 tracking-wider">TECHNIQUES LOGGED</h3>
                <div className="w-2 h-2 bg-[#FF5800] rounded-full"></div>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-mono text-white mr-2">{telemetryData.techniquesRecorded}</span>
                <span className="text-sm text-gray-500">TOTAL</span>
              </div>
              
              <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#FF5800]"
                  style={{ width: `${(telemetryData.techniquesRecorded / targetData.techniquesRecorded) * 100}%` }}
                ></motion.div>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <span className="text-[#FF5800]">+8</span> new techniques this month
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono text-gray-400 tracking-wider">SKILL PROGRESSION</h3>
                <div className="w-2 h-2 bg-[#FF5800] rounded-full"></div>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-mono text-white mr-2">{telemetryData.progression}%</span>
              </div>
              
              <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#FF5800]"
                  style={{ width: `${telemetryData.progression}%` }}
                ></motion.div>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <span className="text-[#FF5800]">Blue Belt</span> rank estimated
              </div>
            </motion.div>
          </div>
          
          {/* Global stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 p-8 rounded-sm"
          >
            <h3 className="text-lg font-mono text-white mb-6">GLOBAL NETWORK TELEMETRY</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-xs text-gray-500 mb-1 font-mono">ACTIVE USERS</div>
                <div className="text-2xl text-[#FF5800] font-mono">{telemetryData.activeUsers.toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1 font-mono">GLOBAL RANK</div>
                <div className="text-2xl text-[#FF5800] font-mono">#{telemetryData.globalRank.toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1 font-mono">NETWORK UPTIME</div>
                <div className="text-2xl text-[#FF5800] font-mono">99.98%</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1 font-mono">SERVER LOAD</div>
                <div className="text-2xl text-[#FF5800] font-mono">28.4%</div>
              </div>
            </div>
            
            {/* Real-time signal visualization */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-gray-500 font-mono">LIVE NETWORK SIGNAL</div>
                <div className="text-xs text-[#FF5800] font-mono animate-pulse">● TRANSMITTING</div>
              </div>
              
              <div className="h-12 w-full overflow-hidden">
                <motion.div
                  className="flex h-full items-end gap-px"
                >
                  {Array(50).fill(0).map((_, i) => (
                    <motion.div
                      key={`signal-${i}`}
                      className="flex-1 bg-[#FF5800]/80"
                      animate={{ 
                        height: ["20%", "40%", "80%", "60%", "30%", "70%", "50%"][i % 7] 
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.02
                      }}
                    ></motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <button className="bg-[#FF5800] text-black px-8 py-3 rounded-sm font-mono tracking-wider hover:bg-[#FF5800]/90 transition-colors">
              ACCESS FULL TELEMETRY
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Telemetry footer data */}
      <div className="absolute bottom-8 right-8 text-xs font-mono text-gray-700">
        <div>LATENCY: 34ms</div>
        <div>SYNC: CONTINUOUS</div>
        <div>NODE: CENTRAL-07</div>
      </div>
    </section>
  );
};

export default TelemetrySection;
