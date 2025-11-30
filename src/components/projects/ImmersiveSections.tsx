import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { usePortfolioTheme } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';

const projectData = [
  {
    id: 'chronos-edge',
    title: 'Chronos Edge',
    tagline: 'Portfolio Visualization & Financial Risk Monitoring Platform',
    blurb: 'Visualize, optimize & understand your investment landscape with real-time data, efficient frontier optimization, and market sentiment analysis.',
    color: '#3b82f6',
    icon: '📊',
    year: 2025,
    role: 'Full-Stack Developer'
  },
  {
    id: 'ops-hackathon',
    title: 'Cost-of-Living Insights Hub',
    tagline: 'Cost-of-Living Data Analysis',
    blurb: 'Participated in the 2025 OPS Hackathon, developing innovative data-based solution in Microsoft Fabric to help analyze and address cost-of-living challenges. Judged by a team of OPS and Microsoft experts.',
    color: '#06b6d4',
    icon: '📈',
    year: 2025,
    role: 'Data Science'
  },
  {
    id: 'burger-frenzy',
    title: 'Burger Frenzy Simulator',
    tagline: 'Accessible Game Design',
    blurb: 'A JavaFX-powered game built with accessibility at its core—playable by everyone, designed with inclusive principles from day one.',
    color: '#8b5cf6',
    icon: '🍔',
    year: 2024,
    role: 'Game Developer'
  },
  {
    id: 'sokoban-led',
    title: 'LED Sokoban',
    tagline: 'Low-level Puzzle Engineering',
    blurb: 'RISC-V assembly meets tactile logic—simulated hardware I/O, D-Pad control, and a PRNG for procedural puzzle generation.',
    color: '#ec4899',
    icon: '🎮',
    year: 2024,
    role: 'Systems Programmer'
  }
];

const ImmersiveSections: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: false, amount: 0.1 }}
      style={{ position: 'relative' }}
    >
      {projectData.map((project, idx) => {
        return (
          <section
            key={project.id}
            style={{
              minHeight: 'auto',
              display: 'grid',
              placeItems: 'center',
              padding: '4rem 1.5rem',
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Animated gradient accent blob per project */}
            <motion.div
              animate={{
                x: [0, 40, -20, 0],
                y: [0, -30, 40, 0],
                scale: [1, 1.1, 0.95, 1]
              }}
              transition={{ duration: 12 + idx, repeat: Infinity }}
              style={{
                position: 'absolute',
                width: 350,
                height: 350,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${project.color}20, transparent)`,
                filter: 'blur(80px)',
                top: '10%',
                right: '-5%',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            <motion.div
              variants={itemVariants}
              style={{
                width: 'min(960px, calc(100% - 2rem))',
                maxWidth: '100%',
                background: theme.gradients.panel,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '40px',
                padding: 'clamp(1.5rem, 5vw, 3.5rem)',
                boxShadow: '0 20px 70px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                position: 'relative',
                zIndex: 1,
                boxSizing: 'border-box'
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 0.67, 0.43, 0.99] }}
            >
              {/* Project index badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '2rem',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '2rem',
                  boxShadow: `0 8px 30px ${project.color}40`,
                  zIndex: 10
                }}
              >
                {project.icon}
              </motion.div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1, delay: idx * 0.15 }}
                  style={{
                    width: 60,
                    height: 3,
                    background: project.color,
                    borderRadius: '999px',
                    transformOrigin: 'left'
                  }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: project.color, letterSpacing: '1px' }}>
                  {project.role}
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  background: `linear-gradient(135deg, ${project.color}, ${theme.gradients.accent})`,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}
              >
                {project.title}
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  margin: '0 0 1.25rem',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.65rem)',
                  fontWeight: 600,
                  color: project.color,
                  opacity: 0.9
                }}
              >
                {project.tagline}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                  lineHeight: 1.65,
                  margin: 0,
                  color: theme.colors.textSecondary,
                  maxWidth: '85%',
                  marginBottom: '1.5rem'
                }}
              >
                {project.blurb}
              </motion.p>

              {/* Clickable CTA Button */}
              <motion.button
                onClick={() => navigate(`/projects/${project.id}`)}
                whileHover={{ scale: 1.05, gap: '1rem' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  border: `2px solid ${project.color}`,
                  color: project.color,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: `${project.color}10`,
                  transition: 'all .35s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'inherit',
                  marginTop: '1.5rem'
                }}
              >
                View Full Project <span style={{ fontSize: '1rem' }}>→</span>
              </motion.button>
            </motion.div>
          </section>
        );
      })}
    </motion.div>
  );
};

export default ImmersiveSections;
