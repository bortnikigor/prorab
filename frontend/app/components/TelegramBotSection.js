"use client";

import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// ── Pills ─────────────────────────────────────────────────────────────────────

function getRows(phrases) {
  const n = phrases.length;
  const shift = Math.floor(n / 3);
  return [
    phrases,
    [...phrases.slice(shift), ...phrases.slice(0, shift)],
    [...phrases.slice(shift * 2), ...phrases.slice(0, shift * 2)],
  ];
}

function PillRow({ phrases, direction, speed = 1 }) {
  const doubled = [...phrases, ...phrases];
  const duration = `${(phrases.length * 4.5) / speed}s`;
  const anim = direction === "left" ? "ticker-left" : "ticker-right";

  return (
    <div className="overflow-hidden py-1.5">
      <div
        style={{
          animation: `${anim} ${duration} linear infinite`,
          display: "inline-flex",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {doubled.map((phrase, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full px-4 py-2 text-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(207,199,189,0.1)",
              color: "rgba(207,199,189,0.45)",
            }}
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── AI input ──────────────────────────────────────────────────────────────────

function AIInput() {
  const { language, t } = useLanguage();
  const tc = t.telegramChat;
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'sent' | 'error' | null
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setInput("");
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSend}>
        <div
          className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300"
          style={{
            background: "#1a1a1a",
            border: `1px solid ${focused ? "rgba(207,199,189,0.45)" : "rgba(207,199,189,0.12)"}`,
            boxShadow: focused
              ? "0 0 0 4px rgba(207,199,189,0.06), 0 0 24px rgba(207,199,189,0.05)"
              : "none",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={tc.placeholder}
            disabled={sending}
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none disabled:opacity-50"
            style={{ "::placeholder": { color: "rgba(207,199,189,0.3)" } }}
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all hover:scale-105 disabled:opacity-25"
            style={{ background: "rgba(207,199,189,0.12)", color: "#CFC7BD" }}
          >
            {sending ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {status === "sent" && (
        <p className="text-center text-xs text-[#CFC7BD]/55">{tc.reply}</p>
      )}
      {status === "error" && (
        <p className="text-center text-xs text-red-400/70">{tc.error}</p>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TelegramBotSection() {
  const { t } = useLanguage();
  const rows = getRows(t.ticker);

  return (
    <section className="border-y border-[var(--border)] py-20 lg:py-28">
      {/* Pill rows */}
      <div className="mb-16">
        <PillRow phrases={rows[0]} direction="left"  speed={0.8} />
        <PillRow phrases={rows[1]} direction="right" speed={1.0} />
        <PillRow phrases={rows[2]} direction="left"  speed={1.3} />
      </div>

      {/* Title + input */}
      <div className="mx-auto max-w-2xl px-6">
        <p className="mb-3 text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
          {t.telegram.label}
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.telegram.title}
        </h2>
        <p className="mb-10 text-sm leading-relaxed text-[var(--text-muted)]">
          {t.telegram.text}
        </p>

        <AIInput />
      </div>
    </section>
  );
}
