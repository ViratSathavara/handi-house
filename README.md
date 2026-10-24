# Handi House — scroll-driven restaurant site (Next.js 15 + GSAP + Lenis)

```bash
npm install
npm run dev      # http://localhost:3000
```

## Where things are
| What | File |
|---|---|
| All copy, prices, dishes, spices, menu | `lib/data.ts` |
| Pinned hero timeline (the big one) | `components/Hero.tsx` |
| Burst / lid-lift / scramble helpers | `lib/anim.ts` |
| Placeholder dish renderer | `components/DishArt.tsx` |
| Styling | `app/globals.css` |

## Using real food photos
Export transparent PNG cut-outs (about 1600×1600) and put them in `public/dishes/`.
Then in `lib/data.ts` set, per dish:

```ts
image: "/dishes/biryani.png",
burst: "/dishes/biryani-burst.png", // optional "exploded" frame that cross-fades in on scroll
```
Without images the site draws a placeholder plate + particles that burst on scroll.

## Tuning the feel
- Scroll length of the hero: `Hero.tsx` → `end: () => "+=" + innerHeight * N * 0.95`
- Scrub smoothness: `scrub: 0.7` (higher = floatier)
- Smooth-scroll inertia: `Experience.tsx` → `new Lenis({ duration: 1.25 })`
- Giant word style: `.word span` in `globals.css`
