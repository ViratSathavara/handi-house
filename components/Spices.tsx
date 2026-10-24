"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { spices } from "@/lib/data";
import { scramble } from "@/lib/anim";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

export default function Spices() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sp-title .line", {
        yPercent: 115,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sp-title", start: "top 80%" },
      });

      // slow spin on the spice pile as you scroll
      gsap.to(".sp-art", {
        rotate: 40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // rows light up as they pass the middle of the screen + glyph scramble
      gsap.utils.toArray<HTMLElement>(".sp-row").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 58%",
          end: "bottom 42%",
          onToggle: (self) => row.classList.toggle("on", self.isActive),
          onEnter: () => scramble(row.querySelector(".sp-name") as HTMLElement, spices[i].en, 0.6),
          onEnterBack: () => scramble(row.querySelector(".sp-name") as HTMLElement, spices[i].en, 0.6),
        });
        gsap.from(row, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="spices" id="spices" ref={root}>
      <div className="sp-left">
        <div className="sp-label">03 — In the handi</div>
        <h2 className="sp-title">
          <span className="mask">
            <span className="line">Eleven spices.</span>
          </span>
          <span className="mask">
            <span className="line it">Toasted</span> <span className="line">every</span>
          </span>
          <span className="mask">
            <span className="line">morning.</span>
          </span>
        </h2>
        <div className="sp-art">
          <DishArt image="/dishes/spices.webp" vessel="spices" palette={["#e9b44c", "#7a3a16", "#c4472b", "#7aa65a", "#2a1a10", "#f1dfae"]} seed={5} particles={0} />
        </div>
      </div>
      <ul className="sp-list">
        {spices.map((s, i) => (
          <li className="sp-row" key={s.en} data-cursor="">
            <span className="sp-i">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <span className="sp-name">{s.en}</span>
              <span className="sp-hi">{s.hi}</span>
            </div>
            <p>{s.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
