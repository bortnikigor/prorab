"use client";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "Команда перевершила всі наші очікування. Від першого ескізу до фінального результату — бездоганна якість та справжній творчий підхід до кожної деталі.",
    name: "Ksenia Marchenko",
    location: "Kyiv, Ukraine",
  },
  {
    id: 2,
    text: "Ваша компанія є справді професіональною в галузі дизайну. Ви перетворили наш простір на місце, де ми тепер із задоволенням проводимо час. Дякуємо!",
    name: "Chiara Moretti",
    location: "Milan, Italy",
  },
  {
    id: 3,
    text: "Працювати з вами — справжнє задоволення. Увага до деталей, креативність і вміння слухати клієнта — все на найвищому рівні.",
    name: "Olena Kovalenko",
    location: "Lviv, Ukraine",
  },
];

export default function TestSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSubmit = () => {
    if (name && phone) { setSubmitted(true); setName(""); setPhone(""); }
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(testimonials.length - 2, i + 1));
  const visible = testimonials.slice(index, index + 2);

  return (
    <section style={{ backgroundColor: "#0F1113", fontFamily: "Montserrat, sans-serif" }} className="w-full">

      {/* ── TOP: CTA ── */}
      <div style={{ padding: "80px 80px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>

        {/* LEFT: heading */}
        <div>
          <p style={{ color: "#CFC7BD", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "24px" }}>
            INSPIRE
          </p>
          <h2 style={{ color: "#F5F3EF", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", margin: 0 }}>
            LET&apos;S<br />
            BRING YOUR<br />
            VISION TO<br />
            LIFE
          </h2>
        </div>

        {/* RIGHT: description + form */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p style={{ color: "#CFC7BD", fontSize: "13px", lineHeight: 1.7, maxWidth: "260px", margin: 0 }}>
            Our experts will be happy to help you create a harmonious space that suits your needs and style.
          </p>

          <div>
            {/* Name */}
            <div style={{ borderBottom: "1px solid rgba(207,199,189,0.4)", marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="YOUR NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%", background: "transparent", border: "none", outline: "none",
                  color: "#F5F3EF", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "16px 0", fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ borderBottom: "1px solid rgba(207,199,189,0.4)" }}>
              <input
                type="tel"
                placeholder="YOUR PHONE"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%", background: "transparent", border: "none", outline: "none",
                  color: "#F5F3EF", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "16px 0", fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            {/* Arrow button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              {submitted ? (
                <span style={{ color: "#CFC7BD", fontSize: "12px", letterSpacing: "0.2em" }}>ДЯКУЄМО!</span>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    background: "transparent", border: "1px solid rgba(207,199,189,0.5)",
                    color: "#CFC7BD", width: "52px", height: "52px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#CFC7BD"; e.currentTarget.style.color = "#0F1113"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#CFC7BD"; }}
                >
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                    <path d="M1 7H21M21 7L15 1M21 7L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: "1px solid rgba(207,199,189,0.12)", margin: "0 80px" }} />

      {/* ── BOTTOM: Testimonials ── */}
      <div style={{ padding: "60px 80px 80px" }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <h3 style={{ color: "#F5F3EF", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
            CLIENTS ABOUT<br />OUR WORK
          </h3>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <button onClick={prev} style={{ background: "none", border: "none", cursor: "pointer", opacity: index === 0 ? 0.25 : 1, transition: "opacity 0.2s" }}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <path d="M35 7H1M1 7L7 1M1 7L7 13" stroke="#CFC7BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={next} style={{ background: "none", border: "none", cursor: "pointer", opacity: index >= testimonials.length - 2 ? 0.25 : 1, transition: "opacity 0.2s" }}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <path d="M1 7H35M35 7L29 1M35 7L29 13" stroke="#CFC7BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(207,199,189,0.12)" }}>
          {visible.map((t) => (
            <div key={t.id} style={{ background: "#0F1113", padding: "40px" }}>
              {/* Big quote mark */}
              <div style={{ color: "#CFC7BD", fontSize: "80px", lineHeight: "60px", fontFamily: "Georgia, serif", marginBottom: "20px", opacity: 0.9 }}>
                &ldquo;
              </div>
              <p style={{ color: "rgba(245,243,239,0.72)", fontSize: "13px", lineHeight: 1.8, marginBottom: "32px" }}>
                {t.text}
              </p>
              <div>
                <p style={{ color: "#F5F3EF", fontSize: "13px", fontWeight: 600, margin: "0 0 4px" }}>{t.name}</p>
                <p style={{ color: "rgba(207,199,189,0.5)", fontSize: "11px", letterSpacing: "0.1em", margin: 0 }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
