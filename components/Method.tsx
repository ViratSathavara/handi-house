"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/data";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

/** Pinned section that scrolls sideways through five steps. */
export default function Method() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 800px)", () => {
        const dist = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const el = root.current!.querySelector(".mt-count");
              if (el) el.textContent = String(Math.min(5, Math.floor(self.progress * 5) + 1)).padStart(2, "0") + " / 05";
            },
          },
        });
        // art parallax inside each panel
        gsap.utils.toArray<HTMLElement>(".mt-art").forEach((a) => {
          gsap.fromTo(
            a,
            { xPercent: 22 },
            {
              xPercent: -22,
              ease: "none",
              scrollTrigger: { trigger: a.parentElement, containerAnimation: tween, start: "left 100%", end: "right 0%", scrub: true },
            }
          );
        });
        gsap.utils.toArray<HTMLElement>(".mt-ghost").forEach((g) => {
          gsap.fromTo(
            g,
            { xPercent: -30 },
            {
              xPercent: 30,
              ease: "none",
              scrollTrigger: { trigger: g.parentElement, containerAnimation: tween, start: "left 100%", end: "right 0%", scrub: true },
            }
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="method" ref={root}>
      <div className="mt-hud">
        <span>02 — Five steps · one lid</span>
        <span className="mt-count">01 / 05</span>
      </div>
      <div className="mt-track" ref={track}>
        <div className="mt-intro">
          <h2>
            Ninety minutes <br />
            you will <em>never</em> <br />
            see us skip.
          </h2>
          <p>Scroll sideways through the handi. This is the whole method. No shortcuts, no pressure cookers, no reheated pots.</p>
        </div>
        {steps.map((s, i) => (
          <article className="mt-panel" key={s.n}>
            <span className="mt-ghost">{s.n}</span>
            <div className="mt-art">
              <DishArt image={s.image} vessel={s.vessel} food={s.food} seed={i + 21} particles={10} />
            </div>
            <div className="mt-text">
              <span className="mt-n">{s.n}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
