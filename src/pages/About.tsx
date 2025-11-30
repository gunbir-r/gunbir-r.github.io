import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const About: React.FC = () => {
  const { theme } = usePortfolioTheme();

  const traits = [
    { emoji: '🧠', title: 'Curiosity-Driven', desc: 'Always exploring new tech and paradigms to solve problems creatively.' },
    { emoji: '🤝', title: 'Collaborative Builder', desc: 'Thrive in dynamic teams, bringing ideas together to ship impact.' },
    { emoji: '🚀', title: 'Exploring New Tech', desc: 'From Swift to React, Python to TypeScript—lifelong learner.' },
    { emoji: '❤️', title: 'Human-Centered', desc: 'Every design choice puts the user experience first.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.92 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -40 }}
      variants={containerVariants}
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '3rem 1.75rem 6rem',
        position: 'relative'
      }}
    >
      {/* Gradient accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '4rem',
          left: 0,
          width: 80,
          height: 4,
          background: theme.gradients.accent,
          borderRadius: '999px',
          transformOrigin: 'left'
        }}
      />

      <motion.h1 
        variants={itemVariants}
        style={{
          fontSize: 'clamp(2.25rem, 5.5vw, 3.5rem)',
          margin: '0 0 3rem',
          background: theme.gradients.accent,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700
        }}>
        About Me
      </motion.h1>

      {/* Bio section */}
      <motion.div 
        variants={itemVariants}
        style={{
          background: theme.gradients.panel,
          border: `2px solid ${theme.colors.border}`,
          padding: '2.5rem 2rem',
          borderRadius: '32px',
          boxShadow: '0 12px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(18px) saturate(180%)',
          marginBottom: '3.5rem',
          lineHeight: 1.7,
          fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)'
        }}>
        <p style={{ margin: '0 0 1rem', color: theme.colors.textSecondary }}>
          I'm a Computer Science student at the University of Toronto with a passion for building software that makes a real difference. Starting with Python in tenth grade, I've grown to love the intersection of thoughtful design and clean engineering.
        </p>
        <p style={{ margin: 0, color: theme.colors.textSecondary }}>
          Whether it's mobile apps, web platforms, or backend systems, I believe the best solutions emerge from collaboration, curiosity, and a genuine care for the people using what you build.
        </p>
      </motion.div>

      {/* Personality trait cards */}
      <div style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        marginBottom: '4rem'
      }}>
        {traits.map((trait, idx) => (
          <motion.div
            key={trait.title}
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: `0 16px 50px -8px rgba(6, 182, 212, 0.3)` }}
            style={{
              background: theme.gradients.panel,
              border: `2px solid ${theme.colors.border}`,
              padding: '1.75rem 1.5rem',
              borderRadius: '28px',
              boxShadow: '0 8px 32px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px) saturate(170%)',
              transition: 'all .35s cubic-bezier(.22,.61,.36,1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: theme.gradients.accent,
                pointerEvents: 'none'
              }}
            />
            <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{trait.emoji}</div>
            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.15rem', fontWeight: 700, color: theme.colors.textPrimary }}>
              {trait.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: theme.colors.textSecondary }}>
              {trait.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tech stack section */}
      <motion.div variants={itemVariants}>
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          background: theme.gradients.accent,
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          Tech I Love
        </h2>
        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))'
        }}>
          {[
            { name: 'React', icon: '⚛️' },
            { name: 'TypeScript', icon: '🔷' },
            { name: 'Python', icon: '🐍' },
            { name: 'Swift', icon: '🍎' },
            { name: 'C/C++', icon: '✨' },
            { name: 'Java', icon: '☕️' },
          ].map(tech => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.94 }}
              style={{
                padding: '1rem 0.75rem',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${theme.colors.bgElevated}, rgba(255,255,255,0.04))`,
                border: `1.5px solid ${theme.colors.border}`,
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .3s'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{tech.icon}</div>
              {tech.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
