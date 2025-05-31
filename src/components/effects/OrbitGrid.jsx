import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OrbitGrid = ({ 
  color = '#FF5800', 
  density = 20,
  speed = 1 
}) => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, 500]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize handling
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Grid parameters
    const gridSize = 40;
    const dotSize = 1;
    
    // Animation parameters
    let time = 0;
    let animationFrameId;
    
    // Points for the grid
    const points = [];
    const rows = Math.ceil(canvas.height / gridSize) + 1;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    
    for (let i = 0; i < rows * density; i++) {
      for (let j = 0; j < cols * density; j++) {
        if (Math.random() > 0.85) { // Add some randomness to the grid
          points.push({
            x: (j / density) * gridSize,
            y: (i / density) * gridSize,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            size: Math.random() * dotSize + 0.5,
            color: color,
            alpha: Math.random() * 0.4 + 0.1
          });
        }
      }
    }
    
    // Line connection distance threshold
    const connectionDistance = gridSize * 2.5;
    
    // Animation rendering
    const render = () => {
      time += speed * 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points position with oscillation
      points.forEach(point => {
        point.x += Math.sin(time + point.y * 0.01) * 0.2 + point.vx;
        point.y += Math.cos(time + point.x * 0.01) * 0.2 + point.vy;
        
        // Wrap around edges
        if (point.x > canvas.width) point.x = 0;
        if (point.x < 0) point.x = canvas.width;
        if (point.y > canvas.height) point.y = 0;
        if (point.y < 0) point.y = canvas.height;
      });
      
      // Draw connections between nearby points
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < points.length; i++) {
        const pointA = points[i];
        
        for (let j = i + 1; j < points.length; j++) {
          const pointB = points[j];
          const dx = pointA.x - pointB.x;
          const dy = pointA.y - pointB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = (1 - (distance / connectionDistance)) * 0.5 * pointA.alpha * pointB.alpha;
            
            // Draw line
            ctx.beginPath();
            ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw points
      points.forEach(point => {
        ctx.beginPath();
        ctx.fillStyle = `${point.color}${Math.floor(point.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [color, density, speed]);
  
  return (
    <motion.div className="fixed inset-0 z-0 opacity-40" style={{ y: scrollOffset }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

export default OrbitGrid;
