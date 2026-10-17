export type MenuCategory = "meals" | "snacks" | "drinks" | "desserts";

export type MenuFilter = "all" | MenuCategory;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Price per unit in Philippine pesos (PHP). */
  price: number;
  category: MenuCategory;
  image: string;
  imageAlt: string;
  featured?: boolean;
  badge?: string;
};

export const MENU_CATEGORIES: ReadonlyArray<{
  id: MenuFilter;
  label: string;
  blurb: string;
}> = [
  { id: "all", label: "All", blurb: "Everything on the menu" },
  { id: "meals", label: "Meals", blurb: "Rice bowls and mains" },
  { id: "snacks", label: "Snacks", blurb: "Small plates to share" },
  { id: "drinks", label: "Drinks", blurb: "Cold and hot beverages" },
  { id: "desserts", label: "Desserts", blurb: "Sweet endings" },
];

const unsplash = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const SITE_IMAGES = {
  hero: {
    src: unsplash("photo-1414235077428-338989a2e8c0", 1600),
    alt: "A dark table set with shared Filipino-style dishes and warm lighting",
  },
  about: {
    src: unsplash("photo-1540189549336-e6e99c3679fe", 1200),
    alt: "A colorful plated dish garnished with fresh herbs",
  },
} as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "adobo-rice-bowl",
    name: "Adobo Rice Bowl",
    description:
      "Slow-braised pork belly in soy, vinegar, and garlic, served over steamed jasmine rice with a soft egg.",
    price: 245,
    category: "meals",
    image: unsplash("photo-1504674900247-0877df9cc836"),
    imageAlt: "A hearty rice bowl topped with braised meat and a soft egg",
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "chicken-inasal-plate",
    name: "Chicken Inasal Plate",
    description:
      "Char-grilled chicken thigh marinated in calamansi and lemongrass, with pickled papaya and garlic rice.",
    price: 285,
    category: "meals",
    image: unsplash("photo-1414235077428-338989a2e8c0"),
    imageAlt: "Char-grilled chicken pieces on a wooden serving board",
    featured: true,
  },
  {
    id: "beef-tapa-silog",
    name: "Beef Tapa Silog",
    description:
      "Sweet-cured beef tapa with garlic fried rice and a sunny-side-up egg. A classic Filipino breakfast.",
    price: 265,
    category: "meals",
    image: unsplash("photo-1544025162-d76694265947"),
    imageAlt: "Sliced cured beef served beside fried rice and an egg",
  },
  {
    id: "pork-sisig-sizzler",
    name: "Pork Sisig Sizzler",
    description:
      "Sizzling chopped pork with onion, chili, and calamansi, finished with a splash of citrus. Served on cast iron.",
    price: 295,
    category: "meals",
    image: unsplash("photo-1432139555190-58524dae6a55"),
    imageAlt: "A sizzling skillet of chopped, seasoned pork",
    featured: true,
  },
  {
    id: "seafood-paella",
    name: "Seafood Paella",
    description:
      "Saffron rice simmered with prawns, mussels, and squid, brightened with roasted peppers and lemon.",
    price: 520,
    category: "meals",
    image: unsplash("photo-1476224203421-9ac39bcb3327"),
    imageAlt: "A shallow pan of saffron rice with seafood and lemon wedges",
  },
  {
    id: "lumpia-shanghai",
    name: "Crispy Lumpia Shanghai",
    description:
      "Hand-rolled pork and vegetable spring rolls fried until golden, with a sweet chili dipping sauce.",
    price: 165,
    category: "snacks",
    image: unsplash("photo-1513558161293-cdaf765ed2fd"),
    imageAlt: "A plate of crispy fried spring rolls with dipping sauce",
    featured: true,
    badge: "Crowd favorite",
  },
  {
    id: "garlic-chicharon",
    name: "Garlic Chicharon",
    description:
      "Crunchy pork rinds tossed with toasted garlic and a hint of chili vinegar on the side.",
    price: 145,
    category: "snacks",
    image: unsplash("photo-1551782450-a2132b4ba21d"),
    imageAlt: "A bowl of crispy pork rinds with a vinegar dip",
  },
  {
    id: "ensaymada-sliders",
    name: "Ensaymada Sliders",
    description:
      "Soft buttered brioche with salted egg and cheese, folded around smoked ham. Three to a plate.",
    price: 215,
    category: "snacks",
    image: unsplash("photo-1550547660-d9450f859349"),
    imageAlt: "Small filled brioche sliders stacked on a plate",
  },
  {
    id: "barako-cold-brew",
    name: "Barako Cold Brew",
    description:
      "Slow-steeped Kapeng Barako served over ice with a gentle molasses sweetness.",
    price: 130,
    category: "drinks",
    image: unsplash("photo-1466978913421-dad2ebd01d17"),
    imageAlt: "A glass of iced black coffee with condensation",
    featured: true,
  },
  {
    id: "calamansi-iced-tea",
    name: "Calamansi Iced Tea",
    description:
      "Brewed black tea shaken with local calamansi and a touch of honey. Bright and refreshing.",
    price: 110,
    category: "drinks",
    image: unsplash("photo-1497034825429-c343d7c6a68f"),
    imageAlt: "A tall glass of iced tea with a citrus garnish",
  },
  {
    id: "leche-flan",
    name: "Leche Flan",
    description:
      "Silky steamed custard with a dark caramel glaze and a whisper of vanilla.",
    price: 150,
    category: "desserts",
    image: unsplash("photo-1551024506-0bccd828d307"),
    imageAlt: "A slice of caramel-topped custard dessert",
    featured: true,
  },
  {
    id: "ube-cheesecake",
    name: "Ube Cheesecake",
    description:
      "Purple yam cheesecake on a toasted coconut crumb, topped with macapuno cream.",
    price: 195,
    category: "desserts",
    image: unsplash("photo-1565299507177-b0ac66763828"),
    imageAlt: "A purple yam cheesecake slice with a coconut topping",
    badge: "New",
  },
];

export function formatPrice(price: number): string {
  const safe = Number.isFinite(price) ? Math.max(0, price) : 0;
  const [whole, decimals] = safe.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₱${grouped}.${decimals}`;
}

export function getMenuItems(category: MenuFilter = "all"): MenuItem[] {
  if (category === "all") return MENU_ITEMS;
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function getFeaturedItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.featured);
}
