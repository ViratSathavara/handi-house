// ─────────────────────────────────────────────────────────────
//  ANATOMY SECTION CONTENT. Every part of the biryani is its own image
//  in /public/anatomy/<file>. Replace any file with a better photo
//  (same name, transparent or black background) and nothing else changes.
//  x / y = centre of the part inside the stage (%), w = width (% of stage).
//  `d` is the desktop layout, `m` the phone layout.
// ─────────────────────────────────────────────────────────────
export interface Place { x: number; y: number; w: number; r: number }
export interface Part {
  id: string;
  file: string; // /public/anatomy/<file>.webp
  name: string;
  note: string;
  d: Place;
  m: Place;
}

export const anatomyIntro = {
  eyebrow: "Anatomy of a dum biryani",
  title: ["Every grain,", "in its place."],
  phases: [
    "Sealed. Ninety minutes of dum.",
    "The lid comes off.",
    "Everything that goes into the handi.",
    "…and back under the lid.",
  ],
};

// the vessel
export const handi = { file: "handi", lid: "handi-lid" };

export const parts: Part[] = [
  { id: "rice", file: "rice-mound", name: "Aged basmati", note: "Parboiled to 70%, then steamed in the handi", d: { x: 50, y: 20, w: 25, r: 0 }, m: { x: 50, y: 22, w: 56, r: 0 } },
  { id: "chicken", file: "chicken-leg", name: "Marinated chicken", note: "Overnight in yoghurt and Kashmiri chilli", d: { x: 17, y: 38, w: 15, r: -12 }, m: { x: 20, y: 44, w: 28, r: -12 } },
  { id: "paneer", file: "paneer-cube", name: "Grilled paneer", note: "For the vegetarian handi", d: { x: 83, y: 38, w: 10, r: 8 }, m: { x: 80, y: 44, w: 19, r: 8 } },
  { id: "onions", file: "fried-onions", name: "Birista", note: "Slow-fried onions, golden not brown", d: { x: 30, y: 15, w: 20, r: -6 }, m: { x: 26, y: 12, w: 38, r: -6 } },
  { id: "saffron", file: "saffron", name: "Saffron milk", note: "Bloomed in warm milk, poured over the top", d: { x: 71, y: 14, w: 14, r: 10 }, m: { x: 76, y: 11, w: 28, r: 10 } },
  { id: "spices", file: "whole-spices", name: "Whole spices", note: "Star anise, cardamom, cloves, cinnamon", d: { x: 13, y: 70, w: 18, r: 0 }, m: { x: 17, y: 62, w: 32, r: 0 } },
  { id: "mint", file: "mint-leaves", name: "Mint", note: "Torn by hand between the layers", d: { x: 87, y: 70, w: 15, r: -8 }, m: { x: 84, y: 62, w: 30, r: -8 } },
  { id: "chili", file: "green-chili", name: "Green chilli", note: "Slit, so the heat slips into the rice", d: { x: 27, y: 56, w: 4.2, r: -30 }, m: { x: 50, y: 40, w: 8, r: 22 } },
];
