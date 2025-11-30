import React, { CSSProperties } from 'react';
import { useCursorGlow } from '../../hooks/useCursorGlow';

interface CursorGlowElementProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Component that adds a subtle cursor-reactive glow effect.
 * The glow appears near the cursor when hovering over the element.
 */
export const CursorGlowElement: React.FC<CursorGlowElementProps> = ({
  children,
  glowColor = 'rgba(0, 217, 255, 0.3)',
  className,
  style,
}) => {
  const { cursor, isVisible } = useCursorGlow();
  const [isHovering, setIsHovering] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  // Calculate distance from cursor to element center
  const getGlowOpacity = () => {
    if (!isVisible || !isHovering || !elementRef.current) return 0;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = cursor.x - centerX;
    const dy = cursor.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;

    return Math.max(0, 1 - distance / maxDistance);
  };

  const glowOpacity = getGlowOpacity();

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        position: 'relative',
        ...style,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect background */}
      {glowOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: glowOpacity,
            pointerEvents: 'none',
            filter: 'blur(20px)',
            zIndex: -1,
            borderRadius: 'inherit',
          }}
        />
      )}
      {children}
    </div>
  );
};

export default CursorGlowElement;
