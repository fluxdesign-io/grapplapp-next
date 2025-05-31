import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/designSystem.css";
import "@/styles/responsive-utils.css";

// Import our design system provider
import DesignSystemProvider from "@/components/core/DesignSystemProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrapplApp - Connect with Jiu-Jitsu Anywhere",
  description: "The leading progressive web application that connects people with their own private, mobile Jiu-Jitsu Professor, or local Jiu-Jitsu gym!",
  keywords: ["Jiu-Jitsu", "BJJ", "Martial Arts", "Open Mat", "Training", "GrapplApp"],
  icons: {
    icon: "/images/SMGrapplAppLogoORGBLK (1).png",
    apple: "/images/TheAppCircle (1).png",
  },
  robots: "index, follow",
  openGraph: {
    title: "GrapplApp - Connect with Jiu-Jitsu Anywhere",
    description: "Find Jiu-Jitsu wherever you live and whenever you travel - TOTALLY FREE",
    url: "https://www.grapplapp.io/",
    siteName: "GrapplApp",
    images: [
      {
        url: "/images/PRIMARYGrapplAppLogoORGBLK (1).png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrapplApp - Connect with Jiu-Jitsu Anywhere",
    description: "Find Jiu-Jitsu wherever you live and whenever you travel - TOTALLY FREE",
    images: ["/images/PRIMARYGrapplAppLogoORGBLK (1).png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-white`} style={{ backgroundColor: 'white' }}>
      <head>
        {/* Background color fix that runs before ANY JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: `
          // CRITICAL: Run this before anything else to prevent black/gray flash
          (function() {
            // Force white background IMMEDIATELY
            document.documentElement.style.backgroundColor = 'white';
            
            // Create and append a white background element to cover the entire viewport
            var style = document.createElement('style');
            style.textContent = 'html, body { background-color: white !important; } body::before { content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: white; z-index: -1000; }';
            document.head.appendChild(style);
            
            // This ensures the background stays white through the entire load process
            var observer = new MutationObserver(function() {
              document.documentElement.style.backgroundColor = 'white';
              if (document.body) {
                document.body.style.backgroundColor = 'white';
                observer.disconnect();
              }
            });
            
            observer.observe(document.documentElement, { childList: true, subtree: true });
          })();
        `}} />
        
        {/* Enhanced viewport meta tag for mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Critical preload styles to prevent flash of unstyled content with dark background */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Apply immediately before any other styles */
          html { background-color: white !important; }
          html::before { content: ''; background: white !important; position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: -1000; }
          body { background-color: white !important; }
          #__next { background-color: white !important; }
          
          /* This ensures any potential dark elements are overridden */
          *, *::before, *::after { background-color: transparent; }
        `}} />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-white text-grappl-black antialiased text-base" style={{ backgroundColor: 'white' }}>
        {/* Background div to ensure white background */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'white', 
          zIndex: -1000 
        }}></div>
        
        <DesignSystemProvider>
          <main className="bg-white w-full">
            {children}
          </main>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
