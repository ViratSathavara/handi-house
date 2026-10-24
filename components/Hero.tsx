"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "@/lib/data";
import { burst, liftLid, scrollToId } from "@/lib/anim";
import DishArt from "./DishArt";

gsap.registerPlugin(ScrollTrigger);
const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero({ go }: { go: boolean }) {
  const root = useRef<HTMLElement>(null);
  const trig = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const N = dishes.length;

  // ── main scroll-scrubbed, pinned timeline ──────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current);
      const copies = q(".copy") as HTMLElement[];
      const stage = q(".dish") as HTMLElement[];
      const words = q(".word") as HTMLElement[];

      // initial states
      gsap.set(words, { transformPerspective: 900, transformOrigin: "50% 100%" });
      gsap.set(words.slice(1), { yPercent: 115, rotateX: -70, opacity: 0 });
      gsap.set(stage.slice(1), { autoAlpha: 0, scale: 0.78, yPercent: 10, rotate: -6, filter: "blur(14px)" });
      gsap.set(copies.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * N * 0.95,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(N - 1, Math.floor(self.progress * N + 0.18));
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });
      trig.current = tl.scrollTrigger as ScrollTrigger;

      for (let i = 0; i < N; i++) {
        const d = stage[i];
        const art = d.querySelector(".art");

        // dish 0: lid lifts, steam rises
        if (i === 0) liftLid(tl, d, 0.04, 0.36);

        // food bursts out of the vessel
        burst(tl, d, i + 0.12, 0.5);
        tl.to(art, { scale: 1.08, duration: 0.7, ease: "power1.out" }, i + 0.1);
        const bimg = d.querySelector(".art-burst");
        if (bimg) tl.fromTo(bimg, { opacity: 0 }, { opacity: 1, duration: 0.35 }, i + 0.2);

        if (i < N - 1) {
          const t0 = i + 0.68;
          const nextLines = copies[i + 1].querySelectorAll(".line");
          const nextRest = copies[i + 1].querySelectorAll(".fx");
          const curLines = copies[i].querySelectorAll(".line");
          const curRest = copies[i].querySelectorAll(".fx");

          // dish out / in
          tl.to(d, { autoAlpha: 0, scale: 1.22, yPercent: -8, rotate: 5, filter: "blur(12px)", duration: 0.3, ease: "power2.in" }, t0);
          tl.to(stage[i + 1], { autoAlpha: 1, scale: 1, yPercent: 0, rotate: 0, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }, t0 + 0.1);

          // giant word flips away / flips in
          tl.to(words[i], { yPercent: -115, rotateX: 70, opacity: 0, duration: 0.3, ease: "power2.in" }, t0);
          tl.to(words[i + 1], { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, t0 + 0.1);

          // copy out / in
          tl.to(curLines, { yPercent: -115, stagger: 0.03, duration: 0.2, ease: "power2.in" }, t0);
          tl.to(curRest, { y: -20, opacity: 0, stagger: 0.02, duration: 0.2, ease: "power2.in" }, t0);
          tl.to(copies[i], { autoAlpha: 0, duration: 0.01 }, t0 + 0.22);
          tl.fromTo(copies[i + 1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, t0 + 0.1);
          tl.fromTo(nextLines, { yPercent: 115 }, { yPercent: 0, stagger: 0.04, duration: 0.24, ease: "power2.out" }, t0 + 0.12);
          tl.fromTo(nextRest, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.24, ease: "power2.out" }, t0 + 0.16);
        }
      }

      // progress line in the footer
      tl.fromTo(q(".hero-progress i"), { scaleX: 0 }, { scaleX: 1, duration: N, ease: "none" }, 0);
      // keep the timeline exactly N long
      tl.to({}, { duration: 0.001 }, N - 0.001);

      // rotating badge
      gsap.to(q(".badge-svg"), { rotate: 360, duration: 18, repeat: -1, ease: "none" });

      // hide intro targets until the loader finishes
      gsap.set(q(".hero-copy"), { opacity: 0, x: -40 });
      gsap.set(q(".hero-stage"), { opacity: 0, scale: 0.88 });
      gsap.set(q(".hero-words"), { opacity: 0, yPercent: 40 });
      gsap.set(q(".hero-index, .badge, .hero-foot"), { opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, [N]);

  // ── intro, plays when the loader is gone ───────────────────
  useEffect(() => {
    if (!go) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(q(".hero-stage"), { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .to(q(".hero-words"), { opacity: 1, yPercent: 0, duration: 1.3 }, 0.25)
        .to(q(".hero-copy"), { opacity: 1, x: 0, duration: 1.1 }, 0.5)
        .to(q(".hero-index, .badge, .hero-foot"), { opacity: 1, duration: 1, stagger: 0.1 }, 0.8);
    }, root);
    return () => ctx.revert();
  }, [go]);

  const jump = (i: number) => {
    const st = trig.current;
    if (!st) return;
    const y = st.start + (i / N) * (st.end - st.start) + 2;
    const l = (window as any).__lenis;
    if (l) l.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-glow" />

      <div className="hero-copy">
        {dishes.map((d, i) => (
          <div className="copy" key={d.slug}>
            <div className="fx hero-eyebrow">● Handi House</div>
            <div className="fx num">
              <span className="num-big">{pad(i + 1)}</span>
              <span className="num-of">/ {pad(N)}</span>
            </div>
            <div className="fx tag">{d.tag}</div>
            <h2 className="title">
              <span className="mask">
                <span className="line">{d.titleA}</span>
              </span>
              <span className="mask">
                <span className="line it">{d.titleB}</span>
              </span>
            </h2>
            <p className="fx desc">{d.desc}</p>
            <div className="fx price-row">
              <span className="price">{d.price}</span>
              <a
                className="chip"
                href="#menu"
                data-cursor="Menu"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#menu");
                }}
              >
                On the menu +
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-stage">
        {dishes.map((d, i) => (
          <div className="dish" key={d.slug}>
            <DishArt dish={d} seed={i + 1} />
          </div>
        ))}
      </div>

      <div className="hero-words" aria-hidden="true">
        {dishes.map((d) => (
          <div className="word" key={d.slug}>
            <span>{d.word}</span>
          </div>
        ))}
      </div>

      <aside className="hero-index">
        <div className="hi-head">The Table</div>
        <ul>
          {dishes.map((d, i) => (
            <li key={d.slug} className={i === active ? "on" : ""}>
              <button onClick={() => jump(i)} data-cursor="Go">
                <em>{pad(i + 1)}</em> {d.titleA} {d.titleB}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="badge" aria-hidden="true">
        <svg className="badge-svg" viewBox="0 0 120 120">
          <defs>
            <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#circ">Dum pukht · sealed · slow-cooked · served at the table ·</textPath>
          </text>
        </svg>
        <span className="badge-dot" />
      </div>

      <div className="hero-foot">
        <span>Scroll to serve the next dish</span>
        <div className="hero-progress">
          <i />
        </div>
        <span className="hi">स्वाद का सफ़र</span>
      </div>
    </section>
  );
}
