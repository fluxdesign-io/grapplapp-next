import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-grappl-orange text-white border-transparent hover:text-grappl-orange',
    secondary: 'bg-grappl-black text-white border-transparent hover:text-grappl-black',
    outline: 'bg-transparent border-grappl-orange text-grappl-orange hover:bg-grappl-orange hover:text-white',
  };
  
  // Update mouse position relative to button for the liquid effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  // Play haptic feedback on mobile devices if supported
  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      if ('vibrate' in navigator) {
        navigator.vibrate(10); // Light 10ms vibration
      }
    }
  };
  
  const ButtonTag = href ? 'a' : 'button';
  
  return (
    <ButtonTag
      ref={buttonRef as any}
      href={href}
      onClick={(e: React.MouseEvent) => {
        triggerHapticFeedback();
        onClick && onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-hidden rounded-md font-bold uppercase tracking-wider
        transition-colors duration-300 border-2 outline-none focus:ring-2
        focus:ring-grappl-orange focus:ring-offset-2
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
    >
      {/* Liquid effect overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 2.5, 
            opacity: 0.5,
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            backgroundColor: variant === 'primary' ? 'white' : 
                            variant === 'secondary' ? 'white' : 
                            '#FF5800',
            width: 10,
            height: 10,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      {/* Button text */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Orange circuit pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path
              d="M10 0V10H0"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
    </ButtonTag>
  );
}
