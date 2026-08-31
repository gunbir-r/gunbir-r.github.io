import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const projectDetails: Record<string, any> = {
  'chronos-edge': {
    title: 'Chronos Edge',
    tagline: 'Portfolio Visualization & Financial Risk Monitoring Platform',
    hero: '📊',
    color: '#3b82f6',
    description:
      'A comprehensive portfolio visualization and financial risk monitoring platform designed for informed investors.',
    features: [
      'Live Portfolio Visualization',
      'Efficient Frontier Optimization',
      'Real-time Sentiment Analysis',
      'Risk Metrics Dashboard',
    ],
    tech: ['React', 'TypeScript'],
    impact:
      'Worked in a 6-person team to deliver a product that bridges professional financial tools and retail investors.',
    media: 'https://www.youtube.com/embed/DSgS60BN1jo?si=hVpc4FdVG36S0Uxb',
    githubUrl: null,
  },
  'ops-hackathon': {
    title: 'Cost-of-Living Insights Dashboard',
    tagline: 'Data Analysis using Microsoft Fabric',
    hero: '📈',
    color: '#06b6d4',
    description:
      'An innovative Power BI dashboard developed during the 2025 OPS Hackathon to analyze and address cost-of-living challenges using Microsoft Fabric. Used Jupyter Notebooks and Apache Spark for data processing and Power BI for data visualization.',
    features: [
      'Real-time Data Analysis',
      'Interactive Visualizations',
      'Data Comparison Tools',
      'User-Friendly Interface',
    ],
    tech: ['Microsoft Fabric', 'Power BI', 'Python', 'Jupyter Notebooks', 'Apache Spark'],
    impact:
      'Developed a data-driven solution judged by OPS and Microsoft experts, achieving third place in the Data Innovation category. Enhanced skills in data processing and visualization.',
    media: 'https://www.youtube.com/embed/lVERy2Mm60w?si=lU-UJFm1mPB2n5hp',
    certificate: '/ops-hackathon-third.jpeg',
    teamPhoto: '/ops-hackathon-team.jpeg',
    githubUrl: null,
  },
  'burger-frenzy': {
    title: 'Burger Frenzy Simulator',
    tagline: 'Accessible Game Design',
    hero: '🍔',
    color: '#8b5cf6',
    description: 'A JavaFX-based restaurant simulator built with accessibility at its core.',
    features: [
      'Inclusive UI/UX',
      'Agile Development Process',
      'User Story-Driven',
      'Accessibility Consultancy',
    ],
    tech: ['Java', 'JavaFX', 'Git', 'UML Diagrams'],
    impact:
      'Worked in a team of 5 and prioritized accessibility from day one, working directly with an accessibility consultant.',
    media: '/burger-img.png',
    githubUrl: 'https://github.com/gunbir-r/BurgerFrenzySimulator',
  },
  'sokoban-led': {
    title: 'LED Sokoban',
    tagline: 'Low-Level Puzzle Engineering',
    hero: '🎮',
    color: '#ec4899',
    description:
      'A Sokoban-based puzzle game developed in RISC-V assembly with simulated hardware I/O.',
    features: ['D-Pad & LED Integration', 'Pseudo-Random Generation', 'Comprehensive Documentation'],
    tech: ['RISC-V Assembly', 'Linux', 'Hardware Simulation'],
    impact: 'Mastered low-level programming and hardware abstractions in a simulated environment.',
    media: 'https://www.youtube.com/embed/HBU1ECjZwcE?si=8H7iM3XgiE6b3WiH',
    githubUrl: null,
  },
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = usePortfolioTheme();
  const project = projectDetails[id || 'chronos-edge'];
  const isLight = theme.mode === 'light';

  if (!project) {
    return (
      <motion.div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: theme.colors.textPrimary }}>
        <h1>Project not found</h1>
        <button
          onClick={() => navigate('/projects')}
          style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
        >
          Back to Projects
        </button>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const panelStyle: React.CSSProperties = {
    background: theme.gradients.panel,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '16px',
    padding: '1.75rem',
    backdropFilter: 'blur(8px)',
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}
    >
      {/* Back button */}
      <motion.button
        variants={itemVariants}
        onClick={() => navigate('/projects')}
        whileHover={{ x: -3 }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '0.9rem',
          color: theme.colors.textSecondary,
          cursor: 'pointer',
          marginBottom: '2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: 0,
          transition: 'color 0.2s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = theme.colors.textPrimary)}
        onMouseLeave={e => (e.currentTarget.style.color = theme.colors.textSecondary)}
      >
        ← Back to Projects
      </motion.button>

      {/* Hero */}
      <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' as const }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: isLight ? `${project.color}14` : `${project.color}22`,
              border: `1px solid ${project.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              flexShrink: 0,
            }}
          >
            {project.hero}
          </div>
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                margin: '0 0 0.35rem',
                color: theme.colors.textPrimary,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', color: theme.colors.textSecondary, lineHeight: 1.5 }}>
              {project.tagline}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', marginBottom: '1rem' }}>
        {/* Overview */}
        <motion.div variants={itemVariants} style={panelStyle}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 0.85rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
            Overview
          </h2>
          <p style={{ lineHeight: 1.75, color: theme.colors.textPrimary, margin: 0, fontSize: '0.95rem' }}>
            {project.description}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} style={panelStyle}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 0.85rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
            Key Features
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {project.features.map((f: string) => (
              <li
                key={f}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: theme.colors.textPrimary, lineHeight: 1.5 }}
              >
                <span style={{ color: project.color, marginTop: '2px', flexShrink: 0 }}>→</span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Media */}
      {project.media && (
        <motion.div variants={itemVariants} style={{ ...panelStyle, marginBottom: '1rem' }}>
          {project.media.includes('youtube.com') || project.media.includes('youtu.be') ? (
            <>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Video Demo
              </h2>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  height: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
                  src={project.media}
                  title="Project video demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Project Showcase
              </h2>
              <img
                src={project.media}
                alt="Project showcase"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
              />
            </>
          )}
        </motion.div>
      )}

      {/* Tech Stack */}
      <motion.div variants={itemVariants} style={{ ...panelStyle, marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
          Tech Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.6rem' }}>
          {project.tech.map((t: string) => (
            <span
              key={t}
              style={{
                padding: '0.4rem 0.9rem',
                background: isLight ? `${project.color}0f` : `${project.color}18`,
                border: `1px solid ${project.color}30`,
                borderRadius: '999px',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: project.color,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* GitHub */}
      {project.githubUrl && (
        <motion.div variants={itemVariants} style={{ marginBottom: '1rem' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.4rem',
              background: isLight ? '#0f172a' : '#fafafa',
              borderRadius: '10px',
              color: isLight ? '#fff' : '#0f172a',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </motion.div>
      )}

      {/* Impact */}
      <motion.div variants={itemVariants} style={{ ...panelStyle, marginBottom: '1rem', borderLeft: `3px solid ${project.color}` }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 0.75rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
          Impact & Learnings
        </h2>
        <p style={{ lineHeight: 1.75, margin: 0, color: theme.colors.textPrimary, fontSize: '0.95rem' }}>
          {project.impact}
        </p>
      </motion.div>

      {/* Certificate */}
      {project.certificate && (
        <motion.div variants={itemVariants} style={{ ...panelStyle, marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
            🏆 Achievement Certificate
          </h2>
          <img
            src={project.certificate}
            alt="Third Place Certificate - OPS Hackathon"
            style={{ width: '100%', maxWidth: '560px', height: 'auto', borderRadius: '10px', display: 'block', margin: '0 auto' }}
          />
        </motion.div>
      )}

      {/* Team Photo */}
      {project.teamPhoto && (
        <motion.div variants={itemVariants} style={panelStyle}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.textSecondary, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
            Team Photo
          </h2>
          <img
            src={project.teamPhoto}
            alt="Team Photo"
            style={{ width: '100%', maxWidth: '560px', height: 'auto', borderRadius: '10px', display: 'block', margin: '0 auto' }}
          />
        </motion.div>
      )}
    </motion.section>
  );
};

export default ProjectDetail;
