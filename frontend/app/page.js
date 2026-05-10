"use client";

import Image from "next/image";
import { useLanguage } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import PortfolioSlider from "./components/PortfolioSlider";
import TelegramBotSection from "./components/TelegramBotSection";

const SERVICE_ICONS = ["◻", "◼", "▣"];
const CLOUD_NAME = "dpcqf9y8l";
const HERO_VIDEO_ID = "video1_qnwxdv";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
        <span className="flex-1 text-xs tracking-[0.35em] uppercase text-white">
          <span className="font-bold">PRO</span><span className="font-light">RAB</span>
        </span>
        <Image
          src="/logo.png"
          alt="PRORAB"
          width={50}
          height={50}
          priority
          style={{ filter: "invert(1) brightness(2)" }}
        />
        <div className="flex flex-1 justify-end">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-end justify-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${HERO_VIDEO_ID}.jpg`}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src={`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${HERO_VIDEO_ID}.mp4`}
            type="video/mp4"
          />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />

        {/* Slogan */}
        <div className="absolute z-10" style={{ bottom: "60px", left: "60px" }}>
          <p style={{ fontSize: "18px", fontWeight: 300, letterSpacing: "0.1em", color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}>
            {t.hero.slogan}
          </p>
        </div>
      </section>

      {/* ── ABOUT + SERVICES ───────────────────────────────── */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">

          {/* About – left column */}
          <div className="flex flex-col justify-center gap-8 border-b border-[var(--border)] px-6 py-16 lg:border-b-0 lg:border-r lg:px-12 lg:py-24">
            <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
              {t.about.label}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              {t.about.text}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-8">
              {t.about.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-[11px] leading-snug tracking-wide text-[var(--text-muted)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services – right column */}
          <div className="flex flex-col px-6 py-16 lg:px-12 lg:py-24">
            <p className="mb-8 text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
              {t.services.label}
            </p>
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {t.services.items.map((item, i) => (
                <div key={item.title} className="group flex gap-5 py-8 first:pt-0 last:pb-0">
                  <span className="mt-0.5 shrink-0 text-lg text-[var(--accent)]">
                    {SERVICE_ICONS[i]}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── PORTFOLIO SLIDER ───────────────────────────────── */}
      <PortfolioSlider />

      {/* ── TELEGRAM BOT ───────────────────────────────────── */}
      <TelegramBotSection />

      {/* ── CTA ────────────────────────────────────────────── */}
      {false && <section className="border-t border-[var(--border)] bg-[var(--muted)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-24 lg:py-28">
          <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            {t.telegram.label}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.telegram.title}
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--text-muted)]">
            {t.telegram.text}
          </p>
          <a
            href="https://t.me/prorab_websitebot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-3 border border-[var(--accent)] px-10 py-4 text-xs tracking-widest uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.6l-2.94-.92c-.64-.203-.658-.64.136-.954l11.49-4.43c.533-.194 1.003.136.838.925z"/>
            </svg>
            {t.telegram.cta}
          </a>
        </div>
      </section>}

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: "#0F1113", borderTop: "1px solid rgba(207,199,189,0.12)" }}>
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-5 lg:px-12">

          {/* Left: copyright */}
          <p className="absolute left-6 text-[11px] whitespace-nowrap lg:left-12" style={{ color: "rgba(245,243,239,0.45)" }}>
            © {new Date().getFullYear()} PRORAB
          </p>

          {/* Center: social icons */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/prorabkiev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-60"
              style={{ background: "#222", border: "1px solid rgba(207,199,189,0.15)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#CFC7BD">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-60"
              style={{ background: "#222", border: "1px solid rgba(207,199,189,0.15)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#CFC7BD">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/prorab_websitebot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-60"
              style={{ background: "#222", border: "1px solid rgba(207,199,189,0.15)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CFC7BD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
