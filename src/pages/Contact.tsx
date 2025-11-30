import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../components/theme/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = usePortfolioTheme();


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }
  };

  const contactOptions = [
    {
      platform: 'LinkedIn',
      emoji: '💼',
      description: "Feel free to contact and connect with me on LinkedIn, I'm always excited for a chat or any new opportunities!",
      href: 'https://www.linkedin.com/in/gunbir-reehal/',
      color: '#00b4d8'
    },
    {
      platform: 'GitHub',
      emoji: '🐙',
      description: 'Take a look at some of my public projects!',
      href: 'https://github.com/gunbir-r',
      color: '#8b5cf6'
    }
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -50 }}
      variants={containerVariants}
      style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}
    >
      <motion.h1 
        variants={itemVariants}
        style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 3.3rem)',
          margin: '0 0 1.5rem',
          background: theme.gradients.accent,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700
        }}>
        Let's Connect! 🌟
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        style={{
          fontSize: '1.1rem',
          color: theme.colors.textSecondary,
          marginBottom: '4rem',
          maxWidth: 700,
          lineHeight: 1.6
        }}>
        I'd love to hear from you! Whether you want to discuss a project, collaborate, or just chat.
      </motion.p>

      {/* Contact Cards */}
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {contactOptions.map((option) => (
          <motion.a
            key={option.platform}
            variants={itemVariants}
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              background: theme.gradients.panel,
              border: `2px solid ${theme.colors.border}`,
              padding: '2.5rem 2rem',
              borderRadius: '32px',
              boxShadow: '0 16px 60px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
              backdropFilter: 'blur(18px) saturate(180%)',
              transition: 'all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ fontSize: '3.5rem' }}>{option.emoji}</div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.8rem', 
                fontWeight: 700,
                background: theme.gradients.accent,
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {option.platform}
              </h2>
            </div>

            {/* Description */}
            <p style={{
              margin: 0,
              fontSize: '1.05rem',
              color: theme.colors.textSecondary,
              lineHeight: 1.6
            }}>
              {option.description}
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: `linear-gradient(135deg, ${option.color}22, ${option.color}11)`,
                border: `1.5px solid ${option.color}`,
                borderRadius: '999px',
                color: theme.colors.textPrimary,
                fontWeight: 700,
                fontSize: '0.95rem',
                transition: 'all 0.3s'
              }}
            >
              <span>Let's go</span>
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* Fun Note */}
      <motion.div 
        variants={itemVariants}
        style={{
          marginTop: '4rem',
          background: `linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 128, 0.1))`,
          border: `1.5px solid ${theme.colors.border}`,
          padding: '1.75rem',
          borderRadius: '24px',
          textAlign: 'center'
        }}
      >
        <p style={{
          margin: 0,
          fontSize: '1rem',
          color: theme.colors.textSecondary,
          lineHeight: 1.6
        }}>
          ✨ No matter which path you choose, I can't wait to connect with you!
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
