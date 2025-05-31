import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const StellarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Generate stars
    const stars: Star[] = [];
    const numStars = Math.floor(window.innerWidth * window.innerHeight / 1000);
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * 0.1 + 0.95,
        cycle: Math.random() * Math.PI * 2
      });
    }
    
    // Generate larger features
    const nebulae: Nebula[] = [];
    for (let i = 0; i < 3; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        color: getRandomColor(),
        opacity: Math.random() * 0.05 + 0.02
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    let frameCount = 0;
    
    const render = () => {
      frameCount++;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0, 
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw stars with pulsating effect
      stars.forEach(star => {
        const pulseScale = Math.sin(frameCount * 0.02 + star.cycle) * 0.2 + 1;
        const finalOpacity = star.opacity * star.pulse * pulseScale;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #000814 0%, #001233 100%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"></div>
    </div>
  );
};

// Helper types
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulse: number;
  cycle: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
}

// Generate random space colors
function getRandomColor(): string {
  const colors = [
    '#FF5800', // Orange (GrapplApp brand color)
    '#3a86ff', // Blue
    '#6a00f4', // Purple
    '#8d99ae', // Light blue-gray
    '#ef233c'  // Red-like
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default StellarBackground;
