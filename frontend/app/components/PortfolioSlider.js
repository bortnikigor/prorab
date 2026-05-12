'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: 'TRUSDO',
    category: 'Brand Identity & Web Design',
    caption: 'We are a design company, providing product customization, starting from your needs — your support is our constant driving force.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    id: 2,
    title: 'MEDTECH',
    category: 'UX/UI & Product Design',
    caption: 'Innovative medical device interface — simplicity meets precision. Every touchpoint designed with care for the person on the other side.',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
  },
  {
    id: 3,
    title: 'CREATE',
    category: 'Digital Experience',
    caption: 'A bold digital platform for creative professionals — fast, immersive, and built to inspire the next generation of makers.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  },
  {
    id: 4,
    title: 'INTERIORS',
    category: 'Interior Design & Renovation',
    caption: 'Premium residential renovation — from concept to completion. Spaces crafted around the people who inhabit them.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 5,
    title: 'KOMFORT',
    category: 'Commercial Renovation',
    caption: 'Commercial spaces reimagined. Minimal downtime, maximum impact — delivering results that drive your business forward.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  },
];

const N = projects.length;
const mod = (i) => ((i % N) + N) % N;
const POSITIONS = ['far_left', 'left', 'center', 'right', 'far_right'];

const CARD_RADIUS = '4px';

export default function PortfolioSlider() {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchX = useRef(null);
  const captionRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const go = useCallback((dir) => {
    if (busy) return;
    setBusy(true);
    setActive((prev) => mod(prev + dir));
    setTimeout(() => setBusy(false), 650);
  }, [busy]);

  const startAutoplay = useCallback(() => {
    intervalRef.current = setInterval(() => go(1), 3600);
  }, [go]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  // Fade caption on change
  useEffect(() => {
    if (captionRef.current) {
      captionRef.current.style.opacity = '0';
      const t = setTimeout(() => {
        if (captionRef.current) captionRef.current.style.opacity = '1';
      }, 250);
      return () => clearTimeout(t);
    }
  }, [active]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1);
    touchX.current = null;
  };

  const getSlideStyle = (delta) => {
    const absPos = Math.abs(delta);
    const isCenter = delta === 0;

    if (isMobile) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '85vw',
        height: '65vw',
        transform: 'translate(-50%, -50%)',
        opacity: isCenter ? 1 : 0,
        filter: 'brightness(1)',
        zIndex: isCenter ? 10 : 0,
        pointerEvents: isCenter ? 'auto' : 'none',
        cursor: 'default',
        borderRadius: CARD_RADIUS,
        overflow: 'hidden',
        transition: 'opacity 0.55s ease',
        willChange: 'opacity',
      };
    }

    const isVisible = absPos <= 1;

    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: isCenter ? '340px' : '240px',
      height: isCenter ? '380px' : '290px',
      transform: `translate(-50%, -50%) translateX(${delta * 310}px)`,
      opacity: isVisible ? 1 : 0,
      filter: isCenter ? 'brightness(1)' : 'brightness(0.55)',
      zIndex: 10 - absPos,
      pointerEvents: isVisible ? 'auto' : 'none',
      cursor: isCenter ? 'default' : 'pointer',
      borderRadius: CARD_RADIUS,
      overflow: 'hidden',
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s ease, filter 0.55s ease, width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, opacity, filter, width, height',
    };
  };

  const slides = POSITIONS.map((pos, offset) => {
    const delta = offset - 2;
    const idx = mod(active + delta);
    return { pos, idx, project: projects[idx], delta };
  });

  return (
    <section
      className="ps-section"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="ps-wrapper" style={{ position: 'relative' }}>

        <div className="ps-track">
          {slides.map(({ pos, project, delta }) => (
            <div
              key={pos}
              style={getSlideStyle(delta)}
              onClick={() => {
                if (delta < 0 && !busy) go(-1);
                if (delta > 0 && !busy) go(1);
              }}
            >
              {/* Browser mock bar */}
              <div style={{
                height: '28px',
                background: 'rgba(30,30,30,0.9)',
                borderRadius: `${CARD_RADIUS} ${CARD_RADIUS} 0 0`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
                gap: '5px',
                flexShrink: 0,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              </div>
              {/* Project image */}
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: 'calc(100% - 28px)', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* Caption overlay */}
        <div className="ps-caption">
          <p ref={captionRef} style={{ margin: 0, transition: 'opacity 0.35s ease' }}>
            {projects[active].caption}
          </p>
        </div>

      </div>

      <style>{`
        .ps-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-image: url('/bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: visible;
          user-select: none;
        }

        .ps-wrapper {
          width: 900px;
          max-width: 96vw;
          margin: 0 auto;
        }

        .ps-track {
          position: relative;
          width: 100%;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ps-caption {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          background: rgba(12, 14, 16, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1rem 2rem;
          text-align: center;
          color: #CFC7BD;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.07em;
          font-weight: 300;
          line-height: 1.7;
          z-index: 20;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .ps-wrapper { width: 85vw; }
          .ps-track { height: 65vw; }
          .ps-caption { width: 85vw; }
        }
      `}</style>
    </section>
  );
}
