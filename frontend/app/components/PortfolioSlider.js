"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

const N = projects.length;

// Signed wrap-around distance from active index
function wrapDist(i, active) {
  let d = i - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

// Transform config for each position relative to center
function slotStyle(d) {
  const abs = Math.abs(d);
  const sign = d < 0 ? -1 : 1;
  if (abs === 0) return { x: 0,         scale: 1.0,  opacity: 1.0, z: 10, click: true };
  if (abs === 1) return { x: sign * 44,  scale: 0.72, opacity: 0.6, z: 5,  click: true };
  return              { x: sign * 90,   scale: 0.55, opacity: 0.0, z: 0,  click: false };
}

const thumbUrl = () => "https://res.cloudinary.com/dpcqf9y8l/image/upload/v1778308458/medium_1_7a0af14597.jpg";
const photoUrls = (id) =>
  [1, 2, 3, 4, 5].map((i) => `https://picsum.photos/seed/prorab${id}p${i}/1200/800`);

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ project, onClose }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/96 backdrop-blur-sm">
      <div className="flex shrink-0 items-center justify-between px-6 py-5">
        <div>
          <p className="mb-0.5 text-[10px] tracking-widest uppercase text-[#CFC7BD]">
            {project.categories[language]}
          </p>
          <h3 className="text-lg font-semibold text-white">
            {project.titles[language]}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label={t.portfolio.close}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-xl text-white/40 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>
      <div
        className="flex flex-1 items-center gap-4 overflow-x-auto px-6 pb-8"
        style={{ scrollbarWidth: "none" }}
      >
        {photoUrls(project.id).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            onClick={onClose}
            draggable={false}
            className="h-[65vh] max-w-[85vw] w-auto shrink-0 cursor-pointer rounded object-cover opacity-90 transition-opacity hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export default function PortfolioSlider() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const pausedRef = useRef(false);

  // Auto-advance every 4 s
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % N);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  function handleCardClick(i, d) {
    if (d === 0) {
      setSelected(projects[i]);
    } else if (Math.abs(d) === 1) {
      pausedRef.current = true;
      setActive(i);
      setTimeout(() => { pausedRef.current = false; }, 900);
    }
  }

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="py-20 lg:py-28">
      {/* Header */}
      <div className="mx-auto mb-12 px-6 lg:px-12">
        <p className="text-sm leading-snug text-[var(--foreground)]">
          {t.portfolio.label}
        </p>
      </div>

      {/* Cinematic carousel */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(380px, 66vh, 720px)" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { setTimeout(() => { pausedRef.current = false; }, 900); }}
      >
        {projects.map((project, i) => {
          const d = wrapDist(i, active);
          const { x, scale, opacity, z, click } = slotStyle(d);

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(i, d)}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "min(58vw, 660px)",
                height: "100%",
                transform: `translate(calc(-50% + ${x}vw), -50%) scale(${scale})`,
                opacity,
                zIndex: z,
                pointerEvents: click ? "auto" : "none",
                cursor: d === 0 ? "pointer" : "pointer",
                transition:
                  "transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease",
              }}
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* Thumbnail */}
                <img
                  src={thumbUrl(project.id)}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <span
                    className="mb-2 inline-block rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase"
                    style={{
                      background: "rgba(207,199,189,0.1)",
                      border: "1px solid rgba(207,199,189,0.22)",
                      color: "#CFC7BD",
                    }}
                  >
                    {project.categories[language].split("·")[0].trim()}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    {project.titles[language]}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              pausedRef.current = true;
              setActive(i);
              setTimeout(() => { pausedRef.current = false; }, 900);
            }}
            style={{
              width: i === active ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? "#CFC7BD" : "rgba(207,199,189,0.25)",
              transition: "all 0.4s ease",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {selected && <Modal project={selected} onClose={handleClose} />}
    </section>
  );
}
