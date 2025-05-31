import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import AnimatedButton from '../ui/AnimatedButton';

interface InstallStep {
  title: string;
  description: string;
  icon: string;
  platform?: string;
}

export default function InstallationSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [detectedDevice, setDetectedDevice] = useState('unknown');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5, once: true });
  
  // Define installation steps
  const installSteps: InstallStep[] = [
    {
      title: "Visit GrapplApp",
      description: "Open your browser and navigate to grapplapp.io",
      icon: "🌐"
    },
    {
      title: "Add to Home Screen (iOS)",
      description: "Tap the share icon and select 'Add to Home Screen'",
      icon: "📱",
      platform: "ios"
    },
    {
      title: "Install App (Android)",
      description: "Tap the menu button and select 'Add to Home Screen'",
      icon: "📲",
      platform: "android"
    },
    {
      title: "Create Your Profile",
      description: "Sign up and customize your Jiu-Jitsu profile",
      icon: "👤"
    },
    {
      title: "Find Local Gyms",
      description: "Search for gyms and open mats in your area",
      icon: "🔍"
    }
  ];
  
  // Detect user's device for platform-specific instructions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setDetectedDevice('ios');
      } else if (/android/.test(userAgent)) {
        setDetectedDevice('android');
      } else {
        setDetectedDevice('desktop');
      }
    }
  }, []);
  
  // Filter steps based on detected device
  const filteredSteps = installSteps.filter(step => 
    !step.platform || step.platform === detectedDevice || detectedDevice === 'unknown'
  );
  
  return (
    <section 
      id="install"
      className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Improved background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Circuit pattern background */}
        <svg width="100%" height="100%">
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M100 0 L100 50 L50 50 L50 100 M0 50 L50 50 M50 0 L50 50" stroke="#FF5800" strokeWidth="1" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Accent lighting effects */}
      <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-grappl-orange/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-grappl-orange/10 to-transparent" />
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-grappl-orange/30"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
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
            <div className="relative">
              {/* Glowing background effect for title */}
              <div className="absolute -inset-x-20 -inset-y-10 bg-grappl-orange/20 blur-3xl rounded-full opacity-70" />
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-grappl-black relative z-10">
                Ready to <span className="text-grappl-orange text-shadow-sm relative inline-block">
                  TAPP
                  {/* Glowing effect around TAPP */}
                  <span className="absolute inset-0 animate-pulse-glow rounded-lg blur-sm bg-grappl-orange/30 -z-10" />
                </span> That?
              </h2>
            </div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              GrapplApp is <span className="text-grappl-orange font-bold">TOTALLY FREE</span> to use and easy to install on any device.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              No more navigating messy Google searches!
            </motion.p>
          </motion.div>
        </div>
        
        {/* Installation guide */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0">
            {/* Step indicators - vertical timeline */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="relative h-full flex flex-col items-center">
                <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200" />
                
                {filteredSteps.map((_, index) => (
                  <div 
                    key={`indicator-${index}`}
                    className="relative z-10 mb-24"
                  >
                    {/* Connection line */}
                    {index > 0 && (
                      <div 
                        className={`absolute top-[-96px] left-5 w-0.5 h-24 
                          ${index <= currentStep ? 'bg-gradient-to-b from-grappl-orange to-grappl-orange/50' : 'bg-gray-700'}`}
                      />
                    )}
                    
                    <motion.button
                      onClick={() => setCurrentStep(index)}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${currentStep === index 
                          ? 'bg-grappl-orange text-white scale-125 shadow-lg shadow-grappl-orange/50' 
                          : index < currentStep 
                            ? 'bg-grappl-orange/80 text-white' 
                            : 'bg-gray-200 text-gray-600 border border-gray-300'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Pulsing ring effect for current step */}
                      {currentStep === index && (
                        <motion.span 
                          className="absolute inset-0 rounded-full border-2 border-grappl-orange"
                          initial={{ opacity: 0.7, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.5 }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeOut"
                          }}
                        />
                      )}
                      
                      {index < currentStep ? (
                        <motion.svg 
                          className="w-5 h-5"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, 360] }}
                          transition={{ duration: 0.5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </motion.button>
                    
                    {/* Step label - only shown for current step */}
                    {currentStep === index && (
                      <motion.span 
                        className="absolute left-14 top-1 text-grappl-orange font-medium whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {filteredSteps[index].title}
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step content */}
            <div className="col-span-1 lg:col-span-4 perspective">
              <div className="relative preserve-3d">
                {filteredSteps.map((step, index) => (
                  <motion.div
                    key={`step-${index}`}
                    className={`grappl-card mb-6 lg:mb-0 ${currentStep === index ? 'block' : 'hidden lg:block lg:absolute lg:inset-0'}`}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ 
                      opacity: currentStep === index ? 1 : 0,
                      rotateX: currentStep === index ? 0 : -90,
                      zIndex: currentStep === index ? 10 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-grappl-orange/10 flex items-center justify-center text-3xl">
                        {step.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-grappl-black">{step.title}</h3>
                          {step.platform && (
                            <span className="ml-2 text-xs uppercase bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                              {step.platform}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        {/* Step-specific content */}
                        {index === 0 && (
                          <div className="mt-4">
                            <div className="w-full max-w-sm h-12 rounded-md bg-white border border-gray-300 flex items-center px-3">
                              <span className="text-gray-400">https://</span>
                              <span className="ml-1 text-grappl-orange font-medium">www.grapplapp.io</span>
                            </div>
                          </div>
                        )}
                        
                        {index === 1 && detectedDevice === 'ios' && (
                          <div className="mt-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Navigation buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                          {index > 0 && (
                            <button
                              onClick={() => setCurrentStep(index - 1)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                            >
                              Previous
                            </button>
                          )}
                          
                          {index < filteredSteps.length - 1 ? (
                            <button
                              onClick={() => setCurrentStep(index + 1)}
                              className="px-4 py-2 bg-grappl-orange text-white rounded-md text-sm font-medium transition-colors hover:bg-grappl-orange/90"
                            >
                              Next Step
                            </button>
                          ) : (
                            <AnimatedButton
                              href="https://www.grapplapp.io"
                              variant="primary"
                            >
                              Open GrapplApp
                            </AnimatedButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="mt-20 text-center">
            <button
              onClick={() => setIsQRVisible(!isQRVisible)}
              className="inline-flex items-center gap-2 px-4 py-2 text-grappl-orange hover:text-grappl-orange/80 transition-colors"
            >
              <span>{isQRVisible ? "Hide QR Code" : "Show QR Code"}</span>
              <svg className={`w-5 h-5 transition-transform ${isQRVisible ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isQRVisible ? 'auto' : 0,
                opacity: isQRVisible ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="py-8 flex flex-col items-center">
                <div className="w-56 h-56 bg-white p-4 rounded-xl shadow-xl mb-4">
                  {/* This would be a real QR code in production */}
                  <div className="w-full h-full border-8 border-grappl-black rounded-lg relative overflow-hidden">
                    <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-1">
                      {[...Array(36)].map((_, i) => (
                        <div 
                          key={`qr-${i}`}
                          className="bg-grappl-black rounded-sm"
                          style={{ opacity: Math.random() > 0.4 ? 1 : 0 }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-grappl-orange rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">GRAPPL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Scan to install GrapplApp</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
