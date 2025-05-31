"use client";

import { useState, useEffect } from 'react';

// This is a temporary implementation until we create the store
// We'll use a simple callback approach for now
export const useSectionObserver = () => {
  const [currentSection, setCurrentSection] = useState('');
  
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const id = entry.target.getAttribute('id') || '';
          setCurrentSection(id);
          
          // We would typically use this with a store
          // For now this just updates active section in the component state
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.5
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return { currentSection };
};
