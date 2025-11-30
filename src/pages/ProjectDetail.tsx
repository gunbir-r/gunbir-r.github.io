import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const projectDetails: Record<string, any> = {
  'chronos-edge': {
    title: 'Chronos Edge',
    tagline: 'Portfolio Visualization & Financial Risk Monitoring Platform',
    hero: '📊',
    description: 'A comprehensive portfolio visualization and financial risk monitoring platform designed for informed investors.',
    features: ['Live Portfolio Visualization', 'Efficient Frontier Optimization', 'Real-time Sentiment Analysis', 'Risk Metrics Dashboard'],
    tech: ['React', 'TypeScript'],
    impact: 'Worked in a 6-person team to deliver a product that bridges professional financial tools and retail investors.',
    media: 'https://www.youtube.com/embed/DSgS60BN1jo?si=hVpc4FdVG36S0Uxb',
    githubUrl: null
  },
  'ops-hackathon': {
    title: 'Cost-of-Living Insights Dashboard',
    tagline: 'Data Science using Microsoft Fabric',
    hero: '📈',
    description: 'An innovative Power BI dashboard developed during the 2025 OPS Hackathon to analyze and address cost-of-living challenges using Microsoft Fabric.',
    features: ['Real-time Data Analysis', 'Interactive Visualizations', 'Data Comparison Tools', 'User-Friendly Interface'],
    tech: ['Microsoft Fabric', 'Power BI', 'AI Agents'],
    impact: 'Developed a data-driven solution judged by OPS and Microsoft experts, enhancing skills in data science and visualization.',
    media: "https://www.youtube.com/embed/lVERy2Mm60w?si=lU-UJFm1mPB2n5hp",
    githubUrl: null
  },
  'burger-frenzy': {
    title: 'Burger Frenzy Simulator',
    tagline: 'Accessible Game Design',
    hero: '🍔',
    description: 'A JavaFX-based restaurant simulator built with accessibility at its core.',
    features: ['Inclusive UI/UX', 'Agile Development Process', 'User Story-Driven', 'Accessibility Consultancy'],
    tech: ['Java', 'JavaFX', 'Git', 'UML Diagrams'],
    impact: 'Worked in a team of 5-person team and prioritized accessibility from day one, working directly with an accessibility consultant.',
    media: '/burger-img.png',
    githubUrl: 'https://github.com/gunbir-r/BurgerFrenzySimulator'
  },
  'sokoban-led': {
    title: 'LED Sokoban',
    tagline: 'Low-Level Puzzle Engineering',
    hero: '🎮',
    description: 'A Sokoban-based puzzle game developed in RISC-V assembly with simulated hardware I/O.',
    features: ['D-Pad & LED Integration', 'Pseudo-Random Generation', 'Comprehensive Docs', 'Multiplayer Support'],
    tech: ['RISC-V Assembly', 'Linux', 'Hardware Simulation'],
    impact: 'Mastered low-level programming and hardware abstractions in a simulated environment.',
    media: 'https://www.youtube.com/embed/HBU1ECjZwcE?si=8H7iM3XgiE6b3WiH',
    githubUrl: null
    }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = usePortfolioTheme();
  const project = projectDetails[id || 'chronos-edge'];

  if (!project) {
    return (
      <motion.div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1>Project not found</h1>
        <button onClick={() => navigate('/projects')} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>
          Back to Projects
        </button>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -50 }}
      variants={containerVariants}
      style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}
    >
      {/* Back button */}
      <motion.button
        onClick={() => navigate('/projects')}
        whileHover={{ x: -4 }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1rem',
          color: theme.colors.textSecondary,
          cursor: 'pointer',
          marginBottom: '2rem',
          fontWeight: 600,
          transition: 'color .3s'
        }}
      >
        ← Back
      </motion.button>

      {/* Hero section */}
      <motion.div 
        variants={itemVariants}
        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}
      >
        <div style={{ fontSize: '4rem' }}>{project.hero}</div>
        <div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
            margin: 0,
            background: theme.gradients.accent,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 700
          }}>
            {project.title}
          </h1>
          <p style={{ margin: '0.5rem 0 0', fontSize: '1.1rem', color: theme.colors.textSecondary }}>
            {project.tagline}
          </p>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {/* Description */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: theme.gradients.panel,
            border: `2px solid ${theme.colors.border}`,
            padding: '2rem',
            borderRadius: '32px',
            boxShadow: '0 12px 50px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(18px) saturate(180%)'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Overview</h2>
          <p style={{ lineHeight: 1.7, color: theme.colors.textSecondary }}>
            {project.description}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: theme.gradients.panel,
            border: `2px solid ${theme.colors.border}`,
            padding: '2rem',
            borderRadius: '32px',
            boxShadow: '0 12px 50px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(18px) saturate(180%)'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Key Features</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.features.map((feature: string) => (
              <motion.li
                key={feature}
                whileHover={{ x: 8 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: theme.colors.textSecondary,
                  transition: 'all .3s'
                }}
              >
                <span style={{ fontSize: '1.2rem', color: theme.colors.focus }}>→</span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Media Section (Video or Image) */}
      {project.media && (
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '2rem',
            background: theme.gradients.panel,
            border: `2px solid ${theme.colors.border}`,
            padding: '2rem',
            borderRadius: '32px',
            boxShadow: '0 12px 50px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(18px) saturate(180%)',
            overflow: 'hidden'
          }}
        >
          {/* Auto-detect: YouTube URL = video, otherwise = image */}
          {project.media.includes('youtube.com') || project.media.includes('youtu.be') ? (
            <>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Video Demo</h2>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '16px',
                  transition: 'all .3s'
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '16px'
                  }}
                  src={project.media}
                  title="Project video demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </motion.div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Project Showcase</h2>
              <motion.img
                whileHover={{ scale: 1.02 }}
                src={project.media}
                alt="Project showcase"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  display: 'block',
                  transition: 'all .3s'
                }}
              />
            </>
          )}
        </motion.div>
      )}

      {/* Tech Stack */}
      <motion.div 
        variants={itemVariants}
        style={{
          marginTop: '2rem',
          background: theme.gradients.panel,
          border: `2px solid ${theme.colors.border}`,
          padding: '2rem',
          borderRadius: '32px',
          boxShadow: '0 12px 50px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(18px) saturate(180%)'
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Tech Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {project.tech.map((t: string) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '0.65rem 1rem',
                background: `linear-gradient(135deg, ${theme.colors.bgElevated}, rgba(255,255,255,0.06))`,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: theme.colors.textSecondary,
                cursor: 'default',
                transition: 'all .3s'
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* GitHub Link */}
     { project.githubUrl && (
        <motion.a
          variants={itemVariants}
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.75rem',
            background: theme.gradients.accent,
            border: `2px solid ${theme.colors.border}`,
            borderRadius: '999px',
            color: theme.colors.textPrimary,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 30px -8px rgba(0, 245, 255, 0.25)',
            transition: 'all 0.3s',
            backdropFilter: 'blur(12px)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.9 }}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </motion.a>
      )}

      {/* Impact */}
      <motion.div 
        variants={itemVariants}
        style={{
          marginTop: '2rem',
          background: `linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))`,
          border: `2px solid ${theme.colors.border}`,
          padding: '2rem',
          borderRadius: '32px',
          boxShadow: '0 12px 50px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(18px) saturate(180%)'
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Impact & Learnings</h2>
        <p style={{ lineHeight: 1.7, margin: 0, color: theme.colors.textSecondary }}>
          💡 {project.impact}
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ProjectDetail;
