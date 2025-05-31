import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative pt-12 sm:pt-20 pb-16 md:pb-8 sm:pb-10 bg-white text-grappl-black overflow-hidden">
      {/* Orange glow background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-grappl-orange/30 rounded-[100%] blur-[100px] opacity-60" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-16 text-center sm:text-left">
          {/* Logo and description */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="relative h-10 w-40">
                  <Image
                    src="/images/PRIMARYGrapplAppLogoORGBLK (1).png"
                    alt="GrapplApp Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                The leading progressive web application that connects people with their own private, mobile Jiu-Jitsu Professor, or local Jiu-Jitsu gym.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-grappl-orange/10 flex items-center justify-center transition-colors hover:bg-grappl-orange hover:text-white"
                    aria-label={`Follow GrapplApp on ${social}`}
                  >
                    <span className="sr-only">Follow on {social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Quick links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Home', 'Features', 'Open Mats', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-grappl-orange transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Support */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                {['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-grappl-orange transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and new features.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-l-md flex-grow focus:outline-none focus:ring-1 focus:ring-grappl-orange"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-grappl-orange text-white rounded-r-md hover:bg-grappl-orange/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center sm:items-start mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {year} GrapplApp. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made by <a href="https://www.linkedin.com/in/mostafaamir/" target="_blank" rel="noopener noreferrer" className="text-grappl-orange hover:underline">Mostafa Amir</a>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="#privacy" className="hover:text-grappl-orange transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-grappl-orange transition-colors">Terms of Service</Link>
            <span>|</span>
            <Link href="#cookies" className="hover:text-grappl-orange transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
