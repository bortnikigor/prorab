'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// ─── ДАНІ ПРОЕКТІВ ───────────────────────────────────────────────────────────
// Замініть `bg` на реальні шляхи до зображень коли вони будуть готові
// Наприклад: image: '/images/trusdo.jpg'
const projects = [
  {
    id: 1,
    title: 'TRUSDO',
    category: 'Brand Identity & Web Design',
    caption: 'We are a design company, providing product customization, starting from your needs — your support is our constant driving force.',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 2,
    title: 'MEDTECH',
    category: 'UX/UI & Product Design',
    caption: 'Innovative medical device interface — simplicity meets precision. Every touchpoint designed with care for the person on the other side.',
    bg: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
  },
  {
    id: 3,
    title: 'CREATE',
    category: 'Digital Experience',
    caption: 'A bold digital platform for creative professionals — fast, immersive, and built to inspire the next generation of makers.',
    bg: 'linear-gradient(135deg, #111820 0%, #1a2a3a 50%, #243040 100%)',
  },
  {
    id: 4,
    title: 'INTERIORS',
    category: 'Interior Design & Renovation',
    caption: 'Premium residential renovation — from concept to completion. Spaces crafted around the people who inhabit them.',
    bg: 'linear-gradient(135deg, #1c1410 0%, #2a1f18 50%, #3a2a20 100%)',
  },
  {
    id: 5,
    title: 'KOMFORT',
    category: 'Commercial Renovation',
    caption: 'Commercial spaces reimagined. Minimal downtime, maximum impact — delivering results that drive your business forward.',
    bg: 'linear-gradient(135deg, #0f1a1a 0%, #162525 50%, #1e3030 100%)',
  },
];

const N = projects.length;
const mod = (i) => ((i % N) + N) % N;

// Позиції слайдера: far-left, left, center, right, far-right
const POSITIONS = ['far_left', 'left', 'center', 'right', 'far_right'];

export default function PortfolioSlider() {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const touchX = useRef(null);
  const captionRef = useRef(null);

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

  const go = useCallback((dir) => {
    if (busy) return;
    setBusy(true);
    setActive((prev) => mod(prev + dir));
    setTimeout(() => setBusy(false), 550);
  }, [busy]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1);
    touchX.current = null;
  };

  // Будуємо масив з 5 слайдів навколо активного
  const slides = POSITIONS.map((pos, offset) => {
    const delta = offset - 2; // -2, -1, 0, 1, 2
    const idx = mod(active + delta);
    return { pos, idx, project: projects[idx] };
  });

  return (
    <section
      className="ps-section"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── СЛАЙДЕР ─────────────────────────────────────── */}
      <div className="ps-track">
        {slides.map(({ pos, idx, project }) => {
          const isLeft  = pos === 'left'     || pos === 'far_left';
          const isRight = pos === 'right'    || pos === 'far_right';
          const isCenter = pos === 'center';

          return (
            <div
              key={`${pos}`}
              className={`ps-slide ps-slide--${pos}`}
              onClick={() => {
                if (isLeft && !busy)  go(-1);
                if (isRight && !busy) go(1);
              }}
            >
              <div className="ps-slide-inner">
                <img
                  src="https://res.cloudinary.com/dpcqf9y8l/image/upload/v1778308458/1_7a0af14597.jpg"
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ПІДПИС ──────────────────────────────────────── */}
      <div className="ps-caption-wrap">
        <div className="ps-caption-bar">
          <p
            ref={captionRef}
            className="ps-caption-text"
            style={{ transition: 'opacity 0.35s ease' }}
          >
            {projects[active].caption}
          </p>
        </div>
      </div>

      {/* ── СТРІЛКИ ─────────────────────────────────────── */}
      <button className="ps-arrow ps-arrow--left"  onClick={() => go(-1)} aria-label="Попередній">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button className="ps-arrow ps-arrow--right" onClick={() => go(1)}  aria-label="Наступний">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* ── ТОЧКИ ───────────────────────────────────────── */}
      <div className="ps-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`ps-dot${i === active ? ' ps-dot--on' : ''}`}
            onClick={() => { if (i !== active && !busy) { setBusy(true); setActive(i); setTimeout(() => setBusy(false), 550); } }}
            aria-label={`Проект ${i + 1}`}
          />
        ))}
      </div>

      {/* ══ СТИЛІ ══════════════════════════════════════════════════════════ */}
      <style>{`
        .ps-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding-top: 0;
          padding-bottom: 0;
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

        /* ── TRACK ── */
        .ps-track {
          position: relative;
          width: 100%;
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── БАЗОВИЙ СЛАЙД ── */
        .ps-slide {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center center;
          transition:
            transform 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            opacity   0.55s cubic-bezier(0.4, 0, 0.2, 1),
            filter    0.55s cubic-bezier(0.4, 0, 0.2, 1),
            width     0.55s cubic-bezier(0.4, 0, 0.2, 1),
            height    0.55s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity, filter;
        }

        /* ── ПОЗИЦІЇ ── */
        .ps-slide--center {
          width: 32vw; height: 56vh;
          transform: translate(-50%, -50%) translateX(0) scale(1);
          opacity: 1;
          filter: brightness(1);
          z-index: 10;
          cursor: default;
        }
        .ps-slide--left {
          width: 24vw; height: 51vh;
          transform: translate(-50%, -50%) translateX(-26vw) scale(0.9);
          opacity: 0.65;
          filter: brightness(0.7);
          z-index: 5;
          cursor: pointer;
        }
        .ps-slide--right {
          width: 24vw; height: 51vh;
          transform: translate(-50%, -50%) translateX(26vw) scale(0.9);
          opacity: 0.65;
          filter: brightness(0.7);
          z-index: 5;
          cursor: pointer;
        }
        .ps-slide--far_left {
          width: 16vw; height: 30vh;
          transform: translate(-50%, -50%) translateX(-46vw) scale(0.75);
          opacity: 0.28;
          z-index: 2;
          cursor: pointer;
        }
        .ps-slide--far_right {
          width: 16vw; height: 30vh;
          transform: translate(-50%, -50%) translateX(46vw) scale(0.75);
          opacity: 0.28;
          z-index: 2;
          cursor: pointer;
        }

        /* ── INNER ── */
        .ps-slide-inner {
          width: 100%;
          height: 100%;
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.65);
        }

        .ps-slide-bg {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ps-slide-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: clamp(1rem, 2.5vw, 2rem);
          letter-spacing: 0.3em;
          color: rgba(245, 243, 239, 0.85);
          text-transform: uppercase;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        /* ── CAPTION ── */
        .ps-caption-wrap {
          position: relative;
          width: 79vw;
          margin-top: 12px;
          z-index: 20;
        }

        .ps-caption-bar {
          padding: 1.2rem 2.8rem;
        }

        .ps-caption-text {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.72rem, 1.1vw, 0.95rem);
          font-weight: 300;
          letter-spacing: 0.07em;
          color: #CFC7BD;
          text-align: center;
          line-height: 1.75;
          margin: 0;
        }

        /* ── ARROWS ── */
        .ps-arrow {
          display: none;
        }
        .ps-arrow svg { width: 20px; height: 20px; }
        .ps-arrow:hover {
          background: rgba(245, 243, 239, 0.12);
          border-color: rgba(245, 243, 239, 0.35);
        }
        .ps-arrow--left  { left: 2.5vw; }
        .ps-arrow--right { right: 2.5vw; }

        /* ── DOTS ── */
        .ps-dots {
          display: flex;
          gap: 10px;
          margin-top: 2.5vh;
          z-index: 20;
        }
        .ps-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(207, 199, 189, 0.28);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .ps-dot--on {
          background: #CFC7BD;
          transform: scale(1.6);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .ps-track { height: 55vh; }

          .ps-slide--center   { width: 74vw; height: 46vh; }
          .ps-slide--left     { width: 54vw; height: 38vh; transform: translate(-50%, -50%) translateX(-58vw) scale(0.85); }
          .ps-slide--right    { width: 54vw; height: 38vh; transform: translate(-50%, -50%) translateX(58vw)  scale(0.85); }
          .ps-slide--far_left,
          .ps-slide--far_right { opacity: 0; pointer-events: none; }

          .ps-arrow { display: none; }
          .ps-caption-bar { padding: 1rem 1.4rem; }
        }
      `}</style>
    </section>
  );
}
