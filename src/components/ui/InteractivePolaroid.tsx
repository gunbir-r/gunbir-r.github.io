import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioTheme } from '../../components/theme/ThemeContext';

interface InteractivePolaroidProps {
  src: string;
  alt: string;
  rotation?: number;
  caption?: string;
  tapeColor?: string;
  tapeAngle?: number;
  imageWidth?: number; // controls the image size; default 260
}

const TAPE_COLORS = ['#fbbf24', '#34d399', '#f87171', '#a78bfa', '#60a5fa'];

export const InteractivePolaroid: React.FC<InteractivePolaroidProps> = ({
  src,
  alt,
  rotation = -8,
  caption,
  tapeColor,
  tapeAngle = -3,
  imageWidth = 260,
}) => {
  const { theme } = usePortfolioTheme();
  const polaroidRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const resolvedTapeColor = tapeColor ?? TAPE_COLORS[Math.abs(rotation) % TAPE_COLORS.length];
  const isLight = theme.mode === 'light';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!polaroidRef.current) return;
    const rect = polaroidRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={polaroidRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{
        rotateZ: hovering ? rotation * 0.25 : rotation,
        y: hovering ? -14 : 0,
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      style={{ perspective: 800, cursor: 'grab', transformStyle: 'preserve-3d', display: 'inline-block' }}
    >
      {/* Washi tape strip */}
      <div
        style={{
          position: 'absolute',
          top: '-13px',
          left: '50%',
          transform: `translateX(-50%) rotate(${tapeAngle}deg)`,
          width: `${Math.max(54, Math.min(84, Math.round(imageWidth * 0.32)))}px`,
          height: '22px',
          background: resolvedTapeColor,
          opacity: 0.85,
          borderRadius: '2px',
          zIndex: 3,
          boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 4px,
            rgba(255,255,255,0.22) 4px,
            rgba(255,255,255,0.22) 5px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Polaroid frame */}
      <motion.div
        style={{
          background: isLight ? '#ffffff' : '#faf8f5',
          borderRadius: '5px',
          padding: '9px 9px 28px',
          boxShadow: hovering
            ? '0 30px 60px -12px rgba(0,0,0,0.32), 0 10px 24px -6px rgba(0,0,0,0.15)'
            : '0 14px 34px -8px rgba(0,0,0,0.2), 0 4px 12px -2px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease',
          position: 'relative',
          zIndex: 1,
          border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <div style={{
          width: `${imageWidth}px`,
          overflow: 'hidden',
          borderRadius: '2px',
          background: '#e2e8f0',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
        }}>
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
        {/* Caption area */}
        <div
          style={{
            marginTop: '4px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {caption && (
            <span
              style={{
                fontFamily: "'Caveat', cursive, sans-serif",
                fontSize: `${Math.max(0.85, Math.min(1.15, imageWidth * 0.0048))}rem`,
                color: '#475569',
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              {caption}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractivePolaroid;
