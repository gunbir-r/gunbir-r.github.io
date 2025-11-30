import React from 'react';
import { usePortfolioTheme } from '../theme/ThemeContext';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useCursorGlow } from '../../hooks/useCursorGlow';

const navStyles = (accent: string) => css`
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  padding: 0 2rem;
  backdrop-filter: blur(16px) saturate(140%);
  background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0));
  border-bottom: 1px solid rgba(255,255,255,0.08);
  z-index: 50;
  a { color: #fff; text-decoration: none; font-weight: 500; position: relative; }
  a:after { content:''; position:absolute; left:0; bottom:-4px; height:2px; width:0; background:${accent}; transition:width .35s cubic-bezier(.4,0,.2,1); border-radius:2px; }
  a:hover:after, a:focus-visible:after { width:100%; }
`;

const gradientBackground = (bg: string, cursorX: number, cursorY: number, isVisible: boolean) => css`
  min-height: 100dvh;
  background: ${bg};
  background-attachment: fixed;
  overflow-x: hidden;
  position: relative;
  
  /* Eye-catching animated gradient accent elements */
  &::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at 30% 40%, rgba(217, 70, 239, 0.15) 0%, transparent 50%);
    pointer-events: none;
    animation: float 35s ease-in-out infinite;
    z-index: 0;
    filter: blur(40px);
  }

  &::after {
    content: '';
    position: fixed;
    bottom: -30%;
    right: -30%;
    width: 150%;
    height: 150%;
    background: radial-gradient(ellipse at 70% 60%, rgba(0, 217, 255, 0.12) 0%, transparent 50%);
    pointer-events: none;
    animation: float 40s ease-in-out infinite reverse;
    z-index: 0;
    filter: blur(40px);
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -25px) scale(1.05); }
    50% { transform: translate(-25px, 20px) scale(0.95); }
    75% { transform: translate(15px, 15px) scale(1.02); }
  }

  /* Cursor-reactive glow effect */
  ${isVisible ? `
    &::backdrop {
      pointer-events: none;
    }
  ` : ''}
`;

const contentWrapper = css`
  padding-top: 5.5rem;
  position: relative;
  z-index: 1;
  min-height: 100vh;
`;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = usePortfolioTheme();
  const { cursor, isVisible } = useCursorGlow();

  return (
    <div css={gradientBackground(theme.gradients.background, cursor.x, cursor.y, isVisible)}>
      <nav css={navStyles(theme.gradients.accent)} aria-label="Primary">
        <div style={{ fontWeight: 700, fontSize: '1.25rem', background: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Gunbir Reehal</div>
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
      <main css={contentWrapper}>{children}</main>
    </div>
  );
};

export default Layout;
