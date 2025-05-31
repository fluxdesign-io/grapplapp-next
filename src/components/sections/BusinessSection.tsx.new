import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import AnimatedButton from '../ui/AnimatedButton';

interface BusinessService {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export default function BusinessSection() {
  const [activeService, setActiveService] = useState(0);
  const [roiValues, setRoiValues] = useState({
    monthlyVisitors: 100,
    conversionRate: 5,
    averageValue: 150,
  });
  
  // Interaction observers for animations
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5, once: true });
  const [cardsRef, isCardsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, once: true });
  const [calcRef, isCalcVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3, once: true });
  
  // Business services data
  const services: BusinessService[] = [
    {
      title: "Gym Marketing",
      description: "Increase visibility and attract new students with targeted marketing for your Jiu-Jitsu gym.",
      icon: "🏢",
      benefits: [
        "Enhanced local search visibility",
        "Direct connection to traveling practitioners",
        "Showcase your gym's unique amenities",
        "Instant booking capabilities"
      ]
    },
    {
      title: "Instructor Profile",
      description: "Create a professional profile to offer private lessons and grow your student base.",
      icon: "👨‍🏫",
      benefits: [
        "Featured instructor listings",
        "Student reviews and testimonials",
        "Credential verification",
        "Scheduling integration"
      ]
    },
    {
      title: "Event Promotion",
      description: "Promote your tournaments, seminars, and open mats to the entire GrapplApp community.",
      icon: "🏆",
      benefits: [
        "Wide reach within the Jiu-Jitsu community",
        "Integrated registration system",
        "Automated reminders for attendees",
        "Post-event analytics"
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Access detailed analytics about your business performance and community engagement.",
      icon: "📊",
      benefits: [
        "Track visitor impressions and clicks",
        "Measure conversion rates",
        "Competitor benchmarking",
        "Actionable growth insights"
      ]
    }
  ];
  
  // Calculate ROI based on user inputs
  const calculateMonthlyROI = (): { visitors: number; leads: number; revenue: number } => {
    const { monthlyVisitors, conversionRate, averageValue } = roiValues;
    const leads = Math.round(monthlyVisitors * (conversionRate / 100));
    const revenue = leads * averageValue;
    
    return {
      visitors: monthlyVisitors,
      leads,
      revenue
    };
  };
  
  // ROI calculation result
  const roi = calculateMonthlyROI();
  
  return (
    <section
      id="business"
      className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
      
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="h-full w-full">
          <svg width="100%" height="100%">
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M100 0 L100 50 L50 50 L50 100 M0 50 L50 50 M50 0 L50 50" stroke="#FF5800" strokeWidth="1" fill="none" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
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
              <span className="text-grappl-orange">TAPP</span> Into Business Growth
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              GrapplApp provides real, affordable solutions for the Jiu-Jitsu community by developing the first, real, affordable, and effective alternative to Google.
            </p>
          </motion.div>
        </div>
        
        {/* Business services */}
        <div 
          ref={cardsRef}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`grappl-card cursor-pointer transition-all ${
                  activeService === index ? 'border-grappl-orange shadow-lg' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isCardsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveService(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-grappl-orange/10 flex items-center justify-center text-2xl mb-3">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-grappl-black">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Service benefits */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeService === index ? 1 : 0, 
                      height: activeService === index ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-auto"
                  >
                    <ul className="space-y-2 mt-2 mb-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-grappl-orange" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* ROI Calculator */}
        <div 
          ref={calcRef}
          className="mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            className="grappl-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isCalcVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2 text-grappl-black">
                ROI Calculator
              </h3>
              <p className="text-gray-600">
                See how GrapplApp can boost your business revenue
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Visitors ({roiValues.monthlyVisitors})
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={roiValues.monthlyVisitors}
                    onChange={(e) => setRoiValues(prev => ({ ...prev, monthlyVisitors: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-grappl-orange"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conversion Rate ({roiValues.conversionRate}%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={roiValues.conversionRate}
                    onChange={(e) => setRoiValues(prev => ({ ...prev, conversionRate: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-grappl-orange"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Customer Value (${roiValues.averageValue})
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={roiValues.averageValue}
                    onChange={(e) => setRoiValues(prev => ({ ...prev, averageValue: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-grappl-orange"
                  />
                </div>
              </div>
              
              {/* Results */}
              <div className="bg-white rounded-xl shadow-inner p-6 border border-gray-100">
                <h4 className="text-center text-lg font-medium mb-4 text-grappl-black">
                  Monthly Projections
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Visitors</span>
                      <span className="font-medium text-grappl-black">{roi.visitors.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-400" 
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(roi.visitors / 10, 100)}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>New Leads</span>
                      <span className="font-medium text-grappl-black">{roi.leads.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-400" 
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(roi.leads * 5, 100)}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Additional Revenue</span>
                      <span className="font-medium text-grappl-black">${roi.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div 
                        className="h-full bg-grappl-orange" 
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(roi.revenue / 50, 100)}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Annual Projection</span>
                      <span className="font-bold text-xl text-grappl-orange">${(roi.revenue * 12).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-grappl-black">
              Ready to grow your Jiu-Jitsu business?
            </h3>
            <p className="text-gray-600">
              With 'instant booking' features and links to your existing website and social media accounts, 
              GrapplApp is the fastest, easiest, and most affordable way to connect with the people!
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedButton
              href="#contact"
              variant="primary"
              size="lg"
            >
              Sign Up Now
            </AnimatedButton>
            
            <AnimatedButton
              href="#demo"
              variant="outline"
              size="lg"
              className="border border-grappl-orange text-grappl-orange hover:bg-grappl-orange/10"
            >
              Request Demo
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
