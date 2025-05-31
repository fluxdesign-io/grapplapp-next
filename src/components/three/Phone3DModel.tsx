import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store/useAppStore';
import { motion } from 'framer-motion';

// Model component that loads and displays the phone
const PhoneModel = ({ scrollProgress = 0 }) => {
  // In a real implementation, we would load an actual GLTF model
  // For now, we'll create a simple phone shape with primitives
  const phoneRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Rotate based on scroll position
  useFrame((state) => {
    if (!phoneRef.current) return;
    
    // Base rotation
    phoneRef.current.rotation.y = Math.PI * 0.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    
    // Additional rotation based on scroll progress
    phoneRef.current.rotation.z = scrollProgress * 0.5;
    
    // Tilt phone based on scroll
    phoneRef.current.rotation.x = scrollProgress * 0.2;
    
    // Move phone based on scroll
    phoneRef.current.position.y = scrollProgress * -1;
  });
  
  return (
    <group ref={phoneRef} scale={viewport.width < 5 ? 0.7 : 1}>
      {/* Phone frame */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 5, 0.2]} />
        <meshPhysicalMaterial 
          color="#121212" 
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      
      {/* Phone screen */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[2.3, 4.8]} />
        <meshBasicMaterial color="#232323" />
      </mesh>
      
      {/* App UI on the screen */}
      <group position={[0, 0, 0.13]} scale={[0.98, 0.98, 0.98]}>
        {/* App background */}
        <mesh>
          <planeGeometry args={[2.2, 4.7]} />
          <meshBasicMaterial color="#111111" toneMapped={false} />
        </mesh>
        
        {/* App header */}
        <mesh position={[0, 2, 0.01]}>
          <planeGeometry args={[2.2, 0.5]} />
          <meshBasicMaterial color="#FF5800" toneMapped={false} />
        </mesh>
        
        {/* App logo text - GRAPPLAPP */}
        <group position={[0, 2, 0.02]}>
          <mesh>
            <planeGeometry args={[1.4, 0.25]} />
            <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.001]} scale={[0.9, 0.5, 1]}>
            <planeGeometry args={[1.2, 0.15]} />
            <meshBasicMaterial color="#FF5800" toneMapped={false} />
          </mesh>
        </group>
        
        {/* Search bar with magnifying glass icon */}
        <group position={[0, 1.3, 0.01]}>
          <mesh scale={[0.9, 1, 1]}>
            <planeGeometry args={[2.2, 0.3]} />
            <meshBasicMaterial color="#222222" toneMapped={false} />
          </mesh>
          <mesh position={[-0.8, 0, 0.001]} scale={[0.12, 0.12, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#FF5800" toneMapped={false} />
          </mesh>
          <mesh position={[0.1, 0, 0.001]} scale={[0.6, 0.1, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#555555" toneMapped={false} />
          </mesh>
        </group>
        
        {/* Content blocks - representing gym listings with GLOWING elements */}
        {[-0.7, 0, 0.7, 1.4, 2.1].map((y, i) => (
          <group key={`content-${i}`} position={[0, y, 0.01]} scale={[0.9, 1, 1]}>
            {/* Card background with gradient */}
            <mesh position={[0, -0.8, 0]} scale={[1, 0.25, 1]}>
              <planeGeometry args={[2, 1]} />
              <meshPhongMaterial 
                color={i % 2 === 0 ? "#222222" : "#1A1A1A"} 
                emissive={"#FF5800"} 
                emissiveIntensity={0.05} 
                toneMapped={false} 
              />
            </mesh>
            
            {/* Card icon - BRIGHT ORANGE */}
            <mesh position={[-0.8, -0.8, 0.01]} scale={[0.15, 0.15, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial color="#FF5800" toneMapped={false} />
            </mesh>
            
            {/* Card text (simplified as bars) */}
            <mesh position={[-0.1, -0.75, 0.01]} scale={[0.7, 0.05, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial color="#FFFFFF" toneMapped={false} opacity={0.9} transparent />
            </mesh>
            
            <mesh position={[-0.2, -0.85, 0.01]} scale={[0.5, 0.03, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial color="#999999" toneMapped={false} opacity={0.7} transparent />
            </mesh>
            
            {/* Rating stars */}
            {[0.4, 0.5, 0.6, 0.7, 0.8].map((x, starIndex) => (
              <mesh 
                key={`star-${i}-${starIndex}`} 
                position={[x, -0.82, 0.01]} 
                scale={[0.03, 0.03, 1]}
              >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial 
                  color={starIndex < 4 ? "#FF5800" : "#555555"} 
                  toneMapped={false} 
                />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Navigation bar - GLOWING */}
        <mesh position={[0, -2.2, 0.01]}>
          <planeGeometry args={[2.2, 0.4]} />
          <meshPhongMaterial 
            color="#FF5800" 
            emissive="#FF5800" 
            emissiveIntensity={0.3} 
            toneMapped={false} 
          />
        </mesh>
        
        {/* Nav buttons - PROMINENT */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <mesh key={`nav-${i}`} position={[x, -2.2, 0.02]} scale={[0.12, 0.12, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
          </mesh>
        ))}
      </group>
      
      {/* Logo */}
      <mesh position={[0, -2.3, 0.12]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="#FF5800" emissive="#FF5800" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

interface Phone3DModelProps {
  className?: string;
  scrollProgress?: number;
}

export default function Phone3DModel({ className = '', scrollProgress = 0 }: Phone3DModelProps) {
  // Access app store for phone rotation state
  const { phoneRotation, setPhoneRotation, reducedMotion } = useAppStore();
  const [isClient, setIsClient] = useState(false);
  
  // Only render on client-side to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className={`relative w-full h-[400px] ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-grappl-orange">
          Loading 3D Phone...
        </div>
      </div>
    );
  }
  
  // If reduced motion is enabled, use a simpler presentation
  if (reducedMotion) {
    return (
      <div className={`relative w-full h-[400px] ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[200px] h-[400px] bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-300 m-1 overflow-hidden">
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-10 h-1 bg-grappl-orange rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative w-full h-[500px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#101010', 10, 20]} />
        <ambientLight intensity={1.5} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          shadow-mapSize={1024}
        />
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float rotationIntensity={0.2} floatIntensity={0.5}>
            <PhoneModel scrollProgress={scrollProgress} />
          </Float>
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
      
      {/* Orange glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-grappl-orange/20 rounded-full blur-xl" />
    </div>
  );
}
