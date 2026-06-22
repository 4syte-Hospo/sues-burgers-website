import { applyTemporaryRedcatImages } from "../config/redcatOrderingImages";
import type { MenuCategoryNavItem, MenuCategorySection } from "../types/menu";
import { ORDER_URL } from "./site";

const order = ORDER_URL;

/** Category pills — matches Webflow menu nav */
export const menuCategoryNav: MenuCategoryNavItem[] = [
  { id: "monthly-specials", label: "Monthly Specials" },
  { id: "burgers", label: "Burgers" },
  { id: "chicken-burgers", label: "Chicken Burgers" },
  { id: "veg-burgers", label: "Veg Burgers" },
  { id: "raising-daves", label: "Raising Dave's" },
  { id: "sides", label: "Sides & Loaded Fries" },
  { id: "dirty-sodas", label: "Dirty Sodas" },
  { id: "shakes", label: "Shakes" },
  { id: "other-drinks", label: "Other Drinks" },
  { id: "kids", label: "Kids" },
];

export const menuHero = {
  eyebrow: "Check out",
  title: "Our Menu",
  body:
    "Smash burgers, crispy southern tenders, dirty sodas & thickshakes — all made to order.",
  allergenHref: "/allergen-info",
  pdfHref: "/docs/sues-burgers-full-menu-jun26.pdf",
  pdfDownloadName: "sues-burgers-full-menu-jun26.pdf",
} as const;

const baseMenuSections: MenuCategorySection[] = [
  {
    id: "monthly-specials",
    navLabel: "Monthly Specials",
    eyebrow: "Limited Time",
    title: "Monthly Specials",
    description:
      "Rotating hits made for the month — grab them while they're on the board.",
    items: [
      {
        id: "chicken-crack-sandwich",
        name: "Chicken Crack Sandwich",
        description:
          "BUTTER-TOASTED MILK BREAD STACKED WITH SPICY FRIED CHICKEN BREAST, CRISPY SHREDDED LETTUCE, CRISPY CHICKEN SKIN BITS (CHICKEN CRACK), SRIRACHA MAYO, AND TOPPED WITH OUR SPICY SEASONING AND MORE CHICKEN CRACK! (MILD)",
        badge: "Monthly Special",
        orderLink: order,
      },
    ],
  },
  {
    id: "burgers",
    navLabel: "Burgers",
    eyebrow: "Beef",
    title: "Burgers",
    description:
      "Fresh wagyu smash patties, toasty potato buns, and Sue's signature sauce — the classics that built the hype.",
    items: [
      {
        id: "sues-classic",
        name: "Sue's Classic",
        price: 14.5,
        description:
          "SUE'S WAGYU PATTY, ONION, AMERICAN CHEESE, PICKLES & SUE'S SIGNATURE SAUCE ON A TOASTY POTATO BUN (GFA)",
        orderLink: order,
      },
      {
        id: "signature-sue",
        name: "Signature Sue",
        price: 16,
        description:
          "SUE'S WAGYU PATTY, LETTUCE, TOMATO, ONION, AMERICAN CHEESE, PICKLES & SUE'S SIGNATURE SAUCE ON A TOASTY POTATO BUN (GFA)",
        orderLink: order,
      },
      {
        id: "jalapeno-smash",
        name: "Jalapeno Smash",
        price: 17,
        description:
          "SUE'S WAGYU WITH SMASHED JALAPENOS & ONION, PICKLES, AMERICAN CHEESE & SUE'S SIGNATURE SAUCE ON A TOASTY POTATO BUN (GFA)",
        orderLink: order,
      },
      {
        id: "oklahoma-sue",
        name: "Oklahoma Sue",
        price: 16,
        description:
          "SUE'S WAGYU PATTY WITH SMASHED ONION, PICKLES, AMERICAN CHEESE & SUE'S SIGNATURE SAUCE ON A TOASTY POTATO BUN (GFA)",
        orderLink: order,
      },
      {
        id: "flying-sue",
        name: "Flying Sue",
        price: 20,
        description:
          "DOUBLE WAGYU PATTIES, DOUBLE CHEESE, SUE'S SIGNATURE SAUCE BETWEEN \"GRILLED ONION BUNS\". SIGNATURE SAUCE & PICKLED PEPPERS SERVED ON THE SIDE (BUNLESS) (GF)",
        orderLink: order,
      },
      {
        id: "naked-sue",
        name: "Naked Sue",
        price: 14,
        description:
          "SUE'S WAGYU PATTY, TOMATO, ONION, AMERICAN CHEESE, PICKLES & SUE'S SIGNATURE SAUCE WRAPPED IN LETTUCE LEAVES (BUNLESS) (GF)",
        orderLink: order,
      },
    ],
  },
  {
    id: "chicken-burgers",
    navLabel: "Chicken Burgers",
    eyebrow: "Chicken",
    title: "Burgers",
    description:
      "Southern fried and grilled chicken burgers stacked high — crispy, saucy, and built for the 'gram.",
    items: [
      {
        id: "southern-fried-chicken",
        name: "Southern Fried Chicken",
        price: 18,
        description:
          "SUE'S SOUTHERN FRIED CHICKEN BREAST, AMERICAN CHEESE, LETTUCE, TOMATO, PICKLES & OUR FAMOUS DAVE'S SAUCE ON A TOASTY POTATO BUN",
        orderLink: order,
      },
      {
        id: "dirty-bird",
        name: "Dirty Bird (Mild)",
        price: 19,
        description:
          "SMOKEY MAPLE GLAZED SOUTHERN FRIED CHICKEN BREAST, AMERICAN CHEESE, CRISPY BACON, PICKLES & SRIRACHA MAYO ON A TOASTY POTATO BUN",
        orderLink: order,
      },
      {
        id: "grilled-chicken-n-mozza",
        name: "Grilled Chicken N' Mozza",
        price: 18,
        description:
          "BUTTERMILK BRINED GRILLED CHICKEN BREAST TOPPED WITH CRISPY MOZZARELLA CHEESE SKIRT, LETTUCE, TOMATO, PICKLES & AIOLI ON A TOASTY POTATO BUN (GFA)",
        orderLink: order,
      },
      {
        id: "nashville",
        name: "Nashville (Medium)",
        price: 19,
        description:
          "SUE'S NASHVILLE STYLE FRIED CHICKEN BREAST, LETTUCE, AMERICAN CHEESE, PICKLES & SRIRACHA MAYO ON A TOASTY POTATO BUN",
        orderLink: order,
      },
    ],
  },
  {
    id: "veg-burgers",
    navLabel: "Veg Burgers",
    eyebrow: "veg",
    title: "Burgers",
    description:
      "Plant-based patties with all the Sue's fixings — vego and fully vegan options on toasty buns.",
    items: [
      {
        id: "vego-signature-sue",
        name: "Vego Signature Sue",
        price: 18.5,
        description:
          "PLANT-BASED PATTY, AMERICAN CHEESE, SUE'S SIGNATURE SAUCE, LETTUCE, TOMATO, ONION & PICKLES ON A TOASTY POTATO BUN (VEG) (GFA)",
        orderLink: order,
      },
      {
        id: "vegan-signature-sue",
        name: "Vegan Signature Sue",
        price: 22,
        description:
          "LOVE BUDS PLANT BASED PATTY, VEGAN CHEESE, VEGAN AIOLI, LETTUCE, TOMATO, ONION & PICKLES ON A TOASTY VEGAN POTATO BUN (GF)",
        orderLink: order,
      },
    ],
  },
  {
    id: "raising-daves",
    navLabel: "Raising Dave's",
    eyebrow: "Fan Favourite",
    title: "Raising Dave's",
    description:
      "Chef Dave's viral southern fried chicken — inspired by America's famous tender box meals and made fresh in Brisbane.",
    items: [
      {
        id: "raising-daves-box",
        name: "Raising Dave's Box",
        price: 25,
        description:
          "3 X CHEF DAVE'S TIKTOK FAMOUS SOUTHERN FRIED CHICKEN TENDERS SERVED WITH GARLIC-BUTTERED TEXAS TOAST, CRISPY FRIES AND A 8OZ CUP OF DAVE'S SAUCE",
        badge: "Fan Favourite",
        fanFavourite: true,
        orderLink: order,
      },
      {
        id: "sues-hot-honey-box",
        name: "Sue's Hot Honey Box (Mild)",
        price: 25,
        description:
          "3 X SUE'S FAMOUS HOT FRIED CHICKEN TENDERS, SERVED WITH GARLIC-BUTTERED TEXAS TOAST, CRISPY FRIES, 8OZ SPICY DAVE'S SAUCE AND A POT OF HOT HONEY",
        orderLink: order,
      },
      {
        id: "baby-daves-box",
        name: "Baby Dave's Box",
        price: 20,
        description:
          "2 X CHEF DAVE'S TIKTOK FAMOUS SOUTHERN FRIED CHICKEN TENDERS SERVED WITH GARLIC-BUTTERED TEXAS TOAST, CRISPY FRIES AND 3.4OZ POT OF DAVE'S SAUCE",
        fanFavourite: true,
        orderLink: order,
      },
    ],
  },
  {
    id: "sides",
    navLabel: "Sides & Loaded Fries",
    title: "Sides & Loaded Fries",
    description:
      "Crispy fries, viral mozzarella sticks, and loaded stacks — perfect for sharing (or not).",
    items: [
      {
        id: "fries",
        name: "Fries",
        priceLabel: "SNACK $5.50 | REG $6.50",
        description: "CRISPY SEASONED FRIES (VEG)",
        orderLink: order,
      },
      {
        id: "onion-rings",
        name: "Onion Rings",
        price: 9.5,
        description: "CRISPY SEASONED ONION RINGS! (VEG)",
        orderLink: order,
      },
      {
        id: "chilli-mozzarella-sticks",
        name: "Sue's Mozzarella Sticks",
        price: 15,
        description:
          "3 X HAND-MADE CHILI'S INSPIRED VIRAL MOZZARELLA STICKS SERVED WITH HOUSE-MADE RANCH SAUCE (VEG). CHOOSE BETWEEN CHILI OR NOT CHILI",
        fanFavourite: true,
        orderLink: order,
      },
      {
        id: "cheese-bacon-fries",
        name: "Cheese & Bacon Fries",
        price: 13.5,
        description:
          "CRISPY SEASONED FRIES TOPPED WITH SUE'S SIGNATURE 3-CHEESE SAUCE & CRISPY BACON BITS, GARNISHED WITH SHALLOTS",
        orderLink: order,
      },
      {
        id: "loaded-maple-fries",
        name: "Loaded Maple Fries",
        price: 14.5,
        description:
          "CRISPY SEASONED FRIES TOPPED WITH SMOKEY MAPLE SAUCE, SRIRACHA MAYO & CRISPY BACON BITS, GARNISHED WITH SHALLOTS",
        orderLink: order,
      },
      {
        id: "burger-fries",
        name: "Burger Fries",
        price: 17,
        description:
          "CRISPY SEASONED FRIES TOPPED WITH SUE'S WAGYU PATTY, MELTED AMERICAN CHEESE, SUE'S SIGNATURE SAUCE, ONION & PICKLES",
        orderLink: order,
      },
      {
        id: "dipping-sauces",
        name: "Dipping Sauces",
        priceLabel: "FROM $2.50",
        description:
          "SUE'S SIGNATURE SAUCE, DAVE'S SAUCE, AIOLI, SRIRACHA MAYO, VEGAN AIOLI — $2.50. DAVE'S SAUCE: 2oz $3.50 | 3.4oz $4.50 | 8oz $6.50 | 16oz $10.50. 3 CHEESE SAUCE: 3.4oz $4.50 | 8oz $7",
        orderLink: order,
      },
    ],
  },
  {
    id: "dirty-sodas",
    navLabel: "Dirty Sodas",
    title: "Dirty Sodas",
    description:
      "Creamy, fizzy, flavoured — Brisbane's dirty soda bar with American-style specialty soft drinks. Pro tip: add vanilla cream.",
    items: [
      {
        id: "pink-flamingo",
        name: "Pink Flamingo",
        price: 8,
        description: "SPRITE · RASPBERRY · PEACH · LIME. PRO TIP: TRY WITH VANILLA CREAM",
        fanFavourite: true,
        orderLink: order,
      },
      {
        id: "raspberry-cream-cola",
        name: "Raspberry Cream Cola",
        price: 9.5,
        description: "COKE · RASPBERRY · VANILLA CREAM",
        orderLink: order,
      },
      {
        id: "popping-punch",
        name: "Popping Punch",
        price: 9.5,
        description: "FANTA · MANGO · PEACH · MANGO POPPING PEARLS",
        orderLink: order,
      },
      {
        id: "raspberry-coconut",
        name: "Raspberry Coconut",
        price: 9.5,
        description: "SPRITE · RASPBERRY · COCONUT CREAM",
        orderLink: order,
      },
      {
        id: "peach-spritz",
        name: "Peach Spritz",
        price: 8,
        description: "SPRITE · PEACH · VANILLA. PRO TIP: TRY WITH VANILLA CREAM",
        orderLink: order,
      },
      {
        id: "caramel-cola",
        name: "Caramel Cola",
        price: 8,
        description: "COKE · SALTED CARAMEL · VANILLA",
        orderLink: order,
      },
      {
        id: "mango-lychee-splash",
        name: "Mango Lychee Splash",
        price: 8,
        description: "SPRITE · MANGO · LYCHEE",
        orderLink: order,
      },
      {
        id: "tropical-sunset",
        name: "Tropical Sunset",
        price: 8,
        description: "FANTA · MANGO · PEACH. PRO TIP: TRY WITH VANILLA CREAM",
        orderLink: order,
      },
    ],
  },
  {
    id: "shakes",
    navLabel: "Shakes",
    eyebrow: "Real Ice-Cream",
    title: "Thickshakes",
    description:
      "Fancy and classic thickshakes blended with real ice cream. Add whipped cream +$2 · swap to lactose-free milk +$1 (ice cream still contains dairy).",
    items: [
      {
        id: "oreo-cookies-creme",
        name: "Oreo Cookies & Creme",
        price: 9.5,
        description:
          "OREOS AND CREME THICKSHAKE TOPPED WITH CRUMBLED OREO PIECES",
        orderLink: order,
      },
      {
        id: "nutella-shake",
        name: "Nutella",
        price: 9.5,
        description: "NUTELLA THICKSHAKE TOPPED WITH NUTELLA SAUCE",
        orderLink: order,
      },
      {
        id: "crunchy-biscoff",
        name: "Crunchy Biscoff",
        price: 9.5,
        description: "CRUNCHY BISCOFF THICKSHAKE TOPPED WITH CRUSHED BISCOFF",
        orderLink: order,
      },
      {
        id: "malteser-shake",
        name: "Malteser",
        price: 9.5,
        description: "MALTESER THICKSHAKE TOPPED WITH CRUSHED MALTESERS",
        orderLink: order,
      },
      {
        id: "peanut-butter-shake",
        name: "Peanut Butter",
        price: 9.5,
        description: "PEANUT BUTTER THICKSHAKE TOPPED WITH PEANUT BUTTER SAUCE",
        orderLink: order,
      },
      {
        id: "dulce-de-leche",
        name: "Dulce De Leche",
        price: 9.5,
        description:
          "DULCE DE LECHE (SALTED CONDENSED CARAMEL) THICKSHAKE TOPPED WITH CARAMEL SAUCE",
        orderLink: order,
      },
      {
        id: "classic-shakes",
        name: "Classic Shakes",
        price: 9,
        badge: "Classics",
        description:
          "CHOOSE BETWEEN: CHOCOLATE, STRAWBERRY, BLUE HEAVEN, VANILLA, BANANA, MALT",
        orderLink: order,
      },
    ],
  },
  {
    id: "other-drinks",
    navLabel: "Other Drinks",
    title: "Other Drinks",
    description: "Classic sodas, juices, and waters to wash it all down.",
    items: [
      { id: "coke", name: "Coke", price: 4.5, description: "", orderLink: order },
      {
        id: "coke-no-sugar",
        name: "Coke No Sugar",
        price: 4.5,
        description: "",
        orderLink: order,
      },
      { id: "sprite", name: "Sprite", price: 4.5, description: "", orderLink: order },
      { id: "fanta", name: "Fanta", price: 4.5, description: "", orderLink: order },
      {
        id: "sparkling-water",
        name: "Sparkling Water",
        price: 5.5,
        description: "",
        orderLink: order,
      },
      {
        id: "still-water",
        name: "Still Water",
        price: 5,
        description: "",
        orderLink: order,
      },
      {
        id: "orange-juice",
        name: "Orange Juice",
        price: 4.5,
        description: "",
        orderLink: order,
      },
      {
        id: "apple-juice",
        name: "Apple Juice",
        price: 4.5,
        description: "",
        orderLink: order,
      },
    ],
  },
  {
    id: "kids",
    navLabel: "Kids",
    title: "Kids",
    description: "Kid-sized favourites — nuggets, cheeseburger, and fries.",
    items: [
      {
        id: "kids-nuggs-fries",
        name: "Kids Nuggs and Fries",
        price: 13,
        description: "5 X CRISPY CHICKEN NUGGETS, FRIES & TOMATO SAUCE",
        image: "/images/menu/kids-nuggs-fries.png",
        orderLink: order,
      },
      {
        id: "kids-cheeseburger-fries",
        name: "Kids Cheeseburger and Fries",
        price: 15,
        description:
          "KID'S CHEESEBURGER WITH TOMATO SAUCE, BEEF & CHEESE & FRIES",
        image: "/images/menu/kids-cheeseburger-fries.png",
        orderLink: order,
      },
    ],
  },
];

/** Menu sections — local photos from public/images/menu/{id}.png auto-wired via manifest; Redcat CDN as fallback. */
export const menuSections = applyTemporaryRedcatImages(baseMenuSections);
