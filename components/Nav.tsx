"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/data";
import { scrollToId } from "@/lib/anim";

const links = [
  ["The Dum", "#story"],
  ["Spices", "#spices"],
  ["Menu", "#menu"],
  ["Tandoor", "#tandoor"],
  ["Visit", "#visit"],
];

export default function Nav({ go }: { go: boolean }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.set(root.current, { opacity: 0, y: -20 });
  }, []);
  useEffect(() => {
    if (go) gsap.to(root.current, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
  }, [go]);

  return (
    <nav className="nav" ref={root}>
      <a
        href="#top"
        className="nav-logo"
        data-cursor=""
        onClick={(e) => {
          e.preventDefault();
          (window as any).__lenis?.scrollTo(0, { duration: 1.8 });
        }}
      >
        <span className="dot" /> {BRAND}
      </a>
      <div className="nav-links">
        {links.map(([l, h]) => (
          <a
            key={h}
            href={h}
            data-cursor=""
            onClick={(e) => {
              e.preventDefault();
              scrollToId(h);
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}
