"use client";

import { LANGUAGES } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map(({ code }, i) => (
        <span key={code} className="flex items-center gap-1">
          <button
            onClick={() => setLanguage(code)}
            className="text-xs tracking-widest uppercase cursor-pointer transition-colors"
            style={{ color: language === code ? "#CFC7BD" : "rgba(207,199,189,0.35)" }}
          >
            {code}
          </button>
          {i < LANGUAGES.length - 1 && (
            <span style={{ color: "rgba(207,199,189,0.2)" }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
