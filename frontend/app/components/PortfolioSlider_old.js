"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

const THUMB = "https://res.cloudinary.com/dpcqf9y8l/image/upload/v1778308458/medium_1_7a0af14597.jpg";
const N = projects.length;

function Modal({ project, onClose }) {
  const { language, t } = useLanguage();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,17,19,0.97)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", flexShrink: 0 }}>
        <div>
          <p style={{ color: "#CFC7BD", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 4px", fontFamily: "Montserrat, sans-serif" }}>{project.categories[language]}</p>
          <h3 style={{ color: "#F5F3EF", fontSize: "18px", fontWeight: 600, margin: 0, fontFamily: "Montserrat, sans-serif" }}>{project.titles[language]}</h3>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(245,243,239,0.4)", fontSize: "20px", cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "16px", overflowX: "auto", padding: "0 48px 48px", scrollbarWidth: "none" }}>
        {[1,2,3,4,5].map((i) => (
          <img key={i} src={`https://picsum.photos/seed/prorab${project.id}p${i}/1200/800`} alt=""
            onClick={onClose} draggable={false}
            style={{ height: "65vh", maxWidth: "85vw", width: "auto", flexShrink: 0, objectFit: "cover", cursor: "pointer", opacity: 0.9 }} />
        ))}
      </div>
    </div>
  );
}

const PortfolioSlider = forwardRef(function PortfolioSlider({ onExitBottom, onExitTop }, ref) {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const pausedRef = useRef(false);
  const lastScrollTime = useRef(0);

  // Expose handleScroll to parent
  useImperativeHandle(ref, () => ({
    handleScroll(dir) {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return true;
      lastScrollTime.current = now;

      if (dir > 0) {
        if (active < N - 1) { advance(1); return true; }
        else { onExitBottom?.(); return false; }
      } else {
        if (active > 0) { advance(-1); return true; }
        else { onExitTop?.(); return false; }
      }
    }
  }));

  function advance(dir) {
    if (animating) return;
    setAnimating(true);
    setActive((a) => Math.max(0, Math.min(N - 1, a + dir)));
    setTimeout(() => setAnimating(false), 800);
  }

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActive((a) => (a + 1) % N);
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);
  const project = projects[active];

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", background: "#0F1113", fontFamily: "Montserrat, sans-serif" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Fullscreen slides */}
      {projects.map((p, i) => (
        <div key={p.id} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transition: "opacity 0.8s ease", zIndex: i === active ? 1 : 0 }}>
          <img src={THUMB} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,17,19,0.9) 0%, rgba(15,17,19,0.15) 50%, rgba(15,17,19,0.25) 100%)" }} />
        </div>
      ))}

      {/* Top label */}
      <div style={{ position: "absolute", top: "32px", left: "60px", zIndex: 10 }}>
        <p style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", margin: 0 }}>{t.portfolio.label}</p>
      </div>

      {/* Counter */}
      <div style={{ position: "absolute", top: "32px", right: "80px", zIndex: 10 }}>
        <p style={{ color: "rgba(245,243,239,0.4)", fontSize: "12px", letterSpacing: "0.2em", margin: 0 }}>
          {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom left: category + title + button */}
      <div style={{ position: "absolute", bottom: "60px", left: "60px", zIndex: 10 }}>
        <p key={`cat-${active}`} style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 12px", animation: "fadeUp 0.6s ease forwards" }}>
          {project.categories[language].split("·")[0].trim()}
        </p>
        <h2 key={`title-${active}`} style={{ color: "#F5F3EF", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, lineHeight: 1, textTransform: "uppercase", margin: "0 0 28px", maxWidth: "600px", animation: "fadeUp 0.7s ease forwards" }}>
          {project.titles[language]}
        </h2>
        <button
          onClick={() => setSelected(project)}
          style={{ background: "transparent", border: "1px solid rgba(207,199,189,0.5)", color: "#CFC7BD", padding: "12px 32px", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: "Montserrat, sans-serif", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CFC7BD"; e.currentTarget.style.color = "#0F1113"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#CFC7BD"; }}
        >
          {t.portfolio.viewProject}
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M1 5H19M19 5L15 1M19 5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Arrows bottom right */}
      <div style={{ position: "absolute", bottom: "60px", right: "80px", zIndex: 10, display: "flex", gap: "12px" }}>
        <button onClick={() => advance(-1)} disabled={active === 0}
          style={{ background: "none", border: "1px solid rgba(207,199,189,0.25)", color: active === 0 ? "rgba(207,199,189,0.2)" : "#CFC7BD", width: "48px", height: "48px", cursor: active === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M19 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => advance(1)} disabled={active === N - 1}
          style={{ background: "none", border: "1px solid rgba(207,199,189,0.25)", color: active === N - 1 ? "rgba(207,199,189,0.2)" : "#CFC7BD", width: "48px", height: "48px", cursor: active === N - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: "8px" }}>
        {projects.map((_, i) => (
          <button key={i} onClick={() => { pausedRef.current = true; setActive(i); setTimeout(() => { pausedRef.current = false; }, 900); }}
            style={{ width: i === active ? 28 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", background: i === active ? "#CFC7BD" : "rgba(207,199,189,0.25)", transition: "all 0.4s ease" }} />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {selected && <Modal project={selected} onClose={handleClose} />}
    </div>
  );
});

export default PortfolioSlider;
