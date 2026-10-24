"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = el.current!;
    gsap.set(node, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3" });
    const move = (e: MouseEvent) => {
      node.classList.add("on");
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (t) {
        node.classList.add("hover");
        if (label.current) label.current.textContent = t.dataset.cursor || "";
      } else {
        node.classList.remove("hover");
        if (label.current) label.current.textContent = "";
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="cursor" ref={el} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
