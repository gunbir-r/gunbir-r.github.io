import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioTheme } from '../theme/ThemeContext';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const { theme, toggleMode } = usePortfolioTheme();
  const isLight = theme.mode === 'light';

  return (
    <motion.button
      onClick={toggleMode}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '999px',
        border: `1.5px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.textPrimary,
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme.mode}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
