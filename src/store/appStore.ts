"use client";

import { create } from 'zustand';

interface AppState {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  
  // Theme state (light with orange accent)
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Mobile menu state
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: '',
  setCurrentSection: (section) => set({ currentSection: section }),
  
  // Default to light theme with orange accents as per the site's design
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false })
}));
