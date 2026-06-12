import { ORDER_URL } from "./site";

export type LocationStore = {
  id: string;
  name: string;
  suburb: string;
  image: string;
  imageAlt: string;
  address: string;
  locationNote: string;
  hours: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  mapsLabel: string;
  orderUrl: string;
  menuUrl: string;
  uberUrl: string;
};

export const locationsHero = {
  eyebrow: "Visit us",
  title: "Our Brisbane Locations",
  body:
    "Family-friendly restaurants in Woolloongabba and Carindale — smash burgers, Raising Dave's fried chicken boxes, dirty sodas and loaded fries across Brisbane's south side.",
} as const;

export const locations: LocationStore[] = [
  {
    id: "woolloongabba",
    name: "Sue's Burgers & Shakes",
    suburb: "Woolloongabba",
    image: "/images/locations/woolloongabba.png",
    imageAlt: "Interior of Sue's Burgers Woolloongabba with teal booths and checkerboard floor",
    address:
      "South City Sq Woolloongabba, Shop G4.13 / 148 Logan Rd, Woolloongabba QLD 4102",
    locationNote:
      "Located in Dining Precinct underneath Angelika Cinemas. Free undercover parking for up to 3 hrs.",
    hours: "Mon – Sun 11:00am – 9:00pm",
    phone: "(07) 0403 582 907",
    phoneHref: "tel:+61403582907",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sue's+Burgers+and+Shakes+148+Logan+Rd+Woolloongabba+QLD+4102",
    mapsLabel: "Open in Google Maps — Woolloongabba",
    orderUrl: ORDER_URL,
    menuUrl: "/our-menu",
    uberUrl:
      "https://www.ubereats.com/au/store/sues-burgers-and-shakes-woolloongabba/1vZFIwXPUp68HbXOJwC1_A",
  },
  {
    id: "carindale",
    name: "Sue's Burgers & Shakes",
    suburb: "Carindale",
    image: "/images/locations/carindale.png",
    imageAlt: "Interior of Sue's Burgers Carindale with neon signage and booth seating",
    address: "Westfield Carindale, Shop 1201A/1151 Creek Road, Carindale QLD 4152",
    locationNote:
      "Located in Glasshouse Dining Precinct next to Vapiano (Coles end).",
    hours: "Mon – Sun 10:30am – 9:00pm",
    phone: "(07) 3843 3247",
    phoneHref: "tel:+61738433247",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sue's+Burgers+Westfield+Carindale+1151+Creek+Road+Carindale+QLD+4152",
    mapsLabel: "Open in Google Maps — Carindale",
    orderUrl: ORDER_URL,
    menuUrl: "/our-menu",
    uberUrl:
      "https://www.ubereats.com/au/store/sues-burgers-and-shakes/cK9YNVFvUxextO6G6lCbdg",
  },
];

export const comingSoonLocation = {
  id: "location-three",
  title: "Sue's #3",
  subtitle: "Coming Soon",
  teaser: "Our next Sue's is on the way. Stay tuned.",
  followUrl: "https://www.instagram.com/suesburgersandshakes",
} as const;
