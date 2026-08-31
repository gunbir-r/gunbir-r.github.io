import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const About: React.FC = () => {
  const { theme } = usePortfolioTheme();

  const isLight = theme.mode === 'light';

  const traits = [
    { emoji: '🧠', title: 'Curiosity-Driven', desc: 'Always working to find ways to creatively solve problems.' },
    { emoji: '🤝', title: 'Collaborative Builder', desc: 'Thrive in dynamic teams, bringing ideas together to create impactful solutions.' },
    { emoji: '🚀', title: 'Exploring New Tech', desc: 'From Swift to React, Python to TypeScript, I am always excited to learn new things!' },
    { emoji: '❤️', title: 'Human-Centered', desc: 'Every design choice that I make puts the user experience first.' },
  ];

  const techs = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Python', icon: '🐍' },
    { name: 'Swift', icon: '🍎' },
    { name: 'C/C++', icon: '✨' },
    { name: 'Java', icon: '☕️' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
  };

  const cardStyle: React.CSSProperties = {
    background: theme.gradients.panel,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '16px',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.25s ease',
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      style={{ maxWidth: 900, margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}
    >
      {/* Page header */}
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
          About
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            margin: 0,
            color: theme.colors.textPrimary,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          A little about me
        </h1>
      </motion.div>

      {/* Bio */}
      <motion.div
        variants={itemVariants}
        style={{ ...cardStyle, padding: '2rem', marginBottom: '2rem' }}
      >
        <p style={{ margin: '0 0 1rem', color: theme.colors.textPrimary, lineHeight: 1.75, fontSize: '1rem' }}>
          I'm a Computer Science student at the University of Toronto with a passion for building software that makes a real difference. Starting with Python in tenth grade, I've grown to love the intersection of thoughtful design and clean engineering.
        </p>
        <p style={{ margin: 0, color: theme.colors.textSecondary, lineHeight: 1.75, fontSize: '1rem' }}>
          Whether it's mobile apps, web platforms, or backend systems, I believe the best solutions emerge from collaboration, curiosity, and a genuine care for the people using what you build.
        </p>
      </motion.div>

      {/* Trait cards */}
      <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: theme.colors.textPrimary,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          What drives me
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {traits.map(trait => (
            <motion.div
              key={trait.title}
              whileHover={{ y: -4, boxShadow: isLight ? '0 12px 32px -8px rgba(0,0,0,0.12)' : '0 12px 32px -8px rgba(0,0,0,0.5)' }}
              style={{
                ...cardStyle,
                padding: '1.5rem',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{trait.emoji}</div>
              <h3
                style={{
                  margin: '0 0 0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  letterSpacing: '-0.01em',
                }}
              >
                {trait.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: theme.colors.textSecondary }}>
                {trait.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: theme.colors.textPrimary,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          Tech I love
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '0.75rem',
          }}
        >
          {techs.map(tech => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.colors.textPrimary,
                cursor: 'default',
                transition: 'all 0.2s',
              }}
            >
              <span>{tech.icon}</span>
              {tech.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
