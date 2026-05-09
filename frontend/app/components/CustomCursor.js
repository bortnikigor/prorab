"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const ringScale = useRef(1);
  const hovering = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setActive(true);

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      hovering.current = !!e.target.closest("a, button, [data-card], [role='button']");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    let raf;
    function tick() {
      const { x: mx, y: my } = mousePos.current;
      const targetScale = hovering.current ? 1.8 : 1;

      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;
      ringScale.current += (targetScale - ringScale.current) * 0.15;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${ringScale.current})`;

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#CFC7BD",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(207,199,189,0.75)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
        }}
      />
    </>
  );
}
