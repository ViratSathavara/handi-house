"use client";
import { useId, useMemo } from "react";
import type { Dish, Vessel } from "@/lib/data";

function rng(seed: number) {
  let a = seed + 0x6d2b79f5;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Props {
  dish?: Dish;
  vessel?: Vessel;
  image?: string;
  food?: string;
  palette?: string[];
  seed?: number;
  particles?: number;
  className?: string;
}

/**
 * Renders a dish. If dish.image exists → real PNG cut-out (+ optional burst frame).
 * Otherwise → an SVG placeholder with particles (.p) that GSAP bursts on scroll.
 */
export default function DishArt({ dish, vessel, image, food, palette, seed = 1, particles = 22, className = "" }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const v = dish?.vessel ?? vessel ?? "plate";
  const f = dish?.food ?? food ?? "#d9622b";
  const pal = dish?.palette ?? palette ?? ["#f4d9a0", "#e8742e", "#7aa65a", "#fff1d6"];

  const parts = useMemo(() => {
    const r = rng(seed * 97 + 13);
    const out = [];
    for (let i = 0; i < particles; i++) {
      const ang = r() * Math.PI * 2;
      const dist = 150 + r() * 230;
      out.push({
        vx: Math.round(Math.cos(ang) * dist * 1.15),
        vy: Math.round(Math.sin(ang) * dist * 0.85 - 40),
        rot: Math.round((r() - 0.5) * 540),
        size: Math.round(8 + r() * 20),
        color: pal[Math.floor(r() * pal.length)],
        leaf: r() > 0.5,
      });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, particles, pal.join()]);

  const src = dish?.image ?? image;
  const real = !!src;

  return (
    <div className={`art ${className}`} data-vessel={v}>
      {real ? (
        <>
          <img className="art-img" src={src} alt={dish ? dish.titleA + " " + dish.titleB : ""} draggable={false} />
          {dish?.burst && <img className="art-burst" src={dish.burst} alt="" draggable={false} />}
        </>
      ) : (
        <>
          <svg className="art-svg" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <linearGradient id={`cu${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f0a35a" />
                <stop offset=".45" stopColor="#a64d1b" />
                <stop offset="1" stopColor="#3d1a09" />
              </linearGradient>
              <linearGradient id={`lid${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6c07a" />
                <stop offset=".5" stopColor="#b9622a" />
                <stop offset="1" stopColor="#5a2810" />
              </linearGradient>
              <linearGradient id={`glass${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={f} />
                <stop offset="1" stopColor="#b36d12" />
              </linearGradient>
              <radialGradient id={`plate${uid}`} cx=".5" cy=".4" r=".7">
                <stop offset="0" stopColor="#2c2c32" />
                <stop offset="1" stopColor="#0f0f12" />
              </radialGradient>
              <filter id={`blur${uid}`}>
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <ellipse cx="300" cy="520" rx="200" ry="26" fill="rgba(0,0,0,.55)" />
            {v === "handi" && (
              <g>
                <path d="M105 300 C105 455 190 525 300 525 C410 525 495 455 495 300 Z" fill={`url(#cu${uid})`} />
                <ellipse cx="300" cy="300" rx="195" ry="36" fill="#6b2f12" />
                <path className="food" d="M128 300 Q300 190 472 300 Q300 340 128 300 Z" fill={f} />
                <g opacity=".5" fill="#fff">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <circle key={i} cx={170 + ((i * 53) % 260)} cy={262 + ((i * 29) % 36)} r="3" />
                  ))}
                </g>
                <g className="lid">
                  <ellipse cx="300" cy="292" rx="205" ry="38" fill="#7a3a16" />
                  <path d="M112 292 Q300 105 488 292 Z" fill={`url(#lid${uid})`} />
                  <circle cx="300" cy="188" r="17" fill="#f2b172" />
                </g>
              </g>
            )}
            {v === "kadai" && (
              <g>
                <path d="M60 300 Q60 495 300 505 Q540 495 540 300 Z" fill={`url(#cu${uid})`} />
                <path d="M62 290 C10 290 10 360 62 372" stroke="#8a4318" strokeWidth="14" fill="none" strokeLinecap="round" />
                <path d="M538 290 C590 290 590 360 538 372" stroke="#8a4318" strokeWidth="14" fill="none" strokeLinecap="round" />
                <ellipse cx="300" cy="300" rx="242" ry="52" fill="#7a3a16" />
                <ellipse cx="300" cy="304" rx="226" ry="42" fill={f} />
                <path d="M150 304 C210 270 260 335 320 300 C380 268 420 330 460 300" stroke="#fff2d8" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".85" />
                <ellipse cx="300" cy="298" rx="30" ry="12" fill="#fff6dc" />
              </g>
            )}
            {v === "plate" && (
              <g>
                <ellipse cx="300" cy="430" rx="270" ry="82" fill={`url(#plate${uid})`} />
                <ellipse cx="300" cy="424" rx="215" ry="58" fill="#17171b" />
                <g transform="rotate(-12 300 360)">
                  <rect x="160" y="300" width="150" height="66" rx="30" fill={f} />
                  <rect x="285" y="320" width="150" height="66" rx="30" fill={f} />
                  <rect x="210" y="350" width="170" height="60" rx="28" fill={f} opacity=".9" />
                </g>
                <g stroke="#2a0e05" strokeWidth="5" strokeLinecap="round" opacity=".55">
                  <path d="M190 322 l30 14 M240 318 l30 14 M320 345 l30 14 M370 342 l28 14" />
                </g>
                <ellipse cx="170" cy="440" rx="44" ry="14" fill="none" stroke="#e9dcc0" strokeWidth="9" />
                <ellipse cx="420" cy="448" rx="38" ry="12" fill="none" stroke="#e9dcc0" strokeWidth="9" />
                <path d="M452 414 q40 -6 46 30 q-40 10 -46 -30 Z" fill="#c9d85a" />
              </g>
            )}
            {v === "glass" && (
              <g>
                <path d="M190 120 L410 120 L376 500 Q300 524 224 500 Z" fill="rgba(210,230,240,.18)" stroke="rgba(255,255,255,.35)" strokeWidth="4" />
                <path d="M200 190 L400 190 L370 492 Q300 514 230 492 Z" fill={`url(#glass${uid})`} />
                <path d="M200 190 Q250 160 300 190 T400 190" fill={f} />
                <rect x="250" y="260" width="48" height="48" rx="8" fill="rgba(220,240,250,.55)" transform="rotate(-14 274 284)" />
                <rect x="320" y="330" width="42" height="42" rx="8" fill="rgba(220,240,250,.5)" transform="rotate(12 340 350)" />
                <path d="M220 150 L224 470" stroke="rgba(255,255,255,.4)" strokeWidth="8" strokeLinecap="round" />
              </g>
            )}
            {v === "bread" && (
              <g>
                <path d="M110 330 C100 230 220 160 320 170 C440 180 510 260 490 360 C470 450 340 490 240 470 C150 452 118 400 110 330 Z" fill={f} />
                <path d="M140 330 C140 250 230 200 320 205 C420 212 470 280 455 350" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="10" strokeLinecap="round" />
                <g fill="#4a2410" opacity=".55">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <ellipse key={i} cx={170 + ((i * 71) % 280)} cy={230 + ((i * 47) % 200)} rx="12" ry="7" />
                  ))}
                </g>
                <g fill="#6fa04a">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <path key={i} d={`M${200 + ((i * 63) % 240)} ${250 + ((i * 41) % 150)} q10 -12 20 0 q-10 12 -20 0 Z`} />
                  ))}
                </g>
              </g>
            )}
            {v === "spices" && (
              <g>
                {Array.from({ length: 40 }).map((_, i) => {
                  const r = rng(i + 3)();
                  const r2 = rng(i + 77)();
                  return (
                    <circle key={i} cx={120 + r * 360} cy={150 + r2 * 330} r={6 + ((i * 7) % 14)} fill={pal[i % pal.length]} opacity=".92" />
                  );
                })}
              </g>
            )}
            <g className="steam" filter={`url(#blur${uid})`} fill="none" stroke="rgba(255,255,255,.42)" strokeWidth="16" strokeLinecap="round">
              <path d="M240 250 C210 200 270 170 240 110" />
              <path d="M300 240 C270 190 330 150 300 80" />
              <path d="M360 250 C330 205 390 175 360 120" />
            </g>
          </svg>
          <div className="art-particles">
            {parts.map((p, i) => (
              <span
                key={i}
                className="p"
                data-vx={p.vx}
                data-vy={p.vy}
                data-r={p.rot}
                style={{
                  width: p.size,
                  height: p.leaf ? p.size * 0.6 : p.size,
                  background: p.color,
                  borderRadius: p.leaf ? "60% 0 60% 0" : "50%",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
