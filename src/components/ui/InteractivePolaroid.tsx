import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursorGlow } from '../../hooks/useCursorGlow';

interface InteractivePolaroidProps {
  src: string;
  alt: string;
  rotation?: number;
}

export const InteractivePolaroid: React.FC<InteractivePolaroidProps> = ({
  src,
  alt,
  rotation = -8,
}) => {
  const { cursor, isVisible } = useCursorGlow();
  const polaroidRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const calculateRotation = () => {
    if (!hovering || !isVisible || !polaroidRef.current) return rotation;

    const rect = polaroidRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = cursor.x - centerX;
    const dy = cursor.y - centerY;

    // Constrain rotation between -15 and 15 degrees
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const constrainedRotation = Math.max(-15, Math.min(15, angle / 20));

    return rotation + constrainedRotation;
  };

  return (
    <motion.div
      ref={polaroidRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      animate={{
        rotateZ: calculateRotation(),
        y: hovering ? -20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      style={{
        perspective: 1000,
        cursor: 'grab',
      }}
    >
      <motion.div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: hovering
            ? '0 30px 60px -10px rgba(0, 245, 255, 0.4), 0 0 40px rgba(255, 0, 128, 0.3)'
            : '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          transition: 'box-shadow 0.3s ease',
        }}
        whileHover={{
          scale: 1.05,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '4px',
            display: 'block',
            maxWidth: '280px',
          }}
        />
        <div
          style={{
            marginTop: '12px',
            height: '30px',
            background: 'linear-gradient(to right, rgba(0, 245, 255, 0.1), rgba(255, 0, 128, 0.1), rgba(191, 64, 191, 0.1))',
            borderRadius: '3px',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default InteractivePolaroid;
