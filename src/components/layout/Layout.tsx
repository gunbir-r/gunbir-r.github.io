import React, { useState } from 'react';
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

const desktopLinksStyles = css`
  display: flex;
  gap: 1.75rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const hamburgerStyles = css`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 60;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.open span:nth-of-type(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }
  &.open span:nth-of-type(2) {
    opacity: 0;
  }
  &.open span:nth-of-type(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const mobileMenuStyles = (isOpen: boolean) => css`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 5.5rem;
    left: 0;
    right: 0;
    background: rgba(10, 14, 39, 0.65);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    padding: 1.5rem 2rem;
    gap: 1.25rem;
    transform: ${isOpen ? 'translateY(0)' : 'translateY(-120%)'};
    opacity: ${isOpen ? 1 : 0};
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 49;

    a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div css={gradientBackground(theme.gradients.background, cursor.x, cursor.y, isVisible)}>
      <nav css={navStyles(theme.gradients.accent)} aria-label="Primary">
        <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem', background: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }} onClick={closeMobileMenu}>Gunbir Reehal</Link>
        
        {/* Desktop Links */}
        <div css={desktopLinksStyles}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Hamburger Button */}
        <button
          css={hamburgerStyles}
          className={mobileMenuOpen ? 'open' : ''}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div css={mobileMenuStyles(mobileMenuOpen)}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/about" onClick={closeMobileMenu}>About</Link>
        <Link to="/projects" onClick={closeMobileMenu}>Projects</Link>
        <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
      </div>

      <main css={contentWrapper}>{children}</main>
    </div>
  );
};

export default Layout;
