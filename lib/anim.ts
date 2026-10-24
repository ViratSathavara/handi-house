import gsap from "gsap";

/** Particles inside a DishArt fly outward along their stored vector. */
export function burst(tl: gsap.core.Timeline, root: Element, at: number, dur: number) {
  const ps = root.querySelectorAll<HTMLElement>(".p");
  ps.forEach((p) => {
    const vx = parseFloat(p.dataset.vx || "0");
    const vy = parseFloat(p.dataset.vy || "0");
    const r = parseFloat(p.dataset.r || "0");
    tl.fromTo(
      p,
      { x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 },
      { x: vx, y: vy, scale: 1, opacity: 1, rotate: r, duration: dur, ease: "power3.out" },
      at
    );
  });
}

/** Lift the lid off a handi placeholder. */
export function liftLid(tl: gsap.core.Timeline, root: Element, at: number, dur: number) {
  const lid = root.querySelector(".lid");
  if (!lid) return;
  tl.to(lid, { y: -300, x: 90, rotate: -18, opacity: 0, duration: dur, ease: "power2.inOut" }, at);
}

/** Hindi/latin glyph scramble that resolves into the final string. */
export function scramble(el: HTMLElement, final: string, dur = 0.7) {
  const pool = "अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह0123456789ABCDEFGHJKLMNPRSTUVWXYZ";
  const o = { p: 0 };
  gsap.to(o, {
    p: 1,
    duration: dur,
    ease: "none",
    onUpdate: () => {
      const n = Math.floor(o.p * final.length);
      let s = final.slice(0, n);
      for (let i = n; i < final.length; i++) {
        s += final[i] === " " ? " " : pool[Math.floor(Math.random() * pool.length)];
      }
      el.textContent = s;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

export function lenis(): any {
  return typeof window !== "undefined" ? (window as any).__lenis : null;
}

export function scrollToId(id: string) {
  const l = lenis();
  const el = document.querySelector(id);
  if (!el) return;
  if (l) l.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
