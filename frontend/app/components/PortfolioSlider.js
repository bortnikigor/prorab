'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    id: 1,
    title: 'TRUSDO',
    category: 'Brand Identity & Web Design',
    caption: {
      UA: 'Дизайн — це лише намір.\nРеальність створюється на будівництві.\nМи — ті, хто відповідає за те, щоб дизайн став реальністю без спотворень.',
      EN: 'Design is just intention.\nReality is built on the construction site.\nWe are those who ensure that design becomes reality without distortion.',
    },
    image: 'https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778573852/10c849511d37cd379dbb5dd9fbff055e_e2ouna.jpg',
  },
  {
    id: 2,
    title: 'MEDTECH',
    category: 'UX/UI & Product Design',
    caption: {
      UA: 'Там, де більшість "спрощує" — ми реалізуємо.\nМи відповідаємо за те, щоб інтер\'єр виглядав саме так, як був задуманий.\nБез спрощень. Без втрати деталей. Без "майже так". І все. Не більше.',
      EN: 'Where most "simplify" — we deliver.\nWe ensure the interior looks exactly as it was designed.\nNo simplifications. No loss of detail. No "almost right". That\'s it. Nothing more.',
    },
    image: 'https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778573852/46e5399f07fd25edfa3012c6f05c9e83_toleet.jpg',
  },
  {
    id: 3,
    title: 'CREATE',
    category: 'Digital Experience',
    caption: {
      UA: 'Ви не керуєте ремонтом.\nВи отримуєте результат.\nМи беремо на себе весь процес реалізації — від кошторису до фінальної здачі.',
      EN: 'You don\'t manage the renovation.\nYou get the result.\nWe take on the entire implementation process — from estimate to final handover.',
    },
    image: 'https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778573851/11_h0lurf.jpg',
  },
  {
    id: 4,
    title: 'INTERIORS',
    category: 'Interior Design & Renovation',
    caption: {
      UA: 'Кошторис з точністю до 95%\nПрацюємо за договором\nПоетапна оплата\nГарантія 2 роки',
      EN: 'Estimate with 95% accuracy\nWe work under contract\nStage-by-stage payment\n2-year warranty',
    },
    image: 'https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778573851/81def5fd18191e45bdde3f824c831611_dyzptr.jpg',
  },
];

const N = projects.length;
const mod = (i) => ((i % N) + N) % N;

const CARD_RADIUS = '4px';

export default function PortfolioSlider() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchX = useRef(null);
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
    intervalRef.current = setInterval(() => go(1), 4000);
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

  const slides = useMemo(() =>
    [-2, -1, 0, 1, 2].map(delta => ({
      delta,
      idx: mod(active + delta),
      project: projects[mod(active + delta)],
    }))
  , [active]);

  return (
    <section
      className="ps-section"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.55)', zIndex: 0, pointerEvents: 'none' }} />
      <div className="ps-wrapper" style={{ position: 'relative', zIndex: 1 }}>

        <div className="ps-track">
          {slides.map(({ idx, project, delta }) => {
            const isCenter = delta === 0;
            const slideStyle = getSlideStyle(delta);
            const inner = (
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            );
            if (isCenter) {
              return (
                <a
                  key={idx}
                  href="https://www.instagram.com/prorabkiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...slideStyle, display: 'block', cursor: 'pointer' }}
                >
                  {inner}
                </a>
              );
            }
            return (
              <div
                key={idx}
                style={slideStyle}
                onClick={() => {
                  if (delta < 0 && !busy) go(-1);
                  if (delta > 0 && !busy) go(1);
                }}
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Caption overlay */}
        <div className="ps-caption">
          <p
            key={active}
            className="ps-caption-text"
            style={{ margin: 0, whiteSpace: 'pre-line' }}
          >
            {typeof projects[active].caption === 'object'
              ? projects[active].caption[language]
              : projects[active].caption}
          </p>
          <a
            href="https://www.instagram.com/prorabkiev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: 'Montserrat',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#CFC7BD',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(207,199,189,0.4)',
              paddingBottom: '2px',
              marginTop: '1.5rem',
            }}
          >
            {t.viewAllWorks}
          </a>
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
          position: relative;
          width: 900px;
          max-width: 96vw;
          margin: 0 auto;
          overflow: visible;
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
          position: relative;
          width: 900px;
          max-width: 96vw;
          margin-top: 12px;
          padding: 1rem 2rem;
          text-align: center;
          color: #CFC7BD;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.07em;
          font-weight: 300;
          line-height: 1.7;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .ps-caption-text {
          animation: fadeIn 0.5s ease forwards;
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
