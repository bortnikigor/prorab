"use client";
import { useRef, useState } from "react";

export default function MobileContactSwipe({ t, language }) {
  const [panel, setPanel] = useState(0); // 0 = info, 1 = form
  const touchStartX = useRef(0);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) setPanel(1);
    if (delta < -50) setPanel(0);
  }

  return (
    <div
      className="mobile-contact"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ flex: 1, position: "relative", overflow: "hidden" }}
    >
      {/* Slides wrapper */}
      <div style={{ display: "flex", width: "200%", height: "100%", transform: `translateX(${panel === 0 ? "0%" : "-50%"})`, transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)" }}>

        {/* Panel 1 — Info */}
        <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", gap: "28px" }}>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "28px", fontWeight: 600, color: "#CFC7BD", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>{t.contacts.title}</h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,189,0.6)", lineHeight: 1.7, margin: 0 }}>{t.contacts.description}</p>
          <div>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "15px", fontWeight: 700, color: "#CFC7BD", margin: "0 0 8px" }}>{t.contacts.address}</h3>
            <a href="https://maps.app.goo.gl/t5QG4VNNnVzZu7J88" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,189,0.6)", textDecoration: "none" }}>{t.contacts.city}</a>
          </div>
          <div>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "15px", fontWeight: 700, color: "#CFC7BD", margin: "0 0 8px" }}>E-mail</h3>
            <a href="mailto:request@prorab.ooo" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,169,0.6)", textDecoration: "none" }}>request@prorab.ooo</a>
          </div>
          {/* Swipe hint */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", opacity: 0.5 }}>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "15px", letterSpacing: "0.05em", color: "#CFC7BD", fontWeight: 700 }}>{t.contacts.swipeToForm}</span>
            <div style={{ width: "40px", height: "1px", background: "#CFC7BD", opacity: 0.4, animation: "scrollHintH 1.5s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Panel 2 — Form */}
        <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(207,199,189,0.12)", padding: "32px 24px", width: "100%", borderRadius: "2px" }}>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "22px", fontWeight: 600, color: "#CFC7BD", letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 24px", textAlign: "center" }}>{t.contacts.formTitle}</h2>
            {[
              { placeholder: t.contacts.namePlaceholder, type: "text" },
              { placeholder: t.contacts.phonePlaceholder, type: "tel" },
              { placeholder: t.contacts.messagePlaceholder, type: "text" },
            ].map((field) => (
              <div key={field.placeholder} style={{ borderBottom: "1px solid rgba(207,199,189,0.2)", marginBottom: "16px" }}>
                <input type={field.type} placeholder={field.placeholder}
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "#CFC7BD", padding: "10px 0", letterSpacing: "0.05em" }} />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <button style={{ background: "rgba(207,199,189,0.1)", border: "1px solid rgba(207,199,189,0.3)", color: "#CFC7BD", fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", padding: "12px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                {t.contacts.sendButton}
              </button>
            </div>
          </div>
          {/* Swipe back hint */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", opacity: 0.5 }}>
            <div style={{ width: "40px", height: "1px", background: "#CFC7BD", opacity: 0.4, animation: "scrollHintH 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "15px", letterSpacing: "0.05em", color: "#CFC7BD", fontWeight: 700 }}>{t.contacts.swipeBack}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollHintH {
          0%, 100% { opacity: 0.2; transform: scaleX(0.5); transform-origin: left; }
          50% { opacity: 0.8; transform: scaleX(1); transform-origin: left; }
        }
      `}</style>

      {/* Dots indicator */}
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
        {[0, 1].map((i) => (
          <button key={i} onClick={() => setPanel(i)} style={{ width: i === panel ? 20 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", background: i === panel ? "#CFC7BD" : "rgba(207,199,189,0.3)", transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}
