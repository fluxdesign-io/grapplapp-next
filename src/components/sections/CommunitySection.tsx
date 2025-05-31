import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import AnimatedButton from '../ui/AnimatedButton';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  location: string;
}

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mapPoints, setMapPoints] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  const [counters, setCounters] = useState({
    gyms: 0,
    practitioners: 0,
    countries: 0,
    openMats: 0
  });
  
  // Target counter values
  const counterTargets = {
    gyms: 1200,
    practitioners: 35000,
    countries: 42,
    openMats: 850
  };
  
  // Intersection observer for animations
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5, once: true });
  const [statsRef, isStatsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, once: true });
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Alex Johnson",
      role: "BJJ Blue Belt",
      text: "GrapplApp has completely changed how I find open mats when I travel! No more wasting time on Google searches filtering through other martial arts studios.",
      location: "New York, USA"
    },
    {
      name: "Maria Silva",
      role: "BJJ Black Belt Instructor",
      text: "As an instructor who travels frequently, GrapplApp has been invaluable in helping me find gyms to train at and connecting me with the local Jiu-Jitsu community.",
      location: "Rio de Janeiro, Brazil"
    },
    {
      name: "David Park",
      role: "BJJ Purple Belt",
      text: "The instant booking feature is amazing! I can quickly find and schedule sessions without the back-and-forth messaging. GrapplApp is truly the Jiu-Jitsu community's answer to Google.",
      location: "Sydney, Australia"
    },
    {
      name: "Emma Wilson",
      role: "Gym Owner",
      text: "Our gym has seen a significant increase in drop-ins since listing on GrapplApp. The platform connects us directly with travelers looking for places to train.",
      location: "London, UK"
    }
  ];
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const mapScale = useTransform(scrollYProgress, [0.1, 0.6], [0.8, 1.1]);
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.3, 1, 1, 0.3]);
  
  // Generate random points on the map for the global community visualization
  useEffect(() => {
    const points = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
    setMapPoints(points);
  }, []);
  
  // Initialize counter animations when visible
  useEffect(() => {
    if (!isStatsVisible || !counterRef.current) return;
    
    const duration = 2.5;
    
    // Animate counters from 0 to target values
    Object.entries(counterTargets).forEach(([key, target]) => {
      let start = 0;
      const increment = target / (duration * 60); // 60fps
      
      const updateCounter = () => {
        if (start < target) {
          start = Math.min(start + increment, target);
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(start)
          }));
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    });
  }, [isStatsVisible, counterTargets]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background circuit pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern
            id="circuit-bg"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path
              d="M25 0V25H0M50 25H25M25 50V25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-bg)" />
        </svg>
      </div>
      
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-grappl-black">
              Global <span className="text-grappl-orange">Jiu-Jitsu</span> Community
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with the worldwide Jiu-Jitsu community through GrapplApp - the most comprehensive and easy OPEN MAT registry so you can find 'friendly' gyms wherever you are!
            </p>
          </motion.div>
        </div>
        
        {/* Interactive map */}
        <div className="mb-16">
          <motion.div
            ref={mapRef}
            style={{ scale: mapScale, opacity: mapOpacity }}
            className="relative aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100"
          >
            {/* World map outlines - simplified for this example */}
            <div className="absolute inset-0 p-4">
              <div className="h-full w-full rounded-lg border-2 border-gray-300 opacity-30"></div>
            </div>
            
            {/* Dynamic points representing Jiu-Jitsu practitioners/gyms */}
            {mapPoints.map((point, index) => (
              <motion.div
                key={`point-${index}`}
                className="absolute rounded-full bg-grappl-orange shadow-lg shadow-grappl-orange/30"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: point.size,
                  height: point.size,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: point.delay,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 10 + 5,
                }}
              />
            ))}
            
            {/* Connection lines between points */}
            <svg className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
              {mapPoints.slice(0, 15).map((point, i) => {
                const connectedPoints = mapPoints
                  .slice(i + 1, i + 5)
                  .filter(() => Math.random() > 0.5);
                
                return connectedPoints.map((cp, j) => (
                  <motion.line
                    key={`line-${i}-${j}`}
                    x1={`${point.x}%`}
                    y1={`${point.y}%`}
                    x2={`${cp.x}%`}
                    y2={`${cp.y}%`}
                    stroke="#FF5800"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: point.delay }}
                  />
                ));
              })}
            </svg>
          </motion.div>
        </div>
        
        {/* Stats counters */}
        <div 
          ref={statsRef}
          className="mb-16"
        >
          <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Gyms', value: counters.gyms },
              { label: 'Practitioners', value: counters.practitioners },
              { label: 'Countries', value: counters.countries },
              { label: 'Open Mats', value: counters.openMats }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="grappl-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-grappl-orange mb-2">
                  {formatNumber(stat.value)}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-80 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 100
                }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-12 h-12 text-grappl-orange mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-center text-lg md:text-xl mb-6 italic text-gray-600">
                  "{testimonial.text}"
                </p>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-grappl-black">{testimonial.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <span className="text-grappl-orange">•</span>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Navigation dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-grappl-orange scale-125' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <AnimatedButton href="#install" variant="primary" size="lg">
            Join the Community
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
