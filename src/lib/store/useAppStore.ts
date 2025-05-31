import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Sound
  isSoundEnabled: boolean;
  toggleSound: () => void;
  
  // Navigation
  currentSection: string;
  setCurrentSection: (section: string) => void;
  
  // Animation preferences
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // 3D Phone model
  phoneRotation: { x: number; y: number };
  setPhoneRotation: (x: number, y: number) => void;
  
  // Mobile interface state
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme - default to system preference
      isDarkMode: typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches 
        : false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Sound - default to off
      isSoundEnabled: false,
      toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
      
      // Navigation
      currentSection: 'hero',
      setCurrentSection: (section) => set({ currentSection: section }),
      
      // Animation preferences - respect system settings
      reducedMotion: typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false,
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      
      // 3D Phone model
      phoneRotation: { x: 0, y: 0 },
      setPhoneRotation: (x, y) => set({ phoneRotation: { x, y } }),
      
      // Mobile interface state
      isMobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: 'grapplapp-settings',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        isSoundEnabled: state.isSoundEnabled,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);
