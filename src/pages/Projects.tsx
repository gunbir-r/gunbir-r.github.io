import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';
import ImmersiveSections from '../components/projects/ImmersiveSections';

const Projects: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: theme.gradients.background,
        filter: 'brightness(1)',
      }} />
      <ImmersiveSections />
    </div>
  );
};

export default Projects;
