import { useState, useEffect, useRef } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorGlow = () => {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smooth, performant updates
      animationFrameRef.current = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { cursor, isVisible };
};
