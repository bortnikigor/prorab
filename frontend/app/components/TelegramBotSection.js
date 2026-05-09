"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// ── Ticker ────────────────────────────────────────────────────────────────────

function TickerRow({ phrases, direction }) {
  // Duplicate so the animation loops seamlessly
  const doubled = [...phrases, ...phrases];
  const duration = `${phrases.length * 3.5}s`;
  const animName = direction === "left" ? "ticker-left" : "ticker-right";

  return (
    <div className="overflow-hidden py-3">
      <div
        style={{ animation: `${animName} ${duration} linear infinite`, display: "inline-flex", whiteSpace: "nowrap" }}
      >
        {doubled.map((phrase, i) => (
          <span key={i} className="inline-flex items-center text-sm text-[#CFC7BD]/40">
            <span className="px-6">{phrase}</span>
            <span className="text-[#CFC7BD]/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Chat bubble ───────────────────────────────────────────────────────────────

function Bubble({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div className={`flex flex-col gap-1 ${isBot ? "items-start" : "items-end"}`}>
      <div
        className="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed"
        style={{
          background: isBot ? "#1C1F22" : "#CFC7BD",
          color: isBot ? "#CFC7BD" : "#0F1113",
          borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
        }}
      >
        {msg.text}
      </div>
      <span className="text-[10px] text-[#CFC7BD]/20">
        {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div
        className="flex items-center gap-1 px-4 py-3"
        style={{ background: "#1C1F22", borderRadius: "16px 16px 16px 4px" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-[#CFC7BD]"
            style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.18}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Chat widget ───────────────────────────────────────────────────────────────

function ChatWidget() {
  const { language, t } = useLanguage();
  const tc = t.telegramChat;

  const [messages, setMessages] = useState(() => [
    { id: 0, role: "bot", text: tc.welcome, time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages or typing state change
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setSending(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text, time: new Date() },
    ]);

    // Small delay before showing typing indicator
    const typingTimer = setTimeout(() => setTyping(true), 350);

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await res.json();
      const reply = data.error ? tc.error : tc.reply;

      setTimeout(() => {
        clearTimeout(typingTimer);
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "bot", text: reply, time: new Date() },
        ]);
        setSending(false);
        inputRef.current?.focus();
      }, 1400);
    } catch {
      setTimeout(() => {
        clearTimeout(typingTimer);
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "bot", text: tc.error, time: new Date() },
        ]);
        setSending(false);
      }, 1400);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col overflow-hidden border border-[#1E2124]" style={{ background: "#0F1113" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#1E2124] px-5 py-4">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "rgba(207,199,189,0.08)" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#CFC7BD">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.6l-2.94-.92c-.64-.203-.658-.64.136-.954l11.49-4.43c.533-.194 1.003.136.838.925z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#CFC7BD]">{tc.botName}</p>
          <p className="text-[11px] text-[#CFC7BD]/35">bot</p>
        </div>
        {/* Online dot */}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex flex-col gap-3 overflow-y-auto px-5 py-5"
        style={{ height: 300 }}
      >
        {messages.map((msg) => (
          <Bubble key={msg.id} msg={msg} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="border-t border-[#1E2124]">
        <form onSubmit={handleSend} className="flex items-center gap-3 px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={tc.placeholder}
            disabled={sending}
            className="flex-1 bg-transparent text-sm text-[#CFC7BD] placeholder-[#CFC7BD]/25 outline-none disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 disabled:opacity-25 cursor-pointer"
            style={{ background: "#CFC7BD", color: "#0F1113" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TelegramBotSection() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-[var(--border)]">
      {/* Ticker */}
      <div>
        <TickerRow phrases={t.ticker} direction="left" />
        <TickerRow phrases={t.ticker} direction="right" />
      </div>

      {/* Chat area */}
      <div className="mx-auto max-w-2xl px-6 py-14 sm:py-18 lg:py-20">
        <p className="mb-3 text-xs tracking-[0.5em] uppercase text-[#CFC7BD]/40">
          {t.telegram.label}
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-[#CFC7BD] sm:text-4xl">
          {t.telegram.title}
        </h2>
        <p className="mb-10 text-sm leading-relaxed text-[#CFC7BD]/45">
          {t.telegram.text}
        </p>

        <ChatWidget />
      </div>
    </section>
  );
}
