"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes, menu } from "@/lib/data";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mn-title .line", {
        yPercent: 115,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mn-title", start: "top 80%" },
      });
      gsap.from(".mn-row", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mn-list", start: "top 80%" },
      });
      // underline sweep per row as it enters
      gsap.utils.toArray<HTMLElement>(".mn-row").forEach((r) => {
        gsap.fromTo(
          r.querySelector(".mn-rule"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: r, start: "top 90%" } }
        );
      });

      // floating image that follows the cursor
      const pv = preview.current!;
      gsap.set(pv, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
      const xTo = gsap.quickTo(pv, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(pv, "y", { duration: 0.5, ease: "power3" });
      const list = root.current!.querySelector(".mn-list") as HTMLElement;
      const move = (e: MouseEvent) => {
        xTo(e.clientX + 150);
        yTo(e.clientY);
      };
      const enter = () => gsap.to(pv, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      const leave = () => gsap.to(pv, { opacity: 0, scale: 0.6, duration: 0.4, ease: "power3.in" });
      list.addEventListener("mousemove", move);
      list.addEventListener("mouseenter", enter);
      list.addEventListener("mouseleave", leave);

      const arts = gsap.utils.toArray<HTMLElement>(".mn-pv-art");
      gsap.set(arts, { autoAlpha: 0, scale: 0.85 });
      gsap.utils.toArray<HTMLElement>(".mn-row").forEach((r, i) => {
        r.addEventListener("mouseenter", () => {
          gsap.to(arts, { autoAlpha: 0, scale: 0.85, duration: 0.25, overwrite: true });
          gsap.to(arts[menu[i].dish], { autoAlpha: 1, scale: 1, rotate: gsap.utils.random(-8, 8), duration: 0.5, ease: "back.out(1.6)", overwrite: true });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="menu" id="menu" ref={root}>
      <div className="mn-head">
        <div>
          <div className="sp-label">04 — The menu</div>
          <h2 className="mn-title">
            <span className="mask">
              <span className="line">Made for</span>
            </span>
            <span className="mask">
              <span className="line">
                the <em>whole</em> table.
              </span>
            </span>
          </h2>
        </div>
        <p className="mn-note">Eight dishes we would build the whole restaurant around. Hover to see them, or open the full menu below.</p>
      </div>

      <ul className="mn-list">
        {menu.map((m, i) => (
          <li className="mn-row" key={m.name} data-cursor="">
            <span className="mn-i">{String(i + 1).padStart(2, "0")}</span>
            <span className="mn-name">{m.name}</span>
            <span className="mn-desc">{m.desc}</span>
            <span className="mn-tag">{m.tag}</span>
            <span className="mn-price">{m.price}</span>
            <span className="mn-rule" />
          </li>
        ))}
      </ul>

      <div className="mn-preview" ref={preview} aria-hidden="true">
        {dishes.map((d, i) => (
          <div className="mn-pv-art" key={d.slug}>
            <DishArt dish={d} seed={i + 40} particles={0} />
          </div>
        ))}
      </div>
    </section>
  );
}
