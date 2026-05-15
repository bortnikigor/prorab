"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import PortfolioSlider from "./components/PortfolioSlider";
import TelegramBotSection from "./components/TelegramBotSection";
import MobileContactSwipe from "./components/MobileContactSwipe";
import ContactForm from "./components/ContactForm";
import Script from "next/script";

const SERVICE_ICONS = ["◻", "◼", "▣"];
const CLOUD_NAME = "dpcqf9y8l";
const HERO_VIDEO_ID = "video2_utuupz";
const SECTIONS = ["hero", "about", "instagram", "contact"];

export default function Home() {
  const { t, language } = useLanguage();
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
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="PRORAB" width={36} height={36} priority style={{ filter: "invert(1) brightness(2)" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", letterSpacing: "0.3em", color: "#CFC7BD" }}>
            <span style={{ fontWeight: 700 }}>PRO</span><span style={{ fontWeight: 400 }}>RAB</span>
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

      {/* FIXED SOCIAL ICONS */}
      <div style={{ position: "fixed", bottom: "32px", left: "36px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <a href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://t.me/i_bortnyk" target="_blank" rel="noopener noreferrer" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </a>
          <a href="tel:+380958611898" style={{ color: "#CFC7BD", opacity: 0.7, transition: "opacity 0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* FIXED SCROLL */}
      <div style={{ position: "fixed", bottom: "32px", right: "36px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "#CFC7BD", textTransform: "uppercase", writingMode: "vertical-rl", textOrientation: "mixed", opacity: 0.7 }}>
          SCROLL
        </span>
        <div style={{ width: "1px", height: "40px", background: "#CFC7BD", opacity: 0.4, animation: "scrollHint 1.5s ease-in-out infinite" }} />
      </div>

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
                style={{ background: "none", border: "none", borderRight: "1px solid rgba(207,199,189,0.5)", padding: "10px 24px", fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#CFC7BD", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(207,199,189,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                {t.services.label}
              </button>
              <button
                onClick={() => goTo(2)}
                style={{ background: "none", border: "none", padding: "10px 24px", fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#CFC7BD", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}
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
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.3em", color: "#CFC7BD", textTransform: "uppercase", margin: "0 0 16px 0", fontWeight: 400, paddingLeft: "7px" }}>
              I AM
            </p>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(40px, 8vw, 100px)", fontWeight: 800, color: "#CFC7BD", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0, lineHeight: 1, whiteSpace: "nowrap" }}>
              PRORAB
            </h1>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", fontWeight: 400, color: "#CFC7BD", textTransform: "uppercase", letterSpacing: "0.3em", margin: "12px 0 0", textAlign: "right", lineHeight: 1.5 }}>
              {t.hero.slogan.split(" ").slice(0, Math.ceil(t.hero.slogan.split(" ").length / 2)).join(" ")}<br/>
              {t.hero.slogan.split(" ").slice(Math.ceil(t.hero.slogan.split(" ").length / 2)).join(" ")}
            </p>
          </div>


        </section>

        {/* ── ABOUT + SERVICES ── */}
        <PortfolioSlider />

        {/* ── PORTFOLIO ── */}
        {false && (
        <section style={{ width: "100%", height: "100vh", position: "relative" }}>
          <PortfolioSlider ref={portfolioRef} onExitBottom={() => goTo(3)} onExitTop={() => goTo(1)} />
        </section>
        )}

        {/* ── INSTAGRAM ── */}
        <section style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: '#3a3a3a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 5vw',
        }}>
          {/* Dark overlay як в інших секціях */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, width: '467px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'Montserrat',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: '#CFC7BD',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              textAlign: 'center',
            }}>
              INSTAGRAM
            </p>
            <behold-widget feed-id="6RPZtwM6pWTxeB1L3WjP"></behold-widget>
            <p style={{
              fontFamily: 'Montserrat',
              fontSize: '0.85rem',
              fontWeight: 300,
              letterSpacing: '0.06em',
              color: '#CFC7BD',
              textAlign: 'center',
              lineHeight: '1.7',
              marginTop: '1.5rem',
            }}>
              Саме тому наші об&apos;єкти виглядають так, як на візуалізаціях.
            </p>
          </div>
          <Script src="https://w.behold.so/widget.js" type="module" strategy="lazyOnload" />
        </section>

        {/* ── CONTACT ── */}
        <section className="contact-section" style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.55)', zIndex: 0, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* DESKTOP layout */}
          <div className="contact-desktop" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "0 60px", alignItems: "center", gap: "80px" }}>

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#CFC7BD", letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 20px" }}>{t.contacts.title}</h2>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,189,0.6)", lineHeight: 1.7, maxWidth: "380px", margin: "0 auto" }}>{t.contacts.description}</p>
              </div>
              <div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "18px", fontWeight: 500, color: "#CFC7BD", margin: "0 0 12px" }}>{t.contacts.address}</h3>
                <a href="https://maps.app.goo.gl/t5QG4VNNnVzZu7J88" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,189,0.6)", textDecoration: "none" }}>{t.contacts.city}</a>
              </div>
              <div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "18px", fontWeight: 500, color: "#CFC7BD", margin: "0 0 12px" }}>E-MAIL</h3>
                <a href="mailto:request@prorab.ooo" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,189,0.6)", textDecoration: "none" }}>request@prorab.ooo</a>
              </div>
            </div>

            {/* RIGHT — form */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(207,199,189,0.12)", padding: "44px", borderRadius: "2px", display: "flex", flexDirection: "column", maxHeight: "55vh", alignSelf: "center" }}>
              <ContactForm t={t} />
            </div>
          </div>

          {/* MOBILE layout — horizontal swipe */}
          <MobileContactSwipe t={t} language={language} />

          </div>
        </section>

      </div>

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
        .contact-desktop { display: grid; }
        .mobile-contact { display: none; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; overflow-y: auto; height: auto !important; }
          .about-left { border-right: none !important; border-bottom: 1px solid rgba(207,199,189,0.12); padding: 40px 24px !important; }
          .about-right { padding: 40px 24px !important; }
          .contact-desktop { display: none !important; }
          .mobile-contact { display: block !important; }
        }
      `}</style>
    </div>
  );
}
