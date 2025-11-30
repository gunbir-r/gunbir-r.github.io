import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

export interface GradientStop {
  at: string;
  color: string;
}

export interface PortfolioTheme {
  mode: 'light' | 'dark';
  gradients: {
    background: string;
    accent: string;
    panel: string;
  };
  colors: {
    textPrimary: string;
    textSecondary: string;
    bgElevated: string;
    border: string;
    focus: string;
  };
}

interface ThemeContextValue {
  theme: PortfolioTheme;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const buildTheme = (mode: 'light' | 'dark'): PortfolioTheme => {
  // Vibrant, bold gradient: Neon Cyan → Electric Magenta → Hot Pink → Purple
  // Fun, energetic, eye-catching but still professional
  const coolGradient = 'linear-gradient(135deg, #00f5ff 0%, #ff0080 40%, #bf40bf 70%, #7f00ff 100%)'; // Neon cyan → hot pink → electric purple
  
  // Dark mode only: Rich, saturated background with high-contrast vibrant accents
  const backgroundGradients = {
    // Dark Mode: Vibrant neon accents on deep space-like base for maximum character and fun
    dark: `
      radial-gradient(ellipse at 20% 50%, rgba(0, 245, 255, 0.35) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(255, 0, 128, 0.32) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 0%, rgba(191, 64, 191, 0.28) 0%, transparent 60%),
      radial-gradient(ellipse at 100% 20%, rgba(127, 0, 255, 0.22) 0%, transparent 50%),
      linear-gradient(135deg, #0a0e27 0%, #1a0a3e 20%, #2d1b5e 40%, #1a0f3e 60%, #0f0a2e 100%)
    `
  };

  return {
    mode,
    gradients: {
      background: backgroundGradients.dark, // Dark mode only
      accent: coolGradient,
      panel:
        'linear-gradient(145deg, rgba(20,15,50,0.92), rgba(40,25,80,0.88))',
    },
    colors: {
      textPrimary: '#f0f9ff',
      textSecondary: '#00f5ff',
      bgElevated: 'rgba(20,25,60,0.85)',
      border: 'rgba(0, 245, 255, 0.5)',
      focus: '#00f5ff'
    }
  };
};

// Detect system preference for theme (now always dark)
const getSystemTheme = (): 'light' | 'dark' => {
  return 'dark'; // Always dark mode
};

export const PortfolioThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

  // Initialize with system preference on mount
  useEffect(() => {
    setMode(getSystemTheme());
  }, []);

  // Listen for system preference changes (no-op now since always dark)
  useEffect(() => {
    // Always use dark mode
    setMode('dark');
  }, []);

  const toggleMode = () => setMode(m => (m === 'light' ? 'dark' : 'light'));
  const theme = useMemo(() => buildTheme(mode || 'light'), [mode]);

  return <ThemeContext.Provider value={{ theme, toggleMode }}>{children}</ThemeContext.Provider>;
};

export const usePortfolioTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('usePortfolioTheme must be used within PortfolioThemeProvider');
  return ctx;
};
