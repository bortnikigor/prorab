"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import PortfolioSlider from "./components/PortfolioSlider";
import TelegramBotSection from "./components/TelegramBotSection";

const SERVICE_ICONS = ["◻", "◼", "▣"];
const CLOUD_NAME = "dpcqf9y8l";
const HERO_VIDEO_ID = "video2_utuupz";
const SECTIONS = ["hero", "about", "telegram"];

export default function Home() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const portfolioRef = useRef(null);
  const lastScrollTime = useRef(0);

  function goTo(index) {
    if (isAnimating || index === currentSection) return;
    if (index < 0 || index >= SECTIONS.length) return;
    setIsAnimating(true);
    setCurrentSection(index);
    setTimeout(() => setIsAnimating(false), 900);
  }

  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;

    function onWheel(e) {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) goTo(currentSection + 1);
      else goTo(currentSection - 1);
    }

    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }

    function onTouchEnd(e) {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaTime = Date.now() - touchStartTime;
      const velocity = Math.abs(deltaY) / deltaTime;

      // мінімум 50px свайп або швидкий флік
      if (Math.abs(deltaY) < 50 && velocity < 0.3) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      lastScrollTime.current = now;

      const dir = deltaY > 0 ? 1 : -1;

      if (dir > 0) goTo(currentSection + 1);
      else goTo(currentSection - 1);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentSection, isAnimating]);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#0F1113" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="PRORAB" width={36} height={36} priority style={{ filter: "invert(1) brightness(2)" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", letterSpacing: "0.3em", color: "#F5F3EF" }}>
            <span style={{ fontWeight: 500 }}>PRO</span><span style={{ fontWeight: 400 }}>RAB</span>
          </span>
        </div>
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* ── DOT NAVIGATION ── */}
      {false && (
      <div style={{ position: "fixed", right: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", gap: "12px" }}>
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === currentSection ? 8 : 6,
              height: i === currentSection ? 8 : 6,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === currentSection ? "#CFC7BD" : "rgba(207,199,189,0.3)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
      )}

      {/* ── SLIDES WRAPPER ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${SECTIONS.length * 100}vh`,
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >

        {/* ── HERO ── */}
        <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
          {/* Background video */}
          <video autoPlay muted playsInline
            poster={`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${HERO_VIDEO_ID}.jpg`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${HERO_VIDEO_ID}.mp4`} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0F1113 0%, transparent 50%)" }} />

{/* TOP RIGHT — Nav buttons */}
          {false && (
          <div style={{ position: "absolute", top: "28px", right: "32px", zIndex: 20 }}>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => goTo(1)}
                style={{ background: "none", border: "none", borderRight: "1px solid rgba(207,199,189,0.5)", padding: "10px 24px", fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#F5F3EF", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(207,199,189,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                {t.services.label}
              </button>
              <button
                onClick={() => goTo(2)}
                style={{ background: "none", border: "none", padding: "10px 24px", fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#F5F3EF", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(207,199,189,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                {t.contacts.label}
              </button>
            </div>
          </div>
          )}

          {/* CENTER — Slogan */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.3em", color: "#CFC7BD", textTransform: "uppercase", margin: "0 0 16px 0", fontWeight: 400, paddingLeft: "14px" }}>
              I AM
            </p>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(40px, 8vw, 100px)", fontWeight: 800, color: "#F5F3EF", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0, lineHeight: 1, whiteSpace: "nowrap" }}>
              PRORAB
            </h1>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", fontWeight: 400, color: "#CFC7BD", textTransform: "uppercase", letterSpacing: "0.3em", margin: "12px 0 0", textAlign: "right", lineHeight: 1.5 }}>
              {t.hero.slogan.split(" ").slice(0, Math.ceil(t.hero.slogan.split(" ").length / 2)).join(" ")}<br/>
              {t.hero.slogan.split(" ").slice(Math.ceil(t.hero.slogan.split(" ").length / 2)).join(" ")}
            </p>
          </div>

          {/* BOTTOM LEFT — Social icons */}
          <div style={{ position: "absolute", bottom: "32px", left: "36px", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ padding: "16px 10px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/prorab_websitebot" target="_blank" rel="noopener noreferrer" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </a>
              {/* Phone */}
              <a href="tel:+380000000000" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* BOTTOM RIGHT — SCROLL text + line */}
          <div style={{ position: "absolute", bottom: "32px", right: "36px", zIndex: 20 }}>
            <div style={{ padding: "16px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "#CFC7BD", textTransform: "uppercase", writingMode: "vertical-rl", textOrientation: "mixed", opacity: 0.7 }}>
                SCROLL
              </span>
              <div style={{ width: "1px", height: "40px", background: "#CFC7BD", opacity: 0.4, animation: "scrollHint 1.5s ease-in-out infinite" }} />
            </div>
          </div>

        </section>

        {/* ── ABOUT + SERVICES ── */}
        <section style={{ width: "100%", height: "100vh", borderTop: "1px solid rgba(207,199,189,0.12)", overflowY: "auto" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
            {/* About */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px", borderRight: "1px solid rgba(207,199,189,0.12)", padding: "80px 48px" }}>
              <p style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "Montserrat, sans-serif" }}>
                {t.about.label}
              </p>
              <h2 style={{ color: "#F5F3EF", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "Montserrat, sans-serif", margin: 0 }}>
                {t.about.title}
              </h2>
              <p style={{ color: "rgba(245,243,239,0.6)", fontSize: "14px", lineHeight: 1.7, maxWidth: "420px", fontFamily: "Montserrat, sans-serif", margin: 0 }}>
                {t.about.text}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", borderTop: "1px solid rgba(207,199,189,0.12)", paddingTop: "32px" }}>
                {t.about.stats.map((s) => (
                  <div key={s.label}>
                    <span style={{ display: "block", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, color: "#CFC7BD", fontFamily: "Montserrat, sans-serif" }}>{s.value}</span>
                    <span style={{ display: "block", fontSize: "11px", color: "rgba(245,243,239,0.5)", lineHeight: 1.4, marginTop: "4px", fontFamily: "Montserrat, sans-serif" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Services */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px" }}>
              <p style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "Montserrat, sans-serif", marginBottom: "32px" }}>
                {t.services.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {t.services.items.map((item, i) => (
                  <div key={item.title} style={{ display: "flex", gap: "20px", padding: "28px 0", borderTop: "1px solid rgba(207,199,189,0.12)" }}>
                    <span style={{ color: "#CFC7BD", fontSize: "18px", marginTop: "2px", flexShrink: 0 }}>{SERVICE_ICONS[i]}</span>
                    <div>
                      <h3 style={{ color: "#F5F3EF", fontSize: "15px", fontWeight: 600, margin: "0 0 8px", fontFamily: "Montserrat, sans-serif" }}>{item.title}</h3>
                      <p style={{ color: "rgba(245,243,239,0.55)", fontSize: "13px", lineHeight: 1.6, margin: 0, fontFamily: "Montserrat, sans-serif" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        {false && (
        <section style={{ width: "100%", height: "100vh", position: "relative" }}>
          <PortfolioSlider ref={portfolioRef} onExitBottom={() => goTo(3)} onExitTop={() => goTo(1)} />
        </section>
        )}

        {/* ── TELEGRAM + FOOTER ── */}
        <section style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <TelegramBotSection />
          </div>
          <footer style={{ background: "#0F1113", borderTop: "1px solid rgba(207,199,189,0.12)", flexShrink: 0 }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 48px", position: "relative" }}>
              <p style={{ position: "absolute", left: "48px", fontSize: "11px", color: "rgba(245,243,239,0.45)", fontFamily: "Montserrat, sans-serif", margin: 0 }}>
                © {new Date().getFullYear()} PRORAB
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { href: "https://www.instagram.com/prorabkiev", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#CFC7BD"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                  { href: "#", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#CFC7BD"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg> },
                  { href: "https://t.me/prorab_websitebot", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CFC7BD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#222", border: "1px solid rgba(207,199,189,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </section>

      </div>

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </div>
  );
}
