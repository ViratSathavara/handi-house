"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "@/lib/data";
import { burst, liftLid } from "@/lib/anim";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);

/** Pinned cinematic: the handi opens and the food erupts behind the headline. */
export default function Reveal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stage = root.current!.querySelector(".rv-stage") as HTMLElement;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.6,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(stage, { scale: 0.55, yPercent: 14 }, { scale: 1.15, yPercent: 0, duration: 3 }, 0);
      liftLid(tl, stage, 0.6, 0.8);
      burst(tl, stage, 1.1, 1.1);
      tl.fromTo(".rv-line", { yPercent: 115 }, { yPercent: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }, 1.4);
      tl.to(".rv-line", { yPercent: -115, stagger: 0.1, duration: 0.6, ease: "power2.in" }, 2.5);
      tl.to(stage, { opacity: 0, duration: 0.5 }, 2.6);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="reveal" ref={root}>
      <div className="rv-stage">
        <DishArt dish={dishes[0]} seed={11} particles={34} />
      </div>
      <h2 className="rv-title">
        <span className="mask">
          <span className="rv-line">Opened at the table.</span>
        </span>
        <span className="mask">
          <span className="rv-line it">Never before.</span>
        </span>
      </h2>
    </section>
  );
}
