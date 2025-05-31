"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const MissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  // Mission points data
  const missionPoints = [
    {
      title: "REVOLUTIONIZE JIU-JITSU TRAINING",
      description: "Create the definitive tracking system for martial artists to monitor progress and optimize training efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )
    },
    {
      title: "CONNECT THE GLOBAL JIU-JITSU COMMUNITY",
      description: "Build an ecosystem where practitioners worldwide can share knowledge, techniques, and experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      title: "ACCELERATE SKILL DEVELOPMENT",
      description: "Leverage data analytics to help practitioners identify patterns, strengths, weaknesses, and accelerate growth.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
        </svg>
      )
    },
    {
      title: "DEMOCRATIZE ELITE TRAINING",
      description: "Make advanced training methodologies accessible to everyone, from beginners to black belts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="m6 9 6 6 6-6"></path>
          <path d="M6 12h12"></path>
          <path d="M12 3v6"></path>
          <path d="M12 21v-6"></path>
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="mission" 
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5800] to-transparent opacity-70"></div>
      
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 text-white"
      >
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="mb-16 text-center">
            <motion.span 
              className="inline-block text-sm font-mono text-[#FF5800] tracking-wider mb-2"
              variants={itemVariants}
            >
              MISSION DIRECTIVE
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-mono font-bold mb-6 tracking-tight"
              variants={itemVariants}
            >
              THE <span className="text-[#FF5800]">GRAPPLAPP</span> MISSION
            </motion.h2>
            
            <motion.div 
              className="h-px w-40 bg-gradient-to-r from-transparent via-[#FF5800] to-transparent mx-auto mb-8"
              variants={itemVariants}
            ></motion.div>
            
            <motion.p 
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Our mission is to transform how practitioners train, track progress, and grow in the art of Jiu-Jitsu through cutting-edge technology and community connection.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {missionPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-sm"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(255, 88, 0, 0.05), 0 10px 10px -5px rgba(255, 88, 0, 0.01)" 
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-5">{point.icon}</div>
                <h3 className="text-lg font-mono text-white mb-3 tracking-wide">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-24 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center justify-center px-6 py-3 border border-[#FF5800] rounded-sm text-[#FF5800] text-sm font-mono tracking-wider cursor-pointer group transition-colors hover:bg-[#FF5800]/10">
              READ MISSION STATEMENT
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Mission telemetry data - SpaceX style */}
      <div className="absolute bottom-10 right-10 text-xs font-mono text-gray-700">
        <div>MISSION DATE: {new Date().toLocaleDateString()}</div>
        <div>OBJECTIVE: GLOBAL BJJ TRANSFORMATION</div>
        <div>STATUS: ACTIVE</div>
      </div>
    </section>
  );
};

export default MissionSection;
