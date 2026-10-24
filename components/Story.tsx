"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Every handi starts the night before. Meat rests in yoghurt and red chilli, basmati is washed until the water runs clear, spices are toasted until the kitchen smells like a wedding. Then we leave it alone on low fire, sealed shut. That is dum, the oldest trick in Hyderabad, and the only one we use.";
const EM = new Set(["dum,", "alone", "sealed", "wedding."]);

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".sw");
      gsap.fromTo(
        words,
        { opacity: 0.14, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: ".story-text", start: "top 82%", end: "bottom 48%", scrub: true },
        }
      );
      gsap.from(".story-label", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={root}>
      <div className="story-label">01 — The Dum</div>
      <p className="story-text">
        {TEXT.split(" ").map((w, i) => (
          <span className={`sw ${EM.has(w) ? "em" : ""}`} key={i}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
