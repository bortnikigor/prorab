"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)] cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{language}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-3 min-w-[140px] border border-[var(--border)] bg-[var(--background)] py-1"
        >
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <button
                role="option"
                aria-selected={language === code}
                onClick={() => { setLanguage(code); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-xs tracking-widest uppercase transition-colors hover:bg-[var(--muted)] cursor-pointer ${
                  language === code
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span>{label}</span>
                {language === code && (
                  <span className="text-[var(--accent)]">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
