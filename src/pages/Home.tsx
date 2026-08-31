import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolioTheme } from '../components/theme/ThemeContext';
import InteractivePolaroid from '../components/ui/InteractivePolaroid';

// ── Typing animation ───────────────────────────────────────
const FULL_TEXT = "Hi, I'm Gunbir 👋";

const useTypingAnimation = (text: string, speed = 60, startDelay = 400) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

// ── Photo data ─────────────────────────────────────────────
interface ScatterPhoto {
  src: string;
  alt: string;
  caption: string;
  tapeColor: string;
  rotation: number;
  tapeAngle: number;
  imageWidth: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex: number;
}

const SCATTER_PHOTOS: ScatterPhoto[] = [
  // 0: Gunbir main — largest, top-left, leans left
  {
    src: '/gunbir-photo.jpeg',
    alt: 'Gunbir',
    caption: "that's me!",
    tapeColor: '#fbbf24',
    rotation: -5,
    tapeAngle: -4,
    imageWidth: 210,
    top: '8px',
    left: '18px',
    zIndex: 5,
  },
  // 1: Montreal 1 — big, top-right, leans right
  {
    src: '/montreal-1.jpeg',
    alt: 'Montreal Aesop',
    caption: 'Montréal 🏙️',
    tapeColor: '#34d399',
    rotation: 5,
    tapeAngle: 4,
    imageWidth: 200,
    top: '22px',
    right: '14px',
    zIndex: 4,
  },
  // 2: Times Square — middle, slightly left of center, bridges the rows
  {
    src: '/times-square.jpeg',
    alt: 'Times Square NYC',
    caption: 'Times Square 🗽',
    tapeColor: '#f43f5e',
    rotation: 2,
    tapeAngle: 2,
    imageWidth: 176,
    top: '330px',
    left: '158px',
    zIndex: 6,
  },
  // 3: MTL daytime — bottom-left, leans left, overlaps slightly with Times Square corner
  {
    src: '/montreal-2.jpeg',
    alt: 'Montreal daytime',
    caption: 'MTL ☀️',
    tapeColor: '#fb923c',
    rotation: -4.5,
    tapeAngle: -3,
    imageWidth: 170,
    top: '300px',
    left: '0px',
    zIndex: 3,
  },
  // 4: St. John's 1 — middle-right, leans right
  {
    src: '/st-johns-1.jpeg',
    alt: "St. John's NL",
    caption: "St. John's 🌊",
    tapeColor: '#60a5fa',
    rotation: 4.5,
    tapeAngle: 3,
    imageWidth: 182,
    top: '290px',
    right: '8px',
    zIndex: 3,
  },
  // 5: St. John's 2 — bottom center-right, slight left tilt
  {
    src: '/st-johns-2.jpeg',
    alt: 'Newfoundland coast',
    caption: 'NL coast 🌿',
    tapeColor: '#a78bfa',
    rotation: -3,
    tapeAngle: -2,
    imageWidth: 188,
    top: '490px',
    left: '130px',
    zIndex: 4,
  },
];


// ── Lightbox ───────────────────────────────────────────────
const Lightbox: React.FC<{ photo: ScatterPhoto; onClose: () => void }> = ({ photo, onClose }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.76)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        cursor: 'zoom-out',
        padding: '1.5rem',
      }}
    >
      {/* Close button (especially handy on mobile) */}
      <button
        onClick={onClose}
        aria-label="Close photo preview"
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          width: '40px',
          height: '40px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          cursor: 'pointer',
          zIndex: 210,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        ✕
      </button>

      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', cursor: 'default', maxWidth: '100%' }}
      >
        <div style={{
          position: 'absolute', top: '-18px', left: '50%',
          transform: `translateX(-50%) rotate(${photo.tapeAngle}deg)`,
          width: '90px', height: '26px', background: photo.tapeColor,
          opacity: 0.9, borderRadius: '2px', zIndex: 3,
          boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.22) 4px, rgba(255,255,255,0.22) 5px)`,
        }} />
        <div style={{
          background: '#fff', borderRadius: '6px', padding: '12px 12px 42px',
          boxShadow: '0 40px 90px -15px rgba(0,0,0,0.6)', position: 'relative', zIndex: 1,
        }}>
          <div style={{ borderRadius: '3px', overflow: 'hidden', background: '#f1f5f9' }}>
            <img
              src={photo.src} alt={photo.alt}
              style={{ width: 'min(82vw, 460px)', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: '1.25rem', color: '#334155', fontWeight: 600 }}>
              {photo.caption}
            </span>
          </div>
        </div>
      </motion.div>
      <p style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', margin: 0,
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        click or tap anywhere or ✕ to close
      </p>
    </motion.div>
  );
};

// ── Home ───────────────────────────────────────────────────
const Home: React.FC = () => {
  const { theme } = usePortfolioTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ScatterPhoto | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const { displayed, done } = useTypingAnimation(FULL_TEXT, 58, 350);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 960);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPhoto]);

  const isLight = theme.mode === 'light';

  // Render typing heading with interactive cursive "Gunbir"
  const renderHeadingText = () => {
    const prefix = "Hi, I'm ";
    const name = "Gunbir";

    if (displayed.length <= prefix.length) {
      return displayed;
    }

    const prefixPart = displayed.slice(0, prefix.length);
    const namePart = displayed.slice(prefix.length, prefix.length + name.length);
    const suffixPart = displayed.slice(prefix.length + name.length);

    return (
      <>
        {prefixPart}
        <span
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
          onClick={() => setIsNameHovered(prev => !prev)}
          style={{
            display: 'inline-block',
            fontFamily: isNameHovered ? "'Caveat', cursive, sans-serif" : 'inherit',
            color: isNameHovered ? (isLight ? '#2563eb' : '#60a5fa') : 'inherit',
            fontSize: isNameHovered ? '1.14em' : '1em',
            fontWeight: isNameHovered ? 700 : 800,
            transform: isNameHovered ? 'rotate(-2.5deg) translateY(-2px)' : 'none',
            transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            position: 'relative',
          }}
          title="Hover or tap me!"
        >
          {namePart}
        </span>
        {suffixPart}
      </>
    );
  };

  return (
    <>
      <section style={{
        minHeight: 'calc(100vh - 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2.5rem 1.5rem 3.5rem' : '1.5rem 2.5rem',
      }}>
        <div style={{
          maxWidth: '1320px',
          width: '100%',
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: 'minmax(340px, 0.95fr) minmax(520px, 1.25fr)',
          flexDirection: isMobile ? 'column' : undefined,
          gap: isMobile ? '3rem' : '3.5rem',
          alignItems: 'center',
        }}>

          {/* ── Left: Hero content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              lineHeight: 1.08,
              margin: '0 0 1.15rem',
              color: theme.colors.textPrimary,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              minHeight: '1.1em',
            }}>
              {renderHeadingText()}
              <span style={{
                display: 'inline-block', width: '3px', height: '0.82em',
                background: theme.colors.accentText, borderRadius: '1px',
                marginLeft: '3px', verticalAlign: 'middle',
                animation: done ? 'blink 1.1s step-end infinite' : 'none',
              }} />
            </h1>

            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

            <p style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.12rem)',
              lineHeight: 1.75,
              margin: '0 0 2rem',
              color: theme.colors.textSecondary,
              maxWidth: '42ch',
            }}>
              CS student at the University of Toronto, building thoughtful software. Explore what I've made or learn a bit about me:
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/projects" style={{
                padding: '0.85rem 1.5rem', borderRadius: '10px',
                background: theme.colors.accentText, color: '#fff',
                textDecoration: 'none', fontWeight: 600, fontSize: '0.94rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                transition: 'background 0.2s', letterSpacing: '-0.01em',
                boxShadow: '0 4px 12px rgba(37,99,235,0.22)',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseLeave={e => (e.currentTarget.style.background = theme.colors.accentText)}
              >
                Explore Projects <span style={{ opacity: 0.85 }}>→</span>
              </Link>
              <Link to="/about" style={{
                padding: '0.85rem 1.5rem', borderRadius: '10px',
                background: 'transparent', border: `1.5px solid ${theme.colors.border}`,
                color: theme.colors.textPrimary, textDecoration: 'none',
                fontWeight: 600, fontSize: '0.94rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                transition: 'all 0.2s', letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                About Me <span style={{ opacity: 0.75 }}>→</span>
              </Link>
            </div>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                style={{
                  marginTop: '2.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>📌</span>
                <span
                  style={{
                    fontFamily: "'Caveat', cursive, sans-serif",
                    fontSize: '1.08rem',
                    color: theme.colors.textSecondary,
                    fontWeight: 600,
                  }}
                >
                  click any polaroid to zoom in!
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: Refrigerator / Corkboard Polaroids ── */}
          {!isMobile ? (
            <div style={{
              position: 'relative',
              height: 'clamp(730px, 86vh, 790px)',
              width: '100%',
              maxWidth: '520px',
              margin: '0 auto',
            }}>
              {SCATTER_PHOTOS.map((photo, idx) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                  onClick={() => setSelectedPhoto(photo)}
                  whileHover={{ zIndex: 30, scale: 1.05, transition: { duration: 0.2 } }}
                  style={{
                    position: 'absolute',
                    top: photo.top,
                    bottom: photo.bottom,
                    left: photo.left,
                    right: photo.right,
                    zIndex: photo.zIndex,
                    cursor: 'zoom-in',
                  }}
                >
                  <InteractivePolaroid
                    src={photo.src}
                    alt={photo.alt}
                    caption={photo.caption}
                    tapeColor={photo.tapeColor}
                    rotation={photo.rotation}
                    tapeAngle={photo.tapeAngle}
                    imageWidth={photo.imageWidth}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            // Mobile: 2-column clean responsive grid
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem',
              width: '100%',
              padding: '0.5rem 0',
            }}>
              {SCATTER_PHOTOS.map(photo => (
                <motion.div
                  key={photo.src}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <InteractivePolaroid
                    src={photo.src}
                    alt={photo.alt}
                    caption={photo.caption}
                    tapeColor={photo.tapeColor}
                    rotation={photo.rotation * 0.7}
                    tapeAngle={photo.tapeAngle}
                    imageWidth={135}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
