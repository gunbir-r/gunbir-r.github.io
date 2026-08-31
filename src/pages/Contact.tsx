import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const isLight = theme.mode === 'light';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
  };

  const contactOptions = [
    {
      platform: 'LinkedIn',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      description: "Feel free to connect and reach out — I'm always excited for a chat or any new opportunities!",
      href: 'https://www.linkedin.com/in/gunbir-reehal/',
      color: '#0a66c2',
    },
    {
      platform: 'GitHub',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      description: "Take a look at my public projects and see what I've been building.",
      href: 'https://github.com/gunbir-r',
      color: isLight ? '#24292e' : '#e6edf3',
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      style={{ maxWidth: 800, margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: isLight ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.18)',
            color: theme.colors.accentText,
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
          }}
        >
          Contact
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            margin: '0 0 0.75rem',
            color: theme.colors.textPrimary,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Let's connect
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            color: theme.colors.textSecondary,
            margin: 0,
            lineHeight: 1.65,
            maxWidth: '52ch',
          }}
        >
          Whether you want to discuss a project, collaborate, or just say hi,
        </p>
        <p
          style={{
            fontSize: '1.05rem',
            color: theme.colors.textSecondary,
            margin: 0,
            lineHeight: 1.65,
            maxWidth: '52ch',
          }}
        >
          I'd love to hear from you.
        </p>
      </motion.div>

      {/* Contact cards */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
      >
        {contactOptions.map(option => (
          <motion.a
            key={option.platform}
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, boxShadow: isLight ? '0 12px 32px -8px rgba(0,0,0,0.1)' : '0 12px 32px -8px rgba(0,0,0,0.45)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.75rem',
              background: theme.gradients.panel,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '16px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: isLight ? `${option.color}12` : `${option.color}22`,
                  border: `1px solid ${option.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: option.color,
                  flexShrink: 0,
                }}
              >
                {option.icon}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  letterSpacing: '-0.02em',
                }}
              >
                {option.platform}
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: theme.colors.textSecondary,
                lineHeight: 1.65,
              }}
            >
              {option.description}
            </p>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: option.color,
              }}
            >
              Open profile →
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        variants={itemVariants}
        style={{
          marginTop: '2.5rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          background: isLight ? 'rgba(37,99,235,0.04)' : 'rgba(37,99,235,0.08)',
          border: `1px solid ${isLight ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.2)'}`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.9rem',
            color: theme.colors.textSecondary,
            lineHeight: 1.65,
          }}
        >
          No matter which path you choose, I can't wait to connect! ✨
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
