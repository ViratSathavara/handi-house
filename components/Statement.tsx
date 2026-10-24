"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "@/lib/data";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 };
      gsap.fromTo(".st-1", { xPercent: -40 }, { xPercent: 0, ease: "none", scrollTrigger: { ...st, end: "center center" } });
      gsap.fromTo(".st-2", { xPercent: 40 }, { xPercent: 0, ease: "none", scrollTrigger: { ...st, end: "center center" } });
      gsap.fromTo(".st-3", { xPercent: -40 }, { xPercent: 0, ease: "none", scrollTrigger: { ...st, end: "center center" } });
      gsap.fromTo(".st-blob", { scale: 0.4, rotate: -20 }, { scale: 1.4, rotate: 40, ease: "none", scrollTrigger: st });
      gsap.fromTo(".st-card.a", { y: 160 }, { y: -120, ease: "none", scrollTrigger: st });
      gsap.fromTo(".st-card.b", { y: 240 }, { y: -200, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="statement" ref={root}>
      <div className="st-blob" aria-hidden="true" />
      <h2 className="st-words">
        <span className="st-1">Butter.</span>
        <span className="st-2 it">Ghee.</span>
        <span className="st-3">Patience.</span>
      </h2>
      <div className="st-card a" aria-hidden="true">
        <DishArt dish={dishes[1]} seed={71} particles={0} />
      </div>
      <div className="st-card b" aria-hidden="true">
        <DishArt dish={dishes[5]} seed={72} particles={0} />
      </div>
    </section>
  );
}
