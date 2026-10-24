"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const o = { v: 0 };
      const tl = gsap.timeline();
      tl.from(".ld-in", { y: 24, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" });
      tl.to(
        o,
        {
          v: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(o.v));
            if (bar.current) bar.current.style.transform = `scaleX(${o.v / 100})`;
          },
        },
        0.2
      );
      tl.to(".ld-icon", { y: -6, repeat: 5, yoyo: true, duration: 0.4, ease: "sine.inOut" }, 0.4);
      tl.to(".ld-in", { y: -30, opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.in" }, ">0.15");
      tl.to(root.current, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, ">-0.1");
      tl.add(() => onDone(), "-=0.55");
      tl.set(root.current, { display: "none" });
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loader" ref={root}>
      <div className="ld-icon ld-in" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
          <path d="M8 18h24c0 8-5 14-12 14S8 26 8 18Z" fill="#e8742e" />
          <path d="M14 12c-2-3 2-4 0-7M20 12c-2-3 2-4 0-7M26 12c-2-3 2-4 0-7" stroke="#e8742e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="ld-count ld-in">
        <span ref={num}>0</span>
        <sup>%</sup>
      </div>
      <div className="ld-label ld-in">Lifting the lid</div>
      <div className="ld-line ld-in">
        <span ref={bar} />
      </div>
    </div>
  );
}
