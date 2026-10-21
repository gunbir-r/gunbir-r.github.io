import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const FUN_CAPTIONS = [
  '404: photo not developed yet 📸',
  'pretty sure there was a page here... 🕵️',
  'you found the secret void! 🌌',
  'still nothing here, promise! 😅',
];

const NotFound: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const location = useLocation();
  const isLight = theme.mode === 'light';
  const [captionIndex, setCaptionIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  const destinations = [
    {
      to: '/projects',
      emoji: '🚀',
      label: 'Check out my Projects',
      handwritten: 'see what I’ve built!',
      description:
        'Explore my favourite projects! From Chronos Edge to the Cost-of-Living Insights Dashboard, there is so much to see!',
      accent: '#2563eb',
      cta: 'Explore projects →',
    },
    {
      to: '/about',
      emoji: '👋',
      label: 'Learn more About Me',
      handwritten: 'say hi & get to know me!',
      description:
        'Read about my journey in CS at the University of Toronto, what drives me, and the tech stack I love working with.',
      accent: '#8b5cf6',
      cta: 'Read about me →',
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      style={{
        maxWidth: 820,
        margin: '0 auto',
        padding: '3.5rem 1.5rem 6rem',
        textAlign: 'center',
      }}
    >
      {/* Interactive "Missing Polaroid" */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2.25rem',
        }}
      >
        <motion.div
          onClick={() => setCaptionIndex(prev => (prev + 1) % FUN_CAPTIONS.length)}
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            setTilt({ x: dy * -7, y: dx * 7 });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{
            rotateZ: -3.5,
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          whileHover={{ scale: 1.04, rotateZ: -1 }}
          whileTap={{ scale: 0.96, rotateZ: 2 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          title="Click me!"
          style={{
            position: 'relative',
            background: isLight ? '#ffffff' : '#faf8f5',
            borderRadius: '6px',
            padding: '10px 10px 32px',
            boxShadow: isLight
              ? '0 18px 40px -10px rgba(0,0,0,0.18), 0 4px 12px -2px rgba(0,0,0,0.08)'
              : '0 22px 48px -10px rgba(0,0,0,0.55)',
            border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            userSelect: 'none',
            perspective: 800,
          }}
        >
          {/* Washi tape */}
          <div
            style={{
              position: 'absolute',
              top: '-13px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-3deg)',
              width: '76px',
              height: '22px',
              background: '#fbbf24',
              opacity: 0.88,
              borderRadius: '2px',
              zIndex: 3,
              boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.24) 4px, rgba(255,255,255,0.24) 5px)',
              pointerEvents: 'none',
            }}
          />

          {/* "Un-developed" polaroid frame */}
          <div
            style={{
              width: '210px',
              height: '150px',
              borderRadius: '3px',
              background: isLight
                ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                : 'linear-gradient(135deg, #09090b 0%, #1e1b4b 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontSize: '2.75rem',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: '#f8fafc',
                lineHeight: 1,
              }}
            >
              404
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#94a3b8',
                fontFamily: 'monospace',
                maxWidth: '180px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '0 0.5rem',
              }}
            >
              {location.pathname}
            </span>
          </div>

          {/* Handwritten caption */}
          <div
            style={{
              marginTop: '8px',
              fontFamily: "'Caveat', cursive, sans-serif",
              fontSize: '1.08rem',
              color: '#334155',
              fontWeight: 600,
            }}
          >
            {FUN_CAPTIONS[captionIndex]}
          </div>
        </motion.div>
      </motion.div>

      {/* Pill badge */}
      <motion.div variants={itemVariants}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.85rem',
            borderRadius: '999px',
            background: isLight ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.18)',
            color: theme.colors.accentText,
            fontSize: '0.78rem',
            fontWeight: 600,
            marginBottom: '1rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Page Not Found
        </div>
      </motion.div>

      {/* Main Heading & Copy */}
      <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.1rem)',
            margin: '0 0 0.85rem',
            color: theme.colors.textPrimary,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            textWrap: 'balance',
          }}
        >
          Nothing to see here... 👀
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.12rem)',
            color: theme.colors.textSecondary,
            margin: '0 auto',
            lineHeight: 1.7,
            maxWidth: '50ch',
            textWrap: 'pretty',
          }}
        >
          ...but you can{' '}
          <Link
            to="/about"
            style={{
              color: theme.colors.accentText,
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            learn more about me here
          </Link>{' '}
          or{' '}
          <Link
            to="/projects"
            style={{
              color: theme.colors.accentText,
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            check out some of my projects
          </Link>{' '}
          while you're here!
        </p>
      </motion.div>

      {/* Interactive Destination Cards */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gap: '1.15rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          textAlign: 'left',
          marginBottom: '2.25rem',
        }}
      >
        {destinations.map(dest => (
          <motion.div
            key={dest.to}
            whileHover={{
              y: -5,
              boxShadow: isLight
                ? '0 14px 34px -8px rgba(0,0,0,0.12)'
                : '0 14px 34px -8px rgba(0,0,0,0.5)',
            }}
            whileTap={{ scale: 0.98 }}
            style={{ borderRadius: '16px' }}
          >
            <Link
              to={dest.to}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                gap: '0.9rem',
                padding: '1.65rem',
                background: theme.gradients.panel,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '16px',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.85rem',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '13px',
                      background: isLight ? `${dest.accent}14` : `${dest.accent}24`,
                      border: `1px solid ${dest.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {dest.emoji}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive, sans-serif",
                      fontSize: '1.05rem',
                      color: theme.colors.textSecondary,
                      fontWeight: 600,
                      transform: 'rotate(-2deg)',
                    }}
                  >
                    {dest.handwritten}
                  </span>
                </div>

                <h2
                  style={{
                    margin: '0 0 0.45rem',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: theme.colors.textPrimary,
                    letterSpacing: '-0.02em',
                    textWrap: 'balance',
                  }}
                >
                  {dest.label}
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: theme.colors.textSecondary,
                    lineHeight: 1.6,
                    textWrap: 'pretty',
                  }}
                >
                  {dest.description}
                </p>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: dest.accent,
                  marginTop: '0.25rem',
                }}
              >
                {dest.cta}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary link back home */}
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.2rem',
            borderRadius: '999px',
            border: `1px solid ${theme.colors.border}`,
            background: 'transparent',
            color: theme.colors.textSecondary,
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = theme.colors.textPrimary;
            e.currentTarget.style.background = isLight
              ? 'rgba(0,0,0,0.04)'
              : 'rgba(255,255,255,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = theme.colors.textSecondary;
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← Or head back home
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default NotFound;
