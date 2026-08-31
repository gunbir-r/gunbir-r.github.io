import React, { useState } from 'react';
import { usePortfolioTheme } from '../theme/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = usePortfolioTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const isLight = theme.mode === 'light';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: theme.gradients.background,
        transition: 'background 0.3s ease, color 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      {/* ── Nav ── */}
      <nav
        aria-label="Primary"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: theme.colors.navBg,
          borderBottom: `1px solid ${theme.colors.border}`,
          zIndex: 50,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: theme.colors.textPrimary,
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            transition: 'color 0.2s',
          }}
        >
          Gunbir Reehal
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: isActive(link.to) ? 600 : 500,
                color: isActive(link.to) ? theme.colors.accentText : theme.colors.textSecondary,
                background: isActive(link.to)
                  ? isLight ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.15)'
                  : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  (e.currentTarget as HTMLElement).style.color = theme.colors.textPrimary;
                  (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  (e.currentTarget as HTMLElement).style.color = theme.colors.textSecondary;
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ width: '1px', height: '20px', background: theme.colors.border, margin: '0 0.5rem' }} />
          <ThemeToggle />
        </div>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-nav">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
              borderRadius: '8px',
              border: 'none',
              padding: 0,
              zIndex: 60,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: theme.colors.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: theme.colors.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: theme.colors.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop overlay */}
      {mobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 48,
          }}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{
          position: 'fixed',
          top: '4rem',
          left: 0,
          right: 0,
          background: theme.colors.navBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          padding: '0.75rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          borderBottom: `1px solid ${theme.colors.border}`,
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-110%)',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
          zIndex: 49,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
        className="mobile-menu"
      >
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeMobileMenu}
            style={{
              padding: '0.85rem 0.5rem',
              fontSize: '1.05rem',
              fontWeight: isActive(link.to) ? 700 : 500,
              color: isActive(link.to) ? theme.colors.accentText : theme.colors.textPrimary,
              textDecoration: 'none',
              borderBottom: `1px solid ${theme.colors.border}`,
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{link.label}</span>
            {isActive(link.to) && <span style={{ fontSize: '0.9rem' }}>●</span>}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          nav { padding: 0 1.25rem !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <main style={{ paddingTop: '4rem', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
