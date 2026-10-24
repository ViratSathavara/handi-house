"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { anatomyIntro, handi, parts } from "@/lib/anatomy";

gsap.registerPlugin(ScrollTrigger);

const GOLD_TEXT = "bg-gradient-to-b from-[#f6e3a1] via-[#d4af37] to-[#8a6d1d] bg-clip-text text-transparent";
const GRAINS = ["rice-grain", "rice-grain-b", "rice-grain-c", "rice-grain-d"];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOutBack = (t: number) => {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function Anatomy() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current!;
    const st = stage.current!;
    const cv = canvas.current!;
    const mm = gsap.matchMedia();
    let tickFn: (() => void) | null = null;

    mm.add(
      { desktop: "(min-width: 768px)", phone: "(max-width: 767px)", still: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const isPhone = !!ctx.conditions?.phone;
        const still = !!ctx.conditions?.still;
        const q = gsap.utils.selector(el);
        const potImg = q(".an-pot")[0] as HTMLImageElement;
        const lid = q(".an-lid")[0] as HTMLElement;
        const items = q(".an-part") as HTMLElement[];
        const labels = q(".an-label") as HTMLElement[];
        const phases = q(".an-phase") as HTMLElement[];

        // ---- grain sprites -------------------------------------------------
        const sprites = GRAINS.map((n) => {
          const im = new Image();
          im.src = `/anatomy/${n}.webp`;
          return im;
        });
        const N = isPhone ? 90 : 170;
        const grains = Array.from({ length: N }, (_, i) => {
          const a = Math.random() * Math.PI;
          const rad = 0.18 + Math.random() * 0.62;
          return {
            tx: -Math.cos(a) * rad, // -1..1 of stage half width
            ty: -(0.12 + Math.sin(a) * rad * 0.85), // up from the opening, in stage heights
            rot: (Math.random() - 0.5) * 6.5,
            spin: (Math.random() - 0.5) * 2,
            size: (isPhone ? 0.05 : 0.034) * (0.7 + Math.random() * 0.7),
            delay: Math.random() * 0.12,
            back: Math.random() * 0.06,
            sprite: i % sprites.length,
            ph: Math.random() * 6.28,
          };
        });

        let W = 0, H = 0, ox = 0, oy = 0, dpr = 1;
        let lidRest = { x: 0, y: 0 };
        let tl: gsap.core.Timeline | null = null;

        const layout = () => {
          const r = st.getBoundingClientRect();
          W = r.width;
          H = r.height;
          dpr = Math.min(2, window.devicePixelRatio || 1);
          cv.width = Math.round(W * dpr);
          cv.height = Math.round(H * dpr);
          const pr = potImg.getBoundingClientRect();
          ox = pr.left - r.left + pr.width / 2;
          oy = pr.top - r.top + pr.height * 0.13;
          const lr = lid.getBoundingClientRect();
          // lid is laid out at x:0,y:0 first, then moved to sit on the opening
          lidRest = { x: ox - lid.offsetWidth / 2, y: oy - lid.offsetHeight * 0.72 };
          void lr;
        };

        const build = () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          layout();
          gsap.set(lid, { x: lidRest.x, y: lidRest.y, rotate: 0, opacity: 1 });

          items.forEach((it, i) => {
            const p = parts[i];
            const pl = isPhone ? p.m : p.d;
            gsap.set(it, { xPercent: -50, yPercent: -50, left: pl.x + "%", top: pl.y + "%", width: pl.w + "%" });
          });

          tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => "+=" + Math.round(window.innerHeight * (isPhone ? 4.2 : 4.8)),
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (still) {
            // reduced motion: show the exploded view, no scrubbing
            items.forEach((it) => gsap.set(it, { opacity: 1, scale: 1 }));
            labels.forEach((l) => gsap.set(l, { opacity: 1 }));
            gsap.set(lid, { y: lidRest.y - H * 0.5, rotate: -10, opacity: 0 });
            phases.forEach((ph, i) => gsap.set(ph, { opacity: i === 2 ? 1 : 0 }));
            tl.scrollTrigger?.kill();
            return;
          }

          // phase captions
          phases.forEach((ph, i) => {
            const stamps = [0, 0.1, 0.3, 0.86, 1.01];
            gsap.set(ph, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 14 });
            if (i > 0) tl!.to(ph, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, stamps[i]);
            tl!.to(ph, { opacity: 0, y: -14, duration: 0.03, ease: "power2.in" }, stamps[i + 1] - 0.03);
          });

          // lid lifts off, floats, then settles back
          tl.to(lid, { y: lidRest.y - H * 0.5, x: lidRest.x + W * 0.04, rotate: -10, opacity: 0, duration: 0.18, ease: "power2.inOut" }, 0.1);
          tl.fromTo(lid, { y: lidRest.y - H * 0.5, x: lidRest.x + W * 0.04, rotate: -10, opacity: 0 }, { y: lidRest.y, x: lidRest.x, rotate: 0, opacity: 1, duration: 0.1, ease: "power2.in", immediateRender: false }, 0.9);

          // every part erupts from the opening, one by one
          items.forEach((it, i) => {
            const p = parts[i];
            const pl = isPhone ? p.m : p.d;
            const tx = (pl.x / 100) * W;
            const ty = (pl.y / 100) * H;
            const t0 = 0.28 + i * 0.026;
            tl!.fromTo(
              it,
              { x: ox - tx, y: oy - ty, scale: 0.15, opacity: 0, rotate: pl.r - 140 },
              { x: 0, y: 0, scale: 1, opacity: 1, rotate: pl.r, duration: 0.2, ease: "back.out(1.5)", immediateRender: true },
              t0
            );
            tl!.to(
              it,
              { x: ox - tx, y: oy - ty, scale: 0.15, opacity: 0, rotate: pl.r + 120, duration: 0.11, ease: "power2.in" },
              0.84 + i * 0.011
            );
          });

          // labels sit under the real size of each part
          labels.forEach((l, i) => {
            const pl = isPhone ? parts[i].m : parts[i].d;
            gsap.set(l, { left: pl.x + "%", top: (pl.y / 100) * H + items[i].offsetHeight / 2 + 6 });
          });
          labels.forEach((l, i) => {
            gsap.set(l, { opacity: 0, y: 10 });
            tl!.to(l, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.56 + i * 0.02);
            tl!.to(l, { opacity: 0, duration: 0.04 }, 0.8);
          });

          // pot breathes while everything is out
          tl.to(potImg, { scale: 1.03, transformOrigin: "50% 100%", duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.3);
        };

        // ---- canvas drawing ----------------------------------------------
        const g2 = cv.getContext("2d")!;
        let shown = still ? 0.5 : 0;
        tickFn = () => {
          const target = still ? 0.5 : tl?.progress() ?? 0;
          shown += (target - shown) * 0.2;
          const p = shown;
          const t = performance.now() / 1000;
          g2.setTransform(dpr, 0, 0, dpr, 0, 0);
          g2.clearRect(0, 0, W, H);
          for (const g of grains) {
            const out = easeOutBack(clamp((p - 0.28 - g.delay) / 0.3));
            const back = easeInOut(clamp((p - 0.84 - g.back) / 0.11));
            const k = out * (1 - back);
            if (k <= 0.002) continue;
            const x = ox + g.tx * W * 0.5 * k + Math.sin(t * 0.9 + g.ph) * 3 * k;
            const y = oy + g.ty * H * k + Math.cos(t * 0.8 + g.ph) * 4 * k - Math.sin(Math.PI * clamp(k)) * H * 0.06;
            const s = g.size * W * (0.4 + 0.6 * clamp(k));
            const im = sprites[g.sprite];
            if (!im.complete || !im.naturalWidth) continue;
            const h = (s * im.naturalHeight) / im.naturalWidth;
            g2.save();
            g2.globalAlpha = clamp(k * 1.6);
            g2.translate(x, y);
            g2.rotate(g.rot * k + g.spin * t * 0.2);
            g2.drawImage(im, -s / 2, -h / 2, s, h);
            g2.restore();
          }
        };
        gsap.ticker.add(tickFn);

        const onImg = () => {
          ScrollTrigger.refresh();
        };
        if (potImg.complete) build();
        else potImg.addEventListener("load", () => { build(); onImg(); }, { once: true });
        let rz = 0;
        const onResize = () => {
          window.clearTimeout(rz);
          rz = window.setTimeout(() => {
            build();
            ScrollTrigger.refresh();
          }, 200);
        };
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          window.clearTimeout(rz);
          if (tickFn) gsap.ticker.remove(tickFn);
          tl?.scrollTrigger?.kill();
          tl?.kill();
        };
      }
    );
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="anatomy" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_62%,rgba(212,175,55,.14),transparent_62%)]" />

      <header className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pt-[88px] md:pt-[96px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold md:text-[11px]">{anatomyIntro.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className={`font-display text-[clamp(30px,5vw,64px)] leading-[0.98] ${GOLD_TEXT}`}>
            {anatomyIntro.title[0]} <span className="font-serif italic">{anatomyIntro.title[1]}</span>
          </h2>
          <div className="relative h-6 min-w-[300px] md:min-w-[420px] md:h-7 md:text-right">
            {anatomyIntro.phases.map((p, i) => (
              <p key={i} className="an-phase absolute inset-x-0 top-0 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70 md:text-xs">
                {p}
              </p>
            ))}
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto mt-2 flex w-full max-w-[1280px] flex-1 items-center px-3 pb-6 md:px-5">
        <div ref={stage} className="relative mx-auto aspect-[3/4] [--ar:0.75] md:aspect-[16/10] md:[--ar:1.6]" style={{ width: "min(100%, calc((100svh - 240px) * var(--ar)))" }}>
          {/* vessel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="an-pot absolute bottom-0 left-1/2 w-[64%] -translate-x-1/2 select-none md:w-[34%]"
            src={`/anatomy/${handi.file}.webp`}
            alt="Copper handi"
            draggable={false}
          />

          {/* parts */}
          {parts.map((p) => (
            <div key={p.id} className="an-part pointer-events-none absolute z-[2]" style={{ opacity: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-auto w-full select-none drop-shadow-[0_14px_16px_rgba(0,0,0,.6)]" src={`/anatomy/${p.file}.webp`} alt={p.name} draggable={false} />
            </div>
          ))}

          {/* canvas of loose rice grains */}
          <canvas ref={canvas} className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />

          {/* lid on top of everything at rest */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="an-lid pointer-events-none absolute left-0 top-0 z-[4] w-[56%] select-none md:w-[30%]"
            src={`/anatomy/${handi.lid}.webp`}
            alt="Copper handi lid"
            draggable={false}
          />

          {/* labels */}
          {parts.map((p) => (
            <div
              key={p.id}
              className="an-label pointer-events-none absolute z-[5] w-[34%] -translate-x-1/2 text-center md:w-[16%]"
              style={{ opacity: 0 }}
            >
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-gold md:text-[10px]">{p.name}</span>
              <span className="mt-1 hidden text-[11px] leading-snug text-cream/60 md:block">{p.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
