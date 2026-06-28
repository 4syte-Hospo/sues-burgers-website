import { ORDER_URL } from "./site";
import type { FaqItem } from "../types/faq";

export const faqPage = {
  eyebrow: "Got questions?",
  title: "FAQ",
  intro:
    "Everything you need to know about dining at Sue's in Brisbane — Raising Dave's boxes, dirty sodas, bookings, dietary options, delivery and family-friendly dining.",
} as const;

export const faqItems: FaqItem[] = [
  {
    id: "bookings",
    question: "Do I need to make a booking?",
    answer: [
      {
        type: "paragraph",
        content:
          "We welcome walk-ins and, in most cases, bookings aren't necessary.",
      },
      {
        type: "paragraph",
        content:
          "For larger groups of 5 or more, we're happy to reserve a table, however even during busy periods tables tend to turn over quite quickly, with wait times often around 10–20 minutes.",
      },
      {
        type: "paragraph",
        content:
          "If you're planning a visit, we'd encourage you to simply drop in and we'll do our best to get you seated as soon as possible.",
      },
    ],
  },
  {
    id: "gluten-free",
    question: "Do you offer any gluten free options?",
    dietRelated: true,
    answer: [
      {
        type: "paragraph",
        content:
          "We offer the option to swap our standard milk bun for a **gluten-friendly bun** which, to the best of our knowledge, contains no gluten. Please note that while we take care during preparation, gluten-containing products are present in our kitchen, and our bun toasters and preparation surfaces are shared. As a result, **cross-contamination is possible**, and we cannot guarantee any item is completely gluten-free.",
      },
      { type: "heading", content: "Beef Burgers" },
      {
        type: "paragraph",
        content:
          "Our custom beef patties contain **no additives, fillers or breadcrumbs**, making our beef burgers suitable for gluten-friendly preparation.",
      },
      {
        type: "paragraph",
        content:
          "The following burgers **can be made gluten-friendly** by swapping the standard milk bun for a **gluten-friendly bun** (or by requesting them bunless):",
      },
      {
        type: "list",
        items: ["Sue's Classic", "Sue's Signature", "Oklahoma Sue"],
      },
      {
        type: "paragraph",
        content: "The following burgers are **already gluten-friendly as served**:",
      },
      {
        type: "list",
        items: [
          "**Naked Sue** – served wrapped in fresh lettuce leaves instead of a bun.",
          "**Flying Sue** – our double cheeseburger served with grilled onion steaks in place of the bun.",
        ],
      },
      { type: "heading", content: "Fried Chicken Burgers & Tenders" },
      {
        type: "paragraph",
        content:
          "Our Southern Fried Chicken Breasts and Tenders are coated in plain flour and are **not gluten-friendly**.",
      },
      {
        type: "paragraph",
        content:
          "If you're looking for a gluten-friendly chicken burger, our **Grilled Chicken & Mozza Burger** can be made gluten-friendly by swapping the standard milk bun for a **gluten-friendly bun** (or by requesting it bunless).",
      },
      {
        type: "paragraph",
        content:
          "As always, while we take every reasonable precaution, **cross-contamination is possible** due to shared preparation areas, cooking equipment and bun toasters.",
      },
    ],
  },
  {
    id: "dairy-free",
    question: "Do you offer any dairy free options?",
    dietRelated: true,
    answer: [
      { type: "heading", content: "Burgers" },
      {
        type: "paragraph",
        content:
          "The potato bun used for our burgers is vegan friendly, containing no dairy. However, our burgers contain cheese and we butter-toast all buns — so please request no butter and no cheese if you are avoiding dairy.",
      },
      { type: "heading", content: "Beef" },
      {
        type: "paragraph",
        content:
          "Our beef burgers can be altered to be dairy free if you ask for no butter or American cheese. Our Vegan Signature Sue Burger is also dairy free.",
      },
      { type: "heading", content: "Chicken" },
      {
        type: "paragraph",
        content:
          "Unfortunately at this point in time we do not have any dairy-free chicken alternatives.",
      },
      {
        type: "paragraph",
        content:
          "Allergen warning: Please note, while we take extra precautions to avoid cross contamination, there is still always an inherent risk that allergen traces may still be present.",
      },
      { type: "heading", content: "Thickshakes" },
      {
        type: "paragraph",
        content:
          "Due to spatial restrictions we do not offer dairy-free thickshakes. We do however have the option to swap out full cream milk for lactose free milk if you are looking to reduce your dairy intake (note full cream ice cream is still used).",
      },
    ],
  },
  {
    id: "vegan-vegetarian",
    question: "Do you offer any vegan or vegetarian options?",
    dietRelated: true,
    answer: [
      { type: "heading", content: "Vegetarian" },
      {
        type: "paragraph",
        content:
          "Our Vegetarian Sue, Mozzarella Sticks, Onion Rings & Fries are all vegetarian friendly. Some of our loaded fries can be modified to be vegetarian friendly (i.e. removing bacon from cheese & bacon fries) — please ask your server for suggestions.",
      },
      { type: "heading", content: "Vegan" },
      {
        type: "paragraph",
        content:
          "Our Vegan Sue is made with a plant-based patty, vegan cheese, vegan aioli and a vegan bun. Our Fries are also vegan friendly!",
      },
    ],
  },
  {
    id: "licensed",
    question: "Are your restaurants licenced?",
    answer: [
      {
        type: "paragraph",
        content:
          "Yep! Both Sue's locations are fully licensed, offering a range of pre-packaged beers, wines and cider. You can also add a shot of vodka to any Dirty Soda.",
      },
    ],
  },
  {
    id: "halal",
    question: "Are your restaurants halal certified?",
    answer: [
      {
        type: "paragraph",
        content:
          "Unfortunately, Sue's Burgers & Shakes is not independently halal certified currently. However, we do use a halal certified supplier for all of our poultry products.",
      },
      { type: "heading", content: "Fried chicken" },
      {
        type: "paragraph",
        content:
          'We take precautions to avoid any contact with non-halal products when preparing our fried chicken products (fried chicken burgers, fried chicken tenders) — so these items are what we call "halal-friendly" (excluding Dirty Bird which contains bacon & Grilled Chicken Mozza Burger which is cooked on our grill). Please ensure to let your server know if you require halal-friendly food.',
      },
      { type: "heading", content: "Beef" },
      {
        type: "paragraph",
        content: "At this point in time our beef is not halal-friendly.",
      },
    ],
  },
  {
    id: "delivery",
    question: "Do your restaurants deliver?",
    answer: [
      {
        type: "paragraph",
        content:
          "Yes! You can order directly through our website by clicking Order Now > Delivery (Powered by DoorDash).",
      },
      {
        type: "paragraph",
        content: "Alternatively, you can order through Uber Eats:",
      },
      {
        type: "link",
        label: "Order Uber Eats from Woolloongabba",
        href: "https://www.ubereats.com/au/store/sues-burgers-and-shakes-woolloongabba/1vZFIwXPUp68HbXOJwC1_A",
        external: true,
      },
      {
        type: "link",
        label: "Order Uber Eats from Carindale",
        href: "https://www.ubereats.com/au/store/sues-burgers-and-shakes/cK9YNVFvUxextO6G6lCbdg",
        external: true,
      },
      {
        type: "link",
        label: "Order on our website",
        href: ORDER_URL,
        external: true,
      },
    ],
  },
  {
    id: "lighter-options",
    question:
      "I want to eat out with my friends but I'm trying to eat a little better — do you have anything for me?",
    dietRelated: true,
    answer: [
      {
        type: "paragraph",
        content: "Cutting back on carbs? No worries.",
      },
      {
        type: "paragraph",
        content:
          "You can swap any burger bun for our Bunless Option (crispy cos lettuce leaves), or give one of these a crack:",
      },
      {
        type: "list",
        items: [
          "**Naked Sue** – our classic Sue burger, served bunless on a bed of crispy cos lettuce.",
          "**Flying Sue** – a double cheeseburger stacked between two thick-cut grilled onions instead of a bun.",
        ],
      },
      {
        type: "paragraph",
        content: "Still all the good stuff. Just less bread.",
      },
    ],
  },
  {
    id: "locations",
    question: "Whereabouts are you located?",
    answer: [
      { type: "heading", content: "Carindale" },
      {
        type: "paragraph",
        content:
          "We're located in Westfield Carindale inside the Glasshouse Dining Precinct (Coles end, next to Yum Cha on the ground level). For parking, follow signs for best parking for Coles. Parking is free for your first 2 hours.",
      },
      { type: "heading", content: "Woolloongabba" },
      {
        type: "paragraph",
        content:
          "We're located inside the South City Square Shopping Complex on the ground level underneath Angelika Cinemas. For parking, enter and park in the underground parking. Catch the lift or take the stairs up to ground level. Parking is free for up to 5 hours.",
      },
      {
        type: "link",
        label: "View all locations",
        href: "/locations",
      },
    ],
  },
  {
    id: "raising-daves",
    question: "What is Raising Dave's?",
    answer: [
      {
        type: "paragraph",
        content:
          "Raising Dave's is Chef Dave's TikTok-famous southern fried chicken — crispy tenders, garlic-buttered Texas toast, fries and Dave's sauce. Our Raising Dave's Box is one of Brisbane's most popular chicken tender boxes and a go-to Raising Cane's alternative for locals.",
      },
      {
        type: "paragraph",
        content:
          "You'll find Raising Dave's on our menu at Woolloongabba and Carindale, alongside hot honey boxes and Dave's burgers.",
      },
      {
        type: "link",
        label: "View Raising Dave's on the menu",
        href: "/our-menu#raising-daves",
      },
    ],
  },
  {
    id: "dirty-sodas",
    question: "What are dirty sodas?",
    answer: [
      {
        type: "paragraph",
        content:
          "Dirty sodas are creamy, fizzy, flavoured soft drinks — an American-style soda bar treat now on tap at Sue's in Brisbane. We mix sodas with fruit syrups and optional vanilla cream for specialty drinks you won't find at every burger spot.",
      },
      {
        type: "paragraph",
        content:
          "Try Pink Flamingo, Raspberry Cream Cola and more from our dirty soda bar at Woolloongabba and Carindale.",
      },
      {
        type: "link",
        label: "See dirty soda flavours",
        href: "/our-menu#dirty-sodas",
      },
    ],
  },
  {
    id: "public-holidays",
    question: "Are you open on public holidays?",
    answer: [
      {
        type: "paragraph",
        content:
          "Both of our stores are open for most of the public holidays throughout the year — however please keep an eye on our social media channels and Google operating hours for public holiday trading hours.",
      },
      {
        type: "paragraph",
        content: "Please note we do charge a 15% surcharge on public holidays.",
      },
    ],
  },
];
