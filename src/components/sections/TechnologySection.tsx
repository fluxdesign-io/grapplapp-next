"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
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
  
  const techStack = [
    {
      title: "ADVANCED TRACKING ALGORITHM",
      description: "Proprietary AI-driven tracking system that provides unparalleled accuracy in analyzing techniques and progress.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M8 13h2"></path>
          <path d="M8 17h2"></path>
          <path d="M14 13h2"></path>
          <path d="M14 17h2"></path>
        </svg>
      )
    },
    {
      title: "MOTION DETECTION SYSTEM",
      description: "Advanced sensors and algorithms that detect and analyze movements with precision, offering real-time feedback.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
        </svg>
      )
    },
    {
      title: "ENCRYPTED DATA SYNC",
      description: "End-to-end encrypted cloud synchronization ensures your training data is always secure and accessible across devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z"></path>
          <path d="M7 17v1a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-1"></path>
          <path d="M17 12a5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5 5 5 0 0 0 5 5Z"></path>
          <path d="M17 17v1a3 3 0 0 1-3 3h-1"></path>
        </svg>
      )
    },
    {
      title: "QUANTUM OPTIMIZATION ENGINE",
      description: "Next-generation training recommendations calculated using our proprietary optimization algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5800]">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        </svg>
      )
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="technology"
      className="relative min-h-screen bg-black py-28 overflow-hidden"
    >
      {/* Grid background for tech feel */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20 pointer-events-none">
        {Array(144).fill(0).map((_, i) => (
          <div key={`grid-${i}`} className="border border-gray-900"></div>
        ))}
      </div>
      
      <motion.div
        style={{ y }}
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
              ADVANCED SYSTEMS
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-6"
            >
              PROPULSION <span className="text-[#FF5800]">TECHNOLOGIES</span>
            </motion.h2>
            
            <motion.div 
              variants={itemVariants} 
              className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FF5800] to-transparent mb-8"
            ></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              GrappL leverages cutting-edge technology to revolutionize how martial artists train, track, and improve.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 p-8 rounded-sm flex flex-col h-full"
              >
                <div className="mb-5">{tech.icon}</div>
                <h3 className="text-white font-mono text-lg mb-3">{tech.title}</h3>
                <p className="text-gray-400 text-sm mt-auto">{tech.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Technology showcase */}
          <motion.div 
            variants={itemVariants}
            className="mt-32 relative"
          >
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
                <h3 className="text-2xl md:text-3xl text-white font-mono mb-6">
                  REVOLUTIONARY <span className="text-[#FF5800]">NEURAL NETWORK</span> ALGORITHMS
                </h3>
                
                <p className="text-gray-400 mb-8">
                  Our proprietary machine learning algorithms analyze your movements in real-time, 
                  providing detailed feedback on technique execution and suggestions for improvement.
                </p>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <div className="w-4 h-4 mt-1 mr-3 bg-[#FF5800]/20 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#FF5800] rounded-full"></div>
                    </div>
                    <p className="text-gray-300">Advanced pose estimation with 99.7% accuracy</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 mt-1 mr-3 bg-[#FF5800]/20 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#FF5800] rounded-full"></div>
                    </div>
                    <p className="text-gray-300">Technique recognition trained on millions of examples</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 mt-1 mr-3 bg-[#FF5800]/20 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#FF5800] rounded-full"></div>
                    </div>
                    <p className="text-gray-300">Personalized improvement suggestions based on your unique style</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button className="bg-transparent border border-[#FF5800] text-[#FF5800] px-6 py-2 font-mono text-sm tracking-wider hover:bg-[#FF5800]/10 transition-colors duration-300 flex items-center">
                    VIEW TECHNICAL SPECS
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="border border-gray-800 rounded-sm p-1 bg-black">
                  <div className="relative aspect-video overflow-hidden rounded-sm">
                    <Image
                      src="/images/tech-diagram.webp"
                      alt="Neural Network Diagram"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    
                    {/* Tech overlay graphics */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-64 h-64 rounded-full border border-[#FF5800]/30"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      ></motion.div>
                      
                      <motion.div 
                        className="absolute w-40 h-40 rounded-full border border-gray-600"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      ></motion.div>
                      
                      <div className="absolute w-1 h-1 bg-[#FF5800] rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Data points */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-black border border-gray-800 px-4 py-2 text-xs font-mono text-[#FF5800]"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEURAL NET v5.2.1
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Tech telemetry data */}
      <div className="absolute bottom-8 left-8 text-xs font-mono text-gray-700">
        <div>CPU: OCTACORE NEURAL ENGINE</div>
        <div>GPU: TENSOR PROCESSING UNIT</div>
        <div>SUBSYSTEMS: NOMINAL</div>
      </div>
    </section>
  );
};

export default TechnologySection;
