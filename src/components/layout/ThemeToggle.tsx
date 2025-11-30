import React from 'react';
import { usePortfolioTheme } from '../theme/ThemeContext';
import { css } from '@emotion/react';

const toggleCss = css`
  cursor: pointer;
  padding: 0.5rem 1.1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 999px;
  border: 2px solid rgba(255, 0, 127, 0.4);
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(200,100,255,0.15));
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: all .4s cubic-bezier(.22,.61,.36,1);
  box-shadow: 
    0 8px 32px rgba(255, 0, 127, 0.3),
    inset 0 1px 1px rgba(255,255,255,0.3),
    0 0 20px -5px rgba(0, 217, 255, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0, 217, 255, 0.1), rgba(255, 0, 127, 0.1));
    pointer-events: none;
  }

  &:hover { 
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 12px 40px rgba(255, 0, 127, 0.4),
      inset 0 1px 1px rgba(255,255,255,0.4),
      0 0 30px -2px rgba(0, 217, 255, 0.6);
    border-color: rgba(255, 0, 127, 0.6);
  }
  
  &:active { transform: translateY(-1px) scale(0.98); }
  
  &:focus-visible { 
    outline: 2px solid #00d9ff;
    outline-offset: 4px;
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme } = usePortfolioTheme();
  return (
    <div aria-label="Dark mode indicator" css={toggleCss} style={{ cursor: 'default', opacity: 0.8 }}>
      {theme.mode === 'dark' ? '🌙 Dark' : '🌙 Dark'}
    </div>
  );
};

export default ThemeToggle;
