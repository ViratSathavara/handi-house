"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { n: 90, l: "minutes on the dum" },
  { n: 11, l: "whole spices" },
  { n: 480, l: "°C in the tandoor" },
  { n: 12, l: "hour marinade" },
];

export default function Visit() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vs-title .line", {
        yPercent: 115,
        rotate: 3,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".vs-title", start: "top 80%" },
      });
      gsap.from(".vs-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".vs-grid", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".vs-n").forEach((el) => {
        const target = parseInt(el.dataset.n || "0", 10);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(o.v));
          },
        });
      });

      // magnetic button
      const btn = root.current!.querySelector(".vs-btn") as HTMLElement;
      const bx = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
      const by = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
      const mm = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        bx((e.clientX - (r.left + r.width / 2)) * 0.35);
        by((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const ml = () => {
        bx(0);
        by(0);
      };
      btn.addEventListener("mousemove", mm);
      btn.addEventListener("mouseleave", ml);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="visit" id="visit" ref={root}>
      <div className="sp-label">06 — Visit</div>
      <h2 className="vs-title">
        <span className="mask">
          <span className="line">Come lift</span>
        </span>
        <span className="mask">
          <span className="line">
            the <em>lid.</em>
          </span>
        </span>
      </h2>

      <div className="vs-stats">
        {stats.map((s) => (
          <div className="vs-stat vs-fade" key={s.l}>
            <span className="vs-n" data-n={s.n}>
              0
            </span>
            <span className="vs-l">{s.l}</span>
          </div>
        ))}
      </div>

      <div className="vs-grid">
        <div className="vs-fade">
          <h4>Find us</h4>
          <p>
            12 Spice Market Lane
            <br />
            Your City, 000000
          </p>
        </div>
        <div className="vs-fade">
          <h4>Hours</h4>
          <p>
            Tue – Sun · 12:00 – 23:00
            <br />
            Monday closed, the handis rest
          </p>
        </div>
        <div className="vs-fade">
          <h4>Reserve</h4>
          <p>
            hello@handihouse.example
            <br />
            +00 000 000 0000
          </p>
        </div>
        <a className="vs-btn vs-fade" href="mailto:hello@handihouse.example" data-cursor="Book">
          Book a table →
        </a>
      </div>

      <footer className="vs-foot">
        <span>© {new Date().getFullYear()} {BRAND}</span>
        <span>Built with Next.js · GSAP · Lenis</span>
      </footer>
    </section>
  );
}
