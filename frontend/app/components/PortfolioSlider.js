"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0c0c0c] border border-[var(--border)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center text-xl text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)] cursor-pointer"
          aria-label={t.portfolio.close}
        >
          ✕
        </button>

        {/* Video */}
        {project.videoId ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=dpcqf9y8l&public_id=${project.videoId}&autoplay=true&muted=false`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div
            className="aspect-video w-full flex items-center justify-center"
            style={{ background: project.bg }}
          >
            <span className="text-6xl font-bold text-white/5 select-none">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="p-8 pb-10">
          <p className="mb-2 text-xs tracking-widest uppercase text-[var(--accent)]">
            {project.categories[language]}
          </p>
          <h3 className="mb-6 text-2xl font-semibold">{project.titles[language]}</h3>

          {/* Image grid */}
          {project.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {project.images.map((imgId, i) => (
                <img
                  key={i}
                  src={`https://res.cloudinary.com/dpcqf9y8l/image/upload/c_fill,w_600,h_400/${imgId}`}
                  alt=""
                  className="w-full aspect-[3/2] object-cover"
                />
              ))}
            </div>
          ) : (
            !project.videoId && (
              <p className="text-sm text-[var(--text-muted)]">{t.portfolio.comingSoon}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSlider() {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="py-20 lg:py-28">
      {/* Header */}
      <div className="mx-auto mb-10 flex items-end justify-between px-6 lg:px-12">
        <div>
          <p className="mb-3 text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            {t.portfolio.label}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.portfolio.title}
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Prev"
            className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth px-6 pb-4 lg:px-12"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="group relative flex-none cursor-pointer overflow-hidden"
            style={{
              width: "clamp(240px, 30vw, 320px)",
              aspectRatio: "3/4",
              background: project.bg,
              scrollSnapAlign: "start",
            }}
          >
            {/* Large number watermark */}
            <span className="absolute -right-2 top-4 select-none text-[7rem] font-bold leading-none text-white/[0.04]">
              {String(project.id).padStart(2, "0")}
            </span>

            {/* Bottom info */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-7 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
              <p className="text-[10px] tracking-widest uppercase text-[var(--accent)]">
                {project.categories[language]}
              </p>
              <h3 className="text-base font-semibold text-[var(--foreground)] leading-snug">
                {project.titles[language]}
              </h3>
            </div>

            {/* Gold border on hover */}
            <div className="absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-[var(--accent)]/40" />
          </button>
        ))}
      </div>

      {selected && <Modal project={selected} onClose={handleClose} />}
    </section>
  );
}
