"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

const GAP = 12; // gap-3 = 12px
const N = projects.length;
// Triple the array so we can loop seamlessly
const LOOPED = [...projects, ...projects, ...projects];

const thumbUrl = (id) =>
  `https://picsum.photos/seed/prorab${id}/800/1000`;
const photoUrls = (id) =>
  [1, 2, 3, 4, 5].map((i) =>
    `https://picsum.photos/seed/prorab${id}p${i}/1200/800`
  );

// ── helpers ───────────────────────────────────────────────────────────────────

function getCardW(trackEl) {
  const card = trackEl?.querySelector("[data-card]");
  if (!card) return 300;
  return card.getBoundingClientRect().width + GAP;
}

function reCenter(trackEl, cardW) {
  if (!trackEl) return;
  const setW = N * cardW;
  if (trackEl.scrollLeft >= setW * 2) trackEl.scrollLeft -= setW;
  else if (trackEl.scrollLeft < setW) trackEl.scrollLeft += setW;
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ project, onClose }) {
  const { language, t } = useLanguage();
  const photos = photoUrls(project.id);

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
      {/* Top bar */}
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

      {/* Horizontal photo strip — clicking any photo closes modal */}
      <div
        className="flex flex-1 items-center gap-4 overflow-x-auto px-6 pb-8"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((src, i) => (
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
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const initDone = useRef(false);

  // Set initial scroll to middle set + run peek animation
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const timer = setTimeout(() => {
      const el = trackRef.current;
      if (!el) return;
      const cw = getCardW(el);

      // Silently start in the middle set
      el.scrollLeft = N * cw;

      // Peek: nudge right then back to hint scrollability
      setTimeout(() => {
        el.scrollBy({ left: cw * 0.22, behavior: "smooth" });
        setTimeout(() => {
          el.scrollBy({ left: -cw * 0.22, behavior: "smooth" });
        }, 480);
      }, 600);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll every 3.5 s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const cw = getCardW(el);
      el.scrollBy({ left: cw, behavior: "smooth" });
      setTimeout(() => reCenter(el, cw), 650);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  function manualScroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    pausedRef.current = true;
    const cw = getCardW(el);
    el.scrollBy({ left: dir * cw, behavior: "smooth" });
    setTimeout(() => {
      reCenter(el, cw);
      pausedRef.current = false;
    }, 650);
  }

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="overflow-hidden py-20 lg:py-28">
      {/* Header */}
      <div className="mx-auto mb-10 flex items-end justify-between px-6 lg:px-12">
        <div>
          <p className="mb-3 text-sm leading-snug text-[var(--foreground)]">
            {t.portfolio.label}
          </p>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => {
          const el = trackRef.current;
          setTimeout(() => {
            reCenter(el, getCardW(el));
            pausedRef.current = false;
          }, 650);
        }}
        className="flex overflow-x-auto px-6 pb-3 lg:px-12"
        style={{
          gap: GAP,
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {LOOPED.map((project, i) => (
          <button
            key={i}
            data-card
            onClick={() => setSelected(project)}
            className="group relative flex-none cursor-pointer overflow-hidden rounded-sm"
            style={{
              /* 1 card mobile, 2 tablet, 3 desktop */
              width: "min(85vw, calc(33.333% - 8px))",
              minWidth: 220,
              aspectRatio: "3 / 4",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            {/* Thumbnail */}
            <img
              src={thumbUrl(project.id)}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Info */}
            <div className="absolute inset-x-0 bottom-0 p-5">
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

            {/* Hover border */}
            <div className="absolute inset-0 rounded-sm border border-transparent transition-colors duration-300 group-hover:border-[#CFC7BD]/30" />
          </button>
        ))}
      </div>

      {selected && <Modal project={selected} onClose={handleClose} />}
    </section>
  );
}
