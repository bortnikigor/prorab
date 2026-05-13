"use client";
import { useRef, useState } from "react";
import ContactForm from "./ContactForm";

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
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "15px", fontWeight: 700, color: "#CFC7BD", margin: "0 0 8px" }}>E-MAIL</h3>
            <a href="mailto:request@prorab.ooo" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: "rgba(207,199,169,0.6)", textDecoration: "none" }}>request@prorab.ooo</a>
          </div>
          {/* CTA button */}
          <button
            onClick={() => setPanel(1)}
            style={{ background: "transparent", border: "1px solid rgba(245,243,239,0.4)", color: "#F5F3EF", fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.75rem 2rem", cursor: "pointer", transition: "border-color 0.25s, color 0.25s", marginTop: "8px" }}
          >
            {t.contacts.writeUs}
          </button>
        </div>

        {/* Panel 2 — Form */}
        <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(207,199,189,0.12)", padding: "32px 24px", width: "100%", borderRadius: "2px" }}>
            <ContactForm t={t} titleSize="22px" inputSize="13px" inputPadding="10px 0" gap="16px" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollHintH {
          0%, 100% { opacity: 0.2; transform: scaleX(0.5); transform-origin: left; }
          50% { opacity: 0.8; transform: scaleX(1); transform-origin: left; }
        }
        .mc-send-btn {
          background: transparent;
          border: 1px solid rgba(245, 243, 239, 0.4);
          color: #F5F3EF;
          font-family: Montserrat, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.75rem 2rem;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s;
        }
        .mc-send-btn:hover {
          border-color: rgba(245, 243, 239, 0.8);
          color: #F5F3EF;
        }
      `}</style>

    </div>
  );
}
