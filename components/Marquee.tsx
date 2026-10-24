"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marquee } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".mq-row");
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(rows[0], { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo(rows[1], { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });

      // scroll-velocity skew on the whole block
      const inner = root.current!.querySelector(".mq-inner");
      const skew = gsap.quickTo(inner, "skewX", { duration: 0.5, ease: "power3" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skew(gsap.utils.clamp(-9, 9, self.getVelocity() / -260)),
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="marquee" ref={root}>
      <div className="mq-inner">
        {marquee.map((row, r) => (
          <div className="mq-row" key={r}>
            {[...row, ...row, ...row].map((w, i) => (
              <span className="mq-item" key={i}>
                <span className={`mq-word v${(i + r) % 3}`}>{w}</span>
                <span className="mq-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
