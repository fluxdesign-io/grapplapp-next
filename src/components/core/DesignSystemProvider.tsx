"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Enhanced design system with premium micro-interactions
interface DesignSystemContextType {
  colorScheme: "light" | "dark";
  setColorScheme: (scheme: "light" | "dark") => void;
  accentColor: string;
  elevation: {
    subtle: string;
    medium: string;
    high: string;
    floating: string;
  };
  motion: {
    subtle: any;
    medium: any;
    energetic: any;
    premium: any;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  mousePosition: { x: number; y: number };
  addDimensionalEffect: (element: HTMLElement) => void;
}

const defaultContext: DesignSystemContextType = {
  colorScheme: "light",
  setColorScheme: () => {},
  accentColor: "#FF5800", // Retained the orange accent from memory
  elevation: {
    subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
    high: "0 8px 30px rgba(0, 0, 0, 0.12)",
    floating: "0 12px 40px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(255, 88, 0, 0.05)",
  },
  motion: {
    subtle: { type: "spring", stiffness: 300, damping: 30 },
    medium: { type: "spring", stiffness: 500, damping: 30 },
    energetic: { type: "spring", stiffness: 700, damping: 30 },
    premium: { type: "spring", stiffness: 400, damping: 40, restDelta: 0.001 },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
    xxl: "8rem"
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px"
  },
  mousePosition: { x: 0, y: 0 },
  addDimensionalEffect: () => {}
};

const DesignSystemContext = createContext<DesignSystemContextType>(defaultContext);

export function useDesignSystem() {
  return useContext(DesignSystemContext);
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const [accentColor] = useState<string>("#FF5800"); // Maintained the orange accent
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Premium hover effects registry
  const dimensionalElements = React.useRef<Set<HTMLElement>>(new Set());
  
  // Mouse position tracking for dimensional effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Apply dimensional effect to registered elements
      dimensionalElements.current.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - centerX) / 20;
        const distanceY = (e.clientY - centerY) / 20;
        const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        
        if (distance < 100) {
          // Subtle tilt effect based on mouse position - premium but not obtrusive
          element.style.transform = `perspective(1000px) rotateX(${-distanceY * 0.05}deg) rotateY(${distanceX * 0.05}deg) translateZ(5px)`;
        } else {
          element.style.transform = "none";
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Load user preferences from localStorage
  useEffect(() => {
    const storedScheme = localStorage.getItem("grappl-color-scheme");
    if (storedScheme === "light" || storedScheme === "dark") {
      setColorScheme(storedScheme);
    }
    
    // Premium fade-in for entire app
    setTimeout(() => {
      setIsLoaded(true);
    }, 200); // Very short delay for smooth entrance
  }, []);

  // Update localStorage when scheme changes
  useEffect(() => {
    localStorage.setItem("grappl-color-scheme", colorScheme);
    document.documentElement.setAttribute("data-theme", colorScheme);
    
    // Apply premium CSS variables to the document root
    const root = document.documentElement;
    root.style.setProperty('--nexus-accent-color', accentColor);
    root.style.setProperty('--nexus-accent-color-light', `${accentColor}20`);
    root.style.setProperty('--nexus-accent-color-medium', `${accentColor}40`);
    root.style.setProperty('--nexus-accent-color-dark', `${accentColor}80`);
  }, [colorScheme, accentColor]);
  
  // Register an element for dimensional effects
  const addDimensionalEffect = (element: HTMLElement) => {
    dimensionalElements.current.add(element);
    
    // Clean up function when element is removed
    return () => {
      dimensionalElements.current.delete(element);
    };
  };

  // Dynamic context value with memoization for performance
  const value = useMemo(() => ({
    colorScheme,
    setColorScheme,
    accentColor,
    elevation: {
      subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
      medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
      high: "0 8px 30px rgba(0, 0, 0, 0.12)",
      floating: `0 12px 40px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(${parseInt(accentColor.slice(1,3), 16)}, ${parseInt(accentColor.slice(3,5), 16)}, ${parseInt(accentColor.slice(5,7), 16)}, 0.05)`,
    },
    motion: defaultContext.motion,
    spacing: defaultContext.spacing,
    borderRadius: defaultContext.borderRadius,
    mousePosition,
    addDimensionalEffect
  }), [colorScheme, accentColor, mousePosition]);

  return (
    <DesignSystemContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="nexus-enhanced-container"
          >
            {/* Subtle luminance cursor follower - extremely faint to not distract */}
            <motion.div
              className="pointer-events-none fixed z-[999] h-[300px] w-[300px] rounded-full bg-gradient-radial from-orange-500/5 to-transparent blur-3xl"
              style={{
                left: mousePosition.x - 150,
                top: mousePosition.y - 150,
                opacity: 0.4
              }}
              animate={{
                left: mousePosition.x - 150,
                top: mousePosition.y - 150,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                mass: 0.5
              }}
            />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DesignSystemContext.Provider>
  );
};

export default DesignSystemProvider;
