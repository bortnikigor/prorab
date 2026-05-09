"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("UA");

  useEffect(() => {
    const saved = localStorage.getItem("prorab_lang");
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = translations[language].htmlLang;
  }, [language]);

  function setLanguage(lang) {
    setLanguageState(lang);
    localStorage.setItem("prorab_lang", lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
