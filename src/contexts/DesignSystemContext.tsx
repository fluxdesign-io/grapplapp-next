"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useAppStore } from '@/store/appStore';

// Define theme variables
const themeVariables = {
  light: {
    primary: '#FF5800',  // Brand orange
    background: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    accent: '#FF5800',
    surface: '#FFFFFF',
    border: '#EEEEEE',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  dark: {
    primary: '#FF5800',  // Brand orange
    background: '#000000',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    accent: '#FF5800', 
    surface: '#111111',
    border: '#333333',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  }
};

// Define the type for our context
type DesignSystemContextType = {
  theme: 'light' | 'dark';
  colors: typeof themeVariables.light;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      mono: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
  };
  toggleTheme: () => void;
};

// Create the context with a default value
const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

// Provider component
export const DesignSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useAppStore();
  
  // Select the appropriate theme colors based on the current theme
  const colors = theme === 'light' ? themeVariables.light : themeVariables.dark;
  
  // Spacing system
  const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  };
  
  // Typography system
  const typography = {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  };
  
  // Value we'll provide to the context
  const value = {
    theme,
    colors,
    spacing,
    typography,
    toggleTheme,
  };
  
  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

// Custom hook to use the design system context
export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};
