"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "@/lib/data";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { d: 2, name: "Tandoori Chicken", sub: "Half or full, charred at the edges." },
  { d: 3, name: "Seekh Kebab", sub: "A spoon of ghee, a second of sizzle." },
  { d: 4, name: "Paneer Tikka", sub: "Smoked, soft, never rubbery." },
];

export default function Tandoor() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".td-title .line", {
        yPercent: 115,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".td-title", start: "top 80%" },
      });

      // temperature count-up
      const o = { v: 0 };
      gsap.to(o, {
        v: 480,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".td-temp", start: "top 85%", once: true },
        onUpdate: () => {
          const el = root.current!.querySelector(".td-num");
          if (el) el.textContent = String(Math.round(o.v));
        },
      });

      // each card drifts at its own speed
      gsap.utils.toArray<HTMLElement>(".td-card").forEach((c, i) => {
        gsap.fromTo(
          c,
          { y: 80 + i * 50 },
          { y: -60 - i * 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.fromTo(
          c.querySelector(".art"),
          { scale: 1.25 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom 40%", scrub: true } }
        );
      });

      // embers
      gsap.utils.toArray<HTMLElement>(".ember").forEach((e) => {
        gsap.set(e, { x: gsap.utils.random(0, window.innerWidth), y: gsap.utils.random(0, 200) });
        gsap.to(e, {
          y: "-=" + gsap.utils.random(400, 800),
          x: "+=" + gsap.utils.random(-120, 120),
          opacity: 0,
          duration: gsap.utils.random(4, 9),
          repeat: -1,
          delay: gsap.utils.random(0, 6),
          ease: "none",
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="tandoor" id="tandoor" ref={root}>
      <div className="embers" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => (
          <span className="ember" key={i} />
        ))}
      </div>
      <div className="td-head">
        <div>
          <div className="sp-label">05 — The tandoor</div>
          <h2 className="td-title">
            <span className="mask">
              <span className="line">Fire does</span>
            </span>
            <span className="mask">
              <span className="line it">the talking.</span>
            </span>
          </h2>
        </div>
        <div className="td-temp">
          <span className="td-num">0</span>
          <span className="td-unit">°C</span>
          <p>Clay oven, charcoal-fed, hotter than anything else in the kitchen.</p>
        </div>
      </div>
      <div className="td-cards">
        {cards.map((c, i) => (
          <article className="td-card" key={c.name} data-cursor="">
            <DishArt dish={dishes[c.d]} seed={c.d + 60} particles={0} />
            <div className="td-cap">
              <h3>{c.name}</h3>
              <p>{c.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
