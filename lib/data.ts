// ─────────────────────────────────────────────────────────────
//  ALL CONTENT LIVES HERE. Swap names, copy, prices, images.
//  Dish photos are real, round-cropped photos in /public/dishes
//  (credits in /CREDITS.md). Replace them with your own food photos
//  at any time; without `image` the site draws a built-in placeholder.
// ─────────────────────────────────────────────────────────────
export type Vessel = "handi" | "kadai" | "plate" | "glass" | "bread" | "spices";

export interface Dish {
  slug: string;
  word: string; // giant word at the bottom of the hero
  titleA: string;
  titleB: string; // italic, gold
  tag: string;
  desc: string;
  price: string;
  vessel: Vessel;
  food: string; // main food colour of the placeholder
  palette: string[]; // particle colours
  image?: string; // closed / served frame (transparent)
  burst?: string; // exploded frame with flying ingredients (transparent)
  sprites?: string[]; // real ingredient cut-outs that fly out on scroll
}

export const BRAND = "Handi House";

export const dishes: Dish[] = [
  {
    slug: "biryani",
    image: "/dishes/biryani.webp",
    burst: "/dishes/biryani-burst.webp",
    sprites: ["mint_1", "mint_2", "chili_1", "chili_3", "rice", "rice"],
    word: "Biryani",
    titleA: "Chicken Dum",
    titleB: "Biryani",
    tag: "Signature · Dum",
    desc: "Bone-in chicken and saffron basmati, sealed under dough and cooked slow for ninety minutes. Served with salan and raita.",
    price: "$21.90",
    vessel: "handi",
    food: "#f1dfae",
    palette: ["#f6ecd0", "#e9b44c", "#7aa65a", "#c4472b", "#fff6dc"],
  },
  {
    slug: "makhani",
    image: "/dishes/makhani.webp",
    burst: "/dishes/makhani-burst.webp",
    sprites: ["chili_2", "mint_0", "mint_4", "d_cream", "d_orange", "chili_4"],
    word: "Makhani",
    titleA: "Butter",
    titleB: "Chicken",
    tag: "Most ordered",
    desc: "Tandoor-charred chicken folded into a velvet tomato-makhani, finished with a cube of cold white butter.",
    price: "$22.90",
    vessel: "kadai",
    food: "#d9622b",
    palette: ["#e8742e", "#f4d9a0", "#c23a22", "#7aa65a", "#fff1d6"],
  },
  {
    slug: "tandoori",
    image: "/dishes/tandoori.webp",
    burst: "/dishes/tandoori-burst.webp",
    sprites: ["chili_3", "mint_2", "chili_1", "d_orange", "mint_4", "chili_2"],
    word: "Tandoori",
    titleA: "Tandoori",
    titleB: "Chicken",
    tag: "From the tandoor",
    desc: "Twelve-hour marinade, Kashmiri chilli, charcoal. Charred at the edges, juicy to the bone.",
    price: "$18.90",
    vessel: "plate",
    food: "#b5441f",
    palette: ["#c8552a", "#f2d27a", "#e9e2c8", "#7aa65a", "#7a2410"],
  },
  {
    slug: "seekh",
    image: "/dishes/seekh.webp",
    burst: "/dishes/seekh-burst.webp",
    sprites: ["chili_4", "mint_3", "chili_0", "mint_1", "d_gold", "chili_2"],
    word: "Seekh",
    titleA: "Lamb Seekh",
    titleB: "Kebab",
    tag: "Charcoal grill",
    desc: "Hand-minced lamb pressed onto iron skewers, brushed with ghee the moment it leaves the fire.",
    price: "$18.90",
    vessel: "plate",
    food: "#7a4a2a",
    palette: ["#8a5a32", "#a8c46a", "#e8e0c8", "#4f7a3a", "#d9a35a"],
  },
  {
    slug: "tikka",
    image: "/dishes/tikka.webp",
    burst: "/dishes/tikka-burst.webp",
    sprites: ["chili_1", "mint_2", "chili_3", "mint_4", "d_orange", "d_gold"],
    word: "Tikka",
    titleA: "Paneer",
    titleB: "Tikka",
    tag: "Vegetarian",
    desc: "Fresh paneer, capsicum and onion, smoky from the clay oven and glazed with hung-curd marinade.",
    price: "$17.90",
    vessel: "plate",
    food: "#e8a23a",
    palette: ["#f0b04a", "#d94a2e", "#7aa65a", "#f6e9b8", "#e56a2a"],
  },
  {
    slug: "dal",
    image: "/dishes/dal.webp",
    burst: "/dishes/dal-burst.webp",
    sprites: ["chili_2", "mint_1", "d_cream", "chili_4", "mint_5", "d_gold"],
    word: "Dal",
    titleA: "Dal",
    titleB: "Makhani",
    tag: "Slow-cooked overnight",
    desc: "Black lentils simmered on the lowest flame all night, swirled with cream and white butter.",
    price: "$17.90",
    vessel: "kadai",
    food: "#6a3a1c",
    palette: ["#8a5224", "#f3e6c8", "#3a2414", "#d9a35a", "#fff6e0"],
  },
  {
    slug: "naan",
    image: "/dishes/naan.webp",
    burst: "/dishes/naan-burst.webp",
    sprites: ["mint_3", "mint_5", "d_gold", "mint_2", "mint_0", "d_cream"],
    word: "Naan",
    titleA: "Garlic Butter",
    titleB: "Naan",
    tag: "From the clay oven",
    desc: "Blistered against the tandoor wall, brushed with garlic butter and fresh coriander.",
    price: "$5.50",
    vessel: "bread",
    food: "#e9c98a",
    palette: ["#f4e2b0", "#7aa65a", "#fff6dc", "#d9a35a", "#b88a44"],
  },
  {
    slug: "lassi",
    image: "/dishes/lassi.webp",
    burst: "/dishes/lassi-burst.webp",
    sprites: ["d_gold", "mint_1", "d_cream", "mint_4", "d_orange", "d_gold"],
    word: "Lassi",
    titleA: "Mango",
    titleB: "Lassi",
    tag: "To cool down",
    desc: "Alphonso mango churned with thick curd, cardamom and pistachio. The only way to end.",
    price: "$7.50",
    vessel: "glass",
    food: "#f2b53a",
    palette: ["#f6c04a", "#e89a2a", "#cfe6ee", "#7aa65a", "#fff2c8"],
  },
];

export const spices = [
  { en: "Saffron", hi: "केसर", note: "Bloomed in warm milk. The colour and the perfume." },
  { en: "Green Cardamom", hi: "छोटी इलायची", note: "Sweet, floral, cracked open just before it goes in." },
  { en: "Black Cardamom", hi: "बड़ी इलायची", note: "Smoky and camphor-cool. One pod per handi, no more." },
  { en: "Clove", hi: "लौंग", note: "Warmth at the back of the throat, a second after you swallow." },
  { en: "Cinnamon", hi: "दालचीनी", note: "Cassia bark, broken into the rice water so every grain carries it." },
  { en: "Star Anise", hi: "चक्र फूल", note: "A quiet liquorice sweetness that balances the chilli." },
  { en: "Bay Leaf", hi: "तेज पत्ता", note: "Two leaves, fried in the ghee first. They perfume the fat that coats the rice." },
  { en: "Mace", hi: "जावित्री", note: "The Hyderabadi signature. Floral, delicate, unmistakable." },
  { en: "Shahi Jeera", hi: "शाही जीरा", note: "Thinner and sweeter than common cumin. Worth the hunt." },
  { en: "Nutmeg", hi: "जायफल", note: "Grated fresh, barely, over the top layer." },
  { en: "Black Pepper", hi: "काली मिर्च", note: "Cracked coarse. It bites late." },
];

export const menu = [
  { name: "Chicken Dum Biryani", desc: "Bone-in chicken, saffron basmati, salan & raita", tag: "Signature", price: "$21.90", dish: 0 },
  { name: "Butter Chicken", desc: "Tandoor-charred chicken, tomato-makhani, a cube of white butter", tag: "Most ordered", price: "$22.90", dish: 1 },
  { name: "Tandoori Chicken", desc: "Overnight marinade, charcoal fire, lemon and onion", tag: "From the tandoor", price: "$18.90", dish: 2 },
  { name: "Lamb Seekh Kebab", desc: "Hand-minced lamb on iron skewers, green chutney", tag: "Charcoal", price: "$18.90", dish: 3 },
  { name: "Paneer Tikka", desc: "Fresh paneer, capsicum & onion, smoky masala", tag: "Vegetarian", price: "$17.90", dish: 4 },
  { name: "Dal Makhani", desc: "Black lentils simmered overnight, cream, butter", tag: "Slow-cooked", price: "$17.90", dish: 5 },
  { name: "Garlic Butter Naan", desc: "Blistered on the tandoor wall, garlic, coriander", tag: "Bread", price: "$5.50", dish: 6 },
  { name: "Mango Lassi", desc: "Alphonso mango, thick curd, cardamom, pistachio", tag: "Drink", price: "$7.50", dish: 7 },
];

export const steps = [
  { n: "01", name: "Marinate", text: "Overnight in yoghurt, red chilli and ginger-garlic. The meat has to be tender before the fire ever touches it.", vessel: "plate" as Vessel, food: "#b5441f", image: "/dishes/tikka.webp" },
  { n: "02", name: "Parboil", text: "Basmati is washed until the water runs clear, then cooked to exactly seventy percent with whole spices.", vessel: "kadai" as Vessel, food: "#efe2b8", image: "/dishes/biryani.webp" },
  { n: "03", name: "Layer", text: "Meat, rice, fried onions, mint, saffron milk, ghee. Repeat. Every layer is placed by hand.", vessel: "handi" as Vessel, food: "#f1dfae", image: "/dishes/biryani-burst.webp" },
  { n: "04", name: "Seal", text: "A rope of dough is pressed around the rim. Nothing escapes: not steam, not aroma, not shortcuts.", vessel: "handi" as Vessel, food: "#e9c98a", image: "/dishes/dal.webp" },
  { n: "05", name: "Lift", text: "Ninety minutes on the lowest flame, then the seal is cracked at your table. That is the moment.", vessel: "handi" as Vessel, food: "#f1dfae", image: "/dishes/makhani-burst.webp" },
];

export const marquee = [
  ["Dum Pukht", "Saffron", "Seal", "Slow", "Ghee"],
  ["Ghee", "Kewra", "Mirchi ka Salan", "Burani Raita", "Dum"],
];
