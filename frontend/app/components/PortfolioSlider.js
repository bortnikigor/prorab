"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

const THUMB = "https://res.cloudinary.com/dpcqf9y8l/image/upload/v1778308458/medium_1_7a0af14597.jpg";

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
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "rgba(15,17,19,0.97)" }}>
      <div className="flex shrink-0 items-center justify-between px-8 py-6">
        <div>
          <p style={{ color: "#CFC7BD", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "4px" }}>
            {project.categories[language]}
          </p>
          <h3 style={{ color: "#F5F3EF", fontSize: "18px", fontWeight: 600, fontFamily: "Montserrat, sans-serif" }}>
            {project.titles[language]}
          </h3>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(245,243,239,0.4)", fontSize: "20px", cursor: "pointer", padding: "8px" }}>✕</button>
      </div>
      <div className="flex flex-1 items-center gap-4 overflow-x-auto px-8 pb-8" style={{ scrollbarWidth: "none" }}>
        {[1,2,3,4,5].map((i) => (
          <img key={i} src={`https://picsum.photos/seed/prorab${project.id}p${i}/1200/800`} alt="" onClick={onClose}
            draggable={false} className="h-[65vh] w-auto shrink-0 cursor-pointer object-cover"
            style={{ maxWidth: "85vw", opacity: 0.9 }} />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSlider() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const pausedRef = useRef(false);
  const N = projects.length;

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, 5000);
    return () => clearInterval(id);
  }, [active]);

  function goNext() {
    if (animating) return;
    setAnimating(true);
    setActive((a) => (a + 1) % N);
    setTimeout(() => setAnimating(false), 800);
  }

  function goPrev() {
    if (animating) return;
    setAnimating(true);
    setActive((a) => (a - 1 + N) % N);
    setTimeout(() => setAnimating(false), 800);
  }

  function goTo(i) {
    if (animating || i === active) return;
    pausedRef.current = true;
    setAnimating(true);
    setActive(i);
    setTimeout(() => { setAnimating(false); pausedRef.current = false; }, 800);
  }

  const handleClose = useCallback(() => setSelected(null), []);
  const project = projects[active];

  return (
    <section
      style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#0F1113", overflow: "hidden", fontFamily: "Montserrat, sans-serif" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Fullscreen slides */}
      {projects.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: "absolute", inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 0.8s ease",
            zIndex: i === active ? 1 : 0,
          }}
        >
          <img src={THUMB} alt="" draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,17,19,0.85) 0%, rgba(15,17,19,0.2) 50%, rgba(15,17,19,0.3) 100%)" }} />
        </div>
      ))}

      {/* Top label */}
      <div style={{ position: "absolute", top: "40px", left: "60px", zIndex: 10 }}>
        <p style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", margin: 0 }}>
          {t.portfolio.label}
        </p>
      </div>

      {/* Counter top right */}
      <div style={{ position: "absolute", top: "40px", right: "60px", zIndex: 10 }}>
        <p style={{ color: "rgba(245,243,239,0.4)", fontSize: "12px", letterSpacing: "0.2em", margin: 0, fontVariantNumeric: "tabular-nums" }}>
          {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom left: category + title + VIEW button */}
      <div style={{ position: "absolute", bottom: "60px", left: "60px", zIndex: 10 }}>
        <p
          key={`cat-${active}`}
          style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "12px",
            animation: "fadeUp 0.6s ease forwards" }}
        >
          {project.categories[language].split("·")[0].trim()}
        </p>
        <h2
          key={`title-${active}`}
          style={{ color: "#F5F3EF", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, lineHeight: 1, textTransform: "uppercase",
            margin: "0 0 28px", maxWidth: "600px", animation: "fadeUp 0.7s ease forwards" }}
        >
          {project.titles[language]}
        </h2>
        <button
          onClick={() => setSelected(project)}
          style={{
            background: "transparent", border: "1px solid rgba(207,199,189,0.5)",
            color: "#CFC7BD", padding: "12px 32px", fontSize: "11px", letterSpacing: "0.25em",
            textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px",
            fontFamily: "Montserrat, sans-serif", transition: "all 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CFC7BD"; e.currentTarget.style.color = "#0F1113"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#CFC7BD"; }}
        >
          {t.portfolio.viewProject || "VIEW PROJECT"}
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M1 5H19M19 5L15 1M19 5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Right: prev/next arrows */}
      <div style={{ position: "absolute", bottom: "60px", right: "60px", zIndex: 10, display: "flex", gap: "16px" }}>
        <button onClick={goPrev}
          style={{ background: "none", border: "1px solid rgba(207,199,189,0.25)", color: "#CFC7BD", width: "48px", height: "48px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CFC7BD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(207,199,189,0.25)"; }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M19 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={goNext}
          style={{ background: "none", border: "1px solid rgba(207,199,189,0.25)", color: "#CFC7BD", width: "48px", height: "48px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CFC7BD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(207,199,189,0.25)"; }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot indicators bottom center */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: "8px" }}>
        {projects.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{
              width: i === active ? 28 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
              background: i === active ? "#CFC7BD" : "rgba(207,199,189,0.25)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {selected && <Modal project={selected} onClose={handleClose} />}
    </section>
  );
}
