import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';

const projectData = [
  {
    id: 'ops-hackathon',
    title: 'Cost-of-Living Insights Dashboard',
    tagline: 'Cost-of-Living Data Processing & Visualization',
    blurb:
      'Participated in the 2025 OPS Hackathon, developing an innovative data-based solution in Microsoft Fabric to help analyze and address cost-of-living challenges. Achieved third place in the Data Innovation category.',
    color: '#06b6d4',
    icon: '📈',
    year: 2025,
    role: 'Data Scientist',
  },
  {
    id: 'chronos-edge',
    title: 'Chronos Edge',
    tagline: 'Portfolio Visualization & Financial Risk Monitoring Platform',
    blurb:
      'Visualize, optimize & understand your investment landscape with real-time data, efficient frontier optimization, and market sentiment analysis.',
    color: '#3b82f6',
    icon: '📊',
    year: 2025,
    role: 'Full-Stack Developer',
  },
  {
    id: 'sokoban-led',
    title: 'LED Sokoban',
    tagline: 'Low-level Puzzle Engineering',
    blurb:
      'RISC-V assembly meets tactile logic. Simulated hardware I/O, D-Pad control, and a PRNG for procedural puzzle generation.',
    color: '#ec4899',
    icon: '🎮',
    year: 2024,
    role: 'Systems Programmer',
  },
  {
    id: 'burger-frenzy',
    title: 'Burger Frenzy Simulator',
    tagline: 'Accessible Game Design',
    blurb:
      'A JavaFX-powered game built with accessibility at its core. Playable by everyone, designed with inclusive principles from day one.',
    color: '#8b5cf6',
    icon: '🍔',
    year: 2023,
    role: 'Game Developer',
  },
];

const ImmersiveSections: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme.mode === 'light';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{ marginBottom: '3rem' }}
      >
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
          Work
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
          Projects I've built
        </h1>
      </motion.div>

      {/* Project cards */}
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        {projectData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            whileHover={{ y: -3 }}
            onClick={() => navigate(`/projects/${project.id}`)}
            style={{
              background: theme.gradients.panel,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle color accent strip on left */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '1.5rem',
                bottom: '1.5rem',
                width: '3px',
                borderRadius: '0 3px 3px 0',
                background: project.color,
                opacity: 0.7,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Role + year */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.65rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: project.color,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {project.role}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: theme.colors.textSecondary,
                      fontWeight: 500,
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    margin: '0 0 0.4rem',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: 700,
                    color: theme.colors.textPrimary,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h2>

                {/* Tagline */}
                <h3
                  style={{
                    margin: '0 0 0.9rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: theme.colors.textSecondary,
                    lineHeight: 1.4,
                  }}
                >
                  {project.tagline}
                </h3>

                {/* Blurb */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    margin: '0 0 1.25rem',
                    color: theme.colors.textSecondary,
                    maxWidth: '70ch',
                  }}
                >
                  {project.blurb}
                </p>

                {/* CTA */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: project.color,
                  }}
                >
                  View project <span>→</span>
                </span>
              </div>

              {/* Icon badge */}
              <div
                style={{
                  flexShrink: 0,
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: isLight
                    ? `${project.color}14`
                    : `${project.color}22`,
                  border: `1px solid ${project.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                }}
              >
                {project.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImmersiveSections;
