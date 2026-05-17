"use client";

import ContactForm from "./ContactForm";

// ─────────────────────────────────────────────
//  Shared constants
// ─────────────────────────────────────────────
const GOLD  = "#c9a96e";
const BG1   = "#131210";
const BG2   = "#161410";
const BG3   = "#151210";
const TEXT  = "#f0ece4";
const MUTED = "#9a9080";

const sectionBase = {
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

// ── Corner frame ──────────────────────────────
function Frame() {
  return (
    <svg
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:2 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline points="4,12 4,4 12,4"    fill="none" stroke={GOLD} strokeWidth="0.4" vectorEffect="non-scaling-stroke"/>
      <polyline points="88,4 96,4 96,12"   fill="none" stroke={GOLD} strokeWidth="0.4" vectorEffect="non-scaling-stroke"/>
      <polyline points="4,88 4,96 12,96"   fill="none" stroke={GOLD} strokeWidth="0.4" vectorEffect="non-scaling-stroke"/>
      <polyline points="88,96 96,96 96,88" fill="none" stroke={GOLD} strokeWidth="0.4" vectorEffect="non-scaling-stroke"/>
      <line x1="4"  y1="10" x2="96" y2="10" stroke={GOLD} strokeWidth="0.12" vectorEffect="non-scaling-stroke" strokeOpacity="0.3"/>
      <line x1="4"  y1="90" x2="96" y2="90" stroke={GOLD} strokeWidth="0.12" vectorEffect="non-scaling-stroke" strokeOpacity="0.3"/>
      <line x1="4"  y1="10" x2="4"  y2="90" stroke={GOLD} strokeWidth="0.12" vectorEffect="non-scaling-stroke" strokeOpacity="0.3"/>
      <line x1="96" y1="10" x2="96" y2="90" stroke={GOLD} strokeWidth="0.12" vectorEffect="non-scaling-stroke" strokeOpacity="0.3"/>
    </svg>
  );
}

// ── Grid background ───────────────────────────
function Grid({ bg = BG1 }) {
  return (
    <div style={{ position:"absolute", inset:0, background:bg, zIndex:0 }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.055 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c8b99a" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pat)"/>
      </svg>
    </div>
  );
}

const Divider = ({ mb = "24px" }) => (
  <div style={{ width:"48px", height:"1px", background:GOLD, opacity:0.5, marginBottom:mb }}/>
);

// ═════════════════════════════════════════════
//  BANNER 1 — "Дизайн — це лише намір"
// ═════════════════════════════════════════════
export function Banner1({ language }) {
  const c = language === "EN" ? {
    line1: "Design is just intention.",
    line2: "Reality is built",
    line3: "on the construction site.",
    sub:   "We are those who ensure\nthat design becomes reality\nwithout distortion.",
  } : {
    line1: "Дизайн — це лише намір.",
    line2: "Реальність створюється",
    line3: "на будівництві.",
    sub:   "Ми — ті, хто відповідає за те,\nщоб дизайн став реальністю\nбез спотворень.",
  };

  return (
    <section style={{ ...sectionBase, background: BG1 }}>
      <Grid bg={BG1}/>
      <Frame/>
      {/* Background photo layer */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgb(19,18,16) 0%, transparent 40%)',
          zIndex: 1,
        }} />
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=75"
          alt="Architectural drawings"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </div>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Ремонт квартир у Києві — від дизайну до реалізації</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"860px", padding:"0 8vw", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"40px" }}>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(18px,2.2vw,28px)", fontWeight:300, color:TEXT,  letterSpacing:"0.02em", margin:"0 0 2px" }}>{c.line1}</p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(18px,2.2vw,28px)", fontWeight:600, color:GOLD,  letterSpacing:"0.02em", margin:0 }}>{c.line2}</p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(18px,2.2vw,28px)", fontWeight:600, color:GOLD,  letterSpacing:"0.02em", margin:"0 0 28px" }}>{c.line3}</p>
          <Divider/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(11px,1vw,13px)", fontWeight:300, color:MUTED, letterSpacing:"0.03em", lineHeight:1.85, margin:0, whiteSpace:"pre-line" }}>{c.sub}</p>
        </div>
        {/* Deco */}
        <div style={{ flexShrink:0, width:"130px", height:"130px", position:"relative", opacity:0.28 }}>
          <div style={{ position:"absolute", inset:0, border:`0.5px solid ${GOLD}` }}/>
          <div style={{ position:"absolute", inset:"14px", border:`0.5px solid ${GOLD}` }}/>
          <div style={{ position:"absolute", inset:"28px", border:`0.5px solid ${GOLD}`, background:`${GOLD}12` }}/>
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 130 130">
            <line x1="0" y1="0" x2="130" y2="130" stroke={GOLD} strokeWidth="0.5" opacity="0.45"/>
            <line x1="130" y1="0" x2="0" y2="130" stroke={GOLD} strokeWidth="0.5" opacity="0.45"/>
            <circle cx="65" cy="65" r="4" fill={GOLD} opacity="0.7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════
//  BANNER 2 — "Там, де більшість спрощує"
// ═════════════════════════════════════════════
export function Banner2({ language }) {
  const c = language === "EN" ? {
    overline: "WHERE MOST",
    struck:   '"simplify"',
    bridge:   "we deliver",
    main:     "We deliver.",
    sub:      "We ensure the interior looks exactly\nas it was designed.",
    b1: "No simplifications.",
    b2: "No loss of detail.",
    b3: 'No "almost right".',
  } : {
    overline: "ТАМ, ДЕ БІЛЬШІСТЬ",
    struck:   "«спрощує»",
    bridge:   "ми реалізуємо",
    main:     "Ми реалізуємо.",
    sub:      "Ми відповідаємо за те, щоб інтер'єр виглядав\nсаме так, як був задуманий.",
    b1: "Без спрощень.",
    b2: "Без втрати деталей.",
    b3: "Без «майже так».",
  };

  return (
    <section style={{ ...sectionBase, background: BG2 }}>
      <Grid bg={BG2}/>
      <Frame/>
      {/* Background photo layer */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgb(19,18,16) 0%, transparent 40%)',
          zIndex: 1,
        }} />
        <img
          src="https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778965561/7c3d0ba37a4d3ac08163adf0d0671911_sg0jzg.jpg"
          alt="Interior detail materials"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </div>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Ремонт під ключ без спрощень та компромісів</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"860px", padding:"0 8vw", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"40px" }}>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", fontWeight:400, color:"#8a7a60", letterSpacing:"0.3em", margin:"0 0 14px" }}>{c.overline}</p>
          <div style={{ position:"relative", display:"inline-block", marginBottom:"14px" }}>
            <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(22px,2.8vw,36px)", fontWeight:300, color:"#5a4e3a", margin:0, letterSpacing:"-0.02em" }}>{c.struck}</p>
            <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1.5px", background:"#8a6a3a", opacity:0.7 }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"18px" }}>
            <div style={{ width:"40px", height:"1px", background:GOLD, opacity:0.6 }}/>
            <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", color:GOLD, opacity:0.8, letterSpacing:"0.15em", margin:0 }}>{c.bridge}</p>
          </div>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(20px,2.4vw,30px)", fontWeight:700, color:GOLD, margin:"0 0 22px", letterSpacing:"-0.02em" }}>{c.main}</p>
          <Divider mb="18px"/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(11px,1vw,13px)", fontWeight:300, color:MUTED, letterSpacing:"0.03em", lineHeight:1.85, margin:"0 0 20px", whiteSpace:"pre-line" }}>{c.sub}</p>
          {[{ t:c.b1, op:0.85 }, { t:c.b2, op:0.55 }, { t:c.b3, op:0.35 }].map(({ t, op }) => (
            <p key={t} style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(10px,0.9vw,12px)", fontWeight:600, color:GOLD, opacity:op, letterSpacing:"0.12em", margin:"0 0 7px" }}>{t}</p>
          ))}
        </div>
        {/* Deco */}
        <svg style={{ flexShrink:0, opacity:0.22 }} width="80" height="260" viewBox="0 0 80 260">
          <line x1="40" y1="0" x2="40" y2="260" stroke={GOLD} strokeWidth="0.5"/>
          {[0,27,54,81,108,135,162,189,216,243,260].map((y,i) => (
            <line key={i} x1={i%3===0?33:36} y1={y} x2={47} y2={y} stroke={GOLD} strokeWidth="0.5"/>
          ))}
          <rect x="5"  y="10" width="46" height="46" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          <rect x="15" y="20" width="26" height="26" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="5"  y1="10" x2="51" y2="56" stroke={GOLD} strokeWidth="0.5" opacity="0.5"/>
          <line x1="51" y1="10" x2="5"  y2="56" stroke={GOLD} strokeWidth="0.5" opacity="0.5"/>
          <circle cx="28" cy="33" r="3" fill={GOLD} opacity="0.8"/>
          <polygon points="5,180 51,180 28,218" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.6"/>
          <line x1="28" y1="180" x2="28" y2="218" stroke={GOLD} strokeWidth="0.5" opacity="0.4"/>
        </svg>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════
//  BANNER 3 — "Ви не керуєте ремонтом"
// ═════════════════════════════════════════════
export function Banner3({ language }) {
  const c = language === "EN" ? {
    dim:   "You don't manage the renovation.",
    main1: "You get",
    main2: "the result.",
    sub1:  "We take on the entire implementation process —",
    sub2:  "from estimate to final handover.",
  } : {
    dim:   "Ви не керуєте ремонтом.",
    main1: "Ви отримуєте",
    main2: "результат.",
    sub1:  "Ми беремо на себе весь процес реалізації —",
    sub2:  "від кошторису до фінальної здачі.",
  };

  return (
    <section style={{ ...sectionBase, background: BG3 }}>
      <Grid bg={BG3}/>
      <Frame/>
      {/* Background photo layer */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgb(19,18,16) 0%, transparent 40%)',
          zIndex: 1,
        }} />
        <img
          src="https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1778308479/1b482142b6c947d39ed08334814a00d2_ab116b1052.jpg"
          alt="Interior renovation result"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </div>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Повний цикл ремонту від кошторису до здачі</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"860px", padding:"0 8vw", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"40px" }}>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(16px,2vw,24px)", fontWeight:300, color:"#6a6258", letterSpacing:"0.02em", margin:"0 0 20px" }}>{c.dim}</p>
          <div style={{ width:"40px", height:"1px", background:GOLD, opacity:0.5, marginBottom:"20px" }}/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(22px,2.8vw,34px)", fontWeight:700, color:TEXT, letterSpacing:"-0.02em", margin:0 }}>{c.main1}</p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(22px,2.8vw,34px)", fontWeight:700, color:GOLD, letterSpacing:"-0.02em", margin:"0 0 28px" }}>{c.main2}</p>
          <Divider/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(11px,1vw,13px)", fontWeight:300, color:MUTED, letterSpacing:"0.03em", lineHeight:1.85, margin:0 }}>{c.sub1}<br/>{c.sub2}</p>
        </div>
        {/* Deco: target circles */}
        <svg style={{ flexShrink:0, opacity:0.2 }} width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="75" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          <circle cx="80" cy="80" r="52" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          <circle cx="80" cy="80" r="30" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          <circle cx="80" cy="80" r="5"  fill={GOLD} opacity="0.6"/>
          <line x1="5"  y1="80" x2="155" y2="80" stroke={GOLD} strokeWidth="0.3" opacity="0.4"/>
          <line x1="80" y1="5"  x2="80"  y2="155" stroke={GOLD} strokeWidth="0.3" opacity="0.4"/>
        </svg>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════
//  BANNER 4 — "Результат передбачуваний"
// ═════════════════════════════════════════════
export function Banner4({ language }) {
  const isEN = language === "EN";
  const overline = isEN ? "OUR TERMS" : "НАШІ УМОВИ РОБОТИ";
  const h1 = isEN ? "The result is" : "Результат";
  const h2 = isEN ? "predictable." : "передбачуваний.";

  const cards = isEN ? [
    { num:"95%",         label:"estimate\naccuracy",        note:"no price surprises" },
    { num:"Contract",    label:"we fix\nobligations",       note:"for each stage" },
    { num:"Stage\npay",  label:"you pay only\nfor done work",note:"" },
    { num:"2 years",     label:"warranty\non all work",     note:"in writing" },
  ] : [
    { num:"95%",             label:"точність\nкошторису",       note:"без сюрпризів у ціні" },
    { num:"Договір",         label:"фіксуємо\nзобов'язання",    note:"на кожен етап" },
    { num:"Поетапна\nоплата",label:"платите лише\nза зроблене", note:"" },
    { num:"2 роки",          label:"гарантія\nна всі роботи",   note:"письмово" },
  ];

  return (
    <section style={{ ...sectionBase, background: BG1 }}>
      <Grid bg={BG1}/>
      <Frame/>
      {/* Background photo layer */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgb(19,18,16) 0%, transparent 40%)',
          zIndex: 1,
        }} />
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=75"
          alt="Contract signing"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </div>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Умови співпраці — договір, гарантія, поетапна оплата</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"860px", padding:"0 8vw" }}>
        <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", fontWeight:400, color:"#8a7a60", letterSpacing:"0.3em", margin:"0 0 14px" }}>{overline}</p>
        <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(20px,2.4vw,30px)", fontWeight:700, color:TEXT, letterSpacing:"-0.01em", margin:"0 0 4px" }}>{h1}</p>
        <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(20px,2.4vw,30px)", fontWeight:300, color:GOLD, letterSpacing:"-0.01em", margin:"0 0 28px" }}>{h2}</p>
        <div style={{ height:"0.5px", background:GOLD, opacity:0.2, marginBottom:"24px" }}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
          {cards.map(({ num, label, note }, i) => (
            <div key={i} style={{ background:"#1e1c18", border:`0.5px solid rgba(201,169,110,0.25)`, borderRadius:"2px", padding:"20px 16px 16px", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:GOLD, opacity:[0.9,0.7,0.5,0.35][i] }}/>
              <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(14px,1.5vw,20px)", fontWeight:700, color:GOLD, margin:"0 0 8px", whiteSpace:"pre-line", lineHeight:1.2 }}>{num}</p>
              <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.75vw,11px)", fontWeight:400, color:MUTED, letterSpacing:"0.04em", margin:0, lineHeight:1.6, whiteSpace:"pre-line" }}>{label}</p>
              {note ? <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(8px,0.65vw,9px)", fontWeight:300, color:"#6a6258", letterSpacing:"0.03em", margin:"8px 0 0" }}>{note}</p> : null}
            </div>
          ))}
        </div>
        <div style={{ height:"0.5px", background:GOLD, opacity:0.2, marginTop:"24px" }}/>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════
//  BANNER 5 — Галерея
// ═════════════════════════════════════════════
export function Banner5({ language }) {
  const isEN = language === "EN";

  // Замініть на ваші реальні фото з Cloudinary
  const photos = [
    "https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1779002956/25-02-28_317_yymrik.heic",
    "https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1779003358/25-02-28_289_tag1ix.heic",
    "https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1779003360/25-02-28_214_otnm2t.heic",
    "https://res.cloudinary.com/dpcqf9y8l/image/upload/q_auto/f_auto/v1779002668/%D0%9C%D0%B0%D0%B8%CC%86%D1%81%D1%82%D0%B5%D1%80_%D1%81%D0%BF%D0%B0%D0%BB%D1%8C%D0%BD%D1%8F-51_htpaa8.heic",
  ];

  return (
    <section style={{ ...sectionBase, background: BG2 }}>
      <Grid bg={BG2}/>
      <Frame/>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Наші проекти — ремонт квартир та офісів у Києві</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"900px", padding:"0 8vw" }}>

        {/* Heading */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"24px" }}>
          <div style={{ maxWidth:"400px" }}>
            <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", color:"#8a7a60", letterSpacing:"0.3em", margin:"0 0 12px" }}>
              {isEN ? "OUR PROJECTS" : "НАШІ ОБ'ЄКТИ"}
            </p>
            <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(16px,1.8vw,22px)", fontWeight:300, color:TEXT, lineHeight:1.45, margin:0 }}>
              {isEN ? (
                <>That's why our projects look<br/><strong style={{ fontWeight:700, color:GOLD }}>just like the visualisations.</strong></>
              ) : (
                <>Саме тому наші об'єкти виглядають так,<br/><strong style={{ fontWeight:700, color:GOLD }}>як на візуалізаціях.</strong></>
              )}
            </p>
          </div>
          <div style={{ width:"1px", height:"56px", background:GOLD, opacity:0.35, flexShrink:0 }}/>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gridTemplateRows:"160px 130px", gap:"6px" }}>
          {/* Big photo — spans both rows */}
          <a href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ display:"block", gridRow:"1/3", borderRadius:"2px", overflow:"hidden", background:"#2a2520", cursor:"pointer" }}>
            <img src={photos[0]} alt="project 1" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          </a>
          {/* 3 small photos */}
          {photos.slice(1, 4).map((src, i) => (
            <a key={i} href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ display:"block", borderRadius:"2px", overflow:"hidden", background:"#2a2520", cursor:"pointer" }}>
              <img src={src} alt={`project ${i+2}`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </a>
          ))}
          {/* Overlay card "+more" */}
          <a href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ display:"flex", borderRadius:"2px", background:"#1e1c18", border:`0.5px solid rgba(201,169,110,0.2)`, alignItems:"center", justifyContent:"center", cursor:"pointer", textDecoration:"none" }}>
            <span style={{ fontFamily:"Montserrat,sans-serif", fontSize:"12px", fontWeight:600, color:GOLD, letterSpacing:"0.15em" }}>
              {isEN ? "+ MORE" : "+ ЩЕ ФОТО"}
            </span>
          </a>
        </div>

        {/* Caption */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginTop:"16px" }}>
          <div style={{ flex:1, height:"0.5px", background:GOLD, opacity:0.22 }}/>
          <a href="https://www.instagram.com/prorabkiev" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.75vw,10px)", color:"#6a6258", letterSpacing:"0.15em", margin:0, whiteSpace:"nowrap", textDecoration:"none" }}>
            {isEN ? "VIEW ALL PROJECTS" : "ДИВИТИСЬ УСІ РОБОТИ"}
          </a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <div style={{ flex:1, height:"0.5px", background:GOLD, opacity:0.22 }}/>
        </div>

      </div>
    </section>
  );
}

// ═════════════════════════════════════════════
//  BANNER 6 — Контакти
// ═════════════════════════════════════════════
export function Banner6({ t, language }) {
  const isEN = language === "EN";

  return (
    <section style={{ ...sectionBase, background: BG1 }}>
      <Grid bg={BG1}/>
      <Frame/>
      <h2 style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>Контакти — замовити ремонт у Києві</h2>
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"860px", padding:"0 8vw", display:"flex", alignItems:"center", gap:"60px" }}>

        {/* LEFT */}
        <div style={{ flex:1 }}>
          <div style={{ height:"0.5px", background:GOLD, opacity:0.25, marginBottom:"28px" }}/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", color:"#8a7a60", letterSpacing:"0.3em", margin:"0 0 16px" }}>
            {isEN ? "CONTACT" : "ЗВ'ЯЗОК"}
          </p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(20px,2.2vw,28px)", fontWeight:300, color:TEXT, lineHeight:1.35, margin:"0 0 4px" }}>
            {isEN ? "Let's discuss" : "Обговоримо"}
          </p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(20px,2.2vw,28px)", fontWeight:700, color:GOLD, lineHeight:1.35, margin:"0 0 24px" }}>
            {isEN ? "your project." : "ваш проєкт."}
          </p>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(11px,1vw,13px)", fontWeight:300, color:MUTED, lineHeight:1.85, margin:0, whiteSpace:"pre-line" }}>
            {isEN
              ? "If our approach resonates with you —\nfill out the form and we'll get\nback to you."
              : "Якщо наш підхід вам близький —\nзаповніть форму і ми зв'яжемося\nз вами."}
          </p>
          <div style={{ height:"0.5px", background:GOLD, opacity:0.25, marginTop:"28px" }}/>
        </div>

        {/* RIGHT — ContactForm */}
        <div style={{ width:"320px", flexShrink:0 }}>
          <div style={{ height:"0.5px", background:GOLD, opacity:0.25, marginBottom:"28px" }}/>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(9px,0.8vw,10px)", color:"#8a7a60", letterSpacing:"0.3em", margin:"0 0 24px" }}>
            {isEN ? "CONTACT FORM" : "ФОРМА ЗВ'ЯЗКУ"}
          </p>
          <ContactForm t={t} titleSize="0px" inputSize="13px" inputPadding="10px 0" gap="18px" hideTitle/>
          <div style={{ height:"0.5px", background:GOLD, opacity:0.25, marginTop:"28px" }}/>
        </div>

      </div>
    </section>
  );
}
