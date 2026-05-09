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
        <span className="flex-1 text-base tracking-[0.35em] uppercase text-white">
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
        <div className="relative z-10 w-full max-w-5xl px-6 pb-20 sm:px-10 sm:pb-28">
          <p className="max-w-2xl text-2xl font-light leading-relaxed tracking-wide text-white sm:text-3xl lg:text-4xl">
            {t.hero.slogan}
          </p>
        </div>
      </section>

      {/* ── PORTFOLIO SLIDER ───────────────────────────────── */}
      <PortfolioSlider />

      {/* ── TELEGRAM BOT ───────────────────────────────────── */}
      <TelegramBotSection />

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

      {/* ── TELEGRAM BOT ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--muted)]">
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
            {/* Telegram icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.6l-2.94-.92c-.64-.203-.658-.64.136-.954l11.49-4.43c.533-.194 1.003.136.838.925z"/>
            </svg>
            {t.telegram.cta}
          </a>
        </div>
      </section>

      {/* ── CONTACTS ───────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-12">
          <p className="mb-10 text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            {t.contacts.label}
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.contacts.title}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/prorabkiev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 border border-[var(--border)] p-6 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--accent)]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              <span className="text-xs tracking-widest uppercase text-[var(--text-muted)] transition-colors group-hover:text-[var(--foreground)]">
                {t.contacts.instagram}
              </span>
              <span className="text-sm text-[var(--foreground)]">@prorabkiev</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/prorab_websitebot"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 border border-[var(--border)] p-6 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--accent)]">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.6l-2.94-.92c-.64-.203-.658-.64.136-.954l11.49-4.43c.533-.194 1.003.136.838.925z"/>
              </svg>
              <span className="text-xs tracking-widest uppercase text-[var(--text-muted)] transition-colors group-hover:text-[var(--foreground)]">
                {t.contacts.telegram}
              </span>
              <span className="text-sm text-[var(--foreground)]">@prorab_websitebot</span>
            </a>

            {/* City */}
            <div className="flex flex-col gap-3 border border-[var(--border)] p-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--accent)]"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
                {t.contacts.city.split(",")[1]?.trim() ?? "Ukraine"}
              </span>
              <span className="text-sm text-[var(--foreground)]">{t.contacts.city}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
          <span className="text-xs tracking-[0.4em] uppercase text-[var(--text-muted)]">PRORAB</span>
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} PRORAB. {t.footer.rights}
          </p>
        </div>
      </footer>

    </div>
  );
}
