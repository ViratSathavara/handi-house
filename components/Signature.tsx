"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "@/lib/data";
import { scrollToId } from "@/lib/anim";

gsap.registerPlugin(ScrollTrigger);

interface Floater { src: string; w: number; x: string; y: string; depth: number; rot: number }
interface Plate {
  id: string;
  dish: number;
  kicker: string;
  title: [string, string];
  lead: string;
  notes: [string, string][];
  floaters: Floater[];
  flip?: boolean;
}

const GOLD_TEXT = "bg-gradient-to-b from-[#f6e3a1] via-[#d4af37] to-[#8a6d1d] bg-clip-text text-transparent";

const plates: Plate[] = [
  {
    id: "sig-biryani",
    dish: 0,
    kicker: "Signature · Dum Pukht",
    title: ["Chicken Dum", "Biryani"],
    lead:
      "Bone-in chicken marinated overnight in yoghurt and Kashmiri chilli, layered with aged basmati, fried onions, mint and saffron milk. The handi is sealed with dough and cooked for ninety minutes on the lowest flame, then cracked open at your table.",
    notes: [
      ["Rice", "Aged 1121 basmati, 70% parboiled"],
      ["Spice", "Mace, black cardamom, shahi jeera"],
      ["Served with", "Mirchi ka salan & burani raita"],
    ],
    floaters: [
      { src: "mint_1", w: 120, x: "4%", y: "14%", depth: 1.1, rot: -24 },
      { src: "chili_1", w: 54, x: "86%", y: "10%", depth: 1.5, rot: 28 },
      { src: "rice", w: 70, x: "78%", y: "62%", depth: 0.7, rot: 12 },
      { src: "mint_2", w: 96, x: "88%", y: "72%", depth: 1.3, rot: 40 },
      { src: "rice", w: 58, x: "10%", y: "70%", depth: 0.9, rot: -35 },
      { src: "chili_3", w: 50, x: "16%", y: "86%", depth: 1.6, rot: -40 },
    ],
  },
  {
    id: "sig-makhani",
    dish: 1,
    kicker: "Most ordered · Tandoor + Gravy",
    title: ["Butter", "Chicken"],
    lead:
      "Chicken charred in the clay tandoor, then folded into a velvet makhani of slow-simmered tomato, cashew and kasuri methi. Finished at the pass with a cube of cold white butter and a ribbon of cream that melts into the gravy as it reaches you.",
    notes: [
      ["Gravy", "Tomato, cashew, fenugreek, cream"],
      ["Heat", "Mild and velvety, spice level on request"],
      ["Pairs with", "Garlic butter naan or jeera rice"],
    ],
    floaters: [
      { src: "d_orange", w: 46, x: "6%", y: "20%", depth: 1.4, rot: 0 },
      { src: "mint_4", w: 110, x: "84%", y: "8%", depth: 1.1, rot: 22 },
      { src: "chili_2", w: 52, x: "6%", y: "72%", depth: 1.6, rot: -30 },
      { src: "d_cream", w: 40, x: "90%", y: "56%", depth: 0.8, rot: 0 },
      { src: "d_gold", w: 34, x: "20%", y: "8%", depth: 0.7, rot: 0 },
      { src: "mint_0", w: 92, x: "82%", y: "80%", depth: 1.3, rot: -18 },
    ],
    flip: true,
  },
];

export default function Signature() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        q(".sg").forEach((sec) => {
          const s = gsap.utils.selector(sec);
          const pot = s(".sg-pot")[0];
          const burst = s(".sg-burst")[0];
          const floats = s(".sg-f") as HTMLElement[];

          // copy rises in once
          gsap.from(s(".sg-in"), {
            y: 48, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.09,
            scrollTrigger: { trigger: sec, start: "top 70%" },
          });

          // the pot scales up from small as the section arrives, then drifts upward on exit
          gsap.fromTo(pot, { scale: 0.55, y: 90, opacity: 0.2 }, {
            scale: 1.04, y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: sec, start: "top 85%", end: "center center", scrub: 0.6 },
          });

          // exploded frame reveals once the pot has landed
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: sec, start: "top 45%", end: "center 30%", scrub: 0.7 },
            })
            .fromTo(burst, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.02 }, 0)
            .to(pot, { opacity: 0 }, 0.15);

          // ingredients pop out one after another...
          gsap.fromTo(
            floats,
            { scale: 0, opacity: 0, y: 60 },
            {
              scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "back.out(1.8)", stagger: 0.08,
              scrollTrigger: { trigger: sec, start: "top 40%", toggleActions: "play none none reverse" },
            }
          );
          // ...and then drift at their own speed (parallax)
          floats.forEach((el) => {
            const depth = parseFloat(el.dataset.depth || "1");
            const img = el.querySelector("img");
            if (!img) return;
            gsap.to(img, {
              y: -140 * depth, rotate: depth * 24, ease: "none",
              scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 },
            });
          });

          // glow behind the dish swells with scroll
          gsap.fromTo(s(".sg-glow"), { opacity: 0.25, scale: 0.8 }, {
            opacity: 1, scale: 1.15, ease: "none",
            scrollTrigger: { trigger: sec, start: "top bottom", end: "center center", scrub: 0.8 },
          });
        });
      });
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="signature" className="relative bg-ink text-cream">
      <div className="mx-auto max-w-[1280px] px-5 pt-24 text-center md:pt-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">The two we are known for</p>
        <h2 className={`mt-5 font-display text-[clamp(40px,7vw,96px)] leading-[0.98] ${GOLD_TEXT}`}>Signature plates</h2>
      </div>

      {plates.map((p) => {
        const d = dishes[p.dish];
        return (
          <article
            key={p.id}
            id={p.id}
            className="sg relative mx-auto grid min-h-[100svh] max-w-[1280px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-6 md:py-28"
          >
            {/* stage */}
            <div className={`relative mx-auto aspect-square w-full max-w-[620px] ${p.flip ? "md:order-2" : ""}`}>
              <div
                className="sg-glow pointer-events-none absolute inset-[-12%] rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(212,175,55,.38) 0%, rgba(212,175,55,0) 62%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="sg-pot absolute inset-0 h-full w-full object-contain will-change-transform" src={d.image} alt={`${d.titleA} ${d.titleB}`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="sg-burst absolute inset-0 h-full w-full object-contain opacity-0 will-change-transform" src={d.burst} alt="" aria-hidden="true" />
              {p.floaters.map((f, i) => (
                <span key={i} className="sg-f pointer-events-none absolute" style={{ left: f.x, top: f.y, width: f.w }} data-depth={f.depth}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/sprites/${f.src}.webp`}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full drop-shadow-[0_12px_14px_rgba(0,0,0,.6)]"
                    style={{ transform: `rotate(${f.rot}deg)` }}
                  />
                </span>
              ))}
            </div>

            {/* copy */}
            <div className={`relative z-10 ${p.flip ? "md:order-1 md:pr-10" : "md:pl-10"}`}>
              <p className="sg-in font-mono text-[11px] uppercase tracking-[0.28em] text-gold">{p.kicker}</p>
              <h3 className="sg-in mt-4 font-display text-[clamp(38px,6vw,84px)] leading-[0.95]">
                <span className="block">{p.title[0]}</span>
                <span className={`block font-serif italic ${GOLD_TEXT}`}>{p.title[1]}</span>
              </h3>
              <p className="sg-in mt-6 max-w-[52ch] text-[15px] leading-[1.75] text-cream/70 md:text-base">{p.lead}</p>

              <dl className="sg-in mt-8 divide-y divide-white/10 border-y border-white/10">
                {p.notes.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">{k}</dt>
                    <dd className="text-sm text-cream/85">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="sg-in mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">Per plate</span>
                  <span className={`font-serif text-5xl ${GOLD_TEXT}`}>{d.price}</span>
                </div>
                <a
                  href="#visit"
                  data-cursor="Book"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#visit");
                  }}
                  className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ink"
                >
                  Reserve a table <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
