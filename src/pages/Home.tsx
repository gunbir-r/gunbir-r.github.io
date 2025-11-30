import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';
import InteractivePolaroid from '../components/ui/InteractivePolaroid';

const Home: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [mainPhoto, setMainPhoto] = useState('/gunbir-photo.jpeg');
  const [secondaryPhotos, setSecondaryPhotos] = useState([
    '/times-square.jpeg',
    '/cn-tower.jpeg'
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePhotoSwap = (clickedPhoto: string) => {
    if (!isMobile) return;
    const currentMain = mainPhoto;
    setMainPhoto(clickedPhoto);
    setSecondaryPhotos(prev => prev.map(p => p === clickedPhoto ? currentMain : p));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } 
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -40 }}
      variants={containerVariants}
      style={{
        minHeight: 'calc(100vh - 5.5rem)',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem 1.25rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated vibrant background orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.15), transparent)',
          filter: 'blur(80px)',
          top: '-30%',
          right: '-15%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        style={{
          position: 'absolute',
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12), transparent)',
          filter: 'blur(90px)',
          bottom: '-20%',
          left: '-10%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191, 64, 191, 0.1), transparent)',
          filter: 'blur(70px)',
          top: '50%',
          right: '5%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div style={{
        maxWidth: 1400,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left: Content */}
        <motion.div variants={itemVariants} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.h1 
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 3.75rem)',
              lineHeight: 1.1,
              margin: '0 0 1.5rem 0',
              color: theme.colors.textPrimary,
              fontWeight: 800,
              letterSpacing: '-0.03em'
            }}>
            Hi, I'm Gunbir! 👋
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.8,
              margin: '0 0 2rem 0',
              color: theme.colors.textPrimary,
              fontWeight: 400,
              maxWidth: 500
            }}>
            Welcome to my personal portfolio! You've got two paths ahead:
          </motion.p>

          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 500 }}>
            {[
              { 
                label: '🚀 Explore Projects', 
                href: '/projects', 
                isPrimary: true,
                description: 'Check out the work I\'ve built, from project breakdowns to video demos.'
              },
              { 
                label: '📖 Learn About Me', 
                href: '/about', 
                isPrimary: false,
                description: 'Get to know me better: my story, skills, and what drives me.'
              }
            ].map(btn => (
              <motion.div
                key={btn.label}
                whileHover={{ x: 8 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <motion.a
                  href={btn.href}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '1.1rem 1.75rem',
                    borderRadius: '14px',
                    background: btn.isPrimary ? theme.gradients.accent : `rgba(0, 245, 255, 0.08)`,
                    border: `2.5px solid ${btn.isPrimary ? 'transparent' : theme.colors.border}`,
                    color: btn.isPrimary ? '#fff' : theme.colors.textPrimary,
                    textDecoration: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .3s cubic-bezier(.22,.61,.36,1)',
                    fontSize: '1.05rem',
                    boxShadow: btn.isPrimary 
                      ? '0 12px 35px -8px rgba(0, 245, 255, 0.35), 0 0 25px rgba(255, 0, 128, 0.2)'
                      : '0 6px 20px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(12px)',
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  {btn.label}
                </motion.a>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: '0.95rem',
                    color: theme.colors.textSecondary,
                    margin: 0,
                    maxWidth: 450,
                    lineHeight: 1.5
                  }}
                >
                  {btn.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Polaroids Gallery */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Main Polaroid */}
          <motion.div 
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <InteractivePolaroid 
              src={mainPhoto} 
              alt="Main photo" 
              rotation={-12}
            />
          </motion.div>

          {/* Secondary Polaroids */}
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              width: '100%'
            }}
            layout
          >
            {secondaryPhotos.map((photo, idx) => (
              <motion.div 
                key={photo}
                style={{ 
                  transform: isMobile ? 'scale(0.7)' : 'scale(0.85)',
                  cursor: isMobile ? 'pointer' : 'grab'
                }}
                onClick={() => handlePhotoSwap(photo)}
                whileTap={isMobile ? { scale: 0.65 } : {}}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                role={isMobile ? 'button' : undefined}
                aria-label={isMobile ? `Tap to swap with main photo: ${idx === 0 ? "Times Square" : "CN Tower"}` : undefined}
                tabIndex={isMobile ? 0 : undefined}
              >
                <InteractivePolaroid 
                  src={photo} 
                  alt={idx === 0 ? "Times Square - tap to swap" : "CN Tower - tap to swap"} 
                  rotation={idx === 0 ? 8 : -6}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;
