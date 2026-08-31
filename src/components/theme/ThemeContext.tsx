import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

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
    navBg: string;
    surface: string;
    accentText: string;
  };
}

interface ThemeContextValue {
  theme: PortfolioTheme;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const buildTheme = (mode: 'light' | 'dark'): PortfolioTheme => {
  const isLight = mode === 'light';

  return {
    mode,
    gradients: {
      background: isLight ? '#ede6d9' : '#09090b',
      accent: '#2563eb',
      panel: isLight
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(24, 24, 27, 0.9)',
    },
    colors: {
      textPrimary: isLight ? '#1c1917' : '#fafafa',
      textSecondary: isLight ? '#5c564c' : '#a1a1aa',
      bgElevated: isLight ? '#ffffff' : '#18181b',
      border: isLight ? '#dcd3c2' : '#27272a',
      focus: '#2563eb',
      navBg: isLight
        ? 'rgba(237, 230, 217, 0.88)'
        : 'rgba(9,9,11,0.85)',
      surface: isLight ? '#ffffff' : '#18181b',
      accentText: '#2563eb',
    },
  };
};

const getInitialMode = (): 'light' | 'dark' => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const PortfolioThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMode(getInitialMode());
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // Only follow system if no saved preference
      try {
        if (!localStorage.getItem('portfolio-theme')) {
          setMode(e.matches ? 'dark' : 'light');
        }
      } catch {}
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('portfolio-theme', next); } catch {}
      return next;
    });
  };

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const usePortfolioTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('usePortfolioTheme must be used within PortfolioThemeProvider');
  return ctx;
};
